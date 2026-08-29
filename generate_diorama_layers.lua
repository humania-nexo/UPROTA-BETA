local function setPx(img, x, y, r, g, b, a)
  a = a or 255
  if x >= 0 and x < img.width and y >= 0 and y < img.height then
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

local function saveMod(spr, name)
  spr:saveCopyAs(dirRef .. "/" .. name .. ".aseprite")
  spr:saveCopyAs(dirRef .. "/" .. name .. ".png")
  spr:close()
end

----------------------------------------------------------------------
-- 1. MÓDULO DE GALLINERO Y GALLINA
----------------------------------------------------------------------

-- A. modulo_gallinero (24x32 px)
do
  local spr = Sprite(24, 32); local img = spr.cels[1].image
  local W_HI, W_MD, W_DK, OUT = "#d97706", "#92400e", "#451a03", "#1a0802"
  local WIRE = "#cbd5e1"
  local STRAW = "#fde047"
  local TIN_HI, TIN_DK = "#94a3b8", "#334155"

  -- Slanted Tin Roof on top (Y: 2 to 6, X: 1 to 22)
  for y = 2, 6 do
    for x = 1, 22 do
      setHex(img, x, y, (y <= 3) and TIN_HI or TIN_DK)
    end
  end

  -- Vertical Corner Posts
  for y = 6, 29 do
    setHex(img, 2, y, W_HI); setHex(img, 3, y, W_MD); setHex(img, 4, y, W_DK)
    setHex(img, 19, y, W_MD); setHex(img, 20, y, W_DK); setHex(img, 21, y, OUT)
  end

  -- Horizontal Wooden Slats
  for _, hy in ipairs({6, 17, 28}) do
    for x = 2, 21 do
      setHex(img, x, hy, W_HI); setHex(img, x, hy+1, W_DK)
    end
  end

  -- Wire Mesh Netting in upper & lower compartments
  for y = 8, 16 do
    for x = 5, 18 do
      if (x + y) % 3 == 0 then setHex(img, x, y, WIRE, 160) end
    end
  end
  for y = 19, 27 do
    for x = 5, 18 do
      if (x + y) % 3 == 0 then setHex(img, x, y, WIRE, 160) end
    end
  end

  -- Upper Nesting Box with straw bed (Y: 13 to 16, X: 6 to 14)
  for y = 14, 16 do for x = 6, 14 do setHex(img, x, y, STRAW) end end
  setHex(img, 9, 14, "#ffffff"); setHex(img, 10, 14, "#fef9c3") -- Small egg!

  -- Roosting Perch Ladder on right
  for y = 18, 28 do setHex(img, 16, y, W_MD) end
  setHex(img, 14, 21, W_HI); setHex(img, 15, 21, W_DK)
  setHex(img, 14, 25, W_HI); setHex(img, 15, 25, W_DK)

  -- Legs standing on ground
  for y = 29, 31 do setHex(img, 3, y, W_DK); setHex(img, 20, y, W_DK) end

  saveMod(spr, "modulo_gallinero")
end

-- B. sprite_gallina_frame1 (16x16 px - Cabeza alzada / alerta)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  local F_HI, F_MD, F_DK = "#fde047", "#d97706", "#92400e"
  local COMB = "#ef4444"
  local BEAK = "#f59e0b"

  -- Body (Y: 7 to 12, X: 4 to 12)
  for y = 7, 12 do
    for x = 4, 12 do
      setHex(img, x, y, (x <= 7) and F_HI or F_MD)
    end
  end
  -- Wing feather texture
  for y = 8, 10 do for x = 6, 9 do setHex(img, x, y, F_DK) end end

  -- Neck & Head raised high (Y: 3 to 7, X: 9 to 13)
  setHex(img, 11, 4, F_HI); setHex(img, 12, 4, F_MD)
  setHex(img, 10, 5, F_HI); setHex(img, 11, 5, F_HI); setHex(img, 12, 5, F_MD)
  setHex(img, 10, 6, F_HI); setHex(img, 11, 6, F_MD)

  -- Red Comb & Wattle
  setHex(img, 11, 2, COMB); setHex(img, 12, 3, COMB)
  setHex(img, 12, 6, COMB) -- Wattle under beak

  -- Yellow Beak & Black Eye
  setHex(img, 13, 5, BEAK); setHex(img, 14, 5, BEAK)
  setHex(img, 11, 4, "#0f172a") -- Eye

  -- Tail feathers pointing up (Y: 5 to 8, X: 3, 4)
  setHex(img, 3, 5, F_DK); setHex(img, 3, 6, F_DK); setHex(img, 4, 6, F_MD)

  -- Yellow Legs
  setHex(img, 6, 13, BEAK); setHex(img, 6, 14, BEAK); setHex(img, 5, 14, BEAK)
  setHex(img, 9, 13, BEAK); setHex(img, 9, 14, BEAK); setHex(img, 8, 14, BEAK)

  saveMod(spr, "sprite_gallina_frame1")
end

-- C. sprite_gallina_frame2 (16x16 px - Inclinada picoteando el suelo)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  local F_HI, F_MD, F_DK = "#fde047", "#d97706", "#92400e"
  local COMB = "#ef4444"
  local BEAK = "#f59e0b"

  -- Body tilted down forward (Y: 6 to 12, X: 3 to 11)
  for y = 6, 11 do
    for x = 3, 11 do
      setHex(img, x, y, (x <= 6) and F_HI or F_MD)
    end
  end
  -- Wing feather texture
  for y = 7, 9 do for x = 5, 8 do setHex(img, x, y, F_DK) end end

  -- Neck & Head leaning down to ground (Y: 9 to 13, X: 11 to 14)
  setHex(img, 11, 9, F_HI); setHex(img, 12, 10, F_HI)
  setHex(img, 12, 11, F_HI); setHex(img, 13, 11, F_MD)
  setHex(img, 13, 12, F_HI); setHex(img, 14, 12, F_MD)

  -- Comb & Beak pecking ground
  setHex(img, 13, 10, COMB)
  setHex(img, 14, 13, BEAK); setHex(img, 15, 14, BEAK) -- Beak touching dirt!
  setHex(img, 13, 11, "#0f172a") -- Eye

  -- Tail feathers high up (Y: 3 to 6, X: 2 to 4)
  setHex(img, 2, 3, F_DK); setHex(img, 3, 4, F_DK); setHex(img, 3, 5, F_MD)

  -- Legs
  setHex(img, 6, 12, BEAK); setHex(img, 6, 13, BEAK); setHex(img, 7, 14, BEAK)
  setHex(img, 9, 12, BEAK); setHex(img, 9, 13, BEAK); setHex(img, 10, 14, BEAK)

  -- Grain seeds on ground
  setHex(img, 13, 15, "#facc15"); setHex(img, 15, 15, "#facc15")

  saveMod(spr, "sprite_gallina_frame2")
end

----------------------------------------------------------------------
-- 2. MÓDULO DE HUERTO Y CULTIVOS
----------------------------------------------------------------------

-- A. modulo_huerto_cajones (32x16 px - 2 cajones de madera con brotes)
do
  local spr = Sprite(32, 16); local img = spr.cels[1].image
  local W_HI, W_MD, W_DK, OUT = "#d97706", "#92400e", "#451a03", "#1a0802"
  local SOIL = "#271b13"
  local P_HI, P_MD = "#84cc16", "#4d7c0f"
  local CARROT = "#ea580c"

  -- Left Crate (X: 1 to 14, Y: 7 to 15)
  for y = 7, 15 do
    for x = 1, 14 do
      if x == 1 or x == 14 or y == 7 or y == 15 then setHex(img, x, y, (y == 7 or x == 1) and W_HI or OUT)
      else setHex(img, x, y, (y <= 9) and SOIL or W_MD) end
    end
  end
  -- Right Crate (X: 17 to 30, Y: 7 to 15)
  for y = 7, 15 do
    for x = 17, 30 do
      if x == 17 or x == 30 or y == 7 or y == 15 then setHex(img, x, y, (y == 7 or x == 17) and W_HI or OUT)
      else setHex(img, x, y, (y <= 9) and SOIL or W_MD) end
    end
  end

  -- Metal corner reinforcement brackets
  setHex(img, 2, 8, "#cbd5e1"); setHex(img, 13, 8, "#64748b")
  setHex(img, 18, 8, "#cbd5e1"); setHex(img, 29, 8, "#64748b")

  -- Sprouting plants in Left Crate (Tomatoes / Herbs)
  for _, gx in ipairs({3, 7, 11}) do
    setHex(img, gx, 5, P_HI); setHex(img, gx+1, 4, P_HI); setHex(img, gx, 6, P_MD)
    setHex(img, gx-1, 4, P_MD); setHex(img, gx+2, 5, P_MD)
  end
  setHex(img, 8, 6, "#ef4444") -- Ripe cherry tomato!

  -- Carrots in Right Crate (with orange tops showing)
  for _, cx in ipairs({19, 23, 27}) do
    setHex(img, cx, 6, CARROT); setHex(img, cx+1, 6, "#c2410c") -- Carrot shoulder
    setHex(img, cx, 4, P_HI); setHex(img, cx+1, 3, P_HI); setHex(img, cx-1, 5, P_MD); setHex(img, cx+2, 4, P_MD) -- Feathery greens
  end

  saveMod(spr, "modulo_huerto_cajones")
end

----------------------------------------------------------------------
-- 3. MÓDULO DE FOGÓN Y FUEGO ANIMADO
----------------------------------------------------------------------

-- A. modulo_fogon_piedras (24x16 px - Círculo de piedras y leña)
do
  local spr = Sprite(24, 16); local img = spr.cels[1].image
  local S_HI, S_MD, S_DK = "#a8a29e", "#57534e", "#292524"
  local L_HI, L_MD, L_DK = "#b45309", "#78350f", "#451a03"
  local ASH = "#1e293b"

  -- Stone Hearth Ring (Oval X: 2 to 21, Y: 4 to 14)
  for y = 4, 14 do
    for x = 2, 21 do
      local d = math.sqrt((x - 11.5)^2 * 0.7 + (y - 9)^2 * 2.2)
      if d <= 6.5 and d >= 4.0 then
        -- Multi-stone segments
        local stIdx = math.floor((x + y*2) / 3)
        setHex(img, x, y, (stIdx % 2 == 0) and S_HI or S_MD)
      elseif d < 4.0 then
        setHex(img, x, y, ASH) -- Ash pit
      end
    end
  end

  -- Crossed Firewood Logs (X: 6 to 17, Y: 7 to 11)
  -- Diagonal log 1
  for i = 0, 7 do setHex(img, 7 + i, 7 + math.floor(i*0.5), (i % 2 == 0) and L_HI or L_MD) end
  -- Diagonal log 2
  for i = 0, 7 do setHex(img, 15 - i, 7 + math.floor(i*0.5), (i % 2 == 0) and L_MD or L_DK) end

  -- Red hot glowing embers in center
  setHex(img, 11, 8, "#ea580c"); setHex(img, 12, 8, "#facc15"); setHex(img, 11, 9, "#ef4444"); setHex(img, 12, 9, "#ea580c")

  saveMod(spr, "modulo_fogon_piedras")
end

-- B. sprite_fuego_frame1 (16x16 px - Llama central alta)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  local F_CORE, F_HI, F_MD, F_DK = "#ffffff", "#fef08a", "#f97316", "#ef4444"

  for y = 3, 14 do
    local w = math.floor((15 - y) * 4 / 12) + 1
    for dx = -w, w do
      local x = 8 + dx
      if math.abs(dx) <= 1 and y >= 8 and y <= 12 then setHex(img, x, y, F_CORE)
      elseif math.abs(dx) <= 2 and y >= 6 then setHex(img, x, y, F_HI)
      else setHex(img, x, y, (dx <= 0) and F_MD or F_DK) end
    end
  end
  setHex(img, 8, 2, F_CORE); setHex(img, 8, 3, F_HI); setHex(img, 7, 4, F_HI)
  setHex(img, 5, 8, F_MD); setHex(img, 11, 7, F_DK)
  -- Spark
  setHex(img, 10, 1, F_HI)

  saveMod(spr, "sprite_fuego_frame1")
end

-- C. sprite_fuego_frame2 (16x16 px - Llama oscilando a la derecha)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  local F_CORE, F_HI, F_MD, F_DK = "#ffffff", "#fef08a", "#f97316", "#ef4444"

  for y = 4, 14 do
    local w = math.floor((15 - y) * 4 / 12) + 1
    for dx = -w, w do
      local x = 9 + dx + math.floor((14 - y) * 0.4)
      if math.abs(dx) <= 1 and y >= 8 and y <= 12 then setHex(img, x, y, F_CORE)
      elseif math.abs(dx) <= 2 and y >= 6 then setHex(img, x, y, F_HI)
      else setHex(img, x, y, (dx <= 0) and F_MD or F_DK) end
    end
  end
  setHex(img, 11, 2, F_CORE); setHex(img, 10, 3, F_HI); setHex(img, 12, 4, F_MD)
  setHex(img, 6, 9, F_MD); setHex(img, 12, 8, F_DK)
  -- Sparks
  setHex(img, 13, 1, F_CORE); setHex(img, 6, 4, F_HI)

  saveMod(spr, "sprite_fuego_frame2")
end

----------------------------------------------------------------------
-- 4. MÓDULO DE MESA DE TALLER
----------------------------------------------------------------------

-- A. modulo_mesa_taller (32x20 px)
do
  local spr = Sprite(32, 20); local img = spr.cels[1].image
  local W_HI, W_MD, W_DK, OUT = "#d97706", "#92400e", "#451a03", "#1a0802"
  local S_HI, S_MD, S_DK = "#f1f5f9", "#94a3b8", "#475569"

  -- Heavy Wooden Workbench Top (Y: 6 to 10, X: 2 to 29)
  for y = 6, 10 do
    for x = 2, 29 do
      if y == 6 or x == 2 then setHex(img, x, y, W_HI)
      elseif y == 10 or x == 29 then setHex(img, x, y, OUT)
      else setHex(img, x, y, (y <= 7) and W_HI or W_MD) end
    end
  end

  -- Sturdy Legs (Y: 10 to 19)
  for y = 10, 19 do
    setHex(img, 4, y, W_HI); setHex(img, 5, y, W_MD); setHex(img, 6, y, W_DK)
    setHex(img, 25, y, W_MD); setHex(img, 26, y, W_DK); setHex(img, 27, y, OUT)
  end
  -- Lower crossbar shelf with toolbox
  for x = 6, 25 do setHex(img, x, 16, W_DK); setHex(img, x, 17, OUT) end
  for y = 13, 16 do for x = 11, 19 do setHex(img, x, y, (y == 13) and "#ef4444" or "#991b1b") end end -- Red toolbox below!
  setHex(img, 15, 14, "#facc15") -- Toolbox latch

  -- Steel Vise mounted on Left (X: 3 to 7, Y: 2 to 6)
  setHex(img, 4, 2, S_HI); setHex(img, 5, 2, S_HI); setHex(img, 6, 3, S_MD)
  setHex(img, 3, 3, S_HI); setHex(img, 4, 4, S_MD); setHex(img, 5, 4, S_DK)
  setHex(img, 3, 5, S_MD); setHex(img, 4, 5, S_DK) -- Screw

  -- Tools resting on tabletop:
  -- Handsaw on right (X: 20 to 28, Y: 4 to 6)
  for i = 0, 6 do setHex(img, 20 + i, 5, (i % 2 == 0) and S_HI or S_DK) end
  setHex(img, 27, 4, "#78350f"); setHex(img, 28, 4, "#d97706"); setHex(img, 28, 5, "#451a03") -- Wooden saw handle

  -- Hammer in middle (X: 11 to 17, Y: 4, 5)
  for x = 11, 15 do setHex(img, x, 5, "#d97706") end -- Handle
  setHex(img, 16, 4, S_HI); setHex(img, 16, 5, S_DK); setHex(img, 17, 4, S_MD) -- Hammer head

  -- Wood curls / shavings on tabletop
  setHex(img, 9, 6, "#fef08a"); setHex(img, 18, 6, "#fef08a"); setHex(img, 19, 7, "#facc15")

  saveMod(spr, "modulo_mesa_taller")
end

----------------------------------------------------------------------
-- 5. MÓDULO DE BICI-GENERADOR
----------------------------------------------------------------------

-- A. modulo_bici_generador (32x24 px)
do
  local spr = Sprite(32, 24); local img = spr.cels[1].image
  local F_RED, F_DK = "#ef4444", "#991b1b"
  local S_HI, S_MD, S_DK = "#f1f5f9", "#94a3b8", "#334155"
  local G_LT, G_MD = "#facc15", "#ca8a04"

  -- Stationary Roller Stand Base (Y: 20 to 23, X: 3 to 29)
  for x = 4, 28 do setHex(img, x, 22, "#475569"); setHex(img, x, 23, "#1e293b") end
  setHex(img, 7, 21, "#64748b"); setHex(img, 8, 20, "#94a3b8"); setHex(img, 23, 21, "#64748b"); setHex(img, 24, 20, "#94a3b8")

  -- Rear Wheel with Generator Pulley (Center at 8, 15)
  for y = 10, 20 do for x = 3, 13 do
    local d = math.sqrt((x - 8)^2 + (y - 15)^2)
    if d <= 5.2 and d >= 4.0 then setHex(img, x, y, (x <= 8) and S_HI or S_DK) end
  end end
  setHex(img, 8, 15, S_HI) -- Hub
  -- Drive Belt from rear wheel to Dynamo
  for x = 3, 7 do setHex(img, x, 17, "#18181b"); setHex(img, x, 18, "#18181b") end
  -- Dynamo / Alternator Unit on Left
  for y = 16, 21 do for x = 1, 5 do setHex(img, x, y, (x <= 3) and G_LT or G_MD) end end

  -- Front Wheel (Center at 24, 15)
  for y = 10, 20 do for x = 19, 29 do
    local d = math.sqrt((x - 24)^2 + (y - 15)^2)
    if d <= 5.2 and d >= 4.0 then setHex(img, x, y, (x <= 24) and S_HI or S_DK) end
  end end
  setHex(img, 24, 15, S_HI)

  -- Red Bicycle Diamond Frame
  for i = 0, 7 do
    setHex(img, 8 + i, 15 - math.floor(i*0.8), F_RED) -- Seat stay
    setHex(img, 15 + i, 10 + math.floor(i*0.7), F_RED) -- Top tube
    setHex(img, 15 - i, 18 - math.floor(i*0.5), F_RED) -- Bottom bracket chainstay
    setHex(img, 15 + i, 18 - math.floor(i*0.5), F_RED) -- Down tube
  end
  -- Seat post & Saddle (X: 13 to 17, Y: 7 to 9)
  for y = 9, 11 do setHex(img, 15, y, S_MD) end
  for x = 12, 17 do setHex(img, x, 8, (x <= 14) and "#78350f" or "#451a03") end -- Saddle

  -- Fork, Stem & Handlebars (X: 22 to 26, Y: 4 to 9)
  for y = 8, 15 do setHex(img, 24, y, S_MD) end -- Fork
  for x = 23, 27 do setHex(img, x, 5, S_HI) end -- Handlebars
  setHex(img, 22, 6, "#18181b"); setHex(img, 27, 6, "#18181b") -- Grips

  -- Pedals & Crank
  setHex(img, 15, 17, S_HI); setHex(img, 14, 16, "#18181b"); setHex(img, 16, 18, "#18181b")

  -- Battery Bank Box (X: 28 to 31, Y: 17 to 22)
  for y = 17, 22 do for x = 28, 31 do setHex(img, x, y, (x == 28 or y == 17) and "#3b82f6" or "#1d4ed8") end end
  -- Glowing Green Charging LED Indicator!
  setHex(img, 29, 18, "#4ade80"); setHex(img, 30, 18, "#22c55e")
  -- Power cables connecting to battery
  for x = 5, 28 do setHex(img, x, 21, "#0f172a") end

  saveMod(spr, "modulo_bici_generador")
end

----------------------------------------------------------------------
-- 6. MÓDULO DE ANTENA DE RADIO
----------------------------------------------------------------------

-- A. modulo_antena_mutil (16x32 px)
do
  local spr = Sprite(16, 32); local img = spr.cels[1].image
  local S_HI, S_MD, S_DK = "#f1f5f9", "#cbd5e1", "#64748b"
  local BEACON_R = "#ef4444"
  local BEACON_W = "#ffffff"
  local COAX = "#1e293b"

  -- Flashing Red Aircraft/Beacon Light at top (X: 7 to 9, Y: 1 to 4)
  setHex(img, 8, 1, BEACON_W)
  setHex(img, 7, 2, BEACON_R); setHex(img, 8, 2, BEACON_W); setHex(img, 9, 2, BEACON_R)
  setHex(img, 7, 3, BEACON_R); setHex(img, 8, 3, BEACON_R); setHex(img, 9, 3, BEACON_R)
  setHex(img, 8, 4, S_DK)

  -- Radio Signal Waves Emitting
  setHex(img, 5, 2, "#38bdf8", 160); setHex(img, 11, 2, "#38bdf8", 160)
  setHex(img, 3, 1, "#38bdf8", 100); setHex(img, 13, 1, "#38bdf8", 100)

  -- Main Mast Pole (X: 8, Y: 4 to 28)
  for y = 4, 28 do setHex(img, 8, y, (y % 2 == 0) and S_HI or S_MD) end

  -- Cross Struts & Guy Wire Stays
  -- Top crossbar at Y: 8
  for x = 4, 12 do setHex(img, x, 8, S_HI) end
  setHex(img, 4, 7, S_MD); setHex(img, 12, 7, S_MD)

  -- Middle crossbar at Y: 15
  for x = 3, 13 do setHex(img, x, 15, S_HI) end
  setHex(img, 3, 14, S_MD); setHex(img, 13, 14, S_MD)

  -- Lower crossbar at Y: 22
  for x = 2, 14 do setHex(img, x, 22, S_HI) end
  setHex(img, 2, 21, S_MD); setHex(img, 14, 21, S_MD)

  -- Diagonal Trussing Lattice
  for i = 0, 5 do
    setHex(img, 8 - i, 16 + i, S_DK)
    setHex(img, 8 + i, 16 + i, S_DK)
    setHex(img, 8 - i, 23 + i, S_DK)
    setHex(img, 8 + i, 23 + i, S_DK)
  end

  -- Base Mounting Flange & Roof Bolts (Y: 28 to 31, X: 4 to 12)
  for y = 28, 30 do for x = 5, 11 do setHex(img, x, y, (y == 28) and "#78350f" or "#451a03") end end
  setHex(img, 6, 29, "#facc15"); setHex(img, 10, 29, "#facc15") -- Brass mounting bolts

  -- Coaxial Cable descending down right side (X: 9, 10)
  for y = 5, 31 do
    if y % 3 == 0 then setHex(img, 9, y, COAX) end
  end
  setHex(img, 10, 31, COAX); setHex(img, 11, 31, COAX)

  saveMod(spr, "modulo_antena_mutil")
end