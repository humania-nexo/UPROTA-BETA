# Sistema de Micro-Journaling y Cápsulas de Tiempo: "El Cuaderno del Náufrago"
### Documento Maestro de Psicología de Hábitos y Registro Íntimo — UPROTA
**Vincula: `UPROTA_El_Hogar_Textos_Resguardo.md` + `docs/diseno/UPROTA-NUCLEO-DOCUMENTO-A-v1.md`**

---

## 1. PROPÓSITO PSICOLÓGICO: EL VALOR DE NOMBRAR LA EXPERIENCIA

En el camino de la autodisciplina y la reconstrucción personal, los dos mayores riesgos son la **amnesia del esfuerzo** (olvidar lo que costó llegar aquí cuando viene la pereza) y la **rumiación tóxica** (castigarse en silencio al acostarse).

El **Cuaderno del Náufrago** es un módulo íntimo dentro de **El Hogar** diseñado bajo tres principios fundamentales:
1. **Fricción Cero (Micro-Journaling):** No exige ensayos largos. Se compone de 3 líneas o una sola frase honesta antes de apagar la pantalla.
2. **Cápsulas de Tiempo al Yo del Futuro:** Cartas selladas al iniciar Cimientos (66 días) o Faros (180 días) que se abren como un abrazo del pasado.
3. **Persistencia 100% Local y Privada:** Se guarda en `IndexedDB` local; ningún texto sale del dispositivo del usuario.

---

## 2. ESTRUCTURA DEL SISTEMA EN EL HOGAR

```
 ┌────────────────────────────────────────────────────────────────────────────────────────┐
 │                              EL CUADERNO DEL NÁUFRAGO (MODAL)                          │
 ├────────────────────────────────────────────────────────────────────────────────────────┤
 │  📖 PESTAÑA 1: "La Brasa de Hoy" (Micro-Journaling Nocturno de 3 Líneas)               │
 │     • Disparador reflexivo rotativo (ej. "¿Qué leño pusiste hoy para sostener tu fuego?")│
 │     • 3 campos breves / 1 área de texto sobria (máx. 280 caracteres).                  │
 │     • Botón ceremonial: [Guardar en el Cuaderno].                                      │
 │                                                                                        │
 │  ✉️ PESTAÑA 2: "Cápsulas de Tiempo" (Cartas al Yo del Futuro)                           │
 │     • Baúl de cartas selladas asociadas a Cimientos y Faros activos.                   │
 │     • Estado: 🔒 [Sellada hasta el Día XX] / 🔓 [Lista para Abrir].                    │
 │                                                                                        │
 │  📜 PESTAÑA 3: "El Libro de la Travesía" (Historial de Páginas y Ecos)                 │
 │     • Vista cronológica de reflexiones pasadas ordenadas por fecha y estación.        │
 │     • Botón de exportación limpia en texto/Markdown para el usuario.                   │
 └────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. BANCO DE DISPARADORES REFLEXIVOS DE "LA BRASA DE HOY" (30 DÍAS ROTATIVOS)

Los disparadores se seleccionan según la estación y el momento del día:

1. *«¿Qué pequeño esfuerzo hiciste hoy que nadie vio, pero que te hizo sentir digno?»*
2. *«Si hoy diste un paso en falso, ¿con qué palabra de compasión vas a cerrar la noche?»*
3. *«¿Qué leño pusiste hoy en tu fogata para que tu mente no pase frío?»*
4. *«Nombra una sola cosa simple por la que hoy valió la pena estar vivo.»*
5. *«¿Qué peso que no te correspondía cargar lograste soltar hoy?»*
6. *«¿Cómo respondió tu cuerpo hoy al esfuerzo físico, y qué agradeces de él?»*
7. *«¿Qué aprendiste hoy en el taller de tus propios errores?»*
8. *«Cuando miraste el horizonte al atardecer, ¿qué pensamiento te trajo calma?»*

---

## 4. LA MECÁNICA DE LAS CÁPSULAS DE TIEMPO

### Al Fundar un Cimiento (66 días):
1. Al activar un Cimiento de 66 días (ej. *Trote Matutino*, *Lectura Diaria*, *Ahorro Disciplinado*), se abre una ventana opcional:
   > *«Escríbele unas palabras a quien serás dentro de 66 días. Cuéntale por qué estás encendiendo este fuego hoy y qué esperas que no olvide.»*
2. El mensaje se encripta y se guarda con estado `bloqueado: true` en `IndexedDB`.
3. **El Día de la Victoria (Día 66):** Al completarse el Cimiento, la UI detona el evento *"La Apertura del Baúl"*:
   - La carta se revela con tipografía manuscrita y partículas doradas.
   - Viene acompañada de una nota de felicitación de Don Chui o Elena.

### Al Fundar un Faro Semestral (180 días):
- Carta de largo alcance donde el usuario consigna sus promesas más sagradas.
- Al abrirse en el Día 180, otorga **+3 Espíritu** y un trofeo conmemorativo en el Refugio.
