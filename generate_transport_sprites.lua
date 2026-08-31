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
-- 1. BICICLETA DE EXPEDICIÓN CON ALFORJAS (48x32 px - 35 kg)
----------------------------------------------------------------------
do
  local spr = Sprite(48, 32); local img = spr.cels[1].image
  local FRAME_RED = "#dc2626"
  local FRAME_DK  = "#991b1b"
  local STEEL_HI  = "#f1f5f9"
  local STEEL_MD  = "#94a3b8"
  local STEEL_DK  = "#334155"
  local TIRE_BK   = "#18181b"
  local PANNIER   = "#b45309" -- Waxed canvas brown panniers
  local PANNIER_DK= "#78350f"
  local DYNAMO_G  = "#facc15"

  -- Rear Wheel (Center at 11, 21, radius ~ 7)
  for y = 14, 28 do for x = 4, 18 do
    local d = math.sqrt((x - 11)^2 + (y - 21)^2)
    if d <= 7.2 and d >= 5.5 then setHex(img, x, y, TIRE_BK)
    elseif d < 5.5 and d >= 4.5 then setHex(img, x, y, STEEL_MD) -- Rim
    elseif d < 1.5 then setHex(img, x, y, STEEL_HI) end -- Hub
  end end
  -- Spokes
  setHex(img, 11, 17, STEEL_MD); setHex(img, 11, 25, STEEL_MD)
  setHex(img, 7, 21, STEEL_MD); setHex(img, 15, 21, STEEL_MD)

  -- Front Wheel (Center at 35, 21, radius ~ 7)
  for y = 14, 28 do for x = 28, 42 do
    local d = math.sqrt((x - 35)^2 + (y - 21)^2)
    if d <= 7.2 and d >= 5.5 then setHex(img, x, y, TIRE_BK)
    elseif d < 5.5 and d >= 4.5 then setHex(img, x, y, STEEL_MD)
    elseif d < 1.5 then setHex(img, x, y, STEEL_HI) end
  end end
  -- Spokes
  setHex(img, 35, 17, STEEL_MD); setHex(img, 35, 25, STEEL_MD)
  setHex(img, 31, 21, STEEL_MD); setHex(img, 39, 21, STEEL_MD)

  -- Bottom Bracket & Pedals / Crankset (Center at 22, 23)
  setHex(img, 22, 23, STEEL_HI); setHex(img, 21, 22, STEEL_DK); setHex(img, 23, 24, STEEL_DK)
  -- Chain running from rear hub to crank
  for x = 11, 22 do setHex(img, x, 22, STEEL_DK) end

  -- Steel Diamond Frame Tubes
  -- Seat stay (Rear hub 11,21 to Seat lug 21,12)
  for i = 0, 10 do
    setHex(img, 11 + i, 21 - math.floor(i * 0.9), FRAME_RED)
    setHex(img, 11 + i, 22 - math.floor(i * 0.9), FRAME_DK)
  end
  -- Chain stay (Rear hub 11,21 to Bottom bracket 22,23)
  for x = 11, 22 do setHex(img, x, 22, FRAME_RED) end
  -- Seat tube (Bottom bracket 22,23 to Seat lug 21,12)
  for y = 12, 23 do setHex(img, 21, y, FRAME_RED); setHex(img, 22, y, FRAME_DK) end
  -- Top tube (Seat lug 21,12 to Head tube 33,10)
  for i = 0, 12 do
    setHex(img, 21 + i, 12 - math.floor(i * 0.16), FRAME_RED)
    setHex(img, 21 + i, 13 - math.floor(i * 0.16), FRAME_DK)
  end
  -- Down tube (Bottom bracket 22,23 to Head tube 33,10)
  for i = 0, 11 do
    setHex(img, 22 + i, 23 - math.floor(i * 1.1), FRAME_RED)
    setHex(img, 22 + i, 24 - math.floor(i * 1.1), FRAME_DK)
  end
  -- Front Fork (Head tube 33,10 down to Front hub 35,21)
  for i = 0, 11 do
    setHex(img, 33 + math.floor(i * 0.18), 10 + i, STEEL_MD)
  end

  -- Saddle & Seatpost (X: 18 to 23, Y: 8 to 11)
  for y = 10, 12 do setHex(img, 21, y, STEEL_HI) end
  for x = 18, 23 do setHex(img, x, 9, (x <= 20) and "#78350f" or "#451a03") end -- Leather saddle

  -- Stem, Handlebars & Grips (X: 32 to 36, Y: 5 to 9)
  for y = 7, 10 do setHex(img, 33, y, STEEL_HI) end
  for x = 31, 35 do setHex(img, x, 6, STEEL_HI) end
  setHex(img, 30, 7, "#0f172a"); setHex(img, 36, 7, "#0f172a") -- Rubber grips

  -- Dynamo Headlight on Front Fork (X: 36 to 38, Y: 10 to 12)
  setHex(img, 36, 11, STEEL_DK); setHex(img, 37, 11, DYNAMO_G); setHex(img, 38, 11, "#ffffff")
  -- Light beam rays
  setHex(img, 40, 10, DYNAMO_G, 160); setHex(img, 41, 11, DYNAMO_G, 160); setHex(img, 40, 12, DYNAMO_G, 160)

  -- Heavy Double Waxed-Canvas Panniers over Rear Rack (X: 7 to 15, Y: 12 to 20)
  for y = 13, 20 do
    for x = 7, 15 do
      if x == 7 or x == 15 or y == 20 then setHex(img, x, y, "#451a03")
      else setHex(img, x, y, (x <= 11) and PANNIER or PANNIER_DK) end
    end
  end
  -- Brass buckles on pannier straps
  setHex(img, 9, 16, "#facc15"); setHex(img, 13, 16, "#facc15")

  -- Machete Scabbard strapped to top tube (X: 23 to 30, Y: 11)
  for x = 24, 30 do setHex(img, x, 11, "#78350f") end
  setHex(img, 23, 10, "#ca8a04") -- Handle

  saveDual(spr, "item_bici_expedicion", "items", "ui")
end

----------------------------------------------------------------------
-- 2. CARRITO TRAILER / REMOLQUE DE CARGA PESADA (48x32 px - 85 kg)
----------------------------------------------------------------------
do
  local spr = Sprite(48, 32); local img = spr.cels[1].image
  local WOOD_HI  = "#d97706"
  local WOOD_MD  = "#b45309"
  local WOOD_DK  = "#78350f"
  local STEEL_HI = "#cbd5e1"
  local STEEL_DK = "#334155"
  local TIRE_BK  = "#18181b"
  local BARREL_B = "#0284c7"

  -- Trailer Wheel (Center at 18, 23, radius ~ 6)
  for y = 17, 29 do for x = 12, 24 do
    local d = math.sqrt((x - 18)^2 + (y - 23)^2)
    if d <= 6.2 and d >= 4.8 then setHex(img, x, y, TIRE_BK)
    elseif d < 4.8 and d >= 3.8 then setHex(img, x, y, STEEL_DK)
    elseif d < 1.5 then setHex(img, x, y, STEEL_HI) end
  end end

  -- Steel Tubular Chassis & Cargo Bed (X: 4 to 32, Y: 14 to 24)
  for x = 4, 32 do
    setHex(img, x, 21, STEEL_DK); setHex(img, x, 22, "#0f172a")
  end

  -- Reinforced Wooden Pallet Crate Body (X: 5 to 31, Y: 13 to 21)
  for y = 13, 20 do
    for x = 5, 31 do
      local isMetalEdge = (x == 5 or x == 31 or x == 18 or y == 20)
      if isMetalEdge then
        setHex(img, x, y, STEEL_DK)
      else
        local isSlit = (y == 16)
        setHex(img, x, y, isSlit and "#451a03" or (((x + y) % 2 == 0) and WOOD_HI or WOOD_MD))
      end
    end
  end

  -- Heavy Cargo Loaded Inside:
  -- 1. Blue 50L Water Barrel on Left (X: 7 to 14, Y: 8 to 14)
  for y = 8, 14 do
    for x = 7, 14 do
      if x == 7 or x == 14 or y == 8 then setHex(img, x, y, "#0f172a")
      else setHex(img, x, y, (x <= 10) and "#38bdf8" or BARREL_B) end
    end
  end
  setHex(img, 10, 7, "#f1f5f9"); setHex(img, 11, 7, "#f1f5f9") -- Cap

  -- 2. Stack of Reclaimed Lumber Planks in Middle (X: 16 to 28, Y: 9 to 14)
  for y = 9, 13 do
    for x = 16, 28 do
      setHex(img, x, y, (y % 2 == 0) and WOOD_HI or WOOD_DK)
    end
  end
  -- Tie-down yellow rope securing planks
  setHex(img, 20, 8, "#facc15"); setHex(img, 20, 9, "#facc15"); setHex(img, 20, 14, "#facc15")
  setHex(img, 25, 8, "#facc15"); setHex(img, 25, 9, "#facc15"); setHex(img, 25, 14, "#facc15")

  -- Long Steel Towbar / Hitch Arm extending to Right (X: 32 to 46, Y: 12 to 21)
  -- Diagonal drawbar tube
  for i = 0, 12 do
    local tx = 32 + i; local ty = 21 - math.floor(i * 0.7)
    setHex(img, tx, ty, STEEL_HI); setHex(img, tx, ty+1, STEEL_DK)
  end
  -- Articulated Seatpost Hitch Swivel Coupling at tip (X: 44 to 46, Y: 11 to 13)
  setHex(img, 45, 11, "#facc15"); setHex(img, 45, 12, STEEL_HI); setHex(img, 46, 12, STEEL_DK)

  saveDual(spr, "item_trailer_remolque", "items", "ui")
end

----------------------------------------------------------------------
-- 3. COMBO BICI + TRAILER COMPLETO DE EXPEDICIÓN (64x32 px)
----------------------------------------------------------------------
do
  local spr = Sprite(64, 32); local img = spr.cels[1].image
  local FRAME_RED = "#dc2626"
  local STEEL_HI  = "#f1f5f9"
  local STEEL_MD  = "#94a3b8"
  local STEEL_DK  = "#334155"
  local TIRE_BK   = "#18181b"
  local WOOD_HI   = "#d97706"
  local WOOD_DK   = "#78350f"
  local PANNIER   = "#b45309"
  local BARREL_B  = "#0284c7"

  -- TRAILER SECTION ON LEFT (X: 2 to 34, Y: 8 to 28)
  -- Trailer Wheel (Center at 14, 22, radius ~ 5.5)
  for y = 17, 27 do for x = 9, 19 do
    local d = math.sqrt((x - 14)^2 + (y - 22)^2)
    if d <= 5.5 and d >= 4.0 then setHex(img, x, y, TIRE_BK)
    elseif d < 4.0 and d >= 3.0 then setHex(img, x, y, STEEL_DK)
    elseif d < 1.5 then setHex(img, x, y, STEEL_HI) end
  end end

  -- Trailer Crate Body (X: 3 to 25, Y: 13 to 20)
  for y = 13, 20 do
    for x = 3, 25 do
      if x == 3 or x == 25 or y == 20 then setHex(img, x, y, STEEL_DK)
      else setHex(img, x, y, (y % 2 == 0) and WOOD_HI or WOOD_DK) end
    end
  end

  -- Barrel & Lumber Cargo in Trailer
  for y = 9, 13 do for x = 5, 11 do setHex(img, x, y, (x <= 8) and "#38bdf8" or BARREL_B) end end -- Barrel
  for y = 10, 13 do for x = 14, 23 do setHex(img, x, y, (y % 2 == 0) and WOOD_HI or WOOD_DK) end end -- Planks

  -- Towbar Hitch Arm connecting from trailer (25, 20) to bike seatpost (38, 12)
  for i = 0, 13 do
    local hx = 25 + i; local hy = 20 - math.floor(i * 0.6)
    setHex(img, hx, hy, STEEL_HI); setHex(img, hx, hy+1, STEEL_DK)
  end
  setHex(img, 38, 12, "#facc15") -- Hitch clamp

  -- BICYCLE SECTION ON RIGHT (X: 30 to 62, Y: 5 to 28)
  -- Bike Rear Wheel (Center at 34, 22)
  for y = 16, 28 do for x = 28, 40 do
    local d = math.sqrt((x - 34)^2 + (y - 22)^2)
    if d <= 6.2 and d >= 4.8 then setHex(img, x, y, TIRE_BK)
    elseif d < 4.8 and d >= 3.8 then setHex(img, x, y, STEEL_DK)
    elseif d < 1.5 then setHex(img, x, y, STEEL_HI) end
  end end

  -- Bike Front Wheel (Center at 54, 22)
  for y = 16, 28 do for x = 48, 60 do
    local d = math.sqrt((x - 54)^2 + (y - 22)^2)
    if d <= 6.2 and d >= 4.8 then setHex(img, x, y, TIRE_BK)
    elseif d < 4.8 and d >= 3.8 then setHex(img, x, y, STEEL_DK)
    elseif d < 1.5 then setHex(img, x, y, STEEL_HI) end
  end end

  -- Bike Frame Tubes (Diamond)
  -- Rear stays
  for i = 0, 8 do setHex(img, 34 + i, 22 - math.floor(i * 1.1), FRAME_RED) end
  for x = 34, 43 do setHex(img, x, 23, FRAME_RED) end
  -- Seat tube
  for y = 12, 23 do setHex(img, 42, y, FRAME_RED) end
  -- Top tube
  for x = 42, 52 do setHex(img, x, 12, FRAME_RED) end
  -- Down tube
  for i = 0, 10 do setHex(img, 42 + i, 23 - math.floor(i * 1.1), FRAME_RED) end
  -- Front fork
  for i = 0, 10 do setHex(img, 52 + math.floor(i*0.2), 12 + i, STEEL_MD) end

  -- Saddle
  for x = 40, 44 do setHex(img, x, 10, "#78350f") end
  -- Handlebars & Grips
  for y = 8, 12 do setHex(img, 52, y, STEEL_HI) end
  for x = 50, 54 do setHex(img, x, 8, STEEL_HI) end
  setHex(img, 49, 9, "#0f172a"); setHex(img, 55, 9, "#0f172a")

  -- Dynamo Headlight
  setHex(img, 55, 12, "#facc15"); setHex(img, 56, 12, "#ffffff")
  setHex(img, 58, 12, "#fde047", 160)

  -- Pannier Bags on Bike
  for y = 14, 20 do for x = 32, 38 do setHex(img, x, y, PANNIER) end end
  setHex(img, 34, 17, "#facc15"); setHex(img, 36, 17, "#facc15")

  saveDual(spr, "ui_transporte_bici_trailer_combo", "ui", "refugio")
end