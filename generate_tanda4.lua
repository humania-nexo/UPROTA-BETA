local function setPx(img, x, y, r, g, b, a)
  a = a or 255
  if x >= 0 and x < 16 and y >= 0 and y < 16 then
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

local dir = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/emojis/objetos"

local function save(spr, name)
  spr:saveCopyAs(dir .. "/" .. name .. ".aseprite")
  spr:saveCopyAs(dir .. "/" .. name .. ".png")
  spr:close()
end

-- 1. emoji_brujula (🧭)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 3, 13 do for x = 3, 13 do
    local d = math.sqrt((x - 8)^2 + (y - 8)^2)
    if d <= 5.2 and d >= 4.2 then setHex(img, x, y, "#facc15")
    elseif d < 4.2 then setHex(img, x, y, "#0f172a") end
  end end
  setHex(img, 7, 7, "#ef4444"); setHex(img, 6, 6, "#ef4444"); setHex(img, 5, 5, "#ffffff") -- Red needle NW
  setHex(img, 9, 9, "#38bdf8"); setHex(img, 10, 10, "#38bdf8"); setHex(img, 11, 11, "#0284c7") -- Blue needle SE
  setHex(img, 8, 8, "#fde047")
  save(spr, "emoji_brujula")
end

-- 2. emoji_mochila (🎒)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 5, 13 do for x = 4, 12 do setHex(img, x, y, (x <= 7) and "#4d7c0f" or "#1a2e05") end end
  for x = 6, 10 do setHex(img, x, 3, "#78350f") end -- Handle
  for y = 5, 13 do setHex(img, 6, y, "#d97706"); setHex(img, 10, y, "#d97706") end -- Straps
  setHex(img, 6, 9, "#facc15"); setHex(img, 10, 9, "#facc15") -- Buckles
  save(spr, "emoji_mochila")
end

-- 3. emoji_cuchillo (🔪)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for i = 1, 8 do
    local bx = 14 - i; local by = 3 + i
    setHex(img, bx, by, "#ffffff"); setHex(img, bx + 1, by, "#94a3b8")
  end
  for i = 1, 4 do setHex(img, 6 - i, 11 + i, "#78350f"); setHex(img, 7 - i, 11 + i, "#451a03") end -- Handle
  save(spr, "emoji_cuchillo")
end

-- 4. emoji_hacha (🪓)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for i = 1, 9 do setHex(img, 4 + i, 14 - i, "#d97706"); setHex(img, 5 + i, 14 - i, "#78350f") end
  -- Axe head
  for y = 3, 7 do for x = 9, 13 do setHex(img, x, y, (x >= 12) and "#f1f5f9" or "#64748b") end end
  save(spr, "emoji_hacha")
end

-- 5. emoji_pala_construccion (⛏️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for i = 1, 9 do setHex(img, 3 + i, 13 - i, "#78350f") end
  -- Pickaxe iron head
  for i = 1, 6 do setHex(img, 9 + i, 3 + math.floor(i*0.8), "#94a3b8") end
  for i = 1, 6 do setHex(img, 12 - math.floor(i*0.8), 2 + i, "#94a3b8") end
  save(spr, "emoji_pala_construccion")
end

-- 6. emoji_linterna_reliquia (🔦)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for i = 1, 6 do setHex(img, 3 + i, 13 - i, "#eab308"); setHex(img, 4 + i, 13 - i, "#ca8a04") end
  setHex(img, 9, 6, "#facc15"); setHex(img, 10, 5, "#ca8a04")
  setHex(img, 12, 3, "#fef08a"); setHex(img, 13, 2, "#ffffff")
  save(spr, "emoji_linterna_reliquia")
end

-- 7. emoji_lupa_solar (🔎)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 3, 9 do for x = 7, 13 do
    local d = math.sqrt((x - 10)^2 + (y - 6)^2)
    if d <= 3.2 and d >= 2.2 then setHex(img, x, y, "#94a3b8")
    elseif d < 2.2 then setHex(img, x, y, "#e0f2fe") end
  end end
  for i = 1, 6 do setHex(img, 8 - i, 8 + i, "#78350f") end
  save(spr, "emoji_lupa_solar")
end

-- 8. emoji_radio_portatil (📻)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 6, 13 do for x = 3, 13 do setHex(img, x, y, (x <= 7) and "#52525b" or "#27272a") end end
  for y = 8, 12 do for x = 4, 8 do setHex(img, x, y, ((x + y) % 2 == 0) and "#a1a1aa" or "#18181b") end end -- Speaker
  setHex(img, 10, 8, "#38bdf8"); setHex(img, 11, 8, "#0284c7") -- Dial
  setHex(img, 10, 11, "#facc15") -- Knob
  setHex(img, 4, 5, "#a1a1aa"); setHex(img, 5, 4, "#a1a1aa"); setHex(img, 6, 3, "#ef4444") -- Antenna
  save(spr, "emoji_radio_portatil")
end

-- 9. emoji_bateria_celda (🔋)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 5, 11 do for x = 3, 12 do setHex(img, x, y, (x <= 7) and "#3b82f6" or "#1d4ed8") end end
  setHex(img, 13, 7, "#cbd5e1"); setHex(img, 13, 8, "#cbd5e1"); setHex(img, 13, 9, "#cbd5e1")
  save(spr, "emoji_bateria_celda")
end

-- 10. emoji_panel_solar (🎛️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 4, 12 do for x = 3, 13 do
    local isGrid = (x == 3 or x == 8 or x == 13 or y == 4 or y == 8 or y == 12)
    setHex(img, x, y, isGrid and "#94a3b8" or "#0284c7")
  end end
  save(spr, "emoji_panel_solar")
end

-- 11. emoji_dinamo_manivela (⚙️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 6, 12 do for x = 4, 10 do setHex(img, x, y, "#475569") end end
  -- Crank handle
  setHex(img, 8, 5, "#d97706"); setHex(img, 11, 5, "#d97706"); setHex(img, 11, 3, "#ef4444")
  save(spr, "emoji_dinamo_manivela")
end

-- 12. emoji_cable_empalme (🔌)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for x = 2, 7 do setHex(img, x, 8, "#1e293b") end
  for y = 6, 10 do for x = 8, 11 do setHex(img, x, y, "#475569") end end
  setHex(img, 12, 7, "#facc15"); setHex(img, 13, 7, "#facc15") -- Copper prongs
  setHex(img, 12, 9, "#facc15"); setHex(img, 13, 9, "#facc15")
  save(spr, "emoji_cable_empalme")
end

-- 13. emoji_alambre_rollo (🪢)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 4, 12 do for x = 4, 12 do
    local d = math.sqrt((x - 8)^2 + (y - 8)^2)
    if d <= 4.5 and d >= 2.5 then setHex(img, x, y, ((x + y) % 2 == 0) and "#d97706" or "#92400e") end
  end end
  save(spr, "emoji_alambre_rollo")
end

-- 14. emoji_cuerda_soga (🪢)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for i = 1, 9 do
    local sx = 3 + i; local sy = 3 + i
    setHex(img, sx, sy, "#fde047"); setHex(img, sx + 1, sy, "#ca8a04"); setHex(img, sx, sy + 1, "#713f12")
  end
  save(spr, "emoji_cuerda_soga")
end

-- 15. emoji_cinta_adhesiva (🩹)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 4, 12 do for x = 4, 12 do
    local d = math.sqrt((x - 8)^2 + (y - 8)^2)
    if d <= 4.5 and d >= 2.2 then setHex(img, x, y, (x <= 7) and "#94a3b8" or "#475569") end
  end end
  save(spr, "emoji_cinta_adhesiva")
end

-- 16. emoji_tubo_pvc (🚰)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for x = 3, 10 do for y = 6, 8 do setHex(img, x, y, (y == 6) and "#ffffff" or "#cbd5e1") end end
  for y = 9, 13 do for x = 8, 10 do setHex(img, x, y, (x == 8) and "#ffffff" or "#cbd5e1") end end -- Elbow
  save(spr, "emoji_tubo_pvc")
end

-- 17. emoji_tornillo_tuerca (🔩)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 3, 5 do for x = 6, 10 do setHex(img, x, y, (y == 3) and "#f1f5f9" or "#64748b") end end -- Bolt head
  for y = 6, 13 do
    for x = 7, 9 do setHex(img, x, y, (y % 2 == 0) and "#f1f5f9" or "#475569") end -- Threads
  end
  save(spr, "emoji_tornillo_tuerca")
end

-- 18. emoji_llave_inglesa (🔧)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for i = 1, 8 do setHex(img, 4 + i, 12 - i, "#94a3b8"); setHex(img, 5 + i, 12 - i, "#475569") end
  setHex(img, 11, 4, "#f1f5f9"); setHex(img, 12, 4, "#f1f5f9"); setHex(img, 12, 5, "#475569")
  save(spr, "emoji_llave_inglesa")
end

-- 19. emoji_aceitera (🛢️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 7, 13 do for x = 4, 10 do setHex(img, x, y, (x <= 6) and "#f59e0b" or "#b45309") end end -- Body
  setHex(img, 10, 6, "#94a3b8"); setHex(img, 11, 5, "#94a3b8"); setHex(img, 12, 4, "#94a3b8"); setHex(img, 13, 3, "#94a3b8") -- Spout
  setHex(img, 13, 2, "#facc15") -- Oil drop
  save(spr, "emoji_aceitera")
end

-- 20. emoji_piedra_afilar (🪨)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 6, 11 do for x = 3, 13 do
    if y <= 8 then setHex(img, x, y, (x <= 7) and "#cbd5e1" or "#94a3b8") -- Top fine grit
    else setHex(img, x, y, (x <= 7) and "#64748b" or "#334155") end       -- Bottom coarse grit
  end end
  save(spr, "emoji_piedra_afilar")
end

-- 21. emoji_olla_hervir (🍲)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 6, 13 do for x = 4, 12 do setHex(img, x, y, (x <= 7) and "#64748b" or "#1e293b") end end
  for x = 5, 11 do setHex(img, x, 6, "#38bdf8") end -- Water boiling
  setHex(img, 2, 7, "#64748b"); setHex(img, 3, 7, "#64748b") -- Left handle
  setHex(img, 13, 7, "#64748b"); setHex(img, 14, 7, "#64748b") -- Right handle
  save(spr, "emoji_olla_hervir")
end

-- 22. emoji_sarten_cocina (🍳)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 4, 11 do for x = 3, 10 do
    local d = math.sqrt((x - 6.5)^2 + (y - 7.5)^2)
    if d <= 3.8 then setHex(img, x, y, (d <= 2) and "#fef08a" or "#1e293b") end
  end end
  for i = 1, 5 do setHex(img, 9 + i, 8 + i, "#475569") end -- Handle
  save(spr, "emoji_sarten_cocina")
end

-- 23. emoji_botella_filtro (🍶)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 6, 13 do for x = 5, 11 do
    if y <= 7 then setHex(img, x, y, "#78350f") -- Gravel layer
    elseif y <= 9 then setHex(img, x, y, "#fde047") -- Sand layer
    elseif y <= 11 then setHex(img, x, y, "#1e293b") -- Charcoal layer
    else setHex(img, x, y, "#38bdf8") end -- Clean water
  end end
  setHex(img, 8, 3, "#78350f"); setHex(img, 8, 4, "#78350f") -- Cork
  save(spr, "emoji_botella_filtro")
end

-- 24. emoji_cantimplora (🫗)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 5, 13 do for x = 4, 12 do
    local d = math.sqrt((x - 8)^2 + (y - 9)^2)
    if d <= 4.2 then setHex(img, x, y, (x <= 7) and "#65a30d" or "#3f6212") end
  end end
  setHex(img, 8, 3, "#94a3b8"); setHex(img, 8, 4, "#94a3b8") -- Cap
  save(spr, "emoji_cantimplora")
end

-- 25. emoji_trampa_lazo (🪤)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for x = 3, 13 do setHex(img, x, 12, "#78350f"); setHex(img, x, 13, "#451a03") end -- Base
  for y = 5, 11 do for x = 5, 11 do
    local d = math.sqrt((x - 8)^2 + (y - 8)^2)
    if d <= 3.2 and d >= 2.2 then setHex(img, x, y, "#facc15") end -- Wire snare loop
  end end
  save(spr, "emoji_trampa_lazo")
end

-- 26. emoji_arco_flecha (🏹)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Curved Bow
  for y = 2, 14 do
    local bx = 4 + math.sin((y - 2) / 12 * 3.1416) * 4
    setHex(img, math.floor(bx), y, "#78350f")
  end
  for y = 2, 14 do setHex(img, 4, y, "#e2e8f0") end -- Bowstring
  -- Arrow
  for x = 3, 13 do setHex(img, x, 8, "#d97706") end
  setHex(img, 13, 7, "#94a3b8"); setHex(img, 14, 8, "#ffffff"); setHex(img, 13, 9, "#94a3b8") -- Arrowhead
  save(spr, "emoji_arco_flecha")
end

-- 27. emoji_guitarra_acustica (🎸)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Acoustic Guitar
  for y = 7, 13 do for x = 3, 10 do
    local d = math.sqrt((x - 6.5)^2 + (y - 10)^2)
    if d <= 3.8 then setHex(img, x, y, (d <= 1.2) and "#1e293b" or ((x <= 6) and "#d97706" or "#92400e")) end
  end end
  for i = 1, 7 do setHex(img, 6 + i, 10 - i, "#78350f") end -- Neck
  setHex(img, 13, 3, "#ca8a04"); setHex(img, 14, 2, "#ca8a04") -- Headstock
  save(spr, "emoji_guitarra_acustica")
end

-- 28. emoji_violin_lutier (🎻)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Luthier's Violin
  for y = 7, 13 do for x = 3, 9 do
    local d = math.sqrt((x - 6)^2 + (y - 10)^2)
    if d <= 3.5 then setHex(img, x, y, (x <= 6) and "#b45309" or "#78350f") end
  end end
  for i = 1, 7 do setHex(img, 5 + i, 9 - i, "#1e293b") end -- Fingerboard
  -- Bow crossing
  for i = 1, 9 do setHex(img, 2 + i, 6 + i, "#fde047") end
  save(spr, "emoji_violin_lutier")
end

-- 29. emoji_nota_musical (🎵)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Musical Note
  for y = 9, 12 do for x = 4, 7 do setHex(img, x, y, "#a855f7") end end -- Note 1
  for y = 7, 10 do for x = 10, 13 do setHex(img, x, y, "#a855f7") end end -- Note 2
  for y = 4, 10 do setHex(img, 7, y, "#7e22ce"); setHex(img, 13, y, "#7e22ce") end -- Stems
  for x = 7, 13 do setHex(img, x, 4, "#a855f7"); setHex(img, x, 5, "#7e22ce") end -- Beam
  save(spr, "emoji_nota_musical")
end

-- 30. emoji_partitura_musica (🎶)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Sheet music paper
  for y = 3, 13 do for x = 3, 13 do setHex(img, x, y, (x == 3 or x == 13 or y == 3 or y == 13) and "#ca8a04" or "#fef9c3") end end
  for y = 5, 11, 2 do for x = 5, 11 do setHex(img, x, y, "#713f12") end end -- Music staff lines
  setHex(img, 6, 6, "#a855f7"); setHex(img, 9, 8, "#a855f7") -- Notes
  save(spr, "emoji_partitura_musica")
end

-- 31. emoji_pincel_artista (🖌️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Pix the Artist's brush!
  for i = 1, 7 do setHex(img, 4 + i, 12 - i, "#78350f") end -- Wooden handle
  setHex(img, 11, 5, "#94a3b8"); setHex(img, 12, 4, "#cbd5e1") -- Ferrule
  setHex(img, 13, 3, "#38bdf8"); setHex(img, 14, 2, "#0284c7") -- Cyan Paint bristles!
  save(spr, "emoji_pincel_artista")
end

-- 32. emoji_paleta_pintor (🎨)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Artist Palette (Pix signature!)
  for y = 3, 13 do for x = 3, 13 do
    local d = math.sqrt((x - 8)^2 + (y - 8)^2)
    if d <= 5.2 then setHex(img, x, y, (x <= 7) and "#d97706" or "#92400e") end
  end end
  setHex(img, 11, 10, "#000000", 0) -- Thumb hole
  -- 4 Pillars paint spots: Red, Blue, Purple, Green
  setHex(img, 5, 5, "#ef4444"); setHex(img, 8, 4, "#38bdf8")
  setHex(img, 11, 5, "#c084fc"); setHex(img, 5, 9, "#84cc16")
  save(spr, "emoji_paleta_pintor")
end

-- 33. emoji_mapa_yermo (🗺️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Exploration Map
  for y = 3, 13 do for x = 3, 13 do setHex(img, x, y, (x <= 6) and "#fef08a" or ((x <= 10) and "#fde047" or "#eab308")) end end
  -- Trail & X marks the spot
  setHex(img, 5, 10, "#78350f"); setHex(img, 7, 8, "#78350f"); setHex(img, 9, 8, "#78350f")
  setHex(img, 11, 5, "#ef4444"); setHex(img, 12, 6, "#ef4444"); setHex(img, 11, 6, "#ef4444") -- Red X!
  save(spr, "emoji_mapa_yermo")
end

-- 34. emoji_reloj_pulsera (⌚)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 2, 14 do setHex(img, 7, y, "#78350f"); setHex(img, 8, y, "#451a03") end -- Leather strap
  for y = 6, 10 do for x = 5, 10 do
    local d = math.sqrt((x - 7.5)^2 + (y - 8)^2)
    if d <= 2.8 then setHex(img, x, y, (d <= 1.8) and "#ffffff" or "#ca8a04") end
  end end
  setHex(img, 7, 8, "#0f172a"); setHex(img, 8, 7, "#0f172a") -- Hands
  save(spr, "emoji_reloj_pulsera")
end

-- 35. emoji_gafas_proteccion (🥽)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Workshop safety goggles
  for y = 6, 10 do
    for x = 3, 7 do setHex(img, x, y, (x == 3 or x == 7 or y == 6 or y == 10) and "#ca8a04" or "#38bdf8") end
    for x = 9, 13 do setHex(img, x, y, (x == 9 or x == 13 or y == 6 or y == 10) and "#ca8a04" or "#38bdf8") end
  end
  setHex(img, 8, 8, "#ca8a04") -- Bridge
  setHex(img, 2, 8, "#78350f"); setHex(img, 14, 8, "#78350f") -- Strap
  save(spr, "emoji_gafas_proteccion")
end

-- 36. emoji_guantes_trabajo (🧤)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Leather work gloves
  for y = 5, 13 do for x = 4, 11 do setHex(img, x, y, (x <= 7) and "#d97706" or "#92400e") end end
  for x = 5, 10 do setHex(img, x, 4, "#d97706") end -- Fingers
  setHex(img, 3, 8, "#d97706") -- Thumb
  for x = 4, 11 do setHex(img, x, 12, "#78350f") end -- Cuff
  save(spr, "emoji_guantes_trabajo")
end

-- 37. emoji_botas_goma (👢)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Rubber explorer boot
  for y = 4, 11 do for x = 5, 9 do setHex(img, x, y, (x <= 6) and "#facc15" or "#ca8a04") end end
  for y = 10, 13 do for x = 5, 13 do setHex(img, x, y, (y == 13) and "#1e293b" or "#facc15") end end
  save(spr, "emoji_botas_goma")
end

-- 38. emoji_sombrero_paja (👒)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for x = 2, 14 do setHex(img, x, 9, "#fde047"); setHex(img, x, 10, "#ca8a04") end -- Brim
  for y = 5, 8 do for x = 5, 11 do setHex(img, x, y, (x <= 7) and "#fde047" or "#eab308") end end -- Crown
  for x = 5, 11 do setHex(img, x, 8, "#ef4444") end -- Red ribbon
  save(spr, "emoji_sombrero_paja")
end

-- 39. emoji_casa_refugio (🏠)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Shelter cottage
  for y = 3, 7 do
    local w = (y - 3) + 2
    for dx = -w, w do setHex(img, 8 + dx, y, (dx <= 0) and "#ef4444" or "#991b1b") end
  end
  for y = 8, 13 do for x = 4, 12 do setHex(img, x, y, (x <= 7) and "#d97706" or "#92400e") end end
  setHex(img, 7, 10, "#fde047"); setHex(img, 8, 10, "#fde047"); setHex(img, 7, 11, "#78350f"); setHex(img, 8, 11, "#78350f") -- Door
  save(spr, "emoji_casa_refugio")
end

-- 40. emoji_puerta_madera (🚪)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 2, 14 do for x = 4, 12 do
    if x == 4 or x == 12 or y == 2 or y == 14 then setHex(img, x, y, "#451a03")
    else setHex(img, x, y, (x <= 7) and "#b45309" or "#78350f") end
  end end
  setHex(img, 10, 8, "#facc15") -- Golden knob
  save(spr, "emoji_puerta_madera")
end

-- 41. emoji_ventana_vidrio (🪟)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 3, 13 do for x = 3, 13 do
    local isFrame = (x == 3 or x == 8 or x == 13 or y == 3 or y == 8 or y == 13)
    setHex(img, x, y, isFrame and "#78350f" or "#38bdf8")
  end end
  setHex(img, 5, 5, "#ffffff"); setHex(img, 10, 10, "#ffffff") -- Glints
  save(spr, "emoji_ventana_vidrio")
end

-- 42. emoji_cama_catre (🛏️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  setHex(img, 2, 6, "#78350f"); setHex(img, 2, 7, "#78350f"); setHex(img, 2, 12, "#451a03") -- Headboard
  setHex(img, 14, 8, "#78350f"); setHex(img, 14, 12, "#451a03") -- Footboard
  for x = 3, 13 do setHex(img, x, 10, "#d97706") end -- Frame
  setHex(img, 4, 8, "#ffffff"); setHex(img, 5, 8, "#ffffff") -- Pillow
  for x = 6, 13 do setHex(img, x, 8, "#3b82f6"); setHex(img, x, 9, "#1d4ed8") end -- Blanket
  save(spr, "emoji_cama_catre")
end

-- 43. emoji_horno_barro (🧱)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Clay oven
  for y = 5, 13 do for x = 4, 12 do
    local d = math.sqrt((x - 8)^2 + (y - 9)^2)
    if d <= 4.2 then setHex(img, x, y, (x <= 7) and "#ea580c" or "#9a3412") end
  end end
  setHex(img, 7, 10, "#1e293b"); setHex(img, 8, 10, "#facc15"); setHex(img, 9, 10, "#ea580c") -- Fire mouth
  save(spr, "emoji_horno_barro")
end

-- 44. emoji_letrina_higiene (🚽)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Clean latrine box
  for y = 7, 13 do for x = 5, 11 do setHex(img, x, y, (x <= 7) and "#f8fafc" or "#cbd5e1") end end
  for y = 3, 7 do for x = 4, 7 do setHex(img, x, y, "#94a3b8") end end -- Cistern
  save(spr, "emoji_letrina_higiene")
end

-- 45. emoji_simbolo_peligro (⚠️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Warning Triangle
  for y = 3, 13 do
    local w = (y - 3)
    for dx = -w, w do
      local x = 8 + dx
      if math.abs(dx) == w or y == 13 then setHex(img, x, y, "#ca8a04")
      else setHex(img, x, y, "#facc15") end
    end
  end
  setHex(img, 8, 6, "#0f172a"); setHex(img, 8, 7, "#0f172a"); setHex(img, 8, 8, "#0f172a") -- !
  setHex(img, 8, 11, "#0f172a") -- Dot
  save(spr, "emoji_simbolo_peligro")
end

-- 46. emoji_simbolo_prohibido (🚫)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 3, 13 do for x = 3, 13 do
    local d = math.sqrt((x - 8)^2 + (y - 8)^2)
    if d <= 5.2 and d >= 3.8 then setHex(img, x, y, "#ef4444") end
  end end
  for i = 1, 7 do setHex(img, 4 + i, 4 + i, "#ef4444") end -- Slash
  save(spr, "emoji_simbolo_prohibido")
end

-- 47. emoji_simbolo_infinito (♾️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Infinity loop / Daily discipline
  for y = 6, 10 do
    setHex(img, 4, y, "#38bdf8"); setHex(img, 12, y, "#38bdf8")
  end
  setHex(img, 5, 5, "#38bdf8"); setHex(img, 6, 5, "#38bdf8"); setHex(img, 10, 5, "#38bdf8"); setHex(img, 11, 5, "#38bdf8")
  setHex(img, 5, 11, "#38bdf8"); setHex(img, 6, 11, "#38bdf8"); setHex(img, 10, 11, "#38bdf8"); setHex(img, 11, 11, "#38bdf8")
  setHex(img, 8, 8, "#ffffff")
  save(spr, "emoji_simbolo_infinito")
end

-- 48. emoji_simbolo_mas (➕)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Add new custom senda
  for y = 4, 12 do setHex(img, 8, y, "#22c55e"); setHex(img, 7, y, "#16a34a"); setHex(img, 9, y, "#16a34a") end
  for x = 4, 12 do setHex(img, x, 8, "#22c55e"); setHex(img, x, 7, "#16a34a"); setHex(img, x, 9, "#16a34a") end
  save(spr, "emoji_simbolo_mas")
end

-- 49. emoji_simbolo_check (✅)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 3, 13 do for x = 3, 13 do setHex(img, x, y, "#22c55e") end end
  -- White check inside green box
  for i = 0, 2 do setHex(img, 5 + i, 8 + i, "#ffffff") end
  for i = 0, 5 do setHex(img, 7 + i, 10 - i, "#ffffff") end
  save(spr, "emoji_simbolo_check")
end

-- 50. emoji_simbolo_cruz (✝️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Don Chui's Faith Cross
  for y = 2, 14 do setHex(img, 8, y, "#fde047"); setHex(img, 9, y, "#ca8a04") end -- Vertical
  for x = 5, 12 do setHex(img, x, 5, "#fde047"); setHex(img, x, 6, "#ca8a04") end -- Horizontal
  setHex(img, 8, 5, "#ffffff") -- Center glint
  save(spr, "emoji_simbolo_cruz")
end