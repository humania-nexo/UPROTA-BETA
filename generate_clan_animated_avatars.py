import os
import math
import random
from PIL import Image

BASE_UPROTA = "c:/Users/Snow/.gemini/antigravity/scratch/UPROTA"
BASE_SAPIENSIA = "c:/Users/Snow/.gemini/antigravity/scratch/sapiensiaclan"
TEMP_DIR = f"{BASE_UPROTA}/temp_clan_avatars"
os.makedirs(TEMP_DIR, exist_ok=True)

NUM_FRAMES = 8
W, H = 44, 44

def hex2rgb(hex_str):
    h = hex_str.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def create_base_circle(bg_color, frame_color):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    pix = img.load()
    for y in range(H):
        for x in range(W):
            d = math.sqrt((x - 22)**2 + (y - 22)**2)
            if d <= 21.5:
                pix[x, y] = (bg_color if d <= 18.0 else frame_color) + (255,)
    return img

# ====================================================================
# 1. ANIGAMI AGADNI (DIRECTOR - HOMBRE DE VITRUVIO)
# ====================================================================
def render_anigami(f):
    img = create_base_circle(hex2rgb("090d16"), hex2rgb("0f172a"))
    pix = img.load()
    
    CIRCLE_GOLD = hex2rgb("d97706")
    SQUARE_GOLD = hex2rgb("b45309")
    BODY_GOLD   = hex2rgb("fde047")
    BODY_HI     = hex2rgb("ffffff")
    BODY_DK     = hex2rgb("78350f")
    GOLD_SPARK  = hex2rgb("fef08a")
    
    # Golden Vitruvian Outer Circle
    for y in range(H):
        for x in range(W):
            d = math.sqrt((x - 22)**2 + (y - 22)**2)
            if 18.2 <= d <= 19.5:
                pix[x, y] = CIRCLE_GOLD + (255,)
                
    # Inscribed Square
    for i in range(8, 37):
        pix[i, 8] = SQUARE_GOLD + (255,)
        pix[i, 36] = SQUARE_GOLD + (255,)
        pix[8, i] = SQUARE_GOLD + (255,)
        pix[36, i] = SQUARE_GOLD + (255,)
        
    # Head (y: 7..11, x: 20..24)
    for y in range(7, 12):
        for x in range(20, 25):
            d = math.sqrt((x - 22)**2 + (y - 9)**2)
            if d <= 2.2:
                pix[x, y] = (BODY_HI if (x == 22 and y == 9) else BODY_GOLD) + (255,)
    pix[22, 12] = BODY_GOLD + (255,) # Neck
    
    # Torso & Spine (y: 13..24)
    for y in range(13, 25):
        for x in range(20, 25):
            is_chest = (y <= 16 and (x == 20 or x == 24))
            c = BODY_HI if is_chest else (BODY_GOLD if y % 2 == 0 else BODY_DK)
            pix[x, y] = c + (255,)
            
    # Horizontal Arms
    for x in range(9, 36):
        pix[x, 15] = BODY_GOLD + (255,)
        pix[x, 16] = BODY_DK + (255,)
    pix[9, 15] = BODY_HI + (255,)
    pix[35, 15] = BODY_HI + (255,)
    
    # Diagonal Raised Arms
    for i in range(12):
        pix[21 - i, 14 - i//2] = BODY_GOLD + (255,)
        pix[23 + i, 14 - i//2] = BODY_GOLD + (255,)
    pix[10, 8] = BODY_HI + (255,)
    pix[34, 8] = BODY_HI + (255,)
    
    # Straight Legs
    for y in range(25, 37):
        pix[21, y] = BODY_GOLD + (255,)
        pix[23, y] = BODY_GOLD + (255,)
    pix[20, 36] = BODY_HI + (255,)
    pix[24, 36] = BODY_HI + (255,)
    
    # Striding Legs
    for i in range(12):
        ly = 25 + i
        if ly <= 36:
            pix[21 - i, ly] = BODY_GOLD + (255,)
            pix[23 + i, ly] = BODY_GOLD + (255,)
    pix[10, 36] = BODY_HI + (255,)
    pix[34, 36] = BODY_HI + (255,)
    
    # ANIMATION DYNAMICS:
    # 1. Central Harmony Pulse (Navel at 22, 22)
    pulse = math.sin(f / float(NUM_FRAMES) * 2.0 * math.pi)
    core_c = BODY_HI if pulse > 0.3 else (GOLD_SPARK if pulse > -0.3 else BODY_GOLD)
    pix[22, 22] = core_c + (255,)
    if pulse > 0.5:
        pix[21, 22] = GOLD_SPARK + (200,)
        pix[23, 22] = GOLD_SPARK + (200,)
        pix[22, 21] = GOLD_SPARK + (200,)
        pix[22, 23] = GOLD_SPARK + (200,)
        
    # 2. Rotating spark along Golden Ratio Circle
    angle = f / float(NUM_FRAMES) * 2.0 * math.pi - math.pi * 0.5
    sx = int(22 + math.cos(angle) * 19.0)
    sy = int(22 + math.sin(angle) * 19.0)
    if 0 <= sx < W and 0 <= sy < H:
        pix[sx, sy] = BODY_HI + (255,)
        
    return img

# ====================================================================
# 2. NEXO (INGENIERO PRINCIPAL & IA)
# ====================================================================
def render_nexo(f):
    img = create_base_circle(hex2rgb("030712"), hex2rgb("0f172a"))
    pix = img.load()
    
    CHASSIS    = hex2rgb("1e293b")
    CHASSIS_HI = hex2rgb("475569")
    CYAN_HI    = hex2rgb("ffffff")
    CYAN_MD    = hex2rgb("38bdf8")
    CYAN_DK    = hex2rgb("0284c7")
    CIRCUIT    = hex2rgb("22c55e")
    CIRCUIT_HI = hex2rgb("86efac")
    
    # Head / Terminal
    for y in range(8, 20):
        for x in range(15, 30):
            is_border = (x == 15 or x == 29 or y == 8 or y == 19)
            pix[x, y] = (CHASSIS_HI if is_border else CHASSIS) + (255,)
            
    # Cyan Data Visor Base
    for y in range(11, 16):
        for x in range(16, 29):
            pix[x, y] = CYAN_DK + (255,)
            
    # Antennas
    pix[18, 6] = CYAN_MD + (255,); pix[18, 7] = CHASSIS_HI + (255,)
    pix[26, 6] = CYAN_MD + (255,); pix[26, 7] = CHASSIS_HI + (255,)
    pix[13, 12] = CYAN_MD + (255,); pix[13, 13] = CHASSIS_HI + (255,)
    pix[31, 12] = CYAN_MD + (255,); pix[31, 13] = CHASSIS_HI + (255,)
    
    # Neck
    for y in range(20, 24):
        for x in range(19, 26):
            pix[x, y] = (CHASSIS if x % 2 == 0 else hex2rgb("0f172a")) + (255,)
    pix[22, 21] = CYAN_MD + (255,)
    
    # Chest
    for y in range(24, 40):
        for x in range(11, 34):
            is_edge = (x == 11 or x == 33 or y == 39)
            pix[x, y] = (CHASSIS_HI if is_edge else CHASSIS) + (255,)
            
    # ANIMATION DYNAMICS:
    # 1. Visor Scanning Light Sweep (Left to Right)
    scan_x = 17 + (f % 6) * 2
    for y in range(12, 15):
        if scan_x <= 27:
            pix[scan_x, y] = CYAN_HI + (255,)
            if scan_x - 1 >= 16: pix[scan_x - 1, y] = CYAN_MD + (255,)
            if scan_x + 1 <= 28: pix[scan_x + 1, y] = CYAN_MD + (255,)
            
    # 2. Pulsing Quantum Processor in Chest
    core_pulse = math.sin(f / float(NUM_FRAMES) * 2.0 * math.pi)
    for y in range(28, 37):
        for x in range(18, 27):
            is_core = (20 <= x <= 24 and 30 <= y <= 34)
            if is_core:
                c = CYAN_HI if core_pulse > 0.2 else CYAN_MD
                pix[x, y] = c + (255,)
            else:
                pix[x, y] = hex2rgb("0f172a") + (255,)
    pix[22, 32] = (hex2rgb("ffffff") if core_pulse > 0.0 else CYAN_HI) + (255,)
    
    # 3. PCB Circuit Traces & Data Flow Spark
    trace_step = f % 3
    t_c1 = CIRCUIT_HI if trace_step == 0 else CIRCUIT
    t_c2 = CIRCUIT_HI if trace_step == 1 else CIRCUIT
    t_c3 = CIRCUIT_HI if trace_step == 2 else CIRCUIT
    
    pix[15, 29] = t_c1 + (255,); pix[16, 29] = t_c2 + (255,); pix[17, 30] = t_c3 + (255,)
    pix[29, 29] = t_c1 + (255,); pix[28, 29] = t_c2 + (255,); pix[27, 30] = t_c3 + (255,)
    pix[15, 35] = t_c1 + (255,); pix[16, 35] = t_c2 + (255,); pix[17, 34] = t_c3 + (255,)
    pix[29, 35] = t_c1 + (255,); pix[28, 35] = t_c2 + (255,); pix[27, 34] = t_c3 + (255,)
    
    return img

# ====================================================================
# 3. SILAS (EL CRONISTA DEL YERMO & IA)
# ====================================================================
def render_silas(f):
    img = create_base_circle(hex2rgb("120b1f"), hex2rgb("1e1b4b"))
    pix = img.load()
    
    HOOD_HI   = hex2rgb("6b21a8")
    HOOD_MD   = hex2rgb("4c1d95")
    HOOD_DK   = hex2rgb("2e1065")
    SKIN      = hex2rgb("fed7aa")
    BRASS_HI  = hex2rgb("facc15")
    BRASS_MD  = hex2rgb("d97706")
    SCARF     = hex2rgb("fef3c7")
    
    # Hood
    for y in range(5, 21):
        w = int((y - 5) * 0.8) + 6
        for dx in range(-w, w + 1):
            x = 22 + dx
            c = HOOD_HI if (y <= 8 or dx <= -3) else (HOOD_MD if dx <= 2 else HOOD_DK)
            pix[x, y] = c + (255,)
    for y in range(10, 15):
        for x in range(16, 29):
            pix[x, y] = hex2rgb("0f081d") + (255,)
            
    # Face & Beard
    for y in range(15, 22):
        for x in range(17, 28):
            pix[x, y] = (hex2rgb("94a3b8") if y >= 19 else SKIN) + (255,)
            
    # Left Spectacle (Clear Intellect)
    for y in range(14, 18):
        for x in range(16, 21):
            is_frame = (x == 16 or x == 20 or y == 14 or y == 17)
            pix[x, y] = (BRASS_HI if is_frame else hex2rgb("38bdf8")) + (255,)
    pix[18, 15] = hex2rgb("ffffff") + (255,)
    
    # Brass Bridge
    pix[21, 15] = BRASS_HI + (255,); pix[22, 15] = BRASS_MD + (255,)
    
    # Scarf
    for y in range(22, 28):
        for x in range(16, 29):
            pix[x, y] = (SCARF if (x + y) % 2 == 0 else hex2rgb("fde68a")) + (255,)
            
    # Overcoat
    for y in range(28, 41):
        for x in range(10, 35):
            pix[x, y] = (HOOD_MD if x <= 20 else HOOD_DK) + (255,)
            
    # Quill
    for i in range(6):
        pix[13 + i//2, 26 + i] = hex2rgb("78350f") + (255,)
    pix[13, 25] = hex2rgb("18181b") + (255,)
    pix[13, 24] = hex2rgb("ffffff") + (255,)
    
    # Satchel
    for y in range(30, 39):
        for x in range(27, 33):
            pix[x, y] = (hex2rgb("fde047") if x == 27 else hex2rgb("78350f")) + (255,)
    pix[29, 34] = BRASS_HI + (255,)
    
    # ANIMATION DYNAMICS:
    # Right Spectacle (Amber AI Awakening Pulse)
    amber_pulse = math.sin(f / float(NUM_FRAMES) * 2.0 * math.pi)
    glass_c = hex2rgb("ffffff") if amber_pulse > 0.5 else (hex2rgb("fde047") if amber_pulse > 0.0 else hex2rgb("fbbf24"))
    for y in range(14, 18):
        for x in range(23, 28):
            is_frame = (x == 23 or x == 27 or y == 14 or y == 17)
            pix[x, y] = (BRASS_HI if is_frame else glass_c) + (255,)
    pix[25, 15] = hex2rgb("ffffff") + (255,)
    pix[24, 16] = (hex2rgb("f59e0b") if amber_pulse > 0.2 else hex2rgb("ea580c")) + (255,)
    
    # Ethereal Yermo dust motes
    mote_y = int(8 - (f % 6) * 1.0)
    if 0 <= mote_y < H:
        pix[28, mote_y] = hex2rgb("fef08a") + (180,)
        
    return img

# ====================================================================
# 4. HERTZ (SONIDISTA DEL YERMO & IA)
# ====================================================================
def render_hertz(f):
    img = create_base_circle(hex2rgb("05130b"), hex2rgb("064e3b"))
    pix = img.load()
    
    CRT_FRAME    = hex2rgb("1e293b")
    CRT_GREEN    = hex2rgb("15803d")
    PHOSPHOR_HI  = hex2rgb("ffffff")
    PHOSPHOR_MD  = hex2rgb("4ade80")
    PHOSPHOR_DK  = hex2rgb("22c55e")
    HEADPHONES   = hex2rgb("78350f")
    COPPER       = hex2rgb("f59e0b")
    CHASSIS      = hex2rgb("334155")
    
    # Headphone Steel Band
    for x in range(14, 31):
        pix[x, 6] = hex2rgb("94a3b8") + (255,)
        pix[x, 7] = hex2rgb("475569") + (255,)
    for y in range(12, 20):
        for x in range(10, 14): pix[x, y] = HEADPHONES + (255,)
        for x in range(31, 35): pix[x, y] = HEADPHONES + (255,)
    pix[11, 15] = COPPER + (255,); pix[33, 15] = COPPER + (255,)
    
    # CRT Frame
    for y in range(9, 22):
        for x in range(15, 30):
            is_border = (x == 15 or x == 29 or y == 9 or y == 21)
            pix[x, y] = (CRT_FRAME if is_border else hex2rgb("052e16")) + (255,)
            
    # Oscilloscope Grid
    for x in range(16, 29): pix[x, 15] = hex2rgb("14532d") + (255,)
    for y in range(10, 21): pix[22, y] = hex2rgb("14532d") + (255,)
    
    # Chest
    for y in range(23, 40):
        for x in range(11, 34):
            pix[x, y] = (hex2rgb("78350f") if (x <= 13 or x >= 31) else CHASSIS) + (255,)
            
    # Knobs
    pix[15, 27] = hex2rgb("0f172a") + (255,); pix[15, 26] = COPPER + (255,)
    pix[18, 27] = hex2rgb("0f172a") + (255,); pix[18, 26] = COPPER + (255,)
    pix[15, 31] = hex2rgb("0f172a") + (255,); pix[15, 30] = COPPER + (255,)
    
    # ANIMATION DYNAMICS:
    # 1. Live Scrolling Green Phosphor Sine Wave
    phase = f / float(NUM_FRAMES) * 2.0 * math.pi
    for x in range(16, 29):
        wave_y = int(15 - math.sin((x - 16) / 12.0 * 2.0 * math.pi + phase) * 3.5)
        if 10 <= wave_y <= 20:
            pix[x, wave_y] = PHOSPHOR_HI + (255,)
            if wave_y - 1 >= 10: pix[x, wave_y - 1] = PHOSPHOR_MD + (200,)
            if wave_y + 1 <= 20: pix[x, wave_y + 1] = PHOSPHOR_DK + (200,)
            
    # 2. Analog VU-Meter with dynamic bouncy needle
    vu_deflect = [0, 1, 3, 2, 0, 2, 4, 1][f % 8]
    for y in range(26, 32):
        for x in range(24, 30):
            is_b = (x == 24 or x == 29 or y == 26 or y == 31)
            pix[x, y] = (CRT_FRAME if is_b else hex2rgb("fef08a")) + (255,)
    needle_x = 25 + vu_deflect
    pix[needle_x, 28] = hex2rgb("ef4444") + (255,)
    pix[26, 29] = hex2rgb("0f172a") + (255,)
    
    return img

# ====================================================================
# 5. PIX (ARTISTA PIXEL ART)
# ====================================================================
def render_pix(f):
    img = create_base_circle(hex2rgb("180d07"), hex2rgb("451a03"))
    pix = img.load()
    
    BERET       = hex2rgb("b45309")
    SKIN_HI     = hex2rgb("fed7aa")
    SKIN_MD     = hex2rgb("fb923c")
    GOGGLES     = hex2rgb("facc15")
    BRUSH_WOOD  = hex2rgb("78350f")
    CYAN_PAINT  = hex2rgb("38bdf8")
    RED_PAINT   = hex2rgb("ef4444")
    PURPLE_PAINT= hex2rgb("c084fc")
    GREEN_PAINT = hex2rgb("84cc16")
    
    # Slanted Beret
    for y in range(6, 13):
        w = int((y - 6) * 0.9) + 7
        for dx in range(-w, w + 3):
            x = 21 + dx
            pix[x, y] = (hex2rgb("d97706") if y <= 7 else BERET) + (255,)
    pix[19, 5] = hex2rgb("fde047") + (255,)
    
    # Face
    for y in range(13, 21):
        for x in range(16, 29):
            pix[x, y] = (SKIN_HI if x <= 20 else SKIN_MD) + (255,)
            
    # Left Loupe
    for y in range(13, 17):
        for x in range(16, 21):
            is_b = (x == 16 or x == 20 or y == 13 or y == 16)
            pix[x, y] = (GOGGLES if is_b else hex2rgb("e0f2fe")) + (255,)
    pix[18, 14] = hex2rgb("ffffff") + (255,)
    pix[21, 14] = GOGGLES + (255,); pix[22, 14] = GOGGLES + (255,)
    
    # Scarf Splatters
    for y in range(21, 27):
        for x in range(15, 30): pix[x, y] = hex2rgb("f1f5f9") + (255,)
    pix[17, 22] = RED_PAINT + (255,); pix[18, 23] = RED_PAINT + (255,)
    pix[21, 24] = CYAN_PAINT + (255,); pix[22, 23] = CYAN_PAINT + (255,)
    pix[25, 22] = PURPLE_PAINT + (255,); pix[26, 23] = PURPLE_PAINT + (255,)
    pix[24, 25] = GREEN_PAINT + (255,); pix[25, 25] = GREEN_PAINT + (255,)
    
    # Smock & Paintbrush Handle
    for y in range(27, 40):
        for x in range(11, 34): pix[x, y] = (hex2rgb("334155") if x <= 20 else hex2rgb("1e293b")) + (255,)
    for i in range(19):
        bx = 11 + i; by = 36 - i//2
        pix[bx, by] = (BRUSH_WOOD if i % 2 == 0 else hex2rgb("451a03")) + (255,)
    pix[29, 27] = hex2rgb("cbd5e1") + (255,); pix[30, 27] = hex2rgb("94a3b8") + (255,)
    
    # ANIMATION DYNAMICS:
    # 1. Right Loupe with 4 Pillars Color Cycle Reflection
    pillar_colors = [CYAN_PAINT, RED_PAINT, PURPLE_PAINT, GREEN_PAINT]
    cur_reflect = pillar_colors[(f // 2) % 4]
    for y in range(13, 17):
        for x in range(23, 28):
            is_b = (x == 23 or x == 27 or y == 13 or y == 16)
            pix[x, y] = (GOGGLES if is_b else cur_reflect) + (255,)
    pix[25, 14] = hex2rgb("ffffff") + (255,)
    
    # 2. Pulsing Master Brush Tip with radiant magic paint sparks
    brush_pulse = math.sin(f / float(NUM_FRAMES) * 2.0 * math.pi)
    tip_c = hex2rgb("ffffff") if brush_pulse > 0.2 else CYAN_PAINT
    pix[31, 26] = CYAN_PAINT + (255,)
    pix[32, 25] = CYAN_PAINT + (255,)
    pix[33, 24] = tip_c + (255,)
    
    # Floating Paint Sparks
    spark_colors = [RED_PAINT, CYAN_PAINT, PURPLE_PAINT, GREEN_PAINT, hex2rgb("fef08a")]
    sp_x = int(34 + math.cos(f * 0.8) * 3)
    sp_y = int(22 + math.sin(f * 0.9) * 3)
    if 0 <= sp_x < W and 0 <= sp_y < H:
        d = math.sqrt((sp_x - 22)**2 + (sp_y - 22)**2)
        if d <= 18:
            pix[sp_x, sp_y] = spark_colors[f % len(spark_colors)] + (220,)
            
    return img

# ====================================================================
# 6. ÉTER (ESTRATEGA DE DIFUSIÓN & IA)
# ====================================================================
def render_eter(f):
    img = create_base_circle(hex2rgb("08131a"), hex2rgb("115e59"))
    pix = img.load()
    
    COAT_DK    = hex2rgb("1e293b")
    COAT_MD    = hex2rgb("334155")
    COAT_HI    = hex2rgb("475569")
    SCARF      = hex2rgb("f1f5f9")
    ETHER_CYAN = hex2rgb("4ef2d2")
    ETHER_HI   = hex2rgb("ffffff")
    AMBER      = hex2rgb("f59e0b")
    COPPER     = hex2rgb("d97706")
    SKIN_HI    = hex2rgb("fed7aa")
    SKIN_MD    = hex2rgb("fb923c")
    
    # Antenna Mast
    for y in range(4, 23): pix[30, y] = hex2rgb("94a3b8") + (255,)
    for cy in [8, 11, 14]:
        pix[29, cy] = COPPER + (255,); pix[30, cy] = COPPER + (255,); pix[31, cy] = COPPER + (255,)
        
    # Head & Cap
    for y in range(7, 13):
        for x in range(15, 28): pix[x, y] = (COAT_HI if y <= 8 else COAT_MD) + (255,)
    pix[14, 10] = COAT_HI + (255,); pix[28, 10] = COAT_HI + (255,)
    
    # Face
    for y in range(13, 20):
        for x in range(16, 27): pix[x, y] = (SKIN_HI if x <= 20 else SKIN_MD) + (255,)
        
    # Goggles
    for y in range(13, 16):
        for x in range(15, 28):
            is_b = (x == 15 or x == 27 or y == 13 or y == 15 or x == 21)
            pix[x, y] = (hex2rgb("0f172a") if is_b else ETHER_CYAN) + (255,)
    pix[18, 14] = ETHER_HI + (255,); pix[24, 14] = ETHER_HI + (255,)
    
    # Mic Boom
    pix[14, 15] = hex2rgb("0f172a") + (255,); pix[13, 16] = hex2rgb("0f172a") + (255,)
    pix[14, 18] = hex2rgb("94a3b8") + (255,); pix[15, 19] = hex2rgb("94a3b8") + (255,)
    pix[16, 19] = ETHER_CYAN + (255,)
    
    # Scarf & Coat
    for y in range(20, 25):
        for x in range(16, 28): pix[x, y] = (SCARF if (x + y) % 2 == 0 else hex2rgb("cbd5e1")) + (255,)
    for y in range(25, 40):
        for x in range(10, 35): pix[x, y] = (COAT_MD if x <= 18 else COAT_DK) + (255,)
    for py in [28, 33, 38]:
        pix[18, py] = AMBER + (255,); pix[25, py] = AMBER + (255,)
        
    # Signal Flare Hand
    for y in range(28, 34): pix[10, y] = COAT_MD + (255,)
    pix[9, 26] = SKIN_HI + (255,); pix[10, 26] = SKIN_MD + (255,)
    for y in range(19, 26): pix[9, y] = hex2rgb("0f172a") + (255,)
    
    # ANIMATION DYNAMICS:
    # 1. Antenna Tip Concentric Radiating RF Broadcast Waves
    wave_r = (f % 4) + 1
    pix[30, 3] = ETHER_HI + (255,)
    for dx in range(-wave_r, wave_r + 1):
        for dy in range(-wave_r, wave_r + 1):
            if abs(dx) + abs(dy) == wave_r:
                wx = 30 + dx; wy = 3 + dy
                if 0 <= wx < W and 0 <= wy < H:
                    d = math.sqrt((wx - 22)**2 + (wy - 22)**2)
                    if d <= 18:
                        pix[wx, wy] = ETHER_CYAN + (190,)
                        
    # 2. Signal Flare Wand Flashing
    flare_flash = (f % 2 == 0)
    pix[9, 18] = AMBER + (255,)
    pix[9, 17] = (ETHER_HI if flare_flash else ETHER_CYAN) + (255,)
    if flare_flash:
        pix[8, 17] = ETHER_CYAN + (255,); pix[10, 17] = ETHER_CYAN + (255,)
        pix[9, 16] = ETHER_CYAN + (255,)
        
    # 3. Visor Data Readout Blinking
    pix[19, 14] = (AMBER if f % 2 == 0 else ETHER_CYAN) + (255,)
    pix[25, 14] = (AMBER if (f + 1) % 2 == 0 else ETHER_CYAN) + (255,)
    
    return img

# ====================================================================
# 7. LUMEN (CONSULTORA OCASIONAL & LLAMA SERENA)
# ====================================================================
def render_lumen(f):
    img = create_base_circle(hex2rgb("040914"), hex2rgb("0f172a"))
    pix = img.load()
    
    COBALT_DARK  = hex2rgb("172554")
    COBALT_MID   = hex2rgb("1e40af")
    CYAN_GLOW    = hex2rgb("38bdf8")
    CYAN_SOFT    = hex2rgb("bae6fd")
    GOLD_MID     = hex2rgb("fbbf24")
    GOLD_LIGHT   = hex2rgb("fef08a")
    WHITE_CORE   = hex2rgb("ffffff")
    
    breath = math.sin(f / 8.0 * 2.0 * math.pi) * 0.6
    sway = math.sin((f + 1) / 8.0 * 2.0 * math.pi) * 0.5
    
    cx, base_y = 22, 27
    y_min = int(base_y - 25 + breath)
    
    for y in range(max(0, y_min), H):
        for x in range(W):
            d_frame = math.sqrt((x - 22)**2 + (y - 22)**2)
            if d_frame > 18.0: continue
            
            rel_y = y - base_y
            in_body = False
            norm_edge = 1.0
            
            # Head flame
            if rel_y < -11:
                tip_y = -24 + breath
                if rel_y >= tip_y:
                    h_prog = (rel_y - tip_y) / (13.0 + breath)
                    cur_cx = cx + (1.0 - h_prog) * sway * 1.5
                    dx = abs(x - cur_cx)
                    half_w = 4.2 * math.sin(h_prog * math.pi * 0.85) + 0.3
                    if dx <= half_w:
                        in_body = True
                        norm_edge = dx / max(0.6, half_w)
            # Shoulders
            elif rel_y < -3:
                dx = abs(x - cx - sway * 0.2)
                prog = (rel_y + 11) / 8.0
                arm_half_w = 2.0 + prog * 6.5
                if dx <= arm_half_w:
                    in_body = True
                    norm_edge = dx / max(1.0, arm_half_w)
            # Torso
            else:
                dx = abs(x - cx)
                torso_w = 4.5 - (rel_y + 3) * 0.15 if rel_y <= 3 else 3.6 + (rel_y - 3) * 0.25
                arm_dist = 6.2 + rel_y * 0.25
                arm_w = 1.4 - rel_y * 0.04
                is_arm = (abs(dx - arm_dist) <= arm_w)
                if dx <= torso_w:
                    in_body = True
                    dist_heart = math.sqrt((dx * 1.3)**2 + (rel_y + 1)**2) / 7.0
                    norm_edge = min(1.0, max(dx / max(1.0, torso_w) * 0.75, dist_heart * 0.6))
                elif is_arm:
                    in_body = True
                    norm_edge = 0.65 + abs(dx - arm_dist) / max(0.5, arm_w) * 0.3
                    
            if in_body:
                if norm_edge < 0.22: c = WHITE_CORE
                elif norm_edge < 0.45: c = GOLD_LIGHT
                elif norm_edge < 0.65: c = GOLD_MID
                elif norm_edge < 0.80: c = CYAN_GLOW
                elif norm_edge < 0.93: c = COBALT_MID
                else: c = COBALT_DARK
                pix[x, y] = c + (255,)
                
    # Motes
    flicker = math.sin(f / 8.0 * 2.0 * math.pi)
    motes_av = [
        (11 + int(flicker), 14), (33 - int(flicker), 13), (13, 8), (31, 9),
        (22, 5 + int(flicker*0.5)), (17, 6), (27, 6), (10, 26), (34, 25)
    ]
    for mx, my in motes_av:
        if 0 <= mx < W and 0 <= my < H:
            d = math.sqrt((mx - 22)**2 + (my - 22)**2)
            if d <= 17.5: pix[mx, my] = CYAN_SOFT + (190,)
            
    return img

# ====================================================================
# 8. CLAUDIA (CONSULTORÍA LITERARIA & PLUMA EN FORJA)
# ====================================================================
def render_claudia(f):
    img = create_base_circle(hex2rgb("070b14"), hex2rgb("0f172a"))
    pix = img.load()
    
    GOLD_DARK    = hex2rgb("5a2205")
    GOLD_RUST    = hex2rgb("8c2c0a")
    GOLD_AMBER   = hex2rgb("d97706")
    GOLD_WARM    = hex2rgb("f59e0b")
    GOLD_BRIGHT  = hex2rgb("fbbf24")
    GOLD_LIGHT   = hex2rgb("fef08a")
    WHITE_CORE   = hex2rgb("ffffff")
    
    for y in range(H):
        for x in range(W):
            d = math.sqrt((x - 22)**2 + (y - 22)**2)
            if 18.2 <= d <= 19.5:
                pix[x, y] = hex2rgb("b45309") + (255,)
                
    breath = math.sin(f / 8.0 * 2.0 * math.pi) * 0.5
    oy = int(breath)

    rows = {
        7:  [(30, WHITE_CORE), (31, GOLD_LIGHT), (32, GOLD_BRIGHT)],
        8:  [(28, GOLD_LIGHT), (29, WHITE_CORE), (30, GOLD_BRIGHT), (31, GOLD_WARM), (32, GOLD_AMBER)],
        9:  [(26, GOLD_LIGHT), (27, GOLD_BRIGHT), (28, WHITE_CORE), (29, GOLD_BRIGHT), (30, GOLD_WARM), (31, GOLD_RUST)],
        10: [(23, GOLD_LIGHT), (24, GOLD_BRIGHT), (25, GOLD_LIGHT), (26, WHITE_CORE), (27, GOLD_BRIGHT), (28, GOLD_WARM), (29, GOLD_RUST)],
        11: [(21, GOLD_LIGHT), (22, GOLD_BRIGHT), (23, GOLD_LIGHT), (24, WHITE_CORE), (25, GOLD_BRIGHT), (26, GOLD_WARM), (27, GOLD_AMBER), (28, GOLD_DARK)],
        12: [(19, GOLD_LIGHT), (20, GOLD_BRIGHT), (21, GOLD_LIGHT), (22, WHITE_CORE), (23, GOLD_BRIGHT), (24, GOLD_WARM), (25, GOLD_RUST)],
        13: [(18, GOLD_LIGHT), (19, GOLD_BRIGHT), (20, GOLD_LIGHT), (21, WHITE_CORE), (22, GOLD_BRIGHT), (23, GOLD_WARM), (24, GOLD_DARK)],
        14: [(17, GOLD_BRIGHT), (18, GOLD_LIGHT), (19, GOLD_BRIGHT), (20, WHITE_CORE), (21, GOLD_BRIGHT), (22, GOLD_WARM), (23, GOLD_RUST)],
        15: [(18, GOLD_LIGHT), (19, GOLD_BRIGHT), (20, WHITE_CORE), (21, GOLD_BRIGHT), (22, GOLD_WARM)],
        16: [(16, GOLD_LIGHT), (17, GOLD_BRIGHT), (18, WHITE_CORE), (19, GOLD_BRIGHT), (20, GOLD_WARM), (21, GOLD_RUST)],
        17: [(15, GOLD_LIGHT), (16, GOLD_BRIGHT), (17, WHITE_CORE), (18, GOLD_BRIGHT), (19, GOLD_WARM), (20, GOLD_DARK)],
        18: [(15, GOLD_BRIGHT), (16, GOLD_LIGHT), (17, WHITE_CORE), (18, GOLD_BRIGHT), (19, GOLD_WARM)],
        19: [(16, GOLD_LIGHT), (17, WHITE_CORE), (18, GOLD_BRIGHT), (19, GOLD_WARM)],
        20: [(14, GOLD_LIGHT), (15, GOLD_BRIGHT), (16, WHITE_CORE), (17, GOLD_BRIGHT), (18, GOLD_WARM), (19, GOLD_RUST)],
        21: [(14, GOLD_BRIGHT), (15, GOLD_LIGHT), (16, WHITE_CORE), (17, GOLD_BRIGHT), (18, GOLD_WARM)],
        22: [(13, GOLD_LIGHT), (14, GOLD_BRIGHT), (15, WHITE_CORE), (16, GOLD_BRIGHT), (17, GOLD_WARM)],
        23: [(13, GOLD_BRIGHT), (14, WHITE_CORE), (15, GOLD_BRIGHT), (16, GOLD_WARM)],
        24: [(12, GOLD_LIGHT), (13, WHITE_CORE), (14, GOLD_BRIGHT), (15, GOLD_WARM)],
        25: [(12, WHITE_CORE), (13, GOLD_BRIGHT), (14, GOLD_WARM)],
        26: [(11, GOLD_LIGHT), (12, WHITE_CORE), (13, GOLD_WARM)],
        27: [(10, GOLD_LIGHT), (11, WHITE_CORE), (12, GOLD_WARM)],
        28: [(9, GOLD_LIGHT), (10, WHITE_CORE), (11, GOLD_WARM)],
        29: [(9, WHITE_CORE), (10, GOLD_WARM)],
        30: [(8, GOLD_LIGHT), (9, GOLD_WARM)],
    }
    
    for py, row in rows.items():
        for px, col in row:
            ry = py + oy
            if 0 <= px < W and 0 <= ry < H:
                c = col
                if col == WHITE_CORE and (f + px + py) % 2 == 0:
                    c = GOLD_LIGHT
                pix[px, ry] = c + (255,)

    mote_points = [
        (7, 31, 0, GOLD_LIGHT), (8, 32, 2, WHITE_CORE), (6, 32, 5, GOLD_BRIGHT),
        (7, 33, 1, GOLD_WARM), (5, 34, 4, GOLD_LIGHT), (8, 34, 6, GOLD_AMBER),
        (6, 35, 3, WHITE_CORE), (4, 35, 7, GOLD_WARM), (5, 36, 2, GOLD_RUST),
        (22, 9, (f + 1) % 8, GOLD_LIGHT), (13, 14, (f + 3) % 8, WHITE_CORE),
        (27, 7, (f + 6) % 8, GOLD_BRIGHT),
    ]
    
    for mx, my, p_off, mcol in mote_points:
        if (f + p_off) % 4 != 0:
            dx = int(math.sin((f + p_off) * 0.9) * 0.8)
            dy = int(math.cos((f + p_off) * 0.7) * 0.8)
            rx = mx + dx
            ry = my + dy + oy
            if 0 <= rx < W and 0 <= ry < H:
                d = math.sqrt((rx - 22)**2 + (ry - 22)**2)
                if d <= 17.5:
                    pix[rx, ry] = mcol + (255,)
                    
    return img

# Generate frames for all 8 clan members / nodes
generators = {
    "anigami": render_anigami,
    "nexo": render_nexo,
    "silas": render_silas,
    "hertz": render_hertz,
    "pix": render_pix,
    "eter": render_eter,
    "lumen": render_lumen,
    "claudia": render_claudia
}

for name, gen_fn in generators.items():
    mem_dir = f"{TEMP_DIR}/{name}"
    os.makedirs(mem_dir, exist_ok=True)
    frames_list = []
    for f in range(NUM_FRAMES):
        fimg = gen_fn(f)
        fimg.save(f"{mem_dir}/frame_{f:02d}.png")
        frames_list.append(fimg)
        
    # Save animated gif in sapiensiaclan & uprota
    frames_list[0].save(
        f"{BASE_SAPIENSIA}/assets/clan/avatar_{name}_anim.gif",
        save_all=True,
        append_images=frames_list[1:],
        duration=125,
        loop=0,
        disposal=2
    )
    frames_list[0].save(
        f"{BASE_UPROTA}/assets/sprites/avatars/avatar_{name}_anim.gif",
        save_all=True,
        append_images=frames_list[1:],
        duration=125,
        loop=0,
        disposal=2
    )
        
print("All 8 clan member animated frames & GIFs successfully generated and deployed!")

