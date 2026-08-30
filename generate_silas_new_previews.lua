local items = {
  {"npcs", "npc_dona_concha_idle"},
  {"npcs", "npc_valeria_costurera_idle"},
  {"npcs", "npc_elena_radio_idle"},
  {"npcs", "npc_katia_mensajera_idle"},
  {"npcs", "npc_bebe_fitolantro"},
  {"npcs", "npc_nino_raiz_idle"},
  {"items", "item_maquina_singer"},
  {"items", "item_arte_de_la_guerra"},
  {"items", "item_herbario_valle"},
  {"items", "item_mapa_atajos_katia"},
  {"ui", "ui_bolsa_08kg_rota"},
  {"ui", "ui_bolso_12kg_reforzado"},
  {"ui", "ui_mochila_18kg_costal"},
  {"ui", "ui_mochila_25kg_varilla"}
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