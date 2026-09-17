local logFile = io.open("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/salmon_log.txt", "w")
logFile:write("Starting El Salto del Salmon Artwork generation...\n")

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

local W = 240
local H = 135

-- Color Palette
local SKY_DARK    = "#07090e"
local GORGE_DARK  = "#0f172a"
local CLIFF_MID   = "#1e293b"
local CLIFF_HI    = "#334155"
local WATER_DEEP  = "#082f49"
local WATER_MID   = "#0284c7"
local WATER_FOAM  = "#38bdf8"
local WATER_MIST  = "#bae6fd"
local WHITE       = "#ffffff"

local SALMON_DARK = "#78350f"
local SALMON_MID  = "#d97706"
local SALMON_AMB  = "#f59e0b"
local SALMON_GOLD = "#fbbf24"
local SALMON_HOT  = "#fef08a"
local SALMON_FIN  = "#b45309"

local spr = Sprite(W, H)
local img = spr.cels[1].image

-- 1. BACKGROUND: Deep Canyon / Midnight Sky
for y = 0, H - 1 do for x = 0, W - 1 do
  setHex(img, x, y, SKY_DARK)
end end

-- Distant Cliff Rocks (Left & Right framing)
for y = 0, 110 do
  -- Left Rock Silhouette
  local leftLimit = math.floor(35 + math.sin(y * 0.1) * 6 - (y * 0.15))
  for x = 0, leftLimit do
    local col = (x > leftLimit - 3) and CLIFF_HI or ((x > leftLimit - 8) and CLIFF_MID or GORGE_DARK)
    setHex(img, x, y, col)
  end
  -- Right Rock Silhouette
  local rightLimit = math.floor(W - 40 + math.cos(y * 0.08) * 8 + (y * 0.1))
  for x = rightLimit, W - 1 do
    local col = (x < rightLimit + 3) and CLIFF_HI or ((x < rightLimit + 8) and CLIFF_MID or GORGE_DARK)
    setHex(img, x, y, col)
  end
end

-- 2. THE ROARING WATERFALL (X: 50 to 190)
for y = 10, 100 do
  for x = 50, 190 do
    local noise = (x * 7 + y * 13) % 17
    local isPlunge = (x > 80 and x < 160)
    if isPlunge then
      if noise < 4 then
        setHex(img, x, y, WATER_MID, 160)
      elseif noise < 8 then
        setHex(img, x, y, WATER_FOAM, 200)
      elseif noise < 11 then
        setHex(img, x, y, WHITE, 220)
      else
        setHex(img, x, y, WATER_DEEP, 180)
      end
    else
      if noise < 5 then setHex(img, x, y, WATER_DEEP, 120) end
      if (x + y * 3) % 23 == 0 then setHex(img, x, y, WATER_FOAM, 100) end
    end
  end
end

-- 3. CHURNING RIVER RAPIDS & FOAM AT BOTTOM (Y: 100 to 134)
for y = 100, H - 1 do
  for x = 0, W - 1 do
    local wave = math.sin((x * 0.15) + (y * 0.4)) * 3
    if y + wave > 105 then
      setHex(img, x, y, WATER_DEEP)
      if (x + y) % 3 == 0 then setHex(img, x, y, WATER_MID) end
      if (x * 2 + y * 5) % 11 < 3 then setHex(img, x, y, WATER_FOAM, 220) end
      if (x * 3 + y * 7) % 19 == 0 then setHex(img, x, y, WHITE) end
    end
  end
end

-- 4. GOLDEN LIGHT RAYS FROM TOP-LEFT (The Future / The Summit Beacon)
for r = 0, 12 do
  local startX = 30 + r * 6
  for step = 0, 110 do
    local rx = math.floor(startX + step * 0.9)
    local ry = math.floor(step * 0.8)
    if rx < W and ry < H and (rx + ry) % 3 == 0 then
      setHex(img, rx, ry, SALMON_GOLD, 30)
    end
  end
end

-- 5. THE HERO SALMON LEAPING UPWARD (Parabolic Arc: from X: 165, Y: 100 to X: 95, Y: 42)
-- Body center anchor (Apex at X: 120, Y: 52)
local salmonPixels = {}

-- Draw aerodynamic curved salmon body
for t = -24, 24 do
  -- Progress from tail (t = 24) to head (t = -24)
  local prog = t / 24.0 -- -1 to 1
  -- Curve formula
  local cx = math.floor(120 + t * 1.5)
  local cy = math.floor(54 + (prog^2) * 14 - t * 0.3)
  local thickness = math.floor(7 * (1 - prog^2)^0.6 + 1.2)

  for dy = -thickness, thickness do
    local px = cx
    local py = cy + dy
    -- Dorsal (top) dark/amber, Mid body glowing gold, Belly sunlit pale
    local col = SALMON_AMB
    if dy < -thickness + 2 then
      col = SALMON_DARK
    elseif dy < 0 then
      col = SALMON_MID
    elseif dy == 0 then
      col = SALMON_AMB
    elseif dy <= thickness - 2 then
      col = SALMON_GOLD
    else
      col = SALMON_HOT
    end
    setHex(img, px, py, col)
  end
end

-- Salmon Head, Snout & Eye (X: 80 to 96, Y: 42 to 50)
for hx = 80, 96 do
  local hyBase = math.floor(48 + (hx - 80) * 0.4)
  setHex(img, hx, hyBase - 1, SALMON_MID)
  setHex(img, hx, hyBase, SALMON_AMB)
  setHex(img, hx, hyBase + 1, SALMON_GOLD)
end
-- Eye of determination
setHex(img, 88, 47, SALMON_DARK)
setHex(img, 89, 47, WHITE) -- Sparkle
setHex(img, 88, 48, SALMON_DARK)

-- Dorsal Fin (Top arch X: 110 to 128, Y: 43 to 48)
for fx = 110, 128 do
  local finH = math.floor(4 * math.sin((fx - 110) / 18.0 * math.pi))
  for fy = 0, finH do
    local py = 48 - fy
    setHex(img, fx, py, (fy == finH) and SALMON_GOLD or SALMON_FIN)
  end
end

-- Pectoral Fin (X: 98 to 110, Y: 56 to 62)
for px = 98, 110 do
  local py = math.floor(56 + (px - 98) * 0.5)
  setHex(img, px, py, SALMON_FIN)
  setHex(img, px, py + 1, SALMON_AMB)
end

-- Powerful Tail & Caudal Fin (X: 148 to 166, Y: 68 to 82)
for tx = 148, 166 do
  local span = math.floor((tx - 148) * 0.7)
  for ty = -span, span do
    local py = 72 + ty
    setHex(img, tx, py, (math.abs(ty) == span) and SALMON_GOLD or SALMON_FIN)
  end
end

-- 6. WATER SPLASH, DROPLETS & MIST TRAILING THE LEAP
-- Burst at tail entry point (X: 160 to 180, Y: 85 to 110)
for sx = 150, 185 do
  for sy = 80, 115 do
    local d = math.sqrt((sx - 165)^2 + (sy - 95)^2)
    if d < 18 and (sx + sy) % 3 == 0 then
      setHex(img, sx, sy, WHITE, 220)
    elseif d < 28 and (sx * 3 + sy * 5) % 7 == 0 then
      setHex(img, sx, sy, WATER_FOAM, 180)
    end
  end
end

-- Flying water droplets along the leap arc
local dropCoords = {
  {140, 68}, {145, 62}, {135, 72}, {130, 66}, {125, 75},
  {115, 62}, {108, 68}, {102, 58}, {95, 64}, {88, 56},
  {152, 60}, {158, 66}, {162, 74}, {142, 54}, {128, 48}
}
for _, pt in ipairs(dropCoords) do
  setHex(img, pt[1], pt[2], WHITE)
  setHex(img, pt[1] + 1, pt[2], WATER_FOAM, 200)
  setHex(img, pt[1], pt[2] + 1, WATER_MIST, 160)
end

-- 7. ORNAMENTAL BORDER / SUBTLE PIXEL ART FRAME (Dark Gold & Slate)
for x = 0, W - 1 do
  setHex(img, x, 0, SALMON_AMB)
  setHex(img, x, 1, GORGE_DARK)
  setHex(img, x, H - 2, GORGE_DARK)
  setHex(img, x, H - 1, SALMON_AMB)
end
for y = 0, H - 1 do
  setHex(img, 0, y, SALMON_AMB)
  setHex(img, 1, y, GORGE_DARK)
  setHex(img, W - 2, y, GORGE_DARK)
  setHex(img, W - 1, y, SALMON_AMB)
end
-- Corner Accents
setHex(img, 2, 2, SALMON_GOLD); setHex(img, 3, 2, SALMON_GOLD); setHex(img, 2, 3, SALMON_GOLD)
setHex(img, W - 3, 2, SALMON_GOLD); setHex(img, W - 4, 2, SALMON_GOLD); setHex(img, W - 3, 3, SALMON_GOLD)
setHex(img, 2, H - 3, SALMON_GOLD); setHex(img, 3, H - 3, SALMON_GOLD); setHex(img, 2, H - 4, SALMON_GOLD)
setHex(img, W - 3, H - 3, SALMON_GOLD); setHex(img, W - 4, H - 3, SALMON_GOLD); setHex(img, W - 3, H - 4, SALMON_GOLD)

-- Save in UPROTA repository
spr:saveCopyAs(baseUprota .. "/assets/sprites/ilustraciones/ilustracion_salto_salmon.png")
spr:saveCopyAs(baseUprota .. "/assets/sprites/ilustraciones/ilustracion_salto_salmon.aseprite")

-- Save copy in sapiensiaclan repository for direct web embedding
spr:saveCopyAs(baseSapiensia .. "/assets/art/ilustracion_salto_salmon.png")
spr:saveCopyAs(baseSapiensia .. "/assets/art/ilustracion_salto_salmon.aseprite")

-- Export High-Res 4x Previews (960x540 px)
local spr4x = Sprite(spr)
spr4x:resize(W * 4, H * 4)
spr4x:saveCopyAs(baseUprota .. "/assets/sprites/previews/preview_salto_salmon_4x.png")
spr4x:saveCopyAs(baseSapiensia .. "/assets/art/preview_salto_salmon_4x.png")
spr4x:close()

spr:close()
logFile:write("SUCCESS: El Salto del Salmon artwork fully rendered!\n")
logFile:close()