local items = {
  {"items", "item_bici_expedicion"},
  {"items", "item_trailer_remolque"},
  {"ui", "ui_transporte_bici_trailer_combo"}
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