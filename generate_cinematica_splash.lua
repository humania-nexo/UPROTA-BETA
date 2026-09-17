local logFile = io.open("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/cinematica_log.txt", "w")
logFile:write("Perfecting Cinematic Sequence and compiling full GIF...\n")

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
local SEA_DEEP   = "#0a192f"
local SEA_MID    = "#0284c7"
local SEA_LIGHT  = "#38bdf8"
local SEA_FOAM   = "#e0f2fe"
local WOOD_HI    = "#d97706"
local WOOD_MD    = "#b45309"
local WOOD_DK    = "#78350f"
local OAR_GOLD   = "#fde047"
local AMBER_LOGO = "#f59e0b"
local AMBER_HI   = "#fbbf24"
local WHITE      = "#ffffff"
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
-- FRAME 01: PLANO CENITAL
----------------------------------------------------------------------
do
  local spr, img = createFrame()
  for y = 0, 89 do for x = 0, 159 do
    if (x + y * 2) % 17 == 0 then setHex(img, x, y, SEA_DEEP) end
    if (x * 3 + y) % 31 == 0 then setHex(img, x, y, SEA_MID, 120) end
  end end
  for y = 28, 62 do
    setHex(img, 56 + math.floor((y-45)^2 * 0.03), y, SEA_FOAM, 180)
    setHex(img, 104 - math.floor((y-45)^2 * 0.03), y, SEA_FOAM, 180)
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

----------------------------------------------------------------------
-- FRAME 02: PLANO CENITAL REMANDO
----------------------------------------------------------------------
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
    setHex(img, r[1] + 15 * dir, r[2] - 6, SEA_FOAM)
    setHex(img, r[1] + 16 * dir, r[2] - 5, WHITE)
  end
  saveSplashFrame(spr, "splash_frame02_cenital_remando")
end

----------------------------------------------------------------------
-- FRAME 03: GIRO ORBITAL 45°
----------------------------------------------------------------------
do
  local spr, img = createFrame()
  for i = 0, 40 do
    local rx = (i * 23) % 160; local ry = (i * 17) % 90
    setHex(img, rx, ry, RAIN_CYAN, 160); setHex(img, rx+2, ry+3, RAIN_CYAN, 120)
  end
  for x = 0, 70 do
    local wy = math.floor(75 - x * 0.4)
    for y = wy, 89 do setHex(img, x, y, SEA_DEEP) end
    setHex(img, x, wy, SEA_FOAM)
  end
  for i = 0, 45 do
    local bx = 60 + i; local by = 55 - math.floor(i * 0.35)
    for h = 0, 8 do setHex(img, bx, by + h, (h == 0 or h == 8) and WOOD_DK or WOOD_MD) end
  end
  for i = 1, 6 do
    local cx = 65 + i * 7; local cy = 52 - math.floor((i * 7) * 0.35)
    setHex(img, cx, cy, AMBER_LOGO); setHex(img, cx, cy-1, WHITE)
    setHex(img, cx-2, cy+3, RAIN_CYAN, 140)
  end
  saveSplashFrame(spr, "splash_frame03_giro_orbital_45")
end

----------------------------------------------------------------------
-- FRAME 04: PERFIL TORMENTA (Barco en el Agua, Oleaje Dinámico)
----------------------------------------------------------------------
do
  local spr, img = createFrame()
  for i = 0, 50 do
    local rx = (i * 19) % 160; local ry = (i * 13) % 90
    setHex(img, rx, ry, RAIN_CYAN, 140)
  end

  -- Dynamic swell
  for x = 0, 159 do
    local wy = math.floor(64 + math.sin(x * 0.04) * 8 - math.cos(x * 0.02) * 3)
    for y = wy, 89 do
      local col = (y <= wy + 2) and SEA_LIGHT or ((y <= wy + 6) and SEA_MID or SEA_DEEP)
      setHex(img, x, y, col)
    end
    if x % 3 == 0 then setHex(img, x, wy, SEA_FOAM) end
  end

  -- Boat properly seated in the water (Stern at 35, 62; Prow at 112, 50)
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

  -- Foam contact at waterline
  for fx = sternX - 2, prowX + 2 do
    if fx % 2 == 0 then
      local t = math.max(0, math.min(1, (fx - sternX) / bLen))
      local sy = math.floor(sternY - t * (sternY - prowY)) + 5
      setHex(img, fx, sy, SEA_FOAM)
    end
  end

  setHex(img, prowX + 1, prowY, WHITE); setHex(img, prowX, prowY - 1, AMBER_HI)
  saveSplashFrame(spr, "splash_frame04_perfil_tormenta")
end

----------------------------------------------------------------------
-- FRAME 05: CRESTA SUBIDA (Ola Gigante Creciendo & Barco Escalando la Pendiente)
----------------------------------------------------------------------
do
  local spr, img = createFrame()
  for i = 0, 45 do
    local rx = (i * 23) % 160; local ry = (i * 17) % 90
    setHex(img, rx, ry, RAIN_CYAN, 120)
  end

  -- Massive breaker swell forming from left
  local wave05 = {
    {0, 89},
    {0, 78},
    {12, 74},
    {26, 64},
    {42, 50},
    {58, 36},
    {72, 28},
    {84, 25},
    {94, 28},
    {98, 36},
    {92, 44},
    {82, 48},
    {76, 56},
    {78, 68},
    {90, 76},
    {110, 82},
    {134, 84},
    {159, 82},
    {159, 89},
    {0, 89}
  }
  fillPolygon(img, wave05, SEA_DEEP)

  local waveInner05 = {
    {0, 89},
    {0, 78},
    {12, 74},
    {26, 64},
    {42, 50},
    {58, 36},
    {72, 28},
    {84, 25},
    {94, 28},
    {96, 34},
    {88, 38},
    {80, 42},
    {74, 50},
    {74, 62},
    {84, 70},
    {102, 76},
    {124, 78},
    {148, 77},
    {159, 78},
    {159, 89},
    {0, 89}
  }
  fillPolygon(img, waveInner05, SEA_MID)

  -- Foam ridge along upper wave crest
  local topRidge05 = {
    {12, 74}, {26, 64}, {42, 50}, {58, 36}, {72, 28}, {84, 25}, {94, 28}, {98, 36}
  }
  for i = 1, #topRidge05 - 1 do
    local p1 = topRidge05[i]
    local p2 = topRidge05[i+1]
    local steps = math.max(math.abs(p2[1]-p1[1]), math.abs(p2[2]-p1[2])) * 2
    for s = 0, steps do
      local t = s / steps
      local x = math.floor(p1[1] + (p2[1] - p1[1]) * t)
      local y = math.floor(p1[2] + (p2[2] - p1[2]) * t)
      setHex(img, x, y, SEA_LIGHT)
      if (x + y) % 2 == 0 then setHex(img, x, y - 1, SEA_FOAM) end
      if x >= 65 and x % 3 == 0 then setHex(img, x, y - 2, WHITE) end
    end
  end

  -- Spray droplets
  local sprayPts = {
    {96, 24}, {100, 23}, {104, 27}, {108, 32}, {104, 38},
    {110, 26}, {114, 30}, {106, 44}, {98, 48}
  }
  for _, pt in ipairs(sprayPts) do
    setHex(img, pt[1], pt[2], SEA_FOAM)
    setHex(img, pt[1]+1, pt[2], WHITE)
  end

  -- Boat climbing up the wave slope (~24° ascent, Stern at 24, 60; Prow at 104, 24)
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

  -- Crew
  for i = 1, 6 do
    local cx = sternX + 8 + i * 10
    local t = (cx - sternX) / bLen
    local cy = math.floor(sternY - t * (sternY - prowY))
    setHex(img, cx, cy - 3, SKIN_TONE); setHex(img, cx, cy - 4, WOOD_DK)
    for o = 0, 6 do setHex(img, cx - o, cy + math.floor(o * 0.9), OAR_GOLD) end
  end

  -- Contact foam under boat hull
  for fx = 35, 95 do
    if fx % 2 == 0 then
      local t = (fx - sternX) / bLen
      local sy = math.floor(sternY - t * (sternY - prowY)) + hullThick
      setHex(img, fx, sy + 1, SEA_FOAM)
    end
  end

  setHex(img, prowX + 1, prowY - 1, WHITE); setHex(img, prowX + 2, prowY - 1, AMBER_HI)
  saveSplashFrame(spr, "splash_frame05_cresta_subida")
end

----------------------------------------------------------------------
-- FRAME 06: CRESTA CLÍMAX (La Gran Ola Hokusai A Todo Color & Suspensión)
----------------------------------------------------------------------
do
  local spr, img = createFrame()
  for i = 0, 40 do
    local rx = (i * 29) % 160; local ry = (i * 19) % 90
    setHex(img, rx, ry, RAIN_CYAN, 100)
  end

  -- 1. Full-Color Hokusai Wave Contour (Base Navy Body)
  local waveContour06 = {
    {12, 82},
    {18, 80},
    {26, 75},
    {36, 67},
    {46, 57},
    {56, 47},
    {65, 38},
    {74, 30},
    {82, 25},
    {90, 24},
    {98, 26},
    {106, 31},
    {112, 37},
    {110, 44},
    {104, 49},
    {96, 51},
    {90, 47},
    {94, 42},
    {92, 38},
    {86, 35},
    {80, 36},
    {74, 41},
    {72, 48},
    {74, 57},
    {78, 64},
    {86, 70},
    {98, 75},
    {114, 78},
    {130, 79},
    {144, 77},
    {148, 74},
    {148, 82},
    {12, 82}
  }
  fillPolygon(img, waveContour06, SEA_DEEP)

  -- 2. Surging Midtone Cyan Core Layer
  local waveCyan06 = {
    {16, 80},
    {26, 74},
    {36, 65},
    {46, 55},
    {56, 45},
    {65, 36},
    {74, 28},
    {82, 24},
    {90, 23},
    {98, 25},
    {106, 30},
    {111, 36},
    {108, 43},
    {102, 47},
    {95, 48},
    {88, 44},
    {84, 38},
    {78, 42},
    {75, 48},
    {76, 56},
    {80, 63},
    {90, 68},
    {104, 73},
    {120, 76},
    {136, 77},
    {144, 75},
    {144, 80},
    {16, 80}
  }
  fillPolygon(img, waveCyan06, SEA_MID)

  -- 3. Crisp Foam Highlight along Top Ridge only
  local topRidge06 = {
    {18, 80}, {26, 75}, {36, 67}, {46, 57}, {56, 47}, {65, 38}, {74, 30},
    {82, 25}, {90, 24}, {98, 26}, {106, 31}, {112, 37}, {110, 44}, {104, 49}
  }
  for i = 1, #topRidge06 - 1 do
    local p1 = topRidge06[i]
    local p2 = topRidge06[i+1]
    local steps = math.max(math.abs(p2[1]-p1[1]), math.abs(p2[2]-p1[2])) * 2
    for s = 0, steps do
      local t = s / steps
      local x = math.floor(p1[1] + (p2[1] - p1[1]) * t)
      local y = math.floor(p1[2] + (p2[2] - p1[2]) * t)
      setHex(img, x, y, SEA_LIGHT)
      if (x + y) % 2 == 0 then setHex(img, x, y - 1, SEA_FOAM) end
      if x >= 75 and x % 3 == 0 then setHex(img, x, y - 2, WHITE) end
    end
  end

  -- 4. Foam Claw Tips & Spray Droplets
  local foamPts06 = {
    {106, 51}, {110, 48}, {100, 54}, {94, 56}, {114, 43}, {118, 40},
    {116, 48}, {112, 54}, {108, 59}, {100, 63}, {92, 66}, {122, 38},
    {120, 46}, {115, 52}, {104, 61}
  }
  for _, pt in ipairs(foamPts06) do
    setHex(img, pt[1], pt[2], SEA_FOAM)
    setHex(img, pt[1]+1, pt[2], WHITE)
    setHex(img, pt[1], pt[2]+1, SEA_LIGHT)
  end

  -- 5. The Wooden Ship Riding the Crest (~18° Tilt)
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

  -- 6. 6 Crew Members Rowing with Golden Oars
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

  -- Contact foam at boat keel
  for fx = 70, 88 do
    local t = (fx - sternX) / bLen
    local sheerY = math.floor(sternY - t * (sternY - prowY))
    local botY = sheerY + hullThick
    setHex(img, fx, botY + 1, SEA_FOAM)
    if fx % 2 == 0 then setHex(img, fx, botY + 2, WHITE) end
  end

  -- Radiant courage glint on prow
  setHex(img, 127, 17, WHITE); setHex(img, 128, 17, AMBER_HI)
  setHex(img, 127, 16, AMBER_HI); setHex(img, 127, 18, AMBER_HI)

  saveSplashFrame(spr, "splash_frame06_cresta_climax")
end

----------------------------------------------------------------------
-- COMPILE ANIMATED GIF (Frames 01 to 09)
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

logFile:write("SUCCESS: Full Animated GIF compiled successfully!\n")
logFile:close()