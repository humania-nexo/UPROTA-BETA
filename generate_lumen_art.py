import os
import math
import random
from PIL import Image

# 1. AVATAR DE LUMEN (44x44 px)
W_AV, H_AV = 44, 44

# Palette
BG_DARK      = (4, 9, 20)       # Deep indigo / night
BG_FRAME     = (15, 23, 42)     # Slate frame
COBALT_DARK  = (23, 37, 84)     # Deep serene cobalt border
COBALT_MID   = (30, 64, 175)    # Rich cobalt blue
COBALT_LIGHT = (29, 78, 216)    # Vibrant cobalt
CYAN_GLOW    = (56, 189, 248)   # Translucent cyan transition
CYAN_SOFT    = (186, 230, 253)  # Soft sky
GOLD_AMBER   = (245, 158, 11)   # Warm amber
GOLD_MID     = (251, 191, 36)   # Radiant gold
GOLD_LIGHT   = (254, 240, 138)  # Soft golden core
WHITE_CORE   = (255, 255, 255)  # Pure white incandescent essence

# Generate 44x44 Avatar Image
img_av = Image.new("RGBA", (W_AV, H_AV), (0, 0, 0, 0))
pix_av = img_av.load()

# Circular frame
for y in range(H_AV):
    for x in range(W_AV):
        d = math.sqrt((x - 22)**2 + (y - 22)**2)
        if d <= 21.5:
            col = BG_DARK if d <= 18.0 else BG_FRAME
            pix_av[x, y] = col + (255,)

# Render Lumen Flame Silhouette in Avatar (Bust / Torso & Crown Flame)
# Head/Flame crown: center (22, 13), Torso: center (22, 26), Shoulders: (16 to 28, 22)
# Distance field for humanoid flame
for y in range(4, 40):
    for x in range(8, 36):
        # Head / Crown flame center: (22, 12)
        # Chest center: (22, 24)
        # Shoulders / arms: x in 14..30, y in 22..36
        
        # Flame contour math
        in_flame = False
        norm_dist = 1.0
        
        # Crown flame (tapering upward with gentle lick)
        if y < 19:
            head_dx = abs(x - 22)
            head_h = 19 - y # 0 to 15
            # Tapered flame teardrop
            allowed_w = max(0.5, (19 - y) * 0.5) if y < 10 else (3.5 + math.sin((y - 10)/9.0 * math.pi) * 2.0)
            if head_dx <= allowed_w:
                in_flame = True
                norm_dist = head_dx / max(1.0, allowed_w)
                # Vertical center bias
                norm_dist = max(norm_dist, (15 - y) / 15.0 * 0.6)
                
        # Torso & Open Arms (y >= 19)
        else:
            torso_dx = abs(x - 22)
            allowed_w = 4.0 + (y - 19) * 0.35
            
            # Arms hanging gracefully at sides
            arm_left = (15 <= x <= 18) and (21 <= y <= 35)
            arm_right = (26 <= x <= 29) and (21 <= y <= 35)
            
            if torso_dx <= allowed_w or arm_left or arm_right:
                in_flame = True
                if torso_dx <= allowed_w:
                    norm_dist = torso_dx / max(1.0, allowed_w)
                else:
                    norm_dist = 0.75 + (abs(x - 22) - 4.0) * 0.04

        if in_flame:
            # Soft radial glow around edges
            # Shading from White -> Gold -> Cyan -> Cobalt
            if norm_dist < 0.22:
                col = WHITE_CORE
            elif norm_dist < 0.45:
                col = GOLD_LIGHT
            elif norm_dist < 0.65:
                col = GOLD_MID
            elif norm_dist < 0.82:
                col = CYAN_GLOW
            elif norm_dist < 0.95:
                col = COBALT_MID
            else:
                col = COBALT_DARK
                
            # Blend into circle background
            pix_av[x, y] = col + (255,)

# Subtle outer ambient aura particles around Lumen
aura_dots = [
    (14, 11), (29, 10), (12, 18), (31, 17), (10, 26), (33, 25), (22, 5), (19, 7), (25, 7)
]
for ax, ay in aura_dots:
    if 0 <= ax < W_AV and 0 <= ay < H_AV:
        pix_av[ax, ay] = CYAN_GLOW + (180,)

os.makedirs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/avatars", exist_ok=True)
img_av.save("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/avatars/avatar_lumen_44x44.png")

# 32x32 resize
img_av_32 = img_av.resize((32, 32), Image.Resampling.NEAREST)
img_av_32.save("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/avatars/avatar_lumen_32x32.png")

# 4x Previews
img_av_4x = img_av.resize((44 * 4, 44 * 4), Image.Resampling.NEAREST)
img_av_4x.save("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/previews/preview_avatar_lumen_44x44_4x.png")

print("Avatar generated!")
