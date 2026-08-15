# UPROTA BETA v1.0 MVP - TERMO MÍNIMO NARRATIVO
## Solo relato, seguimiento y emojis - Sin pixel art, sin postales, sin gráficas refugio
**Fecha:** 04 Agosto 2026
**Objetivo:** Versión que Joshua puede probar mañana mismo - 100% usable en 2 días de código
**Filosofía:** Si la narrativa + checklist con fecha real funciona, el pixel art después es adorno. Si no funciona sin gráficos, con gráficos tampoco funcionará.

---

## I. QUÉ INCLUYE ESTA BETA Y QUÉ NO

### INCLUYE (Lo esencial para validar):
- PWA <50KB que se instala como app y funciona offline
- Tablón con 3 Sendas + 2 Cadenas con frecuencia configurable (diario, 2x/semana como trotar, personalizado)
- Checklist diario con metadatos reales fecha/hora equipo (timestamp no editable)
- Cimientos vivos con integridad 0-100% + Lunes de Mantenimiento 10 seg
- Cadenas con puente que tiembla: 1-2 recaídas mes = "tabla tembló pero puente sigue", 3+ = vuelve a Tablón Nivel 2 sin culpa
- Faros numéricos con tabla datos + mensajes escalada si sube/baja
- Pilares preocupación opcional (ventana después checklist)
- Motor invisible 4 capas completo (exacta, sinónimo, semillas, territorio inexplorado) para traducir checklist a lenguaje Yermo
- Recursos xN con emojis: 🪵 x12, 🥕 x7, 🔩 x15, 💧 x5, 📜 x2, 🔥 x2, 🌱 x3
- Refugio narrativo sin gráfica: Solo texto que describe nivel + emojis
- Eventos Tier 0-1 (zorro, saqueador solitario, niño perdido) con narrativa y decisiones que cambian recursos, sin gráfica
- El Hogar + Punto Cero sin culpa
- Posibilidad de bautizar Senda/Cadena/Faro no planteado (Scribblenauts)

### NO INCLUYE (Para después de validar):
- Pixel art con cadenas 16x16 técnica xem (se usará emoji 🥕 en vez de string)
- Kitbashing refugio con 15 piezas (se usa texto narrativo + emoji 🏚️ -> 🏡 -> 🏘️)
- Fotos evidencia opcional
- Postales verticales antes/después
- Postales evento Luna de Sangre instagrameables
- Bancos de trabajo (Carpintería, Herrería) - en Beta solo texto "Desbloqueaste capacidad de hacer pozo"
- NPCs herrero/médico/veterinario con bonus (en Beta solo narrativa "llegó herrero, te dejó herramienta")
- Gráficas, canvas, animaciones
- ASCII art (opcional si quieres, pero ni necesario)

Peso Beta: <50KB. Un HTML, un JS, un CSS, un SW. Nada más.

---

## II. STACK BETA - ULTRA MÍNIMO

```
/index.html (5KB)
/app.js (30KB) - todo: checklist + metadatos + motor + eventos Tier0-1 + narrativa
/style.css (3KB) - pergamino café, tipografía legible
/sw.js (1KB) - offline cache-first
/manifest.json (1KB)
/total 40KB
```

Mismo SW que mega, mismo IndexedDB idb-keyval, pero solo 4 tablas: diccionario, progreso, habitos, eventos.

---

## III. FLUJO DIARIO BETA - 20 SEGUNDOS

1. Abre app (captura automática):
```js
const ahora = new Date();
const meta = {
  fecha: ahora.toISOString().split('T')[0], // 2026-08-04
  timestamp: ahora.toISOString(), // 2026-08-04T23:15:00-07:00
  diasDesdeInicio: Math.floor((ahora - fechaInicio)/86400000) // Día 23
};
```

2. Pantalla Tablón Checklist (ejemplo real tuyo):

```
UPROTA - Día 23 - 04 Agosto 2026

SENDAS (Marca lo que cumpliste hoy - frecuencia que elegiste)
[✓] 🏃 Patrullar perímetro (Trotar 20min) - 2x/semana - Cuerpo - Racha 12 días
[ ] 📜 Estudiar planos (Leer 15min) - 3x/semana - Mente - 4/6 esta semana
[✓] 🔥 Mantener fuego (Meditar 10min) - Diario - Espíritu - 20 días

CADENAS (Marca si caíste - honestidad)
[ ] 🚭 Purificar aire (No fumar) - 0 recaídas este mes
[✓] 🥤 Caí en Refresco - 1 recaída - 02 Ago 21:00

-> Al marcar ✓ Trotar:
Animación texto: +🥕 x3 +💧 x1
Texto Yermo: "Patrullaste perímetro bajo sol de Hermosillo, 20min. El sendero se marca un poco más."
Barra progreso Senda: [████░░░░] 12/66 días para forjar (frecuencia 2x/semana = 24 checks necesarios)

-> Al marcar Caí Refresco:
Guarda: {fecha:2026-08-04, hora:15:30, cadena:"Refresco", nota opcional:""}
Texto Hogar inmediato: "Tabla del puente tembló. Una se rompió, pero el puente sigue. 1 recaída este mes. Si mañana no caes, se refuerza solo."
```

3. Opcional Cimientos (si tiene):

```
CIMIENTOS - Mantenimiento (2x/semana basta para 100%)
[ ] 🏃 Sendero marcado (Trotar) - 100% - Último check 02 Ago
(Aparece completo solo Lunes - Lunes de Mantenimiento 10 seg)
```

4. Opcional Pilares:

```
PILARES - ¿Preocupación hoy? (Opcional 10 seg)
[ ] Salud [ ] Trabajo [ ] Familia [ ] Otro
[Escribe breve]: "Preocupado luz"
-> Mensaje Hogar: "Anotado. Preocuparse es humano. Tu refugio tiene cisterna para días secos."
```

5. Opcional Faros numéricos:

```
FAROS - ¿Actualizar datos?
Faro: Ahorrar $5000 - $2000/$5000 [████░░░░] 40% - Última 01 Ago
Nuevo monto: [____] 2500
-> Si subió: "¡Avance! De $2000 a $2500 +$500 en 3 días. Tu refugio caja fuerte +$500. +5 🔩"
-> Si bajó: "De $2000 a $1500 -500. A veces hay que hacer pausas en escalada, usar provisiones para reparar puente. Lo importante es volver a escalada. No es retroceso."
```

6. Cierre narrativa refugio (sin gráfica, solo texto + emoji):

```
REFUGIO - Nivel 2 - Refugio Asegurado
🏚️ -> 🏡 (emoji evoluciona por nivel)

Descripción narrativa que cambia con recursos:
"Tu refugio tiene 4 paredes de tarima reforzadas con 20 tablas que juntaste lavando platos y ordenando. Puerta con candado de 10 clavos que conseguiste vendiendo cosas. Ventana con plástico. Gallinero chico con 2 gallinas. Pozo aún no, necesitas 30 tablas más y forjar trotar.

Recursos hoy:
🪵 Tablas x23 (20 para Nivel 2, te faltan 7 para pozo)
🥕 Provisiones x18 (de trotar)
🔩 Clavos x12
💧 Agua x8

El Yermo hoy: Calor de 45°C, pero tu cisterna tiene 8. El zorro no vino."

Si toca evento Tier0-1:
"EVENTO: Noche del Zorro - Un zorro merodeó gallinero. Como no tienes cerca alambre (necesitas 15 clavos), se llevó 1 gallina. Te quedan 1. El refugio aguantó. ¿Quieres reforzar cerca? [Ver qué necesitas]"
Decision: No castigo total, narrativa + pérdida pequeña.
```

Tiempo total: 20 seg solo checklist, 1 min con faro y pilar.

---

## IV. MOTOR INVISIBLE BETA - EJEMPLO REAL CON CHECKLIST

Aunque ahora es checklist, el motor sigue traduciendo para dar texto épico.

Tabla diccionario Beta mínima (10 exactas + 10 sinónimos + semillas):

```
Exactas:
"lavar platos" -> {recurso: tablas:2, yermo:"Purificaste utensilios del clan", cat:hogar}
"trotar 20min" -> {recurso: provisiones:3 agua:1, yermo:"Patrullaste perímetro", cat:cuerpo}
"leer 15min" -> {recurso: planos:2, yermo:"Estudiaste planos antiguos", cat:mente}
"meditar 10min" -> {recurso: moral:2, yermo:"Mantuviste fuego encendido", cat:espiritu}
"no fumar" -> {recurso: clavos:2, yermo:"Purificaste aire del refugio", cat:cuerpo}

Sinónimos:
"fregar trastes" = "lavar platos"
"trotar" = "trotar 20min"
"correr" = "trotar 20min"
"leer libro" = "leer 15min"
...

Semillas:
plato,traste,ropa,cama,barrer -> hogar
correr,trotar,caminar,gym,agua,dormir -> cuerpo
leer,libro,estudiar,idioma -> mente
orar,meditar,gratitud -> espiritu
vender,ahorrar,presupuesto -> finanzas
```

Flujo: Usuario bautiza Senda "Trotar 20min" frecuencia 2x/semana. Desde entonces, cada vez que marca ✓ en esa Senda, motor busca "trotar 20min" en exactas, da recurso y texto épico.

Si bautiza nueva "Tocar ukulele 15min" frecuencia 3x/semana Nombre Yermo "Afinar cuerdas del bardo" Recurso Moral x2 -> Se guarda en diccionario personal:

```
"tocar ukulele" -> {yermo:"Afinar cuerdas del bardo", recurso: moral:2, cat:espiritu, creador:usuario}
```

Desde ahora cada check da "Afinar cuerdas del bardo" + 🔥 x2.

Fase Scribblenauts intacta, pero sin escribir diario, solo al bautizar.

---

## V. REFUGIO NARRATIVO SIN GRÁFICAS - EJEMPLO NIVELES

Nivel 0 Punto Cero:
```
🏚️ PUNTO CERO - Día 1
"4 paredes tarima, techo lámina, saco semillas, 2 gallinas 🐔🐔. Punto desde donde siempre se puede reconstruir. Ya sabes cómo."
Recursos: 🪵 x0 🥕 x0
```

Nivel 1 (10 tablas):
```
🏚️ REFUGIO BÁSICO
"Paredes aún frágiles pero en pie. 10 tablas de lavar platos. Gallinas con miedo pero vivas."
```

Nivel 2 (20 tablas + 10 clavos + 1 Senda racha 14d):
```
🏡 REFUGIO ASEGURADO - Día 14
"Puerta con candado, ventana plástico, gallinero chico. 20 tablas + 10 clavos que juntaste. El zorro ya no entra tan fácil."
Desbloquea texto: "Ahora puedes cavar pozo (necesitas 30 tablas más y 1 Hábito Forjado)"
```

Nivel 3 (30 tablas + Pozo + 1 Cimiento):
```
🏡+💧 REFUGIO AUTOSUFICIENCIA - Día 66
"Pozo de piedras que cavaste con pala (20 clavos). 2 surcos zanahoria que riegas con agua de trotar. Camino marcado de tanto patrullar perímetro (Trotar forjado). Un habitante llegó: herrero que te dejó herramienta."
Recursos pasivos: +1 🥕 cada 7 días si mantienes riego (check trotar)
```

Nivel 4 (50 tablas + 30 alambre + 2 Cimientos):
```
🏘️ FORTALEZA HUMILDE - Día 100
"Cerca alambre púas que trenzaste con 30 clavos. Cisterna lluvia. 2 surcos + compostero. 2 Cimientos: Trotar y Leer. Tu refugio se ve a lo lejos, por eso llegan caravanas."
```

Todo texto + emojis. Nada de canvas. Si el texto funciona, el pixel art después solo lo hace más bonito, pero no es necesario para validar.

Opcional ASCII art si quieres darle toque Yermo con caracteres (como dices "assic"):

```
Opcional ASCII refugio nivel 2:
  /\
 /__\
 |  |
 |__|
 + gallinero

Pero no obligatorio. Con emoji basta para Beta.
```

---

## VI. EVENTOS BETA - SOLO TIER 0-1 - NARRATIVA PURA

Tier 0 Días 1-7:
- Noche del Zorro: "Zorro merodeó, sin cerca alambre se llevó 1 gallina 🐔 -> 🐔. El refugio aguantó. Necesitas 15 clavos para cerca."
- Lluvia Bendita: "Llovió 5mm. Cisterna +5 💧. Buen día."

Tier 1 Días 7-21 Requisito 1 Senda racha 14d + 20 tablas:
- Saqueador Solitario: "Llegó hombre flaco pide 3 provisiones. ¿Compartir? [Sí -3 🥕 +moral +info pozo] [No -0 +0]"
- Niño del Camino: "Niño 10 años perdido pide dirección a siguiente asentamiento. Guiarlo te toma 1 día (no avanza Senda hoy pero +alianza futura). ¿Ayudar? [Sí] [No]"

Decisiones guardan en tabla eventos con fecha real. Nunca dejan en 0. Siempre "Refugio aguantó".

Nombres épicos ya desde Beta: "Noche del Zorro", "Saqueador Solitario" para que suene a Terraria Luna Sangrienta desde inicio.

---

## VII. FRECUENCIA CONFIGURABLE EN BETA - CLAVE

Al bautizar, elegir frecuencia. Es lo que hace que puedas trotar 2x/semana y no fallar.

Interfaz Beta bautizar:
```
Nueva Senda:
¿Qué harás? [Trotar 20min]
Frecuencia: [Diario v] [2x/semana] [3x/semana] [Personalizado Lun Mie Vie]
Nombre Yermo (sugerido): [Patrullar perímetro] 
Recurso: [🥕 x3]
Icono: [🏃]
[Crear Senda - Ocupa 1 espacio - Tablón 2/3]
```

Cálculo Beta con metadatos:
- Si elige 2x/semana, semana es Lun-Dom, espera 2 checks. Si hace 2, 100%. Si hace 1, 50%.
- Forjado: 10 semanas con >75% cumplimiento = 66 días aprox.

---

## VIII. PLAN CONSTRUCCIÓN BETA v1 - 1 SEMANA REAL

Día 1-2: index.html + app.js checklist + metadatos fecha/hora + frecuencia + IndexedDB 4 tablas + SW offline
Día 3: Motor 4 capas + diccionario 20 entradas + bautizar Senda con frecuencia + recursos xN emoji
Día 4: Cimientos vivos + Lunes Mantenimiento + Cadenas puente que tiembla + Faros tabla datos mensajes escalada
Día 5: Refugio narrativo texto + niveles 0-3 + eventos Tier0-1 + El Hogar + Punto Cero
Día 6: Probar tú mismo 3 días con tus hábitos reales (trotar 2x/semana, leer, meditar) y ajustar textos
Día 7: Compartir link GitHub Pages a 2 personas cercanas para feedback: ¿Entienden que su refugio crece por su esfuerzo real? ¿Les dan ganas de hacer check?

Peso final Beta: 40KB. Carga instantánea. Funciona en avión.

Si Beta funciona (tú la usas 14 días y te dan ganas de trotar para ver +🥕 x3), entonces pasamos a v1.2 con pixel art y postales.

---

## IX. NOTA FINAL BETA

Esta Beta no tiene gráficas de refugio, no tiene pixel art cadenas, no tiene fotos, no tiene postales. Solo tiene lo que importa:

- Checklist 20 seg con fecha/hora real que no engaña
- Frecuencia configurable 2x/semana como tú necesitas
- Recursos emoji xN que dan dopamina inmediata + texto épico Yermo
- Refugio narrativo que crece solo si tú creces en vida real (imposible pagar)
- Eventos con nombres épicos que hacen que tu vida real se sienta aventura
- Cimientos que pueden temblar pero puente sigue (no culpa)
- Faros con mensajes escalada (si sube felicitación, si baja "pausa en escalada")

Si esto engancha, el resto es cosmética que ya sabemos hacer con técnica xem 30 chars por icono.

Fin BETA v1.0 MVP - Lista para picar hoy.
