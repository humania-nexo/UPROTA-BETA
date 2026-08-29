local function setPx(img, x, y, r, g, b, a)
  a = a or 255
  if x >= 0 and x < 48 and y >= 0 and y < 48 then
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

local dirNPC = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/npcs"

local function saveNPC(spr, name)
  spr:saveCopyAs(dirNPC .. "/" .. name .. ".aseprite")
  spr:saveCopyAs(dirNPC .. "/" .. name .. ".png")
  spr:close()
end

local function drawDonChuiBase(img, mood)
  -- Dark atmospheric portrait frame backing (circular gradient)
  for y = 0, 47 do
    for x = 0, 47 do
      local d = math.sqrt((x - 24)^2 + (y - 24)^2)
      if d <= 23 then
        setHex(img, x, y, (d <= 19) and "#1e293b" or "#0f172a")
      end
    end
  end

  -- Clothes & Body (Y: 33 to 47, X: 8 to 40)
  -- Denim Shirt & Suspenders
  for y = 34, 47 do
    local w = math.floor((y - 34) * 0.8) + 12
    for dx = -w, w do
      local x = 24 + dx
      setHex(img, x, y, (dx <= 0) and "#2563eb" or "#1d4ed8") -- Denim blue shirt
    end
  end
  -- Red Neckerchief / Bandana at throat
  for y = 32, 36 do
    for x = 20, 28 do
      setHex(img, x, y, (y <= 33) and "#ef4444" or "#b91c1c")
    end
  end
  -- Leather suspender straps
  for y = 34, 47 do
    setHex(img, 15, y, "#78350f"); setHex(img, 16, y, "#451a03")
    setHex(img, 32, y, "#78350f"); setHex(img, 33, y, "#451a03")
  end

  -- Neck (Y: 28 to 33, X: 19 to 29)
  for y = 28, 33 do
    for x = 19, 29 do
      setHex(img, x, y, (x <= 23) and "#fdba74" or "#ea580c")
    end
  end

  -- Head & Weathered Skin (Oval Y: 12 to 28, X: 14 to 34)
  for y = 12, 28 do
    for x = 14, 34 do
      local d = math.sqrt((x - 24)^2 + (y - 20)^2 * 1.2)
      if d <= 9.5 then
        if x <= 22 then setHex(img, x, y, (y <= 18) and "#fed7aa" or "#fdba74")
        elseif x <= 27 then setHex(img, x, y, "#fb923c")
        else setHex(img, x, y, "#ea580c") end
      end
    end
  end

  -- Weathered Wrinkles on Forehead & Cheeks
  setHex(img, 19, 15, "#c2410c"); setHex(img, 24, 14, "#c2410c"); setHex(img, 29, 15, "#c2410c")
  setHex(img, 18, 17, "#c2410c"); setHex(img, 24, 16, "#c2410c"); setHex(img, 30, 17, "#c2410c")

  -- Rustic Flat Cap / Newsboy Beret (Boina de pana marrón Y: 6 to 14, X: 11 to 37)
  for y = 6, 12 do
    local w = math.floor((y - 6) * 1.2) + 9
    for dx = -w, w + 1 do
      local x = 24 + dx
      setHex(img, x, y, (y <= 8 or dx <= -2) and "#b45309" or "#78350f")
    end
  end
  -- Cap Visor / Brim (Y: 12 to 14, X: 13 to 35)
  for x = 13, 35 do setHex(img, x, 13, (x <= 24) and "#d97706" or "#451a03") end

  -- Grey / White Hair & Full Bushy Beard (Y: 22 to 34, X: 12 to 36)
  for y = 22, 34 do
    for x = 13, 35 do
      local inBeard = (y >= 26 and x >= 15 and x <= 33) or ((x <= 16 or x >= 32) and y >= 20)
      if inBeard then
        local strand = (x + y*3) % 4
        if strand == 0 then setHex(img, x, y, "#ffffff")
        elseif strand == 1 then setHex(img, x, y, "#f1f5f9")
        elseif strand == 2 then setHex(img, x, y, "#cbd5e1")
        else setHex(img, x, y, "#94a3b8") end
      end
    end
  end
  -- Mustache (Y: 24 to 27, X: 18 to 30)
  for y = 24, 27 do
    for x = 18, 30 do
      setHex(img, x, y, (x <= 24) and "#ffffff" or "#cbd5e1")
    end
  end

  -- Nose (Prominent sunburnt nose X: 22 to 26, Y: 18 to 23)
  for y = 18, 23 do
    for x = 22, 26 do
      setHex(img, x, y, (x == 22 or y == 18) and "#fed7aa" or "#ea580c")
    end
  end

  -- MOOD SPECIFIC DETAILS (Eyes, Brows, Mouth):
  if mood == "neutral" then
    -- Calm, kind, observant eyes
    for x = 17, 20 do setHex(img, x, 19, "#1e293b"); setHex(img, x, 18, "#78350f") end
    setHex(img, 18, 19, "#38bdf8"); setHex(img, 19, 19, "#ffffff")
    for x = 28, 31 do setHex(img, x, 19, "#1e293b"); setHex(img, x, 18, "#78350f") end
    setHex(img, 29, 19, "#38bdf8"); setHex(img, 30, 19, "#ffffff")
    -- Peaceful serene mouth behind mustache
    for x = 22, 26 do setHex(img, x, 28, "#7c2d12") end

  elseif mood == "hablando" then
    -- Expressive lecturing eyes & raised left eyebrow
    for x = 16, 20 do setHex(img, x, 17, "#cbd5e1") end -- Raised grey brow
    for x = 17, 20 do setHex(img, x, 19, "#1e293b") end
    setHex(img, 18, 19, "#38bdf8"); setHex(img, 19, 19, "#ffffff")
    for x = 28, 31 do setHex(img, x, 18, "#cbd5e1") end
    for x = 28, 31 do setHex(img, x, 19, "#1e293b") end
    setHex(img, 29, 19, "#38bdf8")
    -- Open speaking mouth under mustache
    for y = 27, 29 do for x = 22, 26 do setHex(img, x, y, (y == 28) and "#ffffff" or "#451a03") end end

  elseif mood == "orgulloso" then
    -- Happy crinkled smiling eyes (arrugas de alegría)
    setHex(img, 16, 19, "#7c2d12"); setHex(img, 17, 18, "#7c2d12"); setHex(img, 18, 18, "#7c2d12"); setHex(img, 19, 19, "#7c2d12")
    setHex(img, 20, 20, "#c2410c") -- Laugh line
    setHex(img, 28, 19, "#7c2d12"); setHex(img, 29, 18, "#7c2d12"); setHex(img, 30, 18, "#7c2d12"); setHex(img, 31, 19, "#7c2d12")
    setHex(img, 32, 20, "#c2410c")
    -- Wide warm smile
    for x = 21, 27 do setHex(img, x, 27, "#ffffff"); setHex(img, x, 28, "#7c2d12") end
    setHex(img, 20, 26, "#7c2d12"); setHex(img, 28, 26, "#7c2d12")

  elseif mood == "preocupado" then
    -- Furrowed concerned brow & compassionate gaze
    setHex(img, 17, 17, "#cbd5e1"); setHex(img, 18, 18, "#94a3b8"); setHex(img, 19, 18, "#78350f")
    setHex(img, 29, 18, "#78350f"); setHex(img, 30, 18, "#94a3b8"); setHex(img, 31, 17, "#cbd5e1")
    for x = 17, 20 do setHex(img, x, 20, "#1e293b") end
    setHex(img, 18, 20, "#38bdf8")
    for x = 28, 31 do setHex(img, x, 20, "#1e293b") end
    setHex(img, 29, 20, "#38bdf8")
    -- Tightened serious mouth
    for x = 22, 26 do setHex(img, x, 28, "#451a03") end
  end
end

-- 1. don_chui_neutral
do
  local spr = Sprite(48, 48); local img = spr.cels[1].image
  drawDonChuiBase(img, "neutral")
  saveNPC(spr, "don_chui_neutral")
end

-- 2. don_chui_hablando
do
  local spr = Sprite(48, 48); local img = spr.cels[1].image
  drawDonChuiBase(img, "hablando")
  saveNPC(spr, "don_chui_hablando")
end

-- 3. don_chui_orgulloso
do
  local spr = Sprite(48, 48); local img = spr.cels[1].image
  drawDonChuiBase(img, "orgulloso")
  saveNPC(spr, "don_chui_orgulloso")
end

-- 4. don_chui_preocupado
do
  local spr = Sprite(48, 48); local img = spr.cels[1].image
  drawDonChuiBase(img, "preocupado")
  saveNPC(spr, "don_chui_preocupado")
end