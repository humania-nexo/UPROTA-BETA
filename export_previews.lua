local files = {
  "recursos/recurso_tablas",
  "recursos/recurso_clavos",
  "recursos/recurso_provisiones",
  "recursos/recurso_agua",
  "recursos/recurso_moral",
  "pilares/pilar_cuerpo",
  "pilares/pilar_mente",
  "pilares/pilar_espiritu",
  "pilares/pilar_taller",
  "pilares/torta_dorada_badge"
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