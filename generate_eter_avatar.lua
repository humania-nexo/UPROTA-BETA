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

local function saveAvatar(spr, name)
  spr:saveCopyAs(baseDir .. "/assets/sprites/avatars/" .. name .. ".aseprite")
  spr:saveCopyAs(baseDir .. "/assets/sprites/avatars/" .. name .. ".png")
  
  if spr.width == 44 then
    local spr32 = Sprite(spr)
    spr32:resize(32, 32)
    local name32 = name:gsub("_44x44", "_32x32")
    if name32 == name then name32 = name .. "_32x32" end
    spr32:saveCopyAs(baseDir .. "/assets/sprites/avatars/" .. name32 .. ".aseprite")
    spr32:saveCopyAs(baseDir .. "/assets/sprites/avatars/" .. name32 .. ".png")
    spr32:close()
  end
  spr:close()
end

----------------------------------------------------------------------
-- AVATAR DE ÉTER (ESTRATEGA DE DIFUSIÓN & ENLACE TRANSMEDIA) (44x44 px)
----------------------------------------------------------------------
do
  local spr = Sprite(44, 44); local img = spr.cels[1].image
  local BG_DARK    = "#08131a" -- Deep atmospheric ether dark blue
  local COAT_DK    = "#1e293b" -- Slate charcoal overcoat
  local COAT_MD    = "#334155"
  local COAT_HI    = "#475569"
  local SCARF      = "#f1f5f9" -- Dust scarf
  local ETHER_CYAN = "#4ef2d2" -- Signature Eter neon turquoise
  local ETHER_HI   = "#ffffff"
  local ETHER_DK   = "#0d9488"
  local AMBER      = "#f59e0b" -- Signal spark amber
  local COPPER     = "#d97706" -- Antenna coil copper
  local SKIN_HI    = "#fed7aa"
  local SKIN_MD    = "#fb923c"

  -- Circular Frame Background with subtle ether glow
  for y = 0, 43 do for x = 0, 43 do
    local d = math.sqrt((x - 22)^2 + (y - 22)^2)
    if d <= 21.5 then
      setHex(img, x, y, (d <= 18) and BG_DARK or "#115e59")
    end
  end end

  -- Backpack Transceiver Antenna & Tesla Coil Mast (Right Shoulder X: 27 to 33, Y: 3 to 22)
  for y = 4, 22 do setHex(img, 30, y, "#94a3b8") end -- Main mast rod
  -- Copper Tesla Coil winding around antenna
  setHex(img, 29, 8, COPPER); setHex(img, 30, 8, COPPER); setHex(img, 31, 8, COPPER)
  setHex(img, 29, 11, COPPER); setHex(img, 30, 11, COPPER); setHex(img, 31, 11, COPPER)
  setHex(img, 29, 14, COPPER); setHex(img, 30, 14, COPPER); setHex(img, 31, 14, COPPER)
  -- Antenna Emitter Tip with Radiant Ether Energy Node
  setHex(img, 30, 3, ETHER_HI)
  setHex(img, 29, 3, ETHER_CYAN); setHex(img, 31, 3, ETHER_CYAN)
  setHex(img, 30, 2, ETHER_CYAN); setHex(img, 30, 4, ETHER_CYAN)
  -- Radiating Pulse Wave Sparks
  setHex(img, 33, 2, AMBER); setHex(img, 27, 2, AMBER)
  setHex(img, 35, 4, ETHER_CYAN, 180); setHex(img, 25, 4, ETHER_CYAN, 180)

  -- Head & Explorer Beret / Headset Cap (Y: 7 to 20, X: 14 to 28)
  for y = 7, 12 do for x = 15, 27 do
    setHex(img, x, y, (y <= 8) and COAT_HI or COAT_MD)
  end end
  setHex(img, 14, 10, COAT_HI); setHex(img, 28, 10, COAT_HI)

  -- Face & Weathered Skin (Y: 12 to 20, X: 16 to 26)
  for y = 13, 19 do for x = 16, 26 do
    setHex(img, x, y, (x <= 20) and SKIN_HI or SKIN_MD)
  end end

  -- Frequency Tuning Cyber-Visor / Broadcaster Goggles (Y: 12 to 16, X: 15 to 27)
  for y = 13, 15 do
    for x = 15, 27 do
      local isBorder = (x == 15 or x == 27 or y == 13 or y == 15 or x == 21)
      setHex(img, x, y, isBorder and "#0f172a" or ETHER_CYAN)
    end
  end
  setHex(img, 18, 14, ETHER_HI); setHex(img, 24, 14, ETHER_HI) -- Visor reflections
  setHex(img, 19, 14, AMBER); setHex(img, 25, 14, AMBER) -- Data readout dot

  -- Radio Headset Mic Boom curving to mouth (X: 13 to 22, Y: 17 to 20)
  setHex(img, 14, 15, "#0f172a"); setHex(img, 13, 16, "#0f172a"); setHex(img, 14, 18, "#94a3b8")
  setHex(img, 15, 19, "#94a3b8"); setHex(img, 16, 19, ETHER_CYAN) -- Mic capsule

  -- Explorer Dust Scarf around Neck (Y: 20 to 25, X: 15 to 28)
  for y = 20, 24 do
    for x = 16, 27 do setHex(img, x, y, ((x + y) % 2 == 0) and SCARF or "#cbd5e1") end
  end
  setHex(img, 18, 25, SCARF); setHex(img, 19, 26, "#94a3b8") -- Scarf tail

  -- Charcoal Duster / Weathered Greatcoat (Y: 25 to 40, X: 9 to 35)
  for y = 25, 39 do
    for x = 10, 34 do
      setHex(img, x, y, (x <= 18) and COAT_MD or COAT_DK)
    end
  end
  -- Coat Lapels & Brass Snap Buttons
  setHex(img, 18, 28, AMBER); setHex(img, 18, 33, AMBER); setHex(img, 18, 38, AMBER)
  setHex(img, 25, 28, AMBER); setHex(img, 25, 33, AMBER); setHex(img, 25, 38, AMBER)

  -- Raised Left Hand holding Field Signal Flare / Broadcast Wand (Left side X: 8 to 14, Y: 22 to 34)
  for y = 28, 33 do setHex(img, 10, y, COAT_MD) end
  setHex(img, 9, 26, SKIN_HI); setHex(img, 10, 26, SKIN_MD) -- Hand
  -- Signal Flare / Broadcast Wand pointing upward
  for y = 19, 25 do setHex(img, 9, y, "#0f172a") end
  setHex(img, 9, 18, AMBER); setHex(img, 9, 17, ETHER_HI)
  -- Flare Beacon Light Burst
  setHex(img, 8, 17, ETHER_CYAN); setHex(img, 10, 17, ETHER_CYAN)
  setHex(img, 9, 16, ETHER_CYAN); setHex(img, 7, 16, AMBER, 180); setHex(img, 11, 16, AMBER, 180)

  saveAvatar(spr, "avatar_eter_44x44")
end