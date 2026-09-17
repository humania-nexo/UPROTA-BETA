local logFile = io.open("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/sixtina_log.txt", "w")
logFile:write("Starting Capilla Sixtina Salmon Animation generation...\n")

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

local function drawFillRect(img, x1, y1, x2, y2, hex, a)
  local r, g, b = hex2rgb(hex)
  for cy = math.max(0, y1), math.min(img.height - 1, y2) do
    for cx = math.max(0, x1), math.min(img.width - 1, x2) do
      img:drawPixel(cx, cy, app.pixelColor.rgba(r, g, b, a or 255))
    end
  end
end

local function drawCircleFilled(img, cx, cy, radius, hex, a)
  local r, g, b = hex2rgb(hex)
  local r2 = radius * radius
  for dy = -radius, radius do
    for dx = -radius, radius do
      if dx*dx + dy*dy <= r2 then
        local px, py = cx + dx, cy + dy
        if px >= 0 and px < img.width and py >= 0 and py < img.height then
          img:drawPixel(px, py, app.pixelColor.rgba(r, g, b, a or 255))
        end
      end
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
-- Arc starts at bottom right (water pool X: 175, Y: 115), peaks at (X: 110, Y: 38), and enters upper falls at (X: 55, Y: 75)
local trajectory = {
  -- f1: Coiling under water
  { x = 185, y = 118, angle = -20, flex = 0.8, inWater = true, splash = false, hang = false },
  -- f2: Snap detonating
  { x = 180, y = 112, angle = -45, flex = 0.5, inWater = true, splash = true, hang = false },
  -- f3: Rupturing surface (Crown splash)
  { x = 172, y = 98,  angle = -62, flex = 0.2, inWater = false, splash = true, hang = false },
  -- f4: Ballistic ejection
  { x = 162, y = 82,  angle = -58, flex = -0.3, inWater = false, splash = false, hang = false },
  -- f5: High velocity ascent
  { x = 150, y = 66,  angle = -50, flex = -0.6, inWater = false, splash = false, hang = false },
  -- f6: Ascending curve
  { x = 138, y = 52,  angle = -38, flex = -0.4, inWater = false, splash = false, hang = false },
  -- f7: Decelerating into apex
  { x = 124, y = 42,  angle = -20, flex = 0.1, inWater = false, splash = false, hang = true },
  -- f8: HANG-TIME APEX I (Peak ingravidez)
  { x = 110, y = 36,  angle = 0,   flex = 0.6, inWater = false, splash = false, hang = true },
  -- f9: HANG-TIME APEX II (Inversion)
  { x = 96,  y = 38,  angle = 18,  flex = 0.7, inWater = false, splash = false, hang = true },
  -- f10: Beginning descent
  { x = 84,  y = 46,  angle = 35,  flex = 0.4, inWater = false, splash = false, hang = false },
  -- f11: Descending through spray
  { x = 74,  y = 58,  angle = 50,  flex = -0.2, inWater = false, splash = false, hang = false },
  -- f12: Impact alignment
  { x = 65,  y = 72,  angle = 62,  flex = -0.4, inWater = false, splash = false, hang = false },
  -- f13: Piercing upper current (Entry splash)
  { x = 58,  y = 88,  angle = 70,  flex = -0.2, inWater = true, splash = true, hang = false },
  -- f14: Submerging
  { x = 52,  y = 100, angle = 75,  flex = 0.2, inWater = true, splash = true, hang = false },
  -- f15: Vortex dissipation
  { x = 48,  y = 108, angle = 80,  flex = 0.5, inWater = true, splash = false, hang = false },
  -- f16: Surge reset
  { x = 46,  y = 112, angle = 80,  flex = 0.6, inWater = true, splash = false, hang = false },
}

-- Create Multi-frame sprite
local spr = Sprite(W, H)

for f = 1, NUM_FRAMES do
  if f > 1 then spr:newFrame() end
  local img = spr.cels[f].image
  local state = trajectory[f]

  --------------------------------------------------------------------
  -- LAYER 1: CANYON & NIGHT SKY (Solid Organic Masses)
  --------------------------------------------------------------------
  drawFillRect(img, 0, 0, W - 1, H - 1, BG_NIGHT)

  -- Left Gorge Cliffs (Tiered natural silhouettes)
  for y = 0, H - 1 do
    local l1 = math.floor(38 + math.sin(y * 0.08) * 8 - (y * 0.12))
    local l2 = l1 - 6
    local l3 = l1 - 14
    for x = 0, l1 do
      local col = (x > l2) and CLIFF_RIM or ((x > l3) and CLIFF_LIGHT or ((x > l3 - 10) and CLIFF_MID or CLIFF_DARK))
      setHex(img, x, y, col)
    end

    -- Right Gorge Cliffs
    local r1 = math.floor(W - 42 + math.cos(y * 0.06) * 10 + (y * 0.08))
    local r2 = r1 + 6
    local r3 = r1 + 14
    for x = r1, W - 1 do
      local col = (x < r2) and CLIFF_RIM or ((x < r3) and CLIFF_LIGHT or ((x < r3 + 10) and CLIFF_MID or CLIFF_DARK))
      setHex(img, x, y, col)
    end
  end

  --------------------------------------------------------------------
  -- LAYER 2: ROARING WATERFALL WITH MULTI-SPEED FLUID COLUMNS
  --------------------------------------------------------------------
  -- Fall flow spans X: 45 to 195
  for y = 0, 105 do
    for x = 42, 198 do
      -- Organic vertical turbulent streams
      local streamNoise = math.sin(x * 0.25) * 4 + math.cos(y * 0.15 + f * 1.5) * 3
      local distFromCenter = math.abs(x - 120)

      if distFromCenter < 55 + streamNoise then
        -- Core heavy cascade
        local flowPhase = (y * 2 - f * 8 + x * 3) % 29
        local col = WATER_DEEP
        if flowPhase < 6 then
          col = WATER_BODY
        elseif flowPhase < 12 then
          col = WATER_SURGE
        elseif flowPhase < 16 then
          col = WATER_CYAN
        elseif flowPhase < 19 then
          col = WHITE
        end
        setHex(img, x, y, col)
      elseif distFromCenter < 72 + streamNoise then
        -- Outer spray curtains
        local flowPhase = (y - f * 4 + x * 2) % 23
        if flowPhase < 4 then
          setHex(img, x, y, WATER_BODY, 180)
        elseif flowPhase < 8 then
          setHex(img, x, y, WATER_CYAN, 210)
        elseif flowPhase < 10 then
          setHex(img, x, y, WATER_MIST, 140)
        end
      end
    end
  end

  --------------------------------------------------------------------
  -- LAYER 3: BOTTOM RAPIDS, PLUNGE POOL & ROLLING FOAM
  --------------------------------------------------------------------
  for y = 100, H - 1 do
    local baseLevel = 104 + math.sin((y - 100) * 0.4) * 2
    for x = 0, W - 1 do
      local poolNoise = math.sin(x * 0.1 + f * 0.8) * 3 + math.cos(y * 0.3 - f * 0.5) * 2
      if y >= baseLevel + poolNoise then
        local wavePhase = (x * 3 + y * 4 + f * 5) % 31
        local col = WATER_DEEP
        if wavePhase < 8 then
          col = WATER_BODY
        elseif wavePhase < 16 then
          col = WATER_SURGE
        elseif wavePhase < 23 then
          col = WATER_CYAN
        elseif wavePhase < 28 then
          col = WHITE
        end
        setHex(img, x, y, col)
      end
    end
  end

  --------------------------------------------------------------------
  -- LAYER 4: VOLUMETRIC GOD-RAYS (Diagonal golden light beams)
  --------------------------------------------------------------------
  for r = 0, 7 do
    local rayOriginX = 25 + r * 14
    for step = 0, 130 do
      local rx = math.floor(rayOriginX + step * 0.85)
      local ry = math.floor(step * 0.75)
      if rx >= 0 and rx < W and ry >= 0 and ry < H then
        -- Solid cluster stripes with soft alpha blending
        if (rx + ry + f) % 7 < 3 then
          setHex(img, rx, ry, SALMON_GOLD, 35)
        end
      end
    end
  end

  --------------------------------------------------------------------
  -- LAYER 5: THE HERO SALMON (CLUSTER-BASED ANATOMICAL ACTOR)
  --------------------------------------------------------------------
  local sx, sy = state.x, state.y
  local rad = math.rad(state.angle)
  local cosA = math.cos(rad)
  local sinA = math.sin(rad)
  local flex = state.flex

  -- Salmon dimensions: Length = 34 px, Max Height = 10 px
  -- We render body slices from snout (u = -16) to caudal peduncle (u = 16)
  for u = -16, 16 do
    -- Curvature offset based on spine flex
    local normalizedU = u / 16.0
    local vOffset = flex * (normalizedU^2) * 5.0

    -- Thickness profile of athletic salmon
    local halfH = 0
    if u < -12 then
      -- Snout / Head tapering
      halfH = (u + 16) * 1.0
    elseif u <= 4 then
      -- Main Torso / Girth
      halfH = 4.5 + math.cos((u + 4) / 10.0 * (math.pi / 2)) * 1.5
    else
      -- Posterior / Peduncle tapering
      halfH = math.max(1.2, 5.0 - (u - 4) * 0.32)
    end

    for v = -halfH, halfH, 0.7 do
      -- Local coordinates rotated into world space
      local lx = u
      local ly = v + vOffset

      local wx = math.floor(sx + lx * cosA - ly * sinA)
      local wy = math.floor(sy + lx * sinA + ly * cosA)

      -- Cluster shading logic:
      -- Dorsal top (v < -halfH + 1.2): Dark shadow / Mahoganny
      -- Upper flank: Rich Amber & Golden scales
      -- Lateral line / Flank core: Sapiensia Amber #f59e0b
      -- Ventral belly (v > halfH - 1.5): Pale Golden Belly
      local col = SALMON_AMBER
      if v < -halfH + 1.2 then
        col = (state.hang) and SALMON_SUN or SALMON_DARK -- Full Rim-Light at apex!
      elseif v < -1.0 then
        col = SALMON_MID
      elseif v <= 1.5 then
        col = SALMON_AMBER
      elseif v < halfH - 1.2 then
        col = SALMON_GOLD
      else
        col = SALMON_BELLY
      end

      -- If in Hang-time, add brilliant specular scales
      if state.hang and (u % 3 == 0) and (math.abs(v) < 2) then
        col = SALMON_SUN
      end

      setHex(img, wx, wy, col)
    end
  end

  -- Eye & Head details (Near snout at u = -11, v = -1.2)
  local eyeLX = -11
  local eyeLY = -1.5 + flex * ((-11/16.0)^2) * 5.0
  local eyeWX = math.floor(sx + eyeLX * cosA - eyeLY * sinA)
  local eyeWY = math.floor(sy + eyeLX * sinA + eyeLY * cosA)
  setHex(img, eyeWX, eyeWY, SALMON_SHADOW)
  setHex(img, eyeWX - 1, eyeWY, WHITE) -- Fierce Glint

  -- Dorsal Fin (Arching above torso u = -2 to 6)
  for du = -2, 6 do
    local finHeight = math.floor(3.5 * math.sin((du + 2) / 8.0 * math.pi))
    for dv = 1, finHeight do
      local flx = du
      local fly = -5.0 - dv
      local fwx = math.floor(sx + flx * cosA - fly * sinA)
      local fwy = math.floor(sy + flx * sinA + fly * cosA)
      local finCol = (dv == finHeight) and SALMON_SUN or SALMON_MID
      setHex(img, fwx, fwy, finCol)
    end
  end

  -- Pectoral Fin (Under head u = -8, dynamic angling)
  for du = -8, -4 do
    for dv = 0, 3 do
      local plx = du
      local ply = 4.0 + dv
      local pwx = math.floor(sx + plx * cosA - ply * sinA)
      local pwy = math.floor(sy + plx * sinA + ply * cosA)
      setHex(img, pwx, pwy, SALMON_DARK)
    end
  end

  -- Powerful Caudal Fin (Tail fan u = 16 to 24)
  for du = 16, 25 do
    local spread = (du - 16) * 0.9
    for dv = -spread, spread, 0.8 do
      local tlx = du
      local tly = dv + flex * 5.0
      local twx = math.floor(sx + tlx * cosA - tly * sinA)
      local twy = math.floor(sy + tlx * sinA + tly * cosA)
      local tailCol = (math.abs(dv) >= spread - 1.0) and SALMON_SUN or SALMON_MID
      setHex(img, twx, twy, tailCol)
    end
  end

  --------------------------------------------------------------------
  -- LAYER 6: WATER SPLASH, DROPLETS & BURST PARTICLES
  --------------------------------------------------------------------
  -- Explosive burst when rupturing water (f2, f3, f4)
  if f >= 2 and f <= 5 then
    local splashOriginX = 180
    local splashOriginY = 108
    local radius = (f - 1) * 8
    for angleDeg = 0, 360, 20 do
      local radS = math.rad(angleDeg)
      local spX = math.floor(splashOriginX + math.cos(radS) * radius * 1.3)
      local spY = math.floor(splashOriginY + math.sin(radS) * radius * 0.6)
      drawCircleFilled(img, spX, spY, (f == 2) and 3 or 2, (angleDeg % 40 == 0) and WHITE or WATER_CYAN)
    end
  end

  -- Re-entry Splash at upper current (f13, f14, f15)
  if f >= 13 and f <= 16 then
    local reEntryX = 58
    local reEntryY = 92
    local radius = (f - 12) * 7
    for angleDeg = 180, 360, 25 do
      local radS = math.rad(angleDeg)
      local spX = math.floor(reEntryX + math.cos(radS) * radius * 1.2)
      local spY = math.floor(reEntryY + math.sin(radS) * radius * 0.8)
      drawCircleFilled(img, spX, spY, 2, WHITE)
    end
  end

  -- Flying Droplets along leap trajectory (Parabolic spray)
  local dropletSeeds = {
    { -8, -12, 1 }, { -14, -8, 2 }, { -20, 2, 1 }, { -6, 14, 2 },
    { -18, -16, 1 }, { -24, -4, 2 }, { -10, 18, 1 }, { -28, 8, 1 }
  }
  for _, drop in ipairs(dropletSeeds) do
    local dx = sx + drop[1] + math.sin(f + drop[2]) * 4
    local dy = sy + drop[2] + math.cos(f + drop[1]) * 4
    if dy < 105 then
      drawCircleFilled(img, math.floor(dx), math.floor(dy), drop[3], WHITE)
      setHex(img, math.floor(dx + 1), math.floor(dy), WATER_CYAN, 200)
    end
  end

  -- Frame duration: 85 ms (~12 FPS, but 140 ms during apex hang-time f8 and f9 for maximum cinematic tension)
  spr.frames[f].duration = (state.hang) and 0.14 or 0.08
end

-- Save native Aseprite animated master
spr:saveCopyAs(baseUprota .. "/assets/sprites/ilustraciones/salto_salmon_anim.aseprite")
spr:saveCopyAs(baseSapiensia .. "/assets/art/salto_salmon_anim.aseprite")

-- Export Horizontal Spritesheet (3840x135 px)
local sprSheet = Sprite(W * NUM_FRAMES, H)
local imgSheet = sprSheet.cels[1].image
for f = 1, NUM_FRAMES do
  local imgF = spr.cels[f].image
  for py = 0, H - 1 do for px = 0, W - 1 do
    imgSheet:drawPixel((f - 1) * W + px, py, imgF:getPixel(px, py))
  end end
end
sprSheet:saveCopyAs(baseUprota .. "/assets/sprites/ilustraciones/salto_salmon_sheet.png")
sprSheet:saveCopyAs(baseSapiensia .. "/assets/art/salto_salmon_sheet.png")

-- 4x Preview of Spritesheet
local sprSheet4x = Sprite(sprSheet)
sprSheet4x:resize(W * NUM_FRAMES * 4, H * 4)
sprSheet4x:saveCopyAs(baseUprota .. "/assets/sprites/previews/preview_salto_salmon_sheet_4x.png")
sprSheet4x:close()
sprSheet:close()

-- Export Animated GIF for direct web and preview
spr:saveCopyAs(baseUprota .. "/assets/sprites/ilustraciones/salto_salmon_anim.gif")
spr:saveCopyAs(baseSapiensia .. "/assets/art/salto_salmon_anim.gif")

-- Export Animated GIF 4x (960x540 px)
local sprGif4x = Sprite(spr)
sprGif4x:resize(W * 4, H * 4)
sprGif4x:saveCopyAs(baseUprota .. "/assets/sprites/previews/preview_salto_salmon_anim_4x.gif")
sprGif4x:saveCopyAs(baseSapiensia .. "/assets/art/preview_salto_salmon_anim_4x.gif")
sprGif4x:close()

-- Also export Apex Frame (Frame 8) as pristine static PNG replacement for illustration
local sprApex = Sprite(W, H)
local imgApex = sprApex.cels[1].image
local imgF8 = spr.cels[8].image
for py = 0, H - 1 do for px = 0, W - 1 do
  imgApex:drawPixel(px, py, imgF8:getPixel(px, py))
end end
sprApex:saveCopyAs(baseUprota .. "/assets/sprites/ilustraciones/ilustracion_salto_salmon.png")
sprApex:saveCopyAs(baseSapiensia .. "/assets/art/ilustracion_salto_salmon.png")

local sprApex4x = Sprite(sprApex)
sprApex4x:resize(W * 4, H * 4)
sprApex4x:saveCopyAs(baseUprota .. "/assets/sprites/previews/preview_salto_salmon_4x.png")
sprApex4x:saveCopyAs(baseSapiensia .. "/assets/art/preview_salto_salmon_4x.png")
sprApex4x:close()
sprApex:close()

spr:close()
logFile:write("SUCCESS: Capilla Sixtina Salmon Animation fully generated in 16 frames!\n")
logFile:close()