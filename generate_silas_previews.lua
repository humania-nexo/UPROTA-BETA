local items = {
  {"npcs", "npc_don_chui_idle"},
  {"npcs", "npc_don_chui_caminando"},
  {"npcs", "npc_perro_cimarron"},
  {"items", "item_manual_tomo1"},
  {"items", "item_manual_tomo2"},
  {"items", "item_manual_tomo3"},
  {"items", "item_biblia_don_chui"},
  {"mecanicas", "cimiento_alacena_colgante"},
  {"mecanicas", "cimiento_horno_cob"},
  {"mecanicas", "cimiento_desviador_pluvial"},
  {"ui", "ui_mision_preventiva"},
  {"ui", "ui_mision_correctiva"}
}

for _, it in ipairs(items) do
  local src = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/" .. it[1] .. "/" .. it[2] .. ".png"
  local spr = app.open(src)
  if spr then
    spr:resize(spr.width * 4, spr.height * 4)
    spr:saveCopyAs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/previews/preview_" .. it[2] .. "_4x.png")
    spr:close()
  end
end