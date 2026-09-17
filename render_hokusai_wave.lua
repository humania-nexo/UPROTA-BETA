local logFile = io.open("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/hokusai_wave_log.txt", "w")
logFile:write("Starting Authentic Hokusai Curling Wave & Boat generation...\n")

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
-- 1. MASTER ISOTYPE (192x192 px) - AUTHENTIC HOKUSAI SPIRAL WAVE + BOAT
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

  -- A. THE AUTHENTIC HOKUSAI SPIRAL WAVE
  -- 1. Main Swell Body (Rising from left X: 16 up to Crest apex X: 96, Y: 68)
  for x = 16, 96 do
    local t = (x - 16) / 80.0
    local topY = math.floor(158 - (t^2.2) * 90) -- rises from 158 to 68
    for y = topY, 175 do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- 2. The Overhanging Crest Lip & Curling Claw (X: 85 to 118, Y: 68 to 110)
  -- The wave curls over to the right and hooks down/inward like the reference!
  for x = 85, 118 do
    local t = (x - 85) / 33.0
    -- Crest top profile (curving over from 68 down to 88)
    local crestTopY = math.floor(68 + (t^1.7) * 20)
    local crestBotY = crestTopY + math.floor(12 * math.sin(t * math.pi) + 6)
    for y = crestTopY, crestBotY do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- 3. The Curling Hook Tip (Claw at X: 104 to 118, Y: 82 to 108)
  for y = 82, 108 do
    local t = (y - 82) / 26.0
    local hookLeft = math.floor(114 - math.sin(t * math.pi) * 12)
    local hookRight = math.floor(118 - t * 4)
    for x = hookLeft, hookRight do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- 4. Deep Spiral Barrel / Hollow Cavity (Cutout in dark space inside the curl)
  for cy = 76, 142 do
    local t = (cy - 76) / 66.0
    -- Circular spiral inner boundary
    local barrelLeft = math.floor(82 + math.sin(t * math.pi) * 16 - (t^2) * 6)
    local barrelRight = math.floor(104 - math.sin(t * math.pi) * 10)
    for cx = barrelLeft, barrelRight do
      if cx >= 16 and cx < 192 and cy >= 0 and cy < 192 then
        setHex(img, cx, cy, BG_DARK)
      end
    end
  end

  -- 5. Lower Sea & Right Secondary Swell (X: 100 to 180, Y: 148 to 175)
  for x = 100, 180 do
    local t = (x - 100) / 80.0
    local seaY = math.floor(154 + math.sin(t * math.pi * 1.5) * 6)
    for y = seaY, 175 do
      setHex(img, x, y, AMBER_LOGO)
    end
  end
  for y = 158, 162 do for x = 16, 180 do setHex(img, x, y, AMBER_LOGO) end end

  -- 6. Foam Crest Droplets breaking off the spiral claw
  local foamDroplets = {
    {116, 106, 2}, {112, 114, 2}, {108, 122, 3}, {102, 130, 3},
    {122, 94, 2}, {126, 100, 2}, {124, 110, 2}, {120, 120, 2},
    {128, 116, 2}, {134, 124, 3}, {140, 132, 2}
  }
  for _, pt in ipairs(foamDroplets) do
    for dx = 0, pt[3] - 1 do
      setHex(img, pt[1] + dx, pt[2], AMBER_LOGO)
      setHex(img, pt[1] + dx, pt[2] + 1, AMBER_LOGO)
    end
  end

  -- B. THE TILTED WOODEN BOAT RIDING THE CREST (Tilted ~18° Ascending)
  -- Stern: X: 48, Y: 94
  -- Prow: X: 152, Y: 52
  local bLen = 104
  local hullThick = 9

  for x = 48, 152 do
    local t = (x - 48) / bLen
    local sheerY = math.floor(94 - t * 42) -- Line ascending from 94 to 52
    local bottomY = sheerY + hullThick

    -- Sternpost
    if x == 48 then
      sheerY = sheerY - 2
      bottomY = bottomY + 2
    end

    -- Prow sharp angle
    if x > 144 then
      bottomY = sheerY + hullThick - (x - 144) * 1.1
    end

    for y = sheerY, math.floor(bottomY) do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- Radiant courage glint on the prow
  setHex(img, 153, 51, AMBER_HI); setHex(img, 154, 51, WHITE)
  setHex(img, 153, 52, AMBER_HI)

  -- C. THE 6 CREW MEMBERS ROWING IN UNISON (Aligned with ~18° tilt)
  local crewX = { 60, 74, 88, 102, 116, 130 }
  for i, cx in ipairs(crewX) do
    local t = (cx - 48) / bLen
    local deckY = math.floor(94 - t * 42)
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
  logFile:write("OK: Master 192x192 Hokusai Wave Isotype generated.\n")
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

  -- 1. Main Swell (X: 12 to 82)
  for x = 12, 82 do
    local t = (x - 12) / 70.0
    local topY = math.floor(76 - (t^2.2) * 44)
    for y = topY, 86 do setHex(img, x, y, AMBER_LOGO) end
  end

  -- 2. Curling Lip & Claw (X: 72 to 102)
  for x = 72, 102 do
    local t = (x - 72) / 30.0
    local crestTopY = math.floor(32 + (t^1.7) * 10)
    local crestBotY = crestTopY + math.floor(6 * math.sin(t * math.pi) + 3)
    for y = crestTopY, crestBotY do setHex(img, x, y, AMBER_LOGO) end
  end
  for y = 38, 54 do
    local t = (y - 38) / 16.0
    local hookLeft = math.floor(98 - math.sin(t * math.pi) * 6)
    for x = hookLeft, 102 do setHex(img, x, y, AMBER_LOGO) end
  end

  -- 3. Barrel Cavity Cutout
  for cy = 36, 72 do
    local t = (cy - 36) / 36.0
    local bLeft = math.floor(70 + math.sin(t * math.pi) * 8)
    local bRight = math.floor(90 - math.sin(t * math.pi) * 5)
    for cx = bLeft, bRight do
      if cx >= 0 and cx < 160 and cy >= 0 and cy < 90 then setHex(img, cx, cy, BG_DARK) end
    end
  end

  -- 4. Right lower sea
  for x = 86, 150 do
    local t = (x - 86) / 64.0
    local seaY = math.floor(75 + math.sin(t * math.pi * 1.5) * 3)
    for y = seaY, 86 do setHex(img, x, y, AMBER_LOGO) end
  end
  for y = 77, 79 do for x = 12, 150 do setHex(img, x, y, AMBER_LOGO) end end

  -- Foam droplets
  local foamPts = {
    {100, 52, 2}, {96, 58, 2}, {92, 64, 2}, {104, 48, 2},
    {108, 54, 2}, {112, 60, 2}, {118, 66, 2}
  }
  for _, pt in ipairs(foamPts) do
    for dx = 0, pt[3] - 1 do setHex(img, pt[1] + dx, pt[2], AMBER_LOGO) end
  end

  -- 5. Tilted Boat (Ascending ~18°)
  local bLen = 82
  for x = 40, 122 do
    local t = (x - 40) / bLen
    local sheerY = math.floor(46 - t * 21)
    local bottomY = sheerY + 5
    if x == 40 then sheerY = sheerY - 1; bottomY = bottomY + 1 end
    if x > 116 then bottomY = sheerY + 5 - (x - 116) * 0.9 end
    for y = sheerY, math.floor(bottomY) do setHex(img, x, y, AMBER_LOGO) end
  end
  setHex(img, 123, 24, AMBER_HI); setHex(img, 124, 24, WHITE)

  -- 6. Crew
  local crewX = { 50, 62, 74, 86, 98, 110 }
  for i, cx in ipairs(crewX) do
    local t = (cx - 40) / bLen
    local deckY = math.floor(46 - t * 21)
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

  for x = 12, 82 do
    local t = (x - 12) / 70.0
    local topY = math.floor(76 - (t^2.2) * 44)
    for y = topY, 86 do setHex(img, x, y, AMBER_LOGO) end
  end
  for x = 72, 102 do
    local t = (x - 72) / 30.0
    local crestTopY = math.floor(32 + (t^1.7) * 10)
    local crestBotY = crestTopY + math.floor(6 * math.sin(t * math.pi) + 3)
    for y = crestTopY, crestBotY do setHex(img, x, y, AMBER_LOGO) end
  end
  for y = 38, 54 do
    local t = (y - 38) / 16.0
    local hookLeft = math.floor(98 - math.sin(t * math.pi) * 6)
    for x = hookLeft, 102 do setHex(img, x, y, AMBER_LOGO) end
  end
  for cy = 36, 72 do
    local t = (cy - 36) / 36.0
    local bLeft = math.floor(70 + math.sin(t * math.pi) * 8)
    local bRight = math.floor(90 - math.sin(t * math.pi) * 5)
    for cx = bLeft, bRight do
      if cx >= 0 and cx < 160 and cy >= 0 and cy < 90 then setHex(img, cx, cy, BG_DARK) end
    end
  end
  for x = 86, 150 do
    local t = (x - 86) / 64.0
    local seaY = math.floor(75 + math.sin(t * math.pi * 1.5) * 3)
    for y = seaY, 86 do setHex(img, x, y, AMBER_LOGO) end
  end
  for y = 77, 79 do for x = 12, 150 do setHex(img, x, y, AMBER_LOGO) end end

  local bLen = 82
  for x = 40, 122 do
    local t = (x - 40) / bLen
    local sheerY = math.floor(46 - t * 21)
    local bottomY = sheerY + 5
    if x == 40 then sheerY = sheerY - 1; bottomY = bottomY + 1 end
    if x > 116 then bottomY = sheerY + 5 - (x - 116) * 0.9 end
    for y = sheerY, math.floor(bottomY) do setHex(img, x, y, AMBER_LOGO) end
  end
  setHex(img, 123, 24, AMBER_HI); setHex(img, 124, 24, WHITE)

  local foamPts = {
    {100, 52, 2}, {96, 58, 2}, {92, 64, 2}, {104, 48, 2},
    {108, 54, 2}, {112, 60, 2}, {118, 66, 2}
  }
  for _, pt in ipairs(foamPts) do
    for dx = 0, pt[3] - 1 do setHex(img, pt[1] + dx, pt[2], AMBER_LOGO) end
  end

  local crewX = { 50, 62, 74, 86, 98, 110 }
  for i, cx in ipairs(crewX) do
    local t = (cx - 40) / bLen
    local deckY = math.floor(46 - t * 21)
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

logFile:write("SUCCESS: Authentic Hokusai Wave and Tilted Boat rendered!\n")
logFile:close()