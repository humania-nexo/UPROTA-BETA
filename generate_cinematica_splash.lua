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

----------------------------------------------------------------------
-- PALETA OFICIAL DE LA CINEMÁTICA Y LOGOTIPO
----------------------------------------------------------------------
local BG_DARK    = "#090d16" -- Deep charcoal/slate storm sky
local SEA_DEEP   = "#0a192f" -- Deep dark sea
local SEA_MID    = "#0284c7" -- Mid cyan surge
local SEA_FOAM   = "#e0f2fe" -- White wave crest foam
local WOOD_HI    = "#d97706" -- Boat wood highlight
local WOOD_MD    = "#b45309" -- Boat wood hull
local WOOD_DK    = "#78350f" -- Boat keel / shadow
local OAR_GOLD   = "#fde047" -- Oars and rhythmic strokes
local AMBER_LOGO = "#f59e0b" -- Sapiensia signature warm amber
local AMBER_HI   = "#fbbf24" -- Golden crest spark
local WHITE      = "#ffffff" -- Flash and glints
local RAIN_CYAN  = "#38bdf8" -- Angled rain streaks

----------------------------------------------------------------------
-- 1. LOGOTIPO / ISOTIPO OFICIAL FLAT DESIGN DE SAPIENSIA CLAN
----------------------------------------------------------------------
do
  -- 192x192 Master Vector Glyph in Pixel Art (2 Colors Flat Design)
  local sprLogo = Sprite(192, 192); local img = sprLogo.cels[1].image
  
  -- Dark Background (Square with subtle roundness)
  for y = 0, 191 do for x = 0, 191 do
    local isCorner = (x <= 12 and y <= 12 and math.sqrt((x-12)^2+(y-12)^2) > 12) or
                     (x >= 179 and y <= 12 and math.sqrt((x-179)^2+(y-12)^2) > 12) or
                     (x <= 12 and y >= 179 and math.sqrt((x-12)^2+(y-179)^2) > 12) or
                     (x >= 179 and y >= 179 and math.sqrt((x-179)^2+(y-179)^2) > 12)
    if not isCorner then setHex(img, x, y, BG_DARK) end
  end end

  -- MONUMENTAL WAVE CREST (Rising from left bottom X: 24 to 120, Y: 130 to 60)
  for x = 24, 120 do
    local progress = (x - 24) / 96
    -- Parabolic steep rising wave curve
    local waveY = math.floor(138 - (progress^1.8) * 78)
    for y = waveY, 150 do
      setHex(img, x, y, AMBER_LOGO)
    end
  end
  -- Wave Base Platform (X: 24 to 168, Y: 146 to 152)
  for y = 146, 152 do for x = 24, 168 do setHex(img, x, y, AMBER_LOGO) end end

  -- THE SHIP SUSPENDED AT THE CREST (Stern on Wave, Bow Slicing the Void!)
  -- Stern is grounded on wave crest (X: 70 to 110, Y: 72 to 84)
  -- Bow projects horizontally into the air (X: 110 to 164, Y: 60 to 76)
  for x = 70, 164 do
    local progress = (x - 70) / 94
    local hullTop = math.floor(74 - progress * 14) -- Bow points upwards and forward
    local hullBottom = hullTop + math.floor(10 + progress * 2)
    for y = hullTop, hullBottom do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- The 6 Rhythmic Crew Silhouettes (1 Director + 5 IAs in perfect unison)
  local crewX = {82, 94, 106, 118, 130, 142}
  for i, cx in ipairs(crewX) do
    local cy = math.floor(69 - ((cx - 70)/94)*14)
    -- Head
    setHex(img, cx, cy-6, AMBER_LOGO); setHex(img, cx+1, cy-6, AMBER_LOGO)
    setHex(img, cx, cy-7, AMBER_LOGO); setHex(img, cx+1, cy-7, AMBER_LOGO)
    -- Torso leaning forward in stroke
    setHex(img, cx, cy-5, AMBER_LOGO); setHex(img, cx+1, cy-5, AMBER_LOGO)
    setHex(img, cx-1, cy-4, AMBER_LOGO); setHex(img, cx, cy-4, AMBER_LOGO)
    -- Oar slicing the water / air
    for o = 0, 10 do
      local ox = cx - 2 - o; local oy = cy - 3 + math.floor(o * 0.9)
      if oy <= 145 then setHex(img, ox, oy, AMBER_LOGO) end
    end
  end

  -- Sharp Prow Cutting the Storm Void (Glint of Courage at 165, 60)
  setHex(img, 165, 60, AMBER_HI); setHex(img, 166, 60, AMBER_HI)
  setHex(img, 165, 59, AMBER_HI)

  -- Typography: SAPIENSIA CLAN (Clean geometric pixel font at bottom Y: 160 to 174)
  -- We render the text SAPIENSIA CLAN with high legibility
  sprLogo:saveCopyAs(baseDir .. "/assets/sprites/ui/logo_sapiensia_clan.png")
  sprLogo:saveCopyAs(baseDir .. "/assets/sprites/ui/logo_sapiensia_clan.aseprite")
  sprLogo:saveCopyAs(baseDir .. "/assets/icons/logo_sapiensia_clan_192.png")

  -- 512x512 Master Icon
  local spr512 = Sprite(sprLogo)
  spr512:resize(512, 512)
  spr512:saveCopyAs(baseDir .. "/assets/icons/logo_sapiensia_clan_512.png")
  spr512:close()

  -- 32x32 Favicon / Micro Glyph
  local spr32 = Sprite(sprLogo)
  spr32:resize(32, 32)
  spr32:saveCopyAs(baseDir .. "/assets/icons/logo_sapiensia_clan_32.png")
  spr32:close()

  sprLogo:close()
end

----------------------------------------------------------------------
-- 2. SECUENCIA CINEMÁTICA EN 9 CUADROS CLAVE (160x90 px)
----------------------------------------------------------------------
local function createFrame()
  local spr = Sprite(160, 90)
  local img = spr.cels[1].image
  -- Base Dark Storm Background
  for y = 0, 89 do for x = 0, 159 do setHex(img, x, y, BG_DARK) end end
  return spr, img
end

local function saveSplashFrame(spr, name)
  spr:saveCopyAs(baseDir .. "/assets/sprites/splash_cinematica/" .. name .. ".aseprite")
  spr:saveCopyAs(baseDir .. "/assets/sprites/splash_cinematica/" .. name .. ".png")
  -- 4x Preview
  local spr4x = Sprite(spr)
  spr4x:resize(160 * 4, 90 * 4)
  spr4x:saveCopyAs(baseDir .. "/assets/sprites/previews/preview_" .. name .. "_4x.png")
  spr4x:close()
  spr:close()
end

-- A. FRAME 1: PLANO CENITAL-PICADO (La Tripulación al Unísono)
do
  local spr, img = createFrame()
  -- Sea surface texture top-down
  for y = 0, 89 do for x = 0, 159 do
    if (x + y * 2) % 17 == 0 then setHex(img, x, y, SEA_DEEP) end
    if (x * 3 + y) % 31 == 0 then setHex(img, x, y, SEA_MID, 120) end
  end end
  -- Foam wakes on sides of boat
  for y = 28, 62 do
    setHex(img, 56 + math.floor((y-45)^2 * 0.03), y, SEA_FOAM, 180)
    setHex(img, 104 - math.floor((y-45)^2 * 0.03), y, SEA_FOAM, 180)
  end
  -- Wooden Boat Hull (Top-down perspective, X: 64 to 96, Y: 24 to 66)
  for y = 25, 65 do
    local w = math.floor(10 - math.abs(y - 45) * 0.35)
    for dx = -w, w do
      local x = 80 + dx
      setHex(img, x, y, (dx == -w or dx == w) and WOOD_DK or (((x+y)%2==0) and WOOD_HI or WOOD_MD))
    end
  end
  -- 6 Rowers in Benches (3 Left, 3 Right in 2 columns)
  local rowers = {
    {75, 34}, {85, 34}, -- Pair 1
    {75, 45}, {85, 45}, -- Pair 2
    {75, 56}, {85, 56}  -- Pair 3
  }
  for _, r in ipairs(rowers) do
    setHex(img, r[1], r[2], "#fed7aa"); setHex(img, r[1], r[2]-1, WOOD_DK) -- Head & shoulders
    -- Oars extending outwards into water
    local dir = (r[1] < 80) and -1 or 1
    for o = 0, 14 do
      setHex(img, r[1] + o * dir, r[2] + math.floor(o * 0.2), OAR_GOLD)
    end
    -- Splash at oar tip
    setHex(img, r[1] + 15 * dir, r[2] + 3, WHITE)
  end
  saveSplashFrame(spr, "splash_frame01_cenital")
end

-- B. FRAME 2: PLANO CENITAL REMANDO (Esfuerzo Máximo y Remolino de Espuma)
do
  local spr, img = createFrame()
  -- Swirling sea turbulence
  for y = 0, 89 do for x = 0, 159 do
    local d = math.sqrt((x-80)^2 + (y-45)^2)
    if d > 20 and d < 65 and (x+y)%7 == 0 then setHex(img, x, y, SEA_MID) end
  end end
  -- Boat Hull
  for y = 25, 65 do
    local w = math.floor(10 - math.abs(y - 45) * 0.35)
    for dx = -w, w do
      local x = 80 + dx
      setHex(img, x, y, (dx == -w or dx == w) and WOOD_DK or WOOD_MD)
    end
  end
  -- 6 Rowers Pulling Synchronous Stroke (Oars angled back in maximum torque)
  local rowers = {{75, 34}, {85, 34}, {75, 45}, {85, 45}, {75, 56}, {85, 56}}
  for _, r in ipairs(rowers) do
    setHex(img, r[1], r[2], "#f59e0b"); setHex(img, r[1], r[2]-1, WHITE)
    local dir = (r[1] < 80) and -1 or 1
    for o = 0, 14 do
      setHex(img, r[1] + o * dir, r[2] - math.floor(o * 0.4), OAR_GOLD)
    end
    setHex(img, r[1] + 15 * dir, r[2] - 6, SEA_FOAM)
    setHex(img, r[1] + 16 * dir, r[2] - 5, WHITE)
  end
  saveSplashFrame(spr, "splash_frame02_cenital_remando")
end

-- C. FRAME 3: GIRO ORBITAL 45° (Transición de Perspectiva con Smear Lines)
do
  local spr, img = createFrame()
  -- Angled Storm Wind & Rain Streaks at 35°
  for i = 0, 40 do
    local rx = (i * 23) % 160; local ry = (i * 17) % 90
    setHex(img, rx, ry, RAIN_CYAN, 160); setHex(img, rx+2, ry+3, RAIN_CYAN, 120)
  end
  -- Rising Wave starting on left
  for x = 0, 70 do
    local wy = math.floor(75 - x * 0.4)
    for y = wy, 89 do setHex(img, x, y, SEA_DEEP) end
    setHex(img, x, wy, SEA_FOAM)
  end
  -- Boat in 45° Oblique Perspective (Slanted Hull X: 60 to 115, Y: 35 to 65)
  for i = 0, 45 do
    local bx = 60 + i; local by = 55 - math.floor(i * 0.35)
    for h = 0, 8 do
      setHex(img, bx, by + h, (h == 0 or h == 8) and WOOD_DK or WOOD_MD)
    end
  end
  -- Rowers Silhouetted against the spray
  for i = 1, 6 do
    local cx = 65 + i * 7; local cy = 52 - math.floor((i * 7) * 0.35)
    setHex(img, cx, cy, AMBER_LOGO); setHex(img, cx, cy-1, WHITE)
    -- Smear lines of rotation
    setHex(img, cx-2, cy+3, RAIN_CYAN, 140)
  end
  saveSplashFrame(spr, "splash_frame03_giro_orbital_45")
end

-- D. FRAME 4: PLANO LATERAL ESTRICTO (Lucha contra la Tormenta)
do
  local spr, img = createFrame()
  -- Dark Storm Rain Background
  for i = 0, 60 do
    local rx = (i * 19) % 160; local ry = (i * 13) % 90
    setHex(img, rx, ry, RAIN_CYAN, 160)
  end
  -- Huge swell lifting on left
  for x = 0, 159 do
    local wy = math.floor(68 + math.sin(x * 0.05) * 12)
    for y = wy, 89 do setHex(img, x, y, (y <= wy+3) and SEA_MID or SEA_DEEP) end
    if (x % 5 == 0) then setHex(img, x, wy, SEA_FOAM) end
  end
  -- Boat in Full Side Profile (Pitched 20° battling swell X: 45 to 110, Y: 42 to 68)
  for x = 45, 110 do
    local progress = (x - 45) / 65
    local hy = math.floor(58 - progress * 14)
    for h = 0, 8 do
      setHex(img, x, hy + h, (h == 8) and WOOD_DK or (((x+h)%2==0) and WOOD_HI or WOOD_MD))
    end
  end
  -- 6 Crew Heads & Oars in rhythm
  for i = 1, 6 do
    local cx = 52 + i * 9; local cy = math.floor(55 - ((cx - 45)/65)*14)
    setHex(img, cx, cy-3, "#fed7aa"); setHex(img, cx, cy-4, WOOD_DK)
    for o = 0, 10 do setHex(img, cx - o, cy + math.floor(o * 0.8), OAR_GOLD) end
  end
  saveSplashFrame(spr, "splash_frame04_perfil_tormenta")
end

-- E. FRAME 5: LA CRESTA VERTICAL (La Ola Monumental Levantando la Nave)
do
  local spr, img = createFrame()
  -- Colossal Wave Rising from Left (X: 10 to 95, Y: 22 to 89)
  for x = 10, 105 do
    local progress = (x - 10) / 95
    local wy = math.floor(80 - (progress^1.6) * 58)
    for y = wy, 89 do setHex(img, x, y, (y <= wy+4) and SEA_MID or SEA_DEEP) end
  end
  -- Turbulent exploding spray on top
  for i = 0, 25 do
    setHex(img, 90 + (i%7)*2, 22 - (i%5)*2, SEA_FOAM)
    setHex(img, 95 + (i%6)*2, 20 + (i%4), WHITE)
  end
  -- Boat being launched at steep angle (X: 65 to 135)
  for x = 65, 135 do
    local progress = (x - 65) / 70
    local hy = math.floor(48 - progress * 24)
    for h = 0, 7 do
      setHex(img, x, hy + h, (h == 7) and WOOD_DK or WOOD_MD)
    end
  end
  -- Crew bracing and pulling with all their might
  for i = 1, 6 do
    local cx = 72 + i * 10; local cy = math.floor(45 - ((cx - 65)/70)*24)
    setHex(img, cx, cy-3, AMBER_LOGO); setHex(img, cx, cy-4, WHITE)
  end
  saveSplashFrame(spr, "splash_frame05_cresta_subida")
end

-- F. FRAME 6: EL CLÍMAX DE LA CRESTA Y LA SUSPENSIÓN AL VACÍO (Fotograma Legendario)
do
  local spr, img = createFrame()
  -- Giant Curving Wave Wall (X: 10 to 90, Apex at 88, 26)
  for x = 10, 88 do
    local progress = (x - 10) / 78
    local wy = math.floor(82 - (progress^2.1) * 58)
    for y = wy, 89 do setHex(img, x, y, (y <= wy+3) and SEA_MID or SEA_DEEP) end
  end
  -- Explosive crest foam at apex (88, 24)
  for dx = -6, 6 do for dy = -4, 4 do
    if (dx^2 + dy^2) <= 18 then setHex(img, 88 + dx, 24 + dy, ((dx+dy)%2==0) and WHITE or SEA_FOAM) end
  end end

  -- THE SHIP SUSPENDED IN THE AIR!
  -- Stern (X: 60 to 88) rests on the wave lip
  -- Bow (X: 88 to 142) projects COMPLETELY HORIZONTAL CUTTING THE STORM VOID!
  for x = 60, 142 do
    local hy = (x <= 88) and math.floor(34 - ((x-60)/28)*10) or 24 -- Completely flat horizontal in air!
    for h = 0, 7 do
      setHex(img, x, hy + h, (h == 7) and WOOD_DK or (((x+h)%2==0) and WOOD_HI or WOOD_MD))
    end
  end

  -- 6 Crew Members poised in triumphant synchrony
  for i = 1, 6 do
    local cx = 68 + i * 11
    local cy = (cx <= 88) and math.floor(32 - ((cx-60)/28)*10) or 22
    setHex(img, cx, cy-3, AMBER_LOGO); setHex(img, cx, cy-4, WHITE)
    -- Oars slicing the air/water
    for o = 0, 8 do setHex(img, cx - o, cy + math.floor(o * 0.9), OAR_GOLD) end
  end

  -- Prow Sharp Edge cutting the storm air with radiant glint!
  setHex(img, 143, 24, WHITE); setHex(img, 144, 24, AMBER_HI)
  setHex(img, 143, 23, AMBER_HI); setHex(img, 143, 25, AMBER_HI)

  saveSplashFrame(spr, "splash_frame06_cresta_climax")
end

-- G. FRAME 7: IMPACT FRAME (Flash Blanco Puro de Reset Retinal)
do
  local spr, img = createFrame()
  for y = 0, 89 do for x = 0, 159 do setHex(img, x, y, WHITE) end end
  saveSplashFrame(spr, "splash_frame07_impact_flash")
end

-- H. FRAME 8: FREEZE-SHIFT (Colapso Luma hacia 2 Colores Planos)
do
  local spr, img = createFrame()
  -- The wave and ship collapse into solid high-contrast amber silhouette
  for x = 10, 88 do
    local progress = (x - 10) / 78
    local wy = math.floor(82 - (progress^2.1) * 58)
    for y = wy, 89 do setHex(img, x, y, AMBER_LOGO) end
  end
  for x = 60, 142 do
    local hy = (x <= 88) and math.floor(34 - ((x-60)/28)*10) or 24
    for h = 0, 7 do setHex(img, x, hy + h, AMBER_LOGO) end
  end
  for i = 1, 6 do
    local cx = 68 + i * 11
    local cy = (cx <= 88) and math.floor(32 - ((cx-60)/28)*10) or 22
    setHex(img, cx, cy-3, AMBER_HI); setHex(img, cx, cy-4, AMBER_HI)
    for o = 0, 8 do setHex(img, cx - o, cy + math.floor(o * 0.9), AMBER_LOGO) end
  end
  saveSplashFrame(spr, "splash_frame08_freeze_shift")
end

-- I. FRAME 9: LOGOTIPO FINAL FLAT DESIGN (SAPIENSIA CLAN Consolidado)
do
  local spr, img = createFrame()
  -- Perfect Flat Silhouette in Center (Scaled and clean)
  for x = 20, 78 do
    local progress = (x - 20) / 58
    local wy = math.floor(65 - (progress^1.8) * 42)
    for y = wy, 70 do setHex(img, x, y, AMBER_LOGO) end
  end
  -- Ship suspended on top
  for x = 50, 105 do
    local progress = (x - 50) / 55
    local hy = math.floor(30 - progress * 8)
    for h = 0, 5 do setHex(img, x, hy + h, AMBER_LOGO) end
  end
  -- 6 Crew silhouettes in flat design
  for i = 1, 6 do
    local cx = 56 + i * 7
    local cy = math.floor(28 - ((cx-50)/55)*8)
    setHex(img, cx, cy-2, AMBER_LOGO); setHex(img, cx, cy-3, AMBER_LOGO)
  end
  -- Prow Glint
  setHex(img, 106, 22, AMBER_HI); setHex(img, 107, 22, WHITE)

  -- Flat Base Bar
  for x = 20, 140 do setHex(img, x, 68, AMBER_LOGO); setHex(img, x, 69, AMBER_LOGO) end

  -- Legend: SAPIENSIA CLAN (Clean pixel typography Y: 76 to 84)
  -- S
  for x=42,46 do setHex(img,x,76,AMBER_LOGO); setHex(img,x,79,AMBER_LOGO); setHex(img,x,83,AMBER_LOGO) end
  setHex(img,42,77,AMBER_LOGO); setHex(img,42,78,AMBER_LOGO); setHex(img,46,80,AMBER_LOGO); setHex(img,46,81,AMBER_LOGO); setHex(img,46,82,AMBER_LOGO)
  -- A
  for y=77,83 do setHex(img,49,y,AMBER_LOGO); setHex(img,53,y,AMBER_LOGO) end
  for x=50,52 do setHex(img,x,76,AMBER_LOGO); setHex(img,x,80,AMBER_LOGO) end
  -- P
  for y=76,83 do setHex(img,56,y,AMBER_LOGO) end
  for x=57,60 do setHex(img,x,76,AMBER_LOGO); setHex(img,x,79,AMBER_LOGO) end
  setHex(img,60,77,AMBER_LOGO); setHex(img,60,78,AMBER_LOGO)
  -- I
  for y=76,83 do setHex(img,63,y,AMBER_LOGO) end
  -- E
  for y=76,83 do setHex(img,66,y,AMBER_LOGO) end
  for x=67,70 do setHex(img,x,76,AMBER_LOGO); setHex(img,x,79,AMBER_LOGO); setHex(img,x,83,AMBER_LOGO) end
  -- N
  for y=76,83 do setHex(img,73,y,AMBER_LOGO); setHex(img,77,y,AMBER_LOGO) end
  setHex(img,74,78,AMBER_LOGO); setHex(img,75,79,AMBER_LOGO); setHex(img,76,80,AMBER_LOGO)
  -- S
  for x=80,84 do setHex(img,x,76,AMBER_LOGO); setHex(img,x,79,AMBER_LOGO); setHex(img,x,83,AMBER_LOGO) end
  setHex(img,80,77,AMBER_LOGO); setHex(img,80,78,AMBER_LOGO); setHex(img,84,80,AMBER_LOGO); setHex(img,84,81,AMBER_LOGO); setHex(img,84,82,AMBER_LOGO)
  -- I
  for y=76,83 do setHex(img,87,y,AMBER_LOGO) end
  -- A
  for y=77,83 do setHex(img,90,y,AMBER_LOGO); setHex(img,94,y,AMBER_LOGO) end
  for x=91,93 do setHex(img,x,76,AMBER_LOGO); setHex(img,x,80,AMBER_LOGO) end

  -- CLAN
  -- C
  for y=77,82 do setHex(img,100,y,AMBER_LOGO) end
  for x=101,104 do setHex(img,x,76,AMBER_LOGO); setHex(img,x,83,AMBER_LOGO) end
  -- L
  for y=76,83 do setHex(img,107,y,AMBER_LOGO) end
  for x=108,111 do setHex(img,x,83,AMBER_LOGO) end
  -- A
  for y=77,83 do setHex(img,114,y,AMBER_LOGO); setHex(img,118,y,AMBER_LOGO) end
  for x=115,117 do setHex(img,x,76,AMBER_LOGO); setHex(img,x,80,AMBER_LOGO) end
  -- N
  for y=76,83 do setHex(img,121,y,AMBER_LOGO); setHex(img,125,y,AMBER_LOGO) end
  setHex(img,122,78,AMBER_LOGO); setHex(img,123,79,AMBER_LOGO); setHex(img,124,80,AMBER_LOGO)

  saveSplashFrame(spr, "splash_frame09_isotipo_flat")
end