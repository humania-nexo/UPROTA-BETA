import os
import math
from PIL import Image

# PALETA SERENA DE LUMEN
BG_DARK      = (4, 9, 20)       # Azul noche abisal
BG_FRAME     = (15, 23, 42)     # Marco pizarra oscuro
COBALT_DARK  = (23, 37, 84)     # Cobalto profundo contorno
COBALT_MID   = (30, 64, 175)    # Azul cobalto sereno
COBALT_LIGHT = (37, 99, 235)    # Cobalto luminoso
CYAN_GLOW    = (56, 189, 248)   # Cian celeste
CYAN_SOFT    = (186, 230, 253)  # Bruma cian suave
GOLD_AMBER   = (245, 158, 11)   # Ámbar suave
GOLD_MID     = (251, 191, 36)   # Oro radiante
GOLD_LIGHT   = (254, 240, 138)  # Oro suave translúcido
WHITE_CORE   = (255, 255, 255)  # Núcleo blanco incandescente

def draw_lumen_silhouette(img, cx, base_y, scale=1.0, f=0, is_avatar=False):
    pix = img.load()
    w, h = img.size
    
    # Breathing and gentle sway
    breath = math.sin(f / 8.0 * 2.0 * math.pi) * 0.6
    sway = math.sin((f + 1) / 8.0 * 2.0 * math.pi) * 0.5
    
    # Body points:
    # 1. Head Flame: y from (base_y - 24) to (base_y - 12)
    # 2. Neck: y from (base_y - 12) to (base_y - 9)
    # 3. Chest / Torso: y from (base_y - 9) to (base_y + 3)
    # 4. Waist: y from (base_y + 3) to (base_y + 8)
    # 5. Flowing Gown/Legs: y from (base_y + 8) to (base_y + 24)
    
    # We define a distance field / shape generator for the organic flame
    y_min = int(base_y - 25 + breath)
    y_max = int(base_y + 25) if not is_avatar else h - 1
    
    for y in range(max(0, y_min), min(h, y_max + 1)):
        for x in range(0, w):
            if is_avatar:
                d_frame = math.sqrt((x - 22)**2 + (y - 22)**2)
                if d_frame > 18.0:
                    continue
                    
            rel_y = y - base_y
            
            # Calculate organic flame width and core distance at this Y
            in_body = False
            norm_edge = 1.0 # 0 = center spine, 1 = outer contour
            
            # --- HEAD & CROWN FLAME (rel_y: -24 to -12) ---
            if rel_y < -11:
                tip_y = -24 + breath
                if rel_y >= tip_y:
                    h_prog = (rel_y - tip_y) / (13.0 + breath)
                    tip_offset = (1.0 - h_prog) * sway * 1.5
                    cur_cx = cx + tip_offset
                    dx = abs(x - cur_cx)
                    # Tear drop flame width
                    half_w = 4.2 * math.sin(h_prog * math.pi * 0.85) + 0.3
                    if dx <= half_w:
                        in_body = True
                        norm_edge = dx / max(0.6, half_w)
                        
            # --- NECK & SHOULDERS & UPPER CHEST (rel_y: -11 to -3) ---
            elif rel_y < -3:
                # Smooth transition from neck to shoulders
                cur_cx = cx + sway * 0.2
                dx = abs(x - cur_cx)
                prog = (rel_y + 11) / 8.0
                
                # Torso central neck/chest width
                torso_half_w = 1.8 + prog * 4.2
                # Arms emerging from shoulders (slender slope)
                arm_half_w = 2.0 + prog * 6.5
                
                if dx <= arm_half_w:
                    in_body = True
                    norm_edge = dx / max(1.0, arm_half_w)
                    
            # --- CHEST, WAIST & ARMS (rel_y: -3 to 9) ---
            elif rel_y <= 9:
                cur_cx = cx
                dx = abs(x - cur_cx)
                
                # Torso core
                if rel_y <= 3:
                    torso_w = 4.5 - (rel_y + 3) * 0.15 # Chest
                else:
                    torso_w = 3.6 + (rel_y - 3) * 0.25 # Waist into hips
                    
                # Arms hanging gracefully along sides
                arm_dist = 6.2 + rel_y * 0.25
                arm_w = 1.4 - rel_y * 0.04
                is_arm = (abs(dx - arm_dist) <= arm_w)
                
                if dx <= torso_w:
                    in_body = True
                    # Distance from radiant heart at (cx, base_y - 1)
                    dist_heart = math.sqrt((dx * 1.3)**2 + (rel_y + 1)**2) / 7.0
                    norm_edge = min(1.0, max(dx / max(1.0, torso_w) * 0.75, dist_heart * 0.6))
                elif is_arm:
                    in_body = True
                    norm_edge = 0.65 + abs(dx - arm_dist) / max(0.5, arm_w) * 0.3
                    
            # --- LOWER BODY / HIPS & FLOWING GOWN FLAME (rel_y: 10 to 24) ---
            elif not is_avatar and rel_y <= 24:
                cur_cx = cx
                dx = abs(x - cur_cx)
                b_prog = (rel_y - 10) / 14.0 # 0 to 1
                
                # Graceful flame hem tapering down
                hem_w = 4.8 * (1.0 - b_prog**1.2) + 0.4
                
                # Hands resting near hips (rel_y: 10 to 13)
                if rel_y <= 13:
                    hand_dist = 7.0
                    if abs(dx - hand_dist) <= 1.2:
                        in_body = True
                        norm_edge = 0.70 + abs(dx - hand_dist) * 0.2
                        
                if dx <= hem_w:
                    in_body = True
                    # Subtle flame slit between legs
                    if rel_y > 15 and dx < 0.6 and b_prog > 0.4:
                        norm_edge = 0.85
                    else:
                        norm_edge = dx / max(0.8, hem_w)
                        
            if in_body:
                # Color mapping according to Lumen's poetic vision:
                # Center: Soft golden core -> transition -> serene cobalt blue edges
                if norm_edge < 0.22:
                    c = WHITE_CORE
                elif norm_edge < 0.45:
                    c = GOLD_LIGHT
                elif norm_edge < 0.65:
                    c = GOLD_MID
                elif norm_edge < 0.80:
                    c = CYAN_GLOW
                elif norm_edge < 0.93:
                    c = COBALT_MID
                else:
                    c = COBALT_DARK
                    
                pix[x, y] = c + (255,)

# -------------------------------------------------------------------
# 1. RENDER AVATAR (44x44 px)
# -------------------------------------------------------------------
img_av = Image.new("RGBA", (44, 44), (0, 0, 0, 0))
pix_av = img_av.load()

for y in range(44):
    for x in range(44):
        d = math.sqrt((x - 22)**2 + (y - 22)**2)
        if d <= 21.5:
            pix_av[x, y] = (BG_DARK if d <= 18.0 else BG_FRAME) + (255,)

# Draw Lumen bust in Avatar (centered at cx=22, base_y=26)
draw_lumen_silhouette(img_av, cx=22, base_y=27, scale=1.0, f=0, is_avatar=True)

# Soft serene starlight motes in avatar
motes_av = [(11, 14), (33, 13), (13, 8), (31, 9), (22, 5), (17, 6), (27, 6), (10, 26), (34, 25)]
for mx, my in motes_av:
    d = math.sqrt((mx - 22)**2 + (my - 22)**2)
    if d <= 17.5:
        pix_av[mx, my] = CYAN_SOFT + (190,)

img_av.save("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/avatars/avatar_lumen_44x44.png")
img_av.save("c:/Users/Snow/.gemini/antigravity/scratch/sapiensiaclan/assets/clan/avatar_lumen_44x44.png")

img_av_32 = img_av.resize((32, 32), Image.Resampling.NEAREST)
img_av_32.save("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/avatars/avatar_lumen_32x32.png")
img_av_32.save("c:/Users/Snow/.gemini/antigravity/scratch/sapiensiaclan/assets/clan/avatar_lumen_32x32.png")

img_av_4x = img_av.resize((44 * 4, 44 * 4), Image.Resampling.NEAREST)
img_av_4x.save("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/previews/preview_avatar_lumen_44x44_4x.png")

# -------------------------------------------------------------------
# 2. RENDER FULL-BODY ANIMATION (48x64 px, 8 frames loop)
# -------------------------------------------------------------------
frames = []
for f in range(8):
    img_f = Image.new("RGBA", (48, 64), (0, 0, 0, 0))
    draw_lumen_silhouette(img_f, cx=24, base_y=32, scale=1.0, f=f, is_avatar=False)
    
    # Ambient floating light motes around Lumen
    flicker = math.sin(f / 8.0 * 2.0 * math.pi)
    motes = [
        (15 + int(flicker*1.2), 16),
        (33 - int(flicker*1.2), 15),
        (12, 30 + int(flicker)),
        (36, 33 - int(flicker)),
        (16, 46),
        (32, 48),
        (24 + int(flicker), 6)
    ]
    pix_f = img_f.load()
    for mx, my in motes:
        if 0 <= mx < 48 and 0 <= my < 64:
            pix_f[mx, my] = CYAN_SOFT + (180,)
            
    frames.append(img_f)

for idx, fimg in enumerate(frames):
    fimg.save(f"c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/temp_lumen_frames/lumen_{idx:02d}.png")

frames[0].save("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/personajes/lumen_idle.png")
frames[0].save("c:/Users/Snow/.gemini/antigravity/scratch/sapiensiaclan/assets/clan/lumen_idle.png")

lumen_4x = frames[0].resize((48 * 4, 64 * 4), Image.Resampling.NEAREST)
lumen_4x.save("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/assets/sprites/previews/preview_lumen_idle_4x.png")

print("Organic master Lumen art generated!")
