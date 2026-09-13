local items = {
  "avatar_eter_44x44",
  "avatar_eter_32x32"
}

for _, aName in ipairs(items) do
  local src = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/avatars/" .. aName .. ".png"
  local spr = app.open(src)
  if spr then
    spr:resize(spr.width * 4, spr.height * 4)
    spr:saveCopyAs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/previews/preview_" .. aName .. "_4x.png")
    spr:close()
  end
end