local logFile = io.open("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/pix_isotipo_log.txt", "w")
logFile:write("Starting Pix Isotipo & Splash Frame Asymmetric Wave Refinement...\n")

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

local BG_DARK    = "#090d16" -- Dark Charcoal/Slate
local AMBER_LOGO = "#f59e0b" -- Warm Amber (Sapiensia Flat Design)
local AMBER_HI   = "#fbbf24" -- Glint
local WHITE      = "#ffffff" -- Spark

----------------------------------------------------------------------
-- 1. LOGOTIPO OFICIAL SAPIENSIA CLAN (192x192 px) - ASYMMETRIC WAVE
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

  -- MONUMENTAL MASSIVE WAVE ON THE LEFT/BACK (X: 18 to 98)
  -- Rising with steep exponential curve from Y: 152 up to crest at Y: 76
  for x = 18, 98 do
    local t = (x - 18) / 80.0
    -- Steep parabolic swell
    local waveY = math.floor(152 - (t^2.2) * 76)
    for y = waveY, 154 do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- FRONT ABYSS / DEEP DROP ON THE RIGHT (X: 99 to 174)
  -- Water plunges steeply down into the trough, leaving open negative space under prow
  for x = 99, 174 do
    local t = (x - 98) / 76.0
    -- Rapid plunge to sea base level (Y: 148 to 154)
    local dropY = math.floor(76 + (1 - math.exp(-t * 3.5)) * 74)
    for y = dropY, 154 do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- Flat bottom sea line
  for y = 152, 155 do for x = 18, 174 do setHex(img, x, y, AMBER_LOGO) end end

  -- THE SHIP SUSPENDED ON THE CREST (X: 68 to 148, Y: 68 to 86)
  -- Stern is firmly grounded on the massive wave (X: 68 to 98)
  -- Bow is soaring horizontally into empty air (X: 99 to 148)
  for x = 68, 148 do
    local t = (x - 68) / 80.0
    local hullTop = math.floor(77 - t * 11) -- Angle rising forward
    local hullBottom = hullTop + math.floor(9 + t * 2)
    for y = hullTop, hullBottom do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- The 6 Crew Silhouettes in perfect synchrony
  local crewX = { 78, 88, 98, 108, 118, 128 }
  for i, cx in ipairs(crewX) do
    local t = (cx - 68) / 80.0
    local cy = math.floor(74 - t * 11)

    -- Head
    setHex(img, cx, cy - 6, AMBER_LOGO); setHex(img, cx + 1, cy - 6, AMBER_LOGO)
    setHex(img, cx, cy - 7, AMBER_LOGO); setHex(img, cx + 1, cy - 7, AMBER_LOGO)
    -- Torso leaning forward
    setHex(img, cx, cy - 5, AMBER_LOGO); setHex(img, cx + 1, cy - 5, AMBER_LOGO)
    setHex(img, cx - 1, cy - 4, AMBER_LOGO); setHex(img, cx, cy - 4, AMBER_LOGO)
    -- Oar angled back into the wave / air
    for o = 0, 9 do
      local ox = cx - 2 - o
      local oy = cy - 3 + math.floor(o * 0.9)
      if oy <= 152 then setHex(img, ox, oy, AMBER_LOGO) end
    end
  end

  -- Sharp Prow Tip slicing the void with Glint
  setHex(img, 149, 66, AMBER_HI); setHex(img, 150, 66, WHITE)
  setHex(img, 149, 65, AMBER_HI)

  -- Save Logo Files
  sprLogo:saveCopyAs(baseDir .. "/assets/sprites/ui/logo_sapiensia_clan.png")
  sprLogo:saveCopyAs(baseDir .. "/assets/sprites/ui/logo_sapiensia_clan.aseprite")
  sprLogo:saveCopyAs(baseDir .. "/assets/icons/logo_sapiensia_clan_192.png")

  -- 512x512 Master Icon
  local spr512 = Sprite(sprLogo)
  spr512:resize(512, 512)
  spr512:saveCopyAs(baseDir .. "/assets/icons/logo_sapiensia_clan_512.png")
  spr512:close()

  -- 32x32 Favicon
  local spr32 = Sprite(sprLogo)
  spr32:resize(32, 32)
  spr32:saveCopyAs(baseDir .. "/assets/icons/logo_sapiensia_clan_32.png")
  spr32:close()

  sprLogo:close()
  logFile:write("OK: Master 192x192 Isotype and Icon sizes generated.\n")
end

----------------------------------------------------------------------
-- 2. SPLASH SCREEN FRAMES 08 & 09 (160x90 px) - ASYMMETRIC WAVE
----------------------------------------------------------------------
local function createFrame()
  local spr = Sprite(160, 90)
  local img = spr.cels[1].image
  for y = 0, 89 do for x = 0, 159 do setHex(img, x, y, BG_DARK) end end
  return spr, img
end

-- Frame 8: Freeze Shift (Luma Thresholding Collapse)
do
  local spr, img = createFrame()

  -- Left massive wave swell (X: 14 to 80)
  for x = 14, 80 do
    local t = (x - 14) / 66.0
    local waveY = math.floor(74 - (t^2.2) * 38)
    for y = waveY, 76 do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- Right abyss / deep drop (X: 81 to 146)
  for x = 81, 146 do
    local t = (x - 80) / 66.0
    local dropY = math.floor(36 + (1 - math.exp(-t * 3.5)) * 38)
    for y = dropY, 76 do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- Flat bottom sea line
  for y = 75, 77 do for x = 14, 146 do setHex(img, x, y, AMBER_LOGO) end end

  -- Ship on crest
  for x = 54, 122 do
    local t = (x - 54) / 68.0
    local hullTop = math.floor(38 - t * 6)
    local hullBottom = hullTop + math.floor(5 + t * 1)
    for y = hullTop, hullBottom do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- Crew
  local crewX = { 62, 70, 78, 86, 94, 102 }
  for i, cx in ipairs(crewX) do
    local t = (cx - 54) / 68.0
    local cy = math.floor(36 - t * 6)
    setHex(img, cx, cy - 4, AMBER_LOGO); setHex(img, cx + 1, cy - 4, AMBER_LOGO)
    setHex(img, cx, cy - 3, AMBER_LOGO); setHex(img, cx + 1, cy - 3, AMBER_LOGO)
    setHex(img, cx, cy - 2, AMBER_LOGO); setHex(img, cx - 1, cy - 1, AMBER_LOGO)
    for o = 0, 5 do
      local ox = cx - 1 - o
      local oy = cy - 1 + math.floor(o * 0.9)
      if oy <= 75 then setHex(img, ox, oy, AMBER_LOGO) end
    end
  end

  -- Proa glint
  setHex(img, 123, 32, AMBER_HI); setHex(img, 124, 32, WHITE)

  -- Translucent golden scanline shift
  for y = 10, 80 do
    if y % 3 == 0 then
      for x = 20, 140 do
        if (x + y) % 4 == 0 then setHex(img, x, y, AMBER_HI, 40) end
      end
    end
  end

  spr:saveCopyAs(baseDir .. "/assets/sprites/splash_cinematica/splash_frame08_freeze_shift.aseprite")
  spr:saveCopyAs(baseDir .. "/assets/sprites/splash_cinematica/splash_frame08_freeze_shift.png")

  local spr4x = Sprite(spr)
  spr4x:resize(160 * 4, 90 * 4)
  spr4x:saveCopyAs(baseDir .. "/assets/sprites/previews/preview_splash_frame08_freeze_shift_4x.png")
  spr4x:close()
  spr:close()
  logFile:write("OK: Frame 08 Freeze Shift generated.\n")
end

-- Frame 9: Pure Isotipo Flat Design
do
  local spr, img = createFrame()

  -- Left massive wave swell (X: 14 to 80)
  for x = 14, 80 do
    local t = (x - 14) / 66.0
    local waveY = math.floor(74 - (t^2.2) * 38)
    for y = waveY, 76 do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- Right abyss / deep drop (X: 81 to 146)
  for x = 81, 146 do
    local t = (x - 80) / 66.0
    local dropY = math.floor(36 + (1 - math.exp(-t * 3.5)) * 38)
    for y = dropY, 76 do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- Flat bottom sea line
  for y = 75, 77 do for x = 14, 146 do setHex(img, x, y, AMBER_LOGO) end end

  -- Ship on crest
  for x = 54, 122 do
    local t = (x - 54) / 68.0
    local hullTop = math.floor(38 - t * 6)
    local hullBottom = hullTop + math.floor(5 + t * 1)
    for y = hullTop, hullBottom do
      setHex(img, x, y, AMBER_LOGO)
    end
  end

  -- Crew
  local crewX = { 62, 70, 78, 86, 94, 102 }
  for i, cx in ipairs(crewX) do
    local t = (cx - 54) / 68.0
    local cy = math.floor(36 - t * 6)
    setHex(img, cx, cy - 4, AMBER_LOGO); setHex(img, cx + 1, cy - 4, AMBER_LOGO)
    setHex(img, cx, cy - 3, AMBER_LOGO); setHex(img, cx + 1, cy - 3, AMBER_LOGO)
    setHex(img, cx, cy - 2, AMBER_LOGO); setHex(img, cx - 1, cy - 1, AMBER_LOGO)
    for o = 0, 5 do
      local ox = cx - 1 - o
      local oy = cy - 1 + math.floor(o * 0.9)
      if oy <= 75 then setHex(img, ox, oy, AMBER_LOGO) end
    end
  end

  -- Glint of courage on the prow cutting the void
  setHex(img, 123, 32, AMBER_HI); setHex(img, 124, 32, WHITE)

  spr:saveCopyAs(baseDir .. "/assets/sprites/splash_cinematica/splash_frame09_isotipo_flat.aseprite")
  spr:saveCopyAs(baseDir .. "/assets/sprites/splash_cinematica/splash_frame09_isotipo_flat.png")

  local spr4x = Sprite(spr)
  spr4x:resize(160 * 4, 90 * 4)
  spr4x:saveCopyAs(baseDir .. "/assets/sprites/previews/preview_splash_frame09_isotipo_flat_4x.png")
  spr4x:close()
  spr:close()
  logFile:write("OK: Frame 09 Isotipo Flat generated.\n")
end

logFile:write("SUCCESS: All asymmetric wave assets rendered!\n")
logFile:close()