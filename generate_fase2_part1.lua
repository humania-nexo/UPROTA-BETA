local function setPx(img, x, y, r, g, b, a)
  a = a or 255
  if x >= 0 and x < img.width and y >= 0 and y < img.height then
    img:drawPixel(x, y, app.pixelColor.rgba(r, g, b, a))
  end
end

local function hex2rgb(hex)
  hex = hex:gsub("#","")
  return tonumber("0x"..hex:sub(1,2)), tonumber("0x"..hex:sub(3,4)), tonumber("0x"..hex:sub(5,6))
end

local function setHex(img, x, y, hex, a)
  local r, g, b = hex2rgb(hex)
  setPx(img, x, y, r, g, b, a or 255)
end

local dirFondos = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/fondos"
local dirUI = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/ui"

local function saveFondo(spr, name)
  spr:saveCopyAs(dirFondos .. "/" .. name .. ".aseprite")
  spr:saveCopyAs(dirFondos .. "/" .. name .. ".png")
  spr:close()
end

local function saveUI(spr, name)
  spr:saveCopyAs(dirUI .. "/" .. name .. ".aseprite")
  spr:saveCopyAs(dirUI .. "/" .. name .. ".png")
  spr:close()
end

----------------------------------------------------------------------
-- 1. FONDOS TILEABLES (32x32 px Seamless Patterns)
----------------------------------------------------------------------

-- A. bg_yermo_polvo (Tierra árida y arenilla oscura del Yermo)
do
  local spr = Sprite(32, 32); local img = spr.cels[1].image
  local C_BASE = "#140e0a"
  local C_D1   = "#1c140e"
  local C_D2   = "#271b13"
  local C_D3   = "#332319"
  local C_SAND = "#4a3324"

  for y = 0, 31 do
    for x = 0, 31 do
      -- Deterministic pseudo-noise for seamless repeat
      local n = (math.sin(x * 0.4) * math.cos(y * 0.4) + math.sin((x+y)*0.3) + (x*7 + y*13) % 11 / 10) / 3
      if n < 0.15 then setHex(img, x, y, C_BASE)
      elseif n < 0.40 then setHex(img, x, y, C_D1)
      elseif n < 0.70 then setHex(img, x, y, C_D2)
      elseif n < 0.90 then setHex(img, x, y, C_D3)
      else setHex(img, x, y, C_SAND) end
    end
  end
  -- Small gravel pebbles (seamless coordinates)
  local pebbles = {{4,5},{18,3},{28,14},{12,20},{24,26},{7,28}}
  for _, p in ipairs(pebbles) do
    setHex(img, p[1], p[2], "#5a3e2c")
    setHex(img, (p[1]+1)%32, p[2], "#140e0a")
  end
  saveFondo(spr, "bg_yermo_polvo")
end

-- B. bg_chapa_oxidada (Lámina metálica corrugada con remaches y óxido)
do
  local spr = Sprite(32, 32); local img = spr.cels[1].image
  local M_HI  = "#64748b"
  local M_MD  = "#334155"
  local M_DK  = "#1e293b"
  local M_DP  = "#0f172a"
  local R_LT  = "#b45309"
  local R_MD  = "#78350f"
  local R_DK  = "#451a03"

  for y = 0, 31 do
    for x = 0, 31 do
      -- Horizontal corrugated metal ridges (period of 8px)
      local ridgeY = y % 8
      if ridgeY == 0 then setHex(img, x, y, M_HI)
      elseif ridgeY <= 3 then setHex(img, x, y, M_MD)
      elseif ridgeY <= 6 then setHex(img, x, y, M_DK)
      else setHex(img, x, y, M_DP) end
    end
  end

  -- Vertical seam at X: 16
  for y = 0, 31 do
    setHex(img, 15, y, M_DP); setHex(img, 16, y, M_HI)
  end

  -- Rivets on seam at Y: 4, 12, 20, 28
  for _, ry in ipairs({4, 12, 20, 28}) do
    setHex(img, 16, ry, "#f1f5f9"); setHex(img, 16, (ry+1)%32, M_DP)
    setHex(img, 0, ry, "#f1f5f9"); setHex(img, 0, (ry+1)%32, M_DP)
  end

  -- Rust bleed patches along edges and seams
  local rustBlobs = {
    {5,6},{6,6},{6,7},{7,6},
    {20,18},{21,18},{21,19},{22,19},{22,20},
    {14,11},{14,12},{15,12},{15,13},
    {27,3},{28,3},{28,4}
  }
  for _, rb in ipairs(rustBlobs) do
    setHex(img, rb[1]%32, rb[2]%32, R_MD)
    setHex(img, (rb[1]+1)%32, rb[2]%32, R_LT)
  end
  saveFondo(spr, "bg_chapa_oxidada")
end

-- C. bg_madera_tablas (Tablones de madera desgastada para cabeceras)
do
  local spr = Sprite(32, 32); local img = spr.cels[1].image
  local W_HI  = "#d97706"
  local W_LT  = "#b45309"
  local W_MD  = "#92400e"
  local W_DK  = "#78350f"
  local W_DP  = "#451a03"
  local W_OUT = "#1c0b02"

  for y = 0, 31 do
    local plankIdx = math.floor(y / 16) -- 2 horizontal planks of 16px
    local py = y % 16
    for x = 0, 31 do
      if py == 0 then
        setHex(img, x, y, W_HI) -- Top plank bevel highlight
      elseif py == 15 then
        setHex(img, x, y, W_OUT) -- Deep gap shadow between planks
      else
        -- Wood grain lines
        local grain = (math.sin(x * 0.2 + py * 0.5) * 2 + (x * 3) % 7) / 3
        if grain > 1.2 then setHex(img, x, y, W_DP)
        elseif grain > 0.6 then setHex(img, x, y, W_DK)
        elseif grain > 0.0 then setHex(img, x, y, W_MD)
        else setHex(img, x, y, W_LT) end
      end
    end
  end

  -- Vertical nail rivets at X: 4 and X: 20
  for _, nx in ipairs({4, 20}) do
    setHex(img, nx, 4, "#cbd5e1"); setHex(img, nx, 5, W_DP)
    setHex(img, nx, 20, "#cbd5e1"); setHex(img, nx, 21, W_DP)
  end
  saveFondo(spr, "bg_madera_tablas")
end

-- D. bg_noche_estrellada (Cielo nocturno profundo de El Hogar)
do
  local spr = Sprite(32, 32); local img = spr.cels[1].image
  local S_0 = "#030712"
  local S_1 = "#080d1a"
  local S_2 = "#0f172a"
  local S_3 = "#1e1b4b"
  local S_4 = "#312e81"

  for y = 0, 31 do
    for x = 0, 31 do
      local nebula = (math.sin(x * 0.25) * math.cos(y * 0.25) + math.sin((x - y)*0.2) + 2) / 4
      if nebula < 0.25 then setHex(img, x, y, S_0)
      elseif nebula < 0.50 then setHex(img, x, y, S_1)
      elseif nebula < 0.75 then setHex(img, x, y, S_2)
      elseif nebula < 0.90 then setHex(img, x, y, S_3)
      else setHex(img, x, y, S_4) end
    end
  end

  -- Tiny twinkle stars
  local stars = {
    {5, 4, "#ffffff"}, {19, 7, "#c7d2fe"}, {27, 2, "#93c5fd"},
    {11, 14, "#ffffff"}, {23, 19, "#c7d2fe"}, {3, 22, "#93c5fd"},
    {16, 26, "#ffffff"}, {29, 28, "#c7d2fe"}, {8, 30, "#93c5fd"}
  }
  for _, s in ipairs(stars) do
    setHex(img, s[1]%32, s[2]%32, s[3])
  end
  saveFondo(spr, "bg_noche_estrellada")
end

----------------------------------------------------------------------
-- 2. UI KIT (9-Slice Frame y Botones Biselados)
----------------------------------------------------------------------

-- A. frame_panel_metal (24x24 px 9-slice box)
do
  local spr = Sprite(24, 24); local img = spr.cels[1].image
  local B_HI  = "#94a3b8"
  local B_LT  = "#64748b"
  local B_MD  = "#334155"
  local B_DK  = "#1e293b"
  local B_DP  = "#0f172a"
  local G_HI  = "#facc15"
  local G_DK  = "#78350f"

  for y = 0, 23 do
    for x = 0, 23 do
      local isEdgeX = (x <= 2 or x >= 21)
      local isEdgeY = (y <= 2 or y >= 21)

      if isEdgeX or isEdgeY then
        -- Outer metallic beveled border
        if x == 0 or y == 0 then setHex(img, x, y, B_HI)
        elseif x == 1 or y == 1 then setHex(img, x, y, B_LT)
        elseif x == 23 or y == 23 then setHex(img, x, y, "#000000")
        elseif x == 22 or y == 22 then setHex(img, x, y, B_DK)
        else setHex(img, x, y, B_MD) end
      else
        -- Inner dark textured background (for 9-slice center expansion)
        if (x + y) % 2 == 0 then setHex(img, x, y, B_DP)
        else setHex(img, x, y, "#131c31") end
      end
    end
  end

  -- Brass Corner Reinforcement Rivets
  local cornerRivets = {{2,2},{21,2},{2,21},{21,21}}
  for _, cr in ipairs(cornerRivets) do
    setHex(img, cr[1], cr[2], G_HI)
    setHex(img, cr[1], cr[2]+1, G_DK)
  end
  saveUI(spr, "frame_panel_metal")
end

-- B. btn_madera_normal (48x16 px)
do
  local spr = Sprite(48, 16); local img = spr.cels[1].image
  local W_HI  = "#fde047"
  local W_LT  = "#d97706"
  local W_MD  = "#b45309"
  local W_DK  = "#78350f"
  local W_DP  = "#451a03"
  local W_OUT = "#1c0b02"

  for y = 0, 15 do
    for x = 0, 47 do
      if x == 0 or y == 0 then
        setHex(img, x, y, (x <= 1 or y <= 1) and W_HI or W_LT)
      elseif x == 47 or y == 15 then
        setHex(img, x, y, W_OUT)
      elseif x == 46 or y == 14 then
        setHex(img, x, y, W_DP)
      elseif y <= 2 then
        setHex(img, x, y, W_LT)
      elseif y >= 12 then
        setHex(img, x, y, W_DK)
      else
        setHex(img, x, y, ((x + y*3) % 4 == 0) and W_LT or W_MD)
      end
    end
  end
  -- Corner brass bracket nails
  setHex(img, 3, 3, "#ffffff"); setHex(img, 3, 4, W_DP)
  setHex(img, 44, 3, "#ffffff"); setHex(img, 44, 4, W_DP)
  setHex(img, 3, 12, W_LT); setHex(img, 3, 13, W_DP)
  setHex(img, 44, 12, W_LT); setHex(img, 44, 13, W_DP)
  saveUI(spr, "btn_madera_normal")
end

-- C. btn_madera_pressed (48x16 px)
do
  local spr = Sprite(48, 16); local img = spr.cels[1].image
  local W_MD  = "#92400e"
  local W_DK  = "#78350f"
  local W_DP  = "#451a03"
  local W_OUT = "#1c0b02"

  for y = 0, 15 do
    for x = 0, 47 do
      if x == 0 or y == 0 or x == 1 or y == 1 then
        setHex(img, x, y, W_OUT) -- Inverted inset shadow!
      elseif x == 47 or y == 15 then
        setHex(img, x, y, W_DK)
      elseif y <= 4 then
        setHex(img, x, y, W_DP)
      else
        setHex(img, x, y, W_DK)
      end
    end
  end
  setHex(img, 3, 3, W_DP); setHex(img, 44, 3, W_DP)
  setHex(img, 3, 12, W_DP); setHex(img, 44, 12, W_DP)
  saveUI(spr, "btn_madera_pressed")
end

-- D. btn_metal_normal (48x16 px)
do
  local spr = Sprite(48, 16); local img = spr.cels[1].image
  local M_HI  = "#f1f5f9"
  local M_LT  = "#94a3b8"
  local M_MD  = "#475569"
  local M_DK  = "#1e293b"
  local M_DP  = "#0f172a"

  for y = 0, 15 do
    for x = 0, 47 do
      if x == 0 or y == 0 then setHex(img, x, y, M_HI)
      elseif x == 1 or y == 1 then setHex(img, x, y, M_LT)
      elseif x == 47 or y == 15 then setHex(img, x, y, "#000000")
      elseif x == 46 or y == 14 then setHex(img, x, y, M_DP)
      elseif y <= 3 then setHex(img, x, y, M_LT)
      elseif y >= 11 then setHex(img, x, y, M_DK)
      else setHex(img, x, y, M_MD) end
    end
  end
  -- Steel rivets
  setHex(img, 4, 4, "#ffffff"); setHex(img, 4, 5, M_DP)
  setHex(img, 43, 4, "#ffffff"); setHex(img, 43, 5, M_DP)
  setHex(img, 4, 11, M_HI); setHex(img, 4, 12, M_DP)
  setHex(img, 43, 11, M_HI); setHex(img, 43, 12, M_DP)
  saveUI(spr, "btn_metal_normal")
end

-- E. btn_metal_pressed (48x16 px)
do
  local spr = Sprite(48, 16); local img = spr.cels[1].image
  local M_MD  = "#334155"
  local M_DK  = "#1e293b"
  local M_DP  = "#0f172a"

  for y = 0, 15 do
    for x = 0, 47 do
      if x == 0 or y == 0 or x == 1 or y == 1 then setHex(img, x, y, "#000000")
      elseif x == 47 or y == 15 then setHex(img, x, y, M_MD)
      elseif y <= 4 then setHex(img, x, y, M_DP)
      else setHex(img, x, y, M_DK) end
    end
  end
  setHex(img, 4, 4, M_DP); setHex(img, 43, 4, M_DP)
  setHex(img, 4, 11, M_DP); setHex(img, 43, 11, M_DP)
  saveUI(spr, "btn_metal_pressed")
end