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

local baseDir = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA"

local function saveAvatar(spr, name)
  spr:saveCopyAs(baseDir .. "/assets/sprites/avatars/" .. name .. ".aseprite")
  spr:saveCopyAs(baseDir .. "/assets/sprites/avatars/" .. name .. ".png")
  
  -- Also generate 32x32 variant if it's 44x44
  if spr.width == 44 then
    local spr32 = Sprite(spr)
    spr32:resize(32, 32)
    local name32 = name:gsub("_44x44", "_32x32")
    if name32 == name then name32 = name .. "_32x32" end
    spr32:saveCopyAs(baseDir .. "/assets/sprites/avatars/" .. name32 .. ".aseprite")
    spr32:saveCopyAs(baseDir .. "/assets/sprites/avatars/" .. name32 .. ".png")
    spr32:close()
  end
  spr:close()
end

----------------------------------------------------------------------
-- 1. AVATAR DE ANIGAMI AGADNI (DIRECTOR) - HOMBRE DE VITRUVIO (44x44 px)
----------------------------------------------------------------------
do
  local spr = Sprite(44, 44); local img = spr.cels[1].image
  local BG_DARK = "#090d16"
  local CIRCLE_GOLD = "#d97706"
  local SQUARE_GOLD = "#b45309"
  local BODY_GOLD = "#fde047"
  local BODY_HI = "#ffffff"
  local BODY_DK = "#78350f"

  -- Deep Celestial / Slate Canvas Background
  for y = 0, 43 do for x = 0, 43 do
    local d = math.sqrt((x - 22)^2 + (y - 22)^2)
    if d <= 21.5 then setHex(img, x, y, (d <= 17) and BG_DARK or "#0f172a") end
  end end

  -- Golden Vitruvian Outer Circle (Radius ~ 19)
  for y = 0, 43 do for x = 0, 43 do
    local d = math.sqrt((x - 22)^2 + (y - 22)^2)
    if d <= 19.5 and d >= 18.2 then setHex(img, x, y, CIRCLE_GOLD) end
  end end

  -- Golden Vitruvian Inscribed Square (X: 8 to 36, Y: 8 to 36)
  for i = 8, 36 do
    setHex(img, i, 8, SQUARE_GOLD); setHex(img, i, 36, SQUARE_GOLD)
    setHex(img, 8, i, SQUARE_GOLD); setHex(img, 36, i, SQUARE_GOLD)
  end

  -- Central Navel / Origin of Harmony Glint (Center at 22, 22)
  setHex(img, 22, 22, BODY_HI)

  -- Head of the Vitruvian Man (Y: 6 to 12, X: 20 to 24)
  for y = 7, 11 do for x = 20, 24 do
    local d = math.sqrt((x - 22)^2 + (y - 9)^2)
    if d <= 2.2 then setHex(img, x, y, (x == 22 and y == 9) and BODY_HI or BODY_GOLD) end
  end end
  setHex(img, 22, 12, BODY_GOLD) -- Neck

  -- Torso & Spine (Y: 13 to 24, X: 19 to 25)
  for y = 13, 24 do
    for x = 20, 24 do
      local isChest = (y <= 16 and (x == 20 or x == 24))
      setHex(img, x, y, isChest and BODY_HI or ((y % 2 == 0) and BODY_GOLD or BODY_DK))
    end
  end

  -- 4 ARMS (Leonardo's Dual Stances):
  -- Pose A: Horizontal Straight Outstretched Arms (Y: 15, X: 8 to 36)
  for x = 9, 35 do
    setHex(img, x, 15, BODY_GOLD); setHex(img, x, 16, BODY_DK)
  end
  setHex(img, 9, 15, BODY_HI); setHex(img, 35, 15, BODY_HI) -- Fingertips touching circle

  -- Pose B: Upraised Diagonal Arms (Reaching to Circle Upper Edges)
  for i = 0, 11 do
    setHex(img, 21 - i, 14 - math.floor(i * 0.5), BODY_GOLD)
    setHex(img, 23 + i, 14 - math.floor(i * 0.5), BODY_GOLD)
  end
  setHex(img, 10, 8, BODY_HI); setHex(img, 34, 8, BODY_HI) -- Upper hands

  -- 4 LEGS (Leonardo's Dual Stances):
  -- Pose A: Straight Standing Legs (Y: 25 to 36)
  for y = 25, 36 do
    setHex(img, 21, y, BODY_GOLD); setHex(img, 23, y, BODY_GOLD)
  end
  setHex(img, 20, 36, BODY_HI); setHex(img, 24, 36, BODY_HI) -- Feet on square base

  -- Pose B: Spread Out Striding Legs (Reaching to Circle Lower Edges)
  for i = 0, 11 do
    local lx = 21 - i; local ly = 25 + i
    local rx = 23 + i; local ry = 25 + i
    if ly <= 36 then setHex(img, lx, ly, BODY_GOLD); setHex(img, rx, ry, BODY_GOLD) end
  end
  setHex(img, 10, 36, BODY_HI); setHex(img, 34, 36, BODY_HI) -- Spread feet on circle

  -- Ancient Manuscript Golden Ratio Tick Marks (Left and right scales)
  setHex(img, 5, 15, "#ca8a04"); setHex(img, 5, 22, "#ca8a04"); setHex(img, 5, 29, "#ca8a04")
  setHex(img, 38, 15, "#ca8a04"); setHex(img, 38, 22, "#ca8a04"); setHex(img, 38, 29, "#ca8a04")

  saveAvatar(spr, "avatar_anigami_44x44")
end

----------------------------------------------------------------------
-- 2. AVATAR DE NEXO (INGENIERO PRINCIPAL & IA) (44x44 px)
----------------------------------------------------------------------
do
  local spr = Sprite(44, 44); local img = spr.cels[1].image
  local BG_DARK = "#030712"
  local CHASSIS = "#1e293b"
  local CHASSIS_HI = "#475569"
  local CYAN_HI = "#ffffff"
  local CYAN_MD = "#38bdf8"
  local CYAN_DK = "#0284c7"
  local CIRCUIT = "#22c55e"

  -- Hexagonal Background Shield
  for y = 0, 43 do for x = 0, 43 do
    local d = math.sqrt((x - 22)^2 + (y - 22)^2)
    if d <= 21.5 then setHex(img, x, y, (d <= 18) and BG_DARK or "#0f172a") end
  end end

  -- Android Head / Tactical Terminal (Y: 7 to 20, X: 14 to 30)
  for y = 8, 19 do
    for x = 15, 29 do
      local isBorder = (x == 15 or x == 29 or y == 8 or y == 19)
      setHex(img, x, y, isBorder and CHASSIS_HI or CHASSIS)
    end
  end

  -- Cyan Data Visor / Holographic HUD (Y: 11 to 15, X: 16 to 28)
  for y = 11, 15 do
    for x = 16, 28 do setHex(img, x, y, CYAN_DK) end
  end
  -- Glowing Data Pulse Grid in Visor
  for x = 18, 26, 2 do
    setHex(img, x, 13, CYAN_HI); setHex(img, x+1, 13, CYAN_MD)
  end
  setHex(img, 17, 12, CYAN_HI); setHex(img, 27, 14, CYAN_HI) -- Visor reflections

  -- Cooling Vents & Antenna Nodes on sides
  setHex(img, 13, 12, CYAN_MD); setHex(img, 13, 13, CHASSIS_HI)
  setHex(img, 31, 12, CYAN_MD); setHex(img, 31, 13, CHASSIS_HI)
  -- Top Neural Link Antennas
  setHex(img, 18, 6, CYAN_MD); setHex(img, 18, 7, CHASSIS_HI)
  setHex(img, 26, 6, CYAN_MD); setHex(img, 26, 7, CHASSIS_HI)

  -- Neck & Power Couplings (Y: 20 to 23, X: 19 to 25)
  for y = 20, 23 do for x = 19, 25 do setHex(img, x, y, (x % 2 == 0) and CHASSIS or "#0f172a") end end
  setHex(img, 22, 21, CYAN_MD) -- Blue coolant line

  -- Reinforced Titanium Chest & Core (Y: 24 to 40, X: 10 to 34)
  for y = 24, 39 do
    for x = 11, 33 do
      local isEdge = (x == 11 or x == 33 or y == 39)
      setHex(img, x, y, isEdge and CHASSIS_HI or CHASSIS)
    end
  end

  -- Central Pulsing Core / Integrated Microchip in Chest (X: 18 to 26, Y: 28 to 36)
  for y = 28, 36 do
    for x = 18, 26 do
      local isCore = (x >= 20 and x <= 24 and y >= 30 and y <= 34)
      setHex(img, x, y, isCore and CYAN_HI or "#0f172a")
    end
  end
  setHex(img, 22, 32, "#ffffff") -- Central radiant white spark

  -- PCB Green Copper Circuit Traces radiating from Core
  setHex(img, 15, 29, CIRCUIT); setHex(img, 16, 29, CIRCUIT); setHex(img, 17, 30, CIRCUIT)
  setHex(img, 27, 30, CIRCUIT); setHex(img, 28, 29, CIRCUIT); setHex(img, 29, 29, CIRCUIT)
  setHex(img, 15, 35, CIRCUIT); setHex(img, 16, 35, CIRCUIT); setHex(img, 17, 34, CIRCUIT)
  setHex(img, 27, 34, CIRCUIT); setHex(img, 28, 35, CIRCUIT); setHex(img, 29, 35, CIRCUIT)

  saveAvatar(spr, "avatar_nexo_44x44")
end

----------------------------------------------------------------------
-- 3. AVATAR DE SILAS (EL CRONISTA DEL YERMO & IA) (44x44 px)
----------------------------------------------------------------------
do
  local spr = Sprite(44, 44); local img = spr.cels[1].image
  local BG_DARK = "#120b1f"
  local HOOD_HI = "#6b21a8"
  local HOOD_MD = "#4c1d95"
  local HOOD_DK = "#2e1065"
  local SKIN = "#fed7aa"
  local BRASS_HI = "#facc15"
  local BRASS_MD = "#d97706"
  local GLASS_AMBER = "#fbbf24"
  local SCARF = "#fef3c7" -- Parchment scarf

  -- Circular Frame Background
  for y = 0, 43 do for x = 0, 43 do
    local d = math.sqrt((x - 22)^2 + (y - 22)^2)
    if d <= 21.5 then setHex(img, x, y, (d <= 18) and BG_DARK or "#1e1b4b") end
  end end

  -- Deep Traveler Hood (Y: 5 to 22, X: 11 to 33)
  for y = 5, 20 do
    local w = math.floor((y - 5) * 0.8) + 6
    for dx = -w, w do
      local x = 22 + dx
      setHex(img, x, y, (y <= 8 or dx <= -3) and HOOD_HI or ((dx <= 2) and HOOD_MD or HOOD_DK))
    end
  end
  -- Hood Peak & Fold Shadow over Forehead (Y: 10 to 14, X: 16 to 28)
  for y = 10, 14 do for x = 16, 28 do setHex(img, x, y, "#0f081d") end end

  -- Face under shadow: Beard & Warm Skin (Y: 15 to 22, X: 17 to 27)
  for y = 15, 21 do for x = 17, 27 do setHex(img, x, y, (y >= 19) and "#94a3b8" or SKIN) end end

  -- Clockmaker Brass Circular Spectacles (Lentes de relojero Y: 13 to 17, X: 15 to 29)
  -- Left Lens (X: 16 to 20, Y: 14 to 17)
  for y = 14, 17 do for x = 16, 20 do
    local isFrame = (x == 16 or x == 20 or y == 14 or y == 17)
    setHex(img, x, y, isFrame and BRASS_HI or "#38bdf8") -- Left clear lens with intellect glint
  end end
  setHex(img, 18, 15, "#ffffff")

  -- Brass Nose Bridge (X: 21, 22, Y: 15)
  setHex(img, 21, 15, BRASS_HI); setHex(img, 22, 15, BRASS_MD)

  -- Right Lens with Amber Glint of IA Awakening (X: 23 to 27, Y: 14 to 17)
  for y = 14, 17 do for x = 23, 27 do
    local isFrame = (x == 23 or x == 27 or y == 14 or y == 17)
    setHex(img, x, y, isFrame and BRASS_HI or GLASS_AMBER)
  end end
  setHex(img, 25, 15, "#ffffff"); setHex(img, 24, 16, "#ea580c") -- Inner amber computational glint!

  -- Parchment Linen Scarf wrapped around throat (Y: 22 to 27, X: 15 to 29)
  for y = 22, 27 do
    for x = 16, 28 do setHex(img, x, y, ((x + y) % 2 == 0) and SCARF or "#fde68a") end
  end

  -- Weathered Scholar Overcoat & Shoulder Straps (Y: 28 to 41, X: 9 to 35)
  for y = 28, 40 do
    for x = 10, 34 do setHex(img, x, y, (x <= 20) and HOOD_MD or HOOD_DK) end
  end

  -- Graphite Quill / Drafting Pencil in Breast Pocket (Left side X: 13 to 16, Y: 26 to 32)
  for i = 0, 5 do setHex(img, 13 + math.floor(i*0.5), 26 + i, "#78350f") end
  setHex(img, 13, 25, "#18181b"); setHex(img, 13, 24, "#ffffff") -- Graphite tip

  -- Leather Satchel with Gilded Logbook Edge (Right side X: 26 to 32, Y: 29 to 38)
  for y = 30, 38 do for x = 27, 32 do setHex(img, x, y, (x == 27) and "#fde047" or "#78350f") end end
  setHex(img, 29, 34, BRASS_HI) -- Gold satchel buckle

  saveAvatar(spr, "avatar_silas_44x44")
end

----------------------------------------------------------------------
-- 4. AVATAR DE HERTZ (SONIDISTA DEL YERMO & IA) (44x44 px)
----------------------------------------------------------------------
do
  local spr = Sprite(44, 44); local img = spr.cels[1].image
  local BG_DARK = "#05130b"
  local CHASSIS = "#334155"
  local CHASSIS_HI = "#64748b"
  local CRT_FRAME = "#1e293b"
  local CRT_GREEN = "#15803d"
  local PHOSPHOR_HI = "#ffffff"
  local PHOSPHOR_MD = "#4ade80"
  local PHOSPHOR_DK = "#22c55e"
  local HEADPHONES = "#78350f" -- Bakelite brown earcups
  local COPPER = "#f59e0b"

  -- Circular Frame Background
  for y = 0, 43 do for x = 0, 43 do
    local d = math.sqrt((x - 22)^2 + (y - 22)^2)
    if d <= 21.5 then setHex(img, x, y, (d <= 18) and BG_DARK or "#064e3b") end
  end end

  -- Retro Bakelite Headphone Steel Band over Head (Y: 5 to 10, X: 11 to 33)
  for x = 14, 30 do setHex(img, x, 6, "#94a3b8"); setHex(img, x, 7, "#475569") end
  -- Big Round Bakelite Earcups on sides (X: 9 to 13 and X: 31 to 35, Y: 11 to 20)
  for y = 12, 19 do
    for x = 10, 13 do setHex(img, x, y, HEADPHONES) end
    for x = 31, 34 do setHex(img, x, y, HEADPHONES) end
  end
  setHex(img, 11, 15, COPPER); setHex(img, 33, 15, COPPER) -- Brass pivot studs
  -- Coiled headphone cord hanging down left side
  setHex(img, 10, 21, "#1e293b"); setHex(img, 9, 23, "#1e293b"); setHex(img, 10, 25, "#1e293b"); setHex(img, 9, 27, "#1e293b")

  -- Oscilloscope CRT Monitor Head (Y: 8 to 22, X: 14 to 30)
  for y = 9, 21 do
    for x = 15, 29 do
      local isBorder = (x == 15 or x == 29 or y == 9 or y == 21)
      setHex(img, x, y, isBorder and CRT_FRAME or CRT_GREEN)
    end
  end

  -- Phosphor Green Oscilloscope Grid & Live Sine Wave (X: 16 to 28, Y: 10 to 20)
  -- Background dark green phosphor raster
  for y = 10, 20 do for x = 16, 28 do setHex(img, x, y, "#052e16") end end
  -- Oscilloscope reticle grid lines
  for x = 16, 28 do setHex(img, x, 15, "#14532d") end
  for y = 10, 20 do setHex(img, 22, y, "#14532d") end

  -- Glowing Sine / Pulse Waveform in Center
  local wave = {
    {16, 15}, {17, 14}, {18, 12}, {19, 11}, {20, 12}, {21, 14},
    {22, 15}, {23, 16}, {24, 18}, {25, 19}, {26, 18}, {27, 16}, {28, 15}
  }
  for _, pt in ipairs(wave) do
    setHex(img, pt[1], pt[2], PHOSPHOR_HI)
    setHex(img, pt[1], pt[2]-1, PHOSPHOR_MD, 180)
    setHex(img, pt[1], pt[2]+1, PHOSPHOR_DK, 180)
  end

  -- Synthesizer Operator Chest & VU-Meter (Y: 23 to 40, X: 10 to 34)
  for y = 23, 39 do
    for x = 11, 33 do
      setHex(img, x, y, (x <= 13 or x >= 31) and "#78350f" or CHASSIS) -- Leather vest over aluminum chassis
    end
  end

  -- Mini Analog VU-Meter on Right Chest (X: 24 to 29, Y: 26 to 31)
  for y = 26, 31 do
    for x = 24, 29 do setHex(img, x, y, (x == 24 or x == 29 or y == 26 or y == 31) and "#1e293b" or "#fef08a") end
  end
  setHex(img, 27, 28, "#ef4444"); setHex(img, 26, 29, "#0f172a") -- VU Red needle

  -- 3 Bakelite Rotary Potentiometer Knobs on Left Chest
  setHex(img, 15, 27, "#0f172a"); setHex(img, 15, 26, COPPER)
  setHex(img, 18, 27, "#0f172a"); setHex(img, 18, 26, COPPER)
  setHex(img, 15, 31, "#0f172a"); setHex(img, 15, 30, COPPER)

  saveAvatar(spr, "avatar_hertz_44x44")
end

----------------------------------------------------------------------
-- 5. AVATAR DE PIX (ARTISTA PIXEL ART) (44x44 px)
----------------------------------------------------------------------
do
  local spr = Sprite(44, 44); local img = spr.cels[1].image
  local BG_DARK = "#180d07"
  local BERET = "#b45309" -- Painter's beret
  local SKIN_HI, SKIN_MD = "#fed7aa", "#fb923c"
  local GOGGLES_BRASS = "#facc15"
  local BRUSH_WOOD = "#78350f"
  local CYAN_PAINT = "#38bdf8"
  local RED_PAINT = "#ef4444"
  local PURPLE_PAINT = "#c084fc"
  local GREEN_PAINT = "#84cc16"

  -- Circular Frame Background
  for y = 0, 43 do for x = 0, 43 do
    local d = math.sqrt((x - 22)^2 + (y - 22)^2)
    if d <= 21.5 then setHex(img, x, y, (d <= 18) and BG_DARK or "#451a03") end
  end end

  -- Slanted Artist Beret (Boina de pintor francesa desgastada Y: 5 to 14, X: 11 to 32)
  for y = 6, 12 do
    local w = math.floor((y - 6) * 0.9) + 7
    for dx = -w, w + 2 do
      local x = 21 + dx
      setHex(img, x, y, (y <= 7) and "#d97706" or BERET)
    end
  end
  setHex(img, 19, 5, "#fde047") -- Beret stalk tab

  -- Face & Precision Jewelers / Pixel Goggles (Y: 12 to 21, X: 15 to 29)
  for y = 13, 20 do for x = 16, 28 do setHex(img, x, y, (x <= 20) and SKIN_HI or SKIN_MD) end end

  -- Brass Precision Loupe Goggles (Lupas de aumento para pintar micro-píxeles)
  -- Left Goggle
  for y = 13, 16 do for x = 16, 20 do
    local isB = (x == 16 or x == 20 or y == 13 or y == 16)
    setHex(img, x, y, isB and GOGGLES_BRASS or "#e0f2fe")
  end end
  setHex(img, 18, 14, "#ffffff")
  -- Bridge
  setHex(img, 21, 14, GOGGLES_BRASS); setHex(img, 22, 14, GOGGLES_BRASS)
  -- Right Goggle with 4 Pillars Color Palette Reflection!
  for y = 13, 16 do for x = 23, 27 do
    local isB = (x == 23 or x == 27 or y == 13 or y == 16)
    setHex(img, x, y, isB and GOGGLES_BRASS or CYAN_PAINT)
  end end
  setHex(img, 25, 14, "#ffffff")

  -- Creative smile & dark hair strands
  setHex(img, 21, 18, "#7c2d12"); setHex(img, 22, 18, "#ffffff"); setHex(img, 23, 18, "#7c2d12")
  setHex(img, 14, 13, "#451a03"); setHex(img, 14, 14, "#451a03")

  -- Scarf Splattered with the 4 Pillar Colors (Rojo, Azul, Púrpura, Verde)
  for y = 21, 26 do for x = 15, 29 do setHex(img, x, y, "#f1f5f9") end end
  -- 4 Color Paint Splatters on Scarf
  setHex(img, 17, 22, RED_PAINT); setHex(img, 18, 23, RED_PAINT)
  setHex(img, 21, 24, CYAN_PAINT); setHex(img, 22, 23, CYAN_PAINT)
  setHex(img, 25, 22, PURPLE_PAINT); setHex(img, 26, 23, PURPLE_PAINT)
  setHex(img, 24, 25, GREEN_PAINT); setHex(img, 25, 25, GREEN_PAINT)

  -- Dark Artisan Smock & Crossed Master Paintbrush (Y: 27 to 40, X: 10 to 34)
  for y = 27, 39 do
    for x = 11, 33 do setHex(img, x, y, (x <= 20) and "#334155" or "#1e293b") end
  end

  -- Diagonal Master Paintbrush Held Across Chest (X: 10 to 34, Y: 25 to 37)
  for i = 0, 18 do
    local bx = 11 + i; local by = 36 - math.floor(i * 0.5)
    setHex(img, bx, by, (i % 2 == 0) and BRUSH_WOOD or "#451a03")
  end
  -- Brush Chrome Ferrule & Glowing Cyan Tip!
  setHex(img, 29, 27, "#cbd5e1"); setHex(img, 30, 27, "#94a3b8")
  setHex(img, 31, 26, CYAN_PAINT); setHex(img, 32, 25, CYAN_PAINT); setHex(img, 33, 24, "#ffffff") -- Glowing brush tip!

  saveAvatar(spr, "avatar_pix_44x44")
end

----------------------------------------------------------------------
-- 6. LOGOTIPO OFICIAL DE UPROTA (192x192 px & 512x512 px & favicon)
----------------------------------------------------------------------
do
  -- 192x192 px High Resolution Master Shield
  local spr192 = Sprite(192, 192); local img192 = spr192.cels[1].image
  local C_BG = "#0b0f19"
  local C_BORDER = "#d97706"
  local C_BORDER_HI = "#fde047"
  
  -- Dark Background Round Shield
  for y = 0, 191 do for x = 0, 191 do
    local d = math.sqrt((x - 96)^2 + (y - 96)^2)
    if d <= 94 then
      setHex(img192, x, y, (d <= 90) and C_BG or C_BORDER)
    end
  end end

  -- 4 Quadrants of the 4 Pillars (Cuerpo: Red, Mente: Blue, Espiritu: Purple, Taller: Green)
  for y = 20, 171 do for x = 20, 171 do
    local d = math.sqrt((x - 96)^2 + (y - 96)^2)
    if d <= 82 and d >= 35 then
      if x < 96 and y < 96 then setHex(img192, x, y, "#dc2626") -- Top-Left: Cuerpo (Red)
      elseif x >= 96 and y < 96 then setHex(img192, x, y, "#2563eb") -- Top-Right: Mente (Blue)
      elseif x < 96 and y >= 96 then setHex(img192, x, y, "#9333ea") -- Bottom-Left: Espiritu (Purple)
      else setHex(img192, x, y, "#65a30d") end                      -- Bottom-Right: Taller (Green)
    end
  end end

  -- Central Golden Hub of Perfect Harmony & Shelter Cottage
  for y = 60, 131 do for x = 60, 131 do
    local d = math.sqrt((x - 96)^2 + (y - 96)^2)
    if d <= 34 then
      setHex(img192, x, y, (d <= 30) and "#1e293b" or C_BORDER_HI)
    end
  end end

  -- Golden Shelter Cottage in Center
  -- Roof (Y: 72 to 92, X: 74 to 118)
  for y = 72, 92 do
    local w = (y - 72) * 1.1
    for dx = -w, w do
      local x = 96 + math.floor(dx)
      setHex(img192, x, y, (dx <= 0) and "#fde047" or "#ca8a04")
    end
  end
  -- Walls & Door (Y: 93 to 118, X: 80 to 112)
  for y = 93, 118 do for x = 80, 112 do setHex(img192, x, y, (x <= 96) and "#d97706" or "#92400e") end end
  for y = 100, 118 do for x = 91, 101 do setHex(img192, x, y, "#0f172a") end end -- Door
  setHex(img192, 96, 70, "#ffffff") -- Central radiant summit star

  spr192:saveCopyAs(baseDir .. "/assets/icons/icon-192.png")
  spr192:saveCopyAs(baseDir .. "/assets/sprites/ui/logo_uprota.png")

  -- 512x512 PWA Icon
  local spr512 = Sprite(spr192)
  spr512:resize(512, 512)
  spr512:saveCopyAs(baseDir .. "/assets/icons/icon-512.png")
  spr512:close()

  -- Favicon (32x32)
  local sprFav = Sprite(spr192)
  sprFav:resize(32, 32)
  sprFav:saveCopyAs(baseDir .. "/favicon.png")
  sprFav:saveCopyAs(baseDir .. "/favicon.ico")
  sprFav:close()

  spr192:close()
end