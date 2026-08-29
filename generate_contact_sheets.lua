local categories = {"habitos", "emociones", "naturaleza", "objetos"}

for _, cat in ipairs(categories) do
  local catDir = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/emojis/" .. cat
  -- Create sheet: 10 columns x 5 rows of 16x16 = 160 x 80 px (with 2px padding -> 182 x 92)
  local cellW = 18
  local cellH = 18
  local sheet = Sprite(10 * cellW + 2, 5 * cellH + 2)
  local sImg = sheet.cels[1].image
  
  -- Fill dark background
  for y = 0, sheet.height - 1 do
    for x = 0, sheet.width - 1 do
      sImg:drawPixel(x, y, app.pixelColor.rgba(15, 23, 42, 255))
    end
  end

  local index = 0
  -- Get all files
  -- Let's list files by index
  -- We can use io.popen or iterate
  local handle = io.popen('dir /b "' .. catDir .. '\\*.png"')
  if handle then
    for filename in handle:lines() do
      if filename:match("%.png$") then
        local col = index % 10
        local row = math.floor(index / 10)
        local iconSpr = app.open(catDir .. "/" .. filename)
        if iconSpr then
          local iImg = iconSpr.cels[1].image
          local startX = 2 + col * cellW + 1
          local startY = 2 + row * cellH + 1
          
          -- Draw light grid cell background
          for cy = 0, 15 do
            for cx = 0, 15 do
              sImg:drawPixel(startX + cx, startY + cy, app.pixelColor.rgba(30, 41, 59, 255))
            end
          end
          
          -- Copy pixels
          for cy = 0, 15 do
            for cx = 0, 15 do
              local px = iImg:getPixel(cx, cy)
              if app.pixelColor.rgbaA(px) > 0 then
                sImg:drawPixel(startX + cx, startY + cy, px)
              end
            end
          end
          iconSpr:close()
        end
        index = index + 1
        if index >= 50 then break end
      end
    end
    handle:close()
  end
  
  -- Scale 4x for crystal clear viewing
  sheet:resize(sheet.width * 4, sheet.height * 4)
  local outPath = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/emojis/previews/preview_" .. cat .. "_atlas_4x.png"
  sheet:saveCopyAs(outPath)
  sheet:close()
end