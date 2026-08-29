# 🎨 Guía Técnica de Pixel Art y Catálogo de Assets — UPROTA

Documento de especificación técnica y de diseño para la creación, nomenclatura y almacenamiento de sprites en **Aseprite** para la aplicación **UPROTA**.

---

## 1. Reglas Técnicas Generales

| Parámetro | Especificación |
| :--- | :--- |
| **Formato de Entrega** | `.png` con fondo transparente (Canal Alpha RGBA). |
| **Archivo Fuente** | `.aseprite` (guardado en la misma carpeta o subcarpeta de fuentes). |
| **Escala de Diseño** | 1:1 nativo (sin reescalar con interpolación o filtros borrosos). |
| **Renderizado Web** | Se renderizará en CSS con `image-rendering: pixelated;`. |
| **Contornos / Delineado** | Contornos oscuros selectivos (no negro puro #000000; usar marrones oscuros, grises óxido o azul medianoche). |
| **Paleta y Tono** | **Yermo sobrio y realista:** Tierras, maderas quemadas por el sol, óxidos, metales desgastados, verdes secos, amarillos gastados y dorados cálidos. |

---

## 2. Estructura de Carpetas (Folio de Trabajo)

Todos los sprites deben guardarse dentro del repositorio en la ruta:  
`c:\Users\Snow\.gemini\antigravity\scratch\UPROTA\assets\sprites\`

```text
assets/sprites/
├── ui/               # Iconos de interfaz, pestañas de navegación y controles
├── recursos/         # Recursos de cabecera e inventario (tablas, clavos, latas, agua)
├── pilares/          # Iconos de los 4 Pilares y la Torta de Equilibrio
├── mecanicas/        # Sendas, Cimientos, Cadenas (eslabones) y Faros
├── items/            # Objetos de botín de expedición y trueque
└── refugio/          # Escenas/iconos evolutivos del refugio (Nivel 0 al 10)
```

---

## 3. Catálogo Prioritario — Fase 1 (Reemplazo de Emojis)

### Bloque A: Recursos Base de Cabecera (Tamaño: `16x16 px` o `24x24 px`)
Ruta: `assets/sprites/recursos/`

| Archivo PNG | Sustituye Emoji | Descripción del Arte |
| :--- | :---: | :--- |
| `recurso_tablas.png` | 🪵 | Par de tablas de pino envejecidas, atadas con alambre o soga rústica. |
| `recurso_clavos.png` | 🔩 | Puñado de clavos doblados, pernos y pequeñas tuercas oxidadas. |
| `recurso_provisiones.png` | 🥕 | Lata de comida comercial abollada con etiqueta rasgada / vieja. |
| `recurso_agua.png` | 💧 | Botella plástica reutilizada o garrafón con agua clara y tapa de corcho. |
| `recurso_moral.png` | 🧠 / ❤️ | Corazón o chispa de ánima blindada, cálida pero resistente. |

---

### Bloque B: Los 4 Pilares y Torta Dorada (Tamaño: `24x24 px` o `32x32 px`)
Ruta: `assets/sprites/pilares/`

| Archivo PNG | Sustituye Emoji | Descripción del Arte |
| :--- | :---: | :--- |
| `pilar_cuerpo.png` | 🏃 | Bota de caminante desgastada pero firme, o silueta de atleta de tierra. |
| `pilar_mente.png` | 📜 | Cuaderno viejo de notas atado con elástico, con planos/esquemas. |
| `pilar_espiritu.png` | 🔥 | Llama de fogata protegida por piedras, que resiste el viento. |
| `pilar_taller.png` | 🛠️ | Martillo y llave inglesa cruzados, con mango forrado en cinta. |
| `torta_dorada_badge.png` | 🌟 | Corona circular o emblema de 4 cuadrantes dorados relucientes. |

---

### Bloque C: Navegación Inferior y Menús (Tamaño: `24x24 px`)
Ruta: `assets/sprites/ui/`

| Archivo PNG | Sustituye Emoji | Descripción del Arte |
| :--- | :---: | :--- |
| `tab_tablon.png` | 📋 | Tablón de madera con notas y planos clavados. |
| `tab_refugio.png` | 🛖 | Choza rústica de palets y lona impermeable. |
| `tab_misiones.png` | 🧭 | Brújula metálica de expedición con aguja oxidada. |
| `tab_radio.png` | 📻 | Radio de onda corta con perillas analógicas y antena de alambre. |
| `tab_hogar.png` | 🕯️ | Vela de cera encendida en portavelas de hojalata. |
| `ico_info.png` | ℹ️ | Letra 'i' grabada en una chapa metálica redonda. |
| `ico_check_ok.png` | ✓ | Marca de tilde grabada con carbón o tiza blanca. |
| `ico_candado.png` | 🔒 | Candado de hierro forjado pesado. |

---

### Bloque D: Mecánicas Clave (Tamaño: `24x24 px` o `32x32 px`)
Ruta: `assets/sprites/mecanicas/`

| Archivo PNG | Sustituye Emoji | Descripción del Arte |
| :--- | :---: | :--- |
| `mecanica_senda.png` | 🏃 / 👟 | Huella de bota pisando tierra firme (hábito en construcción). |
| `mecanica_cimiento.png` | 🧱 / 🏛️ | Bloque de piedra macizo forjado (hábito a los 66 días). |
| `cadena_firme.png` | ⛓️ | Eslabón de cadena de acero pesado, tenso y cerrado. |
| `cadena_tiembla.png` | ⚠️ | Eslabón agrietado o temblando con chispas de tensión. |
| `cadena_rota.png` | ⛓️✨ | Eslabón roto y partido en dos con destello de libertad. |
| `faro_apagado.png` | 🕯️ | Lámpara de queroseno vacía / apagada. |
| `faro_encendido.png` | 💡 / 🕯️🔥 | Linterna de queroseno con llama viva y resplandor ámbar. |

---

### Bloque E: Misiones y Botín Inicial (Tamaño: `32x32 px`)
Ruta: `assets/sprites/items/`

| Archivo PNG | Sustituye Emoji | Descripción del Arte |
| :--- | :---: | :--- |
| `caja_expedicion.png` | 📦 | Fardo o mochila de expedición militar amarrada. |
| `item_cuchillo_mellado.png` | 🔪 | Cuchillo de cocina mellado con filo desgastado. |
| `item_cafe_solubil.png` | ☕ | Frasco de vidrio con café del viejo mundo. |
| `item_cables_cobre.png` | 🔌 | Rollo de cable de cobre pelado para empalmes. |
| `item_sal_grano.png` | 🧂 | Bolsita de arpillera con sal para conservar alimentos. |
| `item_yesca_natural.png` | 🌾 | Nido/ovillo de paja seca y ramitas finas para encender fuego. |
| `item_biblia_don_chui.png` | 📖 | Libro encuadernado en cuero desgastado con cruz discreta. |

---

## 4. Convención de Nomenclatura

1. **Minúsculas y guiones bajos (`snake_case`):** Ejemplo `recurso_tablas.png`.
2. **Prefijo por categoría:**
   - `recurso_`
   - `pilar_`
   - `tab_`
   - `mecanica_`
   - `item_`
   - `refugio_`
3. **Variaciones de estado:** Usar sufijos:
   - `_activo` / `_inactivo`
   - `_on` / `_off`
   - `_firme` / `_tiembla` / `_roto`
