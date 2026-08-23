# Reglas Técnicas de Creación — UPROTA
### Documento de referencia para el agente de desarrollo (Antigravity)

Este documento establece las reglas obligatorias de arquitectura, documentación y estándares técnicos para el desarrollo del proyecto UPROTA. Debe respetarse en cada módulo, commit y entrega de código.

---

## 1. Modularidad estricta

- Cada parte funcional del programa debe vivir en su **propio archivo/documento separado**.
- Una reparación o modificación en una sección **no debe alterar ni requerir tocar** el resto de la aplicación.
- Ningún módulo debe depender de detalles internos de otro módulo — la comunicación entre partes debe darse a través de interfaces/funciones claras, no accediendo directamente a variables internas ajenas.

---

## 2. Documentación total del código

- Todo el código debe estar **comentado en su totalidad**: qué hace cada función, cada bloque relevante y cada decisión no obvia.
- El nivel de detalle debe ser suficiente para que una persona sin conocimiento previo del proyecto (incluyendo el propio autor, tiempo después) pueda entender qué hace cada parte **sin depender de ayuda externa ni de IA**.
- Los comentarios deben explicar el *por qué*, no solo el *qué*, cuando la lógica no sea evidente a simple vista.

---

## 3. Convención de nombres — recursos visuales

- Nombres **cortos, claros y homogéneos** para todos los assets visuales (sprites, íconos, fondos, etc.).
- Debe existir un patrón fijo y predecible, por ejemplo: `tipo-nombre-estado.png` (a definir el estándar exacto antes de empezar a generar assets).
- El nombre de archivo debe coincidir siempre con el identificador usado en el código (ver también regla 6).

---

## 4. Convención de nombres — archivos de código y carpetas

- La misma disciplina de naming de la regla 3 se aplica a **archivos JS, CSS, HTML y carpetas del proyecto**, no solo a imágenes.
- Definir de antemano: idioma (español o inglés, no mezclar), estilo (`kebab-case`, `camelCase`, etc.) y estructura de carpetas.
- Una vez fijada la convención, se mantiene igual en todo el proyecto sin excepciones.

---

## 5. Ficha técnica del proyecto

Documento único con datos técnicos específicos y descriptivos, que debe incluir como mínimo:

- **Tecnología usada:** HTML5 + CSS + JavaScript (y cualquier librería o dependencia adicional que se sume).
- **Uso de IndexedDB:** descripción corta de cómo se usa y qué datos se guardan exactamente.
- **Paleta de colores** del proyecto.
- **Fuentes tipográficas** usadas.
- **Elementos externos incorporados** (ej. Biblia, El arte de la guerra, Meditaciones de Marco Aurelio, u otros textos): cada uno debe quedar **certificado como de dominio público** antes de integrarse al proyecto.

---

## 6. Versionado y registro de cambios

- Mantener un archivo `CHANGELOG.md` con cada modificación relevante: qué cambió, en qué módulo, y por qué.
- Es especialmente importante porque distintas sesiones de trabajo (incluyendo distintas sesiones de IA, que no comparten memoria entre sí) pueden intervenir el proyecto en momentos diferentes — sin este registro, se vuelve difícil rastrear el origen de un error o cambio de comportamiento.

---

## 7. Documento de arquitectura / mapa del proyecto

- Debe existir un archivo central (`README.md` o `ARQUITECTURA.md`) que explique:
  - Qué hace cada módulo del proyecto.
  - Cómo se conectan entre sí los distintos módulos.
- Este documento es el punto de entrada obligatorio para entender el proyecto en conjunto, sin tener que leer todos los archivos individuales para deducir cómo encajan.

---

## 8. Separación de núcleo (Documento A) y narrativa (Documento B) a nivel de código

- La distinción de diseño ya establecida en la documentación de UPROTA — núcleo inmutable de hábitos (Documento A) vs. capa narrativa editable (Documento B) — debe reflejarse también en la **arquitectura del código**, no solo en el diseño conceptual.
- El motor de pilares, Cadenas y ventana de 21 días debe vivir en módulos independientes que **no deban modificarse** al agregar contenido narrativo nuevo (NPCs, objetos especiales, misiones, etc.).
- Agregar un NPC, objeto o evento narrativo nuevo **nunca debe requerir tocar el núcleo mecánico**.

---

## 9. Manejo de errores y validación de datos

- Prever y manejar explícitamente los casos en que:
  - Un dato esperado en IndexedDB no está presente.
  - Una escritura en IndexedDB falla.
  - El usuario tiene datos guardados de una versión anterior del código (migraciones).
- El objetivo es evitar corrupciones de datos silenciosas, que son las más difíciles de diagnosticar después de que ya ocurrieron.

---

## 10. Estándar de commits en Git

- Usar un formato simple y consistente para los mensajes de commit, tipo Conventional Commits:
  - `feat:` nueva funcionalidad
  - `fix:` corrección de errores
  - `docs:` cambios de documentación
  - `refactor:` cambios de código que no alteran funcionalidad
  - (y otros prefijos que se necesiten, definidos de forma consistente)
- Esto permite rastrear el historial del proyecto sin depender de la memoria de quien hizo el cambio.

---

## Pendientes a definir antes de empezar a programar

- [x] ~~Convención exacta de nombres de assets visuales (patrón fijo, ver regla 3)~~ — Resuelto en `UPROTA_Convencion_Assets.md` (`snake_case` con prefijos `item_`, `npc_`, `refugio_`, `ui_`).
- [ ] Convención exacta de nombres de archivos de código y carpetas (idioma + estilo, ver regla 4).
- [ ] Listado inicial de la ficha técnica completa (regla 5): paleta de colores definitiva, fuentes elegidas, estructura exacta de IndexedDB.
- [ ] Confirmar dominio público de cada texto externo que se vaya a incorporar (Biblia, Arte de la Guerra, Meditaciones, etc.) antes de integrarlos.
