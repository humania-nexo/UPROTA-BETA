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

## 🚀 Cómo Ponerlo en Marcha (Setup de 2 minutos)

### 1. Obtener las credenciales gratuitas de Reddit API
1. Inicia sesión en tu cuenta de Reddit en el navegador.
2. Ve a: [https://www.reddit.com/prefs/apps](https://www.reddit.com/prefs/apps)
3. Haz clic abajo en **"are you a developer? create an app..."** o **"create another app..."**.
4. Rellena los datos:
   - **name:** `DespachadorEter`
   - **type:** Marca la casilla **`script`** *(Importante: no web app)*.
   - **redirect uri:** `http://localhost:8080`
5. Haz clic en **"create app"**.
6. Copia el **Client ID** (el código alfanumérico debajo del nombre de la app) y el **Secret**.

### 2. Configurar tu `.env` local
Copia `config.example.env` a `.env` en `tools/despachador_eter/`:
```ini
REDDIT_CLIENT_ID=tu_client_id_aqui
REDDIT_CLIENT_SECRET=tu_client_secret_aqui
REDDIT_USERNAME=tu_usuario_reddit
REDDIT_PASSWORD=tu_contrasena_reddit
REDDIT_USER_AGENT=SapiensiaClanDispatcher/1.0 by u/tu_usuario_reddit
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
