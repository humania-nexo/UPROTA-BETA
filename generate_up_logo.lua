local function setPx(img, x, y, r, g, b, a)
  a = a or 255
  if x >= 0 and x < img.width and y >= 0 and y < img.height then
    img:drawPixel(x, y, app.pixelColor.rgba(r, g, b, a))
  end
end

local function hex2rgb(hex)
  hex = tostring(hex):gsub("#","")
  return tonumber("0x"..hex:sub(1,2)) or 0, tonumber("0x"..hex:sub(3,4)) or 0, tonumber("0x"..hex:sub(5,6)) or 0
end

local function setHex(img, x, y, hex, a)
  local r, g, b = hex2rgb(hex)
  setPx(img, x, y, r, g, b, a or 255)
end

local baseDir = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA"

-- 1. Base 32x32 Master Grid for "UP" Minimalist Monogram
-- BG: #0f172a (Dark Slate), FG: #f59e0b (Warm Amber Gold)
local BG_COLOR = "#0f172a"
local FG_COLOR = "#f59e0b"
local FG_LIGHT = "#fbbf24"

local spr32 = Sprite(32, 32); local img32 = spr32.cels[1].image

-- Rounded Square / Squircle flat base
for y = 0, 31 do
  for x = 0, 31 do
    local isCorner = (x <= 2 and y <= 2) or (x >= 29 and y <= 2) or (x <= 2 and y >= 29) or (x >= 29 and y >= 29)
    if not ( (x == 0 and y == 0) or (x == 31 and y == 0) or (x == 0 and y == 31) or (x == 31 and y == 31) ) then
      setHex(img32, x, y, BG_COLOR)
    end
  end
end

-- Letter "U" (Left column X: 5 to 14, Y: 8 to 23)
-- Left stem
for y = 8, 20 do for x = 6, 9 do setHex(img32, x, y, FG_COLOR) end end
-- Right stem
for y = 8, 20 do for x = 11, 14 do setHex(img32, x, y, FG_COLOR) end end
-- Bottom curve of U
for y = 20, 23 do for x = 6, 14 do setHex(img32, x, y, FG_COLOR) end end
for y = 8, 19 do for x = 10, 10 do setHex(img32, x, y, BG_COLOR) end end -- Inside cutout

-- Letter "P" (Right column X: 17 to 26, Y: 8 to 23)
-- Left vertical stem of P (goes all the way down)
for y = 8, 23 do for x = 17, 20 do setHex(img32, x, y, FG_COLOR) end end
-- Upper loop of P (X: 20 to 26, Y: 8 to 16)
for y = 8, 16 do for x = 20, 26 do setHex(img32, x, y, FG_COLOR) end end
-- Inside cutout of P loop
for y = 11, 13 do for x = 21, 23 do setHex(img32, x, y, BG_COLOR) end end

-- Subtle Upward Chevron / Arrow glint on the top of the P / U connection (Symbolizing "UP" / Ascending)
setHex(img32, 10, 7, FG_LIGHT); setHex(img32, 17, 7, FG_LIGHT)

-- Save 32x32 Favicon
spr32:saveCopyAs(baseDir .. "/favicon.png")
spr32:saveCopyAs(baseDir .. "/favicon.ico")

-- Save 4x Preview (128x128)
local sprPrev = Sprite(spr32)
sprPrev:resize(128, 128)
sprPrev:saveCopyAs(baseDir .. "/assets/sprites/previews/preview_logo_up_minimalist_4x.png")
sprPrev:close()

-- 192x192 PWA Icon
local spr192 = Sprite(spr32)
spr192:resize(192, 192)
spr192:saveCopyAs(baseDir .. "/assets/icons/icon-192.png")
spr192:saveCopyAs(baseDir .. "/assets/sprites/ui/logo_uprota.png")
spr192:close()

-- 512x512 PWA Splash Icon
local spr512 = Sprite(spr32)
spr512:resize(512, 512)
spr512:saveCopyAs(baseDir .. "/assets/icons/icon-512.png")
spr512:close()

spr32:close()