local function setPx(img, x, y, r, g, b, a)
  a = a or 255
  if x >= 0 and x < img.width and y >= 0 and y < img.height then
    img:drawPixel(x, y, app.pixelColor.rgba(r, g, b, a))
  end
end

local function hex2rgb(hex)
  hex = tostring(hex):gsub("#","")
  return tonumber("0x"..hex:sub(1,2)) or 0, tonumber("0x"..hex:sub(3,4)) or 0, tonumber("0x"..hex:sub(5,6)) or 0
end

local function setHex(img, x, y, hex, a)
  local r, g, b = hex2rgb(hex)
  setPx(img, x, y, r, g, b, a or 255)
end

local baseDir = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites"

local function saveAsset(spr, subfolder, name)
  local path = baseDir .. "/" .. subfolder .. "/" .. name
  spr:saveCopyAs(path .. ".aseprite")
  spr:saveCopyAs(path .. ".png")
  spr:close()
end

----------------------------------------------------------------------
-- 1. NPC: EL LUTIER ANCIANO (32x48 px)
----------------------------------------------------------------------
do
  local spr = Sprite(32, 48); local img = spr.cels[1].image
  local SKIN_HI, SKIN_MD, SKIN_DK = "#fed7aa", "#d97706", "#9a3412"
  local HAIR_W, HAIR_G = "#ffffff", "#cbd5e1"
  local COAT_HI, COAT_MD, COAT_DK = "#b45309", "#78350f", "#451a03" -- Tattered brown trench coat
  local SCARF = "#a855f7" -- Faded wool scarf
  local CASE_HI, CASE_MD, CASE_DK = "#d97706", "#92400e", "#271204" -- Wood violin case

  -- Violin Case Strapped to Back (Visible behind left shoulder X: 6 to 11, Y: 10 to 38)
  for y = 12, 36 do
    for x = 6, 10 do
      setHex(img, x, y, (x == 6 or x == 10) and CASE_DK or ((y <= 18) and CASE_HI or CASE_MD))
    end
  end
  setHex(img, 7, 10, CASE_DK); setHex(img, 8, 10, CASE_DK); setHex(img, 9, 10, CASE_DK) -- Violin scroll head
  setHex(img, 8, 11, CASE_HI)
  -- Leather harness strap crossing chest diagonally (from top left to bottom right)
  for i = 0, 16 do
    local sx = 10 + i; local sy = 16 + math.floor(i * 0.8)
    setHex(img, sx, sy, "#451a03"); setHex(img, sx, sy+1, "#78350f")
  end
  setHex(img, 17, 22, "#facc15") -- Brass buckle on chest

  -- Head & Long White Wispy Hair (Y: 5 to 17, X: 12 to 22)
  for y = 5, 10 do for x = 12, 22 do setHex(img, x, y, (x % 2 == 0) and HAIR_W or HAIR_G) end end
  -- Wispy hair strands over shoulders
  setHex(img, 11, 10, HAIR_W); setHex(img, 11, 11, HAIR_G); setHex(img, 10, 12, HAIR_W)
  setHex(img, 23, 10, HAIR_W); setHex(img, 23, 11, HAIR_G); setHex(img, 24, 12, HAIR_W)

  -- Face: Wise, kind, contemplative expression
  for y = 10, 15 do for x = 13, 21 do setHex(img, x, y, (x <= 16) and SKIN_HI or SKIN_MD) end end
  setHex(img, 15, 11, "#0f172a"); setHex(img, 19, 11, "#0f172a") -- Deep thoughtful eyes
  setHex(img, 17, 12, SKIN_DK) -- Slender aquiline nose

  -- Thin Grey Beard & Mustache (Y: 13 to 17)
  for y = 14, 17 do for x = 14, 20 do setHex(img, x, y, (y % 2 == 0) and HAIR_W or HAIR_G) end end

  -- Faded Violet Wool Scarf wrapped around neck (Y: 16 to 20, X: 12 to 22)
  for y = 17, 20 do for x = 13, 21 do setHex(img, x, y, (y == 17) and "#c084fc" or SCARF) end end
  setHex(img, 15, 21, SCARF); setHex(img, 15, 22, "#7e22ce") -- Scarf tail

  -- Long Weathered Trench Coat (Y: 20 to 42, X: 10 to 24)
  for y = 21, 42 do
    local w = math.floor((y - 21) * 0.3) + 5
    for dx = -w, w do
      local x = 17 + dx
      setHex(img, x, y, (dx <= 0) and COAT_HI or COAT_MD)
    end
  end
  -- Patches of different fabrics sewn on coat
  for y = 28, 32 do for x = 12, 15 do setHex(img, x, y, "#0284c7") end end -- Denim patch
  for y = 34, 38 do for x = 19, 22 do setHex(img, x, y, "#65a30d") end end -- Olive canvas patch

  -- Delicate hands of an artisan woodworker
  setHex(img, 9, 28, SKIN_HI); setHex(img, 9, 29, SKIN_MD)
  setHex(img, 24, 28, SKIN_HI); setHex(img, 24, 29, SKIN_MD)

  -- Worn Woolen Trousers & Old Leather Boots (Y: 41 to 46)
  for y = 41, 43 do
    for x = 14, 16 do setHex(img, x, y, "#334155") end
    for x = 18, 20 do setHex(img, x, y, "#1e293b") end
  end
  for y = 44, 46 do
    for x = 13, 16 do setHex(img, x, y, "#451a03") end
    for x = 18, 21 do setHex(img, x, y, "#271204") end
  end

  saveAsset(spr, "npcs", "npc_lutier_anciano_idle")
end

----------------------------------------------------------------------
-- 2. NPC: EL TUERTO (32x48 px)
----------------------------------------------------------------------
do
  local spr = Sprite(32, 48); local img = spr.cels[1].image
  local SKIN_HI, SKIN_MD, SKIN_DK = "#fed7aa", "#ea580c", "#9a3412" -- Sea-weathered salty skin
  local HAIR_G, HAIR_BK = "#94a3b8", "#334155"
  local COAT_NAVY, COAT_DK = "#1e3a8a", "#0f172a" -- Heavy navy peacoat
  local BRASS = "#facc15"
  local EDEN_PACK = "#0284c7" -- Clarión Island high-tech pack

  -- High-Tech Clarión Island Waterproof Backpack (Visible behind right shoulder X: 21 to 26, Y: 14 to 34)
  for y = 15, 33 do
    for x = 22, 26 do setHex(img, x, y, EDEN_PACK) end
  end
  -- Neon cyan / fluorescent warning label on pack
  setHex(img, 24, 20, "#38bdf8"); setHex(img, 25, 20, "#38bdf8")
  setHex(img, 24, 21, "#22c55e"); setHex(img, 25, 21, "#22c55e")

  -- Head & Salt-and-Pepper Hair (Y: 5 to 16, X: 11 to 21)
  for y = 5, 9 do for x = 11, 21 do setHex(img, x, y, (x % 2 == 0) and HAIR_G or HAIR_BK) end end

  -- Face: Scarred, weathered coastal sailor
  for y = 10, 15 do for x = 12, 20 do setHex(img, x, y, (x <= 15) and SKIN_HI or SKIN_MD) end end

  -- Black Leather Eyepatch over Left Eye (X: 13, 14, Y: 10 to 12)
  for y = 10, 12 do for x = 13, 15 do setHex(img, x, y, "#0f172a") end end
  -- Eyepatch diagonal strap around head
  setHex(img, 12, 10, "#0f172a"); setHex(img, 11, 9, "#0f172a")
  setHex(img, 16, 9, "#0f172a"); setHex(img, 17, 8, "#0f172a")

  -- Piercing Right Eye & Brow
  setHex(img, 18, 10, "#451a03") -- Thick salt-and-pepper brow
  setHex(img, 18, 11, "#38bdf8"); setHex(img, 19, 11, "#ffffff") -- Keen bright eye

  -- Scar across bridge of nose & Rugged Beard
  setHex(img, 16, 12, SKIN_DK); setHex(img, 16, 13, "#b91c1c") -- Scar
  for y = 13, 17 do for x = 12, 20 do setHex(img, x, y, (y % 2 == 0) and HAIR_G or HAIR_BK) end end

  -- Heavy Navy Peacoat with Double Brass Buttons (Y: 17 to 36, X: 9 to 23)
  for y = 17, 36 do
    for x = 9, 23 do setHex(img, x, y, (x <= 15) and COAT_NAVY or COAT_DK) end
  end
  -- Wide Sailor Lapels (Solapas cruzadas)
  for y = 17, 23 do
    setHex(img, 12, y, "#172554"); setHex(img, 20, y, "#172554")
  end
  -- 6 Brass Anchored Coat Buttons
  setHex(img, 13, 23, BRASS); setHex(img, 18, 23, BRASS)
  setHex(img, 13, 27, BRASS); setHex(img, 18, 27, BRASS)
  setHex(img, 13, 31, BRASS); setHex(img, 18, 31, BRASS)

  -- Sailor Rope Belt & Trousers (Y: 36 to 43)
  for x = 10, 22 do setHex(img, x, 36, "#fde047") end -- Hemp rope belt
  for y = 37, 43 do
    for x = 11, 15 do setHex(img, x, y, "#475569") end
    for x = 17, 21 do setHex(img, x, y, "#334155") end
  end

  -- Waterproof Heavy Sea Boots (Y: 44 to 46)
  for y = 44, 46 do
    for x = 10, 15 do setHex(img, x, y, "#0f172a") end
    for x = 17, 22 do setHex(img, x, y, "#020617") end
  end

  saveAsset(spr, "npcs", "npc_el_tuerto_idle")
end

----------------------------------------------------------------------
-- 3. MICRO-ANIMACIÓN DE RADIO (16x16 px - 2 Frames)
----------------------------------------------------------------------

local function saveRadioOnda(spr, name)
  local pathUI = baseDir .. "/ui/" .. name
  local pathMec = baseDir .. "/mecanicas/" .. name
  spr:saveCopyAs(pathUI .. ".aseprite")
  spr:saveCopyAs(pathUI .. ".png")
  spr:saveCopyAs(pathMec .. ".aseprite")
  spr:saveCopyAs(pathMec .. ".png")
  spr:close()
end

-- A. sprite_radio_onda_frame1 (16x16 px - Ondas suaves y núcleo brillante)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  local CORE_W = "#ffffff"
  local WAVE_CYAN = "#38bdf8"
  local WAVE_DK = "#0284c7"

  -- Central Radio Transmitter Node (Center at 8, 8)
  setHex(img, 8, 8, CORE_W)
  setHex(img, 7, 8, WAVE_CYAN); setHex(img, 9, 8, WAVE_CYAN)
  setHex(img, 8, 7, WAVE_CYAN); setHex(img, 8, 9, WAVE_CYAN)

  -- Inner Radio Wave Arc (Radius ~ 3.5)
  local innerPoints = {
    {5, 6}, {4, 7}, {4, 8}, {4, 9}, {5, 10},
    {11, 6}, {12, 7}, {12, 8}, {12, 9}, {11, 10},
    {6, 5}, {7, 4}, {8, 4}, {9, 4}, {10, 5},
    {6, 11}, {7, 12}, {8, 12}, {9, 12}, {10, 11}
  }
  for _, pt in ipairs(innerPoints) do
    setHex(img, pt[1], pt[2], WAVE_CYAN)
  end

  -- Outer Soft Wave Arc (Radius ~ 6)
  local outerPoints = {
    {2, 6}, {1, 7}, {1, 8}, {1, 9}, {2, 10},
    {14, 6}, {15, 7}, {15, 8}, {15, 9}, {14, 10},
    {6, 2}, {7, 1}, {8, 1}, {9, 1}, {10, 2},
    {6, 14}, {7, 15}, {8, 15}, {9, 15}, {10, 14}
  }
  for _, pt in ipairs(outerPoints) do
    setHex(img, pt[1], pt[2], WAVE_DK, 180)
  end

  saveRadioOnda(spr, "sprite_radio_onda_frame1")
end

-- B. sprite_radio_onda_frame2 (16x16 px - Ondas crepitando con estática y destellos)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  local CORE_W = "#ffffff"
  local SPARK_Y = "#fde047"
  local WAVE_CYAN = "#38bdf8"
  local WAVE_DK = "#0369a1"

  -- Central Radio Node with Energy Pulse Glint
  setHex(img, 8, 8, SPARK_Y)
  setHex(img, 7, 7, CORE_W); setHex(img, 9, 9, CORE_W)
  setHex(img, 7, 9, CORE_W); setHex(img, 9, 7, CORE_W)
  setHex(img, 8, 6, SPARK_Y); setHex(img, 8, 10, SPARK_Y)
  setHex(img, 6, 8, SPARK_Y); setHex(img, 10, 8, SPARK_Y)

  -- Middle Resonant Wave Arc
  local midPoints = {
    {4, 5}, {3, 7}, {3, 8}, {3, 9}, {4, 11},
    {12, 5}, {13, 7}, {13, 8}, {13, 9}, {12, 11},
    {5, 4}, {7, 3}, {8, 3}, {9, 3}, {11, 4},
    {5, 12}, {7, 13}, {8, 13}, {9, 13}, {11, 12}
  }
  for _, pt in ipairs(midPoints) do
    setHex(img, pt[1], pt[2], WAVE_CYAN)
  end

  -- Expanded Outer Wave Pulses & Static Spark Flecks
  local expandPoints = {
    {1, 5}, {0, 8}, {1, 11},
    {15, 5}, {16, 8}, {15, 11},
    {5, 1}, {8, 0}, {11, 1},
    {5, 15}, {8, 16}, {11, 15}
  }
  for _, pt in ipairs(expandPoints) do
    setHex(img, pt[1], pt[2], WAVE_DK)
  end
  -- Static sparks in the ether
  setHex(img, 2, 2, SPARK_Y); setHex(img, 14, 2, SPARK_Y)
  setHex(img, 2, 14, SPARK_Y); setHex(img, 14, 14, SPARK_Y)

  saveRadioOnda(spr, "sprite_radio_onda_frame2")
end