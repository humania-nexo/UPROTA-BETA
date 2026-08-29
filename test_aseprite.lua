local spr = Sprite(16, 16)
local img = spr.cels[1].image
for it in img:pixels() do
  it(app.pixelColor.rgba(255, 0, 0, 255))
end
spr:saveCopyAs("test_output.png")
spr:saveCopyAs("test_output.aseprite")