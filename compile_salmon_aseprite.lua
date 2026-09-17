local baseUprota = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA"
local baseSapiensia = "c:/Users/Snow/.gemini/antigravity/scratch/sapiensiaclan"
local tempDir = baseUprota .. "/temp_salmon_frames"

local spr = Sprite(240, 135)

for f = 1, 16 do
  if f > 1 then spr:newFrame() end
  spr.frames[f].duration = 0.08 -- 12.5 FPS
  local framePath = string.format("%s/frame_%02d.png", tempDir, f - 1)
  local frameImg = Image{ fromFile = framePath }
  spr.cels[f].image:drawImage(frameImg, Point(0,0))
end

-- Save Multi-frame Animated GIF & Aseprite
spr:saveCopyAs(baseUprota .. "/assets/sprites/ilustraciones/salto_salmon_anim.gif")
spr:saveCopyAs(baseUprota .. "/assets/sprites/ilustraciones/salto_salmon_anim.aseprite")
spr:saveCopyAs(baseSapiensia .. "/assets/salto_salmon_anim.gif")

-- 4x High Resolution Preview GIF
local spr4x = Sprite(spr)
spr4x:resize(240 * 2, 135 * 2)
spr4x:saveCopyAs(baseUprota .. "/assets/sprites/previews/preview_salto_salmon_anim_4x.gif")
spr4x:close()

-- Master Still Illustration (Apex Frame 8)
local stillSpr = Sprite(240, 135)
stillSpr.cels[1].image:drawImage(spr.cels[8].image, Point(0,0))
stillSpr:saveCopyAs(baseUprota .. "/assets/sprites/ilustraciones/ilustracion_salto_salmon.png")
stillSpr:saveCopyAs(baseUprota .. "/assets/sprites/ilustraciones/ilustracion_salto_salmon.aseprite")

local still4x = Sprite(stillSpr)
still4x:resize(240 * 2, 135 * 2)
still4x:saveCopyAs(baseUprota .. "/assets/sprites/previews/preview_salto_salmon_4x.png")
still4x:close()
stillSpr:close()

spr:close()

print("Aseprite Compilation Complete!")
