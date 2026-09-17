local logFile = io.open("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/tilted_wave_log.txt", "w")
logFile:write("Starting Tilted Boat & Organic Curved Wave Isotype generation...\n")

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
-- 1. MASTER ISOTYPE (192x192 px) - TILTED BOAT + ORGANIC CONCAVE WAVE
----------------------------------------------------------------------
do
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

  -- A. THE ORGANIC WAVE SWELL & CONCAVE INNER CURVE
  -- 1. Left rising back swell (X: 12 to 102)
  -- Concave exponential curve rising from 160 up to the crest at Y: 80
  for x = 12, 102 do
    local t = (x - 12) / 90.0
    local topY = math.floor(160 - (t^2.1) * 82) -- reaches 78 at x = 102
    for y = topY, 175 do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- 2. Organic Concave Inner Wave Front (Curving gracefully under crest)
  -- Drops from crest (X: 102, Y: 80) curving inward to X: 86 at Y: 122, then down to base sea level at X: 98, Y: 156
  for cy = 80, 156 do
    local t = (cy - 80) / 76.0
    -- Smooth hollow concave curve
    local curveX = math.floor(102 - math.sin(t * math.pi) * 16 + (t^1.5) * 12)
    for x = curveX, 102 do
      if x >= 12 then setHex(img, x, cy, AMBER_LOGO) end
    end
  end

  -- 3. Right lower sea floor (X: 96 to 180)
  for x = 96, 180 do
    local t = (x - 96) / 84.0
    local seaY = math.floor(156 + t * 12)
    for y = seaY, 175 do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- Flat bottom sea band
  for y = 158, 162 do for x = 12, 180 do setHex(img, x, y, AMBER_LOGO) end end

  -- B. THE TILTED BOAT (Poised ascending at ~18° angle)
  -- Stern: X: 52, Y: 98
  -- Bow/Prow: X: 154, Y: 56
  local boatLength = 102
  local slope = 42.0 / boatLength -- ~0.411 (18° upward tilt)
  local hullThickness = 10

  for x = 52, 154 do
    local t = (x - 52) / boatLength
    local sheerY = math.floor(98 - t * 42) -- Top sheerline ascends from 98 to 56
    local bottomY = sheerY + hullThickness

    -- Sternpost vertical edge
    if x == 52 then
      sheerY = sheerY - 2
      bottomY = bottomY + 2
    end

    -- Prow sharp angle tip
    if x > 146 then
      bottomY = sheerY + hullThickness - (x - 146) * 1.2
    end

    for y = sheerY, math.floor(bottomY) do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- Prow tip radiant glint
  setHex(img, 155, 55, AMBER_HI); setHex(img, 156, 55, WHITE)
  setHex(img, 155, 56, AMBER_HI)

  -- C. SPRAY DROPLETS / FOAM PARTICLES RAINING UNDER PROW
  local sprayParticles = {
    {112, 82, 2}, {120, 84, 3}, {128, 82, 2}, {136, 80, 2}, {144, 78, 2},
    {116, 92, 2}, {124, 94, 3}, {132, 92, 2}, {140, 94, 3},
    {110, 102, 2}, {118, 106, 3}, {126, 108, 2}, {135, 110, 2},
    {114, 118, 2}, {122, 122, 3}, {130, 124, 2},
    {108, 132, 3}, {118, 138, 3}, {128, 142, 2}
  }
  for _, sp in ipairs(sprayParticles) do
    for dx = 0, sp[3] - 1 do
      for dy = 0, 1 do
        setHex(img, sp[1] + dx, sp[2] + dy, AMBER_LOGO)
      end
    end
  end

  -- D. THE 6 CREW MEMBERS (Tilted along the deck, rowing in synchrony)
  local crewX = { 64, 78, 92, 106, 120, 134 }
  for i, cx in ipairs(crewX) do
    local t = (cx - 52) / boatLength
    local deckY = math.floor(98 - t * 42)
    local headY = deckY - 8

    -- Head (Solid 2x2 cluster)
    setHex(img, cx, headY, AMBER_LOGO); setHex(img, cx + 1, headY, AMBER_LOGO)
    setHex(img, cx, headY + 1, AMBER_LOGO); setHex(img, cx + 1, headY + 1, AMBER_LOGO)

    -- Torso (Leaning forward into the stroke)
    setHex(img, cx - 1, headY + 2, AMBER_LOGO); setHex(img, cx, headY + 2, AMBER_LOGO); setHex(img, cx + 1, headY + 2, AMBER_LOGO)
    setHex(img, cx - 1, headY + 3, AMBER_LOGO); setHex(img, cx, headY + 3, AMBER_LOGO); setHex(img, cx + 1, headY + 3, AMBER_LOGO)
    setHex(img, cx - 2, headY + 4, AMBER_LOGO); setHex(img, cx - 1, headY + 4, AMBER_LOGO); setHex(img, cx, headY + 4, AMBER_LOGO)

    -- Straight diagonal oar angled back
    for o = 0, 9 do
      local ox = cx - 2 - o
      local oy = headY + 3 + math.floor(o * 0.95)
      if oy <= 152 then
        setHex(img, ox, oy, AMBER_LOGO)
      end
    end
  end

  -- Save Master Isotype
  sprLogo:saveCopyAs(baseUprota .. "/assets/sprites/ui/logo_sapiensia_clan.png")
  sprLogo:saveCopyAs(baseUprota .. "/assets/sprites/ui/logo_sapiensia_clan.aseprite")
  sprLogo:saveCopyAs(baseUprota .. "/assets/icons/logo_sapiensia_clan_192.png")
  sprLogo:saveCopyAs(baseSapiensia .. "/assets/logo_sapiensia_clan.png")

  -- 512x512 Master Icon
  local spr512 = Sprite(sprLogo)
  spr512:resize(512, 512)
  spr512:saveCopyAs(baseUprota .. "/assets/icons/logo_sapiensia_clan_512.png")
  spr512:close()

  -- 32x32 Favicon
  local spr32 = Sprite(sprLogo)
  spr32:resize(32, 32)
  spr32:saveCopyAs(baseUprota .. "/assets/icons/logo_sapiensia_clan_32.png")
  spr32:close()

  sprLogo:close()
  logFile:write("OK: Master 192x192 Tilted Boat & Curved Wave generated.\n")
end

----------------------------------------------------------------------
-- 2. SPLASH SCREEN FRAMES 08 & 09 (160x90 px)
----------------------------------------------------------------------
local function createFrame()
  local spr = Sprite(160, 90)
  local img = spr.cels[1].image
  for y = 0, 89 do for x = 0, 159 do setHex(img, x, y, BG_DARK) end end
  return spr, img
end

-- Frame 09: Isotipo Flat Design (160x90 px)
do
  local spr, img = createFrame()

  -- 1. Left rising wave swell
  for x = 10, 86 do
    local t = (x - 10) / 76.0
    local topY = math.floor(78 - (t^2.1) * 42) -- reaches 36 at x = 86
    for y = topY, 86 do setHex(img, x, y, AMBER_LOGO) end
  end

  -- 2. Organic concave inner drop
  for cy = 36, 76 do
    local t = (cy - 36) / 40.0
    local curveX = math.floor(86 - math.sin(t * math.pi) * 8 + (t^1.5) * 6)
    for x = curveX, 86 do
      if x >= 10 then setHex(img, x, cy, AMBER_LOGO) end
    end
  end

  -- 3. Right lower sea
  for x = 82, 150 do
    local t = (x - 82) / 68.0
    local seaY = math.floor(76 + t * 6)
    for y = seaY, 86 do setHex(img, x, y, AMBER_LOGO) end
  end
  for y = 78, 80 do for x = 10, 150 do setHex(img, x, y, AMBER_LOGO) end end

  -- 4. Tilted Boat (Ascending ~18°)
  local bLen = 82
  for x = 44, 126 do
    local t = (x - 44) / bLen
    local sheerY = math.floor(48 - t * 21) -- from 48 to 27
    local bottomY = sheerY + 5

    if x == 44 then sheerY = sheerY - 1; bottomY = bottomY + 1 end
    if x > 120 then bottomY = sheerY + 5 - (x - 120) * 0.8 end

    for y = sheerY, math.floor(bottomY) do setHex(img, x, y, AMBER_LOGO) end
  end
  setHex(img, 127, 26, AMBER_HI); setHex(img, 128, 26, WHITE)

  -- 5. Spray droplets
  local sprayPts = {
    {94, 42, 2}, {100, 44, 2}, {106, 42, 2}, {114, 40, 2},
    {96, 50, 2}, {102, 52, 2}, {108, 50, 2}, {116, 52, 2},
    {92, 58, 2}, {98, 62, 2}, {104, 60, 2}, {110, 62, 2},
    {94, 68, 2}, {102, 72, 2}
  }
  for _, sp in ipairs(sprayPts) do
    for dx = 0, sp[3] - 1 do setHex(img, sp[1] + dx, sp[2], AMBER_LOGO) end
  end

  -- 6. Crew
  local crewX = { 52, 64, 76, 88, 100, 112 }
  for i, cx in ipairs(crewX) do
    local t = (cx - 44) / bLen
    local deckY = math.floor(48 - t * 21)
    local headY = deckY - 4
    setHex(img, cx, headY, AMBER_LOGO); setHex(img, cx + 1, headY, AMBER_LOGO)
    setHex(img, cx, headY + 1, AMBER_LOGO); setHex(img, cx + 1, headY + 1, AMBER_LOGO)
    setHex(img, cx - 1, headY + 2, AMBER_LOGO); setHex(img, cx, headY + 2, AMBER_LOGO); setHex(img, cx + 1, headY + 2, AMBER_LOGO)
    for o = 0, 5 do
      local ox = cx - 1 - o
      local oy = headY + 2 + math.floor(o * 0.95)
      if oy <= 76 then setHex(img, ox, oy, AMBER_LOGO) end
    end
  end

  spr:saveCopyAs(baseUprota .. "/assets/sprites/splash_cinematica/splash_frame09_isotipo_flat.png")
  spr:saveCopyAs(baseUprota .. "/assets/sprites/splash_cinematica/splash_frame09_isotipo_flat.aseprite")

  local spr4x = Sprite(spr)
  spr4x:resize(160 * 4, 90 * 4)
  spr4x:saveCopyAs(baseUprota .. "/assets/sprites/previews/preview_splash_frame09_isotipo_flat_4x.png")
  spr4x:close()
  spr:close()
end

-- Frame 08: Freeze Shift
do
  local spr, img = createFrame()

  for x = 10, 86 do
    local t = (x - 10) / 76.0
    local topY = math.floor(78 - (t^2.1) * 42)
    for y = topY, 86 do setHex(img, x, y, AMBER_LOGO) end
  end
  for cy = 36, 76 do
    local t = (cy - 36) / 40.0
    local curveX = math.floor(86 - math.sin(t * math.pi) * 8 + (t^1.5) * 6)
    for x = curveX, 86 do
      if x >= 10 then setHex(img, x, cy, AMBER_LOGO) end
    end
  end
  for x = 82, 150 do
    local t = (x - 82) / 68.0
    local seaY = math.floor(76 + t * 6)
    for y = seaY, 86 do setHex(img, x, y, AMBER_LOGO) end
  end
  for y = 78, 80 do for x = 10, 150 do setHex(img, x, y, AMBER_LOGO) end end

  local bLen = 82
  for x = 44, 126 do
    local t = (x - 44) / bLen
    local sheerY = math.floor(48 - t * 21)
    local bottomY = sheerY + 5
    if x == 44 then sheerY = sheerY - 1; bottomY = bottomY + 1 end
    if x > 120 then bottomY = sheerY + 5 - (x - 120) * 0.8 end
    for y = sheerY, math.floor(bottomY) do setHex(img, x, y, AMBER_LOGO) end
  end
  setHex(img, 127, 26, AMBER_HI); setHex(img, 128, 26, WHITE)

  local sprayPts = {
    {94, 42, 2}, {100, 44, 2}, {106, 42, 2}, {114, 40, 2},
    {96, 50, 2}, {102, 52, 2}, {108, 50, 2}, {116, 52, 2},
    {92, 58, 2}, {98, 62, 2}, {104, 60, 2}, {110, 62, 2},
    {94, 68, 2}, {102, 72, 2}
  }
  for _, sp in ipairs(sprayPts) do
    for dx = 0, sp[3] - 1 do setHex(img, sp[1] + dx, sp[2], AMBER_LOGO) end
  end

  local crewX = { 52, 64, 76, 88, 100, 112 }
  for i, cx in ipairs(crewX) do
    local t = (cx - 44) / bLen
    local deckY = math.floor(48 - t * 21)
    local headY = deckY - 4
    setHex(img, cx, headY, AMBER_LOGO); setHex(img, cx + 1, headY, AMBER_LOGO)
    setHex(img, cx, headY + 1, AMBER_LOGO); setHex(img, cx + 1, headY + 1, AMBER_LOGO)
    setHex(img, cx - 1, headY + 2, AMBER_LOGO); setHex(img, cx, headY + 2, AMBER_LOGO); setHex(img, cx + 1, headY + 2, AMBER_LOGO)
    for o = 0, 5 do
      local ox = cx - 1 - o
      local oy = headY + 2 + math.floor(o * 0.95)
      if oy <= 76 then setHex(img, ox, oy, AMBER_LOGO) end
    end
  end

  -- Golden Scanlines
  for y = 6, 84 do
    if y % 3 == 0 then
      for x = 12, 148 do
        if (x + y) % 4 == 0 then setHex(img, x, y, AMBER_HI, 45) end
      end
    end
  end

  spr:saveCopyAs(baseUprota .. "/assets/sprites/splash_cinematica/splash_frame08_freeze_shift.png")
  spr:saveCopyAs(baseUprota .. "/assets/sprites/splash_cinematica/splash_frame08_freeze_shift.aseprite")

  local spr4x = Sprite(spr)
  spr4x:resize(160 * 4, 90 * 4)
  spr4x:saveCopyAs(baseUprota .. "/assets/sprites/previews/preview_splash_frame08_freeze_shift_4x.png")
  spr4x:close()
  spr:close()
end

logFile:write("SUCCESS: Tilted boat and organic curved wave rendered!\n")
logFile:close()