local logFile = io.open("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/wave_test_log.txt", "w")
logFile:write("Starting Pixel Art Wave generation...\n")

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
local baseSapiensia = "c:/Users/Snow/.gemini/antigravity/scratch/sapiensiaclan"

local BG_DARK    = "#090d16"
local AMBER_LOGO = "#f59e0b"
local AMBER_HI   = "#fbbf24"
local WHITE      = "#ffffff"

----------------------------------------------------------------------
-- 1. MASTER ISOTYPE (192x192 px)
----------------------------------------------------------------------
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

-- Array grid for wave construction
local waveGrid = {}
for y = 0, 191 do
  waveGrid[y] = {}
  for x = 0, 191 do
    waveGrid[y][x] = false
  end
end

-- Outer Back Curve: from (16, 162) up to crest apex (92, 54)
local outerPoints = {
  {16, 162}, {24, 160}, {34, 156}, {46, 148}, {58, 136},
  {68, 120}, {76, 102}, {84, 82}, {88, 68}, {92, 54},
  -- Crest overhanging curl to the right:
  {96, 52}, {102, 53}, {108, 56}, {114, 62}, {118, 70}, {120, 80}, {118, 90}, {112, 98}, {106, 102}, {100, 100}
}

-- Inner Barrel Curve (under the curl): from hook tip (100, 100) back inside and down to sea trough
local innerPoints = {
  {100, 100}, {98, 92}, {92, 84}, {82, 84}, {76, 94}, {74, 108},
  {76, 124}, {82, 138}, {94, 148}, {110, 154}, {130, 156}, {150, 152}, {170, 146}, {176, 144}
}

-- Fill solid sea body:
-- 1. Base sea layer from bottom Y: 172 up to sea line
for x = 16, 176 do
  local seaTop = 162
  if x >= 110 then
    local t = (x - 110) / 66.0
    seaTop = math.floor(154 - math.sin(t * math.pi * 0.8) * 10)
  end
  for y = seaTop, 172 do
    waveGrid[y][x] = true
  end
end

-- Rasterize outer curve line into an upper boundary map
local topBoundary = {}

for i = 1, #outerPoints - 1 do
  local p1 = outerPoints[i]
  local p2 = outerPoints[i+1]
  local steps = math.max(math.abs(p2[1]-p1[1]), math.abs(p2[2]-p1[2])) * 4
  for s = 0, steps do
    local t = s / steps
    local x = math.floor(p1[1] + (p2[1] - p1[1]) * t + 0.5)
    local y = math.floor(p1[2] + (p2[2] - p1[2]) * t + 0.5)
    if x >= 0 and x < 192 and y >= 0 and y < 192 then
      if not topBoundary[x] or y < topBoundary[x] then
        topBoundary[x] = y
      end
    end
  end
end

-- Fill swell from topBoundary down to 172 for x from 16 to 92
for x = 16, 92 do
  if topBoundary[x] then
    for y = topBoundary[x], 172 do
      waveGrid[y][x] = true
    end
  end
end

-- 3. The Curling Lip (Crest overhanging hook):
local curlPoly = {
  {82, 84}, {84, 82}, {88, 68}, {92, 54}, {96, 52}, {102, 53}, {108, 56},
  {114, 62}, {118, 70}, {120, 80}, {118, 90}, {112, 98}, {106, 102}, {100, 100},
  {98, 92}, {92, 84}
}

local minCY, maxCY = 192, 0
for _, pt in ipairs(curlPoly) do
  if pt[2] < minCY then minCY = pt[2] end
  if pt[2] > maxCY then maxCY = pt[2] end
end

for y = minCY, maxCY do
  local nodes = {}
  local j = #curlPoly
  for i = 1, #curlPoly do
    local p1 = curlPoly[i]
    local p2 = curlPoly[j]
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
          waveGrid[y][x] = true
        end
      end
    end
  end
end

-- 4. Inner Barrel Wall Cutout (Clean hollow curve)
local innerCurveY = {}
for i = 1, #innerPoints - 1 do
  local p1 = innerPoints[i]
  local p2 = innerPoints[i+1]
  local steps = math.max(math.abs(p2[1]-p1[1]), math.abs(p2[2]-p1[2])) * 4
  for s = 0, steps do
    local t = s / steps
    local x = math.floor(p1[1] + (p2[1] - p1[1]) * t + 0.5)
    local y = math.floor(p1[2] + (p2[2] - p1[2]) * t + 0.5)
    if x >= 0 and x < 192 and y >= 0 and y < 192 then
      if not innerCurveY[x] or y < innerCurveY[x] then
        innerCurveY[x] = y
      end
    end
  end
end

for x = 74, 176 do
  if innerCurveY[x] then
    for y = 50, innerCurveY[x] - 1 do
      -- Only clear if it's below the curl
      if not (x <= 120 and topBoundary[x] and y >= topBoundary[x] and y <= 84 and x < 96) then
        waveGrid[y][x] = false
      end
    end
  end
end

-- Draw the waveGrid onto the sprite image
for y = 0, 191 do
  for x = 0, 191 do
    if waveGrid[y][x] then
      setHex(img, x, y, AMBER_LOGO)
    end
  end
end

-- Draw secondary foam claws / spray droplets
local foamDroplets = {
  {102, 102, 3, 2},
  {96, 104, 3, 2},
  {108, 106, 2, 2},
  {114, 102, 2, 2},
  {122, 92, 2, 2},
  {126, 84, 2, 2},
  {124, 76, 2, 2},
  {128, 98, 2, 2},
  {118, 112, 2, 2},
  {110, 118, 3, 2},
  {124, 116, 2, 2}
}

for _, d in ipairs(foamDroplets) do
  for dy = 0, d[4]-1 do
    for dx = 0, d[3]-1 do
      setHex(img, d[1]+dx, d[2]+dy, AMBER_LOGO)
    end
  end
end

----------------------------------------------------------------------
-- BOAT & CREW (Tilted ~18° Ascending through wave crest)
----------------------------------------------------------------------
local sternX = 46
local sternY = 92
local prowX = 152
local prowY = 54
local hullThick = 9

for x = sternX, prowX do
  local t = (x - sternX) / (prowX - sternX)
  local sheerY = math.floor(sternY - t * (sternY - prowY))
  local bottomY = sheerY + hullThick

  if x == sternX then sheerY = sheerY - 2; bottomY = bottomY + 2 end
  if x > 144 then bottomY = sheerY + hullThick - (x - 144) * 1.1 end

  for y = sheerY, math.floor(bottomY) do
    setHex(img, x, y, AMBER_LOGO)
  end
end

setHex(img, 153, 53, AMBER_HI); setHex(img, 154, 53, WHITE)
setHex(img, 153, 54, AMBER_HI)

local crewX = { 58, 72, 86, 100, 114, 128 }
for i, cx in ipairs(crewX) do
  local t = (cx - sternX) / (prowX - sternX)
  local deckY = math.floor(sternY - t * (sternY - prowY))
  local headY = deckY - 8

  setHex(img, cx, headY, AMBER_LOGO); setHex(img, cx + 1, headY, AMBER_LOGO)
  setHex(img, cx, headY + 1, AMBER_LOGO); setHex(img, cx + 1, headY + 1, AMBER_LOGO)

  setHex(img, cx - 1, headY + 2, AMBER_LOGO); setHex(img, cx, headY + 2, AMBER_LOGO); setHex(img, cx + 1, headY + 2, AMBER_LOGO)
  setHex(img, cx - 1, headY + 3, AMBER_LOGO); setHex(img, cx, headY + 3, AMBER_LOGO); setHex(img, cx + 1, headY + 3, AMBER_LOGO)
  setHex(img, cx - 2, headY + 4, AMBER_LOGO); setHex(img, cx - 1, headY + 4, AMBER_LOGO); setHex(img, cx, headY + 4, AMBER_LOGO)

  for o = 0, 9 do
    local ox = cx - 2 - o
    local oy = headY + 3 + math.floor(o * 0.95)
    if oy <= 165 then
      setHex(img, ox, oy, AMBER_LOGO)
    end
  end
end

sprLogo:saveCopyAs(baseUprota .. "/assets/sprites/previews/preview_organic_test.png")

local spr4x = Sprite(sprLogo)
spr4x:resize(192 * 2, 192 * 2)
spr4x:saveCopyAs(baseUprota .. "/assets/sprites/previews/preview_organic_test_4x.png")
spr4x:close()
sprLogo:close()

logFile:write("OK: Wave test generated.\n")
logFile:close()
