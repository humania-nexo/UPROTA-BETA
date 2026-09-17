local logFile = io.open("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/cinematica_log.txt", "w")
logFile:write("Fixing Frame 03 (Giro Orbital 45°) continuous ocean and natural swell...\n")

local function hex2rgb(hex)
  hex = tostring(hex):gsub("#","")
  return tonumber("0x"..hex:sub(1,2)) or 0, tonumber("0x"..hex:sub(3,4)) or 0, tonumber("0x"..hex:sub(5,6)) or 0
end

local function setPx(img, x, y, r, g, b, a)
  a = a or 255
  if x >= 0 and x < img.width and y >= 0 and y < img.height then
    img:drawPixel(x, y, app.pixelColor.rgba(r, g, b, a))
  end
end

local function setHex(img, x, y, hex, a)
  local r, g, b = hex2rgb(hex)
  setPx(img, x, y, r, g, b, a or 255)
end

local baseDir = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA"

local BG_DARK    = "#090d16"
local SEA_ABYSS  = "#0f2042" -- Azul noche tormentoso profundo
local SEA_DEEP   = "#1d4ed8" -- Azul marino intenso
local SEA_MID    = "#0284c7" -- Azul oceánico medio
local SEA_LIGHT  = "#38bdf8" -- Cian luminoso vibrante
local SEA_ICE    = "#bae6fd" -- Espuma celeste suave
local WHITE      = "#ffffff" -- Espuma blanca pura

local WOOD_HI    = "#d97706"
local WOOD_MD    = "#b45309"
local WOOD_DK    = "#78350f"
local OAR_GOLD   = "#fde047"
local AMBER_LOGO = "#f59e0b"
local AMBER_HI   = "#fbbf24"
local RAIN_CYAN  = "#38bdf8"
local SKIN_TONE  = "#fed7aa"

local function createFrame()
  local spr = Sprite(160, 90)
  local img = spr.cels[1].image
  for y = 0, 89 do for x = 0, 159 do setHex(img, x, y, BG_DARK) end end
  return spr, img
end

local function saveSplashFrame(spr, name)
  spr:saveCopyAs(baseDir .. "/assets/sprites/splash_cinematica/" .. name .. ".aseprite")
  spr:saveCopyAs(baseDir .. "/assets/sprites/splash_cinematica/" .. name .. ".png")
  local spr4x = Sprite(spr)
  spr4x:resize(160 * 4, 90 * 4)
  spr4x:saveCopyAs(baseDir .. "/assets/sprites/previews/preview_" .. name .. "_4x.png")
  spr4x:close()
  spr:close()
end

local function fillPolygon(img, polyPts, fillColor)
  local dense = {}
  for i = 1, #polyPts - 1 do
    local p1 = polyPts[i]
    local p2 = polyPts[i+1]
    local steps = math.max(math.abs(p2[1]-p1[1]), math.abs(p2[2]-p1[2])) * 4
    for s = 0, steps - 1 do
      local t = s / steps
      local x = p1[1] + (p2[1] - p1[1]) * t
      local y = p1[2] + (p2[2] - p1[2]) * t
      table.insert(dense, {x, y})
    end
  end

  local minY, maxY = 90, 0
  for _, pt in ipairs(dense) do
    if pt[2] < minY then minY = math.floor(pt[2]) end
    if pt[2] > maxY then maxY = math.ceil(pt[2]) end
  end

  for y = minY, maxY do
    local nodes = {}
    local j = #dense
    for i = 1, #dense do
      local p1 = dense[i]
      local p2 = dense[j]
      if (p1[2] < y and p2[2] >= y) or (p2[2] < y and p1[2] >= y) then
        local nx = p1[1] + (y - p1[2]) / (p2[2] - p1[2]) * (p2[1] - p1[1])
        table.insert(nodes, nx)
      end
      j = i
    end
    table.sort(nodes)
    for k = 1, #nodes, 2 do
      if nodes[k+1] then
        local xStart = math.floor(nodes[k] + 0.5)
        local xEnd = math.floor(nodes[k+1] + 0.5)
        for x = xStart, xEnd do
          if x >= 0 and x < 160 and y >= 0 and y < 90 then
            setHex(img, x, y, fillColor)
          end
        end
      end
    end
  end
end

----------------------------------------------------------------------
-- FRAME 01 & 02 (Unchanged)
----------------------------------------------------------------------
do
  local spr, img = createFrame()
  for y = 0, 89 do for x = 0, 159 do
    if (x + y * 2) % 17 == 0 then setHex(img, x, y, SEA_ABYSS) end
    if (x * 3 + y) % 31 == 0 then setHex(img, x, y, SEA_MID, 120) end
  end end
  for y = 28, 62 do
    setHex(img, 56 + math.floor((y-45)^2 * 0.03), y, SEA_ICE, 180)
    setHex(img, 104 - math.floor((y-45)^2 * 0.03), y, SEA_ICE, 180)
  end
  for y = 25, 65 do
    local w = math.floor(10 - math.abs(y - 45) * 0.35)
    for dx = -w, w do
      local x = 80 + dx
      setHex(img, x, y, (dx == -w or dx == w) and WOOD_DK or (((x+y)%2==0) and WOOD_HI or WOOD_MD))
    end
  end
  local rowers = {{75, 34}, {85, 34}, {75, 45}, {85, 45}, {75, 56}, {85, 56}}
  for _, r in ipairs(rowers) do
    setHex(img, r[1], r[2], SKIN_TONE); setHex(img, r[1], r[2]-1, WOOD_DK)
    local dir = (r[1] < 80) and -1 or 1
    for o = 0, 14 do setHex(img, r[1] + o * dir, r[2] + math.floor(o * 0.2), OAR_GOLD) end
    setHex(img, r[1] + 15 * dir, r[2] + 3, WHITE)
  end
  saveSplashFrame(spr, "splash_frame01_cenital")
end

do
  local spr, img = createFrame()
  for y = 0, 89 do for x = 0, 159 do
    local d = math.sqrt((x-80)^2 + (y-45)^2)
    if d > 20 and d < 65 and (x+y)%7 == 0 then setHex(img, x, y, SEA_MID) end
  end end
  for y = 25, 65 do
    local w = math.floor(10 - math.abs(y - 45) * 0.35)
    for dx = -w, w do
      local x = 80 + dx
      setHex(img, x, y, (dx == -w or dx == w) and WOOD_DK or WOOD_MD)
    end
  end
  local rowers = {{75, 34}, {85, 34}, {75, 45}, {85, 45}, {75, 56}, {85, 56}}
  for _, r in ipairs(rowers) do
    setHex(img, r[1], r[2], AMBER_LOGO); setHex(img, r[1], r[2]-1, WHITE)
    local dir = (r[1] < 80) and -1 or 1
    for o = 0, 14 do setHex(img, r[1] + o * dir, r[2] - math.floor(o * 0.4), OAR_GOLD) end
    setHex(img, r[1] + 15 * dir, r[2] - 6, SEA_ICE)
    setHex(img, r[1] + 16 * dir, r[2] - 5, WHITE)
  end
  saveSplashFrame(spr, "splash_frame02_cenital_remando")
end

----------------------------------------------------------------------
-- FRAME 03: GIRO ORBITAL 45° (Mar Completo Continuo & Oleaje Orgánico)
----------------------------------------------------------------------
do
  local spr, img = createFrame()
  -- Storm wind & rain streaks
  for i = 0, 45 do
    local rx = (i * 23) % 160; local ry = (i * 17) % 90
    setHex(img, rx, ry, RAIN_CYAN, 140); setHex(img, rx+2, ry+3, RAIN_CYAN, 100)
  end

  -- Continuous Ocean Sea across ALL 160 pixels (no vertical cuts or missing water)
  for x = 0, 159 do
    -- Smooth oblique perspective sea surface: swell rising on left (Y: 58) swooping across to right (Y: 68)
    local wy = math.floor(66 - math.cos((x / 160.0) * math.pi * 0.8) * 8 + math.sin(x * 0.05) * 3)
    for y = wy, 89 do
      local col = SEA_ABYSS
      if y <= wy + 2 then col = SEA_LIGHT
      elseif y <= wy + 5 then col = SEA_MID
      elseif y <= wy + 12 then col = SEA_DEEP
      end
      setHex(img, x, y, col)
    end
    -- Foam crest accents
    if x % 3 == 0 or x % 7 == 0 then setHex(img, x, wy, WHITE) end
    if x % 5 == 0 then setHex(img, x, wy + 1, SEA_ICE) end
  end

  -- Dynamic oblique current ripples
  for y = 70, 86, 3 do
    for x = 10, 150 do
      if (x + y * 2) % 7 < 3 then setHex(img, x, y, SEA_MID) end
      if (x * 2 + y) % 9 < 2 then setHex(img, x, y + 1, SEA_LIGHT) end
    end
  end

  -- Wooden Boat in 45° Oblique Orbit Perspective (Seated in water, Stern at 45, 58; Bow at 105, 42)
  local sternX = 45; local sternY = 58; local bowX = 105; local bowY = 42
  local bLen = bowX - sternX
  for x = sternX, bowX do
    local t = (x - sternX) / bLen
    local sheerY = math.floor(sternY - t * (sternY - bowY))
    for h = 0, 6 do
      local col = (h == 6) and WOOD_DK or (((x+h)%2==0) and WOOD_HI or WOOD_MD)
      setHex(img, x, sheerY + h, col)
    end
  end

  -- 6 Rowers in oblique perspective with rotation smear lines
  for i = 1, 6 do
    local cx = sternX + 6 + i * 8
    local t = (cx - sternX) / bLen
    local cy = math.floor(sternY - t * (sternY - bowY))
    setHex(img, cx, cy - 3, SKIN_TONE); setHex(img, cx, cy - 4, WOOD_DK)
    setHex(img, cx - 1, cy - 1, AMBER_LOGO); setHex(img, cx, cy - 1, AMBER_LOGO)
    -- Oars in oblique angle
    for o = 0, 6 do
      setHex(img, cx - o, cy + math.floor(o * 0.75), OAR_GOLD)
    end
    -- Motion smear line
    setHex(img, cx - 2, cy + 2, RAIN_CYAN, 120)
  end

  -- Waterline contact foam around hull
  for fx = sternX - 2, bowX + 2 do
    if fx % 2 == 0 then
      local t = math.max(0, math.min(1, (fx - sternX) / bLen))
      local sy = math.floor(sternY - t * (sternY - bowY)) + 5
      setHex(img, fx, sy, WHITE)
    end
  end

  -- Prow Glint
  setHex(img, bowX + 1, bowY, WHITE); setHex(img, bowX, bowY - 1, AMBER_HI)

  saveSplashFrame(spr, "splash_frame03_giro_orbital_45")
end

----------------------------------------------------------------------
-- FRAME 04, 05, 06 (Unchanged Perfected Frames)
----------------------------------------------------------------------
-- Frame 04
do
  local spr, img = createFrame()
  for i = 0, 50 do
    local rx = (i * 19) % 160; local ry = (i * 13) % 90
    setHex(img, rx, ry, RAIN_CYAN, 140)
  end
  for y = 60, 89 do for x = 0, 159 do setHex(img, x, y, SEA_ABYSS) end end
  for x = 0, 159 do
    local wy = math.floor(64 + math.sin(x * 0.04) * 8 - math.cos(x * 0.02) * 3)
    for y = wy, 89 do
      local col = SEA_ABYSS
      if y <= wy + 2 then col = SEA_LIGHT
      elseif y <= wy + 5 then col = SEA_MID
      elseif y <= wy + 11 then col = SEA_DEEP
      end
      setHex(img, x, y, col)
    end
    if x % 4 == 0 or x % 7 == 0 then setHex(img, x, wy, WHITE) end
  end
  for y = 72, 85, 4 do
    for x = 10, 150 do
      if (x + y*3) % 8 < 4 then
        setHex(img, x, y, SEA_MID)
        setHex(img, x, y+1, SEA_LIGHT)
      end
    end
  end
  local sternX = 35; local sternY = 62; local prowX = 112; local prowY = 50
  local bLen = prowX - sternX
  for x = sternX, prowX do
    local t = (x - sternX) / bLen
    local sheerY = math.floor(sternY - t * (sternY - prowY))
    for h = 0, 6 do
      local c = (h == 6) and WOOD_DK or (((x+h)%2==0) and WOOD_HI or WOOD_MD)
      setHex(img, x, sheerY + h, c)
    end
  end
  for i = 1, 6 do
    local cx = sternX + 8 + i * 10
    local t = (cx - sternX) / bLen
    local cy = math.floor(sternY - t * (sternY - prowY))
    setHex(img, cx, cy - 3, SKIN_TONE); setHex(img, cx, cy - 4, WOOD_DK)
    for o = 0, 7 do setHex(img, cx - o, cy + math.floor(o * 0.8), OAR_GOLD) end
  end
  for fx = sternX - 2, prowX + 2 do
    if fx % 2 == 0 then
      local t = math.max(0, math.min(1, (fx - sternX) / bLen))
      local sy = math.floor(sternY - t * (sternY - prowY)) + 5
      setHex(img, fx, sy, WHITE)
    end
  end
  setHex(img, prowX + 1, prowY, WHITE); setHex(img, prowX, prowY - 1, AMBER_HI)
  saveSplashFrame(spr, "splash_frame04_perfil_tormenta")
end

-- Frame 05
do
  local spr, img = createFrame()
  for i = 0, 45 do
    local rx = (i * 23) % 160; local ry = (i * 17) % 90
    setHex(img, rx, ry, RAIN_CYAN, 120)
  end
  local wave05 = {
    {0, 89}, {0, 78}, {12, 74}, {26, 64}, {42, 50}, {58, 36}, {72, 28},
    {84, 25}, {94, 28}, {98, 36}, {92, 44}, {82, 48}, {76, 56}, {78, 68},
    {90, 76}, {110, 82}, {134, 84}, {159, 82}, {159, 89}, {0, 89}
  }
  fillPolygon(img, wave05, SEA_ABYSS)

  local waveDeep05 = {
    {6, 89}, {6, 76}, {16, 72}, {28, 62}, {44, 48}, {58, 34}, {72, 26},
    {84, 24}, {92, 26}, {94, 34}, {88, 40}, {80, 44}, {74, 52}, {74, 64},
    {84, 72}, {104, 78}, {128, 80}, {150, 79}, {159, 80}, {159, 89}, {6, 89}
  }
  fillPolygon(img, waveDeep05, SEA_DEEP)

  local waveMid05 = {
    {14, 89}, {14, 74}, {24, 66}, {38, 54}, {52, 40}, {66, 30}, {78, 25},
    {86, 25}, {90, 28}, {86, 36}, {78, 42}, {72, 50}, {72, 60}, {80, 68},
    {96, 74}, {118, 77}, {140, 77}, {14, 89}
  }
  fillPolygon(img, waveMid05, SEA_MID)

  local waveLight05 = {
    {22, 68}, {34, 58}, {48, 44}, {62, 32}, {74, 26}, {82, 25}, {86, 28},
    {82, 34}, {76, 38}, {68, 46}, {54, 58}, {40, 68}, {22, 68}
  }
  fillPolygon(img, waveLight05, SEA_LIGHT)

  local foamCap05 = {
    {62, 34}, {72, 28}, {84, 24}, {94, 26}, {98, 32}, {96, 38}, {90, 42},
    {84, 38}, {76, 36}, {68, 42}
  }
  fillPolygon(img, foamCap05, SEA_ICE)

  for fx = 68, 98 do
    local t = (fx - 68) / 30.0
    local fy = math.floor(30 - math.sin(t * math.pi) * 6)
    setHex(img, fx, fy, WHITE)
    setHex(img, fx, fy - 1, WHITE)
    if fx % 2 == 0 then setHex(img, fx, fy + 1, WHITE) end
  end

  local sprayPts = {
    {96, 22}, {100, 20}, {104, 24}, {108, 29}, {104, 35},
    {110, 23}, {114, 27}, {106, 41}, {98, 45}, {102, 18}, {108, 19}
  }
  for _, pt in ipairs(sprayPts) do
    setHex(img, pt[1], pt[2], WHITE)
    setHex(img, pt[1]+1, pt[2], WHITE)
    setHex(img, pt[1], pt[2]+1, SEA_LIGHT)
  end

  local sternX = 24; local sternY = 60; local prowX = 104; local prowY = 24
  local bLen = prowX - sternX
  local hullThick = 5

  for x = sternX, prowX do
    local t = (x - sternX) / bLen
    local sheerY = math.floor(sternY - t * (sternY - prowY))
    for h = 0, hullThick do
      local col = (h == hullThick) and WOOD_DK or (((x+h)%2==0) and WOOD_HI or WOOD_MD)
      setHex(img, x, sheerY + h, col)
    end
  end

  for i = 1, 6 do
    local cx = sternX + 8 + i * 10
    local t = (cx - sternX) / bLen
    local cy = math.floor(sternY - t * (sternY - prowY))
    setHex(img, cx, cy - 3, SKIN_TONE); setHex(img, cx, cy - 4, WOOD_DK)
    for o = 0, 6 do setHex(img, cx - o, cy + math.floor(o * 0.9), OAR_GOLD) end
  end

  for fx = 35, 95 do
    if fx % 2 == 0 then
      local t = (fx - sternX) / bLen
      local sy = math.floor(sternY - t * (sternY - prowY)) + hullThick
      setHex(img, fx, sy + 1, WHITE)
    end
  end

  setHex(img, prowX + 1, prowY - 1, WHITE); setHex(img, prowX + 2, prowY - 1, AMBER_HI)
  saveSplashFrame(spr, "splash_frame05_cresta_subida")
end

-- Frame 06
do
  local spr, img = createFrame()
  for i = 0, 40 do
    local rx = (i * 29) % 160; local ry = (i * 19) % 90
    setHex(img, rx, ry, RAIN_CYAN, 100)
  end

  local waveContour06 = {
    {12, 82}, {18, 80}, {26, 75}, {36, 67}, {46, 57}, {56, 47}, {65, 38},
    {74, 30}, {82, 25}, {90, 24}, {98, 26}, {106, 31}, {112, 37}, {110, 44},
    {104, 49}, {96, 51}, {90, 47}, {94, 42}, {92, 38}, {86, 35}, {80, 36},
    {74, 41}, {72, 48}, {74, 57}, {78, 64}, {86, 70}, {98, 75}, {114, 78},
    {130, 79}, {144, 77}, {148, 74}, {148, 82}, {12, 82}
  }
  fillPolygon(img, waveContour06, SEA_ABYSS)

  local waveDeep06 = {
    {16, 80}, {22, 77}, {30, 72}, {40, 63}, {50, 53}, {60, 43}, {70, 34},
    {78, 28}, {86, 26}, {94, 27}, {102, 31}, {108, 37}, {106, 43}, {100, 47},
    {94, 47}, {88, 42}, {82, 39}, {76, 43}, {74, 51}, {76, 59}, {82, 66},
    {94, 72}, {110, 76}, {128, 78}, {144, 76}, {146, 80}, {16, 80}
  }
  fillPolygon(img, waveDeep06, SEA_DEEP)

  local ditherAbyss = {
    {14, 81}, {18, 79}, {24, 75}, {32, 68}, {42, 58}, {52, 48}, {62, 38}, {72, 30},
    {16, 81}, {20, 78}, {28, 72}, {36, 64}, {46, 54}, {56, 44}, {66, 35},
    {15, 80}, {23, 76}, {31, 70}, {41, 60}, {51, 50}, {61, 40}, {71, 31}
  }
  for _, pt in ipairs(ditherAbyss) do
    setHex(img, pt[1], pt[2], SEA_DEEP)
    setHex(img, pt[1]+1, pt[2], SEA_ABYSS)
  end

  local waveMid06 = {
    {26, 75}, {34, 67}, {44, 57}, {54, 47}, {64, 37}, {72, 30}, {80, 27},
    {88, 26}, {94, 28}, {100, 33}, {98, 39}, {92, 42}, {84, 41}, {78, 45},
    {78, 53}, {82, 61}, {92, 67}, {106, 72}, {122, 75}, {138, 75}, {26, 75}
  }
  fillPolygon(img, waveMid06, SEA_MID)

  local ditherMid = {
    {28, 73}, {36, 65}, {46, 55}, {56, 45}, {66, 35}, {74, 29}, {82, 27},
    {30, 72}, {38, 63}, {48, 53}, {58, 43}, {68, 33}, {76, 28}, {84, 27}
  }
  for _, pt in ipairs(ditherMid) do
    setHex(img, pt[1], pt[2], SEA_MID)
    setHex(img, pt[1]+1, pt[2], SEA_DEEP)
  end

  local waveLight06 = {
    {34, 70}, {42, 61}, {52, 51}, {62, 41}, {70, 32}, {78, 28}, {86, 27},
    {90, 29}, {92, 35}, {86, 39}, {80, 44}, {80, 50}, {84, 57}, {92, 63},
    {104, 68}, {118, 71}, {132, 72}, {34, 70}
  }
  fillPolygon(img, waveLight06, SEA_LIGHT)

  local vortexShadow = {
    {76, 45}, {82, 41}, {88, 42}, {92, 46}, {88, 52}, {82, 54}, {78, 50}, {76, 45}
  }
  fillPolygon(img, vortexShadow, SEA_DEEP)

  local vortexCore = {
    {80, 46}, {84, 44}, {88, 45}, {86, 49}, {82, 50}, {80, 46}
  }
  fillPolygon(img, vortexCore, SEA_MID)

  setHex(img, 84, 47, SEA_LIGHT); setHex(img, 85, 47, SEA_LIGHT)
  setHex(img, 83, 48, SEA_ICE)

  local ripples = {
    {88, 73, 6, SEA_LIGHT}, {96, 74, 8, SEA_ICE}, {108, 73, 7, SEA_LIGHT},
    {118, 74, 9, SEA_MID}, {130, 73, 7, SEA_LIGHT}, {140, 74, 6, SEA_ICE},
    {92, 77, 7, SEA_MID}, {102, 76, 9, SEA_LIGHT}, {114, 77, 8, SEA_ICE},
    {126, 76, 9, SEA_LIGHT}, {136, 77, 7, SEA_MID},
    {86, 80, 9, SEA_DEEP}, {98, 79, 11, SEA_MID}, {112, 80, 9, SEA_DEEP},
    {124, 79, 13, SEA_MID}, {140, 80, 7, SEA_DEEP}
  }
  for _, r in ipairs(ripples) do
    for dx = 0, r[3]-1 do setHex(img, r[1]+dx, r[2], r[4]) end
  end

  local foamCapPoly = {
    {74, 30}, {82, 25}, {90, 24}, {98, 26}, {106, 31}, {112, 37}, {112, 44},
    {106, 50}, {98, 52}, {94, 46}, {100, 42}, {104, 36}, {98, 32}, {90, 30}, {78, 33}
  }
  fillPolygon(img, foamCapPoly, SEA_ICE)

  local whiteOuterRidge = {
    {76, 28}, {84, 24}, {90, 23}, {98, 25}, {106, 30}, {112, 36}, {112, 43}, {106, 49}, {98, 51}
  }
  for i = 1, #whiteOuterRidge - 1 do
    local p1 = whiteOuterRidge[i]; local p2 = whiteOuterRidge[i+1]
    local steps = math.max(math.abs(p2[1]-p1[1]), math.abs(p2[2]-p1[2])) * 3
    for s = 0, steps do
      local t = s / steps
      local x = math.floor(p1[1] + (p2[1] - p1[1]) * t + 0.5)
      local y = math.floor(p1[2] + (p2[2] - p1[2]) * t + 0.5)
      setHex(img, x, y, WHITE)
      setHex(img, x, y - 1, WHITE)
      if x >= 90 then setHex(img, x + 1, y, WHITE) end
    end
  end

  local clawFingers = {
    {108, 48, 3, 2}, {104, 52, 3, 2}, {98, 54, 3, 2}, {114, 40, 2, 3},
    {116, 36, 2, 2}, {118, 44, 2, 2}, {112, 54, 2, 2}, {106, 58, 2, 2}
  }
  for _, c in ipairs(clawFingers) do
    for dy = 0, c[4]-1 do for dx = 0, c[3]-1 do setHex(img, c[1]+dx, c[2]+dy, WHITE) end end
  end

  local sprayDroplets = {
    {116, 48}, {120, 42}, {122, 36}, {118, 52}, {114, 58}, {108, 64},
    {100, 68}, {92, 70}, {124, 46}, {120, 56}, {112, 66}, {104, 72},
    {128, 40}, {126, 50}, {116, 62}, {108, 70}
  }
  for _, pt in ipairs(sprayDroplets) do
    setHex(img, pt[1], pt[2], WHITE)
    setHex(img, pt[1]+1, pt[2], WHITE)
    setHex(img, pt[1], pt[2]+1, SEA_LIGHT)
  end

  local sternX = 32; local sternY = 36; local prowX = 126; local prowY = 18
  local bLen = prowX - sternX
  local hullThick = 5

  for x = sternX, prowX do
    local t = (x - sternX) / bLen
    local sheerY = math.floor(sternY - t * (sternY - prowY))
    local bottomY = sheerY + hullThick
    if x == sternX then sheerY = sheerY - 1; bottomY = bottomY + 1 end
    if x > 120 then bottomY = sheerY + hullThick - (x - 120) * 0.9 end
    for y = sheerY, math.floor(bottomY) do
      local col = (y == math.floor(bottomY)) and WOOD_DK or (((x+y)%2==0) and WOOD_HI or WOOD_MD)
      setHex(img, x, y, col)
    end
  end

  local crewX = { 42, 54, 66, 78, 90, 102 }
  for i, cx in ipairs(crewX) do
    local t = (cx - sternX) / bLen
    local deckY = math.floor(sternY - t * (sternY - prowY))
    local headY = deckY - 4

    setHex(img, cx, headY, SKIN_TONE); setHex(img, cx + 1, headY, SKIN_TONE)
    setHex(img, cx, headY - 1, WOOD_DK); setHex(img, cx + 1, headY - 1, WOOD_DK)

    setHex(img, cx - 1, headY + 2, AMBER_LOGO); setHex(img, cx, headY + 2, AMBER_LOGO); setHex(img, cx + 1, headY + 2, AMBER_LOGO)

    for o = 0, 5 do
      local ox = cx - 1 - o
      local oy = headY + 2 + math.floor(o * 0.95)
      if oy <= 78 then setHex(img, ox, oy, OAR_GOLD) end
    end
  end

  for fx = 70, 88 do
    local t = (fx - sternX) / bLen
    local sheerY = math.floor(sternY - t * (sternY - prowY))
    local botY = sheerY + hullThick
    setHex(img, fx, botY + 1, WHITE)
    if fx % 2 == 0 then setHex(img, fx, botY + 2, WHITE) end
  end

  setHex(img, 127, 17, WHITE); setHex(img, 128, 17, AMBER_HI)
  setHex(img, 127, 16, AMBER_HI); setHex(img, 127, 18, AMBER_HI)

  saveSplashFrame(spr, "splash_frame06_cresta_climax")
end

----------------------------------------------------------------------
-- RECOMPILE ANIMATED GIF (Frames 01 to 09)
----------------------------------------------------------------------
do
  local framesList = {
    {name = "splash_frame01_cenital", duration = 0.25},
    {name = "splash_frame02_cenital_remando", duration = 0.25},
    {name = "splash_frame03_giro_orbital_45", duration = 0.22},
    {name = "splash_frame04_perfil_tormenta", duration = 0.25},
    {name = "splash_frame05_cresta_subida", duration = 0.25},
    {name = "splash_frame06_cresta_climax", duration = 0.35},
    {name = "splash_frame07_impact_flash", duration = 0.08},
    {name = "splash_frame08_freeze_shift", duration = 0.30},
    {name = "splash_frame09_isotipo_flat", duration = 1.20}
  }

  local animSpr = Sprite(160, 90)
  for i, fInfo in ipairs(framesList) do
    local srcSpr = Sprite{ fromFile = baseDir .. "/assets/sprites/splash_cinematica/" .. fInfo.name .. ".png" }
    if i == 1 then
      animSpr.cels[1].image:drawImage(srcSpr.cels[1].image, Point(0,0))
      animSpr.frames[1].duration = fInfo.duration
    else
      local fr = animSpr:newEmptyFrame()
      fr.duration = fInfo.duration
      animSpr:newCel(animSpr.layers[1], fr, srcSpr.cels[1].image, Point(0,0))
    end
    srcSpr:close()
  end

  animSpr:saveCopyAs(baseDir .. "/assets/sprites/splash_cinematica/splash_cinematica_anim.gif")
  animSpr:saveCopyAs(baseDir .. "/assets/sprites/splash_cinematica/splash_cinematica_anim.aseprite")

  local anim4x = Sprite(animSpr)
  anim4x:resize(160 * 4, 90 * 4)
  anim4x:saveCopyAs(baseDir .. "/assets/sprites/previews/preview_splash_cinematica_anim_4x.gif")
  anim4x:close()
  animSpr:close()
end

logFile:write("SUCCESS: Frame 03 and GIF successfully regenerated without any cliff artifacts!\n")
logFile:close()