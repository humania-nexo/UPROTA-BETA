local logFile = io.open("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/salmon_fluid_log.txt", "w")
logFile:write("Starting Organic Fluid Waterfall & Salmon Animation Regeneration...\n")

local function hex2rgb(hex)
  hex = tostring(hex):gsub("#","")
  return tonumber("0x"..hex:sub(1,2)) or 0, tonumber("0x"..hex:sub(3,4)) or 0, tonumber("0x"..hex:sub(5,6)) or 0
end

local function setPx(img, x, y, r, g, b)
  if x >= 0 and x < img.width and y >= 0 and y < img.height then
    img:drawPixel(x, y, app.pixelColor.rgba(r, g, b, 255))
  end
end

local function setHex(img, x, y, hex)
  local r, g, b = hex2rgb(hex)
  setPx(img, x, y, r, g, b)
end

-- Software alpha-blending for true pixel compositing (essential for GIFs)
local function blendHex(img, x, y, hex, factor)
  if x >= 0 and x < img.width and y >= 0 and y < img.height then
    if factor <= 0 then return end
    if factor >= 1 then
      setHex(img, x, y, hex)
      return
    end
    local px = img:getPixel(x, y)
    local pr = app.pixelColor.rgbaR(px)
    local pg = app.pixelColor.rgbaG(px)
    local pb = app.pixelColor.rgbaB(px)
    local nr, ng, nb = hex2rgb(hex)
    local outR = math.floor(pr * (1.0 - factor) + nr * factor + 0.5)
    local outG = math.floor(pg * (1.0 - factor) + ng * factor + 0.5)
    local outB = math.floor(pb * (1.0 - factor) + nb * factor + 0.5)
    img:drawPixel(x, y, app.pixelColor.rgba(outR, outG, outB, 255))
  end
end

local function drawFillRect(img, x1, y1, x2, y2, hex)
  local r, g, b = hex2rgb(hex)
  for cy = math.max(0, y1), math.min(img.height - 1, y2) do
    for cx = math.max(0, x1), math.min(img.width - 1, x2) do
      img:drawPixel(cx, cy, app.pixelColor.rgba(r, g, b, 255))
    end
  end
end

local baseUprota = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA"
local baseSapiensia = "c:/Users/Snow/.gemini/antigravity/scratch/sapiensiaclan"

local W = 240
local H = 135
local NUM_FRAMES = 16

-- PALETTE PALADIN / CINEMATIC
local BG_NIGHT     = "#05070c"
local CLIFF_DARK   = "#0b111e"
local CLIFF_MID    = "#182234"
local CLIFF_LIGHT  = "#2a3b54"
local CLIFF_RIM    = "#435875"

local WATER_ABYSS  = "#041324"
local WATER_DEEP   = "#072b4a"
local WATER_BODY   = "#026aa2"
local WATER_SURGE  = "#0284c7"
local WATER_CYAN   = "#38bdf8"
local WATER_MIST   = "#bae6fd"
local WHITE        = "#ffffff"

local SALMON_SHADOW= "#3d1302"
local SALMON_DARK  = "#78350f"
local SALMON_MID   = "#d97706"
local SALMON_AMBER = "#f59e0b"
local SALMON_GOLD  = "#fbbf24"
local SALMON_SUN   = "#fef08a"
local SALMON_BELLY = "#fed7aa"

-- Trajectory parameters across 16 frames
local trajectory = {
  { x = 185, y = 118, angle = -20, flex = 0.8, inWater = true, splash = false, hang = false },
  { x = 180, y = 112, angle = -45, flex = 0.5, inWater = true, splash = true, hang = false },
  { x = 172, y = 98,  angle = -62, flex = 0.2, inWater = false, splash = true, hang = false },
  { x = 162, y = 82,  angle = -58, flex = -0.3, inWater = false, splash = false, hang = false },
  { x = 150, y = 66,  angle = -50, flex = -0.6, inWater = false, splash = false, hang = false },
  { x = 138, y = 52,  angle = -38, flex = -0.4, inWater = false, splash = false, hang = false },
  { x = 124, y = 42,  angle = -20, flex = 0.1, inWater = false, splash = false, hang = true },
  { x = 110, y = 36,  angle = 0,   flex = 0.6, inWater = false, splash = false, hang = true },
  { x = 96,  y = 38,  angle = 18,  flex = 0.7, inWater = false, splash = false, hang = true },
  { x = 84,  y = 46,  angle = 35,  flex = 0.4, inWater = false, splash = false, hang = false },
  { x = 74,  y = 58,  angle = 50,  flex = -0.2, inWater = false, splash = false, hang = false },
  { x = 65,  y = 72,  angle = 62,  flex = -0.4, inWater = false, splash = false, hang = false },
  { x = 58,  y = 88,  angle = 70,  flex = -0.2, inWater = true, splash = true, hang = false },
  { x = 52,  y = 100, angle = 75,  flex = 0.2, inWater = true, splash = true, hang = false },
  { x = 48,  y = 108, angle = 80,  flex = 0.5, inWater = true, splash = false, hang = false },
  { x = 46,  y = 112, angle = 80,  flex = 0.6, inWater = true, splash = false, hang = false },
}

-- Create Multi-frame sprite
local spr = Sprite(W, H)

for f = 1, NUM_FRAMES do
  if f > 1 then spr:newFrame() end
  spr.frames[f].duration = 0.08 -- 12.5 FPS smooth cinematic loop
  local img = spr.cels[f].image
  local state = trajectory[f]

  --------------------------------------------------------------------
  -- LAYER 1: CANYON CLIFFS & NIGHT SKY
  --------------------------------------------------------------------
  drawFillRect(img, 0, 0, W - 1, H - 1, BG_NIGHT)

  -- Left Gorge Cliffs
  for y = 0, H - 1 do
    local l1 = math.floor(36 + math.sin(y * 0.07) * 7 - (y * 0.10))
    local l2 = l1 - 5
    local l3 = l1 - 12
    for x = 0, l1 do
      local col = (x > l2) and CLIFF_RIM or ((x > l3) and CLIFF_LIGHT or ((x > l3 - 8) and CLIFF_MID or CLIFF_DARK))
      setHex(img, x, y, col)
    end

    -- Right Gorge Cliffs
    local r1 = math.floor(W - 40 + math.cos(y * 0.06) * 8 + (y * 0.08))
    local r2 = r1 + 5
    local r3 = r1 + 12
    for x = r1, W - 1 do
      local col = (x < r2) and CLIFF_RIM or ((x < r3) and CLIFF_LIGHT or ((x < r3 + 8) and CLIFF_MID or CLIFF_DARK))
      setHex(img, x, y, col)
    end
  end

  --------------------------------------------------------------------
  -- LAYER 2: ORGANIC VERTICAL WATERFALL
  --------------------------------------------------------------------
  -- Base waterfall backing
  for y = 0, 104 do
    local leftBoundary = math.floor(36 + math.sin(y * 0.07) * 6)
    local rightBoundary = math.floor(W - 40 - math.cos(y * 0.06) * 7)
    for x = leftBoundary, rightBoundary do
      setHex(img, x, y, WATER_ABYSS)
    end
  end

  -- Vertical waterfall streams (natural cascading columns with downward flow)
  local streams = {
    { x1 = 40,  x2 = 62,  speed = 4.0, noiseScale = 0.16, seed = 1 },
    { x1 = 58,  x2 = 88,  speed = 5.2, noiseScale = 0.14, seed = 2 },
    { x1 = 82,  x2 = 118, speed = 6.0, noiseScale = 0.11, seed = 3 },
    { x1 = 110, x2 = 148, speed = 6.8, noiseScale = 0.10, seed = 4 }, -- Main center torrent
    { x1 = 140, x2 = 172, speed = 5.8, noiseScale = 0.12, seed = 5 },
    { x1 = 165, x2 = 192, speed = 4.8, noiseScale = 0.15, seed = 6 },
    { x1 = 186, x2 = 202, speed = 3.8, noiseScale = 0.18, seed = 7 }
  }

  for _, st in ipairs(streams) do
    local midX = (st.x1 + st.x2) * 0.5
    local width = (st.x2 - st.x1) * 0.5
    for y = 0, 104 do
      local flowY = y + f * st.speed * 1.5 + st.seed * 30
      local waveShift = math.sin(y * st.noiseScale + st.seed) * 3 + math.sin(flowY * 0.1) * 1.5
      local curMid = midX + waveShift
      local curHalfW = width + math.sin(flowY * 0.08) * 2

      for x = math.floor(curMid - curHalfW), math.floor(curMid + curHalfW) do
        if x >= 36 and x <= (W - 40) then
          local distNorm = math.abs(x - curMid) / math.max(1, curHalfW)
          local turb = math.sin(flowY * 0.4 + x * 0.25) * 0.5 + math.cos(flowY * 0.2 - x * 0.1) * 0.5

          local col = WATER_DEEP
          if distNorm < 0.35 then
            if turb > 0.45 then col = WHITE
            elseif turb > 0.0 then col = WATER_CYAN
            else col = WATER_SURGE end
          elseif distNorm < 0.70 then
            if turb > 0.55 then col = WATER_CYAN
            elseif turb > 0.10 then col = WATER_SURGE
            else col = WATER_BODY end
          else
            if turb > 0.50 then col = WATER_BODY else col = WATER_DEEP end
          end

          setHex(img, x, y, col)
        end
      end
    end
  end

  -- Vertical falling water threads & froth streaks
  for s = 1, 45 do
    local seedX = 42 + ((s * 43) % 155)
    local seedSpeed = 5.0 + ((s * 17) % 5) * 0.6
    local curY = ((s * 31 + f * seedSpeed * 2.2) % 104)
    local len = 4 + (s % 5)
    for dy = 0, len do
      local py = math.floor(curY + dy)
      local px = math.floor(seedX + math.sin(py * 0.15 + s) * 1.5)
      if px >= 36 and px <= (W - 40) and py >= 0 and py <= 104 then
        local streakCol = (dy <= 1) and WHITE or ((dy <= 3) and WATER_MIST or WATER_CYAN)
        setHex(img, px, py, streakCol)
      end
    end
  end

  --------------------------------------------------------------------
  -- LAYER 3: PLUNGE POOL & CRASHING FOAM
  --------------------------------------------------------------------
  -- Deep plunge pool basin (y: 104 to 134)
  for y = 104, H - 1 do
    for x = 0, W - 1 do
      local depth = (y - 104) / 30.0
      local baseCol = (depth > 0.5) and WATER_ABYSS or WATER_DEEP
      setHex(img, x, y, baseCol)
    end
  end

  -- Crashing impact foam billows across base of waterfall (y: 98 to 110)
  for x = 38, W - 42 do
    local boil = math.sin(x * 0.18 + f * 1.0) * 3 + math.cos(x * 0.09 - f * 0.7) * 2
    local topY = math.floor(104 - boil)
    for y = topY, 112 do
      local col = WHITE
      if y > topY + 2 then col = WATER_MIST end
      if y > topY + 4 then col = WATER_CYAN end
      if y > topY + 7 then col = WATER_SURGE end
      setHex(img, x, y, col)
    end
  end

  -- Boiling bubble domes at waterfall base
  local domes = {
    {52, 103, 7}, {74, 101, 9}, {98, 100, 11}, {122, 99, 13},
    {146, 101, 11}, {168, 102, 9}, {188, 104, 7}
  }
  for _, d in ipairs(domes) do
    local dx0 = d[1] + math.sin(f * 0.7 + d[1]) * 2
    local dy0 = d[2] + math.cos(f * 0.8 + d[1]) * 1.5
    local r = d[3]
    for dy = -r, r do
      for dx = -r, r do
        if dx*dx + dy*dy <= r*r then
          local px = math.floor(dx0 + dx)
          local py = math.floor(dy0 + dy)
          if px >= 0 and px < W and py >= 96 and py < H then
            local dist = math.sqrt(dx*dx + dy*dy)
            local col = (dist < r * 0.45) and WHITE or ((dist < r * 0.75) and WATER_MIST or WATER_CYAN)
            setHex(img, px, py, col)
          end
        end
      end
    end
  end

  -- Surface wave ripples in the pool (horizontal organic wakes moving outwards)
  for y = 110, H - 1, 2 do
    local rowPhase = y * 0.35 + f * 0.5
    for x = 0, W - 1 do
      local rip = math.sin(x * 0.07 - rowPhase) * 2 + math.cos(x * 0.04 + y * 0.15) * 1.2
      if math.abs(rip) < 0.65 then
        local col = (y < 118) and WATER_CYAN or WATER_SURGE
        if math.abs(rip) < 0.25 then col = (y < 116) and WHITE or WATER_MIST end
        setHex(img, x, y, col)
        if x % 4 == 0 and y < 128 then setHex(img, x, y + 1, WATER_BODY) end
      end
    end
  end

  -- Foam clusters drifting on pool surface
  local foamDrifts = {
    {28, 116, 7}, {62, 122, 10}, {108, 117, 12}, {152, 123, 9}, {192, 118, 8}, {218, 121, 6}
  }
  for _, fd in ipairs(foamDrifts) do
    local fx = (fd[1] + f * 1.2) % (W - 20) + 10
    local fy = fd[2] + math.sin(f * 0.4 + fd[1]) * 1.2
    for dx = -fd[3], fd[3] do
      local px = math.floor(fx + dx)
      local py = math.floor(fy + math.sin(dx * 0.6) * 1.0)
      if px >= 0 and px < W and py >= 106 and py < H then
        setHex(img, px, py, (math.abs(dx) < fd[3]*0.4) and WHITE or WATER_MIST)
      end
    end
  end

  --------------------------------------------------------------------
  -- LAYER 4: VOLUMETRIC GOD-RAYS (Soft Alpha-Blended Light Shafts)
  --------------------------------------------------------------------
  local rays = {
    { originX = 40,  width = 18, intensity = 0.12 },
    { originX = 80,  width = 24, intensity = 0.16 },
    { originX = 125, width = 28, intensity = 0.18 },
    { originX = 165, width = 22, intensity = 0.14 },
    { originX = 195, width = 16, intensity = 0.10 }
  }

  for _, ray in ipairs(rays) do
    for y = 0, 112 do
      local t = y / 112.0
      local rx = ray.originX + t * 40 + math.sin(y * 0.05 + f * 0.15) * 1.5
      local halfW = ray.width * 0.5 + t * 7.0
      for dx = -math.floor(halfW), math.floor(halfW) do
        local px = math.floor(rx + dx)
        if px >= 0 and px < W then
          local falloff = 1.0 - (math.abs(dx) / halfW)
          local blendFactor = ray.intensity * falloff * (1.0 - t * 0.4)
          blendHex(img, px, y, SALMON_SUN, blendFactor)
        end
      end
    end
  end

  --------------------------------------------------------------------
  -- LAYER 5: THE HERO SALMON (EXACT KINEMATICS & SPARKLING ANATOMY)
  --------------------------------------------------------------------
  local sx, sy = state.x, state.y
  local rad = math.rad(state.angle)
  local cosA = math.cos(rad)
  local sinA = math.sin(rad)
  local flex = state.flex

  for u = -16, 16 do
    local normalizedU = u / 16.0
    local vOffset = flex * (normalizedU^2) * 5.0

    local halfH = 0
    if u < -12 then
      halfH = (u + 16) * 1.0
    elseif u <= 4 then
      halfH = 4.5 + math.cos((u + 4) / 10.0 * (math.pi / 2)) * 1.5
    else
      halfH = math.max(1.2, 5.0 - (u - 4) * 0.32)
    end

    for v = -halfH, halfH, 0.7 do
      local lx = u
      local ly = v + vOffset
      local wx = math.floor(sx + lx * cosA - ly * sinA)
      local wy = math.floor(sy + lx * sinA + ly * cosA)

      local col = SALMON_AMBER
      if v < -halfH + 1.2 then
        col = (state.hang) and SALMON_SUN or SALMON_DARK
      elseif v < -1.0 then
        col = SALMON_MID
      elseif v <= 1.5 then
        col = SALMON_AMBER
      elseif v < halfH - 1.2 then
        col = SALMON_GOLD
      else
        col = SALMON_BELLY
      end

      if state.hang and (u % 3 == 0) and (math.abs(v) < 2) then
        col = SALMON_SUN
      end

      setHex(img, wx, wy, col)
    end
  end

  -- Eye & Glint
  local eyeLX = -11
  local eyeLY = -1.5 + flex * ((-11/16.0)^2) * 5.0
  local eyeWX = math.floor(sx + eyeLX * cosA - eyeLY * sinA)
  local eyeWY = math.floor(sy + eyeLX * sinA + eyeLY * cosA)
  setHex(img, eyeWX, eyeWY, SALMON_SHADOW)
  setHex(img, eyeWX - 1, eyeWY, WHITE)

  -- Dorsal Fin
  for du = -2, 6 do
    local finHeight = math.floor(3.5 * math.sin((du + 2) / 8.0 * math.pi))
    for dv = 1, finHeight do
      local flx = du
      local fly = -(4.5 + math.cos((du + 4) / 10.0 * (math.pi / 2)) * 1.5) - dv + flex * ((du/16.0)^2) * 5.0
      local fwx = math.floor(sx + flx * cosA - fly * sinA)
      local fwy = math.floor(sy + flx * sinA + fly * cosA)
      setHex(img, fwx, fwy, (dv == finHeight) and SALMON_SUN or SALMON_DARK)
    end
  end

  -- Pectoral & Pelvic Fins
  local pecLX = -7; local pecLY = 3.5 + flex * ((-7/16.0)^2) * 5.0
  for p = 0, 5 do
    local pwx = math.floor(sx + (pecLX + p * 0.8) * cosA - (pecLY + p * 0.6) * sinA)
    local pwy = math.floor(sy + (pecLX + p * 0.8) * sinA + (pecLY + p * 0.6) * cosA)
    setHex(img, pwx, pwy, SALMON_GOLD)
  end

  -- Caudal Tail Fin (Dynamic paddle flexing)
  local tailBaseLX = 16
  local tailBaseLY = flex * 5.0
  for tu = 1, 9 do
    local span = math.floor(tu * 1.4)
    for tv = -span, span do
      local tlx = tailBaseLX + tu
      local tly = tailBaseLY + tv + (flex * tu * 0.8)
      local twx = math.floor(sx + tlx * cosA - tly * sinA)
      local twy = math.floor(sy + tlx * sinA + tly * cosA)
      local isBorder = (math.abs(tv) == span or tu == 9)
      local tcol = isBorder and SALMON_SUN or (((tu+tv)%2==0) and SALMON_AMBER or SALMON_GOLD)
      setHex(img, twx, twy, tcol)
    end
  end

  --------------------------------------------------------------------
  -- LAYER 6: WATER SPLASH PARTICLES & DROPLETS
  --------------------------------------------------------------------
  if state.splash or f == 3 or f == 4 or f == 13 or f == 14 then
    local splashOriginX = (f <= 4) and 175 or 55
    local splashOriginY = 104
    for sp = 1, 24 do
      local angle = -math.pi * 0.15 - (sp / 24.0) * math.pi * 0.7
      local dist = 6 + ((sp * 7) % 18) + (f % 3) * 4
      local spx = math.floor(splashOriginX + math.cos(angle) * dist)
      local spy = math.floor(splashOriginY + math.sin(angle) * dist * 0.8)
      if spx >= 0 and spx < W and spy >= 0 and spy < H then
        setHex(img, spx, spy, WHITE)
        setHex(img, spx, spy + 1, WATER_MIST)
        if sp % 3 == 0 then setHex(img, spx + 1, spy, WATER_CYAN) end
      end
    end
  end

  -- Trailing water droplets following salmon through the air
  if not state.inWater then
    for d = 1, 6 do
      local dropDist = d * 6
      local dpx = math.floor(sx + cosA * dropDist + math.sin(d + f) * 2)
      local dpy = math.floor(sy + sinA * dropDist + math.cos(d * 2) * 2 + (d^1.4) * 0.8)
      if dpx >= 0 and dpx < W and dpy >= 0 and dpy < H then
        setHex(img, dpx, dpy, (d <= 2) and WHITE or ((d <= 4) and WATER_MIST or WATER_CYAN))
      end
    end
  end
end

-- Save Multi-frame Animated GIF & Aseprite
spr:saveCopyAs(baseUprota .. "/assets/sprites/ilustraciones/salto_salmon_anim.gif")
spr:saveCopyAs(baseUprota .. "/assets/sprites/ilustraciones/salto_salmon_anim.aseprite")
spr:saveCopyAs(baseSapiensia .. "/assets/salto_salmon_anim.gif")

-- 4x High Resolution Preview GIF
local spr4x = Sprite(spr)
spr4x:resize(W * 2, H * 2)
spr4x:saveCopyAs(baseUprota .. "/assets/sprites/previews/preview_salto_salmon_anim_4x.gif")
spr4x:close()

-- Master Still Illustration (Apex Frame 8)
local stillSpr = Sprite(W, H)
stillSpr.cels[1].image:drawImage(spr.cels[8].image, Point(0,0))
stillSpr:saveCopyAs(baseUprota .. "/assets/sprites/ilustraciones/ilustracion_salto_salmon.png")
stillSpr:saveCopyAs(baseUprota .. "/assets/sprites/ilustraciones/ilustracion_salto_salmon.aseprite")

local still4x = Sprite(stillSpr)
still4x:resize(W * 2, H * 2)
still4x:saveCopyAs(baseUprota .. "/assets/sprites/previews/preview_salto_salmon_4x.png")
still4x:close()
stillSpr:close()

spr:close()

logFile:write("SUCCESS: Organic fluid waterfall & salmon animation rendered and saved!\n")
logFile:close()
