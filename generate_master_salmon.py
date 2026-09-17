import os
import math
import random
from PIL import Image

W, H = 240, 135
NUM_FRAMES = 16

# Master Palette
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

SALMON_COLORS = {SALMON_SHADOW, SALMON_DARK, SALMON_MID, SALMON_AMBER, SALMON_GOLD, SALMON_SUN, SALMON_BELLY}

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
    { "x": 48,  "y": 108, "angle": 80,  "flex": 0.5, "inWater": True, "splash": True, "hang": False },
    { "x": 46,  "y": 112, "angle": 80,  "flex": 0.6, "inWater": True, "splash": False, "hang": False },
]

# Vertical rushing currents
water_currents = [
    { "x": 50,  "w": 18, "speed": 4.5, "sway": 0.09, "phase": 0.0 },
    { "x": 68,  "w": 22, "speed": 5.8, "sway": 0.08, "phase": 1.5 },
    { "x": 90,  "w": 28, "speed": 6.8, "sway": 0.07, "phase": 3.0 },
    { "x": 118, "w": 34, "speed": 7.8, "sway": 0.06, "phase": 0.5 },
    { "x": 148, "w": 28, "speed": 6.6, "sway": 0.07, "phase": 4.2 },
    { "x": 172, "w": 22, "speed": 5.4, "sway": 0.08, "phase": 2.2 },
    { "x": 190, "w": 18, "speed": 4.2, "sway": 0.10, "phase": 5.0 },
]

random.seed(777)
threads = []
for i in range(140):
    threads.append({
        "x": random.uniform(42, 198),
        "speed": random.uniform(5.5, 9.5),
        "y_start": random.uniform(0, 105),
        "len": random.randint(5, 18),
        "bright": random.random() > 0.4
    })

mist = []
for i in range(45):
    mist.append({
        "x": random.uniform(40, 200),
        "speed_y": random.uniform(1.0, 2.5),
        "speed_x": random.uniform(-0.8, 0.8),
        "max_life": random.uniform(8, 20),
        "seed": random.uniform(0, 100)
    })

# High density water particles for takeoff & plunge
random.seed(1234)
takeoff_droplets = []
for i in range(60):
    ang = random.uniform(-math.pi * 0.85, -math.pi * 0.15)
    spd = random.uniform(15.0, 38.0)
    takeoff_droplets.append({
        "vx": math.cos(ang) * spd,
        "vy": math.sin(ang) * spd,
        "size": 2 if random.random() > 0.7 else 1,
        "shade": random.choice([WHITE, WHITE, WATER_MIST, WATER_CYAN])
    })

plunge_droplets = []
for i in range(85):
    ang = random.uniform(-math.pi * 0.90, -math.pi * 0.10)
    spd = random.uniform(18.0, 48.0)
    plunge_droplets.append({
        "vx": math.cos(ang) * spd,
        "vy": math.sin(ang) * spd,
        "size": 2 if random.random() > 0.65 else 1,
        "shade": random.choice([WHITE, WHITE, WATER_MIST, WATER_CYAN])
    })

frames = []
for f_idx in range(NUM_FRAMES):
    img = Image.new("RGB", (W, H), BG_NIGHT)
    pix = img.load()
    state = trajectory[f_idx]

    cliff_l = [0] * H
    cliff_r = [W - 1] * H
    for y in range(H):
        step = (y // 10) * 2
        j1 = math.sin(y * 0.14) * 2 + math.cos(y * 0.05) * 4
        cliff_l[y] = int(36 + step * 0.25 + j1)
        
        r_step = ((H - y) // 12) * 2
        rj1 = math.cos(y * 0.12) * 3 - math.sin(y * 0.06) * 3
        cliff_r[y] = int(W - 36 - r_step * 0.25 + rj1)

    # 1. RENDER CLIFFS
    for y in range(H):
        le = cliff_l[y]
        for x in range(0, min(W, le + 1)):
            d = le - x
            pix[x, y] = CLIFF_RIM if d <= 1 else (CLIFF_LIGHT if d <= 4 else (CLIFF_MID if d <= 12 else CLIFF_DARK))
            
        re = cliff_r[y]
        for x in range(max(0, re), W):
            d = x - re
            pix[x, y] = CLIFF_RIM if d <= 1 else (CLIFF_LIGHT if d <= 4 else (CLIFF_MID if d <= 12 else CLIFF_DARK))

    # 2. RENDER SOLID WATERFALL CURTAIN
    for y in range(0, 104):
        le = cliff_l[y]
        re = cliff_r[y]
        if le >= re: continue
        
        mid = (le + re) * 0.5
        span = (re - le) * 0.5
        
        for x in range(le + 1, re):
            norm_dist = abs(x - mid) / max(1.0, span)
            if norm_dist < 0.4:
                pix[x, y] = WATER_BODY
            elif norm_dist < 0.8:
                pix[x, y] = WATER_DEEP
            else:
                pix[x, y] = WATER_ABYSS

        for c in water_currents:
            flow_y = y + f_idx * c["speed"] + c["phase"] * 15
            cx = c["x"] + math.sin(flow_y * c["sway"]) * 3.0
            half_w = c["w"] * 0.5 + math.sin(flow_y * 0.08) * 2.0
            
            x_min = max(le + 1, int(cx - half_w))
            x_max = min(re - 1, int(cx + half_w))
            for x in range(x_min, x_max + 1):
                d_norm = abs(x - cx) / max(1.0, half_w)
                if d_norm < 0.35:
                    pix[x, y] = WATER_CYAN
                elif d_norm < 0.70:
                    pix[x, y] = WATER_SURGE
                else:
                    pix[x, y] = WATER_BODY

    for th in threads:
        cur_y = (th["y_start"] + f_idx * th["speed"]) % 106
        for dy in range(th["len"]):
            py = int(cur_y + dy)
            if 0 <= py < 103:
                le = cliff_l[py]
                re = cliff_r[py]
                px = int(th["x"] + math.sin((py + f_idx) * 0.1) * 1.0)
                if le < px < re:
                    if dy == 0 or dy == th["len"] - 1:
                        pix[px, py] = WATER_CYAN
                    elif dy == 1 or dy == th["len"] - 2:
                        pix[px, py] = WATER_MIST if th["bright"] else WATER_CYAN
                    else:
                        pix[px, py] = WHITE if th["bright"] else WATER_MIST

    # 3. PLUNGE POOL BASE
    for y in range(102, H):
        le = cliff_l[y]
        re = cliff_r[y]
        for x in range(le + 1, re):
            depth = (y - 102) / 32.0
            pix[x, y] = WATER_ABYSS if depth > 0.45 else WATER_DEEP

    # 4. ORGANIC FOAM SURGE BANK
    foam_top = [0] * W
    foam_bot = [0] * W
    for x in range(W):
        f1 = math.sin(x * 0.08 + f_idx * 0.9) * 3.5
        f2 = math.cos(x * 0.18 - f_idx * 0.6) * 2.2
        f3 = math.sin(x * 0.03 + 2.0) * 2.0
        foam_top[x] = int(101 - (f1 + f2 + f3))
        foam_bot[x] = int(107 + (f1 * 0.6) + math.cos(x * 0.12) * 2.0)

    for x in range(0, W):
        le = cliff_l[100]
        re = cliff_r[100]
        if x <= le or x >= re: continue
        
        t_y = foam_top[x]
        b_y = foam_bot[x]
        for y in range(t_y, b_y + 1):
            if 0 <= y < H:
                d = y - t_y
                if d <= 1:
                    pix[x, y] = WHITE
                elif d <= 3:
                    pix[x, y] = WATER_MIST
                elif d <= 5:
                    pix[x, y] = WATER_CYAN
                else:
                    pix[x, y] = WATER_SURGE

    for m in mist:
        life = (m["seed"] + f_idx * m["speed_y"] * 3.5) % m["max_life"]
        py = int(103 - life)
        px = int(m["x"] + math.sin(life * 0.3) * 2.5 + m["speed_x"] * life)
        if 0 <= px < W and 86 <= py < 105:
            if cliff_l[py] < px < cliff_r[py]:
                norm_l = life / m["max_life"]
                pcol = WHITE if norm_l < 0.25 else (WATER_MIST if norm_l < 0.65 else WATER_CYAN)
                pix[px, py] = pcol

    for y in range(106, H, 2):
        le = cliff_l[y]
        re = cliff_r[y]
        phase = y * 0.35 + f_idx * 0.5
        for x in range(le + 1, re):
            rip = math.sin((x - 120) * 0.07 - phase) * 0.6 + math.cos(x * 0.035 + y * 0.2) * 0.4
            if rip > 0.50:
                if y < 114:
                    pix[x, y] = WHITE if rip > 0.72 else WATER_MIST
                elif y < 122:
                    pix[x, y] = WATER_MIST if rip > 0.72 else WATER_CYAN
                else:
                    pix[x, y] = WATER_CYAN if rip > 0.68 else WATER_SURGE

    # 5. SOFT VOLUMETRIC GOD-RAYS
    rays = [(52, 16, 0.08), (92, 22, 0.13), (136, 26, 0.14), (174, 20, 0.10), (202, 14, 0.07)]
    for rx_orig, r_width, max_intensity in rays:
        for y in range(0, 114):
            t = y / 114.0
            rx = rx_orig + t * 38.0 + math.sin(y * 0.04 + f_idx * 0.12) * 1.0
            hw = r_width * 0.5 + t * 6.0
            for dx in range(-int(hw), int(hw) + 1):
                px = int(rx + dx)
                if 0 <= px < W:
                    falloff = 1.0 - (abs(dx) / max(1.0, hw))
                    alpha = max_intensity * falloff * (1.0 - t * 0.40)
                    if alpha > 0.015:
                        cr, cg, cb = pix[px, y]
                        nr, ng, nb = SALMON_SUN
                        out_r = int(cr * (1.0 - alpha) + nr * alpha + 0.5)
                        out_g = int(cg * (1.0 - alpha) + ng * alpha + 0.5)
                        out_b = int(cb * (1.0 - alpha) + nb * alpha + 0.5)
                        pix[px, y] = (out_r, out_g, out_b)

    # 6. RENDER THE HERO SALMON
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
                pix[wx, wy] = col
            v += step_v

    # Eye & Glint
    eye_lx = -11
    eye_ly = -1.5 + flex * ((-11/16.0)**2) * 5.0
    eye_wx = int(sx + eye_lx * cos_a - eye_ly * sin_a)
    eye_wy = int(sy + eye_lx * sin_a + eye_ly * cos_a)
    if 0 <= eye_wx < W and 0 <= eye_wy < H:
        pix[eye_wx, eye_wy] = SALMON_SHADOW
    if 0 <= (eye_wx - 1) < W and 0 <= eye_wy < H:
        pix[eye_wx - 1, eye_wy] = WHITE

    # Dorsal Fin
    for du in range(-2, 7):
        fin_h = int(3.5 * math.sin((du + 2) / 8.0 * math.pi))
        for dv in range(1, fin_h + 1):
            flx = du
            fly = -(4.5 + math.cos((du + 4) / 10.0 * (math.pi / 2.0)) * 1.5) - dv + flex * ((du/16.0)**2) * 5.0
            fwx = int(sx + flx * cos_a - fly * sin_a)
            fwy = int(sy + flx * sin_a + fly * cos_a)
            if 0 <= fwx < W and 0 <= fwy < H:
                pix[fwx, fwy] = SALMON_SUN if dv == fin_h else SALMON_DARK

    # Pectoral & Pelvic Fins
    pec_lx, pec_ly = -7, 3.5 + flex * ((-7/16.0)**2) * 5.0
    for p in range(6):
        pwx = int(sx + (pec_lx + p * 0.8) * cos_a - (pec_ly + p * 0.6) * sin_a)
        pwy = int(sy + (pec_lx + p * 0.8) * sin_a + (pec_ly + p * 0.6) * cos_a)
        if 0 <= pwx < W and 0 <= pwy < H:
            pix[pwx, pwy] = SALMON_GOLD

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
                pix[twx, twy] = tcol

    # Helper to draw water particle without overwriting the fish
    def draw_particle(px, py, shade, size=1):
        if 0 <= px < W and 0 <= py < H:
            if pix[px, py] not in SALMON_COLORS:
                pix[px, py] = shade
            if size > 1 and px + 1 < W:
                if pix[px + 1, py] not in SALMON_COLORS:
                    pix[px + 1, py] = shade

    # 7. WATER PARTICLES & EXPLOSIVE SPRAY (TAKEOFF & PLUNGE)
    # A. Takeoff Splash (Frames 0, 1, 2, 3, 4)
    if f_idx in [0, 1, 2, 3, 4]:
        t_stage = (f_idx + 0.8) / 4.5
        orig_x, orig_y = 182, 114
        
        # Takeoff water droplets shooting upward and arcing
        for p in takeoff_droplets:
            dt = t_stage * 0.95
            px = int(orig_x + p["vx"] * dt)
            py = int(orig_y + p["vy"] * dt + 0.5 * 34.0 * (dt ** 2))
            draw_particle(px, py, p["shade"], p["size"])

    # B. Plunge Splash (Frames 11, 12, 13, 14, 15)
    if f_idx in [11, 12, 13, 14, 15]:
        p_stage = (f_idx - 11 + 0.8) / 4.8
        plunge_x, plunge_y = 54, 102
        
        # High fountain of plunge droplets fanning out
        for p in plunge_droplets:
            dt = p_stage * 1.05
            px = int(plunge_x + p["vx"] * dt)
            py = int(plunge_y + p["vy"] * dt + 0.5 * 38.0 * (dt ** 2))
            draw_particle(px, py, p["shade"], p["size"])

    # C. Airborne trailing droplets
    if not state["inWater"]:
        for d in range(1, 16):
            ddist = d * 3.8
            dpx = int(sx + cos_a * ddist + math.sin(d * 1.6 + f_idx) * 2.2)
            dpy = int(sy + sin_a * ddist + math.cos(d * 2.1) * 1.8 + (d ** 1.25) * 0.45)
            dcol = WHITE if d <= 4 else (WATER_MIST if d <= 9 else WATER_CYAN)
            draw_particle(dpx, dpy, dcol, 1)

    frames.append(img)

# Save temporary frames
os.makedirs("c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/temp_salmon_frames", exist_ok=True)
for idx, f in enumerate(frames):
    f.save(f"c:/Users/Snow/.gemini/antigravity/scratch/UPROTA/temp_salmon_frames/frame_{idx:02d}.png")

print("Regenerated with crisp non-overlapping particle bursts!")
