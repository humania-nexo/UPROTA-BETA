local logFile = io.open("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/farol_log.txt", "w")
logFile:write("Starting farol generation...\n")

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
local width = 32
local height = 32
local num_frames = 6

local C_DARK   = "#0f172a"
local C_SLATE  = "#334155"
local C_BRASS  = "#94a3b8"
local C_GOLD   = "#f59e0b"
local C_AMBER  = "#d97706"
local C_HOT    = "#fef08a"
local C_GLASS  = "#38bdf8"
local C_WHITE  = "#ffffff"

local flame_anim = {
  { cy=19, h=5, w=3, tip_dx=0, tip_dy=-3 },
  { cy=19, h=6, w=3, tip_dx=1, tip_dy=-4 },
  { cy=19, h=5, w=4, tip_dx=0, tip_dy=-3 },
  { cy=19, h=6, w=3, tip_dx=-1, tip_dy=-4 },
  { cy=19, h=7, w=3, tip_dx=0, tip_dy=-5 },
  { cy=19, h=5, w=3, tip_dx=1, tip_dy=-3 },
}

local ember_pts = {
  { {14,13}, {17,10} },
  { {13,11}, {18,8} },
  { {15,9}, {17,6} },
  { {16,12}, {14,7} },
  { {17,10}, {13,5} },
  { {15,12}, {18,11} },
}

local function renderFarolFrame(f)
  local spr = Sprite(width, height)
  local img = spr.cels[1].image

  -- 1. Glow
  for dy = -10, 10 do for dx = -10, 10 do
    local dist = math.sqrt(dx*dx + dy*dy)
    local px, py = 15 + dx, 19 + dy
    if dist < 4.5 then
      setHex(img, px, py, C_GOLD, 90)
    elseif dist < 8.5 and (px + py) % 2 == 0 then
      setHex(img, px, py, C_GOLD, 40)
    elseif dist < 11.0 and px % 2 == 0 and py % 2 == 0 then
      setHex(img, px, py, C_GOLD, 25)
    end
  end end

  -- 2. Metal Cage & Chain
  local sway = math.sin(f * (math.pi / 3)) * 0.6
  for y = 2, 7 do
    local cx = math.floor(15 + sway * ((y-2)/5))
    setHex(img, cx, y, (y%2==0) and C_DARK or C_BRASS)
  end
  for x = 13, 17 do setHex(img, x, 8, C_DARK) end
  for x = 12, 18 do setHex(img, x, 9, C_BRASS) end
  for x = 11, 19 do setHex(img, x, 10, C_SLATE) end
  for x = 10, 20 do setHex(img, x, 11, C_DARK) end

  -- Glass Chamber
  for y = 12, 22 do for x = 11, 19 do
    setHex(img, x, y, C_GLASS, 45)
  end end
  setHex(img, 12, 13, C_WHITE, 120); setHex(img, 13, 14, C_WHITE, 120)
  setHex(img, 12, 17, C_WHITE, 90); setHex(img, 13, 18, C_WHITE, 90)

  for y = 12, 22 do
    setHex(img, 10, y, C_DARK); setHex(img, 11, y, C_BRASS)
    setHex(img, 19, y, C_SLATE); setHex(img, 20, y, C_DARK)
  end

  for x = 10, 20 do setHex(img, x, 23, C_DARK) end
  for x = 9, 21 do setHex(img, x, 24, C_BRASS) end
  for x = 9, 21 do setHex(img, x, 25, C_SLATE) end
  for x = 10, 20 do setHex(img, x, 26, C_DARK) end
  for x = 12, 18 do setHex(img, x, 27, C_DARK) end

  -- 3. Flame
  local fl = flame_anim[f]
  for dy = 0, fl.h do
    local sp = math.max(1, math.floor(fl.w * (1 - (dy / fl.h))))
    for dx = -sp, sp do setHex(img, 15 + dx, fl.cy - dy, C_AMBER) end
  end
  for dy = 0, fl.h - 1 do
    local sp = math.max(0, math.floor((fl.w - 1) * (1 - (dy / (fl.h - 1)))))
    for dx = -sp, sp do setHex(img, 15 + dx, fl.cy - dy, C_GOLD) end
  end
  for dy = 0, math.floor(fl.h / 2) do
    setHex(img, 15, fl.cy - dy, C_HOT)
    if dy <= 1 then
      setHex(img, 14, fl.cy - dy, C_HOT)
      setHex(img, 16, fl.cy - dy, C_HOT)
    end
  end
  setHex(img, 15, fl.cy, C_WHITE)
  setHex(img, 15 + fl.tip_dx, fl.cy + fl.tip_dy, C_GOLD)

  -- 4. Embers
  for _, pt in ipairs(ember_pts[f]) do
    setHex(img, pt[1], pt[2], C_HOT, 240)
  end

  return spr
end

local ok, err = pcall(function()
  -- Build Spritesheet
  local sprSheet = Sprite(width * num_frames, height)
  local imgSheet = sprSheet.cels[1].image

  for f = 1, num_frames do
    local sprF = renderFarolFrame(f)
    local imgF = sprF.cels[1].image
    for py = 0, height - 1 do for px = 0, width - 1 do
      local col = imgF:getPixel(px, py)
      imgSheet:drawPixel((f - 1) * width + px, py, col)
    end end
    sprF:saveCopyAs(baseDir .. string.format("/assets/sprites/props/farol_naufrago_f%02d.png", f))
    sprF:saveCopyAs(baseDir .. string.format("/assets/sprites/props/farol_naufrago_f%02d.aseprite", f))
    if f == 1 then
      local spr4x = Sprite(sprF)
      spr4x:resize(width * 4, height * 4)
      spr4x:saveCopyAs(baseDir .. "/assets/sprites/previews/preview_farol_naufrago_f1_4x.png")
      spr4x:close()
    end
    sprF:close()
  end

  sprSheet:saveCopyAs(baseDir .. "/assets/sprites/props/farol_naufrago_sheet.png")
  sprSheet:saveCopyAs(baseDir .. "/assets/sprites/props/farol_naufrago_sheet.aseprite")

  local sprSheet4x = Sprite(sprSheet)
  sprSheet4x:resize(width * num_frames * 4, height * 4)
  sprSheet4x:saveCopyAs(baseDir .. "/assets/sprites/previews/preview_farol_naufrago_sheet_4x.png")
  sprSheet4x:close()
  sprSheet:close()
end)

if not ok then
  logFile:write("ERROR: " .. tostring(err) .. "\n")
else
  logFile:write("SUCCESS: All files written!\n")
end
logFile:close()