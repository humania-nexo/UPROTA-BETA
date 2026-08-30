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

local baseDir = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites"

local function saveAsset(spr, subfolder, name)
  local path = baseDir .. "/" .. subfolder .. "/" .. name
  spr:saveCopyAs(path .. ".aseprite")
  spr:saveCopyAs(path .. ".png")
  spr:close()
end

----------------------------------------------------------------------
-- 1. NPC DON CHUI (Cuerpo completo 32x48 px)
----------------------------------------------------------------------

-- A. npc_don_chui_idle (32x48 px - De pie apoyado en bastón de mezquite)
do
  local spr = Sprite(32, 48); local img = spr.cels[1].image
  local SKIN_HI, SKIN_MD, SKIN_DK = "#fed7aa", "#fb923c", "#c2410c"
  local BEARD_W, BEARD_G = "#ffffff", "#cbd5e1"
  local CAP_HI, CAP_DK = "#b45309", "#78350f"
  local SHIRT_HI, SHIRT_DK = "#3b82f6", "#1d4ed8"
  local APRON_HI, APRON_MD, APRON_DK = "#d97706", "#92400e", "#451a03"
  local PANTS = "#334155"
  local BOOT_HI, BOOT_DK = "#78350f", "#271204"
  local CANE_HI, CANE_DK = "#ca8a04", "#78350f"

  -- Head & Cap (Y: 4 to 16, X: 11 to 21)
  -- Brown Beret / Newsboy Cap
  for y = 4, 8 do for x = 11, 21 do setHex(img, x, y, (y <= 5) and CAP_HI or CAP_DK) end end
  for x = 10, 22 do setHex(img, x, 8, CAP_HI) end -- Visor
  -- Carpenter Red Pencil behind right ear!
  setHex(img, 21, 6, "#ef4444"); setHex(img, 22, 5, "#ef4444"); setHex(img, 23, 4, "#0f172a")

  -- Face & Eyes
  for y = 9, 13 do for x = 12, 20 do setHex(img, x, y, (x <= 15) and SKIN_HI or SKIN_MD) end end
  setHex(img, 14, 10, "#0f172a"); setHex(img, 18, 10, "#0f172a") -- Friendly eyes
  setHex(img, 16, 11, SKIN_DK) -- Nose

  -- Bushy White Beard (Y: 12 to 17, X: 12 to 20)
  for y = 12, 17 do for x = 12, 20 do setHex(img, x, y, (x % 2 == 0) and BEARD_W or BEARD_G) end end

  -- Red Bandana Neckerchief at collar
  setHex(img, 15, 17, "#ef4444"); setHex(img, 16, 17, "#b91c1c"); setHex(img, 17, 17, "#ef4444")

  -- Robust / Chunky Torso with Canvas Apron (Y: 18 to 33, X: 8 to 24)
  for y = 18, 33 do
    for x = 9, 23 do
      -- Blue denim sleeves on sides
      if x <= 10 or x >= 22 then
        setHex(img, x, y, (x <= 10) and SHIRT_HI or SHIRT_DK)
      else
        -- Sturdy Heavy Canvas Apron
        setHex(img, x, y, (x <= 15) and APRON_HI or APRON_MD)
      end
    end
  end
  -- Apron Pockets with tools (Y: 26 to 31)
  for y = 26, 31 do for x = 11, 21 do
    if y == 26 or x == 11 or x == 21 or x == 16 then setHex(img, x, y, APRON_DK) end
  end end
  -- Pliers / Wire coil poking out of pockets
  setHex(img, 13, 24, "#94a3b8"); setHex(img, 14, 25, "#475569") -- Pliers head
  setHex(img, 18, 25, "#facc15"); setHex(img, 19, 24, "#ca8a04") -- Brass wire loop

  -- Left Hand resting on Mezquite Walking Cane (X: 5 to 8, Y: 22 to 46)
  -- Cane curved crook handle
  setHex(img, 5, 21, CANE_HI); setHex(img, 6, 20, CANE_HI); setHex(img, 7, 21, CANE_DK)
  -- Left Hand gripping handle
  setHex(img, 6, 21, SKIN_MD); setHex(img, 6, 22, SKIN_HI)
  -- Cane shaft going all the way down to dirt
  for y = 22, 45 do setHex(img, 7, y, (y % 3 == 0) and CANE_HI or CANE_DK) end
  setHex(img, 7, 46, "#451a03") -- Iron tip on ground

  -- Right Arm at side
  for y = 20, 27 do setHex(img, 24, y, SHIRT_DK) end
  setHex(img, 24, 28, SKIN_HI); setHex(img, 24, 29, SKIN_MD) -- Right hand

  -- Legs & Work Pants (Y: 34 to 42, X: 11 to 21)
  for y = 34, 42 do
    for x = 11, 15 do setHex(img, x, y, PANTS) end -- Right leg (good leg)
    for x = 17, 21 do setHex(img, x, y, "#1e293b") end -- Left leg (stiff/limping leg with brace)
  end
  -- Leather brace strap on left stiff knee
  setHex(img, 17, 37, "#78350f"); setHex(img, 18, 37, "#facc15"); setHex(img, 19, 37, "#78350f"); setHex(img, 20, 37, "#78350f")

  -- Heavy Work Boots on Ground (Y: 43 to 46)
  for y = 43, 46 do
    for x = 10, 15 do setHex(img, x, y, (y == 46) and "#000000" or BOOT_HI) end
    for x = 17, 22 do setHex(img, x, y, (y == 46) and "#000000" or BOOT_DK) end
  end

  saveAsset(spr, "npcs", "npc_don_chui_idle")
end

-- B. npc_don_chui_caminando (32x48 px - Paso con cojera apoyándose en bastón)
do
  local spr = Sprite(32, 48); local img = spr.cels[1].image
  local SKIN_HI, SKIN_MD, SKIN_DK = "#fed7aa", "#fb923c", "#c2410c"
  local BEARD_W, BEARD_G = "#ffffff", "#cbd5e1"
  local CAP_HI, CAP_DK = "#b45309", "#78350f"
  local SHIRT_HI, SHIRT_DK = "#3b82f6", "#1d4ed8"
  local APRON_HI, APRON_MD, APRON_DK = "#d97706", "#92400e", "#451a03"
  local PANTS = "#334155"
  local BOOT_HI, BOOT_DK = "#78350f", "#271204"
  local CANE_HI, CANE_DK = "#ca8a04", "#78350f"

  -- Head & Cap tilted slightly forward with momentum (Y: 5 to 17, X: 12 to 22)
  for y = 5, 9 do for x = 12, 22 do setHex(img, x, y, (y <= 6) and CAP_HI or CAP_DK) end end
  for x = 11, 23 do setHex(img, x, 9, CAP_HI) end
  setHex(img, 22, 7, "#ef4444"); setHex(img, 23, 6, "#ef4444") -- Pencil

  -- Face & Eyes
  for y = 10, 14 do for x = 13, 21 do setHex(img, x, y, (x <= 16) and SKIN_HI or SKIN_MD) end end
  setHex(img, 15, 11, "#0f172a"); setHex(img, 19, 11, "#0f172a")
  setHex(img, 17, 12, SKIN_DK)

  -- Beard
  for y = 13, 18 do for x = 13, 21 do setHex(img, x, y, (x % 2 == 0) and BEARD_W or BEARD_G) end end
  setHex(img, 16, 18, "#ef4444"); setHex(img, 17, 18, "#b91c1c") -- Neckerchief

  -- Torso leaning forward into the stride
  for y = 19, 34 do
    for x = 10, 24 do
      if x <= 11 or x >= 23 then setHex(img, x, y, (x <= 11) and SHIRT_HI or SHIRT_DK)
      else setHex(img, x, y, (x <= 16) and APRON_HI or APRON_MD) end
    end
  end
  for y = 27, 32 do for x = 12, 22 do
    if y == 27 or x == 12 or x == 22 or x == 17 then setHex(img, x, y, APRON_DK) end
  end end
  setHex(img, 14, 25, "#94a3b8"); setHex(img, 19, 25, "#facc15") -- Tools

  -- Cane planted firmly ahead on the ground (X: 3 to 6, Y: 24 to 46)
  setHex(img, 3, 23, CANE_HI); setHex(img, 4, 22, CANE_HI); setHex(img, 5, 23, CANE_DK)
  setHex(img, 4, 23, SKIN_MD); setHex(img, 4, 24, SKIN_HI) -- Hand on cane
  for y = 24, 45 do setHex(img, 4, y, (y % 3 == 0) and CANE_HI or CANE_DK) end
  setHex(img, 4, 46, "#451a03")

  -- Walking Stride (Right leg forward stepping, Left stiff leg dragging/following)
  -- Forward Step (Right Boot X: 8 to 14, Y: 42 to 46)
  for y = 35, 42 do for x = 10, 14 do setHex(img, x, y, PANTS) end end
  for y = 43, 46 do for x = 8, 14 do setHex(img, x, y, (y == 46) and "#000000" or BOOT_HI) end end

  -- Trailing Stiff Leg (Left Leg X: 19 to 25, Y: 35 to 45)
  for y = 35, 41 do for x = 19, 23 do setHex(img, x, y, "#1e293b") end end
  setHex(img, 19, 38, "#78350f"); setHex(img, 20, 38, "#facc15"); setHex(img, 21, 38, "#78350f") -- Knee brace
  for y = 42, 45 do for x = 20, 25 do setHex(img, x, y, (y == 45) and "#000000" or BOOT_DK) end end

  saveAsset(spr, "npcs", "npc_don_chui_caminando")
end

-- C. npc_perro_cimarron (32x24 px - Perro mestizo leal con venda en la pata)
do
  local spr = Sprite(32, 24); local img = spr.cels[1].image
  local D_HI, D_MD, D_DK = "#d97706", "#92400e", "#451a03"
  local D_BEL, D_EAR = "#fef08a", "#78350f"
  local BAND_W, BAND_G = "#ffffff", "#cbd5e1"

  -- Body (Y: 8 to 17, X: 8 to 22)
  for y = 9, 16 do
    for x = 9, 21 do
      local inBelly = (y >= 14 and x >= 12 and x <= 18)
      setHex(img, x, y, inBelly and D_BEL or ((x <= 14) and D_HI or D_MD))
    end
  end

  -- Tail wagging up (Y: 6 to 11, X: 21 to 26)
  setHex(img, 22, 8, D_MD); setHex(img, 23, 7, D_HI); setHex(img, 24, 6, D_HI); setHex(img, 25, 5, D_BEL)

  -- Head & Muzzle (X: 3 to 11, Y: 4 to 12)
  for y = 5, 10 do for x = 4, 10 do setHex(img, x, y, (x <= 7) and D_HI or D_MD) end end
  setHex(img, 3, 7, "#0f172a"); setHex(img, 3, 8, "#0f172a") -- Black moist nose
  setHex(img, 6, 6, "#0f172a"); setHex(img, 7, 6, "#ffffff") -- Expressive loyal eye
  -- Droopy alert ears
  setHex(img, 8, 3, D_EAR); setHex(img, 9, 3, D_EAR); setHex(img, 10, 4, D_DK); setHex(img, 10, 5, D_DK)

  -- 4 Paws / Legs (Y: 16 to 22)
  -- Back Legs (X: 18 to 22)
  for y = 16, 21 do
    setHex(img, 18, y, D_MD); setHex(img, 21, y, D_DK)
  end
  setHex(img, 17, 22, D_DK); setHex(img, 18, 22, D_DK); setHex(img, 20, 22, D_DK); setHex(img, 21, 22, D_DK) -- Paws

  -- Front Left Leg (Healthy X: 11)
  for y = 16, 21 do setHex(img, 11, y, D_HI) end
  setHex(img, 10, 22, D_MD); setHex(img, 11, 22, D_MD)

  -- Front Right Leg (Injured with White Cloth Bandage! X: 7 to 9, Y: 15 to 22)
  setHex(img, 8, 15, D_MD); setHex(img, 8, 16, D_MD)
  -- White/grey cloth wrap
  for y = 17, 20 do
    for x = 7, 9 do setHex(img, x, y, (y % 2 == 0) and BAND_W or BAND_G) end
  end
  setHex(img, 7, 19, "#ef4444") -- Small blood spot on bandage (healing)
  setHex(img, 8, 21, BAND_G); setHex(img, 8, 22, D_DK) -- Paw

  saveAsset(spr, "npcs", "npc_perro_cimarron")
end

----------------------------------------------------------------------
-- 2. ÍTEMS: LOS 3 MANUALES DE DON CHUI Y LA BIBLIA (24x24 px)
----------------------------------------------------------------------

-- A. item_manual_tomo1 (24x24 px - Cuaderno rústico con boceto de fogón)
do
  local spr = Sprite(24, 24); local img = spr.cels[1].image
  local C_HI, C_MD, C_DK = "#fde047", "#d97706", "#78350f"
  local P_HI, P_MD = "#fef9c3", "#fef08a"
  local SEW = "#451a03"

  -- Leather / Cardboard cover (X: 4 to 20, Y: 3 to 21)
  for y = 3, 21 do
    for x = 4, 20 do
      if x == 4 or x == 20 or y == 3 or y == 21 then setHex(img, x, y, C_DK)
      else setHex(img, x, y, (x <= 10) and C_MD or C_HI) end
    end
  end
  -- Bound edge with hemp thread stitching (X: 4 to 6)
  for y = 4, 20, 2 do setHex(img, 5, y, SEW); setHex(img, 6, y, "#ffffff") end

  -- Cover Sketch: Hearth & Fire spindle (X: 10 to 17, Y: 8 to 16)
  -- Spindle stick
  for i = 0, 5 do setHex(img, 11 + i, 9 + i, "#78350f") end
  -- Flame icon sketch
  setHex(img, 14, 13, "#ef4444"); setHex(img, 14, 12, "#facc15"); setHex(img, 15, 14, "#f97316")
  -- Handwritten Roman numeral "I"
  setHex(img, 13, 6, "#451a03"); setHex(img, 14, 6, "#451a03"); setHex(img, 15, 6, "#451a03")
  setHex(img, 14, 7, "#451a03")

  saveAsset(spr, "items", "item_manual_tomo1")
end

-- B. item_manual_tomo2 (24x24 px - Manchas de grasa y boceto de trampa)
do
  local spr = Sprite(24, 24); local img = spr.cels[1].image
  local C_HI, C_MD, C_DK = "#cbd5e1", "#94a3b8", "#475569"
  local GREASE = "#78350f"

  -- Weathered canvas/oilcloth cover
  for y = 3, 21 do
    for x = 4, 20 do
      if x == 4 or x == 20 or y == 3 or y == 21 then setHex(img, x, y, "#1e293b")
      else setHex(img, x, y, (x <= 10) and C_MD or C_HI) end
    end
  end
  -- Stitching
  for y = 4, 20, 2 do setHex(img, 5, y, "#0f172a") end

  -- Grease stains on cover
  setHex(img, 8, 5, GREASE, 180); setHex(img, 9, 5, GREASE, 200); setHex(img, 9, 6, GREASE, 160)
  setHex(img, 16, 17, GREASE, 200); setHex(img, 17, 17, GREASE, 180); setHex(img, 17, 18, GREASE, 220)

  -- Cover Sketch: Snare wire loop & fish
  for y = 10, 15 do for x = 11, 16 do
    local d = math.sqrt((x - 13.5)^2 + (y - 12.5)^2)
    if d <= 2.5 and d >= 1.8 then setHex(img, x, y, "#facc15") end
  end end
  setHex(img, 14, 15, "#ca8a04"); setHex(img, 14, 16, "#ca8a04")

  -- Handwritten Roman numeral "II"
  setHex(img, 12, 6, "#1e293b"); setHex(img, 13, 6, "#1e293b")
  setHex(img, 15, 6, "#1e293b"); setHex(img, 16, 6, "#1e293b")

  saveAsset(spr, "items", "item_manual_tomo2")
end

-- C. item_manual_tomo3 (24x24 px - Esquemas de horno de barro y albañilería)
do
  local spr = Sprite(24, 24); local img = spr.cels[1].image
  local C_HI, C_MD, C_DK = "#b45309", "#78350f", "#451a03"

  -- Thick sturdy binding
  for y = 3, 21 do
    for x = 3, 20 do
      if x == 3 or x == 20 or y == 3 or y == 21 then setHex(img, x, y, "#1a0802")
      else setHex(img, x, y, (x <= 8) and C_DK or ((x <= 13) and C_MD or C_HI)) end
    end
  end
  -- Brass corner protectors
  setHex(img, 4, 4, "#facc15"); setHex(img, 19, 4, "#facc15")
  setHex(img, 4, 20, "#facc15"); setHex(img, 19, 20, "#facc15")

  -- Cover Sketch: Cob Oven Dome & Flue Pipe
  for y = 10, 16 do for x = 10, 17 do
    local d = math.sqrt((x - 13.5)^2 + (y - 14)^2)
    if d <= 3.2 then setHex(img, x, y, (d <= 1.2) and "#ea580c" or "#fed7aa") end
  end end
  setHex(img, 13, 9, "#fed7aa"); setHex(img, 13, 8, "#fed7aa") -- Chimney

  -- Handwritten Roman numeral "III"
  setHex(img, 11, 6, "#fef08a"); setHex(img, 13, 6, "#fef08a"); setHex(img, 15, 6, "#fef08a")

  saveAsset(spr, "items", "item_manual_tomo3")
end

-- D. item_biblia_don_chui (24x24 px - Cuero gastado con cruz sobria grabada)
do
  local spr = Sprite(24, 24); local img = spr.cels[1].image
  local L_HI, L_MD, L_DK = "#78350f", "#451a03", "#1c0b02"
  local GOLD_HI, GOLD_MD = "#fde047", "#ca8a04"

  -- Thick Leather Bound Bible
  for y = 2, 21 do
    for x = 4, 20 do
      if x == 4 or x == 20 or y == 2 or y == 21 then setHex(img, x, y, L_DK)
      elseif x == 19 then setHex(img, x, y, "#fef08a") -- Gilded page edges visible!
      else setHex(img, x, y, (x <= 9) and L_DK or ((x <= 14) and L_MD or L_HI)) end
    end
  end

  -- Red Silk Ribbon Bookmark hanging out bottom
  for y = 17, 23 do setHex(img, 12, y, "#ef4444"); setHex(img, 13, y, "#b91c1c") end

  -- Embossed Gold / Brass Cross in Center
  for y = 6, 16 do setHex(img, 12, y, GOLD_HI); setHex(img, 13, y, GOLD_MD) end
  for x = 9, 16 do setHex(img, x, 9, GOLD_HI); setHex(img, x, 10, GOLD_MD) end
  setHex(img, 12, 9, "#ffffff") -- Central radiant glint

  saveAsset(spr, "items", "item_biblia_don_chui")
end

----------------------------------------------------------------------
-- 3. ESTRUCTURAS TIPO S (Salto Evolutivo del Refugio - 32x32 px)
----------------------------------------------------------------------

-- A. cimiento_alacena_colgante (32x32 px - Caja suspendida con alambres engrasados)
do
  local spr = Sprite(32, 32); local img = spr.cels[1].image
  local W_HI, W_MD, W_DK, OUT = "#d97706", "#92400e", "#451a03", "#1c0b02"
  local WIRE = "#cbd5e1"
  local GREASE = "#78350f"

  -- Ceiling joist beam at top (Y: 1 to 5, X: 2 to 29)
  for y = 1, 5 do for x = 2, 29 do setHex(img, x, y, (y <= 2) and "#78350f" or "#451a03") end end

  -- 2 Suspension Wires with Anti-Rat Grease Cones (X: 7 and X: 24, Y: 5 to 15)
  for y = 5, 15 do
    setHex(img, 7, y, WIRE); setHex(img, 24, y, WIRE)
  end
  -- Inverted Anti-Rat Cones (where mice slide off!)
  for dx = -2, 2 do
    setHex(img, 7 + dx, 10, GREASE); setHex(img, 7 + dx, 11, "#ca8a04")
    setHex(img, 24 + dx, 10, GREASE); setHex(img, 24 + dx, 11, "#ca8a04")
  end

  -- Suspended Wooden Pantry Box (X: 4 to 27, Y: 15 to 29)
  for y = 15, 29 do
    for x = 4, 27 do
      if x == 4 or x == 27 or y == 15 or y == 29 then setHex(img, x, y, OUT)
      else setHex(img, x, y, (x <= 14) and W_HI or W_MD) end
    end
  end

  -- Screen Mesh Front Door (Ventilation without insects/mice)
  for y = 18, 26 do
    for x = 7, 24 do
      if (x + y) % 2 == 0 then setHex(img, x, y, "#94a3b8", 180)
      else setHex(img, x, y, "#271204") end
    end
  end
  -- Provisions inside (Cans & Dried Meat visible through mesh)
  setHex(img, 10, 22, "#ef4444"); setHex(img, 11, 22, "#cbd5e1")
  setHex(img, 18, 22, "#d97706"); setHex(img, 19, 22, "#facc15")

  -- Wooden latch on front
  setHex(img, 15, 22, "#facc15"); setHex(img, 16, 22, "#ca8a04")

  saveAsset(spr, "mecanicas", "cimiento_alacena_colgante")
end

-- B. cimiento_horno_cob (32x32 px - Horno de barro semiesférico humeando)
do
  local spr = Sprite(32, 32); local img = spr.cels[1].image
  local C_HI, C_MD, C_DK = "#ea580c", "#c2410c", "#7c2d12"
  local S_HI, S_MD, S_DK = "#a8a29e", "#57534e", "#292524"

  -- Stone Foundation Base (Y: 23 to 31, X: 3 to 28)
  for y = 23, 31 do
    for x = 3, 28 do
      local isBorder = (x == 3 or x == 28 or y == 31)
      setHex(img, x, y, isBorder and S_DK or (((x + y) % 3 == 0) and S_HI or S_MD))
    end
  end

  -- Hemispherical Cob Dome (Center at 16, 23, radius 11)
  for y = 8, 23 do
    for x = 5, 27 do
      local d = math.sqrt((x - 16)^2 + (y - 23)^2 * 1.1)
      if d <= 11.2 then
        setHex(img, x, y, (x <= 14 or y <= 13) and C_HI or ((x <= 20) and C_MD or C_DK))
      end
    end
  end

  -- Clay Chimney Flue on Top Left (X: 9 to 13, Y: 3 to 9)
  for y = 3, 9 do for x = 9, 13 do setHex(img, x, y, (x <= 10) and C_HI or C_DK) end end
  -- Billowing Aromatic Smoke from Chimney!
  setHex(img, 11, 2, "#cbd5e1", 200); setHex(img, 12, 1, "#f1f5f9", 160); setHex(img, 13, 0, "#94a3b8", 120)

  -- Arched Oven Mouth (X: 12 to 20, Y: 15 to 23)
  for y = 15, 23 do
    for x = 12, 20 do
      local d = math.sqrt((x - 16)^2 * 1.2 + (y - 23)^2)
      if d <= 4.8 then
        -- Blazing fire glow inside!
        setHex(img, x, y, (d <= 2.2) and "#ffffff" or ((d <= 3.5) and "#fde047" or "#ea580c"))
      end
    end
  end

  -- Loaf of rustic bread baking on peel at oven mouth
  setHex(img, 14, 21, "#d97706"); setHex(img, 15, 21, "#fef08a"); setHex(img, 16, 21, "#d97706")

  saveAsset(spr, "mecanicas", "cimiento_horno_cob")
end

-- C. cimiento_desviador_pluvial (32x32 px - First-flush diverter con canaleta)
do
  local spr = Sprite(32, 32); local img = spr.cels[1].image
  local T_HI, T_MD, T_DK = "#94a3b8", "#475569", "#1e293b"
  local P_HI, P_MD = "#f1f5f9", "#cbd5e1"
  local WATER = "#38bdf8"

  -- Corrugated Roof Edge & Gutter Trough at top (Y: 2 to 7, X: 2 to 20)
  for y = 2, 5 do for x = 2, 20 do setHex(img, x, y, (y <= 3) and T_HI or T_MD) end end
  for x = 2, 20 do setHex(img, x, 6, T_DK); setHex(img, x, 7, "#0f172a") end -- Gutter channel

  -- Vertical First-Flush PVC Pipe (X: 7 to 11, Y: 7 to 28)
  for y = 7, 28 do
    for x = 7, 11 do
      if x == 7 or x == 11 then setHex(img, x, y, T_DK)
      else setHex(img, x, y, (y >= 18) and "#78350f" or ((x <= 8) and P_HI or P_MD)) end -- Dirty water in bottom!
    end
  end
  -- Floating Ball Valve inside pipe
  setHex(img, 9, 15, "#ef4444"); setHex(img, 10, 15, "#ef4444")
  setHex(img, 9, 16, "#b91c1c"); setHex(img, 10, 16, "#b91c1c")

  -- Clean Water Overflow Bypass Diverter to Clean Tank (T-Junction X: 11 to 26, Y: 12 to 16)
  for x = 11, 23 do
    for y = 12, 16 do
      if y == 12 or y == 16 then setHex(img, x, y, T_DK)
      else setHex(img, x, y, WATER) end -- Pure clean water flowing!
    end
  end

  -- 200L Clean Storage Barrel on Right (X: 20 to 30, Y: 17 to 30)
  for y = 17, 30 do
    for x = 20, 30 do
      if x == 20 or x == 30 or y == 30 then setHex(img, x, y, "#0f172a")
      else setHex(img, x, y, (x <= 24) and "#0284c7" or "#0369a1") end
    end
  end
  -- Water level indicator tube on barrel
  for y = 20, 28 do setHex(img, 28, y, WATER) end

  -- Clean Drainage Tap at bottom of first-flush pipe
  setHex(img, 9, 29, "#facc15"); setHex(img, 9, 30, "#ca8a04")

  saveAsset(spr, "mecanicas", "cimiento_desviador_pluvial")
end

----------------------------------------------------------------------
-- 4. ICONOS DE INTERFAZ PARA CONTINGENCIAS (24x24 px)
----------------------------------------------------------------------

-- A. ui_mision_preventiva (24x24 px - Escudo rústico reforzado)
do
  local spr = Sprite(24, 24); local img = spr.cels[1].image
  local W_HI, W_MD, W_DK = "#d97706", "#92400e", "#451a03"
  local M_HI, M_MD, M_DK = "#f1f5f9", "#94a3b8", "#334155"

  -- Shield Outline & Body (X: 4 to 19, Y: 3 to 21)
  for y = 3, 21 do
    local w = 7
    if y >= 12 then w = math.floor((21 - y) * 7 / 9) end
    for dx = -w, w do
      local x = 11 + dx
      local isBorder = (math.abs(dx) == w or y == 3 or y == 21)
      if isBorder then
        setHex(img, x, y, M_DK)
      elseif math.abs(dx) == w - 1 or y == 4 then
        setHex(img, x, y, M_HI)
      else
        setHex(img, x, y, (dx <= 0) and W_HI or W_MD)
      end
    end
  end

  -- Steel Cross & Boss in center
  for y = 6, 17 do setHex(img, 11, y, M_HI); setHex(img, 12, y, M_MD) end
  for x = 7, 16 do setHex(img, x, 10, M_HI); setHex(img, x, 11, M_MD) end
  -- Center Rivet / Gem
  setHex(img, 11, 10, "#ffffff"); setHex(img, 12, 11, "#1e293b")
  -- Corner Rivets
  setHex(img, 7, 6, "#ffffff"); setHex(img, 16, 6, "#ffffff")

  saveAsset(spr, "ui", "ui_mision_preventiva")
end

-- B. ui_mision_correctiva (24x24 px - Martillo y llave cruzados con destello)
do
  local spr = Sprite(24, 24); local img = spr.cels[1].image
  local S_HI, S_MD, S_DK = "#f1f5f9", "#94a3b8", "#334155"
  local W_HI, W_MD = "#d97706", "#78350f"

  -- Diagonal 1: Heavy Claw Hammer (SW to NE)
  for i = 0, 11 do
    local hx = 5 + i; local hy = 18 - i
    setHex(img, hx, hy, (i % 2 == 0) and W_HI or W_MD) -- Wooden handle
  end
  -- Hammer Steel Head at top right (X: 15 to 19, Y: 5 to 9)
  setHex(img, 16, 6, S_HI); setHex(img, 17, 6, S_HI); setHex(img, 18, 5, S_HI)
  setHex(img, 17, 7, S_MD); setHex(img, 18, 7, S_MD); setHex(img, 19, 7, S_DK) -- Striking face
  setHex(img, 14, 8, S_DK); setHex(img, 15, 9, S_DK) -- Claw

  -- Diagonal 2: Adjustable Wrench (NW to SE)
  for i = 0, 11 do
    local wx = 5 + i; local wy = 6 + i
    setHex(img, wx, wy, (i % 2 == 0) and S_HI or S_MD)
  end
  -- Wrench Head at top left (X: 4 to 8, Y: 4 to 8)
  setHex(img, 4, 4, S_HI); setHex(img, 5, 4, S_HI); setHex(img, 6, 5, S_MD)
  setHex(img, 4, 6, S_HI); setHex(img, 5, 7, S_DK); setHex(img, 7, 7, S_DK)

  -- Radiant Golden Spark of Accomplished Repair! (Center at 11, 12)
  setHex(img, 11, 12, "#ffffff")
  setHex(img, 11, 10, "#fde047"); setHex(img, 11, 14, "#fde047")
  setHex(img, 9, 12, "#fde047"); setHex(img, 13, 12, "#fde047")
  setHex(img, 10, 11, "#facc15"); setHex(img, 12, 11, "#facc15")
  setHex(img, 10, 13, "#facc15"); setHex(img, 12, 13, "#facc15")

  saveAsset(spr, "ui", "ui_mision_correctiva")
end