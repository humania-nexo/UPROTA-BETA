local logFile = io.open("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/wave_test_log.txt", "w")
logFile:write("Generating Solid Mighty Hokusai Wave Poly v5...\n")

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

local baseUprota = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA"
local BG_DARK    = "#090d16"
local AMBER_LOGO = "#f59e0b"
local AMBER_HI   = "#fbbf24"
local WHITE      = "#ffffff"

local sprLogo = Sprite(192, 192)
local img = sprLogo.cels[1].image

-- Rounded square dark background
for y = 0, 191 do for x = 0, 191 do
  local isCorner = (x <= 14 and y <= 14 and math.sqrt((x-14)^2+(y-14)^2) > 14) or
                   (x >= 177 and y <= 14 and math.sqrt((x-177)^2+(y-14)^2) > 14) or
                   (x <= 14 and y >= 177 and math.sqrt((x-14)^2+(y-177)^2) > 14) or
                   (x >= 177 and y >= 177 and math.sqrt((x-177)^2+(y-177)^2) > 14)
  if not isCorner then setHex(img, x, y, BG_DARK) end
end end

-- 1. WAVE POLYGON (Mighty Solid Breaker)
local waveContour = {
  {16, 172},
  {22, 168},
  {32, 158},
  {44, 142},
  {54, 122},
  {66, 100},
  {76, 80},
  {88, 64},
  {98, 54},
  {108, 52},
  {118, 56},
  {128, 66},
  {134, 78},
  {132, 92},
  {124, 104},
  {114, 108},
  {108, 100},
  {112, 90},
  {110, 80},
  {102, 74},
  {94, 76},
  {88, 86},
  {86, 102},
  {88, 120},
  {94, 136},
  {104, 148},
  {118, 158},
  {136, 164},
  {154, 166},
  {170, 162},
  {176, 156},
  {176, 172},
  {16, 172}
}

local densePoly = {}
for i = 1, #waveContour - 1 do
  local p1 = waveContour[i]
  local p2 = waveContour[i+1]
  local steps = math.max(math.abs(p2[1]-p1[1]), math.abs(p2[2]-p1[2])) * 4
  for s = 0, steps - 1 do
    local t = s / steps
    local x = p1[1] + (p2[1] - p1[1]) * t
    local y = p1[2] + (p2[2] - p1[2]) * t
    table.insert(densePoly, {x, y})
  end
end

local minY, maxY = 192, 0
for _, pt in ipairs(densePoly) do
  if pt[2] < minY then minY = math.floor(pt[2]) end
  if pt[2] > maxY then maxY = math.ceil(pt[2]) end
end

for y = minY, maxY do
  local nodes = {}
  local j = #densePoly
  for i = 1, #densePoly do
    local p1 = densePoly[i]
    local p2 = densePoly[j]
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
        if x >= 0 and x < 192 and y >= 0 and y < 192 then
          setHex(img, x, y, AMBER_LOGO)
        end
      end
    end
  end
end

-- Distinctive Hokusai foam claws & spray droplets
local foamClaws = {
  -- Secondary claw on crest
  {126, 108, 3, 2},
  {130, 102, 2, 3},
  {118, 114, 3, 2},
  {110, 118, 3, 2},
  -- Floating spray droplets
  {136, 92, 2, 2},
  {140, 84, 2, 2},
  {138, 102, 2, 2},
  {132, 114, 2, 2},
  {126, 124, 2, 2},
  {118, 132, 3, 2},
  {108, 138, 2, 2},
  {100, 144, 2, 2},
  {134, 122, 2, 2}
}

for _, d in ipairs(foamClaws) do
  for dy = 0, d[4]-1 do
    for dx = 0, d[3]-1 do
      setHex(img, d[1]+dx, d[2]+dy, AMBER_LOGO)
    end
  end
end

----------------------------------------------------------------------
-- 2. BOAT & CREW (Ascending ~18°, Stern at 38, 76; Prow at 150, 38)
----------------------------------------------------------------------
local sternX = 38
local sternY = 76
local prowX = 150
local prowY = 38
local bLen = prowX - sternX
local hullThick = 8

-- Negative space outline around boat hull and crew
for x = sternX - 3, prowX + 3 do
  local t = math.max(0, math.min(1, (x - sternX) / bLen))
  local sheerY = math.floor(sternY - t * (sternY - prowY))
  for y = sheerY - 10, sheerY + hullThick + 2 do
    if x >= 0 and x < 192 and y >= 0 and y < 192 then
      if y >= sheerY - 1 and y <= sheerY + hullThick + 2 then
        setHex(img, x, y, BG_DARK)
      end
    end
  end
end

-- Wooden Boat Hull
for x = sternX, prowX do
  local t = (x - sternX) / bLen
  local sheerY = math.floor(sternY - t * (sternY - prowY))
  local bottomY = sheerY + hullThick

  if x == sternX then sheerY = sheerY - 2; bottomY = bottomY + 2 end
  if x > 142 then bottomY = sheerY + hullThick - (x - 142) * 1.1 end

  for y = sheerY, math.floor(bottomY) do
    setHex(img, x, y, AMBER_LOGO)
  end
end

-- Prow Glint
setHex(img, 151, 37, AMBER_HI); setHex(img, 152, 37, WHITE)
setHex(img, 151, 38, AMBER_HI)

-- 6 Crew Members
local crewX = { 50, 64, 78, 92, 106, 120 }
for i, cx in ipairs(crewX) do
  local t = (cx - sternX) / bLen
  local deckY = math.floor(sternY - t * (sternY - prowY))
  local headY = deckY - 8

  -- Head
  setHex(img, cx, headY, AMBER_LOGO); setHex(img, cx + 1, headY, AMBER_LOGO)
  setHex(img, cx, headY + 1, AMBER_LOGO); setHex(img, cx + 1, headY + 1, AMBER_LOGO)

  -- Torso
  setHex(img, cx - 1, headY + 2, AMBER_LOGO); setHex(img, cx, headY + 2, AMBER_LOGO); setHex(img, cx + 1, headY + 2, AMBER_LOGO)
  setHex(img, cx - 1, headY + 3, AMBER_LOGO); setHex(img, cx, headY + 3, AMBER_LOGO); setHex(img, cx + 1, headY + 3, AMBER_LOGO)
  setHex(img, cx - 2, headY + 4, AMBER_LOGO); setHex(img, cx - 1, headY + 4, AMBER_LOGO); setHex(img, cx, headY + 4, AMBER_LOGO)

  -- Oar
  for o = 0, 9 do
    local ox = cx - 2 - o
    local oy = headY + 3 + math.floor(o * 0.95)
    if oy <= 165 then
      setHex(img, ox, oy, AMBER_LOGO)
    end
  end
end

-- Foam crest contact at boat keel
for fx = 84, 104 do
  local t = (fx - sternX) / bLen
  local sheerY = math.floor(sternY - t * (sternY - prowY))
  local botY = sheerY + hullThick
  setHex(img, fx, botY + 1, AMBER_HI)
  if fx % 2 == 0 then setHex(img, fx, botY + 2, WHITE) end
end

sprLogo:saveCopyAs(baseUprota .. "/assets/sprites/previews/preview_poly_v5.png")

local spr4x = Sprite(sprLogo)
spr4x:resize(192 * 2, 192 * 2)
spr4x:saveCopyAs(baseUprota .. "/assets/sprites/previews/preview_poly_v5_4x.png")
spr4x:close()
sprLogo:close()

logFile:write("OK: Poly v5 generated.\n")
logFile:close()
