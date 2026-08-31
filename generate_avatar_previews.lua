local avatars = {
  "avatar_anigami_44x44", "avatar_anigami_32x32",
  "avatar_nexo_44x44", "avatar_nexo_32x32",
  "avatar_silas_44x44", "avatar_silas_32x32",
  "avatar_hertz_44x44", "avatar_hertz_32x32",
  "avatar_pix_44x44", "avatar_pix_32x32"
}

for _, aName in ipairs(avatars) do
  local src = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/avatars/" .. aName .. ".png"
  local spr = app.open(src)
  if spr then
    spr:resize(spr.width * 4, spr.height * 4)
    spr:saveCopyAs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/previews/preview_" .. aName .. "_4x.png")
    spr:close()
  end
end