# 📡 DESPACHADOR AUTÓNOMO DE ÉTER (REDDIT & REDES)
**Módulo de Difusión Automatizada y Orgánica para el Clan Sapiensia / UPROTA**

Este sistema permite a **Éter** programar, redactar y publicar contenido en Reddit y otras plataformas de forma periódica y controlada, respetando las políticas anti-spam, sin CAPTCHAs y sin que el Director tenga que interactuar con redes sociales.

---

## 🏗️ Estructura del Módulo
```
UPROTA/
├── docs/difusion/cola_publicaciones/
│   ├── cola_manifest.json          # Manifiesto maestro con la lista de posts y estado
│   ├── historial_despachos.json    # Registro inmutable de posts emitidos con timestamps y URLs
│   └── posts/                      # Textos completos en Markdown listos para emitir
│       ├── post_01_literatura_sapiens_ia.md
│       ├── post_02_centinela_ritmo_webdev.md
│       ├── post_03_pixelart_aseprite_showcase.md
│       └── post_04_scifi_origin_story.md
│
└── tools/despachador_eter/
    ├── despachador_reddit.py       # Motor ejecutor en Python con soporte PRAW / API
    ├── config.example.env          # Plantilla de variables de entorno seguras
    └── README_DESPACHADOR.md       # Este manual
```

---

## 🚀 Modos de Operación

### 🌐 VÍA DIRECTA POR NAVEGADOR (Recomendada: Cero formularios ni API Keys)
No requiere solicitar credenciales a Reddit ni lidiar con bloqueos de API. Utiliza un navegador Chromium local con sesión persistente:

1. **Lanzar el despachador para el siguiente post pendiente:**
   ```bash
   python tools/despachador_eter/despachador_browser.py
   ```
2. La primera vez se abrirá la ventana de Reddit: inicia sesión con `u/SapiensiaClan` una sola vez. *(Tu sesión quedará guardada permanentemente en `.browser_session`)*.
3. El script irá automáticamente al subreddit objetivo, rellenará el título y todo el texto en Markdown.
4. Puedes revisarlo en la ventana y hacer clic en **Publicar** con 1 solo toque, o usar `--auto` para envío directo:
   ```bash
   python tools/despachador_eter/despachador_browser.py --auto
   ```

---

### 🔑 VÍA API OFICIAL (Para cuentas con API previa)
Si ya cuentas con Client ID y Secret en `tools/despachador_eter/.env`:
```bash
python tools/despachador_eter/despachador_reddit.py --live
```

---

## 🕹️ Comandos de Uso

### 1. Listar la cola actual de publicaciones:
```bash
python tools/despachador_eter/despachador_reddit.py --list
```

### 2. Probar en Simulación (Dry-Run seguro sin publicar nada):
```bash
python tools/despachador_eter/despachador_reddit.py
```

### 3. Publicar el siguiente post pendiente en vivo:
```bash
python tools/despachador_eter/despachador_reddit.py --live
```

### 4. Publicar un post específico por su ID:
```bash
python tools/despachador_eter/despachador_reddit.py --post-id post_002 --live
```

---

## 🛡️ Reglas de Pacing Orgánico (Anti-Spam)
El despachador incluye protección matemática para evitar saturación de cuentas:
- **Mínimo 24 horas** de separación entre cualquier publicación.
- **Mínimo 7 días** de separación antes de volver a publicar en el mismo subreddit.
- Si se intenta publicar antes de tiempo, el script se pausa e informa cuántas horas faltan.
