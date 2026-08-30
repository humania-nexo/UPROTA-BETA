local items = {
  {"npcs", "npc_lutier_anciano_idle"},
  {"npcs", "npc_el_tuerto_idle"},
  {"ui", "sprite_radio_onda_frame1"},
  {"ui", "sprite_radio_onda_frame2"}
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