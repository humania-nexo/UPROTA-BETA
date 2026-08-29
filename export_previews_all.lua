local files = {
  -- UI
  "ui/tab_tablon", "ui/tab_refugio", "ui/tab_misiones", "ui/tab_radio", "ui/tab_hogar",
  "ui/ico_info", "ui/ico_check_ok", "ui/ico_candado",
  -- Mecanicas
  "mecanicas/mecanica_senda", "mecanicas/mecanica_cimiento",
  "mecanicas/cadena_firme", "mecanicas/cadena_tiembla", "mecanicas/cadena_rota",
  "mecanicas/faro_apagado", "mecanicas/faro_encendido",
  -- Items
  "items/caja_expedicion", "items/item_cuchillo_mellado", "items/item_cafe_solubil",
  "items/item_cables_cobre", "items/item_sal_grano", "items/item_yesca_natural",
  "items/item_biblia_don_chui"
}

for _, rel in ipairs(files) do
  local src = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/" .. rel .. ".aseprite"
  local spr = app.open(src)
  if spr then
    spr:resize(spr.width * 6, spr.height * 6)
    local name = rel:match(".*/(.*)")
    local dst = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/previews/preview_" .. name .. "_6x.png"
    spr:saveCopyAs(dst)
    spr:close()
  end
end