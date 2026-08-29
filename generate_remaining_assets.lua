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

local function saveAsset(spr, baseDir, name)
  local asePath = baseDir .. "/" .. name .. ".aseprite"
  local pngPath = baseDir .. "/" .. name .. ".png"
  spr:saveCopyAs(asePath)
  spr:saveCopyAs(pngPath)
  spr:close()
end

----------------------------------------------------------------------
-- BLOQUE C: UI Y NAVEGACIÓN (24x24 px)
----------------------------------------------------------------------
local dirUI = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/ui"

-- 1. tab_tablon (Tablón de madera con notas y planos clavados)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image
  local W_HI, W_MD, W_DK, OUT = "#b45309", "#78350f", "#451a03", "#1a0802"
  local P_WH, P_MD, P_DK = "#fef08a", "#e2e8f0", "#94a3b8"
  local PIN_R = "#ef4444"

  -- Wood clipboard backing
  for y = 4, 20 do
    for x = 5, 19 do
      if x == 5 or x == 19 or y == 4 or y == 20 then
        setHex(img, x, y, (x == 5 or y == 4) and W_HI or OUT)
      else
        setHex(img, x, y, (x <= 11) and W_HI or W_MD)
      end
    end
  end

  -- Paper Sheet pinned on board (Y: 7 to 17, X: 7 to 17)
  for y = 7, 17 do
    for x = 7, 17 do
      if x == 7 or x == 17 or y == 7 or y == 17 then
        setHex(img, x, y, (y == 7) and P_WH or P_DK)
      else
        setHex(img, x, y, (y % 3 == 0 and x >= 9 and x <= 15) and W_DK or P_MD)
      end
    end
  end
  -- Folded bottom-right corner
  setHex(img, 17, 17, W_MD); setHex(img, 16, 17, P_DK); setHex(img, 17, 16, P_DK)

  -- Top Metal Clip & Red Pushpin
  for x = 10, 14 do setHex(img, x, 5, "#94a3b8"); setHex(img, x, 6, "#475569") end
  setHex(img, 12, 5, PIN_R); setHex(img, 12, 6, "#991b1b")

  saveAsset(spr, dirUI, "tab_tablon")
end

-- 2. tab_refugio (Choza rústica de palets y lona impermeable)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image
  local T_HI, T_MD, T_DK, OUT = "#38bdf8", "#0284c7", "#075985", "#082f49"
  local W_HI, W_MD, W_DK = "#d97706", "#92400e", "#451a03"
  local L_HI = "#fef08a"

  -- Floor shadow
  for y = 20, 22 do for x = 4 + (y-20), 20 - (y-20) do setHex(img, x, y, "#050b14", 110 - (y-20)*35) end end

  -- Slanted Tarp Roof (A-Frame triangle Y: 5 to 14, X: 4 to 20)
  for y = 5, 14 do
    local w = (y - 5) + 2
    for dx = -w, w do
      local x = 12 + dx
      if math.abs(dx) == w or y == 5 then
        setHex(img, x, y, (dx <= 0) and T_HI or OUT)
      else
        setHex(img, x, y, (dx <= 0) and T_HI or T_MD)
      end
    end
  end

  -- Wooden walls underneath (Y: 15 to 19, X: 6 to 18)
  for y = 15, 19 do
    for x = 6, 18 do
      if x == 6 or x == 18 or y == 19 then
        setHex(img, x, y, OUT)
      else
        setHex(img, x, y, (y % 2 == 0) and W_HI or W_MD)
      end
    end
  end

  -- Cozy Illuminated Doorway (X: 10 to 14, Y: 15 to 19)
  for y = 15, 19 do
    for x = 10, 14 do
      if y == 15 or x == 10 or x == 14 then
        setHex(img, x, y, W_DK)
      else
        setHex(img, x, y, (y <= 17) and L_HI or "#f59e0b")
      end
    end
  end

  saveAsset(spr, dirUI, "tab_refugio")
end

-- 3. tab_misiones (Brújula metálica de expedición con aguja oxidada)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image
  local B_HI, B_MD, B_DK, OUT = "#fde047", "#ca8a04", "#713f12", "#2e1005"
  local N_RED, S_BLU, AG_HI, AG_DK = "#ef4444", "#3b82f6", "#ffffff", "#1e293b"

  -- Drop shadow
  for y = 19, 21 do for x = 6, 18 do setHex(img, x, y, OUT, 100) end end

  -- Brass Compass Ring (Radius 8, centered at 11.5, 11.5)
  for y = 4, 19 do
    for x = 4, 19 do
      local d = math.sqrt((x - 11.5)^2 + (y - 11.5)^2)
      if d <= 7.8 then
        if d >= 6.2 then
          setHex(img, x, y, (y <= 11 or x <= 11) and B_HI or B_DK)
        else
          setHex(img, x, y, (d <= 5.8) and "#0f172a" or B_MD)
        end
      end
    end
  end

  -- Top Hanging Ring (X: 10 to 13, Y: 2 to 4)
  setHex(img, 11, 2, B_HI); setHex(img, 12, 2, B_HI)
  setHex(img, 10, 3, B_HI); setHex(img, 13, 3, B_DK)
  setHex(img, 11, 4, B_MD); setHex(img, 12, 4, B_DK)

  -- Compass Needle pointing NW / SE
  -- North Red Needle
  for i = 1, 4 do
    setHex(img, 12 - i, 12 - i, N_RED)
    setHex(img, 11 - i, 12 - i, AG_HI)
  end
  -- South Blue Needle
  for i = 1, 4 do
    setHex(img, 11 + i, 11 + i, S_BLU)
    setHex(img, 12 + i, 11 + i, AG_DK)
  end
  -- Center Pivot Jewel
  setHex(img, 11, 11, B_HI); setHex(img, 12, 11, B_HI)
  setHex(img, 11, 12, B_MD); setHex(img, 12, 12, B_DK)

  saveAsset(spr, dirUI, "tab_misiones")
end

-- 4. tab_radio (Radio de onda corta con perillas analógicas y antena)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image
  local C_HI, C_MD, C_DK, OUT = "#a1a1aa", "#52525b", "#27272a", "#09090b"
  local SPK_LT, SPK_DK = "#71717a", "#18181b"
  local TUN_HI, TUN_AM = "#38bdf8", "#facc15"

  -- Extended Wire Antenna (Diagonal from 7,10 up to 17,2)
  for i = 0, 7 do
    setHex(img, 7 + i, 9 - i, "#e4e4e7")
    setHex(img, 8 + i, 9 - i, "#71717a")
  end
  setHex(img, 15, 2, "#ef4444") -- Red tip

  -- Radio Body Box (Y: 9 to 20, X: 4 to 20)
  for y = 9, 20 do
    for x = 4, 20 do
      if x == 4 or x == 20 or y == 9 or y == 20 then
        setHex(img, x, y, (x == 4 or y == 9) and C_HI or OUT)
      else
        setHex(img, x, y, (x <= 11) and C_MD or C_DK)
      end
    end
  end

  -- Left Speaker Grille (Y: 11 to 18, X: 6 to 11)
  for y = 11, 18 do
    for x = 6, 11 do
      setHex(img, x, y, ((x + y) % 2 == 0) and SPK_LT or SPK_DK)
    end
  end

  -- Right Tuning Dial Window (Y: 11 to 14, X: 13 to 18)
  for y = 11, 14 do
    for x = 13, 18 do
      setHex(img, x, y, (x == 15) and TUN_AM or "#0f172a")
    end
  end
  -- Tuning Needle at X: 15
  setHex(img, 15, 12, "#ef4444"); setHex(img, 15, 13, "#ef4444")

  -- Knobs at Bottom-Right (Y: 16 to 18)
  setHex(img, 14, 16, C_HI); setHex(img, 14, 17, C_DK)
  setHex(img, 17, 16, TUN_AM); setHex(img, 17, 17, C_DK)

  saveAsset(spr, dirUI, "tab_radio")
end

-- 5. tab_hogar (Vela de cera encendida en portavelas de hojalata)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image
  local C_HI, C_MD, C_DK = "#fef08a", "#fde047", "#eab308"
  local W_HI, W_MD = "#f8fafc", "#cbd5e1"
  local T_HI, T_MD, T_DK, OUT = "#94a3b8", "#475569", "#1e293b", "#0f172a"

  -- Floor shadow
  for y = 20, 22 do for x = 4 + (y-20), 20 - (y-20) do setHex(img, x, y, OUT, 110 - (y-20)*35) end end

  -- Warm candlelight ambient glow
  for y = 3, 15 do
    for x = 6, 18 do
      local d = math.sqrt((x - 12)^2 + (y - 7)^2)
      if d <= 6 then setHex(img, x, y, C_MD, math.floor(70 - d*10)) end
    end
  end

  -- Tin Saucer / Pan (Y: 18, 19, X: 5 to 19)
  for x = 5, 19 do setHex(img, x, 18, T_HI); setHex(img, x, 19, T_DK) end
  setHex(img, 4, 18, OUT); setHex(img, 20, 18, OUT)
  -- Loop Handle on right (X: 18 to 21, Y: 15 to 18)
  setHex(img, 19, 15, T_HI); setHex(img, 20, 16, T_HI); setHex(img, 20, 17, T_MD); setHex(img, 19, 18, T_DK)

  -- Wax Candle Pillar (Y: 10 to 18, X: 10 to 14)
  for y = 10, 18 do
    for x = 10, 14 do
      if x == 10 or x == 14 then setHex(img, x, y, (x == 10) and W_HI or T_DK)
      else setHex(img, x, y, (x <= 12) and W_HI or W_MD) end
    end
  end
  -- Melted wax drips on left side
  setHex(img, 9, 13, W_HI); setHex(img, 9, 14, W_MD)

  -- Black wick & Flame (Y: 4 to 9, X: 11 to 13)
  setHex(img, 12, 9, "#18181b") -- Wick
  setHex(img, 12, 8, "#ffffff") -- Core
  setHex(img, 11, 7, C_HI); setHex(img, 12, 7, "#ffffff"); setHex(img, 13, 7, C_MD)
  setHex(img, 11, 6, C_HI); setHex(img, 12, 6, C_HI); setHex(img, 13, 6, "#f97316")
  setHex(img, 12, 5, C_HI); setHex(img, 12, 4, "#ea580c")

  saveAsset(spr, dirUI, "tab_hogar")
end

-- 6. ico_info (Letra 'i' grabada en chapa metálica redonda)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image
  local M_HI, M_MD, M_DK, OUT = "#38bdf8", "#0284c7", "#0369a1", "#082f49"
  local I_WH, I_SH = "#ffffff", "#bae6fd"

  -- Round Medal Plate (Radius 8, centered at 11.5, 11.5)
  for y = 4, 19 do
    for x = 4, 19 do
      local d = math.sqrt((x - 11.5)^2 + (y - 11.5)^2)
      if d <= 7.8 then
        if d >= 6.5 then setHex(img, x, y, (y <= 11 or x <= 11) and M_HI or OUT)
        else setHex(img, x, y, (x <= 11) and M_MD or M_DK) end
      end
    end
  end

  -- Dot of 'i' (X: 11, 12, Y: 7, 8)
  setHex(img, 11, 7, I_WH); setHex(img, 12, 7, I_WH)
  setHex(img, 11, 8, I_WH); setHex(img, 12, 8, I_SH)

  -- Stem of 'i' (X: 11, 12, Y: 10 to 16)
  setHex(img, 10, 10, I_WH); setHex(img, 11, 10, I_WH); setHex(img, 12, 10, I_WH) -- Top serif
  for y = 11, 15 do
    setHex(img, 11, y, I_WH); setHex(img, 12, y, I_SH)
  end
  for x = 9, 14 do setHex(img, x, 16, (x <= 11) and I_WH or I_SH) end -- Bottom serif

  saveAsset(spr, dirUI, "ico_info")
end

-- 7. ico_check_ok (Marca de tilde grabada con carbón o tiza blanca)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image
  local C_HI, C_MD, C_DK, OUT = "#4ade80", "#16a34a", "#14532d", "#052e16"
  local WH = "#ffffff"

  -- Checkmark shape
  -- Short left stroke (X: 4 to 9, Y: 11 to 16)
  for i = 0, 4 do
    local cx = 5 + i
    local cy = 11 + i
    setHex(img, cx, cy, WH)
    setHex(img, cx, cy + 1, C_HI)
    setHex(img, cx, cy + 2, C_MD)
    setHex(img, cx - 1, cy, C_DK)
    setHex(img, cx, cy + 3, OUT)
  end
  -- Long right stroke (X: 9 to 19, Y: 15 to 5)
  for i = 0, 10 do
    local cx = 9 + i
    local cy = 15 - i
    setHex(img, cx, cy, WH)
    setHex(img, cx, cy + 1, C_HI)
    setHex(img, cx, cy + 2, C_MD)
    setHex(img, cx + 1, cy, C_DK)
    setHex(img, cx, cy + 3, OUT)
  end

  saveAsset(spr, dirUI, "ico_check_ok")
end

-- 8. ico_candado (Candado de hierro forjado pesado)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image
  local S_HI, S_MD, S_DK = "#e2e8f0", "#94a3b8", "#475569"
  local B_HI, B_MD, B_DK, OUT = "#fbbf24", "#d97706", "#78350f", "#1c0b02"

  -- Steel Shackle Arch (Y: 4 to 11, X: 7 to 16)
  for x = 9, 14 do setHex(img, x, 4, S_HI); setHex(img, x, 5, S_DK) end
  for y = 5, 11 do
    setHex(img, 7, y, S_HI); setHex(img, 8, y, S_MD); setHex(img, 9, y, S_DK)
    setHex(img, 14, y, S_MD); setHex(img, 15, y, S_DK); setHex(img, 16, y, OUT)
  end

  -- Brass Heavy Padlock Body (Y: 10 to 20, X: 5 to 18)
  for y = 10, 20 do
    for x = 5, 18 do
      if x == 5 or x == 18 or y == 10 or y == 20 then
        setHex(img, x, y, (x == 5 or y == 10) and B_HI or OUT)
      else
        setHex(img, x, y, (x <= 11) and B_HI or B_MD)
      end
    end
  end

  -- Keyhole (X: 11, 12, Y: 13 to 17)
  setHex(img, 11, 13, OUT); setHex(img, 12, 13, OUT)
  setHex(img, 10, 14, OUT); setHex(img, 11, 14, OUT); setHex(img, 12, 14, OUT); setHex(img, 13, 14, OUT)
  setHex(img, 11, 15, OUT); setHex(img, 12, 15, OUT)
  setHex(img, 11, 16, OUT); setHex(img, 12, 16, OUT)
  -- Rivets on brass body
  setHex(img, 7, 12, S_HI); setHex(img, 16, 12, B_DK)
  setHex(img, 7, 18, S_HI); setHex(img, 16, 18, B_DK)

  saveAsset(spr, dirUI, "ico_candado")
end

----------------------------------------------------------------------
-- BLOQUE D: MECÁNICAS CLAVE (24x24 px)
----------------------------------------------------------------------
local dirMec = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/mecanicas"

-- 1. mecanica_senda (Huella de bota pisando tierra firme)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image
  local T_HI, T_MD, T_DK, OUT = "#d97706", "#92400e", "#451a03", "#1a0802"
  local G_LT = "#84cc16"

  -- Ground soil texture
  for y = 3, 21 do
    for x = 3, 21 do
      if (x + y*3) % 7 == 0 then setHex(img, x, y, T_DK, 90) end
      if (x*2 + y) % 11 == 0 then setHex(img, x, y, G_LT, 80) end
    end
  end

  -- Boot Print (Tread pattern indented in soil)
  -- Heel (Y: 15 to 19, X: 9 to 14)
  for y = 15, 19 do
    for x = 9, 14 do
      if x == 9 or x == 14 or y == 19 then setHex(img, x, y, OUT)
      else setHex(img, x, y, (y == 15) and T_HI or T_DK) end
    end
  end

  -- Sole / Forefoot (Y: 5 to 13, X: 8 to 16)
  for y = 5, 13 do
    for x = 8, 16 do
      if x == 8 or x == 16 or y == 5 or y == 13 then
        setHex(img, x, y, (y == 5 or x == 8) and T_HI or OUT)
      else
        -- Horizontal tread grooves
        if y == 7 or y == 9 or y == 11 then
          setHex(img, x, y, OUT)
        else
          setHex(img, x, y, (x <= 11) and T_MD or T_DK)
        end
      end
    end
  end

  saveAsset(spr, dirMec, "mecanica_senda")
end

-- 2. mecanica_cimiento (Bloque de piedra macizo forjado a 66 días)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image
  local S_HI, S_LT, S_MD, S_DK, OUT = "#f8fafc", "#cbd5e1", "#64748b", "#334155", "#0f172a"
  local G_HI, G_MD = "#fef08a", "#eab308"

  -- Floor shadow
  for y = 19, 21 do for x = 4 + (y-19), 20 - (y-19) do setHex(img, x, y, OUT, 120 - (y-19)*35) end end

  -- Isometric Stone Monolith Block
  -- Top Face (Diamond Y: 5 to 10, X: 5 to 19)
  for y = 5, 10 do
    local w = (y <= 7) and (y - 5)*4 + 2 or (10 - y)*4 + 2
    for dx = -w/2, w/2 do
      local x = math.floor(12 + dx)
      setHex(img, x, y, S_HI)
    end
  end
  -- Inlaid Roman Numeral 'LXVI' (66) in Gold on top
  setHex(img, 10, 7, G_MD); setHex(img, 12, 7, G_HI); setHex(img, 14, 7, G_MD)

  -- Left Front Face (Y: 10 to 19, X: 5 to 12)
  for y = 10, 19 do
    for x = 5, 12 do
      if x == 5 or y == 19 then setHex(img, x, y, OUT)
      else setHex(img, x, y, (x <= 8) and S_LT or S_MD) end
    end
  end

  -- Right Front Face (Y: 10 to 19, X: 12 to 19)
  for y = 10, 19 do
    for x = 12, 19 do
      if x == 19 or y == 19 then setHex(img, x, y, OUT)
      else setHex(img, x, y, (x <= 15) and S_MD or S_DK) end
    end
  end

  -- Chiseled edge corner highlights
  for y = 10, 18 do setHex(img, 12, y, S_HI) end

  saveAsset(spr, dirMec, "mecanica_cimiento")
end

-- 3. cadena_firme (Eslabón de cadena de acero pesado, tenso y cerrado)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image
  local S_HI, S_MD, S_DK, OUT = "#f1f5f9", "#64748b", "#334155", "#0f172a"
  local RUST = "#b45309"

  -- Drop shadow
  for y = 19, 21 do for x = 6, 18 do setHex(img, x, y, OUT, 100) end end

  -- Vertical Oval Heavy Chain Link (Y: 4 to 19, X: 7 to 16)
  for y = 4, 19 do
    for x = 7, 16 do
      local isOuter = (x == 7 or x == 16 or y == 4 or y == 19)
      local isInner = (x >= 10 and x <= 13 and y >= 8 and y <= 15)
      if isInner then
        -- Open hole in center of chain link
      elseif isOuter then
        setHex(img, x, y, (x == 7 or y == 4) and S_HI or OUT)
      else
        if x <= 9 then setHex(img, x, y, (y <= 7) and S_HI or S_MD)
        elseif x >= 14 then setHex(img, x, y, (y >= 15) and OUT or S_DK)
        else setHex(img, x, y, (y % 4 == 0) and RUST or S_MD) end
      end
    end
  end

  -- Interlocking top & bottom stub links
  for x = 10, 13 do setHex(img, x, 3, S_MD); setHex(img, x, 20, S_DK) end

  saveAsset(spr, dirMec, "cadena_firme")
end

-- 4. cadena_tiembla (Eslabón agrietado temblando con chispas de tensión)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image
  local S_HI, S_MD, S_DK, OUT = "#f1f5f9", "#64748b", "#334155", "#0f172a"
  local WARN_HI, WARN_MD = "#fef08a", "#f97316"
  local CRK = "#ef4444"

  -- Tense vibration offset
  for y = 4, 19 do
    for x = 7, 16 do
      local isOuter = (x == 7 or x == 16 or y == 4 or y == 19)
      local isInner = (x >= 10 and x <= 13 and y >= 8 and y <= 15)
      if not isInner then
        if isOuter then setHex(img, x, y, (x == 7) and S_HI or OUT)
        else setHex(img, x, y, (x <= 9) and S_HI or S_MD) end
      end
    end
  end

  -- Fracturing Crack with Glowing Heat Stress on Left Shaft (Y: 10 to 14, X: 7 to 10)
  setHex(img, 7, 11, WARN_HI); setHex(img, 8, 11, CRK); setHex(img, 9, 12, CRK); setHex(img, 10, 12, WARN_HI)
  setHex(img, 8, 13, WARN_MD); setHex(img, 7, 14, CRK)

  -- Vibration spark particles
  setHex(img, 5, 10, WARN_HI); setHex(img, 4, 11, WARN_MD)
  setHex(img, 18, 12, WARN_HI); setHex(img, 19, 13, WARN_MD)
  setHex(img, 6, 17, WARN_HI)

  saveAsset(spr, dirMec, "cadena_tiembla")
end

-- 5. cadena_rota (Eslabón roto y partido en dos con destello de libertad)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image
  local S_HI, S_MD, S_DK, OUT = "#f1f5f9", "#64748b", "#334155", "#0f172a"
  local SPK_WH, SPK_GD = "#ffffff", "#facc15"

  -- Top Broken Half of Link (Shifted Up-Left)
  for y = 4, 10 do
    for x = 6, 14 do
      local isInner = (x >= 9 and x <= 11 and y >= 7 and y <= 10)
      if not isInner and (x == 6 or y == 4 or x == 14) then
        setHex(img, x, y, (x == 6 or y == 4) and S_HI or OUT)
      elseif not isInner then
        setHex(img, x, y, (x <= 8) and S_HI or S_MD)
      end
    end
  end
  -- Jagged shear break on top-left
  setHex(img, 6, 11, SPK_WH); setHex(img, 7, 11, S_MD); setHex(img, 14, 10, S_DK)

  -- Bottom Broken Half of Link (Shifted Down-Right)
  for y = 14, 20 do
    for x = 9, 17 do
      local isInner = (x >= 12 and x <= 14 and y >= 14 and y <= 17)
      if not isInner and (x == 9 or y == 20 or x == 17) then
        setHex(img, x, y, (x == 9) and S_MD or OUT)
      elseif not isInner then
        setHex(img, x, y, (x <= 12) and S_MD or S_DK)
      end
    end
  end
  -- Jagged shear break on bottom
  setHex(img, 9, 13, SPK_WH); setHex(img, 10, 13, S_MD); setHex(img, 17, 14, S_DK)

  -- Burst of Freedom / Star Glint in Center Break Gap
  setHex(img, 11, 11, SPK_WH); setHex(img, 12, 11, SPK_WH); setHex(img, 11, 12, SPK_WH); setHex(img, 12, 12, SPK_GD)
  setHex(img, 11, 9, SPK_GD); setHex(img, 11, 14, SPK_GD); setHex(img, 8, 12, SPK_GD); setHex(img, 15, 11, SPK_GD)

  saveAsset(spr, dirMec, "cadena_rota")
end

-- 6. faro_apagado (Lámpara de queroseno vacía / apagada)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image
  local M_HI, M_MD, M_DK, OUT = "#94a3b8", "#475569", "#1e293b", "#0f172a"
  local G_LT, G_DK = "#cbd5e1", "#64748b"

  -- Floor shadow
  for y = 20, 22 do for x = 6, 18 do setHex(img, x, y, OUT, 110) end end

  -- Top Hanging Wire Handle (Y: 3 to 7, X: 7 to 17)
  for x = 9, 15 do setHex(img, x, 3, M_HI) end
  setHex(img, 8, 4, M_HI); setHex(img, 16, 4, M_DK)
  setHex(img, 7, 5, M_MD); setHex(img, 17, 5, M_DK)

  -- Metal Lantern Chimney Cap (Y: 6 to 9, X: 8 to 16)
  for y = 6, 9 do
    for x = 8, 16 do
      setHex(img, x, y, (x == 8 or y == 6) and M_HI or M_DK)
    end
  end

  -- Glass Globe (Empty & Cold Y: 10 to 16, X: 7 to 17)
  for y = 10, 16 do
    for x = 7, 17 do
      if x == 7 or x == 17 or y == 10 or y == 16 then
        setHex(img, x, y, (x == 7) and G_LT or OUT)
      else
        -- Unlit cold wick in center
        if y >= 13 and (x == 11 or x == 12) then
          setHex(img, x, y, "#18181b")
        else
          setHex(img, x, y, (x == 8) and G_LT or G_DK, 70)
        end
      end
    end
  end
  -- Protective Metal Wire Guards over glass
  for y = 10, 16 do setHex(img, 10, y, M_MD); setHex(img, 14, y, M_MD) end

  -- Fuel Reservoir Base (Y: 17 to 20, X: 6 to 18)
  for y = 17, 20 do
    for x = 6, 18 do
      setHex(img, x, y, (y == 17 or x == 6) and M_HI or OUT)
    end
  end

  saveAsset(spr, dirMec, "faro_apagado")
end

-- 7. faro_encendido (Linterna de queroseno con llama viva y resplandor ámbar)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image
  local M_HI, M_MD, M_DK, OUT = "#facc15", "#ca8a04", "#713f12", "#1c0b02"
  local F_CORE, F_HI, F_MD = "#ffffff", "#fef08a", "#f97316"

  -- Radiant Amber Beacon Glow
  for y = 4, 21 do
    for x = 3, 21 do
      local d = math.sqrt((x - 12)^2 + (y - 13)^2)
      if d <= 9 then setHex(img, x, y, F_MD, math.floor(80 - d*8)) end
    end
  end

  -- Top Handle
  for x = 9, 15 do setHex(img, x, 3, M_HI) end
  setHex(img, 8, 4, M_HI); setHex(img, 16, 4, M_DK)

  -- Metal Cap
  for y = 6, 9 do for x = 8, 16 do setHex(img, x, y, (y == 6) and M_HI or M_DK) end end

  -- Glass Globe with Bright Burning Flame (Y: 10 to 16, X: 7 to 17)
  for y = 10, 16 do
    for x = 7, 17 do
      if x == 7 or x == 17 then setHex(img, x, y, (x == 7) and F_HI or OUT)
      else
        local df = math.sqrt((x - 12)^2 + (y - 13)^2)
        if df <= 1.5 then setHex(img, x, y, F_CORE)
        elseif df <= 3.2 then setHex(img, x, y, F_HI)
        else setHex(img, x, y, F_MD, 200) end
      end
    end
  end
  -- Metal wire guards
  for y = 10, 16 do setHex(img, 10, y, M_MD); setHex(img, 14, y, M_MD) end

  -- Fuel Base
  for y = 17, 20 do for x = 6, 18 do setHex(img, x, y, (y == 17) and M_HI or M_DK) end end

  saveAsset(spr, dirMec, "faro_encendido")
end

----------------------------------------------------------------------
-- BLOQUE E: BOTÍN INICIAL Y GUÍAS (24x24 px)
----------------------------------------------------------------------
local dirItm = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/items"

-- 1. caja_expedicion (Fardo o mochila de expedición militar amarrada)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image
  local C_HI, C_MD, C_DK, OUT = "#84cc16", "#4d7c0f", "#1a2e05", "#091402"
  local L_HI, L_MD = "#d97706", "#78350f"

  -- Floor shadow
  for y = 19, 21 do for x = 5, 19 do setHex(img, x, y, OUT, 110) end end

  -- Main Duffel/Pack (Y: 6 to 19, X: 5 to 19)
  for y = 6, 19 do
    for x = 5, 19 do
      if x == 5 or x == 19 or y == 6 or y == 19 then
        setHex(img, x, y, (x == 5 or y == 6) and C_HI or OUT)
      else
        setHex(img, x, y, (x <= 11) and C_HI or C_MD)
      end
    end
  end

  -- Leather Tie Straps & Buckles
  for y = 6, 19 do
    setHex(img, 9, y, L_HI); setHex(img, 10, y, L_MD)
    setHex(img, 15, y, L_HI); setHex(img, 16, y, L_MD)
  end
  -- Brass Buckles
  setHex(img, 9, 12, "#fde047"); setHex(img, 10, 12, "#ca8a04")
  setHex(img, 15, 12, "#fde047"); setHex(img, 16, 12, "#ca8a04")

  -- Top Bedroll / Blanket strapped to top
  for x = 6, 18 do setHex(img, x, 5, "#94a3b8"); setHex(img, x, 4, "#cbd5e1") end

  saveAsset(spr, dirItm, "caja_expedicion")
end

-- 2. item_cuchillo_mellado (Cuchillo de cocina mellado con filo desgastado)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image
  local B_HI, B_LT, B_MD, B_DK = "#ffffff", "#cbd5e1", "#64748b", "#1e293b"
  local W_HI, W_MD, OUT = "#b45309", "#451a03", "#0f172a"

  -- Diagonal Knife (Tip at 20, 5 to Handle at 5, 20)
  -- Blade
  for i = 1, 10 do
    local bx = 20 - i
    local by = 5 + i
    setHex(img, bx, by, (i == 4 or i == 7) and B_MD or B_HI) -- Notches / dents on blade!
    setHex(img, bx + 1, by, B_LT)
    setHex(img, bx, by + 1, B_MD)
    setHex(img, bx + 1, by + 1, B_DK)
  end
  -- Point
  setHex(img, 20, 5, B_HI)

  -- Wooden Handle
  for i = 1, 5 do
    local hx = 10 - i
    local hy = 15 + i
    setHex(img, hx, hy, W_HI); setHex(img, hx + 1, hy, W_MD); setHex(img, hx, hy + 1, W_MD)
  end
  -- Brass Rivets on handle
  setHex(img, 8, 17, "#facc15"); setHex(img, 6, 19, "#facc15")

  saveAsset(spr, dirItm, "item_cuchillo_mellado")
end

-- 3. item_cafe_solubil (Frasco de vidrio con café soluble del viejo mundo)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image
  local G_HI, G_LT, OUT = "#ffffff", "#e0f2fe", "#0f172a"
  local CF_HI, CF_MD, CF_DK = "#78350f", "#451a03", "#1a0802"
  local CAP_R = "#dc2626"

  -- Floor shadow
  for y = 20, 22 do for x = 7, 17 do setHex(img, x, y, OUT, 110) end end

  -- Red Plastic Screw Cap (Y: 4 to 6, X: 9 to 15)
  for y = 4, 6 do
    for x = 9, 15 do
      setHex(img, x, y, (y == 4 or x == 9) and "#ef4444" or "#991b1b")
    end
  end

  -- Glass Jar Body (Y: 7 to 19, X: 7 to 17)
  for y = 7, 19 do
    for x = 7, 17 do
      if x == 7 or x == 17 or y == 19 then
        setHex(img, x, y, (x == 7) and G_LT or OUT)
      else
        -- Coffee granules fill from Y: 10 to 18
        if y >= 10 then
          setHex(img, x, y, ((x + y*2) % 3 == 0) and CF_HI or CF_MD)
        else
          setHex(img, x, y, (x == 8) and G_HI or G_LT, 80)
        end
      end
    end
  end

  -- Coffee label in middle (Y: 12 to 15, X: 9 to 15)
  for y = 12, 15 do
    for x = 9, 15 do
      setHex(img, x, y, (x == 9 or y == 12) and "#fef08a" or "#eab308")
    end
  end
  setHex(img, 12, 13, CF_DK); setHex(img, 12, 14, CF_DK) -- Coffee bean logo

  saveAsset(spr, dirItm, "item_cafe_solubil")
end

-- 4. item_cables_cobre (Rollo de cable de cobre pelado para empalmes)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image
  local C_HI, C_MD, C_DK, OUT = "#fdba74", "#ea580c", "#7c2d12", "#2e0802"
  local INS_BLK = "#18181b"

  -- Floor shadow
  for y = 19, 21 do for x = 5, 19 do setHex(img, x, y, OUT, 100) end end

  -- Coiled wire loops (Ellipses)
  for y = 7, 18 do
    for x = 5, 19 do
      local d = math.sqrt((x - 12)^2 + (y - 13)^2 * 1.8)
      if d <= 7.5 and d >= 4.5 then
        if (x + y) % 3 == 0 then
          setHex(img, x, y, C_HI) -- Stripped copper shine
        elseif (x + y) % 3 == 1 then
          setHex(img, x, y, C_MD)
        else
          setHex(img, x, y, INS_BLK) -- Black rubber insulation
        end
      end
    end
  end
  -- Loose stripped wire ends sticking out on top
  setHex(img, 7, 5, C_HI); setHex(img, 6, 4, C_HI); setHex(img, 5, 4, C_HI)
  setHex(img, 17, 6, C_HI); setHex(img, 18, 5, C_HI)

  saveAsset(spr, dirItm, "item_cables_cobre")
end

-- 5. item_sal_grano (Bolsita de arpillera con sal marina de grano)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image
  local B_HI, B_MD, B_DK, OUT = "#d97706", "#92400e", "#451a03", "#1a0802"
  local S_WH, S_LT = "#ffffff", "#e2e8f0"

  -- Floor shadow
  for y = 19, 21 do for x = 6, 18 do setHex(img, x, y, OUT, 110) end end

  -- Burlap Sack Body (Y: 8 to 19, X: 6 to 18)
  for y = 8, 19 do
    for x = 6, 18 do
      if x == 6 or x == 18 or y == 19 then
        setHex(img, x, y, (x == 6) and B_HI or OUT)
      else
        setHex(img, x, y, ((x + y) % 2 == 0) and B_HI or B_MD)
      end
    end
  end

  -- Tied Sack Neck (Y: 7, 8, X: 9 to 15)
  for x = 9, 15 do setHex(img, x, 7, "#713f12") end -- Twine knot
  setHex(img, 12, 6, "#ca8a04")

  -- Spilled Salt Crystals on Right Side (X: 16 to 20, Y: 17 to 20)
  setHex(img, 17, 16, S_WH); setHex(img, 18, 17, S_WH); setHex(img, 19, 18, S_LT)
  setHex(img, 17, 18, S_LT); setHex(img, 18, 19, S_WH); setHex(img, 20, 19, S_WH)

  saveAsset(spr, dirItm, "item_sal_grano")
end

-- 6. item_yesca_natural (Nido/ovillo de paja seca y ramitas finas)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image
  local Y_HI, Y_LT, Y_MD, Y_DK, OUT = "#fef08a", "#facc15", "#ca8a04", "#713f12", "#1c0b02"

  -- Floor shadow
  for y = 19, 21 do for x = 5, 19 do setHex(img, x, y, OUT, 90) end end

  -- Bird-nest shaped tinder bundle (Oval cloud of straw fibres)
  for y = 7, 19 do
    for x = 5, 19 do
      local d = math.sqrt((x - 12)^2 + (y - 13)^2 * 1.4)
      if d <= 7 then
        local fibre = (x*3 + y*7) % 5
        if fibre == 0 then setHex(img, x, y, Y_HI)
        elseif fibre == 1 then setHex(img, x, y, Y_LT)
        elseif fibre == 2 then setHex(img, x, y, Y_MD)
        else setHex(img, x, y, Y_DK) end
      end
    end
  end
  -- Stray straw strands poking out
  setHex(img, 4, 9, Y_HI); setHex(img, 3, 10, Y_LT)
  setHex(img, 20, 11, Y_HI); setHex(img, 21, 12, Y_LT)
  setHex(img, 8, 5, Y_HI); setHex(img, 15, 6, Y_LT)

  saveAsset(spr, dirItm, "item_yesca_natural")
end

-- 7. item_biblia_don_chui (Libro encuadernado en cuero desgastado con cruz discreta)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image
  local L_HI, L_MD, L_DK, OUT = "#854d0e", "#542f06", "#2c1502", "#100600"
  local G_HI, G_MD = "#fde047", "#ca8a04"
  local PG_WH, PG_SH = "#fef9c3", "#d4c5a9"
  local RIBBON = "#dc2626"

  -- Floor shadow
  for y = 20, 22 do for x = 5, 19 do setHex(img, x, y, OUT, 120) end end

  -- Leather Book Cover (Y: 4 to 19, X: 6 to 18)
  for y = 4, 19 do
    for x = 6, 18 do
      if x == 6 or x == 18 or y == 4 or y == 19 then
        setHex(img, x, y, (x == 6 or y == 4) and L_HI or OUT)
      else
        setHex(img, x, y, (x <= 9) and L_HI or L_MD)
      end
    end
    -- Gilded / aged yellowed page block on right
    if y >= 6 and y <= 17 then
      setHex(img, 18, y, PG_WH)
      setHex(img, 17, y, PG_SH)
    end
  end

  -- Embossed Gold Cross on Front (X: 11 to 13, Y: 8 to 15)
  -- Vertical beam
  for y = 8, 15 do
    setHex(img, 12, y, G_HI)
    setHex(img, 13, y, G_MD)
  end
  -- Horizontal beam
  for x = 10, 15 do
    setHex(img, x, 10, G_HI)
    setHex(img, x, 11, G_MD)
  end

  -- Red Silk Bookmark Ribbon hanging from bottom (X: 11, 12, Y: 18 to 21)
  setHex(img, 11, 18, RIBBON); setHex(img, 12, 18, RIBBON)
  setHex(img, 11, 19, RIBBON); setHex(img, 12, 19, RIBBON)
  setHex(img, 12, 20, RIBBON); setHex(img, 13, 21, RIBBON)

  saveAsset(spr, dirItm, "item_biblia_don_chui")
end