local logFile = io.open("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/wave_refine_log.txt", "w")
logFile:write("Starting Authentic Curling Wave & Boat Redesign...\n")

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
-- 1. ISOTIPO MAESTRO FLAT DESIGN (192x192 px) - OLA CON RIZO / BREAKER
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

  -- A. THE AUTHENTIC CURLING TIDAL WAVE (Swell rising from left, curling at crest)
  -- 1. Main rising body (X: 16 to 105)
  for x = 16, 105 do
    local t = (x - 16) / 89.0 -- 0.0 to 1.0
    -- Exponential rising swell curve
    local topY = math.floor(154 - (t^2.4) * 82) -- rises from 154 to 72
    for y = topY, 156 do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- 2. The Curling Lip / Hook at the crest (X: 95 to 118, Y: 70 to 110)
  -- The crest arches forward and curls downward forming a hollow barrel
  for x = 95, 118 do
    local t = (x - 95) / 23.0
    -- Crest top arch
    local crestTop = math.floor(72 + (t^1.8) * 18) -- curves down from 72 to 90
    local crestBottom = crestTop + math.floor(12 * math.sin(t * math.pi)) + 4
    for y = crestTop, crestBottom do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- 3. Hollow barrel negative space (Cutout under curl X: 88 to 112, Y: 85 to 135)
  for cy = 88, 135 do
    local t = (cy - 88) / 47.0
    local leftBound = math.floor(88 + math.sin(t * math.pi) * 14)
    local rightBound = math.floor(108 - math.sin(t * math.pi) * 8)
    for cx = leftBound, rightBound do
      -- Carve out hollow barrel / ocean trough in BG_DARK
      if cx >= 16 and cx < 192 and cy >= 0 and cy < 192 then
        setHex(img, cx, cy, BG_DARK)
      end
    end
  end

  -- 4. Wave plunge base & front sea floor (X: 105 to 176, Y: 136 to 156)
  for x = 100, 176 do
    local t = (x - 100) / 76.0
    local waterTop = math.floor(142 + t * 10)
    for y = waterTop, 156 do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- Base sea line across bottom
  for y = 153, 156 do for x = 16, 176 do setHex(img, x, y, AMBER_LOGO) end end

  -- 5. Dynamic Foam Crests & Spray Droplets breaking off the curling lip
  local foamClusters = {
    {116, 88}, {118, 90}, {120, 94}, {122, 98}, {120, 104},
    {118, 110}, {115, 116}, {112, 124}, {110, 130}, {108, 136},
    {124, 96}, {126, 102}, {122, 112}, {118, 122}, {114, 132},
    -- Airborne droplets thrown ahead
    {128, 86}, {132, 92}, {135, 98}, {138, 106}, {130, 114}, {126, 124}
  }
  for _, pt in ipairs(foamClusters) do
    setHex(img, pt[1], pt[2], AMBER_LOGO)
    setHex(img, pt[1]+1, pt[2], AMBER_LOGO)
    setHex(img, pt[1], pt[2]+1, AMBER_LOGO)
  end

  -- B. THE WOODEN SHIP RIDING THE CREST (Heading Right)
  -- Stern at X: 58 (anchored on the rising swell)
  -- Midship at X: 95 (crest apex)
  -- Bow at X: 142 (soaring in the air over the curl!)
  for x = 58, 142 do
    local t = (x - 58) / 84.0
    -- Boat sheer line angle (rises gracefully towards prow)
    local sheerY = math.floor(78 - t * 14 + (t - 0.5)^2 * 6)
    local hullDepth = math.floor(9 + math.sin(t * math.pi) * 4)

    for y = sheerY, sheerY + hullDepth do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- Raised Sternpost (X: 56 to 60, Y: 74 to 84)
  for y = 74, 84 do
    setHex(img, 56, y, AMBER_LOGO); setHex(img, 57, y, AMBER_LOGO)
  end

  -- Sharp Sweeping Prow / Bowstem (X: 138 to 146, Y: 58 to 68)
  for x = 138, 146 do
    local py = math.floor(66 - (x - 138) * 0.9)
    setHex(img, x, py, AMBER_LOGO); setHex(img, x, py + 1, AMBER_LOGO)
    setHex(img, x, py + 2, AMBER_LOGO)
  end
  -- Glint of courage at prow tip
  setHex(img, 147, 58, AMBER_HI); setHex(img, 148, 58, WHITE)
  setHex(img, 147, 57, AMBER_HI)

  -- C. THE 6 ROWING CREW MEMBERS IN FULL SYNCHRONOUS STROKE
  local crewX = { 68, 78, 88, 98, 108, 118 }
  for i, cx in ipairs(crewX) do
    local t = (cx - 58) / 84.0
    local sheerY = math.floor(78 - t * 14 + (t - 0.5)^2 * 6)
    local headY = sheerY - 8

    -- Head (Solid 2x2 cluster)
    setHex(img, cx, headY, AMBER_LOGO); setHex(img, cx + 1, headY, AMBER_LOGO)
    setHex(img, cx, headY + 1, AMBER_LOGO); setHex(img, cx + 1, headY + 1, AMBER_LOGO)

    -- Torso (Leaning forward into the stroke)
    setHex(img, cx - 1, headY + 2, AMBER_LOGO); setHex(img, cx, headY + 2, AMBER_LOGO); setHex(img, cx + 1, headY + 2, AMBER_LOGO)
    setHex(img, cx - 1, headY + 3, AMBER_LOGO); setHex(img, cx, headY + 3, AMBER_LOGO); setHex(img, cx + 1, headY + 3, AMBER_LOGO)
    setHex(img, cx - 2, headY + 4, AMBER_LOGO); setHex(img, cx - 1, headY + 4, AMBER_LOGO); setHex(img, cx, headY + 4, AMBER_LOGO)

    -- Long Oar (Dipping back into the water / slicing air)
    for o = 0, 11 do
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
  logFile:write("OK: Master 192x192 Curling Wave Isotype generated successfully.\n")
end

----------------------------------------------------------------------
-- 2. SPLASH SCREEN FRAMES (160x90 px) - AUTHENTIC CURLING WAVE
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

  -- 1. Main rising swell (X: 12 to 88)
  for x = 12, 88 do
    local t = (x - 12) / 76.0
    local topY = math.floor(76 - (t^2.4) * 42)
    for y = topY, 78 do setHex(img, x, y, AMBER_LOGO) end
  end

  -- 2. Curling lip at crest (X: 80 to 102)
  for x = 80, 102 do
    local t = (x - 80) / 22.0
    local crestTop = math.floor(34 + (t^1.8) * 11)
    local crestBottom = crestTop + math.floor(7 * math.sin(t * math.pi)) + 2
    for y = crestTop, crestBottom do setHex(img, x, y, AMBER_LOGO) end
  end

  -- 3. Hollow barrel cutout
  for cy = 42, 68 do
    local t = (cy - 42) / 26.0
    local leftBound = math.floor(74 + math.sin(t * math.pi) * 8)
    local rightBound = math.floor(92 - math.sin(t * math.pi) * 5)
    for cx = leftBound, rightBound do
      if cx >= 0 and cx < 160 and cy >= 0 and cy < 90 then
        setHex(img, cx, cy, BG_DARK)
      end
    end
  end

  -- 4. Plunge base & sea floor
  for x = 86, 148 do
    local t = (x - 86) / 62.0
    local waterTop = math.floor(70 + t * 6)
    for y = waterTop, 78 do setHex(img, x, y, AMBER_LOGO) end
  end
  for y = 76, 78 do for x = 12, 148 do setHex(img, x, y, AMBER_LOGO) end end

  -- Foam spray droplets
  local foamPts = {
    {100, 46}, {102, 50}, {104, 54}, {102, 60}, {98, 66},
    {106, 52}, {108, 58}, {112, 48}, {116, 54}, {110, 62}
  }
  for _, pt in ipairs(foamPts) do
    setHex(img, pt[1], pt[2], AMBER_LOGO)
    setHex(img, pt[1]+1, pt[2], AMBER_LOGO)
  end

  -- 5. The Ship
  for x = 46, 118 do
    local t = (x - 46) / 72.0
    local sheerY = math.floor(38 - t * 8 + (t - 0.5)^2 * 4)
    local hullDepth = math.floor(5 + math.sin(t * math.pi) * 2)
    for y = sheerY, sheerY + hullDepth do setHex(img, x, y, AMBER_LOGO) end
  end

  -- Prow & Glint
  for x = 114, 122 do
    local py = math.floor(32 - (x - 114) * 0.6)
    setHex(img, x, py, AMBER_LOGO); setHex(img, x, py + 1, AMBER_LOGO)
  end
  setHex(img, 123, 27, AMBER_HI); setHex(img, 124, 27, WHITE)

  -- Crew
  local crewX = { 54, 62, 70, 78, 86, 94 }
  for i, cx in ipairs(crewX) do
    local t = (cx - 46) / 72.0
    local sheerY = math.floor(38 - t * 8 + (t - 0.5)^2 * 4)
    local headY = sheerY - 5
    setHex(img, cx, headY, AMBER_LOGO); setHex(img, cx + 1, headY, AMBER_LOGO)
    setHex(img, cx, headY + 1, AMBER_LOGO); setHex(img, cx + 1, headY + 1, AMBER_LOGO)
    setHex(img, cx - 1, headY + 2, AMBER_LOGO); setHex(img, cx, headY + 2, AMBER_LOGO)
    for o = 0, 6 do
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

-- Frame 08: Freeze Shift (Luma Scanline Pulse)
do
  local spr, img = createFrame()

  -- Swell
  for x = 12, 88 do
    local t = (x - 12) / 76.0
    local topY = math.floor(76 - (t^2.4) * 42)
    for y = topY, 78 do setHex(img, x, y, AMBER_LOGO) end
  end
  for x = 80, 102 do
    local t = (x - 80) / 22.0
    local crestTop = math.floor(34 + (t^1.8) * 11)
    local crestBottom = crestTop + math.floor(7 * math.sin(t * math.pi)) + 2
    for y = crestTop, crestBottom do setHex(img, x, y, AMBER_LOGO) end
  end
  for cy = 42, 68 do
    local t = (cy - 42) / 26.0
    local leftBound = math.floor(74 + math.sin(t * math.pi) * 8)
    local rightBound = math.floor(92 - math.sin(t * math.pi) * 5)
    for cx = leftBound, rightBound do
      if cx >= 0 and cx < 160 and cy >= 0 and cy < 90 then setHex(img, cx, cy, BG_DARK) end
    end
  end
  for x = 86, 148 do
    local t = (x - 86) / 62.0
    local waterTop = math.floor(70 + t * 6)
    for y = waterTop, 78 do setHex(img, x, y, AMBER_LOGO) end
  end
  for y = 76, 78 do for x = 12, 148 do setHex(img, x, y, AMBER_LOGO) end end

  -- Ship
  for x = 46, 118 do
    local t = (x - 46) / 72.0
    local sheerY = math.floor(38 - t * 8 + (t - 0.5)^2 * 4)
    local hullDepth = math.floor(5 + math.sin(t * math.pi) * 2)
    for y = sheerY, sheerY + hullDepth do setHex(img, x, y, AMBER_LOGO) end
  end
  for x = 114, 122 do
    local py = math.floor(32 - (x - 114) * 0.6)
    setHex(img, x, py, AMBER_LOGO); setHex(img, x, py + 1, AMBER_LOGO)
  end
  setHex(img, 123, 27, AMBER_HI); setHex(img, 124, 27, WHITE)

  -- Crew
  local crewX = { 54, 62, 70, 78, 86, 94 }
  for i, cx in ipairs(crewX) do
    local t = (cx - 46) / 72.0
    local sheerY = math.floor(38 - t * 8 + (t - 0.5)^2 * 4)
    local headY = sheerY - 5
    setHex(img, cx, headY, AMBER_LOGO); setHex(img, cx + 1, headY, AMBER_LOGO)
    setHex(img, cx, headY + 1, AMBER_LOGO); setHex(img, cx + 1, headY + 1, AMBER_LOGO)
    setHex(img, cx - 1, headY + 2, AMBER_LOGO); setHex(img, cx, headY + 2, AMBER_LOGO)
    for o = 0, 6 do
      local ox = cx - 1 - o
      local oy = headY + 2 + math.floor(o * 0.95)
      if oy <= 76 then setHex(img, ox, oy, AMBER_LOGO) end
    end
  end

  -- Golden Scanlines of Transition
  for y = 8, 82 do
    if y % 3 == 0 then
      for x = 15, 145 do
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

logFile:write("SUCCESS: All authentic curling wave assets generated!\n")
logFile:close()