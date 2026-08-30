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
-- 1. NUEVOS SPRITES DE NPCS (32x48 px)
----------------------------------------------------------------------

-- A. npc_dona_concha_idle (32x48 px - Doña Concha, La Guardiana de las Raíces)
do
  local spr = Sprite(32, 48); local img = spr.cels[1].image
  local SKIN_HI, SKIN_MD, SKIN_DK = "#fed7aa", "#d97706", "#9a3412"
  local HAIR_G, HAIR_W = "#94a3b8", "#e2e8f0"
  local DRESS_HI, DRESS_MD, DRESS_DK = "#a855f7", "#7e22ce", "#581c87"
  local REBOZO = "#b91c1c"
  local BASKET_HI, BASKET_MD = "#fde047", "#b45309"
  local HERBS = "#84cc16"

  for y = 6, 11 do for x = 11, 21 do setHex(img, x, y, (x % 2 == 0) and HAIR_W or HAIR_G) end end
  setHex(img, 10, 10, "#ffffff"); setHex(img, 9, 11, "#ffffff"); setHex(img, 9, 12, "#cbd5e1")

  for y = 10, 15 do for x = 12, 20 do setHex(img, x, y, (x <= 15) and SKIN_HI or SKIN_MD) end end
  setHex(img, 14, 11, "#0f172a"); setHex(img, 18, 11, "#0f172a")
  setHex(img, 13, 13, SKIN_DK); setHex(img, 19, 13, SKIN_DK)
  setHex(img, 16, 12, SKIN_DK)
  setHex(img, 16, 14, "#7c2d12")

  for y = 16, 24 do for x = 10, 22 do
    if (x + y) % 3 == 0 then setHex(img, x, y, "#ef4444")
    else setHex(img, x, y, REBOZO) end
  end end

  for y = 24, 42 do
    local w = math.floor((y - 24) * 0.4) + 6
    for dx = -w, w do
      local x = 16 + dx
      setHex(img, x, y, (dx <= 0) and DRESS_HI or DRESS_MD)
    end
  end

  setHex(img, 9, 24, "#78350f"); setHex(img, 10, 24, "#ca8a04")
  setHex(img, 10, 25, "#f1f5f9"); setHex(img, 11, 26, "#94a3b8"); setHex(img, 12, 26, "#cbd5e1")

  for y = 22, 26 do setHex(img, 22, y, BASKET_MD) end
  for y = 26, 33 do
    for x = 20, 27 do
      setHex(img, x, y, ((x + y) % 2 == 0) and BASKET_HI or BASKET_MD)
    end
  end
  setHex(img, 21, 24, HERBS); setHex(img, 22, 23, HERBS); setHex(img, 23, 24, "#fef08a")
  setHex(img, 24, 23, HERBS); setHex(img, 25, 24, "#ffffff"); setHex(img, 26, 25, HERBS)

  for y = 43, 46 do
    setHex(img, 12, y, "#78350f"); setHex(img, 13, y, SKIN_MD); setHex(img, 14, y, "#78350f")
    setHex(img, 18, y, "#78350f"); setHex(img, 19, y, SKIN_MD); setHex(img, 20, y, "#78350f")
  end

  saveAsset(spr, "npcs", "npc_dona_concha_idle")
end

-- B. npc_valeria_costurera_idle (32x48 px - Valeria, La Maestra Costurera)
do
  local spr = Sprite(32, 48); local img = spr.cels[1].image
  local SKIN_HI, SKIN_MD = "#fed7aa", "#fb923c"
  local HAIR_BR = "#78350f"
  local SHIRT_HI, SHIRT_MD = "#f1f5f9", "#cbd5e1"
  local APRON = "#1e293b"
  local TAPE_Y = "#fde047"
  local SHEARS = "#94a3b8"

  for y = 5, 10 do for x = 11, 21 do setHex(img, x, y, HAIR_BR) end end
  setHex(img, 16, 5, "#3b82f6"); setHex(img, 17, 5, "#1d4ed8")

  for y = 10, 15 do for x = 12, 20 do setHex(img, x, y, (x <= 15) and SKIN_HI or SKIN_MD) end end
  setHex(img, 14, 11, "#0f172a"); setHex(img, 18, 11, "#0f172a")
  setHex(img, 16, 13, "#b91c1c")

  for y = 16, 28 do
    setHex(img, 13, y, (y % 2 == 0) and TAPE_Y or "#ca8a04")
    setHex(img, 19, y, (y % 2 == 0) and TAPE_Y or "#ca8a04")
  end
  setHex(img, 13, 29, "#facc15"); setHex(img, 19, 29, "#facc15")

  for y = 16, 34 do
    for x = 10, 22 do
      if x <= 11 or x >= 21 then setHex(img, x, y, SHIRT_MD)
      else setHex(img, x, y, APRON) end
    end
  end
  setHex(img, 14, 20, "#ef4444"); setHex(img, 15, 20, "#ef4444")
  setHex(img, 14, 19, "#ffffff"); setHex(img, 15, 19, "#38bdf8")

  setHex(img, 22, 25, SHEARS); setHex(img, 23, 25, SHEARS)
  setHex(img, 22, 27, "#f1f5f9"); setHex(img, 23, 28, "#f1f5f9")
  setHex(img, 22, 29, "#64748b"); setHex(img, 22, 31, "#64748b")

  setHex(img, 8, 26, SKIN_HI); setHex(img, 8, 27, "#78350f")
  setHex(img, 24, 24, SKIN_HI); setHex(img, 24, 25, "#78350f")

  for y = 35, 43 do
    for x = 12, 15 do setHex(img, x, y, "#475569") end
    for x = 17, 20 do setHex(img, x, y, "#334155") end
  end
  for y = 44, 46 do
    for x = 11, 15 do setHex(img, x, y, "#1e293b") end
    for x = 17, 21 do setHex(img, x, y, "#0f172a") end
  end

  saveAsset(spr, "npcs", "npc_valeria_costurera_idle")
end

-- C. npc_elena_radio_idle (32x48 px - Elena, La Voz del Risco)
do
  local spr = Sprite(32, 48); local img = spr.cels[1].image
  local SKIN_HI, SKIN_MD = "#fed7aa", "#fb923c"
  local HAIR_BK = "#18181b"
  local BANDANA = "#ef4444"
  local JACKET_HI, JACKET_MD = "#65a30d", "#3f6212"
  local HEADPHONES = "#38bdf8"

  for y = 5, 10 do for x = 11, 21 do setHex(img, x, y, HAIR_BK) end end
  for x = 11, 21 do setHex(img, x, 7, BANDANA) end

  for y = 10, 15 do for x = 12, 20 do setHex(img, x, y, (x <= 15) and SKIN_HI or SKIN_MD) end end
  setHex(img, 14, 11, "#38bdf8"); setHex(img, 18, 11, "#38bdf8")
  setHex(img, 16, 13, "#a855f7")

  for x = 12, 20 do setHex(img, x, 16, "#1e293b") end
  setHex(img, 10, 17, HEADPHONES); setHex(img, 10, 18, "#0284c7"); setHex(img, 11, 17, "#0f172a")
  setHex(img, 21, 17, HEADPHONES); setHex(img, 21, 18, "#0284c7"); setHex(img, 20, 17, "#0f172a")

  for y = 19, 34 do
    for x = 9, 23 do setHex(img, x, y, (x <= 15) and JACKET_HI or JACKET_MD) end
  end
  setHex(img, 10, 20, "#facc15"); setHex(img, 11, 20, "#facc15")
  setHex(img, 21, 20, "#facc15"); setHex(img, 22, 20, "#facc15")

  for y = 23, 27 do for x = 13, 16 do setHex(img, x, y, "#0f172a") end end
  setHex(img, 14, 24, "#ffffff"); setHex(img, 15, 24, "#ef4444")
  setHex(img, 14, 28, "#ef4444"); setHex(img, 15, 28, "#000000")

  for y = 35, 43 do
    for x = 11, 15 do setHex(img, x, y, "#475569") end
    for x = 17, 21 do setHex(img, x, y, "#334155") end
  end
  for y = 44, 46 do
    for x = 10, 15 do setHex(img, x, y, "#78350f") end
    for x = 17, 22 do setHex(img, x, y, "#451a03") end
  end

  saveAsset(spr, "npcs", "npc_elena_radio_idle")
end

-- D. npc_katia_mensajera_idle (32x48 px - Katia, La Mensajera de las Veredas)
do
  local spr = Sprite(32, 48); local img = spr.cels[1].image
  local SKIN_HI, SKIN_MD = "#fed7aa", "#ea580c"
  local HAIR_DK = "#451a03"
  local SHIRT = "#f97316"
  local SHORTS = "#475569"
  local PACK = "#0284c7"
  local STAFF = "#d97706"

  for y = 4, 9 do for x = 12, 20 do setHex(img, x, y, HAIR_DK) end end
  setHex(img, 10, 5, HAIR_DK); setHex(img, 9, 6, HAIR_DK); setHex(img, 8, 7, HAIR_DK)

  for y = 9, 14 do for x = 13, 20 do setHex(img, x, y, (x <= 16) and SKIN_HI or SKIN_MD) end end
  setHex(img, 15, 10, "#0f172a"); setHex(img, 19, 10, "#0f172a")
  setHex(img, 17, 12, "#ffffff"); setHex(img, 18, 12, "#ea580c")

  for y = 15, 27 do for x = 12, 20 do setHex(img, x, y, (x <= 15) and SHIRT or "#c2410c") end end
  for y = 17, 24 do for x = 14, 18 do setHex(img, x, y, PACK) end end
  setHex(img, 12, 17, "#0f172a"); setHex(img, 20, 17, "#0f172a")
  setHex(img, 13, 23, "#0f172a"); setHex(img, 19, 23, "#0f172a")

  setHex(img, 24, 22, SKIN_HI); setHex(img, 25, 22, SKIN_MD)
  for y = 12, 45 do setHex(img, 25, y, (y % 3 == 0) and "#facc15" or STAFF) end
  setHex(img, 25, 46, "#451a03")

  for y = 28, 33 do for x = 12, 20 do setHex(img, x, y, SHORTS) end end

  for y = 34, 40 do
    for x = 13, 15 do setHex(img, x, y, SKIN_HI) end
    for x = 17, 19 do setHex(img, x, y, SKIN_MD) end
  end
  for y = 41, 46 do
    for x = 12, 15 do setHex(img, x, y, (y == 42) and "#cbd5e1" or "#0284c7") end
    for x = 17, 20 do setHex(img, x, y, (y == 42) and "#cbd5e1" or "#0369a1") end
  end

  saveAsset(spr, "npcs", "npc_katia_mensajera_idle")
end

-- E. npc_bebe_fitolantro (32x32 px - Bebé Fitolantro de 40 cm en cueva de raíces)
do
  local spr = Sprite(32, 32); local img = spr.cels[1].image
  local P_HI, P_MD, P_DK = "#a3e635", "#65a30d", "#365314"
  local ROOT = "#ca8a04"
  local EYE_AMBER = "#f59e0b"

  for y = 8, 17 do
    for x = 11, 21 do
      local d = math.sqrt((x - 16)^2 + (y - 12.5)^2 * 1.1)
      if d <= 5.2 then setHex(img, x, y, (x <= 15) and P_HI or P_MD) end
    end
  end
  setHex(img, 15, 7, ROOT); setHex(img, 15, 6, ROOT); setHex(img, 14, 5, ROOT)
  setHex(img, 16, 7, ROOT); setHex(img, 17, 6, ROOT); setHex(img, 18, 5, ROOT)
  setHex(img, 17, 8, ROOT); setHex(img, 19, 7, ROOT)

  setHex(img, 13, 12, EYE_AMBER); setHex(img, 14, 12, EYE_AMBER)
  setHex(img, 13, 13, "#d97706"); setHex(img, 14, 13, "#ffffff")
  setHex(img, 18, 12, EYE_AMBER); setHex(img, 19, 12, EYE_AMBER)
  setHex(img, 18, 13, "#d97706"); setHex(img, 19, 13, "#ffffff")

  setHex(img, 16, 15, "#4d7c0f")

  for y = 18, 25 do
    for x = 12, 20 do
      local d = math.sqrt((x - 16)^2 + (y - 21.5)^2)
      if d <= 4.5 then setHex(img, x, y, (y <= 21) and P_MD or P_DK) end
    end
  end

  setHex(img, 11, 19, P_HI); setHex(img, 10, 20, P_HI)
  setHex(img, 21, 19, P_MD); setHex(img, 22, 20, P_MD)

  setHex(img, 14, 26, ROOT); setHex(img, 13, 27, ROOT); setHex(img, 13, 28, "#78350f")
  setHex(img, 16, 26, ROOT); setHex(img, 16, 27, ROOT); setHex(img, 16, 28, "#78350f")
  setHex(img, 18, 26, ROOT); setHex(img, 19, 27, ROOT); setHex(img, 19, 28, "#78350f")

  saveAsset(spr, "npcs", "npc_bebe_fitolantro")
end

-- F. npc_nino_raiz_idle (32x48 px - Niño Raíz ayudando en el huerto)
do
  local spr = Sprite(32, 48); local img = spr.cels[1].image
  local P_HI, P_MD, P_DK = "#84cc16", "#4d7c0f", "#1a2e05"
  local LEAF = "#a3e635"
  local ROOT = "#ca8a04"
  local EYE_AMBER = "#f59e0b"

  for y = 10, 19 do
    for x = 12, 20 do
      local d = math.sqrt((x - 16)^2 + (y - 14.5)^2 * 1.1)
      if d <= 4.8 then setHex(img, x, y, (x <= 15) and P_HI or P_MD) end
    end
  end
  setHex(img, 14, 8, LEAF); setHex(img, 15, 7, LEAF); setHex(img, 15, 6, "#4ade80")
  setHex(img, 17, 8, LEAF); setHex(img, 18, 7, LEAF); setHex(img, 18, 6, "#4ade80")
  setHex(img, 16, 9, P_DK)

  setHex(img, 14, 13, EYE_AMBER); setHex(img, 14, 14, "#ffffff")
  setHex(img, 18, 13, EYE_AMBER); setHex(img, 18, 14, "#ffffff")
  setHex(img, 15, 17, "#1a2e05"); setHex(img, 16, 17, "#1a2e05"); setHex(img, 17, 17, "#1a2e05")

  for y = 20, 33 do
    for x = 12, 20 do
      local isVessel = (x == 16 or y % 4 == 0)
      setHex(img, x, y, isVessel and P_DK or ((x <= 15) and P_HI or P_MD))
    end
  end

  for x = 8, 12 do setHex(img, x, 24, P_HI) end
  for x = 20, 24 do setHex(img, x, 24, P_MD) end
  setHex(img, 15, 23, "#ea580c"); setHex(img, 16, 23, "#c2410c")
  setHex(img, 15, 21, LEAF); setHex(img, 16, 20, LEAF); setHex(img, 17, 21, LEAF)

  for y = 34, 43 do
    for x = 13, 15 do setHex(img, x, y, P_HI) end
    for x = 17, 19 do setHex(img, x, y, P_MD) end
  end
  for y = 43, 46 do
    setHex(img, 12, y, ROOT); setHex(img, 14, y, P_DK)
    setHex(img, 18, y, P_DK); setHex(img, 20, y, ROOT)
  end
  setHex(img, 11, 46, "#78350f"); setHex(img, 21, 46, "#78350f")

  saveAsset(spr, "npcs", "npc_nino_raiz_idle")
end

----------------------------------------------------------------------
-- 2. NUEVOS ÍTEMS DE INVENTARIO (24x24 px)
----------------------------------------------------------------------

-- A. item_maquina_singer (24x24 px)
do
  local spr = Sprite(24, 24); local img = spr.cels[1].image
  local IRON_BK, IRON_DK = "#18181b", "#09090b"
  local GOLD_HI, GOLD_MD = "#fde047", "#ca8a04"
  local STEEL = "#f1f5f9"

  for y = 17, 20 do for x = 3, 21 do setHex(img, x, y, (y == 17) and "#3f3f46" or IRON_BK) end end

  for y = 6, 16 do for x = 4, 8 do setHex(img, x, y, (x == 4) and "#3f3f46" or IRON_BK) end end
  for y = 6, 10 do for x = 8, 17 do setHex(img, x, y, (y == 6) and "#3f3f46" or IRON_BK) end end
  for y = 10, 17 do for x = 14, 18 do setHex(img, x, y, (x == 18) and "#3f3f46" or IRON_BK) end end

  setHex(img, 15, 4, STEEL); setHex(img, 15, 5, STEEL)
  setHex(img, 14, 3, "#d97706"); setHex(img, 15, 3, "#fef08a"); setHex(img, 16, 3, "#d97706")

  for y = 7, 14 do setHex(img, 19, y, STEEL); setHex(img, 20, y, "#94a3b8") end

  for y = 13, 16 do setHex(img, 5, y, STEEL) end
  setHex(img, 4, 17, STEEL); setHex(img, 5, 17, STEEL)

  setHex(img, 10, 8, GOLD_HI); setHex(img, 11, 7, GOLD_MD); setHex(img, 12, 8, GOLD_HI)
  setHex(img, 16, 13, GOLD_HI); setHex(img, 16, 14, GOLD_MD)
  setHex(img, 8, 18, GOLD_HI); setHex(img, 12, 18, GOLD_HI); setHex(img, 16, 18, GOLD_HI)

  saveAsset(spr, "items", "item_maquina_singer")
end

-- B. item_arte_de_la_guerra (24x24 px)
do
  local spr = Sprite(24, 24); local img = spr.cels[1].image
  local C_RED, C_DK = "#991b1b", "#450a0a"
  local GOLD = "#facc15"
  local PLASTIC_SHINE = "#ffffff"

  for y = 3, 21 do
    for x = 4, 20 do
      if x == 4 or x == 20 or y == 3 or y == 21 then setHex(img, x, y, C_DK)
      elseif x == 19 then setHex(img, x, y, "#fef08a")
      else setHex(img, x, y, (x <= 9) and C_DK or C_RED) end
    end
  end

  for y = 8, 16 do setHex(img, 12, y, GOLD) end
  setHex(img, 10, 10, GOLD); setHex(img, 14, 10, GOLD)
  setHex(img, 9, 14, GOLD); setHex(img, 15, 14, GOLD)

  for i = 0, 7 do setHex(img, 6 + i, 5 + i, PLASTIC_SHINE, 140) end
  setHex(img, 5, 4, "#38bdf8", 160); setHex(img, 19, 20, "#38bdf8", 160)

  saveAsset(spr, "items", "item_arte_de_la_guerra")
end

-- C. item_herbario_valle (24x24 px)
do
  local spr = Sprite(24, 24); local img = spr.cels[1].image
  local C_EARTH, C_DK = "#b45309", "#451a03"
  local PAPER = "#fef9c3"
  local HERB_G, HERB_BR = "#84cc16", "#78350f"

  for y = 4, 20 do
    for x = 3, 21 do
      if x == 12 then setHex(img, x, y, C_DK)
      elseif x == 3 or x == 21 or y == 4 or y == 20 then setHex(img, x, y, C_EARTH)
      else setHex(img, x, y, PAPER) end
    end
  end

  setHex(img, 7, 7, "#eab308"); setHex(img, 6, 7, "#ffffff"); setHex(img, 8, 7, "#ffffff")
  for y = 8, 14 do setHex(img, 7, y, HERB_BR) end
  setHex(img, 6, 11, HERB_G); setHex(img, 8, 12, HERB_G)

  for y = 7, 13 do for x = 15, 18 do setHex(img, x, y, HERB_G) end end
  for x = 14, 19 do setHex(img, x, 16, "#78350f"); setHex(img, x, 18, "#78350f") end

  saveAsset(spr, "items", "item_herbario_valle")
end

-- D. item_mapa_atajos_katia (24x24 px)
do
  local spr = Sprite(24, 24); local img = spr.cels[1].image
  local P_HI, P_MD, P_DK = "#fef08a", "#fde047", "#ca8a04"
  local RED_TRAIL = "#ef4444"

  for y = 5, 19 do
    for x = 4, 20 do setHex(img, x, y, (x <= 10) and P_MD or P_HI) end
  end
  for x = 3, 21 do
    setHex(img, x, 4, P_DK); setHex(img, x, 5, P_MD)
    setHex(img, x, 19, P_MD); setHex(img, x, 20, P_DK)
  end

  setHex(img, 7, 8, "#78350f"); setHex(img, 8, 9, "#78350f"); setHex(img, 9, 9, "#78350f")
  setHex(img, 16, 14, "#78350f"); setHex(img, 17, 15, "#78350f")

  setHex(img, 6, 15, RED_TRAIL); setHex(img, 8, 14, RED_TRAIL); setHex(img, 10, 14, RED_TRAIL)
  setHex(img, 11, 12, RED_TRAIL); setHex(img, 13, 11, RED_TRAIL); setHex(img, 15, 11, RED_TRAIL)
  setHex(img, 17, 8, RED_TRAIL); setHex(img, 18, 7, RED_TRAIL)
  setHex(img, 18, 8, "#b91c1c"); setHex(img, 19, 7, "#b91c1c")

  saveAsset(spr, "items", "item_mapa_atajos_katia")
end

----------------------------------------------------------------------
-- 3. PROGRESIÓN VISUAL DE BOLSAS (24x24 px en UI y en ITEMS)
----------------------------------------------------------------------

local function saveBag(spr, name)
  local pathUI = baseDir .. "/ui/" .. name
  local pathItem = baseDir .. "/items/" .. name
  spr:saveCopyAs(pathUI .. ".aseprite")
  spr:saveCopyAs(pathUI .. ".png")
  spr:saveCopyAs(pathItem .. ".aseprite")
  spr:saveCopyAs(pathItem .. ".png")
  spr:close()
end

-- A. ui_bolsa_08kg_rota (24x24 px)
do
  local spr = Sprite(24, 24); local img = spr.cels[1].image
  local T_HI, T_MD, T_DK = "#38bdf8", "#0284c7", "#075985"

  for y = 3, 7 do
    setHex(img, 8, y, T_MD); setHex(img, 16, y, T_MD)
  end
  for x = 8, 16 do setHex(img, x, 3, T_HI) end
  setHex(img, 7, 5, "#cbd5e1"); setHex(img, 17, 6, "#cbd5e1")

  for y = 8, 21 do
    for x = 5, 19 do
      setHex(img, x, y, (x <= 11) and T_HI or T_MD)
    end
  end

  for y = 14, 19 do
    for x = 13 + math.floor((y-14)*0.5), 18 do
      setPx(img, x, y, 0, 0, 0, 0)
    end
  end
  setHex(img, 14, 15, "#cbd5e1"); setHex(img, 15, 17, "#cbd5e1"); setHex(img, 16, 18, "#cbd5e1")

  saveBag(spr, "ui_bolsa_08kg_rota")
end

-- B. ui_bolso_12kg_reforzado (24x24 px)
do
  local spr = Sprite(24, 24); local img = spr.cels[1].image
  local C_HI, C_MD, C_DK = "#fde047", "#d97706", "#92400e"
  local STRAP = "#78350f"

  for i = 0, 14 do
    local sx = 5 + i; local sy = 2 + math.floor(i * 0.5)
    setHex(img, sx, sy, STRAP); setHex(img, sx, sy+1, "#451a03")
  end

  for y = 9, 21 do
    for x = 4, 20 do
      if x == 4 or x == 20 or y == 21 then setHex(img, x, y, C_DK)
      elseif y <= 13 then setHex(img, x, y, (x <= 11) and "#fef08a" or C_HI)
      else setHex(img, x, y, (x <= 11) and C_HI or C_MD) end
    end
  end

  setHex(img, 8, 16, "#ffffff"); setHex(img, 10, 16, "#ffffff"); setHex(img, 9, 17, "#ffffff"); setHex(img, 8, 18, "#ffffff"); setHex(img, 10, 18, "#ffffff")
  setHex(img, 14, 16, "#ffffff"); setHex(img, 16, 16, "#ffffff"); setHex(img, 15, 17, "#ffffff"); setHex(img, 14, 18, "#ffffff"); setHex(img, 16, 18, "#ffffff")

  setHex(img, 12, 13, "#facc15"); setHex(img, 12, 14, "#ca8a04")

  saveBag(spr, "ui_bolso_12kg_reforzado")
end

-- C. ui_mochila_18kg_costal (24x24 px)
do
  local spr = Sprite(24, 24); local img = spr.cels[1].image
  local B_HI, B_MD, B_DK = "#d97706", "#b45309", "#78350f"
  local SEATBELT = "#18181b"
  local RIVET = "#f1f5f9"

  for y = 4, 8 do for x = 7, 17 do setHex(img, x, y, (x <= 11) and "#fef08a" or B_HI) end end
  for x = 8, 16 do setHex(img, x, 7, "#facc15") end

  for y = 8, 21 do
    for x = 5, 19 do
      local isTexture = ((x + y) % 2 == 0)
      setHex(img, x, y, isTexture and B_HI or B_MD)
    end
  end

  for y = 8, 21 do
    setHex(img, 8, y, SEATBELT); setHex(img, 16, y, SEATBELT)
  end
  setHex(img, 8, 9, RIVET); setHex(img, 8, 15, RIVET); setHex(img, 8, 20, RIVET)
  setHex(img, 16, 9, RIVET); setHex(img, 16, 15, RIVET); setHex(img, 16, 20, RIVET)

  for y = 14, 19 do for x = 10, 14 do setHex(img, x, y, (y == 14) and "#78350f" or B_DK) end end

  saveBag(spr, "ui_mochila_18kg_costal")
end

-- D. ui_mochila_25kg_varilla (24x24 px)
do
  local spr = Sprite(24, 24); local img = spr.cels[1].image
  local FRAME_STEEL = "#94a3b8"
  local PACK_HI, PACK_MD = "#65a30d", "#3f6212"
  local STRAP = "#1e293b"
  local BUCKLE = "#facc15"

  for x = 4, 20 do setHex(img, x, 2, FRAME_STEEL) end
  for y = 2, 22 do
    setHex(img, 3, y, FRAME_STEEL); setHex(img, 21, y, FRAME_STEEL)
  end
  for x = 3, 21 do setHex(img, x, 22, FRAME_STEEL) end

  for y = 4, 20 do
    for x = 5, 19 do
      setHex(img, x, y, (x <= 11) and PACK_HI or PACK_MD)
    end
  end

  for x = 6, 18 do setHex(img, x, 7, "#84cc16"); setHex(img, x, 8, "#1a2e05") end
  for y = 8, 20 do
    setHex(img, 8, y, STRAP); setHex(img, 16, y, STRAP)
  end
  setHex(img, 8, 12, BUCKLE); setHex(img, 16, 12, BUCKLE)
  setHex(img, 8, 17, BUCKLE); setHex(img, 16, 17, BUCKLE)

  for y = 13, 18 do for x = 18, 20 do setHex(img, x, y, "#0284c7") end end

  saveBag(spr, "ui_mochila_25kg_varilla")
end