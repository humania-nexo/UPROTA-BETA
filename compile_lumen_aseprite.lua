local baseUprota = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA"
local baseSapiensia = "c:/Users/Snow/.gemini/antigravity/scratch/sapiensiaclan"
local tempDir = baseUprota .. "/temp_lumen_frames"

-- Compile Full-Body Animated Sprite (48x64 px, 8 frames)
local spr = Sprite(48, 64)
for f = 1, 8 do
  if f > 1 then spr:newFrame() end
  spr.frames[f].duration = 0.12 -- Serene 8.3 FPS breathing loop
  local framePath = string.format("%s/lumen_%02d.png", tempDir, f - 1)
  local frameImg = Image{ fromFile = framePath }
  spr.cels[f].image:drawImage(frameImg, Point(0,0))
end

spr:saveCopyAs(baseUprota .. "/assets/sprites/personajes/lumen_idle.gif")
spr:saveCopyAs(baseUprota .. "/assets/sprites/personajes/lumen_idle.aseprite")
spr:saveCopyAs(baseSapiensia .. "/assets/clan/lumen_idle.gif")

-- 4x Preview GIF
local spr4x = Sprite(spr)
spr4x:resize(48 * 4, 64 * 4)
spr4x:saveCopyAs(baseUprota .. "/assets/sprites/previews/preview_lumen_idle_4x.gif")
spr4x:close()

spr:close()

-- Compile Avatar Aseprite file
local avImg = Image{ fromFile = baseUprota .. "/assets/sprites/avatars/avatar_lumen_44x44.png" }
local avSpr = Sprite(44, 44)
avSpr.cels[1].image:drawImage(avImg, Point(0,0))
avSpr:saveCopyAs(baseUprota .. "/assets/sprites/avatars/avatar_lumen_44x44.aseprite")
avSpr:close()

local av32Img = Image{ fromFile = baseUprota .. "/assets/sprites/avatars/avatar_lumen_32x32.png" }
local av32Spr = Sprite(32, 32)
av32Spr.cels[1].image:drawImage(av32Img, Point(0,0))
av32Spr:saveCopyAs(baseUprota .. "/assets/sprites/avatars/avatar_lumen_32x32.aseprite")
av32Spr:close()

print("Lumen Aseprite & GIF compilation complete!")
