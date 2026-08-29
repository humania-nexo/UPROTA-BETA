-- Helper to set pixel with RGBA
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

----------------------------------------------------------------------
-- 1. POTION DE SALUD (24x24)
----------------------------------------------------------------------
do
  local spr = Sprite(24, 24)
  spr.filename = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/pixel_art_assets/potion_health.aseprite"
  local img = spr.cels[1].image

  -- Palette
  local C_OUT_DARK = "#1a0c1e"
  local C_OUT_MED  = "#4a1c3d"
  local C_CORK_HI  = "#e3a857"
  local C_CORK_MID = "#b36b25"
  local C_CORK_SH  = "#663311"
  local C_GLASS_HI = "#ffffff"
  local C_GLASS_LT = "#c5f0ff"
  local C_GLASS_MD = "#68a8c4"
  local C_GLASS_DK = "#2c4c64"
  local C_LIQ_HI   = "#ff8a7a"
  local C_LIQ_LT   = "#f23d5c"
  local C_LIQ_MD   = "#c71842"
  local C_LIQ_SH   = "#7d0d33"
  local C_LIQ_DK   = "#42041c"
  local C_SHINE    = "#ffebeb"

  -- Drop shadow
  for x = 7, 16 do setHex(img, x, 21, "#0f0814", 120) end
  for x = 8, 15 do setHex(img, x, 22, "#0f0814", 80) end

  -- Cork (top)
  for x = 10, 13 do setHex(img, x, 3, C_CORK_HI) end
  for x = 10, 13 do setHex(img, x, 4, C_CORK_MID) end
  setHex(img, 10, 3, C_CORK_HI)
  setHex(img, 13, 4, C_CORK_SH)

  -- Glass neck
  setHex(img, 9, 5, C_GLASS_LT)
  for x = 10, 13 do setHex(img, x, 5, C_GLASS_HI) end
  setHex(img, 14, 5, C_GLASS_DK)
  
  setHex(img, 10, 6, C_GLASS_LT)
  setHex(img, 11, 6, C_LIQ_HI)
  setHex(img, 12, 6, C_LIQ_MD)
  setHex(img, 13, 6, C_GLASS_DK)

  setHex(img, 10, 7, C_GLASS_MD)
  setHex(img, 11, 7, C_LIQ_LT)
  setHex(img, 12, 7, C_LIQ_MD)
  setHex(img, 13, 7, C_GLASS_DK)

  -- Flask Body
  local body = {
    {8, 15, 8},
    {7, 16, 9},
    {6, 17, 10},
    {5, 18, 11},
    {5, 18, 12},
    {5, 18, 13},
    {5, 18, 14},
    {5, 18, 15},
    {5, 18, 16},
    {6, 17, 17},
    {6, 17, 18},
    {7, 16, 19},
    {8, 15, 20}
  }

  for _, row in ipairs(body) do
    local x1, x2, y = row[1], row[2], row[3]
    for x = x1, x2 do
      -- Outline
      if x == x1 or x == x2 or y == 8 or y == 20 then
        if x == x1 and y <= 14 then
          setHex(img, x, y, C_GLASS_LT)
        elseif x == x1 then
          setHex(img, x, y, C_OUT_MED)
        elseif x == x2 then
          setHex(img, x, y, C_OUT_DARK)
        elseif y == 20 then
          setHex(img, x, y, C_OUT_DARK)
        else
          setHex(img, x, y, C_OUT_MED)
        end
      else
        -- Liquid fill
        if y < 11 then
          -- Air / Glass interior
          setHex(img, x, y, C_GLASS_DK, 90)
        else
          -- Liquid gradient with hue shift
          if x <= 7 and y <= 15 then
            setHex(img, x, y, C_LIQ_HI)
          elseif x <= 10 and y <= 16 then
            setHex(img, x, y, C_LIQ_LT)
          elseif x <= 14 and y <= 17 then
            setHex(img, x, y, C_LIQ_MD)
          elseif x <= 16 then
            setHex(img, x, y, C_LIQ_SH)
          else
            setHex(img, x, y, C_LIQ_DK)
          end
        end
      end
    end
  end

  -- Specular Reflection on Glass (Left curved shine)
  setHex(img, 7, 11, C_SHINE)
  setHex(img, 7, 12, C_SHINE)
  setHex(img, 7, 13, C_GLASS_HI)
  setHex(img, 8, 10, C_GLASS_HI)
  setHex(img, 8, 14, C_GLASS_LT)
  setHex(img, 6, 14, C_GLASS_HI)
  setHex(img, 6, 15, C_GLASS_LT)

  -- Magic Bubble Sparkles inside liquid
  setHex(img, 12, 13, C_SHINE)
  setHex(img, 14, 15, C_LIQ_HI)
  setHex(img, 10, 17, C_SHINE)
  setHex(img, 9, 18, C_LIQ_HI)

  -- Subtle Secondary bounce light (Right edge)
  setHex(img, 17, 14, C_GLASS_MD)
  setHex(img, 17, 15, C_GLASS_MD)
  setHex(img, 16, 17, C_LIQ_SH)

  spr:saveCopyAs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/pixel_art_assets/potion_health.aseprite")
  spr:saveCopyAs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/pixel_art_assets/potion_health.png")
  spr:close()
end

----------------------------------------------------------------------
-- 2. COFRE DE MAZMORRA (32x32)
----------------------------------------------------------------------
do
  local spr = Sprite(32, 32)
  spr.filename = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/pixel_art_assets/dungeon_chest.aseprite"
  local img = spr.cels[1].image

  local W_HI  = "#d48b46"
  local W_MID = "#9c5a2b"
  local W_SH  = "#603418"
  local W_DK  = "#31180b"

  local G_HI  = "#fff37a"
  local G_MID = "#e5a93b"
  local G_SH  = "#9c6016"
  local G_DK  = "#4a2903"

  local GEM_HI  = "#74f7d9"
  local GEM_MID = "#00b894"
  local GEM_DK  = "#004738"

  local OUT = "#160d1b"

  -- Floor Shadow
  for y = 26, 28 do
    local offset = y - 26
    for x = 5 + offset, 27 - offset do
      setHex(img, x, y, "#0d0614", 130 - offset*30)
    end
  end

  -- Chest Base Box (Y: 16 to 25, X: 5 to 26)
  for y = 16, 25 do
    for x = 5, 26 do
      if x == 5 or x == 26 or y == 25 then
        setHex(img, x, y, OUT)
      else
        setHex(img, x, y, W_MID)
      end
    end
  end

  -- Wood plank shading in Base
  for y = 17, 24 do
    for x = 7, 24 do
      if y >= 21 then
        setHex(img, x, y, W_SH)
      elseif y == 17 then
        setHex(img, x, y, W_HI)
      else
        setHex(img, x, y, W_MID)
      end
    end
    -- Vertical plank separator
    setHex(img, 11, y, W_DK)
    setHex(img, 20, y, W_DK)
  end

  -- Gold Straps on Base
  local strapCols = {5, 6, 15, 16, 25, 26}
  for _, col in ipairs(strapCols) do
    for y = 16, 25 do
      if col == 5 or col == 26 or y == 25 then
        setHex(img, col, y, G_DK)
      elseif col == 6 or col == 15 then
        setHex(img, col, y, (y < 20) and G_HI or G_MID)
      else
        setHex(img, col, y, (y < 20) and G_MID or G_SH)
      end
    end
  end
  -- Rivets on straps
  setHex(img, 6, 18, G_HI); setHex(img, 6, 23, G_HI)
  setHex(img, 25, 18, G_MID); setHex(img, 25, 23, G_MID)

  -- Chest Lid (Curved Dome Y: 8 to 15, X: 4 to 27)
  for y = 8, 15 do
    local xMin = 6
    local xMax = 25
    if y == 8 then xMin, xMax = 8, 23
    elseif y == 9 then xMin, xMax = 7, 24
    elseif y >= 10 then xMin, xMax = 5, 26 end

    for x = xMin, xMax do
      if x == xMin or x == xMax or y == 8 then
        setHex(img, x, y, (y == 8 or x == xMin) and G_HI or OUT)
      else
        if y <= 10 then
          setHex(img, x, y, (x <= 14) and W_HI or W_MID)
        elseif y <= 12 then
          setHex(img, x, y, W_MID)
        else
          setHex(img, x, y, W_SH)
        end
      end
    end
  end

  -- Lid Gold Straps
  for _, col in ipairs({5, 6, 15, 16, 25, 26}) do
    for y = 9, 15 do
      if (col >= 7 and col <= 24) or (y >= 10) then
        if col == 5 or col == 26 then
          setHex(img, col, y, G_DK)
        elseif col == 6 or col == 15 then
          setHex(img, col, y, (y <= 11) and G_HI or G_MID)
        else
          setHex(img, col, y, (y <= 11) and G_MID or G_SH)
        end
      end
    end
  end

  -- Lid Rim / Seam (Horizontal gold band Y: 14, 15)
  for x = 4, 27 do
    setHex(img, x, 14, (x < 15) and G_HI or G_MID)
    setHex(img, x, 15, G_DK)
  end
  setHex(img, 4, 14, OUT); setHex(img, 27, 14, OUT)

  -- Center Lock (Escutcheon Plate & Gem)
  for y = 14, 19 do
    for x = 13, 18 do
      setHex(img, x, y, G_MID)
    end
  end
  for x = 14, 17 do setHex(img, x, 14, G_HI) end
  for y = 15, 18 do setHex(img, 13, y, G_HI); setHex(img, 18, y, G_DK) end
  for x = 14, 17 do setHex(img, x, 19, G_DK) end

  -- Glowing Gem in Lock
  setHex(img, 15, 16, GEM_HI)
  setHex(img, 16, 16, GEM_MID)
  setHex(img, 15, 17, GEM_MID)
  setHex(img, 16, 17, GEM_DK)
  -- Gem Glow aura
  setHex(img, 15, 15, GEM_HI, 140)
  setHex(img, 16, 15, GEM_HI, 100)

  spr:saveCopyAs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/pixel_art_assets/dungeon_chest.aseprite")
  spr:saveCopyAs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/pixel_art_assets/dungeon_chest.png")
  spr:close()
end

----------------------------------------------------------------------
-- 3. ESPADA MÍTICA (32x32 Diagonal 45°)
----------------------------------------------------------------------
do
  local spr = Sprite(32, 32)
  spr.filename = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/pixel_art_assets/hero_sword.aseprite"
  local img = spr.cels[1].image

  local BLADE_HI   = "#ffffff"
  local BLADE_SHN  = "#d6f0ff"
  local BLADE_LT   = "#98cbe8"
  local BLADE_MD   = "#5687a8"
  local BLADE_DK   = "#2b4a63"
  local BLADE_OUT  = "#121d28"

  local G_HI  = "#fff07a"
  local G_MD  = "#dca132"
  local G_DK  = "#734c0e"

  local RUBY_HI = "#ff758c"
  local RUBY_MD = "#d91b42"
  local RUBY_DK = "#68061a"

  local LEATHER_HI = "#a66838"
  local LEATHER_MD = "#6e3e1a"
  local LEATHER_DK = "#381a07"

  -- Tip at (27, 4), Hilt at (7, 24), Pommel at (4, 27)
  -- Blade Tip
  setHex(img, 27, 4, BLADE_HI)
  setHex(img, 26, 4, BLADE_HI)
  setHex(img, 27, 5, BLADE_DK)

  -- Blade Body (Diagonal lines)
  for i = 1, 15 do
    local bx = 27 - i
    local by = 4 + i
    -- Top/Light edge
    setHex(img, bx - 1, by, BLADE_OUT)
    setHex(img, bx, by, (i % 3 == 0) and BLADE_HI or BLADE_SHN)
    -- Center fuller / ridge
    setHex(img, bx + 1, by, BLADE_LT)
    -- Dark bevel
    setHex(img, bx + 1, by + 1, BLADE_MD)
    -- Bottom edge & outline
    setHex(img, bx + 2, by + 1, BLADE_DK)
    setHex(img, bx + 2, by + 2, BLADE_OUT)
  end

  -- Crossguard (Gold wings at 11, 20)
  local guardPts = {
    {9, 17, G_HI}, {10, 17, G_HI}, {11, 18, G_HI},
    {8, 18, G_MD}, {9, 18, G_MD}, {10, 19, G_MD},
    {13, 22, G_MD}, {14, 23, G_MD}, {15, 23, G_DK},
    {13, 23, G_DK}, {14, 24, G_DK},
    -- Outline
    {8, 17, G_DK}, {10, 16, G_DK}, {16, 23, G_DK}, {15, 24, G_DK}
  }
  for _, pt in ipairs(guardPts) do
    setHex(img, pt[1], pt[2], pt[3])
  end

  -- Ruby in Center of Guard
  setHex(img, 11, 19, RUBY_HI)
  setHex(img, 12, 19, RUBY_MD)
  setHex(img, 11, 20, RUBY_MD)
  setHex(img, 12, 20, RUBY_DK)

  -- Grip / Handle
  for i = 1, 4 do
    local hx = 10 - i
    local hy = 20 + i
    setHex(img, hx, hy, (i % 2 == 1) and LEATHER_HI or LEATHER_MD)
    setHex(img, hx + 1, hy, (i % 2 == 1) and LEATHER_MD or LEATHER_DK)
    setHex(img, hx - 1, hy, LEATHER_DK)
  end

  -- Pommel (4, 27)
  setHex(img, 5, 26, G_HI)
  setHex(img, 6, 26, G_MD)
  setHex(img, 4, 27, G_HI)
  setHex(img, 5, 27, G_MD)
  setHex(img, 6, 27, G_DK)
  setHex(img, 4, 28, G_MD)
  setHex(img, 5, 28, G_DK)
  setHex(img, 3, 27, G_DK)

  -- Sparkle glint on blade
  setHex(img, 23, 7, "#ffffff")
  setHex(img, 23, 6, "#ffffff", 180)
  setHex(img, 24, 7, "#ffffff", 180)
  setHex(img, 22, 7, "#ffffff", 180)
  setHex(img, 23, 8, "#ffffff", 180)

  spr:saveCopyAs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/pixel_art_assets/hero_sword.aseprite")
  spr:saveCopyAs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/pixel_art_assets/hero_sword.png")
  spr:close()
end

----------------------------------------------------------------------
-- 4. CRISTAL ARCANO ANIMADO (32x32, 6 Frames de Animación)
----------------------------------------------------------------------
do
  local spr = Sprite(32, 32)
  spr.filename = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/pixel_art_assets/arcane_crystal_anim.aseprite"

  -- Ensure 6 frames
  for i = 1, 5 do
    spr:newFrame()
  end

  local P_SHINE = "#ffffff"
  local P_HI    = "#9df7ff"
  local P_LT    = "#3be0ff"
  local P_MD    = "#009cd9"
  local P_DK    = "#00558a"
  local P_DP    = "#02213d"
  local P_OUT   = "#020d1c"

  -- Floating offsets for 6 frames (Smooth sine bobbing)
  local yOffsets = {0, -1, -2, -2, -1, 0}
  -- Inner pulse glow intensity variations
  local pulse = {0, 1, 2, 2, 1, 0}

  for f = 1, 6 do
    local cel = spr.cels[f]
    local img = cel.image
    local yOff = yOffsets[f]
    local pVal = pulse[f]

    -- Ground Shadow (Grows and shrinks slightly as crystal hovers)
    local sRadius = 5 - math.abs(yOff)
    for x = 16 - sRadius, 16 + sRadius do
      setHex(img, x, 28, "#050b1a", 100 - math.abs(yOff)*20)
    end
    for x = 16 - (sRadius - 2), 16 + (sRadius - 2) do
      setHex(img, x, 29, "#050b1a", 60)
    end

    -- Crystal Center is at (16, 14 + yOff)
    local cx = 16
    local cy = 14 + yOff

    -- Draw Octahedral Diamond Crystal
    -- Top vertex: (cx, cy - 10), Bottom vertex: (cx, cy + 10)
    -- Left vertex: (cx - 7, cy), Right vertex: (cx + 7, cy)
    -- Upper-Left facet
    for dy = -9, 0 do
      local w = math.floor((dy + 10) * 7 / 10)
      for dx = -w, 0 do
        if dx == -w or dy == -9 then
          setHex(img, cx + dx, cy + dy, (pVal == 2) and P_SHINE or P_HI)
        elseif dx == 0 then
          setHex(img, cx + dx, cy + dy, P_SHINE)
        else
          setHex(img, cx + dx, cy + dy, (pVal > 0) and P_HI or P_LT)
        end
      end
    end

    -- Upper-Right facet
    for dy = -9, 0 do
      local w = math.floor((dy + 10) * 7 / 10)
      for dx = 1, w do
        if dx == w then
          setHex(img, cx + dx, cy + dy, P_DK)
        else
          setHex(img, cx + dx, cy + dy, (pVal > 0) and P_LT or P_MD)
        end
      end
    end

    -- Lower-Left facet
    for dy = 1, 9 do
      local w = math.floor((10 - dy) * 7 / 10)
      for dx = -w, 0 do
        if dx == -w or dy == 9 then
          setHex(img, cx + dx, cy + dy, P_MD)
        elseif dx == 0 then
          setHex(img, cx + dx, cy + dy, P_HI)
        else
          setHex(img, cx + dx, cy + dy, (pVal > 0) and P_LT or P_MD)
        end
      end
    end

    -- Lower-Right facet
    for dy = 1, 9 do
      local w = math.floor((10 - dy) * 7 / 10)
      for dx = 1, w do
        if dx == w or dy == 9 then
          setHex(img, cx + dx, cy + dy, P_OUT)
        else
          setHex(img, cx + dx, cy + dy, P_DK)
        end
      end
    end

    -- Specular glint
    setHex(img, cx - 2, cy - 4, P_SHINE)
    setHex(img, cx - 1, cy - 4, P_SHINE)
    setHex(img, cx - 2, cy - 3, P_SHINE)

    -- Orbiting Mana Particle 1 (clockwise)
    local angle1 = (f - 1) * (math.pi * 2 / 6)
    local orbX1 = math.floor(cx + math.cos(angle1) * 11 + 0.5)
    local orbY1 = math.floor(cy + math.sin(angle1) * 6 + 0.5)
    setHex(img, orbX1, orbY1, P_SHINE)
    setHex(img, orbX1 + 1, orbY1, P_HI, 160)

    -- Orbiting Mana Particle 2 (counter-clockwise offset)
    local angle2 = angle1 + math.pi
    local orbX2 = math.floor(cx + math.cos(angle2) * 9 + 0.5)
    local orbY2 = math.floor(cy - math.sin(angle2) * 5 + 0.5)
    setHex(img, orbX2, orbY2, P_LT)
  end

  -- Add Animation Tag
  local tag = spr:newTag(1, 6)
  tag.name = "Hover_Glow"
  tag.aniDir = AniDir.FORWARD

  spr:saveCopyAs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/pixel_art_assets/arcane_crystal_anim.aseprite")
  spr:saveCopyAs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/pixel_art_assets/arcane_crystal_anim.gif")
  spr:saveCopyAs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/pixel_art_assets/arcane_crystal_sheet.png")
  spr:close()
end