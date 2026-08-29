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

local dir = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/emojis/naturaleza"

local function save(spr, name)
  spr:saveCopyAs(dir .. "/" .. name .. ".aseprite")
  spr:saveCopyAs(dir .. "/" .. name .. ".png")
  spr:close()
end

-- 1. emoji_arbol_pino (🌲)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Pine tree
  for y = 2, 5 do for x = 8 - (y-2), 8 + (y-2) do setHex(img, x, y, (x <= 8) and "#84cc16" or "#4d7c0f") end end
  for y = 5, 8 do for x = 8 - (y-4), 8 + (y-4) do setHex(img, x, y, (x <= 8) and "#65a30d" or "#3f6212") end end
  for y = 8, 12 do for x = 8 - (y-6), 8 + (y-6) do setHex(img, x, y, (x <= 8) and "#4d7c0f" or "#1a2e05") end end
  for y = 12, 14 do for x = 7, 9 do setHex(img, x, y, "#78350f") end end -- Trunk
  save(spr, "emoji_arbol_pino")
end

-- 2. emoji_arbol_roble (🌳)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Deciduous Oak
  for y = 2, 10 do for x = 3, 13 do
    local d = math.sqrt((x - 8)^2 + (y - 6)^2)
    if d <= 4.5 then setHex(img, x, y, (x <= 7 or y <= 5) and "#84cc16" or "#3f6212") end
  end end
  for y = 10, 14 do for x = 7, 9 do setHex(img, x, y, "#78350f") end end
  save(spr, "emoji_arbol_roble")
end

-- 3. emoji_hoja_otono (🍂)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for i = 1, 8 do
    local lx = 4 + i; local ly = 12 - i
    setHex(img, lx, ly, "#ea580c"); setHex(img, lx + 1, ly, "#c2410c")
    setHex(img, lx, ly + 1, "#f97316"); setHex(img, lx - 1, ly, "#78350f")
  end
  setHex(img, 4, 13, "#78350f") -- Stem
  save(spr, "emoji_hoja_otono")
end

-- 4. emoji_hoja_verde (🍃)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for i = 1, 8 do
    local lx = 4 + i; local ly = 12 - i
    setHex(img, lx, ly, "#84cc16"); setHex(img, lx + 1, ly, "#4d7c0f")
    setHex(img, lx, ly + 1, "#a3e635"); setHex(img, lx - 1, ly, "#1a2e05")
  end
  setHex(img, 4, 13, "#3f6212")
  save(spr, "emoji_hoja_verde")
end

-- 5. emoji_flor_manzanilla (🌼)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- White petals
  local petals = {{8,3},{8,4},{8,12},{8,11},{3,8},{4,8},{12,8},{11,8},{5,5},{11,5},{5,11},{11,11}}
  for _, p in ipairs(petals) do setHex(img, p[1], p[2], "#ffffff") end
  -- Center yellow disc
  for y = 7, 9 do for x = 7, 9 do setHex(img, x, y, (x == 7 and y == 7) and "#fef08a" or "#eab308") end end
  save(spr, "emoji_flor_manzanilla")
end

-- 6. emoji_cactus_nopal (🌵)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Main trunk
  for y = 3, 14 do for x = 7, 9 do setHex(img, x, y, (x == 7) and "#84cc16" or "#4d7c0f") end end
  -- Left arm
  for x = 4, 6 do setHex(img, x, 7, "#65a30d") end
  for y = 5, 7 do setHex(img, 4, y, "#84cc16") end
  -- Right arm
  for x = 10, 12 do setHex(img, x, 9, "#4d7c0f") end
  for y = 7, 9 do setHex(img, 12, y, "#3f6212") end
  -- Red prickly pear fruit
  setHex(img, 4, 4, "#ef4444"); setHex(img, 8, 2, "#ef4444")
  save(spr, "emoji_cactus_nopal")
end

-- 7. emoji_hongo_silvestre (🍄)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Red cap with white spots
  for y = 3, 8 do
    local w = math.floor((y - 3) * 5 / 5) + 1
    for dx = -w, w do setHex(img, 8 + dx, y, (dx <= 0) and "#ef4444" or "#991b1b") end
  end
  setHex(img, 6, 5, "#ffffff"); setHex(img, 10, 5, "#ffffff"); setHex(img, 8, 4, "#ffffff") -- Spots
  -- Stem
  for y = 9, 13 do for x = 7, 9 do setHex(img, x, y, (x == 7) and "#f8fafc" or "#cbd5e1") end end
  save(spr, "emoji_hongo_silvestre")
end

-- 8. emoji_madera_tronco (🪵)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Cut wood log
  for y = 5, 11 do for x = 3, 6 do
    local d = math.sqrt((x - 4.5)^2 * 2 + (y - 8)^2)
    if d <= 3.2 then setHex(img, x, y, (d <= 1.5) and "#78350f" or "#d97706") end
  end end
  for y = 5, 11 do for x = 7, 13 do setHex(img, x, y, (y <= 7) and "#b45309" or "#78350f") end end
  save(spr, "emoji_madera_tronco")
end

-- 9. emoji_nube_gris (☁️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 5, 11 do for x = 3, 13 do
    local d = math.sqrt((x - 8)^2 + (y - 8)^2)
    if d <= 4.5 then setHex(img, x, y, (y <= 7) and "#e2e8f0" or "#94a3b8") end
  end end
  setHex(img, 5, 9, "#e2e8f0"); setHex(img, 11, 9, "#94a3b8")
  save(spr, "emoji_nube_gris")
end

-- 10. emoji_lluvia_tormenta (🌧️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Cloud
  for y = 3, 8 do for x = 3, 13 do
    local d = math.sqrt((x - 8)^2 + (y - 5.5)^2)
    if d <= 4.2 then setHex(img, x, y, (y <= 5) and "#cbd5e1" or "#64748b") end
  end end
  -- Rain drops
  setHex(img, 5, 10, "#38bdf8"); setHex(img, 4, 12, "#0284c7")
  setHex(img, 8, 11, "#38bdf8"); setHex(img, 7, 13, "#0284c7")
  setHex(img, 11, 10, "#38bdf8"); setHex(img, 10, 12, "#0284c7")
  save(spr, "emoji_lluvia_tormenta")
end

-- 11. emoji_nieve_frio (❄️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Snowflake
  for i = 2, 14 do setHex(img, 8, i, "#38bdf8"); setHex(img, i, 8, "#38bdf8") end
  setHex(img, 8, 8, "#ffffff")
  -- Diagonals
  setHex(img, 5, 5, "#93c5fd"); setHex(img, 11, 5, "#93c5fd"); setHex(img, 5, 11, "#93c5fd"); setHex(img, 11, 11, "#93c5fd")
  save(spr, "emoji_nieve_frio")
end

-- 12. emoji_viento_aire (💨)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Wind gust
  for x = 2, 11 do setHex(img, x, 6, "#cbd5e1") end
  setHex(img, 12, 5, "#e2e8f0"); setHex(img, 13, 6, "#94a3b8"); setHex(img, 12, 7, "#64748b")
  for x = 4, 13 do setHex(img, x, 9, "#e2e8f0") end
  setHex(img, 14, 8, "#ffffff"); setHex(img, 14, 10, "#94a3b8")
  save(spr, "emoji_viento_aire")
end

-- 13. emoji_gota_agua (💧)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 3, 13 do
    local w = math.floor((y - 3) * 4 / 9)
    for dx = -w, w do setHex(img, 8 + dx, y, (dx <= 0) and "#38bdf8" or "#0284c7") end
  end
  setHex(img, 8, 2, "#38bdf8"); setHex(img, 6, 8, "#ffffff")
  save(spr, "emoji_gota_agua")
end

-- 14. emoji_rio_agua (🌊)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- River / Water wave
  for y = 7, 13 do for x = 2, 14 do
    local wave = math.sin(x * 0.8) * 2
    if y >= 8 + wave then setHex(img, x, y, (y <= 9 + wave) and "#38bdf8" or "#0284c7") end
  end end
  setHex(img, 4, 6, "#ffffff"); setHex(img, 12, 7, "#ffffff") -- Crest foam
  save(spr, "emoji_rio_agua")
end

-- 15. emoji_montana_sierra (⛰️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Big mountain peak
  for y = 3, 13 do
    local w = (y - 3)
    for dx = -w, w do
      local x = 8 + dx
      if y <= 6 then setHex(img, x, y, (dx <= 0) and "#ffffff" or "#cbd5e1") -- Snowcap
      else setHex(img, x, y, (dx <= 0) and "#78350f" or "#451a03") end
    end
  end
  save(spr, "emoji_montana_sierra")
end

-- 16. emoji_huella_animal (🐾)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Paw print (Tracking / Hunting vereda)
  for y = 8, 12 do for x = 6, 10 do setHex(img, x, y, "#78350f") end end -- Main pad
  setHex(img, 5, 5, "#b45309"); setHex(img, 7, 4, "#b45309"); setHex(img, 9, 4, "#b45309"); setHex(img, 11, 5, "#b45309") -- 4 Toes
  save(spr, "emoji_huella_animal")
end

-- 17. emoji_conejo_monte (🐇)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Wild Hare / Rabbit
  for y = 7, 12 do for x = 5, 11 do setHex(img, x, y, (x <= 7) and "#f8fafc" or "#cbd5e1") end end -- Body
  setHex(img, 5, 6, "#f8fafc"); setHex(img, 6, 6, "#cbd5e1") -- Head
  setHex(img, 5, 7, "#ef4444") -- Pink eye
  setHex(img, 4, 3, "#f8fafc"); setHex(img, 4, 4, "#f8fafc"); setHex(img, 5, 3, "#f8fafc"); setHex(img, 5, 4, "#f8fafc") -- Ears
  setHex(img, 12, 9, "#ffffff") -- Fluffy tail
  save(spr, "emoji_conejo_monte")
end

-- 18. emoji_gallina_silvestre (🐔)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Feral Hen
  for y = 6, 12 do for x = 5, 11 do setHex(img, x, y, (x <= 8) and "#d97706" or "#92400e") end end -- Body
  setHex(img, 11, 5, "#ef4444") -- Red comb
  setHex(img, 12, 7, "#facc15") -- Yellow beak
  setHex(img, 10, 6, "#1e293b") -- Eye
  setHex(img, 7, 13, "#ca8a04"); setHex(img, 9, 13, "#ca8a04") -- Legs
  save(spr, "emoji_gallina_silvestre")
end

-- 19. emoji_pajaro_paloma (🕊️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Flying dove
  setHex(img, 4, 7, "#ffffff"); setHex(img, 3, 7, "#facc15") -- Head & beak
  for y = 7, 9 do for x = 5, 10 do setHex(img, x, y, "#f8fafc") end end -- Body
  for y = 3, 6 do for x = 6, 9 do setHex(img, x, y, (y == 3) and "#ffffff" or "#cbd5e1") end end -- Upraised wing
  setHex(img, 11, 10, "#94a3b8"); setHex(img, 12, 11, "#cbd5e1") -- Tail
  save(spr, "emoji_pajaro_paloma")
end

-- 20. emoji_pescado_rio (🐟)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- River Trout
  for y = 6, 10 do
    for x = 3, 11 do
      local d = math.sqrt((x - 7)^2 * 0.8 + (y - 8)^2 * 2)
      if d <= 3.2 then setHex(img, x, y, (y <= 7) and "#38bdf8" or "#0284c7") end
    end
  end
  setHex(img, 4, 7, "#1e293b") -- Eye
  setHex(img, 12, 6, "#0284c7"); setHex(img, 13, 5, "#38bdf8"); setHex(img, 12, 10, "#0284c7"); setHex(img, 13, 11, "#38bdf8") -- Tail fin
  save(spr, "emoji_pescado_rio")
end

-- 21. emoji_lobo_perro (🐺)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Wolf / Dog guardian
  for y = 5, 11 do for x = 4, 12 do setHex(img, x, y, (x <= 7) and "#94a3b8" or "#475569") end end
  setHex(img, 4, 3, "#64748b"); setHex(img, 10, 3, "#475569") -- Ears
  setHex(img, 5, 7, "#facc15"); setHex(img, 9, 7, "#facc15") -- Amber eyes
  setHex(img, 7, 10, "#0f172a") -- Black nose
  save(spr, "emoji_lobo_perro")
end

-- 22. emoji_jabali_monte (🐗)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Wild Boar
  for y = 5, 12 do for x = 3, 12 do setHex(img, x, y, (x <= 6) and "#78350f" or "#451a03") end end
  setHex(img, 2, 9, "#f8fafc"); setHex(img, 2, 8, "#f8fafc") -- White tusk
  setHex(img, 5, 6, "#ef4444") -- Fierce eye
  save(spr, "emoji_jabali_monte")
end

-- 23. emoji_insecto_abeja (🐝)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Honeybee
  for y = 6, 10 do for x = 5, 11 do
    local isStripe = (x == 6 or x == 8 or x == 10)
    setHex(img, x, y, isStripe and "#1e293b" or "#facc15")
  end end
  setHex(img, 7, 4, "#93c5fd"); setHex(img, 8, 3, "#e0f2fe"); setHex(img, 9, 4, "#93c5fd") -- Wings
  setHex(img, 12, 8, "#1e293b") -- Stinger
  save(spr, "emoji_insecto_abeja")
end

-- 24. emoji_insecto_mariposa (🦋)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 4, 12 do setHex(img, 8, y, "#0f172a") end -- Body
  -- Cyan/Blue wings
  for y = 3, 7 do for x = 3, 7 do setHex(img, x, y, (x == 3 or y == 3) and "#38bdf8" or "#0284c7") end end
  for y = 3, 7 do for x = 9, 13 do setHex(img, x, y, (x == 13 or y == 3) and "#38bdf8" or "#0284c7") end end
  for y = 8, 12 do for x = 4, 7 do setHex(img, x, y, "#0284c7") end end
  for y = 8, 12 do for x = 9, 12 do setHex(img, x, y, "#0284c7") end end
  save(spr, "emoji_insecto_mariposa")
end

-- 25. emoji_raton_campo (🐁)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Field Mouse
  for y = 7, 11 do for x = 4, 10 do setHex(img, x, y, (x <= 6) and "#94a3b8" or "#64748b") end end
  setHex(img, 3, 9, "#f472b6") -- Pink snout
  setHex(img, 4, 8, "#0f172a") -- Beady eye
  setHex(img, 5, 5, "#f472b6"); setHex(img, 6, 6, "#94a3b8") -- Ear
  for x = 11, 14 do setHex(img, x, 11 - (x-11), "#f472b6") end -- Long tail
  save(spr, "emoji_raton_campo")
end

-- 26. emoji_lagartija_sol (🦎)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Lizard basking
  for i = 1, 9 do setHex(img, 3 + i, 3 + i, "#84cc16"); setHex(img, 4 + i, 3 + i, "#4d7c0f") end
  -- 4 feet
  setHex(img, 4, 6, "#65a30d"); setHex(img, 7, 4, "#65a30d")
  setHex(img, 8, 11, "#65a30d"); setHex(img, 11, 9, "#65a30d")
  save(spr, "emoji_lagartija_sol")
end

-- 27. emoji_caracol_tierra (🐌)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Snail with spiral shell
  for y = 5, 11 do for x = 6, 12 do
    local d = math.sqrt((x - 9)^2 + (y - 8)^2)
    if d <= 3.2 then setHex(img, x, y, (d <= 1.5) and "#78350f" or "#d97706") end
  end end
  for x = 2, 9 do setHex(img, x, 12, "#cbd5e1") end -- Slime foot
  setHex(img, 3, 10, "#94a3b8"); setHex(img, 2, 9, "#94a3b8") -- Eyestalks
  save(spr, "emoji_caracol_tierra")
end

-- 28. emoji_huevo_fresco (🥚)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Egg
  for y = 3, 13 do
    local w = math.floor((y - 3) * 3 / 8) + 1
    if y > 9 then w = math.floor((13 - y) * 3 / 4) + 1 end
    for dx = -w, w do setHex(img, 8 + dx, y, (dx <= 0) and "#fef9c3" or "#e2e8f0") end
  end
  setHex(img, 7, 5, "#ffffff") -- Highlight
  save(spr, "emoji_huevo_fresco")
end

-- 29. emoji_carne_asada (🥩)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Dried meat / Jerky steak
  for y = 5, 12 do for x = 3, 12 do
    local d = math.sqrt((x - 7.5)^2 + (y - 8.5)^2)
    if d <= 4.2 then setHex(img, x, y, (x <= 6) and "#ef4444" or "#991b1b") end
  end end
  setHex(img, 5, 7, "#ffffff"); setHex(img, 6, 7, "#ffffff") -- Bone / marbling
  save(spr, "emoji_carne_asada")
end

-- 30. emoji_pan_rustico (🍞)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Crusty bread loaf
  for y = 5, 12 do for x = 3, 13 do
    if y <= 7 then setHex(img, x, y, (x <= 7) and "#d97706" or "#92400e") -- Dark crust
    else setHex(img, x, y, (x <= 7) and "#fef08a" or "#eab308") end       -- Crumb
  end end
  -- Slits in crust
  setHex(img, 5, 5, "#451a03"); setHex(img, 8, 5, "#451a03"); setHex(img, 11, 5, "#451a03")
  save(spr, "emoji_pan_rustico")
end

-- 31. emoji_sopa_olla (🍲)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Pot of hot stew
  for y = 7, 13 do for x = 4, 12 do setHex(img, x, y, (x <= 7) and "#94a3b8" or "#475569") end end
  for x = 5, 11 do setHex(img, x, 7, "#ea580c") end -- Stew soup
  -- Steam puffs
  setHex(img, 6, 4, "#cbd5e1"); setHex(img, 8, 3, "#cbd5e1"); setHex(img, 10, 4, "#cbd5e1")
  save(spr, "emoji_sopa_olla")
end

-- 32. emoji_te_infusion (🍵)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Herbal tea cup
  for y = 7, 13 do for x = 4, 12 do setHex(img, x, y, (x <= 7) and "#cbd5e1" or "#94a3b8") end end
  for x = 5, 11 do setHex(img, x, 7, "#84cc16") end -- Green tea surface
  setHex(img, 7, 4, "#cbd5e1"); setHex(img, 9, 3, "#cbd5e1") -- Steam
  save(spr, "emoji_te_infusion")
end

-- 33. emoji_cafe_taza (☕)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Tin coffee mug
  for y = 7, 13 do for x = 4, 11 do setHex(img, x, y, (x <= 7) and "#e2e8f0" or "#94a3b8") end end
  for x = 5, 10 do setHex(img, x, 7, "#451a03") end -- Black coffee
  setHex(img, 12, 8, "#94a3b8"); setHex(img, 13, 9, "#94a3b8"); setHex(img, 12, 10, "#94a3b8") -- Handle
  setHex(img, 7, 4, "#cbd5e1"); setHex(img, 8, 3, "#cbd5e1") -- Steam
  save(spr, "emoji_cafe_taza")
end

-- 34. emoji_chile_picante (🌶️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Hot red pepper
  for i = 1, 9 do
    local cx = 4 + i; local cy = 13 - math.floor(i*0.9)
    setHex(img, cx, cy, "#ef4444"); setHex(img, cx, cy + 1, "#b91c1c")
  end
  setHex(img, 12, 5, "#84cc16"); setHex(img, 13, 4, "#4d7c0f") -- Green cap
  save(spr, "emoji_chile_picante")
end

-- 35. emoji_tomate_huerto (🍅)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Red ripe tomato
  for y = 5, 12 do for x = 4, 12 do
    local d = math.sqrt((x - 8)^2 + (y - 8.5)^2)
    if d <= 4.2 then setHex(img, x, y, (x <= 7) and "#ef4444" or "#b91c1c") end
  end end
  setHex(img, 8, 3, "#4d7c0f"); setHex(img, 7, 4, "#84cc16"); setHex(img, 9, 4, "#84cc16") -- Green calyx
  setHex(img, 6, 6, "#ffffff") -- Glint
  save(spr, "emoji_tomate_huerto")
end

-- 36. emoji_papas_raiz (🥔)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Potato
  for y = 5, 11 do for x = 4, 12 do
    local d = math.sqrt((x - 8)^2 * 0.8 + (y - 8)^2 * 1.5)
    if d <= 3.8 then setHex(img, x, y, (x <= 7) and "#d97706" or "#92400e") end
  end end
  setHex(img, 6, 7, "#78350f"); setHex(img, 9, 9, "#78350f") -- Potato eyes
  save(spr, "emoji_papas_raiz")
end

-- 37. emoji_maiz_elote (🌽)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Corn ear
  for i = 1, 9 do
    local cx = 4 + i; local cy = 12 - i
    setHex(img, cx, cy, (i % 2 == 0) and "#fde047" or "#facc15")
    setHex(img, cx + 1, cy, (i % 2 == 0) and "#facc15" or "#eab308")
  end
  setHex(img, 4, 13, "#84cc16"); setHex(img, 3, 12, "#4d7c0f") -- Husk
  save(spr, "emoji_maiz_elote")
end

-- 38. emoji_frijol_grano (🫘)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Kidney bean
  for y = 5, 11 do for x = 4, 12 do
    local d = math.sqrt((x - 8)^2 * 0.9 + (y - 8)^2 * 1.6)
    if d <= 3.8 then setHex(img, x, y, (x <= 7) and "#b91c1c" or "#7f1d1d") end
  end end
  setHex(img, 8, 8, "#fef08a") -- Hilum spot
  save(spr, "emoji_frijol_grano")
end

-- 39. emoji_arroz_tazon (🍚)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Bowl of white rice
  for y = 8, 13 do for x = 4, 12 do setHex(img, x, y, (x <= 7) and "#94a3b8" or "#475569") end end
  for y = 5, 8 do for x = 5, 11 do setHex(img, x, y, (y == 5) and "#ffffff" or "#e2e8f0") end end
  save(spr, "emoji_arroz_tazon")
end

-- 40. emoji_frutos_bayas (🫐)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Blueberries / Wild berries
  for y = 7, 12 do for x = 4, 9 do
    local d = math.sqrt((x - 6.5)^2 + (y - 9.5)^2)
    if d <= 2.8 then setHex(img, x, y, (x <= 6) and "#38bdf8" or "#1e3a8a") end
  end end
  for y = 6, 11 do for x = 8, 13 do
    local d = math.sqrt((x - 10.5)^2 + (y - 8.5)^2)
    if d <= 2.8 then setHex(img, x, y, (x <= 10) and "#818cf8" or "#312e81") end
  end end
  setHex(img, 8, 4, "#84cc16") -- Leaf
  save(spr, "emoji_frutos_bayas")
end

-- 41. emoji_limon_citrico (🍋)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Yellow lemon
  for y = 5, 11 do for x = 4, 12 do
    local d = math.sqrt((x - 8)^2 * 0.9 + (y - 8)^2 * 1.5)
    if d <= 3.8 then setHex(img, x, y, (x <= 7) and "#fef08a" or "#ca8a04") end
  end end
  setHex(img, 3, 8, "#facc15"); setHex(img, 13, 8, "#facc15") -- Tips
  save(spr, "emoji_limon_citrico")
end

-- 42. emoji_sal_salero (🧂)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Glass salt shaker
  for y = 6, 13 do for x = 5, 11 do setHex(img, x, y, (x <= 7) and "#f8fafc" or "#cbd5e1") end end
  for y = 3, 5 do for x = 6, 10 do setHex(img, x, y, (y == 3) and "#e2e8f0" or "#94a3b8") end end -- Metal top
  save(spr, "emoji_sal_salero")
end

-- 43. emoji_aceite_botella (🫒)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Olive oil flask
  for y = 6, 13 do for x = 5, 11 do setHex(img, x, y, (x <= 7) and "#a3e635" or "#4d7c0f") end end
  for y = 3, 5 do for x = 7, 9 do setHex(img, x, y, "#78350f") end end -- Cork & neck
  save(spr, "emoji_aceite_botella")
end

-- 44. emoji_grasa_animal (🧈)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Butter / Lard block
  for y = 6, 12 do for x = 4, 12 do
    if y <= 8 then setHex(img, x, y, (x <= 8) and "#fef08a" or "#fde047")
    else setHex(img, x, y, (x <= 8) and "#facc15" or "#ca8a04") end
  end end
  save(spr, "emoji_grasa_animal")
end

-- 45. emoji_lata_conserva (🥫)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 4, 12 do for x = 4, 12 do
    if x == 4 or x == 12 or y == 4 or y == 12 then setHex(img, x, y, "#94a3b8")
    elseif y >= 6 and y <= 10 then setHex(img, x, y, "#ef4444") -- Red label
    else setHex(img, x, y, "#cbd5e1") end
  end end
  save(spr, "emoji_lata_conserva")
end

-- 46. emoji_semilla_girasol (🌻)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 3, 13 do for x = 3, 13 do
    local d = math.sqrt((x - 8)^2 + (y - 8)^2)
    if d <= 5.2 and d >= 2.8 then setHex(img, x, y, "#facc15") -- Yellow petals
    elseif d < 2.8 then setHex(img, x, y, "#451a03") end      -- Brown seed center
  end end
  save(spr, "emoji_semilla_girasol")
end

-- 47. emoji_trigo_espiga (🌾)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 3, 14 do setHex(img, 8, y, "#d97706") end -- Stalk
  -- Grains
  for y = 3, 9, 2 do
    setHex(img, 6, y, "#fde047"); setHex(img, 7, y + 1, "#facc15")
    setHex(img, 10, y, "#fde047"); setHex(img, 9, y + 1, "#ca8a04")
  end
  save(spr, "emoji_trigo_espiga")
end

-- 48. emoji_arcoiris_paz (🌈)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Rainbow arc
  for y = 4, 12 do for x = 3, 13 do
    local d = math.sqrt((x - 8)^2 + (y - 12)^2)
    if d <= 7.5 and d >= 6.5 then setHex(img, x, y, "#ef4444")
    elseif d < 6.5 and d >= 5.5 then setHex(img, x, y, "#facc15")
    elseif d < 5.5 and d >= 4.5 then setHex(img, x, y, "#22c55e")
    elseif d < 4.5 and d >= 3.5 then setHex(img, x, y, "#38bdf8") end
  end end
  save(spr, "emoji_arcoiris_paz")
end

-- 49. emoji_tierra_surco (🏜️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 4, 13 do for x = 2, 14 do
    local furrow = (x + y*2) % 4
    setHex(img, x, y, (furrow == 0) and "#451a03" or ((furrow == 1) and "#78350f" or "#b45309"))
  end end
  save(spr, "emoji_tierra_surco")
end

-- 50. emoji_fogata_exterior (🏕️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Campfire tent
  for y = 4, 13 do
    local w = (y - 4)
    for dx = -w, w do setHex(img, 8 + dx, y, (dx <= 0) and "#38bdf8" or "#0284c7") end
  end
  setHex(img, 8, 10, "#0f172a"); setHex(img, 8, 11, "#0f172a"); setHex(img, 8, 12, "#0f172a") -- Tent door
  save(spr, "emoji_fogata_exterior")
end