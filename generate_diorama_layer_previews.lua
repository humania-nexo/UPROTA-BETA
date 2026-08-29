local mods = {
  "modulo_gallinero", "sprite_gallina_frame1", "sprite_gallina_frame2",
  "modulo_huerto_cajones", "modulo_fogon_piedras", "sprite_fuego_frame1", "sprite_fuego_frame2",
  "modulo_mesa_taller", "modulo_bici_generador", "modulo_antena_mutil"
}

for _, mName in ipairs(mods) do
  local src = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/refugio/" .. mName .. ".png"
  local spr = app.open(src)
  if spr then
    spr:resize(spr.width * 4, spr.height * 4)
    spr:saveCopyAs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/previews/preview_" .. mName .. "_4x.png")
    spr:close()
  end
end