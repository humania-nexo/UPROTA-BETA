local baseUprota = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA"
local baseSapiensia = "c:/Users/Snow/.gemini/antigravity/scratch/sapiensiaclan"
local tempDir = baseUprota .. "/temp_clan_avatars"

local members = { "anigami", "nexo", "silas", "hertz", "pix", "eter", "lumen" }

for _, name in ipairs(members) do
  local spr = Sprite(44, 44)
  for f = 1, 8 do
    if f > 1 then spr:newFrame() end
    spr.frames[f].duration = 0.10 -- 10 FPS smooth idle animation loop
    local framePath = string.format("%s/%s/frame_%02d.png", tempDir, name, f - 1)
    local frameImg = Image{ fromFile = framePath }
    spr.cels[f].image:drawImage(frameImg, Point(0,0))
  end

  -- Save Master 44x44 Animated GIF & Aseprite in UPROTA
  spr:saveCopyAs(string.format("%s/assets/sprites/avatars/avatar_%s_anim.gif", baseUprota, name))
  spr:saveCopyAs(string.format("%s/assets/sprites/avatars/avatar_%s_44x44.gif", baseUprota, name))
  spr:saveCopyAs(string.format("%s/assets/sprites/avatars/avatar_%s_anim.aseprite", baseUprota, name))

  -- Save to SAPIENSIA Clan
  spr:saveCopyAs(string.format("%s/assets/clan/avatar_%s_anim.gif", baseSapiensia, name))
  spr:saveCopyAs(string.format("%s/assets/clan/avatar_%s_44x44.gif", baseSapiensia, name))

  -- 32x32 Animated GIF
  local spr32 = Sprite(spr)
  spr32:resize(32, 32)
  spr32:saveCopyAs(string.format("%s/assets/sprites/avatars/avatar_%s_32x32.gif", baseUprota, name))
  spr32:saveCopyAs(string.format("%s/assets/clan/avatar_%s_32x32.gif", baseSapiensia, name))
  spr32:close()

  -- 4x High-Res Preview GIF (176x176 px)
  local spr4x = Sprite(spr)
  spr4x:resize(44 * 4, 44 * 4)
  spr4x:saveCopyAs(string.format("%s/assets/sprites/previews/preview_avatar_%s_anim_4x.gif", baseUprota, name))
  spr4x:close()

  spr:close()
end

print("All 7 clan member animated avatar GIFs compiled successfully!")
