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

local dir = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/emojis/emociones"

local function save(spr, name)
  spr:saveCopyAs(dir .. "/" .. name .. ".aseprite")
  spr:saveCopyAs(dir .. "/" .. name .. ".png")
  spr:close()
end

local function drawBaseFace(img, bgHex)
  bgHex = bgHex or "#fde047"
  for y = 3, 13 do
    for x = 3, 13 do
      local d = math.sqrt((x - 8)^2 + (y - 8)^2)
      if d <= 5.2 then
        if d >= 4.5 then setHex(img, x, y, (x <= 7 or y <= 7) and "#fef08a" or "#ca8a04")
        else setHex(img, x, y, bgHex) end
      end
    end
  end
end

-- 1. emoji_cara_feliz (😃)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  drawBaseFace(img)
  setHex(img, 6, 6, "#1e293b"); setHex(img, 10, 6, "#1e293b") -- Eyes
  -- Smile
  setHex(img, 5, 9, "#713f12"); setHex(img, 11, 9, "#713f12")
  for x = 6, 10 do setHex(img, x, 10, "#713f12"); setHex(img, x, 9, "#ffffff") end
  save(spr, "emoji_cara_feliz")
end

-- 2. emoji_cara_calma (😌)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  drawBaseFace(img)
  -- Closed peaceful curved eyes
  setHex(img, 5, 6, "#713f12"); setHex(img, 6, 5, "#713f12"); setHex(img, 7, 6, "#713f12")
  setHex(img, 9, 6, "#713f12"); setHex(img, 10, 5, "#713f12"); setHex(img, 11, 6, "#713f12")
  -- Gentle smile & pink cheeks
  for x = 7, 9 do setHex(img, x, 9, "#713f12") end
  setHex(img, 5, 8, "#f472b6", 180); setHex(img, 11, 8, "#f472b6", 180)
  save(spr, "emoji_cara_calma")
end

-- 3. emoji_cara_cansado (😫)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  drawBaseFace(img, "#fbbf24")
  -- Squeezed >< eyes
  setHex(img, 5, 5, "#713f12"); setHex(img, 6, 6, "#713f12"); setHex(img, 5, 7, "#713f12")
  setHex(img, 11, 5, "#713f12"); setHex(img, 10, 6, "#713f12"); setHex(img, 11, 7, "#713f12")
  -- Open panting mouth
  for y = 9, 11 do for x = 7, 9 do setHex(img, x, y, (y == 9) and "#ffffff" or "#713f12") end end
  -- Sweat drop
  setHex(img, 13, 5, "#38bdf8"); setHex(img, 13, 6, "#0284c7")
  save(spr, "emoji_cara_cansado")
end

-- 4. emoji_cara_alerta (👀)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Pair of alert eyes
  for y = 5, 10 do
    for x = 2, 7 do setHex(img, x, y, (x == 2 or x == 7 or y == 5 or y == 10) and "#334155" or "#ffffff") end
    for x = 9, 14 do setHex(img, x, y, (x == 9 or x == 14 or y == 5 or y == 10) and "#334155" or "#ffffff") end
  end
  -- Blue irises looking right
  setHex(img, 5, 7, "#0284c7"); setHex(img, 6, 7, "#0f172a"); setHex(img, 5, 8, "#0284c7"); setHex(img, 6, 8, "#0f172a")
  setHex(img, 12, 7, "#0284c7"); setHex(img, 13, 7, "#0f172a"); setHex(img, 12, 8, "#0284c7"); setHex(img, 13, 8, "#0f172a")
  save(spr, "emoji_cara_alerta")
end

-- 5. emoji_cara_firme (😤)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  drawBaseFace(img)
  -- Determined brow & eyes
  setHex(img, 5, 5, "#713f12"); setHex(img, 6, 6, "#1e293b"); setHex(img, 7, 6, "#1e293b")
  setHex(img, 11, 5, "#713f12"); setHex(img, 10, 6, "#1e293b"); setHex(img, 9, 6, "#1e293b")
  -- Firm line mouth
  for x = 6, 10 do setHex(img, x, 10, "#713f12") end
  -- Steam from nose
  setHex(img, 4, 8, "#cbd5e1"); setHex(img, 3, 9, "#e2e8f0"); setHex(img, 12, 8, "#cbd5e1"); setHex(img, 13, 9, "#e2e8f0")
  save(spr, "emoji_cara_firme")
end

-- 6. emoji_cara_herido (🤕)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  drawBaseFace(img)
  -- White gauze bandage around forehead
  for y = 3, 6 do for x = 4, 12 do setHex(img, x, y, (x + y == 8) and "#ef4444" or "#f8fafc") end end
  setHex(img, 6, 8, "#1e293b"); setHex(img, 10, 8, "#1e293b")
  for x = 7, 9 do setHex(img, x, 11, "#713f12") end -- Sad mouth
  save(spr, "emoji_cara_herido")
end

-- 7. emoji_cara_pensando (🤔)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  drawBaseFace(img)
  -- Raised eyebrow & looking up
  setHex(img, 5, 5, "#713f12"); setHex(img, 6, 6, "#1e293b")
  setHex(img, 10, 4, "#713f12"); setHex(img, 10, 6, "#1e293b")
  for x = 6, 9 do setHex(img, x, 9, "#713f12") end
  -- Hand on chin
  setHex(img, 9, 11, "#fde047"); setHex(img, 10, 12, "#ca8a04"); setHex(img, 11, 13, "#ca8a04")
  setHex(img, 8, 12, "#fde047"); setHex(img, 7, 12, "#fde047")
  save(spr, "emoji_cara_pensando")
end

-- 8. emoji_cara_mareado (😵)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  drawBaseFace(img, "#fcd34d")
  -- XX eyes
  setHex(img, 5, 5, "#713f12"); setHex(img, 7, 7, "#713f12"); setHex(img, 5, 7, "#713f12"); setHex(img, 7, 5, "#713f12")
  setHex(img, 9, 5, "#713f12"); setHex(img, 11, 7, "#713f12"); setHex(img, 9, 7, "#713f12"); setHex(img, 11, 5, "#713f12")
  -- Wavy dizzy mouth
  setHex(img, 6, 10, "#713f12"); setHex(img, 7, 9, "#713f12"); setHex(img, 8, 10, "#713f12"); setHex(img, 9, 9, "#713f12"); setHex(img, 10, 10, "#713f12")
  save(spr, "emoji_cara_mareado")
end

-- 9. emoji_cara_triste (😔)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  drawBaseFace(img)
  -- Downcast sad eyes
  setHex(img, 5, 6, "#713f12"); setHex(img, 6, 7, "#1e293b"); setHex(img, 7, 6, "#713f12")
  setHex(img, 9, 6, "#713f12"); setHex(img, 10, 7, "#1e293b"); setHex(img, 11, 6, "#713f12")
  -- Downward mouth
  setHex(img, 6, 11, "#713f12"); setHex(img, 7, 10, "#713f12"); setHex(img, 8, 10, "#713f12"); setHex(img, 9, 10, "#713f12"); setHex(img, 10, 11, "#713f12")
  save(spr, "emoji_cara_triste")
end

-- 10. emoji_cara_asombrado (😮)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  drawBaseFace(img)
  setHex(img, 6, 5, "#1e293b"); setHex(img, 10, 5, "#1e293b") -- Wide eyes
  -- Open O mouth
  for y = 8, 11 do for x = 7, 9 do setHex(img, x, y, (x == 8 and y == 9) and "#ffffff" or "#713f12") end end
  save(spr, "emoji_cara_asombrado")
end

-- 11. emoji_cara_victoria (😎)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  drawBaseFace(img)
  -- Dark aviator sunglasses
  for y = 5, 7 do
    for x = 4, 7 do setHex(img, x, y, (x == 4 and y == 5) and "#ffffff" or "#0f172a") end
    for x = 9, 12 do setHex(img, x, y, (x == 9 and y == 5) and "#ffffff" or "#0f172a") end
  end
  setHex(img, 8, 5, "#0f172a") -- Bridge
  -- Smug victory grin
  setHex(img, 6, 10, "#713f12"); setHex(img, 7, 10, "#713f12"); setHex(img, 8, 10, "#713f12"); setHex(img, 9, 9, "#713f12"); setHex(img, 10, 9, "#713f12")
  save(spr, "emoji_cara_victoria")
end

-- 12. emoji_cara_mascara_gas (😷)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  drawBaseFace(img)
  setHex(img, 6, 5, "#1e293b"); setHex(img, 10, 5, "#1e293b")
  -- Gas mask / filter respirator
  for y = 7, 12 do for x = 5, 11 do setHex(img, x, y, (x <= 7) and "#475569" or "#1e293b") end end
  setHex(img, 8, 9, "#facc15"); setHex(img, 8, 10, "#ca8a04") -- Center filter valve
  save(spr, "emoji_cara_mascara_gas")
end

-- 13. emoji_cara_sucio (🤠)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Yermo Scavenger Hat over face
  for x = 2, 14 do setHex(img, x, 4, "#78350f"); setHex(img, x, 5, "#451a03") end -- Brim
  for y = 1, 3 do for x = 5, 11 do setHex(img, x, y, (x <= 7) and "#b45309" or "#78350f") end end -- Crown
  drawBaseFace(img)
  setHex(img, 6, 7, "#1e293b"); setHex(img, 10, 7, "#1e293b")
  for x = 7, 9 do setHex(img, x, 10, "#713f12") end
  -- Dirt smudge on cheek
  setHex(img, 5, 9, "#78350f"); setHex(img, 6, 9, "#78350f")
  save(spr, "emoji_cara_sucio")
end

-- 14. emoji_ojo_vigilante (👁️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 4, 11 do
    local w = math.floor((y - 4) * 4 / 3.5)
    if y > 7 then w = math.floor((11 - y) * 4 / 3.5) end
    for dx = -w, w do
      local x = 8 + dx
      setHex(img, x, y, (math.abs(dx) == w or y == 4 or y == 11) and "#334155" or "#ffffff")
    end
  end
  -- Amber iris & pupil
  for y = 6, 9 do for x = 7, 9 do setHex(img, x, y, "#d97706") end end
  setHex(img, 8, 7, "#0f172a"); setHex(img, 8, 8, "#0f172a")
  setHex(img, 7, 7, "#ffffff") -- Glint
  save(spr, "emoji_ojo_vigilante")
end

-- 15. emoji_corazon_roto (💔)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  local h = {{5,6,4},{9,10,4},{4,11,5},{4,11,6},{4,11,7},{5,10,8},{6,9,9},{7,8,10},{7,8,11}}
  for _, r in ipairs(h) do
    for x = r[1], r[2] do setHex(img, x, r[3], (x <= 7) and "#f43f5e" or "#be123c") end
  end
  -- Jagged crack in center
  setHex(img, 8, 4, "#0f172a"); setHex(img, 7, 5, "#0f172a"); setHex(img, 8, 6, "#0f172a")
  setHex(img, 7, 7, "#0f172a"); setHex(img, 9, 8, "#0f172a"); setHex(img, 8, 9, "#0f172a")
  save(spr, "emoji_corazon_roto")
end

-- 16. emoji_corazon_brillante (💖)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  local h = {{5,6,4},{9,10,4},{4,11,5},{4,11,6},{4,11,7},{5,10,8},{6,9,9},{7,8,10},{7,8,11}}
  for _, r in ipairs(h) do for x = r[1], r[2] do setHex(img, x, r[3], (x <= 7) and "#ec4899" or "#be185d") end end
  setHex(img, 5, 5, "#ffffff")
  -- Sparkle stars
  setHex(img, 2, 3, "#fef08a"); setHex(img, 13, 3, "#fef08a"); setHex(img, 14, 11, "#fef08a")
  save(spr, "emoji_corazon_brillante")
end

-- 17. emoji_musculo_fuerza (💪)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Flexed bicep arm
  setHex(img, 8, 4, "#fde047"); setHex(img, 9, 4, "#fde047"); setHex(img, 10, 5, "#fde047") -- Peak bicep
  for y = 5, 9 do for x = 6, 11 do setHex(img, x, y, (x <= 8) and "#fde047" or "#ca8a04") end end
  for y = 10, 13 do for x = 4, 8 do setHex(img, x, y, (x <= 5) and "#fde047" or "#ca8a04") end end -- Forearm
  setHex(img, 3, 10, "#ca8a04"); setHex(img, 3, 11, "#713f12") -- Clenched fist
  save(spr, "emoji_musculo_fuerza")
end

-- 18. emoji_pulgar_arriba (👍)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Thumbs up
  for y = 3, 7 do setHex(img, 6, y, "#fde047"); setHex(img, 7, y, "#ca8a04") end -- Thumb
  for y = 7, 12 do for x = 7, 12 do setHex(img, x, y, (x <= 9) and "#fde047" or "#ca8a04") end end -- Fist
  setHex(img, 6, 3, "#ffffff") -- Glint
  save(spr, "emoji_pulgar_arriba")
end

-- 19. emoji_pulgar_abajo (👎)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Thumbs down
  for y = 4, 9 do for x = 7, 12 do setHex(img, x, y, (x <= 9) and "#fde047" or "#ca8a04") end end -- Fist
  for y = 9, 13 do setHex(img, 6, y, "#fde047"); setHex(img, 7, y, "#ca8a04") end -- Thumb down
  save(spr, "emoji_pulgar_abajo")
end

-- 20. emoji_mano_abierta (🖐️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Open palm
  for x = 5, 11 do setHex(img, x, 3, (x % 2 == 1) and "#fde047" or "#000000", (x % 2 == 1) and 255 or 0) end -- 4 fingers
  setHex(img, 3, 7, "#fde047") -- Thumb
  for y = 5, 11 do for x = 5, 11 do setHex(img, x, y, (x <= 8) and "#fde047" or "#ca8a04") end end -- Palm
  for x = 6, 10 do setHex(img, x, 12, "#ca8a04"); setHex(img, x, 13, "#713f12") end -- Wrist
  save(spr, "emoji_mano_abierta")
end

-- 21. emoji_puno_cerrado (✊)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Raised fist of endurance
  for y = 4, 11 do for x = 5, 11 do setHex(img, x, y, (x <= 7 or y <= 5) and "#fde047" or "#ca8a04") end end
  for y = 12, 14 do for x = 6, 10 do setHex(img, x, y, "#ca8a04") end end
  save(spr, "emoji_puno_cerrado")
end

-- 22. emoji_estrella_victoria (⭐)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- 5-Point Golden Star
  setHex(img, 8, 2, "#ffffff"); setHex(img, 8, 3, "#fef08a")
  for x = 3, 13 do setHex(img, x, 6, "#facc15") end
  for y = 7, 10 do for x = 5, 11 do setHex(img, x, y, (x <= 8) and "#fef08a" or "#eab308") end end
  setHex(img, 4, 13, "#ca8a04"); setHex(img, 5, 12, "#facc15")
  setHex(img, 12, 13, "#ca8a04"); setHex(img, 11, 12, "#facc15")
  save(spr, "emoji_estrella_victoria")
end

-- 23. emoji_destello_magico (✨)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Sparkle cluster
  setHex(img, 7, 3, "#ffffff"); setHex(img, 7, 4, "#ffffff"); setHex(img, 7, 5, "#ffffff")
  setHex(img, 5, 4, "#fef08a"); setHex(img, 6, 4, "#ffffff"); setHex(img, 8, 4, "#ffffff"); setHex(img, 9, 4, "#fef08a")
  -- Mini spark
  setHex(img, 12, 10, "#ffffff"); setHex(img, 11, 10, "#38bdf8"); setHex(img, 13, 10, "#38bdf8")
  setHex(img, 12, 9, "#38bdf8"); setHex(img, 12, 11, "#38bdf8")
  save(spr, "emoji_destello_magico")
end

-- 24. emoji_bateria_llena (🔋)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 5, 11 do for x = 2, 13 do setHex(img, x, y, (x == 2 or x == 13 or y == 5 or y == 11) and "#334155" or "#22c55e") end end
  setHex(img, 14, 7, "#64748b"); setHex(img, 14, 8, "#64748b"); setHex(img, 14, 9, "#64748b") -- Positive terminal
  save(spr, "emoji_bateria_llena")
end

-- 25. emoji_bateria_baja (🪫)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 5, 11 do for x = 2, 13 do setHex(img, x, y, (x == 2 or x == 13 or y == 5 or y == 11) and "#334155" or "#0f172a") end end
  for y = 6, 10 do for x = 3, 5 do setHex(img, x, y, "#ef4444") end end -- 1 Red bar
  setHex(img, 14, 7, "#64748b"); setHex(img, 14, 8, "#64748b"); setHex(img, 14, 9, "#64748b")
  save(spr, "emoji_bateria_baja")
end

-- 26. emoji_fuego_ardiente (🔥)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 3, 13 do
    local w = math.floor((14 - y) * 4 / 10) + 1
    for dx = -w, w do
      local x = 8 + dx
      if math.abs(dx) <= 1 and y >= 8 and y <= 11 then setHex(img, x, y, "#ffffff")
      elseif math.abs(dx) <= 2 and y >= 6 then setHex(img, x, y, "#fef08a")
      else setHex(img, x, y, (dx <= 0) and "#f97316" or "#ea580c") end
    end
  end
  save(spr, "emoji_fuego_ardiente")
end

-- 27. emoji_gota_sudor (💦)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Sweat splashes
  for y = 5, 12 do
    local w = math.floor((y - 5) * 3 / 7)
    for dx = -w, w do setHex(img, 7 + dx, y, (dx <= 0) and "#38bdf8" or "#0284c7") end
  end
  setHex(img, 7, 4, "#38bdf8"); setHex(img, 6, 7, "#ffffff")
  -- Mini side splash
  setHex(img, 12, 9, "#38bdf8"); setHex(img, 13, 10, "#0284c7"); setHex(img, 11, 10, "#38bdf8")
  save(spr, "emoji_gota_sudor")
end

-- 28. emoji_rayo_energia (⚡)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Lightning bolt
  setHex(img, 9, 2, "#ffffff"); setHex(img, 8, 3, "#fef08a"); setHex(img, 7, 4, "#facc15"); setHex(img, 6, 5, "#facc15")
  for x = 5, 11 do setHex(img, x, 6, (x <= 7) and "#ffffff" or "#eab308") end -- Crossbar
  setHex(img, 9, 7, "#facc15"); setHex(img, 8, 8, "#facc15"); setHex(img, 7, 9, "#eab308"); setHex(img, 6, 10, "#ca8a04"); setHex(img, 5, 11, "#ca8a04"); setHex(img, 4, 12, "#713f12")
  save(spr, "emoji_rayo_energia")
end

-- 29. emoji_escudo_defensa (🛡️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Steel & Bronze Shield
  for y = 3, 12 do
    local w = (y <= 7) and 5 or (13 - y) + 1
    for dx = -w, w do
      local x = 8 + dx
      if math.abs(dx) == w or y == 3 or y == 12 then setHex(img, x, y, (dx <= 0) and "#facc15" or "#ca8a04")
      else setHex(img, x, y, (dx <= 0) and "#94a3b8" or "#475569") end
    end
  end
  setHex(img, 8, 6, "#ffffff"); setHex(img, 8, 7, "#ffffff"); setHex(img, 8, 8, "#ffffff") -- Center cross
  save(spr, "emoji_escudo_defensa")
end

-- 30. emoji_diana_objetivo (🎯)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 3, 13 do
    for x = 3, 13 do
      local d = math.sqrt((x - 8)^2 + (y - 8)^2)
      if d <= 5.2 and d >= 4.2 then setHex(img, x, y, "#ef4444")
      elseif d <= 4.2 and d >= 2.8 then setHex(img, x, y, "#ffffff")
      elseif d <= 2.8 and d >= 1.4 then setHex(img, x, y, "#ef4444")
      elseif d <= 1.4 then setHex(img, x, y, "#facc15") end -- Bullseye
    end
  end
  save(spr, "emoji_diana_objetivo")
end

-- 31. emoji_trofeo_forja (🏆)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Golden trophy
  for y = 3, 8 do
    local w = math.floor((y - 3) * 1.5 / 5) + 3
    for dx = -w, w do setHex(img, 8 + dx, y, (dx <= 0) and "#fef08a" or "#ca8a04") end
  end
  -- Handles
  setHex(img, 4, 4, "#facc15"); setHex(img, 3, 5, "#ca8a04"); setHex(img, 4, 6, "#ca8a04")
  setHex(img, 12, 4, "#facc15"); setHex(img, 13, 5, "#ca8a04"); setHex(img, 12, 6, "#ca8a04")
  -- Stem & Base
  for y = 9, 11 do setHex(img, 8, y, "#eab308") end
  for x = 5, 11 do setHex(img, x, 12, "#facc15"); setHex(img, x, 13, "#78350f") end
  save(spr, "emoji_trofeo_forja")
end

-- 32. emoji_medalla_honor (🎖️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Ribbon
  for y = 2, 7 do
    setHex(img, 6, y, "#ef4444"); setHex(img, 7, y, "#3b82f6"); setHex(img, 8, y, "#ffffff"); setHex(img, 9, y, "#3b82f6"); setHex(img, 10, y, "#ef4444")
  end
  -- Gold Medal
  for y = 7, 13 do for x = 5, 11 do
    local d = math.sqrt((x - 8)^2 + (y - 10)^2)
    if d <= 3.2 then setHex(img, x, y, (x <= 7) and "#fef08a" or "#ca8a04") end
  end end
  save(spr, "emoji_medalla_honor")
end

-- 33. emoji_bandera_hito (🚩)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Flagpole & Red pennant
  for y = 2, 14 do setHex(img, 4, y, "#78350f") end
  for y = 2, 7 do
    local w = 8 - (y - 2)
    for dx = 1, w do setHex(img, 4 + dx, y, (y <= 4) and "#ef4444" or "#b91c1c") end
  end
  save(spr, "emoji_bandera_hito")
end

-- 34. emoji_venda_medica (🩹)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for i = 1, 9 do
    local bx = 3 + i; local by = 13 - i
    setHex(img, bx, by, "#fed7aa"); setHex(img, bx + 1, by, "#fdba74"); setHex(img, bx, by + 1, "#fb923c")
  end
  -- Gauze center pad
  setHex(img, 7, 9, "#ffffff"); setHex(img, 8, 8, "#ffffff"); setHex(img, 9, 7, "#ffffff")
  save(spr, "emoji_venda_medica")
end

-- 35. emoji_termometro_salud (🌡️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Glass Tube
  for y = 2, 9 do setHex(img, 8, y, "#ef4444"); setHex(img, 7, y, "#e2e8f0"); setHex(img, 9, y, "#94a3b8") end
  -- Bulb
  for y = 10, 13 do for x = 6, 10 do
    local d = math.sqrt((x - 8)^2 + (y - 11.5)^2)
    if d <= 2.2 then setHex(img, x, y, "#ef4444") end
  end end
  save(spr, "emoji_termometro_salud")
end

-- 36. emoji_pildora_medicina (💊)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Half red, half white capsule (Diagonal)
  for i = 1, 8 do
    local px = 4 + i; local py = 12 - i
    local isRed = (i <= 4)
    setHex(img, px, py, isRed and "#ef4444" or "#ffffff")
    setHex(img, px + 1, py, isRed and "#b91c1c" or "#cbd5e1")
  end
  save(spr, "emoji_pildora_medicina")
end

-- 37. emoji_frasco_posion (🧪)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Herbal potion flask
  for y = 3, 5 do setHex(img, 7, y, "#cbd5e1"); setHex(img, 9, y, "#64748b") end
  for y = 6, 13 do
    local w = math.floor((y - 6) * 3 / 7) + 2
    for dx = -w, w do setHex(img, 8 + dx, y, (y < 9) and "#e0f2fe" or ((dx <= 0) and "#84cc16" or "#4d7c0f")) end
  end
  setHex(img, 8, 2, "#78350f") -- Cork
  save(spr, "emoji_frasco_posion")
end

-- 38. emoji_ojo_ciego (🙈)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  drawBaseFace(img, "#b45309") -- Monkey face
  -- Hands covering eyes
  for y = 5, 8 do
    for x = 4, 7 do setHex(img, x, y, "#fde047") end
    for x = 9, 12 do setHex(img, x, y, "#fde047") end
  end
  save(spr, "emoji_ojo_ciego")
end

-- 39. emoji_boca_cerrada (🤐)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  drawBaseFace(img)
  setHex(img, 6, 6, "#1e293b"); setHex(img, 10, 6, "#1e293b")
  -- Zipper mouth
  for x = 5, 11 do setHex(img, x, 10, (x % 2 == 0) and "#94a3b8" or "#e2e8f0") end
  setHex(img, 11, 10, "#ca8a04") -- Zipper pull
  save(spr, "emoji_boca_cerrada")
end

-- 40. emoji_bostezo_sueno (🥱)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  drawBaseFace(img)
  -- Closed squinting eyes
  setHex(img, 5, 6, "#713f12"); setHex(img, 6, 5, "#713f12"); setHex(img, 10, 5, "#713f12"); setHex(img, 11, 6, "#713f12")
  -- Big yawning mouth & hand over mouth
  for y = 8, 11 do for x = 7, 9 do setHex(img, x, y, "#713f12") end end
  for y = 9, 12 do for x = 5, 8 do setHex(img, x, y, "#fde047") end end
  save(spr, "emoji_bostezo_sueno")
end

-- 41. emoji_abrazo_refugio (🫂)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Two silhouettes embracing (El Hogar)
  setHex(img, 6, 3, "#38bdf8"); setHex(img, 10, 3, "#818cf8") -- 2 Heads
  for y = 5, 13 do
    for x = 4, 12 do
      setHex(img, x, y, (x <= 7) and "#0284c7" or "#4f46e5")
    end
  end
  save(spr, "emoji_abrazo_refugio")
end

-- 42. emoji_lagrima_alivio (🥲)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  drawBaseFace(img)
  setHex(img, 6, 6, "#1e293b"); setHex(img, 10, 6, "#1e293b")
  for x = 7, 9 do setHex(img, x, 10, "#713f12") end
  -- Single tear of relief
  setHex(img, 11, 8, "#38bdf8"); setHex(img, 11, 9, "#0284c7")
  save(spr, "emoji_lagrima_alivio")
end

-- 43. emoji_mente_brillante (🤯)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  drawBaseFace(img)
  setHex(img, 6, 8, "#1e293b"); setHex(img, 10, 8, "#1e293b")
  for x = 7, 9 do setHex(img, x, 11, "#713f12") end
  -- Mushroom cloud / mind-blown explosion on top
  for y = 1, 4 do for x = 3, 13 do setHex(img, x, y, (y <= 2) and "#f97316" or "#ef4444") end end
  save(spr, "emoji_mente_brillante")
end

-- 44. emoji_foco_atencion (🔦)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Flashlight shining
  for i = 1, 6 do setHex(img, 3 + i, 13 - i, "#475569"); setHex(img, 4 + i, 13 - i, "#1e293b") end
  -- Head
  setHex(img, 9, 6, "#facc15"); setHex(img, 10, 5, "#ca8a04")
  -- Light beam cone
  setHex(img, 12, 3, "#fef08a", 160); setHex(img, 13, 2, "#fef08a", 120); setHex(img, 14, 4, "#fef08a", 120)
  save(spr, "emoji_foco_atencion")
end

-- 45. emoji_marca_progreso (📈)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Graph with rising red line
  for x = 2, 14 do setHex(img, x, 13, "#64748b") end -- Axis X
  for y = 2, 14 do setHex(img, 2, y, "#64748b") end  -- Axis Y
  -- Rising green trend
  setHex(img, 3, 11, "#22c55e"); setHex(img, 5, 9, "#22c55e"); setHex(img, 7, 10, "#22c55e")
  setHex(img, 9, 6, "#22c55e"); setHex(img, 11, 7, "#22c55e"); setHex(img, 13, 3, "#22c55e")
  setHex(img, 13, 2, "#ef4444"); setHex(img, 12, 2, "#ef4444") -- Arrowhead
  save(spr, "emoji_marca_progreso")
end

-- 46. emoji_marca_equilibrio (⚖️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Balance scales
  for y = 3, 13 do setHex(img, 8, y, "#ca8a04") end -- Pillar
  for x = 3, 13 do setHex(img, x, 3, "#fde047") end -- Beam
  -- Left Pan
  setHex(img, 3, 7, "#ca8a04"); setHex(img, 4, 8, "#fde047"); setHex(img, 5, 7, "#ca8a04")
  -- Right Pan
  setHex(img, 11, 7, "#ca8a04"); setHex(img, 12, 8, "#fde047"); setHex(img, 13, 7, "#ca8a04")
  for x = 5, 11 do setHex(img, x, 13, "#713f12") end -- Base
  save(spr, "emoji_marca_equilibrio")
end

-- 47. emoji_mano_saludo (🤝)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Handshake / commitment
  setHex(img, 3, 7, "#3b82f6"); setHex(img, 4, 7, "#3b82f6") -- Left sleeve
  setHex(img, 12, 7, "#ef4444"); setHex(img, 13, 7, "#ef4444") -- Right sleeve
  for y = 6, 9 do for x = 6, 10 do setHex(img, x, y, (x <= 7) and "#fde047" or "#ca8a04") end end
  save(spr, "emoji_mano_saludo")
end

-- 48. emoji_luz_guia (💡)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Borrowed light from El Hogar
  for y = 4, 11 do
    for x = 4, 11 do
      local d = math.sqrt((x - 7.5)^2 + (y - 7.5)^2)
      if d <= 3.8 then setHex(img, x, y, (d <= 2) and "#ffffff" or "#fde047") end
    end
  end
  save(spr, "emoji_luz_guia")
end

-- 49. emoji_ancla_habito (⚓)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Anchor / solid grounding
  setHex(img, 8, 2, "#94a3b8"); setHex(img, 8, 3, "#94a3b8") -- Ring
  for y = 4, 12 do setHex(img, 8, y, "#475569") end -- Shaft
  for x = 5, 11 do setHex(img, x, 5, "#94a3b8") end -- Stock
  -- Curved Flukes
  setHex(img, 4, 10, "#94a3b8"); setHex(img, 5, 12, "#475569"); setHex(img, 11, 12, "#475569"); setHex(img, 12, 10, "#94a3b8")
  for x = 6, 10 do setHex(img, x, 13, "#334155") end
  save(spr, "emoji_ancla_habito")
end

-- 50. emoji_sol_radiante (☀️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  for y = 5, 11 do for x = 5, 11 do
    local d = math.sqrt((x - 8)^2 + (y - 8)^2)
    if d <= 3.2 then setHex(img, x, y, (d <= 1.8) and "#ffffff" or "#facc15") end
  end end
  -- 8 Rays
  setHex(img, 8, 2, "#fef08a"); setHex(img, 8, 14, "#ca8a04")
  setHex(img, 2, 8, "#fef08a"); setHex(img, 14, 8, "#ca8a04")
  setHex(img, 4, 4, "#fef08a"); setHex(img, 12, 4, "#facc15"); setHex(img, 4, 12, "#ca8a04"); setHex(img, 12, 12, "#ca8a04")
  save(spr, "emoji_sol_radiante")
end