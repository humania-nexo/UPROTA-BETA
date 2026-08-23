# Convención Oficial de Assets Visuales — UPROTA
### Guía técnica para Pixel Art (Aseprite), Exportación y Estructura de Assets
**Versión 1.0 — Documento de referencia de producción**

---

## 1. Regla General de Nombres (Naming Convention)

Todos los archivos visuales deben cumplir con las siguientes reglas sin excepción:
1. **Formato:** Exclusivamente minúsculas y palabras separadas por guión bajo (`snake_case`).
2. **Extensión:** `.png` (con transparencia canal alpha).
3. **Estructura fija:** `[categoria]_[id/subtipo]_[nombre_descriptivo]_[estado/variante].png`
4. **Sin caracteres especiales:** Nada de espacios, acentos, mayúsculas o eñes.

---

## 2. Estructura de Categorías y Ejemplos

### A. Ítems y Objetos de Botín (`item_`)
Para los 110 objetos de saqueo, herramientas y consumibles:
- `item_001_hacha_oxidada.png`
- `item_001_hacha_restaurada.png`
- `item_015_martillo_deplorable.png`
- `item_080_bici_vieja.png`
- `item_085_celda_litio_18650.png`
- `item_098_sal_fina.png`
- `item_105_ferrocerio.png`

### B. Personajes y NPCs (`npc_`)
Para los portadores de sabiduría y visitantes del refugio:
- `npc_don_chui_idle.png`
- `npc_don_chui_caminando.png`
- `npc_lutier_anciano_idle.png`
- `npc_lutier_violin.png`
- `npc_visitante_caravana_sal.png`

### C. Refugio y Progresión de Niveles (`refugio_`)
Para la vista del refugio según su evolución (Nivel 0 al 10):
- `refugio_nivel_00_punto_cero.png`
- `refugio_nivel_01_basico.png`
- `refugio_nivel_02_asegurado.png`
- `refugio_nivel_05_bioenergia.png`
- `refugio_nivel_10_ciudadela.png`

### D. Cimientos y Estructuras Específicas (`cimiento_`)
- `cimiento_bici_generador.png`
- `cimiento_huerto_medicinal.png`
- `cimiento_filtro_bioarena.png`
- `cimiento_pozo_agua.png`

### E. Interfaz de Usuario y Glifos (`ui_`)
- `ui_pilar_cuerpo.png`
- `ui_pilar_mente.png`
- `ui_pilar_espiritu.png`
- `ui_pilar_taller.png`
- `ui_torta_dorada.png`
- `ui_icon_radio_fase1.png`
- `ui_icon_bolsa_mercado.png`
- `ui_icon_faro_tiempo.png`
- `ui_icon_faro_monto.png`

---

## 3. Especificaciones Técnicas para Aseprite

| Parámetro | Valor estándar |
|---|---|
| **Formato de paleta** | Paleta cálida y desgastada del Yermo (tonos tierra, óxido, pergamino, metal oscuro) |
| **Tamaño de Ítems** | 16x16 px o 24x24 px (iconos de inventario) |
| **Tamaño de NPCs** | 32x32 px o 32x48 px (vista frontal/3/4) |
| **Tamaño Refugio / Escenas** | 128x128 px o 256x144 px (banner principal) |
| **Exportación** | PNG escala 1x (el CSS/Canvas se encarga del escalado `image-rendering: pixelated`) |

---

## 4. Directorio de Almacenamiento en el Código

```
/assets/
├── items/       # item_*.png
├── npcs/        # npc_*.png
├── refugio/     # refugio_*.png
├── cimientos/   # cimiento_*.png
└── ui/          # ui_*.png
```

---
*Fin de la Convención de Assets Visuales.*
