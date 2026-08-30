## 1. ESTRUCTURA Y CATEGORÍAS DE MISIONES

### Reglas Generales:
- El jugador puede realizar **1 sola misión de expedición o recolección por día real**.
- La misión dura 24 horas asíncronas. Al regresar, el Prota entrega una **bitácora narrativa** y el botín recogido automáticamente priorizado por valor y peso soportado por su bolsa.

### Categorías de Misión:
1. **Tipo B (Recolección Fija — Sin Riesgo):** Asegura recursos vitales básicos (madera, agua, yesca, áridos, trampeo).
2. **Tipo A (Exploración Aleatoria — Con Riesgo):** Saqueo de ruinas del viejo mundo para botín raro, chatarra noble y herramientas.
3. **Tipo S (Misiones Especiales de Contingencia — Semanales):** Misiones temporales activadas por los Eventos Semanales del Refugio:
   - **🛡️ S-Preventivas:** Desbloqueadas por avisos de radio antes de una tormenta, helada o asedio para mitigar daños.
   - **🛠️ S-Correctivas / Salto Evolutivo:** Proyectos de obra rápida tras un golpe o adversidad que desbloquean mejoras permanentes o Faros (ej. *Alacena Colgante* tras *El Rincón Royido* $\rightarrow$ *Faro de Ahorro*).


---

## 2. MISIONES TIPO B: RECOLECCIÓN FIJA (SIN RIESGO)
*Zonas seguras conocidas del entorno inmediato. No hay riesgo de herida ni eventos hostiles. Ideales para garantizar suministros básicos.*

| ID | Nombre | Desbloqueo | Rendimiento Base | Peso Aprox. | Bitácora Narrativa Típica |
|---|---|---|---|---|---|
| `mis_b1_madera` | **Bosquecito detrás del cerro** | Nivel 0 | 1 a 4 Tablas sueltas (`item_tablas`) | 2.4 - 4.8 kg | *«Caminé hasta la arboleda seca detrás del cerro. Rescaté varios tablones caídos de un viejo corral; la madera está reseca pero servirá para apuntalar.»* |
| `mis_b2_agua` | **Riachuelo de la quebrada** | Nivel 0 | 5 a 15L Agua turbia (`recurso_agua_turbia`) | 5.0 - 15.0 kg | *«Bajé a la quebrada con las botellas y la cubeta. El agua corre fría pero terrosa. Requiere pasar por el filtro de carbón y hervir antes de beber.»* |
| `mis_b3_lena` | **Monte bajo y rastrojo** | Nivel 0 | 3 a 6kg Leña seca y yesca (`item_yesca_natural`) | 3.0 - 6.0 kg | *«Junté ramas de mezquite seco y corté paja amarilla para el nido de yesca. La lumbre de esta noche está asegurada.»* |
| `mis_b4_aridos` | **Banco de arena del arroyo** | Nivel 1 | 4 a 10kg Arena gruesa y grava | 4.0 - 10.0 kg | *«Cribé arena gruesa de río y junté guijarros lisos para las capas del filtro PET y el barro del horno.»* |
| `mis_b5_trampeo` | **Vereda de conejos del matorral** | Nivel 2 (Tomo II) | 1 a 2 Presas menores + grasa animal | 1.5 - 3.0 kg | *«Revisé los lazos de alambre al amanecer. Una liebre cayó en la vereda sur. Se aprovechó la carne para salar y el sebo para velas.»* |

---

## 3. MISIONES TIPO A: EXPLORACIÓN ALEATORIA CON RIESGO (ESCALADAS POR NIVEL)
*Lugares del viejo mundo con probabilidad de botín raro, herramientas y trueque. Requieren preparación (agua, botas, vendas). Existe probabilidad de herida leve si se va sin equipo.*

---

### 🏕️ NIVEL 0 - 1: Los Alrededores Inmediatos

#### Misión A0.1 — "Casas del Camino Viejo"
* **Ubicación:** Un par de casas rurales a medio derruir junto a la carretera cuarteada.
* **Tabla de Botín Probable:** Clavos oxidados, alambre recocido, trapos de algodón, botella PET, cuchillo de cocina mellado.
* **Loot Raro (5%):** Sal gruesa en frasco sellado, lata de sardinas caducada.
* **Bitácora:** *«Caminé con sigilo entre los cuartos llenos de escombros. El techo de una cocina cedió hace tiempo, pero en un cajón trabado encontré clavos y alambre. El camino de regreso estuvo tranquilo.»*

#### Misión A0.2 — "Cobertizo del Huerto Abandonado"
* **Ubicación:** Estructura de lámina y madera comida por el sol.
* **Tabla de Botín:** Madera de palet, tornillos, pedazo de lona, tijeras de podar oxidadas.
* **Riesgo:** Pisar una tabla con clavo oxidado si no se llevan botas reforzadas.

---

### 🪵 NIVEL 2 - 3: El Radio de 5 Kilómetros

#### Misión A2.1 — "Taller Mecánico en la Curva"
* **Ubicación:** Taller de pueblo con carros desmantelados y fosas llenas de agua estancada.
* **Tabla de Botín:** Cables de cobre pelados, resortes de acero, aceite de motor quemado para herramientas, lima gastada.
* **Loot Raro:** Martillo de bola o alicate (30% eficiencia), bujía vieja (cerámica para cortar vidrio).
* **Bitácora:** *«El olor a aceite viejo y chapa oxidada sigue pegado al suelo. Desarmé el cableado de una camioneta para sacar hilo de cobre. Escuché ladridos de perros salvajes a lo lejos y apuré el paso.»*

#### Misión A2.2 — "La Tienda de Abarrotes Saqueada"
* **Ubicación:** Local comercial con rejas forzadas.
* **Tabla de Botín:** Vidrio plano de ventana, latas vacías, costal de arpillera roto.
* **Loot Raro:** Café soluble en frasco oscuro (+10 Moral), encendedor gastado con piedra viva.

---

### 🧭 NIVEL 4 - 5: Las Instalaciones Agroindustriales

#### Misión A4.1 — "Silos de Grano y Molino Abandonado"
* **Ubicación:** Complejo industrial de almacenamiento de maíz con techos altos de zinc.
* **Tabla de Botín:** Cadenas de transmisión, poleas, láminas de zinc dobladas, tubos de PVC para canaletas.
* **Loot Raro:** Bici vieja con llanta ponchada (12kg — base de bioenergía), generador/dínamo de ventilador.
* **Bitácora:** *«Subí con cuidado por las escaleras de gato oxidadas del silo. Entre la chatarra del cuarto de máquinas rescaté una bicicleta rígida y un motorcito eléctrico. El peso en la espalda fue brutal, pero valió cada gota de sudor.»*

#### Misión A4.2 — "Puesto de Socorro del Cruce"
* **Ubicación:** Campamento de triaje militar temporal abandonado hace 3 años.
* **Tabla de Botín:** Vendas de gasa, frascos de alcohol isopropílico, tijeras quirúrgicas melladas, ferrocerio sin abrir.
* **Riesgo:** Suelo con restos de cristales y alambre de púas.

---

### 🧱 NIVEL 6 - 7: Las Zonas de Frontera y Quebradas

#### Misión A6.1 — "Puente de Ferrocarril Caído"
* **Ubicación:** Vías de tren colapsadas sobre el cañón seco.
* **Tabla de Botín:** Pernos de durmiente, varillas de construcción, cables de acero grueso.
* **Loot Raro:** Celda de litio 18650 recuperable, panel solar pequeño de señalización (10W).
* **Bitácora:** *«El viento en el cañón soplaba con fuerza. Me colgué de los durmientes para desatornillar una placa de acero. Vi huellas de calzado militar reciente; no fui el único que anduvo por aquí hoy.»*

#### Misión A6.2 — "Campamento Minero de la Sierra"
* **Ubicación:** Minas de cantera y calicanto abandonadas.
* **Tabla de Botín:** Piedras de afilar naturales, carbón de coque, picos y barras de hierro.
* **Loot Raro:** Saco de sal gema pura de mina (5kg).

---

### 🏛️ NIVEL 8 - 10: Los Centros Urbanos Periféricos

#### Misión A8.1 — "Subestación Eléctrica del Norte"
* **Ubicación:** Estación de transformación de alta tensión desmantelada.
* **Tabla de Botín:** Bobinas de cobre grueso, aisladores de cerámica, transformadores vacíos.
* **Loot Raro:** Batería de ciclo profundo con celdas vivas, multímetro análogo funcional.
* **Bitácora:** *«Entrar a la subestación es como caminar por el esqueleto de un gigante muerto. Pude rescatar cobre puro de los transformadores sin activar ningún derrumbe.»*

#### Misión A10.1 — "El Vivero de la Isla / Zona Experimental"
* **Ubicación:** Instalaciones agronómicas de invernaderos de cristal templado.
* **Tabla de Botín:** Semillas de hortalizas selladas al vacío, mallas de sombreo, herramientas de forja templada.
* **Loot Raro:** Reliquias del Proyecto Edén (partituras, registros de la botánica antigua).
