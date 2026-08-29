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

local dir = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/emojis/habitos"

local function save(spr, name)
  spr:saveCopyAs(dir .. "/" .. name .. ".aseprite")
  spr:saveCopyAs(dir .. "/" .. name .. ".png")
  spr:close()
end

-- 1. emoji_platos (🍽️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Tin plate in center (X: 4 to 12, Y: 4 to 12)
  for y = 4, 12 do
    for x = 4, 12 do
      local d = math.sqrt((x - 8)^2 + (y - 8)^2)
      if d <= 4.2 then
        if d >= 3.5 then setHex(img, x, y, (y <= 8 or x <= 8) and "#f1f5f9" or "#334155")
        else setHex(img, x, y, (d <= 2) and "#94a3b8" or "#cbd5e1") end
      end
    end
  end
  -- Fork on left (X: 1, 2, Y: 3 to 13)
  setHex(img, 1, 3, "#f1f5f9"); setHex(img, 3, 3, "#f1f5f9")
  setHex(img, 1, 4, "#94a3b8"); setHex(img, 2, 4, "#cbd5e1"); setHex(img, 3, 4, "#94a3b8")
  for y = 5, 12 do setHex(img, 2, y, (y <= 7) and "#f1f5f9" or "#475569") end
  -- Spoon / Knife on right (X: 13, 14, Y: 3 to 13)
  for y = 3, 6 do setHex(img, 14, y, "#f1f5f9"); setHex(img, 15, y, "#94a3b8") end
  for y = 7, 12 do setHex(img, 14, y, "#475569") end
  -- Clean glint
  setHex(img, 7, 6, "#ffffff")
  save(spr, "emoji_platos")
end

-- 2. emoji_correr (🏃)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Runner silhouette with red bandana
  setHex(img, 9, 2, "#f87171"); setHex(img, 10, 2, "#ef4444") -- Head
  setHex(img, 9, 3, "#fca5a5"); setHex(img, 10, 3, "#dc2626")
  -- Torso leaning forward
  for y = 4, 7 do setHex(img, 8 - (y-4), y, "#b91c1c"); setHex(img, 9 - (y-4), y, "#ef4444") end
  -- Arms pumping
  setHex(img, 11, 4, "#ef4444"); setHex(img, 12, 5, "#fca5a5") -- Front arm
  setHex(img, 5, 5, "#b91c1c"); setHex(img, 4, 6, "#7f1d1d")   -- Back arm
  -- Legs in full stride
  setHex(img, 6, 8, "#ef4444"); setHex(img, 8, 9, "#b91c1c"); setHex(img, 10, 10, "#f87171"); setHex(img, 11, 11, "#ffffff") -- Front foot
  setHex(img, 4, 9, "#7f1d1d"); setHex(img, 3, 10, "#7f1d1d"); setHex(img, 2, 11, "#450a0a") -- Back foot
  -- Dust kick
  setHex(img, 1, 12, "#d97706", 180); setHex(img, 2, 13, "#d97706", 120)
  save(spr, "emoji_correr")
end

-- 3. emoji_pergamino (📜)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Rolled blueprint parchment (Blue/Cobalt & parchment)
  for y = 3, 12 do
    for x = 4, 12 do
      setHex(img, x, y, (x <= 6 or y <= 4) and "#fef08a" or "#eab308")
    end
  end
  -- Blueprint grid lines
  for y = 5, 10, 2 do for x = 6, 10 do setHex(img, x, y, "#0284c7") end end
  -- Left roll curl
  for y = 2, 11 do setHex(img, 3, y, "#ca8a04"); setHex(img, 4, y, "#fef9c3") end
  -- Right roll curl
  for y = 4, 13 do setHex(img, 12, y, "#ca8a04"); setHex(img, 13, y, "#713f12") end
  save(spr, "emoji_pergamino")
end

-- 4. emoji_llama_calma (🔥)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Sacred flame with violet & golden soul
  for y = 4, 13 do
    local w = math.floor((14 - y) * 4 / 10) + 1
    for dx = -w, w do
      local x = 8 + dx
      if math.abs(dx) <= 1 and y >= 8 and y <= 11 then setHex(img, x, y, "#ffffff")
      elseif math.abs(dx) <= 2 and y >= 6 then setHex(img, x, y, "#f0abfc")
      else setHex(img, x, y, (dx <= 0) and "#c084fc" or "#9333ea") end
    end
  end
  setHex(img, 8, 2, "#ffffff"); setHex(img, 7, 3, "#f0abfc"); setHex(img, 8, 3, "#c084fc")
  setHex(img, 6, 14, "#57534e"); setHex(img, 8, 14, "#292524"); setHex(img, 10, 14, "#57534e") -- Hearth stones
  save(spr, "emoji_llama_calma")
end

-- 5. emoji_caminar (🚶)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  setHex(img, 7, 2, "#fde047"); setHex(img, 8, 2, "#fde047") -- Head
  for y = 4, 8 do setHex(img, 7, y, "#d97706"); setHex(img, 8, y, "#92400e") end -- Torso
  -- Walking stick (Staff)
  for y = 3, 14 do setHex(img, 11, y, "#78350f") end
  setHex(img, 11, 3, "#d97706") -- Staff knob
  -- Legs
  setHex(img, 6, 9, "#b45309"); setHex(img, 5, 11, "#78350f"); setHex(img, 4, 13, "#451a03")
  setHex(img, 8, 9, "#b45309"); setHex(img, 9, 11, "#78350f"); setHex(img, 9, 13, "#451a03")
  save(spr, "emoji_caminar")
end

-- 6. emoji_pesas (🏋️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Heavy Cast Iron Dumbbell
  for y = 3, 12 do
    -- Left Plates
    setHex(img, 2, y, (y >= 5 and y <= 10) and "#f1f5f9" or "#64748b")
    setHex(img, 3, y, (y >= 4 and y <= 11) and "#94a3b8" or "#334155")
    -- Right Plates
    setHex(img, 12, y, (y >= 4 and y <= 11) and "#94a3b8" or "#334155")
    setHex(img, 13, y, (y >= 5 and y <= 10) and "#475569" or "#1e293b")
  end
  -- Steel bar in center with knurling
  for x = 4, 11 do setHex(img, x, 7, "#f1f5f9"); setHex(img, x, 8, "#64748b") end
  save(spr, "emoji_pesas")
end

-- 7. emoji_bicicleta (🚴)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Left Wheel (X: 1 to 5, Y: 8 to 12)
  setHex(img, 3, 8, "#94a3b8"); setHex(img, 1, 10, "#94a3b8"); setHex(img, 5, 10, "#94a3b8"); setHex(img, 3, 12, "#94a3b8")
  setHex(img, 3, 10, "#ffffff")
  -- Right Wheel (X: 10 to 14, Y: 8 to 12)
  setHex(img, 12, 8, "#94a3b8"); setHex(img, 10, 10, "#94a3b8"); setHex(img, 14, 10, "#94a3b8"); setHex(img, 12, 12, "#94a3b8")
  setHex(img, 12, 10, "#ffffff")
  -- Red Frame
  setHex(img, 3, 10, "#ef4444"); setHex(img, 6, 6, "#ef4444"); setHex(img, 8, 10, "#ef4444"); setHex(img, 11, 5, "#ef4444")
  for x = 6, 8 do setHex(img, x, 6, "#ef4444") end
  setHex(img, 5, 5, "#78350f") -- Saddle
  setHex(img, 11, 4, "#94a3b8"); setHex(img, 12, 4, "#94a3b8") -- Handlebar
  save(spr, "emoji_bicicleta")
end

-- 8. emoji_agua_vaso (💧)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Glass tumbler with clean blue water
  for y = 4, 13 do
    local w = math.floor((y - 4) * 2 / 9) + 3
    for dx = -w, w do
      local x = 8 + dx
      if math.abs(dx) == w or y == 13 then
        setHex(img, x, y, (dx <= 0) and "#bae6fd" or "#0369a1")
      else
        if y < 7 then setHex(img, x, y, "#e0f2fe", 120)
        else setHex(img, x, y, (dx <= 0) and "#38bdf8" or "#0284c7") end
      end
    end
  end
  setHex(img, 6, 8, "#ffffff"); setHex(img, 6, 9, "#ffffff") -- Highlight
  save(spr, "emoji_agua_vaso")
end

-- 9. emoji_dormir (🛌)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Pallet bed with patchwork blanket & sleeping head
  for x = 2, 13 do setHex(img, x, 11, "#78350f"); setHex(img, x, 12, "#451a03") end -- Pallet wood
  setHex(img, 4, 8, "#fde047"); setHex(img, 4, 9, "#fde047") -- Head
  setHex(img, 3, 8, "#e2e8f0"); setHex(img, 3, 9, "#cbd5e1") -- Pillow
  -- Warm patched blanket
  for y = 8, 10 do for x = 6, 13 do setHex(img, x, y, ((x + y) % 2 == 0) and "#3b82f6" or "#1d4ed8") end end
  -- Floating 'Z's
  setHex(img, 11, 3, "#38bdf8"); setHex(img, 12, 3, "#38bdf8"); setHex(img, 11, 4, "#38bdf8"); setHex(img, 10, 5, "#38bdf8"); setHex(img, 11, 5, "#38bdf8")
  save(spr, "emoji_dormir")
end

-- 10. emoji_dientes (🪥)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Rustic toothbrush with white bristles
  for i = 1, 9 do setHex(img, 3 + i, 13 - i, "#10b981"); setHex(img, 3 + i, 14 - i, "#047857") end
  -- Brush Head with bristles
  for i = 0, 3 do
    setHex(img, 11 + i, 5 - i, "#ffffff")
    setHex(img, 10 + i, 4 - i, "#ffffff")
    setHex(img, 10 + i, 5 - i, "#38bdf8") -- Toothpaste drop
  end
  save(spr, "emoji_dientes")
end

-- 11. emoji_ducha (🚿)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Tin perforated showerhead with water spray
  for x = 2, 8 do setHex(img, x, 4, "#94a3b8") end -- Pipe
  setHex(img, 8, 5, "#cbd5e1"); setHex(img, 9, 6, "#94a3b8"); setHex(img, 10, 6, "#64748b")
  -- Showerhead disk
  for x = 8, 13 do setHex(img, x, 7, "#e2e8f0"); setHex(img, x, 8, "#475569") end
  -- Water drops spraying down
  setHex(img, 8, 10, "#38bdf8"); setHex(img, 10, 11, "#38bdf8"); setHex(img, 12, 10, "#38bdf8")
  setHex(img, 9, 13, "#38bdf8"); setHex(img, 11, 14, "#38bdf8"); setHex(img, 13, 13, "#38bdf8")
  save(spr, "emoji_ducha")
end

-- 12. emoji_estirar (🧘)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Meditating / stretching figure in lotus
  setHex(img, 8, 3, "#fde047"); setHex(img, 8, 4, "#fde047") -- Head
  for y = 5, 9 do setHex(img, 8, y, "#06b6d4") end -- Spine
  setHex(img, 6, 7, "#0891b2"); setHex(img, 10, 7, "#0891b2") -- Arms
  setHex(img, 5, 8, "#fde047"); setHex(img, 11, 8, "#fde047") -- Hands
  for x = 4, 12 do setHex(img, x, 10, "#164e63") end -- Crossed legs
  setHex(img, 4, 11, "#fde047"); setHex(img, 12, 11, "#fde047") -- Feet
  save(spr, "emoji_estirar")
end

-- 13. emoji_manzana (🍎)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Wild red apple
  for y = 5, 12 do
    local w = (y <= 8) and (y - 4) + 2 or (13 - y) + 2
    for dx = -w, w do
      local x = 8 + dx
      if math.abs(dx) == w or y == 12 then setHex(img, x, y, (dx <= 0) and "#ef4444" or "#7f1d1d")
      else setHex(img, x, y, (dx <= -1 and y <= 8) and "#fca5a5" or "#b91c1c") end
    end
  end
  setHex(img, 8, 3, "#78350f"); setHex(img, 8, 4, "#78350f") -- Stem
  setHex(img, 9, 3, "#84cc16"); setHex(img, 10, 3, "#4d7c0f") -- Green leaf
  setHex(img, 6, 6, "#ffffff") -- Glint
  save(spr, "emoji_manzana")
end

-- 14. emoji_zanahoria (🥕)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Orange carrot from home garden
  for i = 1, 9 do
    local cx = 4 + i; local cy = 13 - i
    setHex(img, cx, cy, "#fb923c"); setHex(img, cx + 1, cy, "#ea580c")
    setHex(img, cx, cy + 1, "#c2410c")
  end
  setHex(img, 4, 13, "#ea580c") -- Tip
  -- Green foliage top
  setHex(img, 12, 4, "#84cc16"); setHex(img, 13, 3, "#4d7c0f"); setHex(img, 14, 4, "#84cc16")
  save(spr, "emoji_zanahoria")
end

-- 15. emoji_libro (📖)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Open book with pages
  for y = 5, 11 do
    -- Left page
    for x = 2, 7 do setHex(img, x, y, (x == 2 or y == 11) and "#cbd5e1" or "#ffffff") end
    -- Right page
    for x = 9, 14 do setHex(img, x, y, (x == 14 or y == 11) and "#cbd5e1" or "#ffffff") end
    -- Text lines
    if y == 7 or y == 9 then
      setHex(img, 4, y, "#0284c7"); setHex(img, 5, y, "#0284c7")
      setHex(img, 11, y, "#0284c7"); setHex(img, 12, y, "#0284c7")
    end
  end
  -- Spine & Leather cover under
  for y = 5, 12 do setHex(img, 8, y, "#78350f") end
  setHex(img, 1, 12, "#78350f"); setHex(img, 15, 12, "#78350f")
  save(spr, "emoji_libro")
end

-- 16. emoji_pluma (✍️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Quill / Drafting pen writing
  for i = 1, 10 do
    local px = 4 + i; local py = 13 - i
    setHex(img, px, py, (i >= 6) and "#f8fafc" or "#94a3b8")
    setHex(img, px + 1, py, (i >= 6) and "#cbd5e1" or "#475569")
  end
  setHex(img, 4, 13, "#0f172a") -- Ink nib
  setHex(img, 3, 14, "#0284c7"); setHex(img, 5, 14, "#0284c7") -- Written line
  save(spr, "emoji_pluma")
end

-- 17. emoji_bombilla (💡)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Lightbulb with yellow filament glow
  for y = 3, 8 do
    for x = 5, 11 do
      local d = math.sqrt((x - 8)^2 + (y - 5.5)^2)
      if d <= 3.5 then setHex(img, x, y, (d <= 1.8) and "#ffffff" or "#facc15") end
    end
  end
  -- Screw base
  for y = 9, 12 do for x = 6, 10 do setHex(img, x, y, (y % 2 == 0) and "#e2e8f0" or "#64748b") end end
  -- Ray sparks
  setHex(img, 8, 1, "#fef08a"); setHex(img, 3, 5, "#fef08a"); setHex(img, 13, 5, "#fef08a")
  save(spr, "emoji_bombilla")
end

-- 18. emoji_cerebro (🧠)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Brain / Cognitive Focus
  for y = 4, 11 do
    for x = 3, 13 do
      local isLeft = (x <= 7)
      if (x == 3 or x == 13 or y == 4 or y == 11) then
        setHex(img, x, y, "#db2777")
      else
        setHex(img, x, y, ((x + y) % 2 == 0) and "#f472b6" or "#ec4899")
      end
    end
  end
  setHex(img, 8, 4, "#be185d"); setHex(img, 8, 11, "#be185d") -- Center lobe fissure
  save(spr, "emoji_cerebro")
end

-- 19. emoji_reloj_pomodoro (⏰)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Focus alarm clock
  for y = 4, 12 do
    for x = 4, 12 do
      local d = math.sqrt((x - 8)^2 + (y - 8)^2)
      if d <= 4.2 then
        if d >= 3.5 then setHex(img, x, y, "#ef4444")
        else setHex(img, x, y, "#ffffff") end
      end
    end
  end
  -- Hands at 3 o'clock
  setHex(img, 8, 8, "#1e293b"); setHex(img, 8, 6, "#1e293b"); setHex(img, 10, 8, "#1e293b")
  -- Bell ears
  setHex(img, 4, 3, "#dc2626"); setHex(img, 12, 3, "#dc2626")
  -- Peg feet
  setHex(img, 4, 13, "#7f1d1d"); setHex(img, 12, 13, "#7f1d1d")
  save(spr, "emoji_reloj_pomodoro")
end

-- 20. emoji_pantalla (💻)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- CRT Monitor / Recovered terminal
  for y = 3, 10 do for x = 3, 13 do setHex(img, x, y, (x == 3 or x == 13 or y == 3 or y == 10) and "#475569" or "#0f172a") end end
  -- Green terminal code text
  setHex(img, 5, 5, "#22c55e"); setHex(img, 6, 5, "#22c55e"); setHex(img, 8, 5, "#22c55e")
  setHex(img, 5, 7, "#22c55e"); setHex(img, 7, 7, "#22c55e")
  setHex(img, 5, 8, "#86efac") -- Cursor
  -- Stand & Keyboard base
  for x = 6, 10 do setHex(img, x, 11, "#334155") end
  for x = 2, 14 do setHex(img, x, 12, "#64748b"); setHex(img, x, 13, "#1e293b") end
  save(spr, "emoji_pantalla")
end

-- 21. emoji_ajedrez (♟️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Carved wood chess pawn (Strategy)
  setHex(img, 8, 3, "#fde047"); setHex(img, 8, 4, "#ca8a04") -- Ball head
  setHex(img, 7, 5, "#ca8a04"); setHex(img, 8, 5, "#fde047"); setHex(img, 9, 5, "#ca8a04") -- Neck ring
  for y = 6, 10 do for x = 7, 9 do setHex(img, x, y, (x == 7) and "#fde047" or "#ca8a04") end end -- Waist
  for x = 5, 11 do setHex(img, x, 11, "#fde047"); setHex(img, x, 12, "#713f12") end -- Base
  save(spr, "emoji_ajedrez")
end

-- 22. emoji_lupa (🔍)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Magnifying glass
  for y = 2, 8 do
    for x = 2, 8 do
      local d = math.sqrt((x - 5)^2 + (y - 5)^2)
      if d <= 3.2 then
        if d >= 2.5 then setHex(img, x, y, "#94a3b8")
        else setHex(img, x, y, (x <= 5) and "#e0f2fe" or "#7dd3fc") end
      end
    end
  end
  setHex(img, 4, 4, "#ffffff") -- Glint
  -- Handle
  for i = 1, 6 do setHex(img, 7 + i, 7 + i, "#78350f"); setHex(img, 8 + i, 7 + i, "#451a03") end
  save(spr, "emoji_lupa")
end

-- 23. emoji_moneda_ahorro (🪙)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Old world gold coin (Saving lighthouse)
  for y = 3, 13 do
    for x = 3, 13 do
      local d = math.sqrt((x - 8)^2 + (y - 8)^2)
      if d <= 5.2 then
        if d >= 4.2 then setHex(img, x, y, (y <= 8 or x <= 8) and "#fef08a" or "#ca8a04")
        else setHex(img, x, y, "#eab308") end
      end
    end
  end
  -- Center star stamp
  setHex(img, 8, 7, "#fef08a"); setHex(img, 8, 8, "#ffffff"); setHex(img, 8, 9, "#fef08a")
  setHex(img, 7, 8, "#fef08a"); setHex(img, 9, 8, "#ca8a04")
  save(spr, "emoji_moneda_ahorro")
end

-- 24. emoji_alcancia (🐷)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Terracotta piggy bank / emergency fund
  for y = 5, 12 do
    for x = 3, 13 do
      local d = math.sqrt((x - 8)^2 + (y - 8.5)^2 * 1.3)
      if d <= 4.5 then setHex(img, x, y, (x <= 6 or y <= 6) and "#f472b6" or "#be185d") end
    end
  end
  -- Snout & coin slot
  setHex(img, 2, 8, "#f472b6"); setHex(img, 2, 9, "#be185d")
  setHex(img, 7, 4, "#1e293b"); setHex(img, 8, 4, "#fde047") -- Coin dropping in slot!
  -- Ears & Legs
  setHex(img, 5, 4, "#f472b6"); setHex(img, 11, 4, "#be185d")
  setHex(img, 5, 13, "#be185d"); setHex(img, 11, 13, "#be185d")
  save(spr, "emoji_alcancia")
end

-- 25. emoji_vela_oracion (🕯️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Prayer candle in tin dish
  for y = 7, 12 do for x = 7, 9 do setHex(img, x, y, (x == 7) and "#f8fafc" or "#cbd5e1") end end
  for x = 4, 12 do setHex(img, x, 13, "#94a3b8"); setHex(img, x, 14, "#475569") end
  -- Flame
  setHex(img, 8, 6, "#1e293b") -- Wick
  setHex(img, 8, 4, "#ffffff"); setHex(img, 8, 3, "#facc15"); setHex(img, 7, 4, "#fef08a"); setHex(img, 9, 4, "#f97316")
  save(spr, "emoji_vela_oracion")
end

-- 26. emoji_manos_paz (🙏)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Hands pressed in prayer/gratitude
  for y = 4, 12 do
    setHex(img, 7, y, "#fde047"); setHex(img, 8, y, "#fde047")
    setHex(img, 6, y, (y >= 7) and "#ca8a04" or "#fde047")
    setHex(img, 9, y, (y >= 7) and "#ca8a04" or "#fde047")
  end
  -- Sleeves (Blue tunic)
  for x = 4, 7 do setHex(img, x, 13, "#3b82f6"); setHex(img, x, 14, "#1d4ed8") end
  for x = 8, 11 do setHex(img, x, 13, "#3b82f6"); setHex(img, x, 14, "#1d4ed8") end
  save(spr, "emoji_manos_paz")
end

-- 27. emoji_sol_alba (🌅)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Sunrise over Yermo hills
  for y = 9, 14 do
    for x = 2, 14 do
      local d = math.sqrt((x - 8)^2 + (y - 9)^2)
      if d <= 4.5 then setHex(img, x, y, (d <= 2) and "#ffffff" or "#facc15") end
    end
  end
  -- Horizon hills
  for x = 1, 15 do setHex(img, x, 11, "#78350f"); setHex(img, x, 12, "#451a03") end
  setHex(img, 8, 4, "#fef08a"); setHex(img, 4, 6, "#fef08a"); setHex(img, 12, 6, "#fef08a") -- Sun rays
  save(spr, "emoji_sol_alba")
end

-- 28. emoji_luna_ocaso (🌙)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Crescent Moon in night sky
  for y = 3, 13 do
    for x = 3, 13 do
      local d1 = math.sqrt((x - 8)^2 + (y - 8)^2)
      local d2 = math.sqrt((x - 10)^2 + (y - 7)^2)
      if d1 <= 4.5 and d2 >= 3.8 then
        setHex(img, x, y, (x <= 7) and "#fef08a" or "#eab308")
      end
    end
  end
  setHex(img, 11, 4, "#ffffff"); setHex(img, 12, 10, "#93c5fd") -- Stars
  save(spr, "emoji_luna_ocaso")
end

-- 29. emoji_campana (🔔)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Brass Bell / Alarm & Wakeup call
  for y = 4, 11 do
    local w = math.floor((y - 4) * 3 / 7) + 1
    for dx = -w, w do
      local x = 8 + dx
      setHex(img, x, y, (dx <= 0) and "#fde047" or "#ca8a04")
    end
  end
  setHex(img, 8, 3, "#ca8a04") -- Top ring
  for x = 4, 12 do setHex(img, x, 11, "#fde047"); setHex(img, x, 12, "#713f12") end -- Rim
  setHex(img, 8, 13, "#ca8a04") -- Clapper
  save(spr, "emoji_campana")
end

-- 30. emoji_corazon_calma (❤️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Serene Red Heart
  local h = {{5,6,4},{9,10,4},{4,11,5},{4,11,6},{4,11,7},{5,10,8},{6,9,9},{7,8,10},{7,8,11}}
  for _, r in ipairs(h) do
    for x = r[1], r[2] do setHex(img, x, r[3], (x <= 7) and "#f43f5e" or "#be123c") end
  end
  setHex(img, 5, 5, "#ffffff") -- Highlight
  save(spr, "emoji_corazon_calma")
end

-- 31. emoji_silencio (🤫)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Shh / Silence & Meditation
  setHex(img, 8, 3, "#fde047"); setHex(img, 8, 4, "#fde047") -- Head
  for y = 5, 8 do for x = 6, 10 do setHex(img, x, y, "#eab308") end end
  -- Finger against lips
  for y = 5, 9 do setHex(img, 8, y, "#ffffff") end
  save(spr, "emoji_silencio")
end

-- 32. emoji_planta_brote (🌱)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Sprouting green seedling from soil
  for y = 7, 13 do setHex(img, 8, y, "#4d7c0f") end
  -- Left leaf
  setHex(img, 5, 5, "#84cc16"); setHex(img, 6, 5, "#84cc16"); setHex(img, 7, 6, "#4d7c0f")
  -- Right leaf
  setHex(img, 10, 4, "#84cc16"); setHex(img, 11, 4, "#84cc16"); setHex(img, 9, 5, "#4d7c0f")
  -- Soil mound
  for x = 5, 11 do setHex(img, x, 13, "#78350f"); setHex(img, x, 14, "#451a03") end
  save(spr, "emoji_planta_brote")
end

-- 33. emoji_escoba (🧹)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Straw broom (Cleaning habit)
  for i = 1, 8 do setHex(img, 12 - i, 3 + i, "#78350f"); setHex(img, 13 - i, 3 + i, "#451a03") end -- Handle
  -- Straw head
  for x = 3, 7 do for y = 10, 13 do setHex(img, x, y, ((x + y) % 2 == 0) and "#fde047" or "#ca8a04") end end
  setHex(img, 5, 10, "#dc2626") -- Binding cord
  save(spr, "emoji_escoba")
end

-- 34. emoji_cubeta (🪣)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Metal mop bucket
  for y = 6, 13 do
    local w = math.floor((y - 6) * 2 / 7) + 3
    for dx = -w, w do
      local x = 8 + dx
      setHex(img, x, y, (dx <= 0) and "#94a3b8" or "#475569")
    end
  end
  -- Water inside
  for x = 6, 10 do setHex(img, x, 6, "#38bdf8") end
  -- Wire handle
  for x = 6, 10 do setHex(img, x, 3, "#cbd5e1") end
  setHex(img, 5, 4, "#cbd5e1"); setHex(img, 11, 4, "#64748b")
  save(spr, "emoji_cubeta")
end

-- 35. emoji_martillo (🔨)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Claw hammer
  for i = 1, 8 do setHex(img, 4 + i, 14 - i, "#d97706"); setHex(img, 5 + i, 14 - i, "#78350f") end
  -- Steel Head
  for x = 9, 14 do setHex(img, x, 4, "#f1f5f9"); setHex(img, x, 5, "#475569") end
  setHex(img, 14, 3, "#94a3b8") -- Claw
  save(spr, "emoji_martillo")
end

-- 36. emoji_serrucho (🪚)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Hand saw
  for i = 1, 9 do
    local sx = 14 - i; local sy = 4 + i
    setHex(img, sx, sy, "#cbd5e1"); setHex(img, sx + 1, sy, "#94a3b8")
    if i % 2 == 0 then setHex(img, sx - 1, sy + 1, "#475569") end -- Teeth
  end
  -- Wooden D-handle
  for y = 11, 14 do setHex(img, 3, y, "#d97706"); setHex(img, 4, y, "#78350f") end
  save(spr, "emoji_serrucho")
end

-- 37. emoji_llave (🔧)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Open-ended wrench
  for i = 1, 8 do setHex(img, 4 + i, 4 + i, "#94a3b8"); setHex(img, 5 + i, 4 + i, "#475569") end
  -- Jaws on top-left
  setHex(img, 3, 3, "#f1f5f9"); setHex(img, 4, 3, "#94a3b8"); setHex(img, 3, 4, "#94a3b8")
  setHex(img, 5, 5, "#1e293b") -- Jaw opening
  save(spr, "emoji_llave")
end

-- 38. emoji_engranaje (⚙️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Steel gear / Workshop
  for y = 4, 12 do
    for x = 4, 12 do
      local d = math.sqrt((x - 8)^2 + (y - 8)^2)
      if d <= 4.2 and d >= 1.8 then setHex(img, x, y, (x <= 8) and "#94a3b8" or "#475569") end
    end
  end
  -- 4 cogs
  setHex(img, 8, 2, "#94a3b8"); setHex(img, 8, 14, "#475569")
  setHex(img, 2, 8, "#94a3b8"); setHex(img, 14, 8, "#475569")
  save(spr, "emoji_engranaje")
end

-- 39. emoji_aguja_hilo (🪡)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Sewing needle & thread (Mending clothes)
  for i = 1, 9 do setHex(img, 3 + i, 13 - i, "#f1f5f9") end
  setHex(img, 12, 4, "#475569") -- Eye of needle
  -- Red thread through eye
  setHex(img, 13, 3, "#ef4444"); setHex(img, 14, 4, "#ef4444"); setHex(img, 13, 5, "#b91c1c"); setHex(img, 12, 6, "#ef4444")
  save(spr, "emoji_aguja_hilo")
end

-- 40. emoji_tijeras (✂️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Tailor scissors
  for i = 1, 6 do setHex(img, 5 + i, 5 + i, "#f1f5f9") end
  for i = 1, 6 do setHex(img, 11 - i, 5 + i, "#94a3b8") end
  setHex(img, 8, 8, "#facc15") -- Pivot rivet
  -- Finger rings at bottom
  setHex(img, 4, 12, "#ef4444"); setHex(img, 12, 12, "#ef4444")
  save(spr, "emoji_tijeras")
end

-- 41. emoji_huerto_pala (🪴)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Garden pot with lush green leaves
  for y = 8, 13 do for x = 5, 11 do setHex(img, x, y, (x <= 7) and "#d97706" or "#92400e") end end
  -- Plants sprouting
  setHex(img, 8, 5, "#84cc16"); setHex(img, 7, 6, "#4d7c0f"); setHex(img, 9, 6, "#4d7c0f")
  setHex(img, 6, 4, "#84cc16"); setHex(img, 10, 4, "#84cc16")
  save(spr, "emoji_huerto_pala")
end

-- 42. emoji_caja_herramientas (🧰)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Red metal toolbox
  for y = 6, 13 do for x = 3, 13 do setHex(img, x, y, (y <= 7 or x <= 6) and "#ef4444" or "#991b1b") end end
  for x = 6, 10 do setHex(img, x, 4, "#94a3b8") end -- Handle
  setHex(img, 8, 9, "#facc15") -- Center latch
  save(spr, "emoji_caja_herramientas")
end

-- 43. emoji_candado_cerrado (🔒)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Brass lock
  for y = 3, 7 do setHex(img, 5, y, "#94a3b8"); setHex(img, 11, y, "#64748b") end
  for x = 6, 10 do setHex(img, x, 3, "#cbd5e1") end
  for y = 7, 13 do for x = 4, 12 do setHex(img, x, y, (x <= 7) and "#facc15" or "#ca8a04") end end
  setHex(img, 8, 9, "#1e293b"); setHex(img, 8, 10, "#1e293b") -- Keyhole
  save(spr, "emoji_candado_cerrado")
end

-- 44. emoji_llave_puerta (🔑)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Brass Skeleton key
  for y = 3, 7 do for x = 3, 7 do setHex(img, x, y, (x == 3 or y == 3) and "#fde047" or "#ca8a04") end end
  setHex(img, 5, 5, "#000000", 0) -- Ring hole
  for x = 7, 13 do setHex(img, x, 5, "#fde047"); setHex(img, x, 6, "#ca8a04") end -- Shaft
  setHex(img, 12, 7, "#ca8a04"); setHex(img, 13, 7, "#ca8a04") -- Bit teeth
  save(spr, "emoji_llave_puerta")
end

-- 45. emoji_cadena_cigarro (🚬)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Burning cigarette with ash & smoke (Chain to break)
  for x = 4, 10 do setHex(img, x, 9, "#ffffff"); setHex(img, x, 10, "#cbd5e1") end
  for x = 2, 3 do setHex(img, x, 9, "#d97706"); setHex(img, x, 10, "#b45309") end -- Filter
  setHex(img, 11, 9, "#ef4444"); setHex(img, 11, 10, "#ea580c") -- Glowing ember
  setHex(img, 12, 9, "#64748b") -- Ash
  -- Smoke trail
  setHex(img, 13, 7, "#94a3b8", 160); setHex(img, 12, 5, "#cbd5e1", 120); setHex(img, 14, 4, "#94a3b8", 80)
  save(spr, "emoji_cadena_cigarro")
end

-- 46. emoji_cadena_celular (📱)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Smartphone with glowing red distraction screen
  for y = 3, 13 do for x = 5, 11 do setHex(img, x, y, (x == 5 or x == 11 or y == 3 or y == 13) and "#1e293b" or "#ef4444") end end
  setHex(img, 8, 12, "#cbd5e1") -- Home button
  setHex(img, 8, 6, "#ffffff"); setHex(img, 8, 7, "#ffffff") -- Glare / warning
  save(spr, "emoji_cadena_celular")
end

-- 47. emoji_cadena_dulce (🍬)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Wrapped refined candy / sugar chain
  for y = 6, 10 do for x = 6, 10 do setHex(img, x, y, (x <= 7) and "#f43f5e" or "#be123c") end end
  -- Wrapper ends
  setHex(img, 4, 5, "#38bdf8"); setHex(img, 5, 7, "#38bdf8"); setHex(img, 4, 9, "#38bdf8")
  setHex(img, 12, 7, "#38bdf8"); setHex(img, 13, 8, "#38bdf8"); setHex(img, 13, 6, "#38bdf8")
  save(spr, "emoji_cadena_dulce")
end

-- 48. emoji_cadena_copa (🍷)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Wine/Alcohol glass to break
  for y = 4, 8 do
    for x = 5, 11 do
      local w = math.floor((y - 4) * 2 / 4) + 2
      if math.abs(x - 8) <= w then setHex(img, x, y, (x <= 7) and "#e11d48" or "#881337") end
    end
  end
  for y = 9, 12 do setHex(img, 8, y, "#cbd5e1") end -- Stem
  for x = 5, 11 do setHex(img, x, 13, "#94a3b8") end -- Base
  save(spr, "emoji_cadena_copa")
end

-- 49. emoji_cadena_reloj_arena (⏳)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Hourglass / Procrastination
  for x = 4, 12 do setHex(img, x, 3, "#78350f"); setHex(img, x, 13, "#78350f") end
  -- Glass bulbs
  setHex(img, 5, 4, "#93c5fd"); setHex(img, 11, 4, "#93c5fd")
  setHex(img, 6, 6, "#93c5fd"); setHex(img, 10, 6, "#93c5fd")
  setHex(img, 8, 8, "#fde047") -- Trickling sand in middle
  setHex(img, 6, 10, "#93c5fd"); setHex(img, 10, 10, "#93c5fd")
  -- Sand pile in bottom
  for y = 10, 12 do for x = 6, 10 do setHex(img, x, y, "#facc15") end end
  save(spr, "emoji_cadena_reloj_arena")
end

-- 50. emoji_cadena_calavera (☠️)
do
  local spr = Sprite(16, 16); local img = spr.cels[1].image
  -- Skull & Poison symbol (Severe bad habit)
  for y = 3, 9 do
    for x = 4, 12 do
      local d = math.sqrt((x - 8)^2 + (y - 6)^2)
      if d <= 4.2 then setHex(img, x, y, (x <= 7) and "#f8fafc" or "#cbd5e1") end
    end
  end
  -- Eye sockets & nose
  setHex(img, 6, 6, "#0f172a"); setHex(img, 10, 6, "#0f172a")
  setHex(img, 8, 8, "#0f172a")
  -- Teeth
  for x = 6, 10 do setHex(img, x, 11, (x % 2 == 0) and "#f8fafc" or "#0f172a") end
  save(spr, "emoji_cadena_calavera")
end