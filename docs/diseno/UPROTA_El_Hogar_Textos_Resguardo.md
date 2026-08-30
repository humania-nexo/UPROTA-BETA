# El Hogar — Sistema de Resguardo, Validación y Psicología de Hábitos
### Documento de Diseño Maestro — UPROTA
**Vincula: Documento A (Núcleo) + Documento B (Mundo)**

---

## 1. PRINCIPIO PSICOLÓGICO: AUTOCOMPASIÓN RADICAL SIN CULPA

En la mayoría de aplicaciones de hábitos, romper una racha se acompaña de pantallas rojas, números que se reinician a cero y una sensación punitiva de fracaso. La psicología moderna del comportamiento demuestra que la **culpa destructiva fomenta el abandono total** del hábito (el efecto *"de perdidos al río"*).

En UPROTA:
1. **Caerse es parte del camino:** No existe el castigo de recursos.
2. **El "Puente que Tiembla":** 1 o 2 recaídas aisladas en una Cadena no rompen el progreso acumulado; solo se anota como un "temblor".
3. **El Hogar:** Cuando ocurren 3 fallos consecutivos en una Senda o 3 recaídas consecutivas en una Cadena, no se bloquea la app con dureza: se abre **El Hogar**.

---

## 2. LA ESTRUCTURA DE LAS 4 CAPAS DE EL HOGAR

```
+---------------------------------------------------------------------------------------------------+
|                                      LAS 4 CAPAS DE EL HOGAR                                      |
+---------------------------------------------------------------------------------------------------+
|  1. VALIDACIÓN RADICAL:  Reconoce el cansancio, la falta de sueño o el estrés sin juzgar.         |
|  2. EVIDENCIA OBJETIVA:  Muestra el progreso acumulado real (ej. "Esta semana llevas 4 de 7").   |
|  3. LUZ PRESTADA:        Aliento sobrio y compasivo para volver a intentarlo mañana.              |
|  4. SABIDURÍA PRESTADA:  Filosofía estoica adaptada al Yermo (Séneca, Marco Aurelio, Epicteto).   |
+---------------------------------------------------------------------------------------------------+
```

---

## 3. BANCO DE TEXTOS MODULARES POR CAPA

### Capa 1: Validación Radical (Empatía con el Contexto)
- *"Tiene sentido que hoy costara, Prota. El cuerpo no es una máquina de fierro y el cansancio acumulado pasa factura."*
- *"Reconocer con honestidad que hoy no se pudo es un acto de valentía mucho mayor que engañarse a uno mismo."*
- *"Hay días en que el viento sopla de frente y apenas da para sostener las cuatro tablas del refugio. Es normal."*
- *"El estrés de la jornada pesa más que una mochila llena de grava. Escuchar el límite de tus fuerzas no es debilidad."*
- *"Una recaída no borra lo aprendido. El sendero sigue ahí bajo la maleza; solo hay que volver a pisarlo."*

---

### Capa 2: Evidencia Objetiva (Mirada Longitudinal)
- *"Mira hacia atrás en tu bitácora: hace 21 días ni siquiera te atrevías a marcar este hábito. Hoy ya llevas más del 60% de días firmes."*
- *"Un día nublado no significa que el sol se haya apagado. Esta semana acumulaste 4 victorias de 7 intentos."*
- *"El hábito no se destruye en 24 horas. Los cimientos que ya forjaste siguen soportando el peso de tu refugio."*

---

### Capa 3: Luz Prestada (Aliento Sobrio y Cálido)
- *"No necesitas hacer una hazaña perfecta mañana. Solo necesitas presentarte al tablón y dar un paso chico."*
- *"El fuego del refugio no se extingue por una noche sin leña grande; las brasas siguen calientes bajo la ceniza."*
- *"Tómate un té caliente de manzanilla, descansa el cuerpo y deja que la noche pase. Tu refugio te espera cuando despiertes."*
- *"La constancia no es no caerse nunca; es el hábito silencioso de levantarse y volver a afilar la herramienta."*

---

### Capa 4: Sabiduría Prestada (Pensadores Estoicos en Tono Yermo)

#### De Séneca:
> *«No nos atrevemos porque las cosas son difíciles en el monte; son difíciles porque no nos atrevemos a dar el primer paso cada amanecer.»*

> *«A menudo sufrimos más por los monstruos que imaginamos en la oscuridad que por las piedras reales que encontramos en el camino.»*

> *«Un árbol que nunca sintió el viento no echa raíces hondas. Las tormentas prueban la madera de tu carácter.»*

#### De Marco Aurelio:
> *«El obstáculo en el sendero se convierte en el sendero mismo. Lo que parecía frenar tu avance es lo que te enseñará a caminar más firme.»*

> *«Al despertar por la mañana, recuerda qué privilegio tan valioso es estar vivo: respirar, pensar, trabajar con las manos y volver a empezar.»*

> *«No te distraigas con lo que otros hacen o dejan de hacer en su parcela. Cuida tu propio cerco, limpia tu fogón y mantén tu palabra.»*

#### De Epicteto:
> *«No son las lluvias ni los derrumbes exteriores lo que perturba al hombre, sino el juicio que él mismo hace sobre su capacidad de resistirlos.»*

> *«Si quieres ser un buen carpintero, haz cosas de carpintero todos los días. Si quieres ser libre de una cadena, no alimentes al eslabón hoy.»*

---

## 4. INTEGRACIÓN EN CÓDIGO (DATASETS)

Todos estos textos están centralizados en `js/data/frases_estoicas.js` para ser consumidos dinámicamente por el módulo `js/modulos/hogar.js` según el contexto del jugador.
