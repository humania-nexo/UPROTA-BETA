import os
import math
import random
from PIL import Image

W, H = 240, 360
BASE_UPROTA = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA"
BASE_SAPIENSIA = "c:/Users/Snow/.gemini/antigravity/scratch/sapiensiaclan"
OUT_DIR = f"{BASE_UPROTA}/assets/sprites/portadas"
PREV_DIR = f"{BASE_UPROTA}/assets/sprites/previews"
os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(PREV_DIR, exist_ok=True)

def hex2rgb(hex_str):
    h = hex_str.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

# Shared Palettes
BG_NIGHT     = (6, 9, 18)
SKY_DEEP     = (11, 19, 36)
SKY_INDIGO   = (20, 34, 61)
SKY_TWILIGHT = (45, 30, 62)
SKY_AMBER    = (120, 53, 15)
GOLD_SUN     = (254, 240, 138)
GOLD_WARM    = (251, 191, 36)
AMBER_FIRE   = (245, 158, 11)
ORANGE_DEEP  = (217, 119, 6)
RED_RUST     = (185, 28, 28)
WHITE        = (255, 255, 255)

STONE_DARK   = (15, 23, 42)
STONE_MID    = (30, 41, 59)
STONE_LIGHT  = (51, 65, 85)
STONE_RIM    = (100, 116, 139)

WOOD_DARK    = (69, 26, 3)
WOOD_MID     = (120, 53, 15)
WOOD_LIGHT   = (180, 83, 9)

CYAN_GLOW    = (56, 189, 248)
CYAN_SOFT    = (186, 230, 253)
GREEN_LEAF   = (101, 163, 13)
PURPLE_SOUL  = (147, 51, 234)

# -------------------------------------------------------------
# HELPER: DRAW PIXEL ART TYPOGRAPHY (UPROTA & SUBTITLES)
# -------------------------------------------------------------
def draw_uprota_header(img, title_y=28):
    pix = img.load()
    letters = {
        'U': ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
        'P': ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
        'R': ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
        'O': ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
        'T': ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
        'A': ["01110", "10001", "10001", "11111", "10001", "10001", "10001"]
    }
    
    scale = 3
    spacing = 5 * scale + 4
    total_w = 6 * spacing - 4
    start_x = (W - total_w) // 2
    
    word = "UPROTA"
    for l_idx, ch in enumerate(word):
        grid = letters[ch]
        lx = start_x + l_idx * spacing
        for gy, row in enumerate(grid):
            for gx, bit in enumerate(row):
                if bit == '1':
                    for sy in range(scale):
                        for sx in range(scale):
                            px = lx + gx * scale + sx
                            py = title_y + gy * scale + sy
                            if 0 <= px < W and 0 <= py < H:
                                pix[px, py + 2] = (10, 10, 15, 255)
                                col = WHITE if gy == 0 else (GOLD_WARM if gy < 4 else AMBER_FIRE)
                                pix[px, py] = col + (255,)

# =============================================================
# OPCIÓN 1: EL REFUGIO EN LA NOCHE DEL YERMO (Atmósfera & Calidez)
# =============================================================
def make_option_1():
    img = Image.new('RGBA', (W, H), BG_NIGHT + (255,))
    pix = img.load()
    
    # Sky gradient
    for y in range(230):
        t = y / 230.0
        r = int(SKY_DEEP[0] * (1-t) + SKY_INDIGO[0] * t)
        g = int(SKY_DEEP[1] * (1-t) + SKY_INDIGO[1] * t)
        b = int(SKY_DEEP[2] * (1-t) + SKY_INDIGO[2] * t)
        
        # Aurora band
        aurora = math.sin(y * 0.04 + 1.0) * math.cos(y * 0.015)
        if 45 <= y <= 135 and aurora > 0.25:
            f = (aurora - 0.25) * 0.4
            r = int(r * (1-f) + 12 * f)
            g = int(g * (1-f) + 140 * f)
            b = int(b * (1-f) + 175 * f)
            
        for x in range(W):
            pix[x, y] = (r, g, b, 255)
            
    # Stars & Constellations
    random.seed(1337)
    for _ in range(85):
        sx = random.randint(4, W - 5)
        sy = random.randint(6, 175)
        bright = random.random()
        col = WHITE if bright > 0.85 else (CYAN_SOFT if bright > 0.5 else (110, 140, 180))
        pix[sx, sy] = col + (255,)
        if bright > 0.96: # Twinkle
            for ddx, ddy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                if 0 <= sx+ddx < W and 0 <= sy+ddy < H:
                    pix[sx+ddx, sy+ddy] = (160, 200, 240, 140)
                    
    # Crescent Moon with golden glow
    moon_cx, moon_cy = 196, 72
    for dy in range(-12, 13):
        for dx in range(-12, 13):
            d2 = dx*dx + dy*dy
            if d2 <= 144:
                alpha = max(0, 1.0 - math.sqrt(d2)/12.0) * 0.25
                px, py = moon_cx + dx, moon_cy + dy
                cr, cg, cb, _ = pix[px, py]
                pix[px, py] = (int(cr + GOLD_WARM[0]*alpha), int(cg + GOLD_WARM[1]*alpha), int(cb + GOLD_WARM[2]*alpha), 255)
            if d2 <= 81:
                if (dx - 4)**2 + (dy - 2)**2 > 60:
                    pix[moon_cx + dx, moon_cy + dy] = GOLD_WARM + (255,)
                    if d2 <= 49:
                        pix[moon_cx + dx, moon_cy + dy] = WHITE + (255,)

    # Distant mountains in silhouette
    for y in range(155, 235):
        for x in range(W):
            m1 = math.sin(x * 0.025 + 0.5) * 22 + math.cos(x * 0.06) * 10
            m_top = 180 - int(m1)
            if y >= m_top:
                d = y - m_top
                c = (16, 24, 42) if d < 6 else (9, 14, 26)
                pix[x, y] = c + (255,)

    # Ground terrace curve: Flat campsite plateau from x=82 to x=194
    def get_ground_y(x):
        if 82 <= x <= 194:
            return 248
        elif x < 82:
            t = (82 - x) / 82.0
            return int(248 + math.sin(t * 2.5) * 14 + t * 6)
        else:
            t = (x - 194) / 46.0
            return int(248 + math.sin(t * 2.6) * 16 - t * 3)

    for y in range(215, H):
        for x in range(W):
            gy = get_ground_y(x)
            if y >= gy:
                d = y - gy
                if d <= 1: c = STONE_RIM
                elif d <= 5: c = STONE_LIGHT
                elif d <= 16: c = STONE_MID
                else: c = STONE_DARK
                pix[x, y] = c + (255,)

    # CABIN (WOODEN WALLS & ROOF)
    cab_x1, cab_x2 = 94, 166
    cab_y_base = 248
    cab_y_wall_top = 210
    
    # 1. Wooden Wall Planks
    for y in range(cab_y_wall_top, cab_y_base):
        plank_idx = (y - cab_y_wall_top) // 5
        is_seam = ((y - cab_y_wall_top) % 5 == 0)
        for x in range(cab_x1, cab_x2 + 1):
            grain = (math.sin(x * 0.4 + plank_idx * 2.1) * 2 + math.cos(y * 0.8) * 1.5)
            if x <= cab_x1 + 3 or x >= cab_x2 - 3:
                c = WOOD_DARK if is_seam else (45, 18, 5)
            elif is_seam:
                c = (45, 18, 5)
            elif grain > 1.2:
                c = WOOD_LIGHT
            elif grain > -0.5:
                c = WOOD_MID
            else:
                c = WOOD_DARK
            pix[x, y] = c + (255,)

    # 2. Overhanging Wooden Shingle Roof
    roof_peak_x, roof_peak_y = 130, 168
    for y in range(roof_peak_y, cab_y_wall_top + 4):
        t = (y - roof_peak_y) / float(cab_y_wall_top + 4 - roof_peak_y)
        w = int(t * 42) + 2
        shingle_seam = (y % 4 == 0)
        for dx in range(-w, w + 1):
            px = roof_peak_x + dx
            if 0 <= px < W:
                if shingle_seam:
                    c = (45, 18, 5)
                elif dx < 0:
                    c = (195, 90, 15) if (y % 4 == 1) else WOOD_LIGHT
                elif dx <= 4:
                    c = WOOD_MID
                else:
                    c = WOOD_DARK
                pix[px, y] = c + (255,)
    for x in range(cab_x1 - 4, cab_x2 + 5):
        if 0 <= x < W:
            pix[x, cab_y_wall_top + 3] = (45, 18, 5, 255)

    # 3. Window with warm amber glow
    win_x1, win_x2 = 104, 124
    win_y1, win_y2 = 219, 239
    for y in range(win_y1, win_y2 + 1):
        for x in range(win_x1, win_x2 + 1):
            is_frame = (x == win_x1 or x == win_x2 or y == win_y1 or y == win_y2 or x == (win_x1+win_x2)//2 or y == (win_y1+win_y2)//2)
            if is_frame:
                pix[x, y] = (45, 18, 5, 255)
            else:
                dx = x - (win_x1+win_x2)//2
                dy = y - (win_y1+win_y2)//2
                col = WHITE if (abs(dx) <= 2 and abs(dy) <= 2) else (GOLD_SUN if abs(dx)+abs(dy) <= 5 else GOLD_WARM)
                pix[x, y] = col + (255,)

    # 4. Wooden Door
    door_x1, door_x2 = 138, 156
    door_y1, door_y2 = 221, cab_y_base
    for y in range(door_y1, door_y2):
        for x in range(door_x1, door_x2 + 1):
            is_door_frame = (x == door_x1 or x == door_x2 or y == door_y1)
            if is_door_frame:
                pix[x, y] = (45, 18, 5, 255)
            else:
                plank = (x - door_x1) % 5 == 0
                pix[x, y] = ((45, 18, 5) if plank else (WOOD_MID if y > door_y1 + 10 else WOOD_DARK)) + (255,)
    pix[141, 236] = GOLD_WARM + (255,)
    pix[141, 237] = AMBER_FIRE + (255,)

    # 5. Window light spill onto ground
    for y in range(cab_y_base - 3, cab_y_base + 32):
        for x in range(80, 160):
            d = math.sqrt((x - 114)**2 + (y - 235)**2)
            if d < 40 and y >= get_ground_y(x):
                alpha = (40 - d) / 40.0 * 0.5
                cr, cg, cb, _ = pix[x, y]
                pix[x, y] = (int(cr + GOLD_WARM[0]*alpha), int(cg + GOLD_WARM[1]*alpha), int(cb + GOLD_WARM[2]*alpha), 255)

    # 6. Antenna Mast & Radio Waves (104.5 MHz)
    ant_x, ant_y_top, ant_y_bottom = 100, 138, 195
    for y in range(ant_y_top, ant_y_bottom):
        pix[ant_x, y] = STONE_RIM + (255,)
    for y_bar in [148, 162]:
        for dx in range(-3, 4):
            pix[ant_x + dx, y_bar] = STONE_RIM + (255,)
    pix[ant_x, ant_y_top] = CYAN_SOFT + (255,)
    for r in [9, 18, 27]:
        for ang in range(-65, 66, 12):
            rad = math.radians(ang - 90)
            wx = int(ant_x + math.cos(rad) * r)
            wy = int(ant_y_top + math.sin(rad) * r)
            if 0 <= wx < W and 0 <= wy < H:
                pix[wx, wy] = CYAN_GLOW + (190,)

    # -------------------------------------------------------------
    # EXPEDITION BICYCLE (PERFECTLY GROUNDED & CONTACT SHADOWED)
    # -------------------------------------------------------------
    bike_rw_cx = 173
    bike_fw_cx = 191
    bike_r = 5
    bike_rw_cy = get_ground_y(bike_rw_cx) - bike_r
    bike_fw_cy = get_ground_y(bike_fw_cx) - bike_r
    
    for dx in range(-3, 4):
        pix[bike_rw_cx + dx, 248] = (10, 15, 25, 255)
        pix[bike_fw_cx + dx, 248] = (10, 15, 25, 255)

    for cx, cy in [(bike_rw_cx, bike_rw_cy), (bike_fw_cx, bike_fw_cy)]:
        for dy in range(-5, 6):
            for dx in range(-5, 6):
                d2 = dx*dx + dy*dy
                if 16 <= d2 <= 25:
                    pix[cx + dx, cy + dy] = (20, 25, 35, 255)
                elif d2 <= 4:
                    pix[cx + dx, cy + dy] = STONE_RIM + (255,)
        for i in range(-4, 5):
            pix[cx + i, cy] = STONE_LIGHT + (220,)
            pix[cx, cy + i] = STONE_LIGHT + (220,)

    bb_x, bb_y = 180, 243
    seat_x, seat_y = 177, 231
    head_x, head_y = 188, 228
    
    for i in range(bb_x - bike_rw_cx + 1):
        pix[bike_rw_cx + i, bike_rw_cy] = AMBER_FIRE + (255,)
    for i in range(seat_x - bike_rw_cx + 1):
        t = i / float(seat_x - bike_rw_cx)
        pix[bike_rw_cx + i, int(bike_rw_cy * (1-t) + seat_y * t)] = AMBER_FIRE + (255,)
    for i in range(bb_y - seat_y + 1):
        t = i / float(bb_y - seat_y)
        pix[int(bb_x * (1-t) + seat_x * t), bb_y - i] = AMBER_FIRE + (255,)
    for i in range(head_x - bb_x + 1):
        t = i / float(head_x - bb_x)
        pix[bb_x + i, int(bb_y * (1-t) + head_y * t)] = AMBER_FIRE + (255,)
    for i in range(head_x - seat_x + 1):
        t = i / float(head_x - seat_x)
        pix[seat_x + i, int(seat_y * (1-t) + head_y * t)] = AMBER_FIRE + (255,)
    for i in range(bike_fw_cx - head_x + 1):
        t = i / float(bike_fw_cx - head_x)
        pix[head_x + i, int(head_y * (1-t) + bike_fw_cy * t)] = AMBER_FIRE + (255,)

    pix[seat_x - 2, seat_y - 2] = (45, 18, 5, 255)
    pix[seat_x - 1, seat_y - 2] = (45, 18, 5, 255)
    pix[seat_x, seat_y - 2] = WOOD_DARK + (255,)
    pix[seat_x + 1, seat_y - 2] = WOOD_DARK + (255,)
    pix[seat_x, seat_y - 1] = STONE_RIM + (255,)

    pix[head_x, head_y - 2] = STONE_RIM + (255,)
    pix[head_x - 1, head_y - 3] = STONE_LIGHT + (255,)
    pix[head_x, head_y - 3] = STONE_LIGHT + (255,)
    pix[head_x + 1, head_y - 3] = STONE_LIGHT + (255,)
    pix[head_x + 2, head_y - 1] = GOLD_WARM + (255,)
    
    for py in range(232, 241):
        for px in range(168, 175):
            pix[px, py] = (WOOD_DARK if px == 168 or py == 240 else WOOD_MID) + (255,)
    pix[171, 235] = GOLD_WARM + (255,)


    # -------------------------------------------------------------
    # REAL ORGANIC CAMPFIRE (FOGATA CON PIEDRAS, LEÑOS Y LLAMA VIVA)
    # -------------------------------------------------------------
    fire_cx = 58
    fire_ground_y = get_ground_y(fire_cx)
    
    for y in range(fire_ground_y - 15, fire_ground_y + 25):
        for x in range(fire_cx - 35, fire_cx + 35):
            d = math.sqrt((x - fire_cx)**2 + (y - (fire_ground_y - 4))**2)
            if d < 32 and y >= get_ground_y(x) and 0 <= x < W and 0 <= y < H:
                alpha = (32 - d) / 32.0 * 0.55
                cr, cg, cb, _ = pix[x, y]
                pix[x, y] = (int(cr + AMBER_FIRE[0]*alpha), int(cg + AMBER_FIRE[1]*alpha), int(cb + AMBER_FIRE[2]*alpha), 255)

    stone_offsets = [(-9, 0), (-7, 2), (-4, 3), (0, 4), (4, 3), (7, 2), (9, 0), (-6, -1), (6, -1)]
    for sox, soy in stone_offsets:
        sx = fire_cx + sox
        sy = fire_ground_y + soy
        for ddy in range(-1, 2):
            for ddx in range(-1, 2):
                if 0 <= sx+ddx < W and 0 <= sy+ddy < H:
                    pix[sx+ddx, sy+ddy] = STONE_MID + (255,)
        pix[sx, sy] = STONE_RIM + (255,)

    for i in range(-5, 6):
        pix[fire_cx + i, fire_ground_y + 1 - abs(i)//3] = (45, 18, 5, 255)
        pix[fire_cx + i, fire_ground_y + 2] = RED_RUST + (255,)
    for i in range(-4, 5):
        pix[fire_cx + i, fire_ground_y - i//2] = WOOD_DARK + (255,)
    for i in range(-4, 5):
        pix[fire_cx + i, fire_ground_y + i//2] = (45, 18, 5, 255)

    flame_rows_outer = [
        (-1, 0, 0), (-1, 1, 0), (-2, 1, 0), (-2, 2, -1), (-3, 2, -1),
        (-3, 3, 0), (-4, 3, 1), (-4, 4, 0), (-5, 4, -1), (-5, 5, 0),
        (-6, 5, 0), (-6, 6, 0), (-5, 5, 0), (-4, 4, 0), (-3, 3, 0)
    ]
    for idx, (x_min, x_max, shift) in enumerate(flame_rows_outer):
        fy = fire_ground_y - 1 - (len(flame_rows_outer) - 1 - idx)
        for fx in range(fire_cx + x_min + shift, fire_cx + x_max + shift + 1):
            if 0 <= fx < W and 0 <= fy < H:
                pix[fx, fy] = (220, 38, 38, 255)

    flame_rows_mid = [
        (0, 0, 0), (-1, 1, -1), (-2, 1, 0), (-2, 2, 0), (-3, 2, 0),
        (-3, 3, 0), (-4, 3, 0), (-4, 4, 0), (-4, 3, 0), (-3, 3, 0), (-2, 2, 0)
    ]
    for idx, (x_min, x_max, shift) in enumerate(flame_rows_mid):
        fy = fire_ground_y - 1 - (len(flame_rows_mid) - 1 - idx)
        for fx in range(fire_cx + x_min + shift, fire_cx + x_max + shift + 1):
            if 0 <= fx < W and 0 <= fy < H:
                pix[fx, fy] = AMBER_FIRE + (255,)

    flame_rows_core = [
        (0, 0, 0), (-1, 0, 0), (-1, 1, 0), (-2, 1, 0), (-2, 1, 0), (-1, 1, 0), (-1, 0, 0)
    ]
    for idx, (x_min, x_max, shift) in enumerate(flame_rows_core):
        fy = fire_ground_y - 1 - (len(flame_rows_core) - 1 - idx)
        for fx in range(fire_cx + x_min + shift, fire_cx + x_max + shift + 1):
            if 0 <= fx < W and 0 <= fy < H:
                c = WHITE if (fy >= fire_ground_y - 4 and abs(fx - fire_cx) <= 1) else GOLD_SUN
                pix[fx, fy] = c + (255,)

    random.seed(77)
    for _ in range(16):
        ex = fire_cx + random.randint(-8, 6) + int(math.sin(_ * 1.3) * 4)
        ey = fire_ground_y - 16 - random.randint(2, 26)
        col = GOLD_WARM if random.random() > 0.4 else AMBER_FIRE
        if 0 <= ex < W and 0 <= ey < H:
            pix[ex, ey] = col + (255,)

    bench_x1, bench_x2 = 32, 44
    bench_y = fire_ground_y + 2
    for x in range(bench_x1, bench_x2 + 1):
        pix[x, bench_y] = WOOD_LIGHT + (255,)
        pix[x, bench_y + 1] = WOOD_DARK + (255,)
    for bx in [bench_x1 + 1, bench_x2 - 1]:
        pix[bx, bench_y + 2] = (45, 18, 5, 255)
        pix[bx, bench_y + 3] = (45, 18, 5, 255)

    draw_uprota_header(img, title_y=28)
    return img


# =============================================================
# OPCIÓN 2: LA MESA DEL NÁUFRAGO (Bodegón de Disciplina & Hábitos)
# =============================================================
def make_option_2():
    img = Image.new("RGBA", (W, H), BG_NIGHT + (255,))
    pix = img.load()
    
    for y in range(H):
        for x in range(W):
            d = math.sqrt((x - 120)**2 + (y - 170)**2)
            alpha = max(0.0, 1.0 - d / 190.0)
            r = int(BG_NIGHT[0] * (1 - alpha) + 48 * alpha)
            g = int(BG_NIGHT[1] * (1 - alpha) + 32 * alpha)
            b = int(BG_NIGHT[2] * (1 - alpha) + 16 * alpha)
            pix[x, y] = (r, g, b, 255)

    for y in range(130, H):
        for x in range(W):
            is_seam = (x in [45, 95, 145, 195] or y % 32 == 0)
            grain = (math.sin(x * 0.2 + y * 0.05) * 10)
            c = WOOD_DARK if is_seam else (WOOD_MID if grain > 3 else WOOD_LIGHT)
            shade = 0.5 + 0.5 * (1.0 - (abs(x - 120)/140.0))
            pix[x, y] = (int(c[0]*shade), int(c[1]*shade), int(c[2]*shade), 255)

    for y in range(165, 285):
        for x in range(70, 171):
            is_border = (x == 70 or x == 170 or y == 165 or y == 284 or x == 120)
            c = WOOD_DARK if is_border else (hex2rgb("fef3c7") if (x < 120) else hex2rgb("fde68a"))
            pix[x, y] = c + (255,)
            
    for row in range(5):
        ry = 180 + row * 18
        for x in range(76, 114):
            pix[x, ry] = hex2rgb("cbd5e1") + (255,)
        pix[78, ry - 6] = hex2rgb("475569") + (255,); pix[82, ry - 6] = hex2rgb("475569") + (255,)
        pix[80, ry - 5] = GREEN_LEAF + (255,); pix[81, ry - 6] = GREEN_LEAF + (255,)
        for dx in range(10, 32, 2):
            pix[76 + dx, ry - 5] = hex2rgb("334155") + (255,)

    for dy in range(-15, 16):
        for dx in range(-15, 16):
            if abs(dx*dx + dy*dy - 160) < 16:
                pix[145 + dx, 225 + dy] = hex2rgb("d97706") + (255,)
    for wx in range(134, 157):
        wy = int(225 - math.sin((wx - 134)/23.0 * math.pi) * 6)
        pix[wx, wy] = hex2rgb("b45309") + (255,)

    for y in range(205, 240):
        for x in range(34, 56):
            is_m_border = (x == 34 or x == 55 or y == 239)
            c = STONE_RIM if is_m_border else (STONE_LIGHT if x <= 44 else STONE_MID)
            pix[x, y] = c + (255,)
    for y in range(212, 232):
        pix[30, y] = STONE_RIM + (255,); pix[31, y] = STONE_LIGHT + (255,)
    for sy in range(180, 205):
        sx = int(45 + math.sin(sy * 0.3) * 3)
        pix[sx, sy] = WHITE + (180,)
        pix[sx + 1, sy] = CYAN_SOFT + (150,)

    for y in range(165, 225):
        for x in range(178, 224):
            is_r_edge = (x == 178 or x == 223 or y == 165 or y == 224)
            pix[x, y] = (WOOD_DARK if is_r_edge else WOOD_MID) + (255,)
    for y in range(172, 192):
        for x in range(184, 218):
            pix[x, y] = hex2rgb("fef08a") + (255,)
    pix[201, 172] = RED_RUST + (255,); pix[201, 191] = RED_RUST + (255,)
    for row in range(3):
        for x in range(186, 216, 3):
            pix[x, 200 + row * 6] = hex2rgb("0f172a") + (255,)

    for y in range(275, 310):
        for x in range(190, 212):
            is_c_b = (x == 190 or x == 211 or y == 309)
            pix[x, y] = (STONE_RIM if is_c_b else STONE_LIGHT) + (255,)
    for ly in range(250, 276):
        pix[201, ly] = GREEN_LEAF + (255,)
    for lx, ly in [(196, 260), (195, 259), (197, 261), (206, 258), (207, 257), (205, 259)]:
        pix[lx, ly] = GREEN_LEAF + (255,)
    pix[201, 249] = hex2rgb("bef264") + (255,)

    for dy in range(-12, 13):
        for dx in range(-12, 13):
            if dx*dx + dy*dy <= 144:
                is_f = (dx*dx + dy*dy >= 100)
                pix[50 + dx, 290 + dy] = (GOLD_WARM if is_f else hex2rgb("fef3c7")) + (255,)
    pix[50, 290] = RED_RUST + (255,)

    draw_uprota_header(img, title_y=28)
    return img

# =============================================================
# OPCIÓN 3: EL SALMÓN & LA LUNA SOBRE EL YERMO (Simbolismo & Silueta)
# =============================================================
def make_option_3():
    img = Image.new("RGBA", (W, H), BG_NIGHT + (255,))
    pix = img.load()
    
    for y in range(250):
        t = y / 250.0
        r = int(BG_NIGHT[0] * (1-t) + 15 * t)
        g = int(BG_NIGHT[1] * (1-t) + 25 * t)
        b = int(BG_NIGHT[2] * (1-t) + 50 * t)
        for x in range(W): pix[x, y] = (r, g, b, 255)
        
    random.seed(303)
    for _ in range(80):
        pix[random.randint(4, W-5), random.randint(6, 210)] = CYAN_SOFT + (190,)

    for dy in range(-65, 66):
        for dx in range(-65, 66):
            d = math.sqrt(dx*dx + dy*dy)
            if d <= 65:
                norm = d / 65.0
                if norm < 0.35: c = WHITE
                elif norm < 0.70: c = GOLD_SUN
                elif norm < 0.90: c = GOLD_WARM
                else: c = AMBER_FIRE
                if ((dx + 15)**2 + (dy - 10)**2 < 180) or ((dx - 25)**2 + (dy + 18)**2 < 120):
                    c = (int(c[0]*0.9), int(c[1]*0.85), int(c[2]*0.7))
                pix[120 + dx, 170 + dy] = c + (255,)

    for y in range(240, H):
        for x in range(W):
            wave = math.sin(x * 0.05) * 12 + math.cos(x * 0.02) * 6
            top = 265 - int(wave)
            if y >= top:
                d = y - top
                if d <= 1: c = WHITE
                elif d <= 4: c = CYAN_GLOW
                elif d <= 15: c = (2, 106, 162)
                else: c = (7, 43, 74)
                pix[x, y] = c + (255,)

    sx, sy = 120, 155
    cos_a = math.cos(math.radians(-32))
    sin_a = math.sin(math.radians(-32))
    
    for u in range(-32, 33):
        norm_u = u / 32.0
        v_offset = 0.5 * (norm_u**2) * 10.0
        half_h = max(2.0, 9.0 * math.cos(norm_u * math.pi * 0.5))
        
        v = -half_h
        while v <= half_h:
            lx = u
            ly = v + v_offset
            wx = int(sx + lx * cos_a - ly * sin_a)
            wy = int(sy + lx * sin_a + ly * cos_a)
            
            if v < -half_h + 2.5: c = hex2rgb("78350f")
            elif v < -2: c = AMBER_FIRE
            elif v <= 3: c = GOLD_WARM
            else: c = hex2rgb("fed7aa")
            
            if 0 <= wx < W and 0 <= wy < H:
                pix[wx, wy] = c + (255,)
            v += 0.8
            
    pix[int(sx - 22 * cos_a), int(sy - 22 * sin_a)] = hex2rgb("3d1302") + (255,)
    pix[int(sx - 24 * cos_a), int(sy - 22 * sin_a)] = WHITE + (255,)

    for sp in range(40):
        angle = -math.pi * 0.15 - (sp / 40.0) * math.pi * 0.7
        dist = random.randint(15, 55)
        dpx = int(165 + math.cos(angle) * dist)
        dpy = int(230 + math.sin(angle) * dist * 0.7)
        if 0 <= dpx < W and 0 <= dpy < H:
            pix[dpx, dpy] = WHITE + (255,)
            if dpx + 1 < W: pix[dpx + 1, dpy] = CYAN_SOFT + (200,)

    draw_uprota_header(img, title_y=28)
    return img

# =============================================================
# OPCIÓN 4: LOS 4 PILARES DEL SANTUARIO (El Cuadrante de la Fortaleza)
# =============================================================
def make_option_4():
    img = Image.new("RGBA", (W, H), BG_NIGHT + (255,))
    pix = img.load()
    
    for y in range(230):
        t = y / 230.0
        r = int(SKY_TWILIGHT[0] * (1-t) + SKY_AMBER[0] * t)
        g = int(SKY_TWILIGHT[1] * (1-t) + SKY_AMBER[1] * t)
        b = int(SKY_TWILIGHT[2] * (1-t) + 20 * t)
        for x in range(W): pix[x, y] = (r, g, b, 255)
        
    for y in range(160, 230):
        for x in range(W):
            c_top = 180 + math.sin(x * 0.04) * 12
            if y >= c_top:
                pix[x, y] = (25, 18, 35, 255)

    for y in range(200, H):
        for x in range(W):
            d = math.sqrt(((x - 120)*1.1)**2 + ((y - 320)*2.4)**2)
            if d < 180:
                tier = int(d // 25)
                c = STONE_RIM if d % 25 < 2 else (STONE_LIGHT if tier % 2 == 0 else STONE_MID)
                pix[x, y] = c + (255,)

    pillars = [
        (55, 185, RED_RUST, hex2rgb("f87171"), "CUERPO"),
        (185, 185, (37, 99, 235), CYAN_GLOW, "MENTE"),
        (40, 260, PURPLE_SOUL, hex2rgb("c084fc"), "ESPIRITU"),
        (200, 260, GREEN_LEAF, hex2rgb("bef264"), "TALLER")
    ]
    
    for px, py, base_col, glow_col, label in pillars:
        for y in range(py, py + 42):
            for x in range(px - 10, px + 11):
                is_b = (abs(x - px) == 10 or y == py or y == py + 41)
                pix[x, y] = (STONE_RIM if is_b else (STONE_LIGHT if x <= px else STONE_MID)) + (255,)
        for dy in range(-8, 9):
            for dx in range(-8, 9):
                if dx*dx + dy*dy <= 48:
                    pix[px + dx, py - 6 + dy] = glow_col + (255,)
                    if dx*dx + dy*dy <= 16: pix[px + dx, py - 6 + dy] = WHITE + (255,)

    for dy in range(-18, 19):
        for dx in range(-18, 19):
            if dx*dx + dy*dy <= 324:
                is_rim = (dx*dx + dy*dy >= 250)
                pix[120 + dx, 250 + dy] = (GOLD_WARM if is_rim else STONE_DARK) + (255,)
    for fy in range(232, 252):
        fw = max(1, int((252 - fy) * 0.5))
        for fdx in range(-fw, fw + 1):
            pix[120 + fdx, fy] = (WHITE if fdx == 0 else GOLD_WARM) + (255,)

    draw_uprota_header(img, title_y=28)
    return img

# =============================================================
# OPCIÓN 5: EL AMANECER DEL SUPERVIVIENTE (Rumbo a la Cumbre)
# =============================================================
def make_option_5():
    img = Image.new("RGBA", (W, H), BG_NIGHT + (255,))
    pix = img.load()
    
    for y in range(240):
        t = y / 240.0
        r = int(24 * (1-t) + 245 * t)
        g = int(32 * (1-t) + 158 * t)
        b = int(68 * (1-t) + 36 * t)
        for x in range(W): pix[x, y] = (r, g, b, 255)
        
    for dy in range(-30, 31):
        for dx in range(-30, 31):
            d = math.sqrt(dx*dx + dy*dy)
            if d <= 30:
                pix[170 + dx, 190 + dy] = (WHITE if d < 12 else GOLD_WARM) + (255,)

    for y in range(195, 300):
        for x in range(W):
            v_h = 220 + math.sin(x * 0.03) * 8
            if y >= v_h:
                pix[x, y] = (30, 45, 25, 255)
    for cx, cy in [(140, 230), (165, 238), (185, 232)]:
        for dy in range(6):
            for dx in range(8):
                pix[cx + dx, cy + dy] = STONE_LIGHT + (255,)
        for sy in range(cy - 14, cy):
            pix[cx + 2 + int(math.sin(sy*0.4)*2), sy] = WHITE + (170,)

    for y in range(220, H):
        for x in range(W):
            c_edge = 135 - (y - 220) * 0.45 + math.sin(y * 0.1) * 4
            if x <= c_edge:
                d = c_edge - x
                pix[x, y] = (STONE_RIM if d <= 2 else (STONE_LIGHT if d <= 8 else STONE_DARK)) + (255,)

    for y in range(200, 206):
        for x in range(73, 79): pix[x, y] = (10, 15, 25, 255)
    pix[71, 203] = (10, 15, 25, 255); pix[80, 203] = (10, 15, 25, 255)
    for y in range(206, 222):
        w = 3 + (y - 206) // 3
        for dx in range(-w, w + 1): pix[75 + dx, y] = (10, 15, 25, 255)
    for y in range(208, 218):
        for x in range(67, 72): pix[x, y] = (15, 20, 30, 255)
    for y in range(194, 232): pix[85, y] = (120, 53, 15, 255)
    pix[85, 193] = GOLD_WARM + (255,)
    for y in range(222, 233):
        pix[73, y] = (10, 15, 25, 255); pix[78, y] = (10, 15, 25, 255)

    draw_uprota_header(img, title_y=28)
    return img

options = [
    ("portada_uprota_opcion_1_refugio_noche", make_option_1),
    ("portada_uprota_opcion_2_mesa_naufrago", make_option_2),
    ("portada_uprota_opcion_3_salmon_luna", make_option_3),
    ("portada_uprota_opcion_4_cuatro_pilares", make_option_4),
    ("portada_uprota_opcion_5_amanecer_cumbre", make_option_5),
]

for name, fn in options:
    img = fn()
    png_path = f"{OUT_DIR}/{name}.png"
    img.save(png_path)
    
    img4x = img.resize((W * 4, H * 4), Image.Resampling.NEAREST)
    img4x.save(f"{PREV_DIR}/preview_{name}_4x.png")

print("All 5 UPROTA cover options successfully rendered in Pixel Art!")
