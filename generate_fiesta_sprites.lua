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

local function saveDual(spr, name, f1, f2)
  spr:saveCopyAs(baseDir .. "/" .. f1 .. "/" .. name .. ".aseprite")
  spr:saveCopyAs(baseDir .. "/" .. f1 .. "/" .. name .. ".png")
  if f2 then
    spr:saveCopyAs(baseDir .. "/" .. f2 .. "/" .. name .. ".aseprite")
    spr:saveCopyAs(baseDir .. "/" .. f2 .. "/" .. name .. ".png")
  end
  spr:close()
end

----------------------------------------------------------------------
-- 1. TROFEO / FAROL DORADO DEL FESTIVAL (24x24 px)
----------------------------------------------------------------------
do
  local spr = Sprite(24, 24); local img = spr.cels[1].image
  local GOLD_HI = "#ffffff"
  local GOLD_MD = "#fde047"
  local GOLD_DK = "#ca8a04"
  local FLAME_R = "#ef4444"
  local FLAME_O = "#f97316"
  local BRASS   = "#78350f"

  -- Hanging Ring & Top Cap (X: 10 to 14, Y: 2 to 5)
  setHex(img, 12, 2, GOLD_MD); setHex(img, 11, 3, GOLD_DK); setHex(img, 13, 3, GOLD_DK)
  for x = 9, 15 do setHex(img, x, 5, GOLD_MD) end

  -- Glass Lantern Body with Radiant Fire (X: 8 to 16, Y: 6 to 16)
  for y = 6, 16 do
    setHex(img, 8, y, BRASS); setHex(img, 16, y, BRASS)
    for x = 9, 15 do
      setHex(img, x, y, "#0f172a") -- Dark glass background
    end
  end

  -- Golden Flame Inside (Center at 12, 11)
  setHex(img, 12, 11, GOLD_HI)
  setHex(img, 11, 12, GOLD_MD); setHex(img, 12, 12, GOLD_MD); setHex(img, 13, 12, GOLD_MD)
  setHex(img, 12, 9, FLAME_O); setHex(img, 12, 10, FLAME_R)
  setHex(img, 11, 13, FLAME_O); setHex(img, 13, 13, FLAME_O)
  setHex(img, 12, 14, FLAME_R)

  -- Radiant Sparks Orbiting Lantern
  setHex(img, 5, 8, GOLD_MD); setHex(img, 19, 8, GOLD_MD)
  setHex(img, 4, 13, GOLD_HI); setHex(img, 20, 13, GOLD_HI)
  setHex(img, 6, 17, GOLD_MD); setHex(img, 18, 17, GOLD_MD)

  -- Lantern Base & Pedestal (Y: 17 to 22, X: 7 to 17)
  for y = 17, 19 do for x = 8, 16 do setHex(img, x, y, (x % 2 == 0) and GOLD_MD or GOLD_DK) end end
  for x = 6, 18 do setHex(img, x, 20, GOLD_DK) end
  for x = 8, 16 do setHex(img, x, 21, BRASS) end

  saveDual(spr, "ui_trofeo_festival_farol", "ui", "mecanicas")
end

----------------------------------------------------------------------
-- 2. CONFETI PIXEL ART DE LOS 4 PILARES (16x16 px - Frame 1 y 2)
----------------------------------------------------------------------
-- Frame 1: Confeti flotando y girando alto
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  local C_RED = "#ef4444"
  local C_BLU = "#38bdf8"
  local C_PUR = "#c084fc"
  local C_GRN = "#84cc16"
  local C_GLD = "#fde047"

  -- Golden glints
  setHex(img, 2, 2, C_GLD); setHex(img, 13, 3, C_GLD); setHex(img, 8, 8, C_GLD)
  -- Pillar Red ribbons
  setHex(img, 4, 4, C_RED); setHex(img, 5, 5, C_RED); setHex(img, 5, 6, "#b91c1c")
  -- Pillar Blue sparkles
  setHex(img, 11, 6, C_BLU); setHex(img, 12, 7, C_BLU); setHex(img, 11, 7, "#0284c7")
  -- Pillar Purple diamond
  setHex(img, 3, 10, C_PUR); setHex(img, 4, 11, C_PUR); setHex(img, 3, 12, "#7e22ce")
  -- Pillar Green leaf star
  setHex(img, 13, 12, C_GRN); setHex(img, 14, 13, C_GRN); setHex(img, 14, 11, "#4d7c0f")
  -- Gold starburst
  setHex(img, 8, 14, C_GLD); setHex(img, 9, 14, "#ffffff")

  saveDual(spr, "sprite_confeti_frame1", "ui", "mecanicas")
end

-- Frame 2: Confeti dispersándose y cayendo con brillos alternos
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  local C_RED = "#ef4444"
  local C_BLU = "#38bdf8"
  local C_PUR = "#c084fc"
  local C_GRN = "#84cc16"
  local C_GLD = "#fde047"

  -- Golden glints alternated
  setHex(img, 7, 2, C_GLD); setHex(img, 3, 7, C_GLD); setHex(img, 14, 9, C_GLD)
  -- Pillar Red ribbon falling
  setHex(img, 5, 8, C_RED); setHex(img, 6, 9, C_RED); setHex(img, 6, 10, "#b91c1c")
  -- Pillar Blue sparkle
  setHex(img, 10, 3, C_BLU); setHex(img, 9, 4, C_BLU); setHex(img, 9, 5, "#0284c7")
  -- Pillar Purple ribbon
  setHex(img, 12, 14, C_PUR); setHex(img, 13, 15, C_PUR); setHex(img, 11, 14, "#7e22ce")
  -- Pillar Green particle
  setHex(img, 2, 13, C_GRN); setHex(img, 3, 14, C_GRN); setHex(img, 1, 14, "#4d7c0f")
  -- Central burst
  setHex(img, 7, 7, "#ffffff"); setHex(img, 8, 7, C_GLD); setHex(img, 8, 8, C_GLD)

  saveDual(spr, "sprite_confeti_frame2", "ui", "mecanicas")
end

----------------------------------------------------------------------
-- 3. EMBLEMA DE CADENA ROTA DORADA (24x24 px - 21 Días de Hábito)
----------------------------------------------------------------------
do
  local spr = Sprite(24, 24); local img = spr.cels[1].image
  local GOLD_HI = "#ffffff"
  local GOLD_MD = "#fde047"
  local GOLD_DK = "#ca8a04"
  local IRON_DK = "#451a03"

  -- Radiant Starburst Behind Broken Link
  local stars = {
    {12, 2}, {12, 21}, {2, 12}, {21, 12},
    {5, 5}, {19, 5}, {5, 19}, {19, 19}
  }
  for _, st in ipairs(stars) do
    setHex(img, st[1], st[2], GOLD_MD)
  end
  setHex(img, 12, 3, GOLD_HI); setHex(img, 3, 12, GOLD_HI); setHex(img, 20, 12, GOLD_HI); setHex(img, 12, 20, GOLD_HI)

  -- Left Broken Chain Half (X: 4 to 11, Y: 8 to 16)
  for y = 9, 15 do
    setHex(img, 5, y, GOLD_MD); setHex(img, 6, y, GOLD_HI)
    setHex(img, 10, y, GOLD_DK)
  end
  setHex(img, 6, 8, GOLD_MD); setHex(img, 7, 8, GOLD_HI); setHex(img, 8, 8, GOLD_MD); setHex(img, 9, 8, GOLD_DK)
  setHex(img, 6, 16, GOLD_MD); setHex(img, 7, 16, GOLD_HI); setHex(img, 8, 16, GOLD_MD); setHex(img, 9, 16, GOLD_DK)
  -- Fractured jagged edge at 11, 12
  setHex(img, 11, 10, "#ffffff"); setHex(img, 10, 11, "#ffffff"); setHex(img, 11, 14, "#ffffff")

  -- Right Broken Chain Half (X: 13 to 20, Y: 8 to 16)
  for y = 9, 15 do
    setHex(img, 14, y, GOLD_DK)
    setHex(img, 18, y, GOLD_MD); setHex(img, 19, y, GOLD_HI)
  end
  setHex(img, 15, 8, GOLD_DK); setHex(img, 16, 8, GOLD_MD); setHex(img, 17, 8, GOLD_HI); setHex(img, 18, 8, GOLD_MD)
  setHex(img, 15, 16, GOLD_DK); setHex(img, 16, 16, GOLD_MD); setHex(img, 17, 16, GOLD_HI); setHex(img, 18, 16, GOLD_MD)
  -- Fractured jagged edge at 13, 12
  setHex(img, 13, 10, "#ffffff"); setHex(img, 14, 11, "#ffffff"); setHex(img, 13, 14, "#ffffff")

  -- Center Flash of Freedom (Center at 12, 12)
  setHex(img, 12, 12, GOLD_HI)
  setHex(img, 11, 12, GOLD_HI); setHex(img, 13, 12, GOLD_HI)
  setHex(img, 12, 11, GOLD_HI); setHex(img, 12, 13, GOLD_HI)

  saveDual(spr, "ui_emblema_cadena_rota_fiesta", "ui", "mecanicas")
end