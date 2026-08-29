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

local function saveAsset(spr, baseDir, name)
  local asePath = baseDir .. "/" .. name .. ".aseprite"
  local pngPath = baseDir .. "/" .. name .. ".png"
  local prevPath = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/previews/preview_" .. name .. "_6x.png"
  
  spr:saveCopyAs(asePath)
  spr:saveCopyAs(pngPath)
  spr:close()
end

----------------------------------------------------------------------
-- BLOQUE A: RECURSOS DE CABECERA (24x24 px)
----------------------------------------------------------------------
local dirRec = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/recursos"

-- 1. recurso_tablas (Par de tablas de pino envejecidas atadas con alambre)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image

  local W_HI  = "#d69f62"
  local W_LT  = "#b37b42"
  local W_MD  = "#8c562b"
  local W_DK  = "#5a3114"
  local W_OUT = "#2b1406"
  
  local WIRE_HI = "#d1d5db"
  local WIRE_MD = "#9ca3af"
  local WIRE_DK = "#4b5563"
  local RUST    = "#b45309"

  -- Drop shadow
  for y = 20, 22 do
    for x = 4 + (y-20), 20 - (y-20) do
      setHex(img, x, y, "#120803", 100 - (y-20)*30)
    end
  end

  -- Back plank (slightly higher, offset right)
  for y = 5, 17 do
    for x = 10, 19 do
      if x == 10 or x == 19 or y == 5 or y == 17 then
        setHex(img, x, y, W_OUT)
      else
        setHex(img, x, y, (x <= 13) and W_LT or W_MD)
      end
    end
    -- Wood grain notch
    if y == 8 or y == 14 then setHex(img, 15, y, W_DK) end
  end

  -- Front plank (main diagonal tilt, left aligned)
  for y = 7, 19 do
    for x = 5, 14 do
      if x == 5 or x == 14 or y == 7 or y == 19 then
        setHex(img, x, y, (y == 7 or x == 5) and W_LT or W_OUT)
      else
        if x <= 7 then setHex(img, x, y, (y <= 9) and W_HI or W_LT)
        elseif x <= 11 then setHex(img, x, y, W_MD)
        else setHex(img, x, y, W_DK) end
      end
    end
    -- Grain cracks in front plank
    if y == 10 then setHex(img, 8, y, W_DK); setHex(img, 9, y, W_OUT) end
    if y == 11 then setHex(img, 8, y, W_DK) end
    if y == 16 then setHex(img, 10, y, W_DK); setHex(img, 11, y, W_DK) end
  end

  -- Wire Tie / Soga rústica wrapping both planks at Y: 12, 13
  for x = 4, 20 do
    setHex(img, x, 12, WIRE_HI)
    setHex(img, x, 13, (x % 3 == 0) and RUST or WIRE_MD)
  end
  -- Knot / Twisted wire on front
  setHex(img, 9, 11, WIRE_HI); setHex(img, 10, 11, RUST)
  setHex(img, 9, 14, WIRE_DK); setHex(img, 10, 14, WIRE_MD)

  saveAsset(spr, dirRec, "recurso_tablas")
end

-- 2. recurso_clavos (Puñado de clavos doblados, pernos y tuercas oxidadas)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image

  local M_HI  = "#f1f5f9"
  local M_LT  = "#94a3b8"
  local M_MD  = "#475569"
  local M_DK  = "#1e293b"
  local R_LT  = "#d97706"
  local R_MD  = "#9a3412"
  local R_DK  = "#431407"
  local OUT   = "#110705"

  -- Drop shadow
  for y = 19, 21 do
    for x = 4 + (y-19)*2, 20 - (y-19)*2 do
      setHex(img, x, y, OUT, 110 - (y-19)*35)
    end
  end

  -- Big bent railroad/carpentry nail (Diagonal 45°)
  -- Head at (5, 6)
  setHex(img, 4, 5, M_HI); setHex(img, 5, 5, M_HI); setHex(img, 6, 6, M_LT)
  setHex(img, 4, 6, M_LT); setHex(img, 5, 6, M_MD); setHex(img, 3, 5, OUT)
  -- Shaft down to bend at (13, 14)
  for i = 1, 7 do
    local nx = 5 + i
    local ny = 6 + i
    setHex(img, nx, ny, (i % 2 == 1) and M_LT or R_LT)
    setHex(img, nx + 1, ny, (i % 2 == 1) and M_MD or R_MD)
    setHex(img, nx - 1, ny, OUT)
    setHex(img, nx + 2, ny, OUT)
  end
  -- Bent tip going right-up
  setHex(img, 13, 14, R_MD); setHex(img, 14, 14, R_LT); setHex(img, 15, 13, M_HI)
  setHex(img, 16, 12, M_HI); setHex(img, 17, 11, M_LT); setHex(img, 18, 10, OUT)
  setHex(img, 17, 12, OUT); setHex(img, 16, 13, OUT)

  -- Second straight rusty nail crossing underneath
  for i = 1, 9 do
    local nx = 18 - i
    local ny = 8 + i
    if ny ~= 12 and ny ~= 13 then
      setHex(img, nx, ny, R_LT)
      setHex(img, nx - 1, ny, R_MD)
      setHex(img, nx + 1, ny, OUT)
    end
  end
  -- Head of 2nd nail at (18, 8)
  setHex(img, 18, 7, R_LT); setHex(img, 19, 8, R_MD); setHex(img, 19, 7, OUT)

  -- Rusty Hex Nut at bottom right (14, 16 to 19, 19)
  for y = 16, 19 do
    for x = 14, 19 do
      if (x == 14 and y == 16) or (x == 19 and y == 16) or (x == 14 and y == 19) or (x == 19 and y == 19) then
        -- corners
      elseif x == 14 or x == 19 or y == 16 or y == 19 then
        setHex(img, x, y, (y == 16 or x == 14) and R_LT or OUT)
      else
        -- center hole
        if (x == 16 or x == 17) and (y == 17 or y == 18) then
          setHex(img, x, y, OUT)
        else
          setHex(img, x, y, M_MD)
        end
      end
    end
  end
  setHex(img, 15, 17, M_HI)

  saveAsset(spr, dirRec, "recurso_clavos")
end

-- 3. recurso_provisiones (Lata de comida comercial abollada con etiqueta rasgada)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image

  local TIN_HI  = "#f1f5f9"
  local TIN_LT  = "#cbd5e1"
  local TIN_MD  = "#64748b"
  local TIN_DK  = "#334155"
  local LBL_HI  = "#fdba74"
  local LBL_MD  = "#ea580c"
  local LBL_DK  = "#9a3412"
  local BEAN_LT = "#854d0e"
  local OUT     = "#0f172a"
  local RUST    = "#78350f"

  -- Floor shadow
  for y = 20, 22 do
    for x = 6 + (y-20), 18 - (y-20) do
      setHex(img, x, y, OUT, 120 - (y-20)*35)
    end
  end

  -- Can Top Lid (Oval rim Y: 5 to 7, X: 6 to 17)
  for x = 8, 15 do setHex(img, x, 4, TIN_HI) end
  setHex(img, 7, 5, TIN_HI); setHex(img, 16, 5, TIN_MD)
  setHex(img, 6, 6, TIN_LT); setHex(img, 17, 6, TIN_DK)
  for x = 8, 15 do setHex(img, x, 7, TIN_MD) end
  -- Inside of top rim
  for y = 5, 6 do
    for x = 8, 15 do
      setHex(img, x, y, (x < 11) and TIN_HI or TIN_LT)
    end
  end
  -- Pull tab ring on top
  setHex(img, 11, 5, TIN_DK); setHex(img, 12, 5, TIN_HI)
  setHex(img, 11, 6, TIN_HI); setHex(img, 12, 6, TIN_MD)

  -- Can Body Cylinder (Y: 8 to 19, X: 6 to 17)
  for y = 8, 19 do
    for x = 6, 17 do
      local isEdge = (x == 6 or x == 17 or y == 19)
      if isEdge then
        setHex(img, x, y, (x == 6 and y < 15) and TIN_LT or OUT)
      else
        -- Middle section has torn label (Y: 10 to 16)
        if y >= 10 and y <= 16 and (x >= 8 and x <= 15) then
          -- Torn label pattern
          if (y == 10 and x >= 14) or (y == 16 and x <= 9) then
            -- Torn exposed metal
            setHex(img, x, y, (x < 12) and TIN_LT or TIN_MD)
          else
            -- Label print
            if x <= 10 then setHex(img, x, y, (y <= 12) and LBL_HI or LBL_MD)
            elseif x <= 13 then setHex(img, x, y, LBL_MD)
            else setHex(img, x, y, LBL_DK) end
            -- Mini vintage illustration (stylized bean/fish logo)
            if y == 13 and (x == 11 or x == 12) then setHex(img, x, y, BEAN_LT) end
            if y == 14 and x == 11 then setHex(img, x, y, BEAN_LT) end
          end
        else
          -- Tin metal body with dent on left side
          if x == 7 and (y == 11 or y == 12) then
            setHex(img, x, y, RUST) -- Dent & rust seam
          elseif x <= 9 then
            setHex(img, x, y, TIN_HI)
          elseif x <= 13 then
            setHex(img, x, y, TIN_LT)
          elseif x <= 15 then
            setHex(img, x, y, TIN_MD)
          else
            setHex(img, x, y, TIN_DK)
          end
        end
      end
    end
  end

  saveAsset(spr, dirRec, "recurso_provisiones")
end

-- 4. recurso_agua (Botella PET reciclada con agua limpia y tapón de corcho)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image

  local P_HI   = "#ffffff"
  local P_LT   = "#e0f2fe"
  local P_MD   = "#7dd3fc"
  local P_DK   = "#0284c7"
  local W_HI   = "#38bdf8"
  local W_MD   = "#0284c7"
  local W_DK   = "#0369a1"
  local CORK_H = "#d97706"
  local CORK_M = "#92400e"
  local CORK_D = "#451a03"
  local OUT    = "#082f49"

  -- Drop shadow
  for y = 20, 22 do
    for x = 7 + (y-20), 17 - (y-20) do
      setHex(img, x, y, OUT, 110 - (y-20)*35)
    end
  end

  -- Cork Stopper (Y: 3 to 5, X: 10 to 13)
  for x = 10, 13 do setHex(img, x, 3, CORK_H) end
  for x = 10, 13 do setHex(img, x, 4, CORK_M) end
  setHex(img, 10, 3, P_HI); setHex(img, 13, 4, CORK_D)

  -- PET Bottle Neck & Ridges (Y: 5 to 8, X: 9 to 14)
  setHex(img, 9, 5, P_MD); setHex(img, 14, 5, P_DK)
  for x = 10, 13 do setHex(img, x, 5, P_HI) end
  setHex(img, 10, 6, P_LT); setHex(img, 11, 6, P_HI); setHex(img, 12, 6, P_LT); setHex(img, 13, 6, P_MD)
  setHex(img, 9, 7, P_MD); setHex(img, 14, 7, OUT)
  for x = 10, 13 do setHex(img, x, 7, P_LT) end

  -- Bottle Main Cylindrical Body with Plastic Ribs (Y: 8 to 19, X: 7 to 16)
  for y = 8, 19 do
    for x = 7, 16 do
      if x == 7 or x == 16 or y == 19 then
        setHex(img, x, y, (x == 7 and y <= 14) and P_LT or OUT)
      else
        -- Water level starts at Y: 11
        if y < 11 then
          -- Air space in bottle
          if x == 8 then setHex(img, x, y, P_HI)
          elseif x <= 11 then setHex(img, x, y, P_LT, 150)
          else setHex(img, x, y, P_DK, 100) end
        else
          -- Water fill with clean transparency & meniscus
          if y == 11 then
            -- Meniscus surface wave
            setHex(img, x, y, (x <= 11) and P_HI or W_HI)
          else
            if x <= 9 then setHex(img, x, y, (y % 3 == 0) and P_HI or W_HI)
            elseif x <= 13 then setHex(img, x, y, W_MD)
            else setHex(img, x, y, W_DK) end
          end
        end
        -- Horizontal PET bottle ribs (grooves) at Y: 13, 16
        if (y == 13 or y == 16) and x >= 8 and x <= 15 then
          setHex(img, x, y, (x <= 10) and P_HI or W_DK)
        end
      end
    end
  end
  -- Curved Specular Reflection on left
  setHex(img, 8, 9, P_HI); setHex(img, 8, 10, P_HI)
  setHex(img, 8, 14, P_HI); setHex(img, 8, 15, P_HI)
  setHex(img, 8, 17, P_HI); setHex(img, 8, 18, P_HI)

  saveAsset(spr, dirRec, "recurso_agua")
end

-- 5. recurso_moral (Chispa de ánima / Corazón blindado con metal y llama interna)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image

  local CORE_HI = "#ffffff"
  local CORE_GD = "#fef08a"
  local FLM_HI  = "#fb7185"
  local FLM_MD  = "#e11d48"
  local FLM_DK  = "#881337"
  local ST_HI   = "#94a3b8"
  local ST_MD   = "#475569"
  local ST_DK   = "#1e293b"
  local OUT     = "#110207"

  -- Glowing aura
  for y = 4, 20 do
    for x = 4, 19 do
      local dist = math.sqrt((x - 11.5)^2 + (y - 11.5)^2)
      if dist <= 8 then
        setHex(img, x, y, FLM_MD, math.floor(80 - dist*8))
      end
    end
  end

  -- Armor plate brackets on left and right (Shielding the soul)
  -- Left bracket
  for y = 8, 15 do
    setHex(img, 5, y, (y <= 10) and ST_HI or ST_MD)
    setHex(img, 6, y, ST_DK)
    setHex(img, 4, y, OUT)
  end
  setHex(img, 5, 9, CORE_HI); setHex(img, 5, 14, CORE_HI) -- Rivets

  -- Right bracket
  for y = 8, 15 do
    setHex(img, 18, y, ST_MD)
    setHex(img, 17, y, ST_DK)
    setHex(img, 19, y, OUT)
  end
  setHex(img, 18, 9, ST_HI); setHex(img, 18, 14, ST_HI) -- Rivets

  -- Inner Luminous Heart / Soul Flame
  local heart = {
    {8, 10, 7}, {13, 15, 7},
    {7, 16, 8},
    {7, 16, 9},
    {7, 16, 10},
    {8, 15, 11},
    {8, 15, 12},
    {9, 14, 13},
    {10, 13, 14},
    {11, 12, 15},
    {11, 12, 16}
  }

  for _, row in ipairs(heart) do
    local x1, x2, y = row[1], row[2], row[3]
    for x = x1, x2 do
      if x == x1 or x == x2 or y == 7 or y == 16 then
        setHex(img, x, y, (y <= 8 or x == x1) and FLM_HI or FLM_DK)
      else
        if x >= 10 and x <= 13 and y >= 8 and y <= 11 then
          setHex(img, x, y, (y == 8 and x == 10) and CORE_HI or CORE_GD)
        else
          setHex(img, x, y, (x <= 11) and FLM_HI or FLM_MD)
        end
      end
    end
  end

  -- Top Flame tips licking upward
  setHex(img, 9, 5, FLM_HI); setHex(img, 9, 6, CORE_GD)
  setHex(img, 14, 5, FLM_MD); setHex(img, 14, 6, FLM_HI)
  setHex(img, 11, 4, CORE_HI); setHex(img, 11, 5, CORE_GD); setHex(img, 12, 5, CORE_GD)

  -- Sparkle stars
  setHex(img, 7, 5, CORE_HI)
  setHex(img, 16, 15, CORE_GD)

  saveAsset(spr, dirRec, "recurso_moral")
end

----------------------------------------------------------------------
-- BLOQUE B: LOS 4 PILARES Y TORTA DORADA (24x24 px)
----------------------------------------------------------------------
local dirPil = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/pilares"

-- 1. pilar_cuerpo (Bota de caminante del Yermo - Rojo Óxido / Terracota)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image

  local T_HI  = "#f87171"
  local T_LT  = "#ef4444"
  local T_MD  = "#b91c1c"
  local T_DK  = "#7f1d1d"
  local T_DP  = "#450a0a"
  local S_HI  = "#94a3b8"
  local S_DK  = "#1e293b"
  local L_GD  = "#fde047"
  local OUT   = "#1c0404"

  -- Floor shadow
  for y = 20, 22 do
    for x = 4 + (y-20), 20 - (y-20) do
      setHex(img, x, y, OUT, 120 - (y-20)*35)
    end
  end

  -- Boot Leg Shaft (Y: 5 to 13, X: 7 to 14)
  for y = 5, 13 do
    for x = 7, 14 do
      if x == 7 or x == 14 or y == 5 then
        setHex(img, x, y, (x == 7 or y == 5) and T_LT or OUT)
      else
        setHex(img, x, y, (x <= 10) and T_LT or T_MD)
      end
    end
    -- Boot Laces / Straps with brass eyelets
    if y == 7 or y == 9 or y == 11 then
      setHex(img, 13, y, L_GD)
      setHex(img, 12, y, T_DP)
      setHex(img, 11, y, L_GD)
    end
  end
  -- Folded Leather Cuff at Top (Y: 4, 5)
  for x = 6, 15 do
    setHex(img, x, 4, T_HI)
    setHex(img, x, 5, (x == 6 or x == 15) and OUT or T_LT)
  end

  -- Boot Foot / Vamp extending forward to (19, 18)
  for y = 14, 18 do
    local xStart = (y <= 15) and 6 or 5
    local xEnd   = (y == 14) and 16 or ((y == 15) and 18 or 19)
    for x = xStart, xEnd do
      if x == xStart or x == xEnd or y == 18 then
        setHex(img, x, y, (y == 18 or x == xEnd) and OUT or T_LT)
      else
        if y <= 15 and x <= 11 then setHex(img, x, y, T_HI)
        elseif x <= 14 then setHex(img, x, y, T_MD)
        else setHex(img, x, y, T_DK) end
      end
    end
  end
  -- Toe Cap Reinforcement (X: 16 to 19, Y: 16 to 18)
  setHex(img, 17, 16, T_HI); setHex(img, 18, 16, T_HI)
  setHex(img, 19, 17, T_LT); setHex(img, 18, 17, T_MD)

  -- Heavy Treaded Rubber Sole (Y: 19, 20, X: 4 to 20)
  for x = 4, 20 do
    setHex(img, x, 19, S_HI)
    setHex(img, x, 20, (x % 3 == 0) and S_DK or S_HI)
  end
  -- Deep Heel block at back (X: 4 to 9, Y: 20)
  for x = 4, 9 do setHex(img, x, 20, S_DK) end

  saveAsset(spr, dirPil, "pilar_cuerpo")
end

-- 2. pilar_mente (Cuaderno viejo de notas con planos y elástico - Azul Cobalto)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image

  local C_HI  = "#7dd3fc"
  local C_LT  = "#38bdf8"
  local C_MD  = "#0284c7"
  local C_DK  = "#1e3a8a"
  local C_DP  = "#0f172a"
  local P_HI  = "#fef08a"
  local P_MD  = "#fde047"
  local P_DK  = "#ca8a04"
  local PG_WH = "#f8fafc"
  local PG_SH = "#cbd5e1"
  local OUT   = "#050b14"

  -- Drop shadow
  for y = 20, 22 do
    for x = 5 + (y-20), 19 - (y-20) do
      setHex(img, x, y, OUT, 120 - (y-20)*35)
    end
  end

  -- Book Cover (Y: 4 to 19, X: 6 to 18)
  for y = 4, 19 do
    for x = 6, 18 do
      if x == 6 or x == 18 or y == 4 or y == 19 then
        setHex(img, x, y, (x == 6 or y == 4) and C_LT or OUT)
      else
        if x <= 8 then setHex(img, x, y, C_HI) -- Spine edge
        elseif x <= 13 then setHex(img, x, y, C_MD)
        else setHex(img, x, y, C_DK) end
      end
    end
    -- Exposed paper page edges on right (X: 17, 18)
    if y >= 6 and y <= 17 then
      setHex(img, 18, y, PG_WH)
      setHex(img, 17, y, PG_SH)
    end
  end

  -- Leather Spine Binding on Left (X: 6, 7)
  for y = 4, 19 do
    setHex(img, 6, y, C_HI)
    setHex(img, 7, y, C_MD)
  end

  -- Brass Corner Reinforcements (Top-Right, Bottom-Right)
  setHex(img, 16, 4, P_HI); setHex(img, 17, 4, P_HI); setHex(img, 17, 5, P_MD)
  setHex(img, 16, 19, P_MD); setHex(img, 17, 19, P_MD); setHex(img, 17, 18, P_DK)

  -- Blueprint / Compass Emblem embossed on front cover (X: 10 to 14, Y: 8 to 15)
  setHex(img, 12, 8, C_HI)
  setHex(img, 11, 9, C_HI); setHex(img, 13, 9, C_HI)
  setHex(img, 10, 10, C_HI); setHex(img, 14, 10, C_HI)
  for x = 10, 14 do setHex(img, x, 11, C_HI) end
  setHex(img, 11, 12, C_LT); setHex(img, 13, 12, C_LT)
  setHex(img, 10, 14, C_LT); setHex(img, 14, 14, C_LT)

  -- Vertical Elastic Closure Band at X: 15
  for y = 4, 19 do
    setHex(img, 15, y, (y % 2 == 0) and P_HI or P_DK)
  end

  saveAsset(spr, dirPil, "pilar_mente")
end

-- 3. pilar_espiritu (Llama de fogata protegida por piedras - Púrpura / Violeta Místico)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image

  local F_CORE = "#ffffff"
  local F_HI   = "#f0abfc"
  local F_LT   = "#c084fc"
  local F_MD   = "#9333ea"
  local F_DK   = "#581c87"
  local F_DP   = "#3b0764"
  local R_HI   = "#a8a29e"
  local R_MD   = "#57534e"
  local R_DK   = "#292524"
  local OUT    = "#160324"

  -- Mystical ambient glow
  for y = 3, 21 do
    for x = 3, 21 do
      local dist = math.sqrt((x - 11.5)^2 + (y - 12)^2)
      if dist <= 9 then
        setHex(img, x, y, F_MD, math.floor(70 - dist*7))
      end
    end
  end

  -- Stone Hearth Ring at Base (Y: 17 to 20, X: 4 to 20)
  local stones = {
    {4, 7, 18, 19}, {8, 11, 18, 20}, {12, 16, 18, 20}, {17, 20, 18, 19}
  }
  for _, st in ipairs(stones) do
    for y = st[3], st[4] do
      for x = st[1], st[2] do
        if x == st[1] or x == st[2] or y == st[4] then
          setHex(img, x, y, (y == st[3] and x == st[1]) and R_HI or OUT)
        else
          setHex(img, x, y, (y == st[3]) and R_HI or R_MD)
        end
      end
    end
  end

  -- Sacred Violet Flame (Y: 4 to 17, X: 7 to 17)
  -- Center Core & Outer Tongues
  for y = 7, 17 do
    local w = math.floor((18 - y) * 5 / 10) + 1
    for dx = -w, w do
      local x = 12 + dx
      if math.abs(dx) == w or y == 17 then
        setHex(img, x, y, (math.abs(dx) == w and y <= 10) and F_HI or F_DK)
      else
        if math.abs(dx) <= 1 and y >= 11 and y <= 15 then
          setHex(img, x, y, F_CORE)
        elseif math.abs(dx) <= 2 and y >= 9 then
          setHex(img, x, y, F_HI)
        else
          setHex(img, x, y, (dx <= 0) and F_LT or F_MD)
        end
      end
    end
  end

  -- Dancing Top Flame Spire
  setHex(img, 12, 4, F_CORE)
  setHex(img, 11, 5, F_CORE); setHex(img, 12, 5, F_HI)
  setHex(img, 10, 6, F_HI);   setHex(img, 11, 6, F_CORE); setHex(img, 12, 6, F_LT)
  -- Side flickers
  setHex(img, 8, 9, F_LT); setHex(img, 7, 10, F_MD)
  setHex(img, 15, 8, F_HI); setHex(img, 16, 9, F_MD)

  -- Sparks / Embers floating upward
  setHex(img, 9, 3, F_CORE)
  setHex(img, 15, 4, F_HI)
  setHex(img, 14, 2, F_CORE)

  saveAsset(spr, dirPil, "pilar_espiritu")
end

-- 4. pilar_taller (Martillo y llave inglesa cruzados - Verde Oliva / Cobre)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image

  local O_HI  = "#bef264"
  local O_LT  = "#84cc16"
  local O_MD  = "#4d7c0f"
  local O_DK  = "#1a2e05"
  local C_HI  = "#fdba74"
  local C_MD  = "#ea580c"
  local C_DK  = "#7c2d12"
  local M_HI  = "#e2e8f0"
  local M_MD  = "#64748b"
  local M_DK  = "#1e293b"
  local OUT   = "#0b1702"

  -- Floor shadow
  for y = 20, 22 do
    for x = 4 + (y-20), 20 - (y-20) do
      setHex(img, x, y, OUT, 110 - (y-20)*35)
    end
  end

  -- Diagonal 1: Wrench (Top-Left 5,5 to Bottom-Right 19,19)
  -- Wrench Head at (5, 5) to (9, 9)
  setHex(img, 5, 4, M_HI); setHex(img, 6, 4, M_HI); setHex(img, 7, 5, M_MD)
  setHex(img, 4, 5, M_HI); setHex(img, 4, 6, M_MD); setHex(img, 5, 7, M_DK)
  -- Jaw opening at (6,6)
  setHex(img, 7, 8, M_MD); setHex(img, 8, 7, M_HI)
  -- Wrench Shaft (Diagonal)
  for i = 3, 11 do
    local wx = 5 + i
    local wy = 5 + i
    setHex(img, wx, wy, (i % 2 == 0) and O_LT or O_MD)
    setHex(img, wx + 1, wy, O_DK)
    setHex(img, wx - 1, wy, OUT)
  end
  -- Wrench Ring End at (18, 18)
  setHex(img, 18, 17, O_LT); setHex(img, 19, 18, O_MD); setHex(img, 18, 19, O_DK); setHex(img, 17, 18, O_LT)

  -- Diagonal 2: Forging Hammer (Top-Right 19,5 to Bottom-Left 5,19)
  -- Hammer Head (Copper/Steel sledge block at 15,5 to 19,9)
  for y = 5, 8 do
    for x = 16, 20 do
      if x == 16 or x == 20 or y == 5 or y == 8 then
        setHex(img, x, y, (y == 5 or x == 16) and C_HI or OUT)
      else
        setHex(img, x, y, (x <= 18) and C_MD or C_DK)
      end
    end
  end
  setHex(img, 15, 6, M_HI); setHex(img, 15, 7, M_MD) -- Peen tip

  -- Hammer Handle (Wooden haft with tape wrapping)
  for i = 1, 12 do
    local hx = 17 - i
    local hy = 7 + i
    if math.abs(hx - 12) > 1 or math.abs(hy - 12) > 1 then
      -- Wrapped grip texture
      setHex(img, hx, hy, (i % 3 == 0) and M_HI or O_MD)
      setHex(img, hx - 1, hy, O_LT)
      setHex(img, hx + 1, hy, OUT)
    end
  end

  -- Central Crossed Joint (Rivet / Binding)
  setHex(img, 12, 11, C_HI); setHex(img, 13, 11, C_MD)
  setHex(img, 11, 12, C_HI); setHex(img, 12, 12, C_HI); setHex(img, 13, 12, C_DK)
  setHex(img, 12, 13, C_DK)

  saveAsset(spr, dirPil, "pilar_taller")
end

-- 5. torta_dorada_badge (Emblema sagrado de 4 cuadrantes armónicos - Oro Puro Reservado)
do
  local spr = Sprite(24, 24)
  local img = spr.cels[1].image

  local G_SUN = "#ffffff"
  local G_HI  = "#fef08a"
  local G_LT  = "#facc15"
  local G_MD  = "#eab308"
  local G_DK  = "#ca8a04"
  local G_DP  = "#854d0e"
  local G_OUT = "#422006"

  -- Radiant Golden Sunburst Aura
  for y = 2, 22 do
    for x = 2, 22 do
      local dist = math.sqrt((x - 11.5)^2 + (y - 11.5)^2)
      if dist <= 10.5 and dist >= 8.5 then
        setHex(img, x, y, G_LT, math.floor(90 - (dist - 8.5)*40))
      end
    end
  end

  -- 8 Radiant Sun Ray Spikes
  local rays = {
    {11, 2, G_SUN}, {12, 2, G_SUN}, {11, 3, G_HI}, {12, 3, G_HI}, -- North
    {11, 20, G_DK}, {12, 20, G_DK}, {11, 21, G_DP}, {12, 21, G_DP}, -- South
    {2, 11, G_HI}, {2, 12, G_HI}, {3, 11, G_LT}, {3, 12, G_LT}, -- West
    {20, 11, G_MD}, {20, 12, G_MD}, {21, 11, G_DK}, {21, 12, G_DK}, -- East
    {5, 5, G_SUN}, {6, 6, G_HI}, -- NW
    {18, 5, G_HI}, {17, 6, G_MD}, -- NE
    {5, 18, G_MD}, {6, 17, G_DK}, -- SW
    {18, 18, G_DK}, {17, 17, G_DP} -- SE
  }
  for _, ray in ipairs(rays) do
    setHex(img, ray[1], ray[2], ray[3])
  end

  -- Circular Golden Medallion Body (Radius 8, centered at 11.5, 11.5)
  for y = 4, 19 do
    for x = 4, 19 do
      local dist = math.sqrt((x - 11.5)^2 + (y - 11.5)^2)
      if dist <= 7.8 then
        if dist >= 6.8 then
          -- Outer Beveled Gold Ring
          setHex(img, x, y, (y <= 11 or x <= 11) and G_SUN or G_DP)
        else
          -- 4 Quadrants of the Pie Chart
          local isNorth = (y < 11.5)
          local isWest  = (x < 11.5)

          -- Cross Dividers (Separators between quadrants)
          if (x == 11 or x == 12) or (y == 11 or y == 12) then
            setHex(img, x, y, G_DP)
          else
            -- 4 Harmonious Golden Quadrants (NW: Cuerpo, NE: Mente, SW: Espíritu, SE: Taller)
            if isNorth and isWest then
              -- NW Quadrant (Cuerpo in Gold)
              setHex(img, x, y, (x <= 7 or y <= 7) and G_SUN or G_HI)
            elseif isNorth and not isWest then
              -- NE Quadrant (Mente in Gold)
              setHex(img, x, y, (y <= 7) and G_HI or G_LT)
            elseif not isNorth and isWest then
              -- SW Quadrant (Espíritu in Gold)
              setHex(img, x, y, (x <= 7) and G_LT or G_MD)
            else
              -- SE Quadrant (Taller in Gold)
              setHex(img, x, y, G_DK)
            end
          end
        end
      end
    end
  end

  -- Central Golden Diamond Star Jewel
  setHex(img, 11, 11, G_SUN); setHex(img, 12, 11, G_SUN)
  setHex(img, 11, 12, G_SUN); setHex(img, 12, 12, G_LT)
  setHex(img, 11, 10, G_SUN); setHex(img, 12, 10, G_SUN)
  setHex(img, 11, 13, G_LT); setHex(img, 12, 13, G_MD)
  setHex(img, 10, 11, G_SUN); setHex(img, 10, 12, G_HI)
  setHex(img, 13, 11, G_LT); setHex(img, 13, 12, G_DK)

  saveAsset(spr, dirPil, "torta_dorada_badge")
end