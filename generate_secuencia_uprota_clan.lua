local logFile = io.open("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/uprota_clan_log.txt", "w")
logFile:write("Starting UPROTA 6-Clan Title sequence generation...\n")

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
local W = 160
local H = 90
local num_frames = 10

-- Palette
local BG_DARK    = "#090d16"
local GROUND_DK  = "#111827"
local GROUND_HI  = "#1e293b"
local DUST_AMBER = "#78350f"
local GOLD_SPARK = "#fbbf24"
local WHITE      = "#ffffff"
local AMBER_BASE = "#f59e0b"
local AMBER_DK   = "#b45309"
local AMBER_HI   = "#fde68a"

-- Character Accents
local COL_ANIGAMI = "#38bdf8" -- Cyan scarf / Director
local COL_PIX     = "#ec4899" -- Magenta beret / Artist
local COL_HERTZ   = "#10b981" -- Emerald headphones / Sound
local COL_SILAS   = "#a855f7" -- Purple cape / Lore master
local COL_ETER    = "#f97316" -- Orange antenna / Transmedia
local COL_NEXO    = "#06b6d4" -- Cyan ocular / Engineer
local COL_SKIN    = "#fed7aa"
local COL_CLOTH   = "#475569"

-- Target Letter Anchor X positions (Centered in 160 px: total span ~104 px)
local targetX = { 30, 48, 66, 84, 102, 120 }
local letterY = 44 -- Baseline top around 36 to 52

-- Draw individual glyph
local function drawLetter(img, char, x, y, colMain, colShadow, colHi)
  -- 12x14 glyphs
  if char == "U" then
    for cy = y, y+13 do
      setHex(img, x, cy, colMain); setHex(img, x+1, cy, colMain)
      setHex(img, x+10, cy, colMain); setHex(img, x+11, cy, colMain)
    end
    for cx = x, x+11 do
      setHex(img, cx, y+12, colMain); setHex(img, cx, y+13, colShadow)
    end
    setHex(img, x, y, colHi); setHex(img, x+10, y, colHi)
  elseif char == "P" then
    for cy = y, y+13 do
      setHex(img, x, cy, colMain); setHex(img, x+1, cy, colMain)
    end
    for cx = x, x+11 do
      setHex(img, cx, y, colHi); setHex(img, cx, y+7, colShadow)
    end
    for cy = y, y+7 do
      setHex(img, x+10, cy, colMain); setHex(img, x+11, cy, colMain)
    end
  elseif char == "R" then
    for cy = y, y+13 do
      setHex(img, x, cy, colMain); setHex(img, x+1, cy, colMain)
    end
    for cx = x, x+10 do
      setHex(img, cx, y, colHi); setHex(img, cx, y+6, colShadow)
    end
    for cy = y, y+6 do
      setHex(img, x+9, cy, colMain); setHex(img, x+10, cy, colMain)
    end
    -- Diagonal leg
    for i = 0, 7 do
      setHex(img, x+4+i, y+6+i, colMain); setHex(img, x+5+i, y+6+i, colShadow)
    end
  elseif char == "O" then
    for cy = y+2, y+11 do
      setHex(img, x, cy, colMain); setHex(img, x+1, cy, colMain)
      setHex(img, x+10, cy, colMain); setHex(img, x+11, cy, colMain)
    end
    for cx = x+2, x+9 do
      setHex(img, cx, y, colHi); setHex(img, cx, y+1, colMain)
      setHex(img, cx, y+12, colMain); setHex(img, cx, y+13, colShadow)
    end
    setHex(img, x+1, y+1, colHi); setHex(img, x+10, y+1, colHi)
  elseif char == "T" then
    for cx = x, x+11 do
      setHex(img, cx, y, colHi); setHex(img, cx, y+1, colMain)
    end
    for cy = y+1, y+13 do
      setHex(img, x+5, cy, colMain); setHex(img, x+6, cy, colMain)
      setHex(img, x+6, cy, colShadow)
    end
  elseif char == "A" then
    for cy = y+2, y+13 do
      setHex(img, x, cy, colMain); setHex(img, x+1, cy, colMain)
      setHex(img, x+10, cy, colMain); setHex(img, x+11, cy, colMain)
    end
    for cx = x+2, x+9 do
      setHex(img, cx, y, colHi); setHex(img, cx, y+1, colMain)
      setHex(img, cx, y+7, colMain); setHex(img, cx, y+8, colShadow)
    end
    setHex(img, x+1, y+1, colHi); setHex(img, x+10, y+1, colHi)
  end
end

-- Draw Clan Chibi Sprite (~12x14 px)
local function drawClanMember(img, index, px, py, isPushing, isGreeting, isDissolving, dissProgress)
  if isDissolving and dissProgress >= 1.0 then return end

  local accentCol = ({ COL_ANIGAMI, COL_PIX, COL_HERTZ, COL_SILAS, COL_ETER, COL_NEXO })[index]

  local function p(dx, dy, hex)
    if isDissolving then
      -- Scatter particles based on dissProgress
      if (dx * 7 + dy * 13 + math.floor(dissProgress * 10)) % 3 == 0 then return end
      dx = dx + math.floor((math.sin(dy * 2 + dissProgress * 5)) * dissProgress * 4)
      dy = dy - math.floor(dissProgress * 6)
      hex = GOLD_SPARK
    end
    setHex(img, px + dx, py + dy, hex)
  end

  -- Feet / Shadow
  setHex(img, px - 2, py + 12, GROUND_DK, 120)
  setHex(img, px + 2, py + 12, GROUND_DK, 120)

  -- Body / Legs
  if isPushing then
    -- Leaning forward pushing
    p(-2, 10, COL_CLOTH); p(-1, 10, COL_CLOTH); p(2, 9, COL_CLOTH); p(3, 9, COL_CLOTH)
    p(-1, 6, COL_CLOTH); p(0, 6, COL_CLOTH); p(1, 6, COL_CLOTH)
    p(0, 5, COL_CLOTH); p(1, 5, COL_CLOTH); p(2, 5, COL_CLOTH)
    -- Pushing Arms outstretched to right
    p(2, 6, COL_SKIN); p(3, 6, COL_SKIN); p(4, 6, COL_SKIN)
    -- Head
    p(-1, 2, COL_SKIN); p(0, 2, COL_SKIN); p(1, 2, COL_SKIN)
    p(-1, 3, COL_SKIN); p(0, 3, COL_SKIN); p(1, 3, COL_SKIN)
    -- Role Item / Hat
    p(-2, 1, accentCol); p(-1, 1, accentCol); p(0, 1, accentCol); p(1, 1, accentCol)
  elseif isGreeting then
    -- Standing proud facing forward, waving or arm raised
    p(-1, 10, COL_CLOTH); p(1, 10, COL_CLOTH)
    p(-1, 9, COL_CLOTH); p(1, 9, COL_CLOTH)
    p(-1, 6, COL_CLOTH); p(0, 6, COL_CLOTH); p(1, 6, COL_CLOTH)
    p(-1, 7, COL_CLOTH); p(0, 7, COL_CLOTH); p(1, 7, COL_CLOTH)
    -- Greeting Arm Up
    p(2, 4, COL_SKIN); p(3, 3, COL_SKIN); p(3, 2, COL_SKIN)
    -- Head
    p(-1, 2, COL_SKIN); p(0, 2, COL_SKIN); p(1, 2, COL_SKIN)
    p(-1, 3, COL_SKIN); p(0, 3, COL_SKIN); p(1, 3, COL_SKIN)
    -- Hat/Accent
    p(-2, 1, accentCol); p(-1, 1, accentCol); p(0, 1, accentCol); p(1, 1, accentCol); p(2, 1, accentCol)
    -- Glint of courage
    setHex(img, px + 3, py + 1, WHITE, 200)
  end
end

local letters = { "U", "P", "R", "O", "T", "A" }

-- Build 10-frame animation
local sprAnim = Sprite(W, H)

for f = 1, num_frames do
  if f > 1 then sprAnim:newFrame() end
  local img = sprAnim.cels[f].image

  -- Background
  for y = 0, H - 1 do for x = 0, W - 1 do
    setHex(img, x, y, BG_DARK)
    if y >= 64 then setHex(img, x, y, GROUND_DK) end
    if y == 64 and (x % 4 == 0) then setHex(img, x, y, GROUND_HI) end
  end end

  -- Determine state based on frame
  -- f 1-4: Pushing in from left/right
  -- f 5: Impact / lock in place
  -- f 6-7: Greeting camera
  -- f 8-9: Dissolving to dust
  -- f 10: Clean logo shining with entry button prompt

  local isPushing = (f <= 4)
  local isImpact  = (f == 5)
  local isGreeting= (f == 6 or f == 7)
  local isDissolv = (f >= 8 and f <= 9)
  local isClean   = (f == 10)

  local progress = math.min(1.0, f / 4.5)

  for i = 1, 6 do
    local finalX = targetX[i]
    local startX = finalX - (7 - i) * 6 - (5 - f) * 8
    local curX = isPushing and math.floor(startX + (finalX - startX) * (f / 4)) or finalX

    -- Draw Letter
    local colM = isClean and AMBER_BASE or (isImpact and GOLD_SPARK or AMBER_BASE)
    local colS = isClean and AMBER_DK or AMBER_DK
    local colH = isClean and AMBER_HI or WHITE

    drawLetter(img, letters[i], curX, letterY, colM, colS, colH)

    -- Ground shadow under letter
    for sx = curX - 1, curX + 12 do
      setHex(img, sx, letterY + 14, GROUND_DK, 160)
    end

    -- Draw Clan Member
    if not isClean then
      local memberX = curX - 6
      local memberY = letterY + 1
      local dissProg = (f == 8) and 0.4 or ((f == 9) and 0.85 or 0)
      drawClanMember(img, i, memberX, memberY, isPushing, isGreeting, isDissolv, dissProg)
    end
  end

  -- Impact Sparks on Frame 5
  if isImpact then
    for i = 1, 5 do
      local sx = targetX[i] + 12
      setHex(img, sx, letterY + 4, WHITE); setHex(img, sx + 1, letterY + 3, GOLD_SPARK)
      setHex(img, sx - 1, letterY + 8, GOLD_SPARK); setHex(img, sx, letterY + 12, WHITE)
    end
  end

  -- Ambient Golden Glow on Frame 10 (Clean Title + Enter Prompt)
  if isClean then
    -- Subtitle: [ EL REFUGIO DEL NÁUFRAGO ]
    -- Prompt line: [ TOCAR PARA ENTRAR ]
    for x = 50, 110 do
      setHex(img, x, 72, AMBER_DK, 80)
      if (x + f) % 2 == 0 then setHex(img, x, 73, AMBER_BASE, 180) end
    end
  end

  sprAnim.frames[f].duration = (f == 5 or f == 7 or f == 10) and 0.25 or 0.12
end

-- Save multi-frame Aseprite file
sprAnim:saveCopyAs(baseDir .. "/assets/sprites/splash_cinematica/uprota_clan_intro_anim.aseprite")

-- Export Horizontal Spritesheet (1600x90 px)
local sprSheet = Sprite(W * num_frames, H)
local imgSheet = sprSheet.cels[1].image
for f = 1, num_frames do
  local imgF = sprAnim.cels[f].image
  for py = 0, H - 1 do for px = 0, W - 1 do
    imgSheet:drawPixel((f - 1) * W + px, py, imgF:getPixel(px, py))
  end end
end
sprSheet:saveCopyAs(baseDir .. "/assets/sprites/splash_cinematica/uprota_clan_intro_sheet.png")

-- 4x Preview of Spritesheet
local sprSheet4x = Sprite(sprSheet)
sprSheet4x:resize(W * num_frames * 4, H * 4)
sprSheet4x:saveCopyAs(baseDir .. "/assets/sprites/previews/preview_uprota_clan_intro_sheet_4x.png")
sprSheet4x:close()
sprSheet:close()

-- Save Individual Frames & 4x Preview of Climax Frame (Frame 6: Saludo)
for f = 1, num_frames do
  local sprF = Sprite(W, H)
  local imgF = sprF.cels[1].image
  local imgSource = sprAnim.cels[f].image
  for py = 0, H - 1 do for px = 0, W - 1 do
    imgF:drawPixel(px, py, imgSource:getPixel(px, py))
  end end
  sprF:saveCopyAs(baseDir .. string.format("/assets/sprites/splash_cinematica/uprota_clan_f%02d.png", f))

  if f == 6 then
    local spr4x = Sprite(sprF)
    spr4x:resize(W * 4, H * 4)
    spr4x:saveCopyAs(baseDir .. "/assets/sprites/previews/preview_uprota_clan_f06_saludo_4x.png")
    spr4x:close()
  elseif f == 10 then
    local spr4x = Sprite(sprF)
    spr4x:resize(W * 4, H * 4)
    spr4x:saveCopyAs(baseDir .. "/assets/sprites/previews/preview_uprota_clan_f10_titulo_limpio_4x.png")
    spr4x:close()
  end
  sprF:close()
end

sprAnim:close()
logFile:write("SUCCESS: UPROTA Clan Title Animation fully generated!\n")
logFile:close()