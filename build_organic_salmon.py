import os
import math
import random
from PIL import Image, ImageDraw

W, H = 240, 135
NUM_FRAMES = 16

# Palette
BG_NIGHT     = (5, 7, 12)
CLIFF_DARK   = (11, 17, 30)
CLIFF_MID    = (24, 34, 52)
CLIFF_LIGHT  = (42, 59, 84)
CLIFF_RIM    = (67, 88, 117)

WATER_ABYSS  = (4, 19, 36)
WATER_DEEP   = (7, 43, 74)
WATER_BODY   = (2, 106, 162)
WATER_SURGE  = (2, 132, 199)
WATER_CYAN   = (56, 189, 248)
WATER_MIST   = (186, 230, 253)
WHITE        = (255, 255, 255)

SALMON_SHADOW= (61, 19, 2)
SALMON_DARK  = (120, 53, 15)
SALMON_MID   = (217, 119, 6)
SALMON_AMBER = (245, 158, 11)
SALMON_GOLD  = (251, 191, 36)
SALMON_SUN   = (254, 240, 138)
SALMON_BELLY = (254, 215, 170)

# Value Noise 2D function
def noise2d(x, y, seed=0):
    n = int(x * 374761393 + y * 668265263 + seed * 1013904223) & 0x7fffffff
    n = (n ^ (n >> 13)) * 1274126177 & 0x7fffffff
    return ((n ^ (n >> 16)) & 0x7fffffff) / 2147483647.0

def smooth_noise(x, y, seed=0):
    ix = math.floor(x)
    iy = math.floor(y)
    fx = x - ix
    fy = y - iy
    
    # Smoothstep
    sx = fx * fx * (3.0 - 2.0 * fx)
    sy = fy * fy * (3.0 - 2.0 * fy)
    
    n00 = noise2d(ix, iy, seed)
    n10 = noise2d(ix + 1, iy, seed)
    n01 = noise2d(ix, iy + 1, seed)
    n11 = noise2d(ix + 1, iy + 1, seed)
    
    nx0 = n00 * (1.0 - sx) + n10 * sx
    nx1 = n01 * (1.0 - sx) + n11 * sx
    return nx0 * (1.0 - sy) + nx1 * sy

def fbm(x, y, octaves=3, seed=0):
    val = 0.0
    amp = 0.5
    freq = 1.0
    for i in range(octaves):
        val += smooth_noise(x * freq, y * freq, seed + i * 17) * amp
        amp *= 0.5
        freq *= 2.0
    return val

# Trajectory
trajectory = [
    { "x": 185, "y": 118, "angle": -20, "flex": 0.8, "inWater": True, "splash": False, "hang": False },
    { "x": 180, "y": 112, "angle": -45, "flex": 0.5, "inWater": True, "splash": True, "hang": False },
    { "x": 172, "y": 98,  "angle": -62, "flex": 0.2, "inWater": False, "splash": True, "hang": False },
    { "x": 162, "y": 82,  "angle": -58, "flex": -0.3, "inWater": False, "splash": False, "hang": False },
    { "x": 150, "y": 66,  "angle": -50, "flex": -0.6, "inWater": False, "splash": False, "hang": False },
    { "x": 138, "y": 52,  "angle": -38, "flex": -0.4, "inWater": False, "splash": False, "hang": False },
    { "x": 124, "y": 42,  "angle": -20, "flex": 0.1, "inWater": False, "splash": False, "hang": True },
    { "x": 110, "y": 36,  "angle": 0,   "flex": 0.6, "inWater": False, "splash": False, "hang": True },
    { "x": 96,  "y": 38,  "angle": 18,  "flex": 0.7, "inWater": False, "splash": False, "hang": True },
    { "x": 84,  "y": 46,  "angle": 35,  "flex": 0.4, "inWater": False, "splash": False, "hang": False },
    { "x": 74,  "y": 58,  "angle": 50,  "flex": -0.2, "inWater": False, "splash": False, "hang": False },
    { "x": 65,  "y": 72,  "angle": 62,  "flex": -0.4, "inWater": False, "splash": False, "hang": False },
    { "x": 58,  "y": 88,  "angle": 70,  "flex": -0.2, "inWater": True, "splash": True, "hang": False },
    { "x": 52,  "y": 100, "angle": 75,  "flex": 0.2, "inWater": True, "splash": True, "hang": False },
    { "x": 48,  "y": 108, "angle": 80,  "flex": 0.5, "inWater": True, "splash": False, "hang": False },
    { "x": 46,  "y": 112, "angle": 80,  "flex": 0.6, "inWater": True, "splash": False, "hang": False },
]

# Random particles setup for consistent loop
random.seed(42)
waterfall_streaks = []
for i in range(80):
    waterfall_streaks.append({
        "x": random.uniform(42, 198),
        "speed": random.uniform(4.5, 7.5),
        "offset": random.uniform(0, 100),
        "length": random.randint(4, 12),
        "width": 1 if random.random() > 0.3 else 2
    })

frames = []
for f_idx in range(NUM_FRAMES):
    img = Image.new("RGB", (W, H), BG_NIGHT)
    pixels = img.load()
    state = trajectory[f_idx]
    
    # 1. Gorge Cliffs
    for y in range(H):
        # Left Cliff
        l_edge = 38 + int(math.sin(y * 0.06) * 6 - (y * 0.08) + math.sin(y * 0.2) * 2)
        for x in range(0, min(W, max(0, l_edge + 1))):
            d = l_edge - x
            if d < 3:
                pixels[x, y] = CLIFF_RIM
            elif d < 8:
                pixels[x, y] = CLIFF_LIGHT
            elif d < 18:
                pixels[x, y] = CLIFF_MID
            else:
                pixels[x, y] = CLIFF_DARK
                
        # Right Cliff
        r_edge = W - 38 + int(math.cos(y * 0.05) * 6 + (y * 0.06) - math.cos(y * 0.22) * 2)
        for x in range(max(0, r_edge), W):
            d = x - r_edge
            if d < 3:
                pixels[x, y] = CLIFF_RIM
            elif d < 8:
                pixels[x, y] = CLIFF_LIGHT
            elif d < 18:
                pixels[x, y] = CLIFF_MID
            else:
                pixels[x, y] = CLIFF_DARK

    # 2. Organic Waterfall Body (x: 40..200, y: 0..106)
    for y in range(0, 106):
        l_wall = 38 + int(math.sin(y * 0.06) * 6 - (y * 0.08) + math.sin(y * 0.2) * 2)
        r_wall = W - 38 + int(math.cos(y * 0.05) * 6 + (y * 0.06) - math.cos(y * 0.22) * 2)
        
        # Center curve of waterfall
        for x in range(l_wall + 1, r_wall):
            # Normalized X in waterfall
            nx = (x - l_wall) / max(1, (r_wall - l_wall))
            
            # Flow coordinate moving down with frame
            flow_y = y + f_idx * 5.5
            
            # Organic noise synthesis
            n1 = fbm(x * 0.06, flow_y * 0.04, octaves=3, seed=10)
            n2 = fbm(x * 0.12, flow_y * 0.08, octaves=2, seed=45)
            n = n1 * 0.7 + n2 * 0.3
            
            # Edge darkening vs central torrent
            center_boost = math.sin(nx * math.pi)
            intensity = n * 0.6 + center_boost * 0.4
            
            # Color mapping
            if intensity > 0.72:
                col = WHITE
            elif intensity > 0.58:
                col = WATER_CYAN
            elif intensity > 0.42:
                col = WATER_SURGE
            elif intensity > 0.26:
                col = WATER_BODY
            elif intensity > 0.12:
                col = WATER_DEEP
            else:
                col = WATER_ABYSS
                
            pixels[x, y] = col

    # Vertical Froth Streaks sliding down
    for st in waterfall_streaks:
        cur_y = (st["offset"] + f_idx * st["speed"]) % 106
        for dy in range(st["length"]):
            py = int(cur_y + dy)
            px = int(st["x"] + math.sin(py * 0.1) * 1.5)
            if 0 <= py < 104 and 38 < px < (W - 38):
                if dy == 0:
                    pixels[px, py] = WHITE
                elif dy < st["length"] * 0.6:
                    pixels[px, py] = WATER_MIST
                else:
                    pixels[px, py] = WATER_CYAN

    # 3. Plunge Pool (y: 104..134)
    for y in range(104, H):
        for x in range(W):
            depth_ratio = (y - 104) / 30.0
            base_col = WATER_ABYSS if depth_ratio > 0.55 else WATER_DEEP
            pixels[x, y] = base_col

    # Crashing Foam Billows at Waterfall Impact Zone (y: 98..112)
    for x in range(36, W - 36):
        foam_n = fbm(x * 0.08, f_idx * 0.8, octaves=2, seed=88)
        boil_h = int(foam_n * 8 + 3)
        top_y = 105 - boil_h
        for y in range(top_y, 114):
            if y >= H: continue
            d_from_top = y - top_y
            if d_from_top <= 2:
                pixels[x, y] = WHITE
            elif d_from_top <= 4:
                pixels[x, y] = WATER_MIST
            elif d_from_top <= 7:
                pixels[x, y] = WATER_CYAN
            else:
                pixels[x, y] = WATER_SURGE

    # Plunge Pool Organic Horizontal Wakes and Ripples
    for y in range(110, H, 2):
        row_t = y * 0.25 + f_idx * 0.4
        for x in range(W):
            rip_val = math.sin(x * 0.06 - row_t) * 0.5 + math.cos(x * 0.02 + y * 0.3) * 0.5
            rip_noise = fbm(x * 0.05, y * 0.2 + f_idx * 0.1, octaves=2, seed=120)
            combined_rip = rip_val * 0.6 + rip_noise * 0.4
            
            if combined_rip > 0.65:
                pixels[x, y] = WHITE if y < 116 else WATER_MIST
            elif combined_rip > 0.45:
                pixels[x, y] = WATER_CYAN
            elif combined_rip > 0.30:
                pixels[x, y] = WATER_SURGE
                
    # Organic Foam Patches Drifting in the Pool
    for p_seed in range(12):
        fx = int((p_seed * 23 + f_idx * 1.5) % (W - 30) + 15)
        fy = int(112 + (p_seed * 7) % 20 + math.sin(f_idx * 0.5 + p_seed) * 1.5)
        f_size = 2 + (p_seed % 4)
        for dx in range(-f_size, f_size + 1):
            for dy in range(-1, 2):
                px, py = fx + dx, fy + dy
                if 0 <= px < W and 106 <= py < H:
                    if abs(dx) + abs(dy)*2 <= f_size:
                        pixels[px, py] = WHITE if abs(dx) <= 1 else WATER_MIST

    # 4. Soft Volumetric God Rays (Gentle Sunlight Tint)
    ray_angles = [(45, 16, 0.15), (85, 22, 0.20), (130, 26, 0.22), (170, 20, 0.18), (200, 14, 0.12)]
    for ray_x, ray_w, max_int in ray_angles:
        for y in range(0, 114):
            t = y / 114.0
            rx = ray_x + t * 38.0 + math.sin(y * 0.04 + f_idx * 0.15) * 1.5
            hw = ray_w * 0.5 + t * 6.0
            for dx in range(-int(hw), int(hw) + 1):
                px = int(rx + dx)
                if 0 <= px < W:
                    falloff = 1.0 - (abs(dx) / max(1.0, hw))
                    alpha = max_int * falloff * (1.0 - t * 0.45)
                    if alpha > 0.02:
                        cr, cg, cb = pixels[px, y]
                        nr, ng, nb = SALMON_SUN
                        out_r = int(cr * (1.0 - alpha) + nr * alpha + 0.5)
                        out_g = int(cg * (1.0 - alpha) + ng * alpha + 0.5)
                        out_b = int(cb * (1.0 - alpha) + nb * alpha + 0.5)
                        pixels[px, y] = (out_r, out_g, out_b)

    # 5. The Hero Salmon
    sx, sy = state["x"], state["y"]
    rad = math.radians(state["angle"])
    cos_a = math.cos(rad)
    sin_a = math.sin(rad)
    flex = state["flex"]

    for u in range(-16, 17):
        norm_u = u / 16.0
        v_offset = flex * (norm_u ** 2) * 5.0
        
        if u < -12:
            half_h = (u + 16) * 1.0
        elif u <= 4:
            half_h = 4.5 + math.cos((u + 4) / 10.0 * (math.pi / 2.0)) * 1.5
        else:
            half_h = max(1.2, 5.0 - (u - 4) * 0.32)
            
        step_v = 0.6
        v = -half_h
        while v <= half_h:
            lx = u
            ly = v + v_offset
            wx = int(sx + lx * cos_a - ly * sin_a)
            wy = int(sy + lx * sin_a + ly * cos_a)
            
            if v < -half_h + 1.2:
                col = SALMON_SUN if state["hang"] else SALMON_DARK
            elif v < -1.0:
                col = SALMON_MID
            elif v <= 1.5:
                col = SALMON_AMBER
            elif v < half_h - 1.2:
                col = SALMON_GOLD
            else:
                col = SALMON_BELLY
                
            if state["hang"] and (u % 3 == 0) and (abs(v) < 2):
                col = SALMON_SUN
                
            if 0 <= wx < W and 0 <= wy < H:
                pixels[wx, wy] = col
            v += step_v

    # Eye & Glint
    eye_lx = -11
    eye_ly = -1.5 + flex * ((-11/16.0)**2) * 5.0
    eye_wx = int(sx + eye_lx * cos_a - eye_ly * sin_a)
    eye_wy = int(sy + eye_lx * sin_a + eye_ly * cos_a)
    if 0 <= eye_wx < W and 0 <= eye_wy < H:
        pixels[eye_wx, eye_wy] = SALMON_SHADOW
    if 0 <= (eye_wx - 1) < W and 0 <= eye_wy < H:
        pixels[eye_wx - 1, eye_wy] = WHITE

    # Dorsal Fin
    for du in range(-2, 7):
        fin_h = int(3.5 * math.sin((du + 2) / 8.0 * math.pi))
        for dv in range(1, fin_h + 1):
            flx = du
            fly = -(4.5 + math.cos((du + 4) / 10.0 * (math.pi / 2.0)) * 1.5) - dv + flex * ((du/16.0)**2) * 5.0
            fwx = int(sx + flx * cos_a - fly * sin_a)
            fwy = int(sy + flx * sin_a + fly * cos_a)
            if 0 <= fwx < W and 0 <= fwy < H:
                pixels[fwx, fwy] = SALMON_SUN if dv == fin_h else SALMON_DARK

    # Pectoral & Pelvic Fins
    pec_lx, pec_ly = -7, 3.5 + flex * ((-7/16.0)**2) * 5.0
    for p in range(6):
        pwx = int(sx + (pec_lx + p * 0.8) * cos_a - (pec_ly + p * 0.6) * sin_a)
        pwy = int(sy + (pec_lx + p * 0.8) * sin_a + (pec_ly + p * 0.6) * cos_a)
        if 0 <= pwx < W and 0 <= pwy < H:
            pixels[pwx, pwy] = SALMON_GOLD

    # Caudal Tail Fin
    tail_base_lx = 16
    tail_base_ly = flex * 5.0
    for tu in range(1, 10):
        span = int(tu * 1.4)
        for tv in range(-span, span + 1):
            tlx = tail_base_lx + tu
            tly = tail_base_ly + tv + (flex * tu * 0.8)
            twx = int(sx + tlx * cos_a - tly * sin_a)
            twy = int(sy + tlx * sin_a + tly * cos_a)
            is_border = (abs(tv) == span or tu == 9)
            tcol = SALMON_SUN if is_border else (SALMON_AMBER if (tu + tv) % 2 == 0 else SALMON_GOLD)
            if 0 <= twx < W and 0 <= twy < H:
                pixels[twx, twy] = tcol

    # 6. Splash particles & Entry/Exit Bursts
    if state["splash"] or f_idx in [2, 3, 12, 13]:
        splash_x = 175 if f_idx <= 4 else 55
        splash_y = 104
        for sp in range(28):
            angle = -math.pi * 0.15 - (sp / 28.0) * math.pi * 0.7
            dist = 5 + ((sp * 7) % 19) + (f_idx % 3) * 3
            spx = int(splash_x + math.cos(angle) * dist)
            spy = int(splash_y + math.sin(angle) * dist * 0.8)
            if 0 <= spx < W and 0 <= spy < H:
                pixels[spx, spy] = WHITE
                if spy + 1 < H: pixels[spx, spy + 1] = WATER_MIST
                if sp % 3 == 0 and spx + 1 < W: pixels[spx + 1, spy] = WATER_CYAN

    # Trailing droplets in air
    if not state["inWater"]:
        for d in range(1, 7):
            ddist = d * 6
            dpx = int(sx + cos_a * ddist + math.sin(d + f_idx) * 2)
            dpy = int(sy + sin_a * ddist + math.cos(d * 2) * 2 + (d ** 1.4) * 0.8)
            if 0 <= dpx < W and 0 <= dpy < H:
                pixels[dpx, dpy] = WHITE if d <= 2 else (WATER_MIST if d <= 4 else WATER_CYAN)

    frames.append(img)

# Save temporary frame sequence
os.makedirs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/temp_salmon_frames", exist_ok=True)
for idx, f in enumerate(frames):
    f.save(f"c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/temp_salmon_frames/frame_{idx:02d}.png")

print("Generated 16 frames successfully!")
