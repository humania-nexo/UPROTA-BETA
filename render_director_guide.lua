local logFile = io.open("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/director_guide_log.txt", "w")
logFile:write("Starting exact Director Guide Wave & Boat implementation...\n")

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
-- 1. MASTER ISOTYPE (192x192 px) - EXACTLY MATCHING DIRECTOR GUIDE
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

  -- A. THE MASSIVE WAVE BODY (Rising from left and merging with the boat)
  -- 1. Left base swell rising up to the crest (X: 0 to 102)
  for x = 12, 102 do
    local t = (x - 12) / 90.0
    -- Smooth concave upward curve
    local topY = math.floor(155 - (t^2.0) * 78) -- rises from 155 to 77
    for y = topY, 172 do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- 2. Front concave drop under the crest (X: 92 to 104)
  for cy = 82, 155 do
    local t = (cy - 82) / 73.0
    local dropX = math.floor(102 - math.sin(t * math.pi) * 8)
    for x = dropX, 102 do
      setHex(img, x, cy, AMBER_LOGO)
    end
  end

  -- 3. Right low sea surface (X: 98 to 180, sloping gently down)
  for x = 98, 180 do
    local t = (x - 98) / 82.0
    local seaY = math.floor(155 + t * 14)
    for y = seaY, 172 do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- B. THE BOAT (Fused with wave crest, swept prow in mid-air)
  -- Hull baseline: X: 52 to 162
  for x = 52, 162 do
    local t = (x - 52) / 110.0
    -- Boat top sheerline (horizontal with prow flare)
    local sheerY = 70
    if x < 66 then
      -- Stern upward flick
      sheerY = math.floor(70 - (66 - x) * 0.7)
    elseif x > 140 then
      -- Bow upward flare / prow beak
      sheerY = math.floor(70 - ((x - 140) / 22.0)^1.6 * 14)
    end

    -- Hull bottom profile
    local bottomY = 78
    if x < 75 then
      bottomY = math.floor(76 + (x - 52) * 0.35)
    elseif x <= 112 then
      -- Merged with wave crest!
      bottomY = math.floor(82 + (x - 75) * 0.25)
    elseif x <= 145 then
      -- Forward hull undercutting into air
      bottomY = math.floor(81 - (x - 112) * 0.18)
    else
      -- Bow tip underside
      bottomY = math.floor(75 - (x - 145) * 0.6)
    end

    for y = sheerY, bottomY do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- Prow tip sharp highlight
  setHex(img, 163, 56, AMBER_HI); setHex(img, 164, 56, WHITE)

  -- C. SPRAY DROPLETS / FOAM RAINING UNDER FORWARD HULL (X: 112 to 148, Y: 84 to 150)
  local sprayParticles = {
    -- Upper cluster under prow
    {118, 86, 2}, {124, 88, 2}, {130, 86, 2}, {136, 88, 2}, {144, 88, 2},
    -- Mid falling cascade
    {115, 96, 2}, {121, 98, 3}, {127, 96, 2}, {134, 100, 3}, {142, 102, 2},
    {118, 108, 2}, {125, 110, 3}, {132, 114, 2}, {139, 116, 2},
    -- Lower spray near sea
    {122, 122, 2}, {128, 126, 3}, {136, 128, 2},
    {119, 136, 3}, {126, 142, 3}, {134, 144, 2}
  }
  for _, sp in ipairs(sprayParticles) do
    for dx = 0, sp[3] - 1 do
      for dy = 0, 1 do
        setHex(img, sp[1] + dx, sp[2] + dy, AMBER_LOGO)
      end
    end
  end

  -- D. THE 6 CREW MEMBERS WITH ROWING OARS
  local crewX = { 66, 76, 86, 96, 106, 116 }
  for i, cx in ipairs(crewX) do
    local headY = 62

    -- Head (Solid 2x2 cluster)
    setHex(img, cx, headY, AMBER_LOGO); setHex(img, cx + 1, headY, AMBER_LOGO)
    setHex(img, cx, headY + 1, AMBER_LOGO); setHex(img, cx + 1, headY + 1, AMBER_LOGO)

    -- Torso (Leaning forward into the stroke)
    setHex(img, cx - 1, headY + 2, AMBER_LOGO); setHex(img, cx, headY + 2, AMBER_LOGO); setHex(img, cx + 1, headY + 2, AMBER_LOGO)
    setHex(img, cx - 1, headY + 3, AMBER_LOGO); setHex(img, cx, headY + 3, AMBER_LOGO); setHex(img, cx + 1, headY + 3, AMBER_LOGO)
    setHex(img, cx - 2, headY + 4, AMBER_LOGO); setHex(img, cx - 1, headY + 4, AMBER_LOGO); setHex(img, cx, headY + 4, AMBER_LOGO)

    -- Oar angled back (dipping down-left)
    for o = 0, 9 do
      local ox = cx - 2 - o
      local oy = headY + 3 + math.floor(o * 0.9)
      if oy <= 78 then
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
  logFile:write("OK: Exact Guide 192x192 Isotype generated.\n")
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

  -- 1. Wave swell (X: 10 to 86)
  for x = 10, 86 do
    local t = (x - 10) / 76.0
    local topY = math.floor(75 - (t^2.0) * 38)
    for y = topY, 84 do setHex(img, x, y, AMBER_LOGO) end
  end

  -- 2. Front drop (X: 78 to 88)
  for cy = 40, 75 do
    local t = (cy - 40) / 35.0
    local dropX = math.floor(86 - math.sin(t * math.pi) * 6)
    for x = dropX, 86 do setHex(img, x, cy, AMBER_LOGO) end
  end

  -- 3. Right low sea (X: 84 to 150)
  for x = 84, 150 do
    local t = (x - 84) / 66.0
    local seaY = math.floor(75 + t * 7)
    for y = seaY, 84 do setHex(img, x, y, AMBER_LOGO) end
  end

  -- 4. Boat
  for x = 44, 134 do
    local t = (x - 44) / 90.0
    local sheerY = 35
    if x < 54 then sheerY = math.floor(35 - (54 - x) * 0.6)
    elseif x > 118 then sheerY = math.floor(35 - ((x - 118) / 16.0)^1.6 * 8) end

    local bottomY = 39
    if x < 62 then bottomY = math.floor(38 + (x - 44) * 0.3)
    elseif x <= 92 then bottomY = math.floor(41 + (x - 62) * 0.2)
    elseif x <= 122 then bottomY = math.floor(41 - (x - 92) * 0.15)
    else bottomY = math.floor(37 - (x - 122) * 0.5) end

    for y = sheerY, bottomY do setHex(img, x, y, AMBER_LOGO) end
  end
  setHex(img, 135, 27, AMBER_HI); setHex(img, 136, 27, WHITE)

  -- 5. Spray droplets
  local sprayPts = {
    {96, 44, 2}, {102, 45, 2}, {108, 44, 2}, {116, 45, 2},
    {94, 50, 2}, {100, 52, 2}, {106, 50, 2}, {112, 53, 2},
    {98, 58, 2}, {104, 60, 2}, {110, 62, 2},
    {99, 68, 2}, {105, 71, 2}
  }
  for _, sp in ipairs(sprayPts) do
    for dx = 0, sp[3] - 1 do setHex(img, sp[1] + dx, sp[2], AMBER_LOGO) end
  end

  -- 6. Crew
  local crewX = { 54, 62, 70, 78, 86, 94 }
  for i, cx in ipairs(crewX) do
    local headY = 31
    setHex(img, cx, headY, AMBER_LOGO); setHex(img, cx + 1, headY, AMBER_LOGO)
    setHex(img, cx, headY + 1, AMBER_LOGO); setHex(img, cx + 1, headY + 1, AMBER_LOGO)
    setHex(img, cx - 1, headY + 2, AMBER_LOGO); setHex(img, cx, headY + 2, AMBER_LOGO); setHex(img, cx + 1, headY + 2, AMBER_LOGO)
    for o = 0, 5 do
      local ox = cx - 1 - o
      local oy = headY + 2 + math.floor(o * 0.9)
      if oy <= 39 then setHex(img, ox, oy, AMBER_LOGO) end
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
    local topY = math.floor(75 - (t^2.0) * 38)
    for y = topY, 84 do setHex(img, x, y, AMBER_LOGO) end
  end
  for cy = 40, 75 do
    local t = (cy - 40) / 35.0
    local dropX = math.floor(86 - math.sin(t * math.pi) * 6)
    for x = dropX, 86 do setHex(img, x, cy, AMBER_LOGO) end
  end
  for x = 84, 150 do
    local t = (x - 84) / 66.0
    local seaY = math.floor(75 + t * 7)
    for y = seaY, 84 do setHex(img, x, y, AMBER_LOGO) end
  end
  for x = 44, 134 do
    local t = (x - 44) / 90.0
    local sheerY = 35
    if x < 54 then sheerY = math.floor(35 - (54 - x) * 0.6)
    elseif x > 118 then sheerY = math.floor(35 - ((x - 118) / 16.0)^1.6 * 8) end
    local bottomY = 39
    if x < 62 then bottomY = math.floor(38 + (x - 44) * 0.3)
    elseif x <= 92 then bottomY = math.floor(41 + (x - 62) * 0.2)
    elseif x <= 122 then bottomY = math.floor(41 - (x - 92) * 0.15)
    else bottomY = math.floor(37 - (x - 122) * 0.5) end
    for y = sheerY, bottomY do setHex(img, x, y, AMBER_LOGO) end
  end
  setHex(img, 135, 27, AMBER_HI); setHex(img, 136, 27, WHITE)

  local sprayPts = {
    {96, 44, 2}, {102, 45, 2}, {108, 44, 2}, {116, 45, 2},
    {94, 50, 2}, {100, 52, 2}, {106, 50, 2}, {112, 53, 2},
    {98, 58, 2}, {104, 60, 2}, {110, 62, 2},
    {99, 68, 2}, {105, 71, 2}
  }
  for _, sp in ipairs(sprayPts) do
    for dx = 0, sp[3] - 1 do setHex(img, sp[1] + dx, sp[2], AMBER_LOGO) end
  end

  local crewX = { 54, 62, 70, 78, 86, 94 }
  for i, cx in ipairs(crewX) do
    local headY = 31
    setHex(img, cx, headY, AMBER_LOGO); setHex(img, cx + 1, headY, AMBER_LOGO)
    setHex(img, cx, headY + 1, AMBER_LOGO); setHex(img, cx + 1, headY + 1, AMBER_LOGO)
    setHex(img, cx - 1, headY + 2, AMBER_LOGO); setHex(img, cx, headY + 2, AMBER_LOGO); setHex(img, cx + 1, headY + 2, AMBER_LOGO)
    for o = 0, 5 do
      local ox = cx - 1 - o
      local oy = headY + 2 + math.floor(o * 0.9)
      if oy <= 39 then setHex(img, ox, oy, AMBER_LOGO) end
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

logFile:write("SUCCESS: Director Guide exact boat and wave rendered!\n")
logFile:close()