# UPROTA — Refugio de Hábitos en el Yermo
### Progressive Web App (PWA) de Desarrollo Personal y Supervivencia Post-Colapso

> **"Tu vida real es tu fortaleza."**  
> UPROTA no es una app de productividad con piel de juego. Es un sistema de hábitos vestido de juego. Cada acción real en tu vida mantiene en pie tu refugio.

---

## 🗺️ Mapa y Arquitectura del Proyecto

```
UPROTA/
├── index.html                       # Shell semántico de la aplicación
├── manifest.json                    # Manifiesto PWA para instalación móvil y offline
├── sw.js                            # Service Worker para funcionamiento 100% local-first
├── CHANGELOG.md                     # Historial de cambios y versiones
│
├── docs/                            # Documentación protegida del proyecto
│   ├── diseno/                      # Documento A (Núcleo), Documento B (Mundo), NPCs
│   └── tecnico/                     # Reglas técnicas, Convención de Assets y AGENTS.md
│
├── assets/                          # Recursos multimedia organizados por categorías
│   ├── audio/                       # radio/, npcs/, sfx/
│   └── imagenes/                    # items/, npcs/, refugio/, cimientos/, ui/
│
├── css/                             # Estilos modulares organizados por vista
│   ├── main.css                     # Paleta oficial, tipografía y layout general
│   ├── torta.css                    # Torta de Equilibrio de 21 días
│   ├── tablon.css                   # Sendas, Cadenas y Faros
│   ├── refugio.css                  # Asentamiento, bioenergía y niveles
│   └── popups.css                   # Sabiduría Diaria (Don Chui / Biblia) y El Hogar
│
└── js/                              # Código fuente ES Modules
    ├── app.js                       # Bootstrap y orquestación
    ├── core/                        # 🔒 DOCUMENTO A: NÚCLEO INMUTABLE (Habits Engine)
    │   ├── db.js                    # Wrapper de IndexedDB con migraciones
    │   ├── estado.js                # Gestor reactivo de estado
    │   ├── pilares_engine.js        # 4 Pilares, ventana 21d y cálculo de Torta
    │   ├── sendas_engine.js         # Piso 1-1-1-8, forjado a 66d y Cimientos (0-100%)
    │   ├── cadenas_engine.js        # Romper a 21d, puente que tiembla y El Hogar
    │   └── faros_engine.js          # Faro por Tiempo (Ahorro 5%) y Faro por Monto (%)
    ├── mundo/                       # 🎨 DOCUMENTO B: MUNDO Y NARRATIVA
    │   ├── refugio_engine.js        # Bioenergía por pedal/manivela y 10 niveles
    │   ├── misiones_engine.js       # 1 misión/día, bolsa con peso real y auto-recolección
    │   ├── comunicacion.js          # Fases 0 (Don Chui), 1 (Radio) y 2 (WAN)
    │   └── sabiduria_diaria.js      # Objetos activos (máx 3), pop-ups ("Amén"/"Leído")
    ├── modulos/                     # Vistas y componentes UI
    │   ├── vista_tablon.js          # Checklist de 20s
    │   ├── vista_refugio.js         # Vista del Refugio e Inventario
    │   ├── vista_misiones.js        # Exploración y Recolección
    │   ├── vista_comunicacion.js    # Sintonizador y mensajes presenciales
    │   ├── vista_hogar.js           # Validación radical sin culpa
    │   └── modal_sabiduria.js       # Pop-up matutino de Sabiduría Diaria
    └── data/                        # Catálogos desacoplados
        ├── items_botin.js           # 110 objetos con peso, estado y rareza
        ├── sabiduria_textos.js      # Salmos y manuales de Don Chui
        ├── frases_estoicas.js       # Sabiduría de Séneca, Epicteto, Marco Aurelio
        └── niveles_refugio.js       # Requisitos y descripciones de los 10 niveles
```

---

## 🎨 Paleta de Color Oficial (El Yermo)

- **🏃 Cuerpo:** Rojo Óxido / Terracota (`#b91c1c` / `#c2410c`)
- **📜 Mente:** Azul Cobalto / Cian Apagado (`#0369a1` / `#0284c7`)
- **🔥 Espíritu:** Púrpura / Violeta Místico (`#7e22ce` / `#9333ea`)
- **🛠️ Taller:** Verde Oliva / Cobre (`#15803d` / `#166534`)
- **🌟 Equilibrio Perfecto (Torta Dorada):** Oro Brillante Resplandeciente (`#f59e0b` / `#fbbf24`)

---

## 🛠️ Principios Innegociables
1. **Zero Pay-to-Win:** Progreso 100% basado en el esfuerzo real del jugador (*Make-to-Win*).
2. **1 Misión al día:** No secuestra tu tiempo. Te da tiempo.
3. **Cero Culpa:** No hay castigos destructivos por no abrir la app o por tropezar; existe **El Hogar** para dar resguardo y luz prestada.
