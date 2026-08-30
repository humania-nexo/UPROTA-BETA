# CHANGELOG — UPROTA

Todos los cambios relevantes de la arquitectura y desarrollo de UPROTA quedan registrados en este documento.

---

## [1.1.0-narrativa] - 2026-08-30
### Añadido por Silas (El Cronista)
- **Ficha y Progresión de Don Chui:** Integración de la apariencia física detallada de Don Chui (cojera, incansable, bajito/gordito, maestro reparador) y desarrollo completo de los **3 Tomos de Supervivencia (15 técnicas reales de bushcraft)** respaldadas por física y química empírica (`UPROTA_Manuales_Don_Chui_Progresion.md` y `UPROTA_Ficha_Don_Chui.md`).
- **Catálogo de Eventos Semanales del Refugio:** Escalabilidad de eventos semanales desde el Nivel 0 (roedores, goteras) hasta el Nivel 10 (consejo de cuenca, tasas de gobiernos transitorios y sequía) en `UPROTA_Eventos_Semanales_Refugio.md`.
- **Misiones Especiales de Contingencia (Tipo S):** Sistema de misiones temporales vinculadas a cada evento semanal divididas en **Preventivas (🛡️ S)** mediante avisos de radio y **Correctivas / Salto Evolutivo (🛠️ S)** para transformar la adversidad en mejoras permanentes y Faros (ej. *Alacena Hermética Colgante* tras *El Rincón Royido* $\rightarrow$ *Faro de Ahorro*).
- **Banco Maestro de Misiones:** Stock completo de expediciones Tipo B (fijas sin riesgo), Tipo A (aleatorias con riesgo por nivel) y Tipo S (contingencia) en `UPROTA_Misiones_Expediciones_Stock.md`.
- **Guiones de Yermo Radio (104.5 MHz):** Dramaturgia radial en onda corta, boletines comunitarios, cápsulas técnicas de taller con Don Chui y reflexiones de madrugada (`UPROTA_Guiones_Radio_104_5.md`).
- **El Hogar y Sabiduría Diaria (Datasets JS):**
  - `sabiduria_textos.js`: 12 versículos bíblicos de dominio público comentados con notas manuscritas al margen por Don Chui y textos formativos de manuales.
  - `frases_estoicas.js` y `UPROTA_El_Hogar_Textos_Resguardo.md`: Matriz de 4 capas (Validación radical, Evidencia, Luz prestada y Filosofía estoica en tono Yermo).

## [1.0.0-reboot] - 2026-08-23
### Añadido
- **Estructura limpia:** Reorganización del repositorio en `/docs/` (diseño y técnico), `/assets/` (audio y sprites organizados por categorías) y `/js/` (separación Núcleo A / Mundo B).
- **Etiqueta histórica:** Se creó el tag `v0.1-beta-previa` para preservar el historial de la primera prueba.
- **Documentación de diseño actualizada:** 
  - `UPROTA-NUCLEO-DOCUMENTO-A-v1.md` (sistema de 4 pilares con puntos enteros absolutos, piso 1-1-1-8, Faros por Tiempo y Faros por Monto).
  - `UPROTA-MUNDO-DOCUMENTO-B-v1.md` (bioenergía a pedal/manivela, herramientas deplorables, peso de bolsa real).
  - `UPROTA_Objetos_Sabiduria_Diaria.md` (Don Chui, Biblia y tope de 3 activos).
  - `UPROTA_Convencion_Assets.md` (estándar `snake_case` para Aseprite).
