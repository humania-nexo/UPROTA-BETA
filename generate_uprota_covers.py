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
    img = Image.new("RGBA", (W, H), BG_NIGHT + (255,))
    pix = img.load()
    
    for y in range(220):
        t = y / 220.0
        r = int(SKY_DEEP[0] * (1-t) + SKY_INDIGO[0] * t)
        g = int(SKY_DEEP[1] * (1-t) + SKY_INDIGO[1] * t)
        b = int(SKY_DEEP[2] * (1-t) + SKY_INDIGO[2] * t)
        
        aurora = math.sin(y * 0.05 + 1.2) * math.cos(y * 0.02)
        if 40 <= y <= 130 and aurora > 0.3:
            r = int(r * 0.8 + 10 * 0.2)
            g = int(g * 0.7 + 180 * 0.3)
            b = int(b * 0.7 + 210 * 0.3)
            
        for x in range(W):
            pix[x, y] = (r, g, b, 255)
            
    random.seed(101)
    for _ in range(70):
        sx = random.randint(5, W - 6)
        sy = random.randint(8, 170)
        bright = random.random()
        col = WHITE if bright > 0.8 else (CYAN_SOFT if bright > 0.4 else (100, 130, 170))
        pix[sx, sy] = col + (255,)
        
    for dy in range(-10, 11):
        for dx in range(-10, 11):
            if dx*dx + dy*dy <= 100:
                if (dx - 4)**2 + (dy - 2)**2 > 75:
                    pix[200 + dx, 70 + dy] = GOLD_WARM + (255,)
                    if dx*dx + dy*dy <= 64: pix[200 + dx, 70 + dy] = WHITE + (255,)

    for y in range(160, 240):
        for x in range(W):
            m1 = math.sin(x * 0.03) * 18 + math.cos(x * 0.08) * 8
            m_top = 185 - int(m1)
            if y >= m_top:
                d = y - m_top
                c = (14, 20, 36) if d < 8 else (8, 13, 24)
                pix[x, y] = c + (255,)

    for y in range(210, H):
        for x in range(W):
            ground_h = 240 + math.sin(x * 0.02) * 10 - math.cos(x * 0.06) * 5
            if y >= ground_h:
                d = y - ground_h
                if d <= 1: c = STONE_RIM
                elif d <= 6: c = STONE_LIGHT
                elif d <= 18: c = STONE_MID
                else: c = STONE_DARK
                pix[x, y] = c + (255,)

    roof_peak_x, roof_peak_y = 130, 175
    for y in range(175, 215):
        w = int((y - 175) * 1.1) + 4
        for dx in range(-w, w + 1):
            px = roof_peak_x + dx
            if 0 <= px < W:
                c = WOOD_LIGHT if dx <= 0 and (y % 4 == 0) else (WOOD_MID if dx <= 2 else WOOD_DARK)
                pix[px, y] = c + (255,)
                
    for y in range(215, 255):
        for x in range(96, 165):
            c = STONE_LIGHT if (x % 10 == 0 or y % 8 == 0) else (STONE_MID if x <= 130 else STONE_DARK)
            pix[x, y] = c + (255,)
            
    for y in range(224, 243):
        for x in range(106, 125):
            is_frame = (x == 106 or x == 124 or y == 224 or y == 242 or x == 115 or y == 233)
            pix[x, y] = (WOOD_DARK if is_frame else (WHITE if (x == 111 and y == 228) else GOLD_SUN)) + (255,)
            
    for y in range(243, 275):
        for x in range(85, 145):
            d = math.sqrt((x - 115)**2 + (y - 233)**2)
            if d < 36:
                alpha = (36 - d) / 36.0 * 0.45
                cr, cg, cb, _ = pix[x, y]
                pix[x, y] = (int(cr + GOLD_WARM[0]*alpha), int(cg + GOLD_WARM[1]*alpha), int(cb + GOLD_WARM[2]*alpha), 255)

    for y in range(226, 255):
        for x in range(138, 155):
            is_f = (x == 138 or x == 154 or y == 226)
            pix[x, y] = (WOOD_LIGHT if is_f else WOOD_DARK) + (255,)
    pix[141, 240] = GOLD_WARM + (255,)

    for y in range(148, 195):
        pix[102, y] = STONE_RIM + (255,)
    pix[100, 155] = STONE_RIM + (255,); pix[104, 155] = STONE_RIM + (255,)
    pix[99, 165] = STONE_RIM + (255,); pix[105, 165] = STONE_RIM + (255,)
    for r in [8, 16, 24]:
        for ang in range(-60, 61, 15):
            rad = math.radians(ang - 90)
            wx = int(102 + math.cos(rad) * r)
            wy = int(148 + math.sin(rad) * r)
            if 0 <= wx < W and 0 <= wy < H:
                pix[wx, wy] = CYAN_GLOW + (180,)

    for (wx, wy) in [(166, 256), (184, 256)]:
        for dy in range(-4, 5):
            for dx in range(-4, 5):
                if 9 <= dx*dx + dy*dy <= 16:
                    pix[wx + dx, wy + dy] = STONE_RIM + (255,)
    for i in range(18):
        pix[166 + i, 250 - i//3] = AMBER_FIRE + (255,)
    pix[166, 244] = STONE_RIM + (255,); pix[167, 244] = STONE_RIM + (255,)
    pix[184, 246] = WOOD_DARK + (255,)

    for dy in range(-2, 3):
        for dx in range(-5, 6):
            if dx*dx + dy*dy*2 <= 25:
                pix[65 + dx, 270 + dy] = STONE_DARK + (255,)
    for fy in range(256, 270):
        fw = max(1, int((270 - fy) * 0.45))
        for fdx in range(-fw, fw + 1):
            c = WHITE if fdx == 0 and fy > 264 else (GOLD_WARM if abs(fdx) <= 1 else AMBER_FIRE)
            pix[65 + fdx, fy] = c + (255,)
    random.seed(99)
    for _ in range(14):
        ex = 65 + random.randint(-12, 12)
        ey = 255 - random.randint(2, 28)
        pix[ex, ey] = (GOLD_WARM if random.random() > 0.5 else AMBER_FIRE) + (255,)

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
