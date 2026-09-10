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

local baseDir = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites"

local function saveDual(spr, name, f1, f2)
  spr:saveCopyAs(baseDir .. "/" .. f1 .. "/" .. name .. ".aseprite")
  spr:saveCopyAs(baseDir .. "/" .. f1 .. "/" .. name .. ".png")
  if f2 then
    spr:saveCopyAs(baseDir .. "/" .. f2 .. "/" .. name .. ".aseprite")
    spr:saveCopyAs(baseDir .. "/" .. f2 .. "/" .. name .. ".png")
  end
  spr:close()
end

----------------------------------------------------------------------
-- 1. CUADERNO DEL NÁUFRAGO (24x24 px)
----------------------------------------------------------------------
do
  local spr = Sprite(24, 24); local img = spr.cels[1].image
  local LEATHER_HI = "#b45309"
  local LEATHER_MD = "#78350f"
  local LEATHER_DK = "#451a03"
  local PAPER_EDGE = "#fef08a"
  local ROPE       = "#facc15"
  local RIBBON     = "#ef4444"

  -- Leather Journal Cover & Spine (X: 4 to 19, Y: 3 to 21)
  for y = 3, 20 do
    for x = 4, 19 do
      if x == 4 or x == 19 or y == 3 or y == 20 then setHex(img, x, y, LEATHER_DK)
      elseif x == 18 then setHex(img, x, y, PAPER_EDGE) -- Gilded paper pages edge
      else setHex(img, x, y, (x <= 7) and LEATHER_DK or ((x <= 11) and LEATHER_MD or LEATHER_HI)) end
    end
  end

  -- Hemp Rope Spine Binding Cross-Stitches (X: 4 to 6, Y: 5 to 18)
  for y = 5, 18, 3 do
    setHex(img, 4, y, ROPE); setHex(img, 5, y+1, ROPE); setHex(img, 4, y+2, ROPE)
  end

  -- Embossed Anchor / Compass Rose Glint on Center Cover (X: 11 to 15, Y: 9 to 14)
  setHex(img, 13, 9, "#ca8a04"); setHex(img, 13, 10, "#fde047"); setHex(img, 13, 11, "#ffffff"); setHex(img, 13, 12, "#ca8a04")
  setHex(img, 11, 11, "#ca8a04"); setHex(img, 12, 11, "#fde047"); setHex(img, 14, 11, "#fde047"); setHex(img, 15, 11, "#ca8a04")

  -- Silk Red Bookmark Ribbon hanging from bottom (X: 12 to 14, Y: 19 to 23)
  setHex(img, 13, 19, RIBBON); setHex(img, 13, 20, RIBBON); setHex(img, 14, 21, RIBBON); setHex(img, 14, 22, "#b91c1c")

  saveDual(spr, "item_cuaderno_naufrago", "items", "ui")
end

----------------------------------------------------------------------
-- 2. CÁPSULA DE TIEMPO SELLADA (24x24 px)
----------------------------------------------------------------------
do
  local spr = Sprite(24, 24); local img = spr.cels[1].image
  local BRASS_HI = "#fde047"
  local BRASS_MD = "#ca8a04"
  local BRASS_DK = "#78350f"
  local WAX_RED  = "#dc2626"
  local WAX_DK   = "#991b1b"
  local GLASS_B  = "#38bdf8"

  -- Diagonal Cylindrical Brass Time Capsule Tube (from 6,18 to 18,6)
  -- Main Brass Cylinder Tube Body
  for i = 0, 11 do
    local cx = 6 + i; local cy = 18 - i
    setHex(img, cx, cy, BRASS_MD)
    setHex(img, cx+1, cy, BRASS_HI)
    setHex(img, cx, cy+1, BRASS_DK)
    setHex(img, cx-1, cy+1, BRASS_DK)
    setHex(img, cx+1, cy-1, BRASS_HI)
    setHex(img, cx+2, cy-1, BRASS_DK)
  end

  -- Central Glass Viewing Chamber / Scroll Window (Center from 10,14 to 14,10)
  for i = 0, 4 do
    local cx = 10 + i; local cy = 14 - i
    setHex(img, cx, cy, "#fef08a") -- Parchment letter inside
    setHex(img, cx+1, cy-1, GLASS_B, 180) -- Glass reflection
  end

  -- Bottom Threaded Brass Cap (X: 4 to 7, Y: 18 to 21)
  setHex(img, 4, 20, BRASS_DK); setHex(img, 5, 20, BRASS_MD); setHex(img, 6, 21, BRASS_DK)
  setHex(img, 5, 19, BRASS_HI); setHex(img, 6, 19, BRASS_HI)

  -- Top Hermetic Red Wax Seal & Stamp (X: 16 to 21, Y: 3 to 8)
  for y = 4, 7 do
    for x = 17, 20 do
      setHex(img, x, y, (x == 17 or y == 4) and "#ef4444" or WAX_RED)
    end
  end
  setHex(img, 18, 5, "#ffffff") -- Wax highlight
  setHex(img, 21, 6, WAX_DK); setHex(img, 20, 8, WAX_DK); setHex(img, 19, 8, WAX_DK) -- Wax drip

  -- Hourglass Stamp Icon on Wax (18,5 to 19,6)
  setHex(img, 18, 6, "#7f1d1d"); setHex(img, 19, 5, "#7f1d1d")

  saveDual(spr, "ui_capsula_tiempo_sellada", "ui", "items")
end