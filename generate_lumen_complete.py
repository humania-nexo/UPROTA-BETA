import os
import math
import random
from PIL import Image

# PALETTE DE LUMEN
BG_DARK      = (4, 9, 20)       # Deep indigo abyss
BG_FRAME     = (15, 23, 42)     # Slate frame
COBALT_DARK  = (23, 37, 84)     # Deep serene cobalt border
COBALT_MID   = (30, 64, 175)    # Rich cobalt blue
COBALT_LIGHT = (29, 78, 216)    # Vibrant cobalt
CYAN_GLOW    = (56, 189, 248)   # Translucent cyan
CYAN_SOFT    = (186, 230, 253)  # Soft sky
GOLD_AMBER   = (245, 158, 11)   # Warm amber
GOLD_MID     = (251, 191, 36)   # Radiant gold
GOLD_LIGHT   = (254, 240, 138)  # Soft golden core
WHITE_CORE   = (255, 255, 255)  # Pure incandescent essence

# -------------------------------------------------------------
# 1. AVATAR CIRCULAR (44x44 px) - Elegante busto de llama
# -------------------------------------------------------------
W_AV, H_AV = 44, 44
img_av = Image.new("RGBA", (W_AV, H_AV), (0, 0, 0, 0))
pix_av = img_av.load()

# Frame circular
for y in range(H_AV):
    for x in range(W_AV):
        d = math.sqrt((x - 22)**2 + (y - 22)**2)
        if d <= 21.5:
            col = BG_DARK if d <= 18.0 else BG_FRAME
            pix_av[x, y] = col + (255,)

# Humanoid flame bust silhouette:
# Head: center (22, 14), r_x ~ 4.5, r_y ~ 6.5, tip tapering to (22, 6)
# Neck: (22, 20), w ~ 3
# Shoulders: (22, 24), w ~ 16 (from x: 14 to 30)
# Torso & Open Arms: y: 24 to 38

def get_avatar_color(x, y):
    # Head region (y: 6 to 19)
    if y <= 19:
        if y < 6: return None
        # Flame tip tapering upwards
        tip_h = 19 - y
        w_head = 4.8 * math.sin((y - 6) / 13.0 * math.pi) if y >= 7 else (y - 5) * 0.8
        dx = abs(x - 22)
        if dx <= w_head:
            norm_d = dx / max(0.8, w_head)
            # Head core luminescence
            dist_center = math.sqrt((dx * 1.2)**2 + (y - 14)**2) / 6.0
            nd = max(norm_d * 0.8, dist_center * 0.7)
            if nd < 0.28: return WHITE_CORE
            elif nd < 0.50: return GOLD_LIGHT
            elif nd < 0.70: return GOLD_MID
            elif nd < 0.85: return CYAN_GLOW
            elif nd < 0.96: return COBALT_MID
            else: return COBALT_DARK
        return None
        
    # Torso & Shoulders & Welcoming Open Arms (y: 20 to 39)
    else:
        # Torso central core
        torso_w = 4.2 + (y - 20) * 0.25 if y <= 28 else 6.2 - (y - 28) * 0.2
        dx = abs(x - 22)
        
        # Left Arm (welcoming / resting at side)
        arm_l = (13 <= x <= 17) and (23 <= y <= 37)
        # Right Arm (welcoming / resting at side)
        arm_r = (27 <= x <= 31) and (23 <= y <= 37)
        
        # Open hands (y: 34 to 37, x: 12..15 and 29..32)
        hand_l = (12 <= x <= 16) and (34 <= y <= 38)
        hand_r = (28 <= x <= 32) and (34 <= y <= 38)
        
        if dx <= torso_w:
            norm_d = dx / max(1.0, torso_w)
            dist_core = math.sqrt((dx * 1.5)**2 + (y - 26)**2) / 8.0
            nd = min(1.0, max(norm_d * 0.7, dist_core * 0.6))
            if nd < 0.25: return WHITE_CORE
            elif nd < 0.48: return GOLD_LIGHT
            elif nd < 0.68: return GOLD_MID
            elif nd < 0.85: return CYAN_GLOW
            elif nd < 0.96: return COBALT_MID
            else: return COBALT_DARK
        elif arm_l or arm_r or hand_l or hand_r:
            # Arm flame
            arm_center = 15 if (arm_l or hand_l) else 29
            adx = abs(x - arm_center)
            if adx <= 1.8:
                if adx <= 0.6: return GOLD_MID
                elif adx <= 1.2: return CYAN_GLOW
                else: return COBALT_MID
        return None

for y in range(H_AV):
    for x in range(W_AV):
        d = math.sqrt((x - 22)**2 + (y - 22)**2)
        if d <= 18.0:
            c = get_avatar_color(x, y)
            if c:
                pix_av[x, y] = c + (255,)

# Subtle golden/cyan aura motes
aura_points = [(10, 15), (33, 14), (12, 8), (31, 9), (22, 4), (18, 5), (26, 5), (9, 28), (34, 27)]
for ax, ay in aura_points:
    d = math.sqrt((ax - 22)**2 + (ay - 22)**2)
    if d <= 17.5:
        pix_av[ax, ay] = CYAN_SOFT + (200,)

os.makedirs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/avatars", exist_ok=True)
os.makedirs("c:/Users/Snow/.gemini/antigravity/scratch/sapiensiaclan/assets/clan", exist_ok=True)
os.makedirs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/previews", exist_ok=True)

img_av.save("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/avatars/avatar_lumen_44x44.png")
img_av.save("c:/Users/Snow/.gemini/antigravity/scratch/sapiensiaclan/assets/clan/avatar_lumen_44x44.png")

img_av_32 = img_av.resize((32, 32), Image.Resampling.NEAREST)
img_av_32.save("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/avatars/avatar_lumen_32x32.png")
img_av_32.save("c:/Users/Snow/.gemini/antigravity/scratch/sapiensiaclan/assets/clan/avatar_lumen_32x32.png")

img_av_4x = img_av.resize((44 * 4, 44 * 4), Image.Resampling.NEAREST)
img_av_4x.save("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/previews/preview_avatar_lumen_44x44_4x.png")

# -------------------------------------------------------------
# 2. FULL-BODY ANIMATED STANDING FLAME (48x64 px, 8 frames loop)
# -------------------------------------------------------------
W_SPR, H_SPR = 48, 64
NUM_FRAMES = 8

frames_lumen = []
for f in range(NUM_FRAMES):
    img_f = Image.new("RGBA", (W_SPR, H_SPR), (0, 0, 0, 0))
    pix_f = img_f.load()
    
    # Subtly breathing height and flame flicker
    # Very gentle sinusoidal breathing (0.8 px amplitude)
    breath = math.sin(f / float(NUM_FRAMES) * 2.0 * math.pi) * 0.8
    flicker = math.sin((f + 2) / float(NUM_FRAMES) * 2.0 * math.pi) * 0.5
    
    cx = 24
    
    # Head Flame: y: 10 to 22 (Apex at y = 10 - breath)
    # Neck: y: 22 to 25
    # Chest / Torso: y: 25 to 36
    # Waist & Hips: y: 36 to 43
    # Slender Legs / Flowing base: y: 43 to 58
    
    for y in range(6, 62):
        for x in range(8, 40):
            dx = x - cx
            adx = abs(dx)
            
            is_lumen = False
            norm_val = 1.0
            
            # Crown Flame (y: 8 to 22)
            if y < 22:
                top_y = 9 - breath
                if y >= top_y:
                    h_prog = (y - top_y) / (22.0 - top_y)
                    # Gentle flame tip sway
                    tip_sway = flicker * (1.0 - h_prog) * 0.8
                    cur_dx = abs(dx - tip_sway)
                    max_w = 4.6 * math.sin(h_prog * math.pi * 0.9)
                    if cur_dx <= max_w:
                        is_lumen = True
                        norm_val = cur_dx / max(0.6, max_w)
                        
            # Neck & Chest / Torso (y: 22 to 36)
            elif y <= 36:
                t_prog = (y - 22) / 14.0
                max_w = 2.4 + math.sin(t_prog * math.pi) * 2.6
                
                # Slender Arms (hanging naturally with open palms)
                # Left Arm: x ~ 15..18, y ~ 26..42
                arm_l = (15 <= x <= 18) and (26 <= y <= 42)
                arm_r = (30 <= x <= 33) and (26 <= y <= 42)
                
                if adx <= max_w:
                    is_lumen = True
                    dist_heart = math.sqrt((dx * 1.4)**2 + (y - 29)**2) / 6.0
                    norm_val = min(1.0, max(adx / max(1.0, max_w) * 0.7, dist_heart * 0.5))
                elif arm_l or arm_r:
                    is_lumen = True
                    arm_center = 16.5 if arm_l else 31.5
                    norm_val = 0.65 + abs(x - arm_center) * 0.2
                    
            # Waist, Hips & Flowing Gown/Flame Base (y: 37 to 58)
            elif y <= 58:
                b_prog = (y - 37) / 21.0
                
                # Slender silhouette tapering gracefully into smooth candle base
                max_w = 4.2 + math.sin(b_prog * math.pi * 0.7) * 2.8 - (b_prog**1.5) * 2.0
                
                # Lower open arms & palms (y: 37 to 42)
                palm_l = (14 <= x <= 18) and (37 <= y <= 42)
                palm_r = (30 <= x <= 34) and (37 <= y <= 42)
                
                # Legs flame columns inside the silhouette
                leg_l = (20 <= x <= 23) and (43 <= y <= 57)
                leg_r = (25 <= x <= 28) and (43 <= y <= 57)
                
                if adx <= max_w:
                    is_lumen = True
                    norm_val = adx / max(1.0, max_w)
                elif palm_l or palm_r:
                    is_lumen = True
                    norm_val = 0.75 + (abs(dx) - max_w) * 0.1
                    
            if is_lumen:
                # Core luminescence with gentle pulse
                if norm_val < 0.22:
                    col = WHITE_CORE
                elif norm_val < 0.42:
                    col = GOLD_LIGHT
                elif norm_val < 0.65:
                    col = GOLD_MID
                elif norm_val < 0.82:
                    col = CYAN_GLOW
                elif norm_val < 0.94:
                    col = COBALT_MID
                else:
                    col = COBALT_DARK
                    
                pix_f[x, y] = col + (255,)
                
    # Ambient glowing light motes around Lumen
    motes = [
        (cx - 9 + int(flicker*1.5), 18),
        (cx + 9 - int(flicker*1.5), 16),
        (cx - 12, 32 + int(breath)),
        (cx + 12, 34 - int(breath)),
        (cx - 8, 48),
        (cx + 8, 50),
        (cx, 6 - int(breath))
    ]
    for mx, my in motes:
        if 0 <= mx < W_SPR and 0 <= my < H_SPR:
            pix_f[mx, my] = CYAN_SOFT + (190,)

    frames_lumen.append(img_f)

# Save Sprites
os.makedirs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/personajes", exist_ok=True)
os.makedirs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/temp_lumen_frames", exist_ok=True)

for idx, fimg in enumerate(frames_lumen):
    fimg.save(f"c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/temp_lumen_frames/lumen_{idx:02d}.png")

# Save Still (Frame 0)
frames_lumen[0].save("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/personajes/lumen_idle.png")
frames_lumen[0].save("c:/Users/Snow/.gemini/antigravity/scratch/sapiensiaclan/assets/clan/lumen_idle.png")

# 4x Preview Still
lumen_4x = frames_lumen[0].resize((W_SPR * 4, H_SPR * 4), Image.Resampling.NEAREST)
lumen_4x.save("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/previews/preview_lumen_idle_4x.png")

print("Full-body frames generated!")
