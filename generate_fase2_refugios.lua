local function setPx(img, x, y, r, g, b, a)
  a = a or 255
  if x >= 0 and x < 128 and y >= 0 and y < 96 then
    img:drawPixel(x, y, app.pixelColor.rgba(r, g, b, a))
  end
end

local function hex2rgb(hex)
  hex = hex:gsub("#","")
  return tonumber("0x"..hex:sub(1,2)), tonumber("0x"..hex:sub(3,4)), tonumber("0x"..hex:sub(5,6))
end

local function setHex(img, x, y, hex, a)
  local r, g, b = hex2rgb(hex)
  setPx(img, x, y, r, g, b, a or 255)
end

local dirRef = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/refugio"

local function saveRef(spr, name)
  spr:saveCopyAs(dirRef .. "/" .. name .. ".aseprite")
  spr:saveCopyAs(dirRef .. "/" .. name .. ".png")
  spr:close()
end

local function drawYermoBase(img)
  -- Sky gradient (Dusky post-collapse sky: Y: 0 to 45)
  for y = 0, 45 do
    local sCol = (y < 15) and "#0f172a" or ((y < 30) and "#1e293b" or "#334155")
    for x = 0, 127 do setHex(img, x, y, sCol) end
  end
  -- Distant Mountain Hills (Y: 35 to 48)
  for x = 0, 127 do
    local hillY = 40 + math.floor(math.sin(x * 0.05) * 4 + math.cos(x * 0.02) * 3)
    for y = hillY, 48 do setHex(img, x, y, "#1e1b18") end
  end
  -- Ground / Earth Terrain (Y: 48 to 95)
  for y = 48, 95 do
    local gCol = (y < 60) and "#271b13" or ((y < 75) and "#1f150e" or "#160e09")
    for x = 0, 127 do
      local noise = (x * 7 + y * 13) % 17
      setHex(img, x, y, (noise == 0) and "#38251b" or gCol)
    end
  end
end

----------------------------------------------------------------------
-- REFUGIO NIVEL 0: PUNTO CERO (128x96 px)
----------------------------------------------------------------------
do
  local spr = Sprite(128, 96); local img = spr.cels[1].image
  drawYermoBase(img)

  -- Tattered Lean-to Tarp (Toldo roto X: 35 to 85, Y: 42 to 72)
  -- Crooked support sticks
  for y = 45, 75 do
    setHex(img, 40, y, "#78350f"); setHex(img, 41, y, "#451a03")
    setHex(img, 85, y, "#78350f"); setHex(img, 86, y, "#451a03")
  end
  -- Ragged torn tarp sheet
  for y = 42, 65 do
    local w = math.floor((y - 42) * 1.5)
    for x = 40, 85 - math.floor((y-42)*0.4) do
      if (x + y) % 9 ~= 0 then -- Tear holes
        setHex(img, x, y, (x <= 60) and "#38bdf8" or "#0369a1")
      end
    end
  end
  -- Frayed tarp bottom strings
  for x = 45, 80, 5 do setHex(img, x, 66, "#cbd5e1"); setHex(img, x, 67, "#94a3b8") end

  -- Cold unlit stone hearth & ashes (X: 92 to 108, Y: 72 to 78)
  for y = 72, 78 do for x = 92, 108 do
    local d = math.sqrt((x - 100)^2 + (y - 75)^2 * 2)
    if d <= 6 and d >= 4 then setHex(img, x, y, "#57534e")
    elseif d < 4 then setHex(img, x, y, "#1e293b") end -- Cold grey ash
  end end

  -- Scattered Pallet debris & tin can
  for x = 18, 30 do setHex(img, x, 78, "#78350f"); setHex(img, x, 79, "#451a03") end
  setHex(img, 28, 76, "#94a3b8"); setHex(img, 29, 76, "#ef4444") -- Crushed soda can

  saveRef(spr, "refugio_lvl0_punto_cero")
end

----------------------------------------------------------------------
-- REFUGIO NIVEL 1: CAJONES Y FOGÓN (128x96 px)
----------------------------------------------------------------------
do
  local spr = Sprite(128, 96); local img = spr.cels[1].image
  drawYermoBase(img)

  -- Pallet structure walls (X: 38 to 88, Y: 46 to 74)
  for y = 52, 74 do
    for x = 38, 88 do
      if (y % 4 == 0) then setHex(img, x, y, "#451a03") -- Plank gap
      else setHex(img, x, y, (x <= 60) and "#b45309" or "#78350f") end
    end
  end

  -- Tight blue waterproof tarp roof pinned over pallets
  for y = 42, 54 do
    for x = 35, 92 do
      setHex(img, x, y, (y <= 44) and "#7dd3fc" or ((x <= 60) and "#0284c7" or "#075985"))
    end
  end
  -- Tie ropes pinning tarp down
  for y = 46, 75 do setHex(img, 36, y, "#fde047"); setHex(img, 90, y, "#fde047") end

  -- Open doorway with pallet bed inside
  for y = 56, 74 do for x = 55, 72 do setHex(img, x, y, (y >= 68) and "#78350f" or "#0f172a") end end

  -- Glowing firepit with burning embers & smoke (X: 95 to 112, Y: 70 to 76)
  for y = 70, 76 do for x = 95, 112 do
    local d = math.sqrt((x - 103)^2 + (y - 73)^2 * 2)
    if d <= 6 and d >= 4 then setHex(img, x, y, "#78716c")
    elseif d < 4 then setHex(img, x, y, (d <= 2) and "#fde047" or "#ea580c") end
  end end
  -- Fire flame & smoke rising
  setHex(img, 103, 68, "#facc15"); setHex(img, 102, 69, "#ef4444"); setHex(img, 104, 69, "#f97316")
  setHex(img, 103, 65, "#94a3b8", 160); setHex(img, 104, 62, "#cbd5e1", 120); setHex(img, 103, 59, "#94a3b8", 80)

  -- Stack of 3 wooden vegetable crate boxes
  for y = 66, 76 do for x = 20, 32 do setHex(img, x, y, (x == 20 or x == 32 or y == 66 or y == 76) and "#451a03" or "#92400e") end end

  saveRef(spr, "refugio_lvl1_cajones")
end

----------------------------------------------------------------------
-- REFUGIO NIVEL 2: TECHO DE CHAPA Y ALMACÉN (128x96 px)
----------------------------------------------------------------------
do
  local spr = Sprite(128, 96); local img = spr.cels[1].image
  drawYermoBase(img)

  -- Sturdy timber cabin walls (X: 35 to 90, Y: 46 to 76)
  for y = 48, 76 do
    for x = 35, 90 do
      if (y % 5 == 0) then setHex(img, x, y, "#271204")
      else setHex(img, x, y, (x <= 60) and "#c2410c" or "#9a3412") end
    end
  end

  -- Corrugated Metal Roof (Slanted gable Y: 36 to 48, X: 30 to 95)
  for y = 36, 48 do
    for x = 30, 95 do
      local ridge = (x + y*2) % 6
      if ridge <= 2 then setHex(img, x, y, "#94a3b8")
      elseif ridge <= 4 then setHex(img, x, y, "#475569")
      else setHex(img, x, y, "#b45309") end -- Rust streak
    end
  end

  -- Front Door with brass handle & glass window
  for y = 54, 76 do for x = 55, 70 do setHex(img, x, y, (x == 55 or x == 70 or y == 54) and "#451a03" or "#78350f") end end
  setHex(img, 68, 65, "#facc15") -- Brass handle
  for y = 56, 62 do for x = 75, 85 do setHex(img, x, y, (x == 75 or x == 85 or y == 56 or y == 62) and "#451a03" or "#38bdf8") end end -- Glass window

  -- Organized Tool Rack outside on left (Axe, shovel, saw)
  for y = 56, 76 do setHex(img, 24, y, "#78350f"); setHex(img, 28, y, "#78350f") end
  setHex(img, 24, 56, "#94a3b8"); setHex(img, 25, 56, "#f1f5f9") -- Axe head
  setHex(img, 28, 55, "#64748b"); setHex(img, 29, 55, "#cbd5e1") -- Shovel blade

  -- Rain Barrel on right catching gutter runoff
  for y = 60, 76 do for x = 96, 108 do
    setHex(img, x, y, (x == 96 or x == 108 or y == 76) and "#1e293b" or "#0284c7")
  end end
  for x = 90, 102 do setHex(img, x, 48, "#94a3b8") end -- Gutter trough

  saveRef(spr, "refugio_lvl2_techo")
end

----------------------------------------------------------------------
-- REFUGIO NIVEL 3: HUERTO Y BIDONES (128x96 px)
----------------------------------------------------------------------
do
  local spr = Sprite(128, 96); local img = spr.cels[1].image
  drawYermoBase(img)

  -- Insulated Cabin (X: 30 to 85, Y: 42 to 76)
  for y = 46, 76 do
    for x = 30, 85 do
      if (y % 6 == 0) then setHex(img, x, y, "#2e1005")
      else setHex(img, x, y, (x <= 55) and "#d97706" or "#92400e") end
    end
  end
  -- Corrugated roof with stone chimney
  for y = 34, 46 do
    for x = 26, 88 do
      local ridge = (x) % 4
      setHex(img, x, y, (ridge <= 1) and "#cbd5e1" or "#475569")
    end
  end
  -- Stone Chimney on left
  for y = 25, 42 do for x = 34, 40 do setHex(img, x, y, "#64748b") end end
  setHex(img, 37, 22, "#cbd5e1", 180); setHex(img, 38, 19, "#94a3b8", 120) -- Gentle smoke

  -- Door & Windows
  for y = 52, 76 do for x = 50, 65 do setHex(img, x, y, (x == 50 or x == 65 or y == 52) and "#451a03" or "#78350f") end end
  setHex(img, 63, 64, "#facc15")
  for y = 52, 60 do for x = 70, 80 do setHex(img, x, y, (x == 70 or x == 80 or y == 52 or y == 60) and "#451a03" or "#facc15") end end -- Lit window!

  -- 2 Large Blue 200L Water Barrels on Left (X: 12 to 26, Y: 58 to 76)
  for y = 58, 76 do
    for x = 12, 18 do setHex(img, x, y, (x == 12 or x == 18 or y == 76) and "#0f172a" or "#0284c7") end
    for x = 20, 26 do setHex(img, x, y, (x == 20 or x == 26 or y == 76) and "#0f172a" or "#0369a1") end
  end

  -- Raised Garden Planter Boxes on Right (X: 90 to 122, Y: 64 to 80)
  for y = 68, 80 do for x = 90, 122 do setHex(img, x, y, (y == 80 or x == 90 or x == 122) and "#451a03" or "#78350f") end end
  -- Rich compost soil
  for x = 92, 120 do setHex(img, x, 67, "#271b13") end
  -- Sprouting tomato and herb plants
  for px = 94, 118, 5 do
    setHex(img, px, 64, "#84cc16"); setHex(img, px+1, 63, "#4d7c0f"); setHex(img, px, 62, "#84cc16")
    if px == 104 or px == 114 then setHex(img, px, 65, "#ef4444") end -- Red ripe tomatoes!
  end

  saveRef(spr, "refugio_lvl3_huerto")
end

----------------------------------------------------------------------
-- REFUGIO NIVEL 4: TALLER DE ARTESANÍA Y RADIO (128x96 px)
----------------------------------------------------------------------
do
  local spr = Sprite(128, 96); local img = spr.cels[1].image
  drawYermoBase(img)

  -- Solid Reinforced Cabin (X: 28 to 88, Y: 40 to 76)
  for y = 44, 76 do
    for x = 28, 88 do
      if (y % 6 == 0) then setHex(img, x, y, "#1c0b02")
      else setHex(img, x, y, (x <= 55) and "#b45309" or "#78350f") end
    end
  end
  -- Roof with corrugated steel & insulation
  for y = 30, 44 do
    for x = 24, 92 do
      local ridge = (x + y) % 5
      setHex(img, x, y, (ridge <= 2) and "#94a3b8" or "#475569")
    end
  end

  -- Tall Shortwave Radio Antenna Tower mounted on roof (X: 84, Y: 10 to 32)
  for y = 10, 32 do setHex(img, 84, y, "#f1f5f9") end
  -- Cross struts & Red Beacon light at top
  setHex(img, 82, 16, "#cbd5e1"); setHex(img, 86, 16, "#cbd5e1")
  setHex(img, 81, 24, "#cbd5e1"); setHex(img, 87, 24, "#cbd5e1")
  setHex(img, 84, 9, "#ef4444"); setHex(img, 84, 8, "#ffffff") -- Blinking radio beacon!
  -- Radio waves emitting
  setHex(img, 81, 7, "#38bdf8", 160); setHex(img, 87, 7, "#38bdf8", 160)

  -- Doorway & Glowing Windows
  for y = 50, 76 do for x = 46, 62 do setHex(img, x, y, (x == 46 or x == 62 or y == 50) and "#451a03" or "#78350f") end end
  setHex(img, 60, 63, "#facc15")
  for y = 50, 60 do for x = 68, 82 do setHex(img, x, y, "#facc15") end end -- Warm interior light

  -- Outdoor Heavy Crafting Workbench on Left (X: 6 to 24, Y: 62 to 78)
  for y = 62, 66 do for x = 6, 24 do setHex(img, x, y, (y == 62) and "#d97706" or "#78350f") end end -- Table top
  for y = 67, 78 do setHex(img, 8, y, "#451a03"); setHex(img, 22, y, "#451a03") end -- Legs
  -- Steel Vise on bench
  setHex(img, 7, 59, "#94a3b8"); setHex(img, 8, 59, "#f1f5f9"); setHex(img, 7, 60, "#475569")
  setHex(img, 15, 60, "#ca8a04"); setHex(img, 16, 61, "#facc15") -- Brass parts on bench

  -- Clay bread oven on Right (X: 94 to 114, Y: 56 to 76)
  for y = 56, 76 do for x = 94, 114 do
    local d = math.sqrt((x - 104)^2 + (y - 68)^2 * 1.5)
    if d <= 8 then setHex(img, x, y, (x <= 104) and "#ea580c" or "#9a3412") end
  end end
  setHex(img, 104, 69, "#fde047"); setHex(img, 105, 69, "#f97316") -- Fire glow in oven

  saveRef(spr, "refugio_lvl4_taller")
end

----------------------------------------------------------------------
-- REFUGIO NIVEL 5: FORTALEZA AUTOSUSTENTABLE (128x96 px)
----------------------------------------------------------------------
do
  local spr = Sprite(128, 96); local img = spr.cels[1].image
  drawYermoBase(img)

  -- Solid fortified homestead cabin (X: 25 to 90, Y: 38 to 76)
  for y = 42, 76 do
    for x = 25, 90 do
      if (y % 6 == 0) then setHex(img, x, y, "#1c0b02")
      else setHex(img, x, y, (x <= 55) and "#d97706" or "#92400e") end
    end
  end

  -- Insulated Metal Roof with 2 Solar Panels mounted on top
  for y = 28, 42 do
    for x = 20, 95 do
      local ridge = (x) % 5
      setHex(img, x, y, (ridge <= 2) and "#94a3b8" or "#334155")
    end
  end
  -- Solar Panels on roof (X: 45 to 70, Y: 30 to 38)
  for y = 30, 38 do
    for x = 45, 70 do
      local isBorder = (x == 45 or x == 70 or y == 30 or y == 38 or x == 57)
      setHex(img, x, y, isBorder and "#e2e8f0" or "#0284c7")
    end
  end

  -- Warm LED String Lights under eaves (Y: 41, X: 22 to 92)
  for x = 24, 92, 4 do
    setHex(img, x, 41, "#ffffff"); setHex(img, x, 42, "#fef08a")
    -- Warm ambient light cast
    setHex(img, x, 43, "#facc15", 140)
  end

  -- Radio Antenna Tower with beacon (X: 86, Y: 8 to 28)
  for y = 8, 28 do setHex(img, 86, y, "#f1f5f9") end
  setHex(img, 86, 7, "#ef4444"); setHex(img, 86, 6, "#ffffff")

  -- Bioenergy Bike-Generator Station mounted on Left (X: 4 to 22, Y: 58 to 78)
  -- Bike frame & wheels
  setHex(img, 7, 72, "#94a3b8"); setHex(img, 17, 72, "#94a3b8") -- Wheels
  for x = 9, 15 do setHex(img, x, 68, "#ef4444") end -- Red frame
  setHex(img, 8, 66, "#78350f") -- Saddle
  setHex(img, 16, 65, "#cbd5e1") -- Handlebar
  -- Generator dynamo & belt on rear wheel
  setHex(img, 6, 73, "#facc15"); setHex(img, 5, 73, "#ca8a04") -- Dynamo
  for x = 4, 18 do setHex(img, x, 78, "#475569") end -- Fixed stationary stand
  -- Heavy power cables running into cabin
  for x = 7, 26 do setHex(img, x, 76, "#1e293b") end

  -- Secure Wooden Perimeter Fence with barbed wire posts on right (X: 96 to 126, Y: 54 to 80)
  for px = 98, 126, 8 do
    for y = 54, 80 do setHex(img, px, y, "#78350f"); setHex(img, px+1, y, "#451a03") end -- Post
  end
  -- Horizontal crossbars & barbed wire lines
  for x = 96, 127 do
    setHex(img, x, 58, "#94a3b8") -- Barbed wire line 1
    setHex(img, x, 66, "#b45309") -- Wood rail
    setHex(img, x, 74, "#b45309") -- Wood rail
  end

  saveRef(spr, "refugio_lvl5_fortaleza")
end