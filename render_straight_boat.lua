local logFile = io.open("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/straight_boat_log.txt", "w")
logFile:write("Starting Straight Boat + Dynamic Wave Isotype generation...\n")

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
-- 1. MASTER ISOTYPE (192x192 px) - STRAIGHT BOAT + DYNAMIC WAVE
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

  -- A. THE DYNAMIC WAVE
  -- 1. Rising swell on the left (X: 12 to 104)
  for x = 12, 104 do
    local t = (x - 12) / 92.0
    local topY = math.floor(155 - (t^2.0) * 78) -- reaches 77 at x = 104
    for y = topY, 172 do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- 2. Front concave drop under the boat (X: 94 to 106)
  for cy = 80, 155 do
    local t = (cy - 80) / 75.0
    local dropX = math.floor(105 - math.sin(t * math.pi) * 8)
    for x = dropX, 105 do
      setHex(img, x, cy, AMBER_LOGO)
    end
  end

  -- 3. Right low sea surface (X: 100 to 180, sloping gently)
  for x = 100, 180 do
    local t = (x - 100) / 80.0
    local seaY = math.floor(155 + t * 14)
    for y = seaY, 172 do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- Base sea line across bottom
  for y = 154, 157 do for x = 12, 180 do setHex(img, x, y, AMBER_LOGO) end end

  -- B. THE STRAIGHT / FLAT BOAT (Consistent with the cinematic animation)
  -- Straight horizontal hull: from X: 54 to 156
  local boatTopY = 70
  local boatHeight = 9

  for x = 54, 156 do
    -- Straight horizontal block
    local topY = boatTopY
    local bottomY = boatTopY + boatHeight

    -- Slight 45-degree angle at prow tip
    if x > 150 then
      bottomY = boatTopY + boatHeight - (x - 150)
    end

    for y = topY, bottomY do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- Prow sharp edge glint
  setHex(img, 157, boatTopY, AMBER_HI); setHex(img, 158, boatTopY, WHITE)
  setHex(img, 157, boatTopY + 1, AMBER_HI)

  -- C. SPRAY DROPLETS UNDER THE PROJECTED PROW (X: 114 to 148, Y: 84 to 150)
  local sprayParticles = {
    {118, 86, 2}, {124, 88, 2}, {130, 86, 2}, {136, 88, 2}, {144, 88, 2},
    {115, 96, 2}, {121, 98, 3}, {127, 96, 2}, {134, 100, 3}, {142, 102, 2},
    {118, 108, 2}, {125, 110, 3}, {132, 114, 2}, {139, 116, 2},
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

  -- D. THE 6 CREW MEMBERS (Straight and aligned with oars)
  local crewX = { 64, 76, 88, 100, 112, 124 }
  for i, cx in ipairs(crewX) do
    local headY = boatTopY - 8

    -- Head (Solid 2x2 cluster)
    setHex(img, cx, headY, AMBER_LOGO); setHex(img, cx + 1, headY, AMBER_LOGO)
    setHex(img, cx, headY + 1, AMBER_LOGO); setHex(img, cx + 1, headY + 1, AMBER_LOGO)

    -- Torso (Leaning into stroke)
    setHex(img, cx - 1, headY + 2, AMBER_LOGO); setHex(img, cx, headY + 2, AMBER_LOGO); setHex(img, cx + 1, headY + 2, AMBER_LOGO)
    setHex(img, cx - 1, headY + 3, AMBER_LOGO); setHex(img, cx, headY + 3, AMBER_LOGO); setHex(img, cx + 1, headY + 3, AMBER_LOGO)
    setHex(img, cx - 2, headY + 4, AMBER_LOGO); setHex(img, cx - 1, headY + 4, AMBER_LOGO); setHex(img, cx, headY + 4, AMBER_LOGO)

    -- Straight diagonal oar
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
  logFile:write("OK: Master 192x192 Straight Boat Isotype generated.\n")
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

  -- 4. Straight Boat
  local bTopY = 35
  local bHeight = 5
  for x = 44, 130 do
    local bBottomY = bTopY + bHeight
    if x > 125 then bBottomY = bTopY + bHeight - (x - 125) end
    for y = bTopY, bBottomY do setHex(img, x, y, AMBER_LOGO) end
  end
  setHex(img, 131, bTopY, AMBER_HI); setHex(img, 132, bTopY, WHITE)

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
  local crewX = { 52, 62, 72, 82, 92, 102 }
  for i, cx in ipairs(crewX) do
    local headY = bTopY - 4
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

  local bTopY = 35
  local bHeight = 5
  for x = 44, 130 do
    local bBottomY = bTopY + bHeight
    if x > 125 then bBottomY = bTopY + bHeight - (x - 125) end
    for y = bTopY, bBottomY do setHex(img, x, y, AMBER_LOGO) end
  end
  setHex(img, 131, bTopY, AMBER_HI); setHex(img, 132, bTopY, WHITE)

  local sprayPts = {
    {96, 44, 2}, {102, 45, 2}, {108, 44, 2}, {116, 45, 2},
    {94, 50, 2}, {100, 52, 2}, {106, 50, 2}, {112, 53, 2},
    {98, 58, 2}, {104, 60, 2}, {110, 62, 2},
    {99, 68, 2}, {105, 71, 2}
  }
  for _, sp in ipairs(sprayPts) do
    for dx = 0, sp[3] - 1 do setHex(img, sp[1] + dx, sp[2], AMBER_LOGO) end
  end

  local crewX = { 52, 62, 72, 82, 92, 102 }
  for i, cx in ipairs(crewX) do
    local headY = bTopY - 4
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

logFile:write("SUCCESS: Straight boat + Dynamic wave rendered!\n")
logFile:close()