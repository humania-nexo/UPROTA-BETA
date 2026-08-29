-- 1. Previews for Fondos (tiled 2x2 to show seamlessness)
local fondos = {"bg_yermo_polvo", "bg_chapa_oxidada", "bg_madera_tablas", "bg_noche_estrellada"}
for _, fName in ipairs(fondos) do
  local src = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/fondos/" .. fName .. ".png"
  local spr = app.open(src)
  if spr then
    local tiled = Sprite(128, 128)
    local tImg = tiled.cels[1].image
    local sImg = spr.cels[1].image
    for ty = 0, 3 do
      for tx = 0, 3 do
        for py = 0, 31 do
          for px = 0, 31 do
            tImg:drawPixel(tx*32 + px, ty*32 + py, sImg:getPixel(px, py))
          end
        end
      end
    end
    tiled:resize(256, 256)
    tiled:saveCopyAs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/previews/preview_" .. fName .. "_tiled.png")
    tiled:close()
    spr:close()
  end
end

-- 2. Previews for Don Chui Portraits (3x scale)
local npcs = {"don_chui_neutral", "don_chui_hablando", "don_chui_orgulloso", "don_chui_preocupado"}
for _, nName in ipairs(npcs) do
  local src = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/npcs/" .. nName .. ".png"
  local spr = app.open(src)
  if spr then
    spr:resize(spr.width * 3, spr.height * 3)
    spr:saveCopyAs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/previews/preview_" .. nName .. "_3x.png")
    spr:close()
  end
end

-- 3. Previews for Refugio Dioramas (2x scale: 256x192)
local refugios = {"refugio_lvl0_punto_cero", "refugio_lvl1_cajones", "refugio_lvl2_techo", "refugio_lvl3_huerto", "refugio_lvl4_taller", "refugio_lvl5_fortaleza"}
for _, rName in ipairs(refugios) do
  local src = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/refugio/" .. rName .. ".png"
  local spr = app.open(src)
  if spr then
    spr:resize(spr.width * 2, spr.height * 2)
    spr:saveCopyAs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/previews/preview_" .. rName .. "_2x.png")
    spr:close()
  end
end

-- 4. Previews for UI Kit buttons & frame (3x scale)
local uis = {"frame_panel_metal", "btn_madera_normal", "btn_madera_pressed", "btn_metal_normal", "btn_metal_pressed"}
for _, uName in ipairs(uis) do
  local src = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/ui/" .. uName .. ".png"
  local spr = app.open(src)
  if spr then
    spr:resize(spr.width * 3, spr.height * 3)
    spr:saveCopyAs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/previews/preview_" .. uName .. "_3x.png")
    spr:close()
  end
end