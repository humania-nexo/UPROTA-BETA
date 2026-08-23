/**
 * Catálogo Oficial de Botín del Yermo (110 Objetos)
 * Veracidad Material: Año 3 tras el Colapso (Zona rural universal)
 * Categorías: Común (60%), Poco común (25%), Raro (10%), Muy raro y trueque (5%)
 */

export const CAT_BOTIN = {
  COMUN: 'comun',
  POCO_COMUN: 'poco_comun',
  RARO: 'raro',
  MUY_RARO: 'muy_raro_trueque'
};

export const ITEMS_BOTIN = [
  // --- COMUNES (60% probabilidad) ---
  { id: 'item_001', nombre: 'Clavos oxidados', categoria: CAT_BOTIN.COMUN, pesoKg: 0.5, valorTrueque: 1, desc: 'Clavos sueltos rescatados de maderas podridas.' },
  { id: 'item_002', nombre: 'Tornillos surtidos', categoria: CAT_BOTIN.COMUN, pesoKg: 0.3, valorTrueque: 1, desc: 'Fijaciones metálicas variadas.' },
  { id: 'item_003', nombre: 'Alambre recocido (metro)', categoria: CAT_BOTIN.COMUN, pesoKg: 0.2, valorTrueque: 2, desc: 'Útil para amarrar mangos y reforzar cercos.' },
  { id: 'item_004', nombre: 'Cuerda plástica desgastada', categoria: CAT_BOTIN.COMUN, pesoKg: 0.4, valorTrueque: 1, desc: 'Trozos de soga recuperados de tendederos.' },
  { id: 'item_005', nombre: 'Retazos de tela gruesa', categoria: CAT_BOTIN.COMUN, pesoKg: 0.3, valorTrueque: 1, desc: 'Trapos limpios para remiendos y yesca.' },
  { id: 'item_006', nombre: 'Botella PET vacía (2L)', categoria: CAT_BOTIN.COMUN, pesoKg: 0.1, valorTrueque: 1, desc: 'Base perfecta para fabricar filtros de agua.' },
  { id: 'item_007', nombre: 'Cubeta de pintura vieja', categoria: CAT_BOTIN.COMUN, pesoKg: 0.8, valorTrueque: 2, desc: 'Contenedor resistente para transportar agua o arena.' },
  { id: 'item_008', nombre: 'Tabla de pino suelta', categoria: CAT_BOTIN.COMUN, pesoKg: 1.2, valorTrueque: 1, desc: 'Madera de recuperación para paredes y camas.' },
  { id: 'item_009', nombre: 'Tablón de obra grueso', categoria: CAT_BOTIN.COMUN, pesoKg: 2.5, valorTrueque: 2, desc: 'Madera maciza para reforzar estructuras.' },
  { id: 'item_010', nombre: 'Yesca de aserrín seco', categoria: CAT_BOTIN.COMUN, pesoKg: 0.2, valorTrueque: 1, desc: 'Virutas secas para iniciar fuego.' },
  { id: 'item_011', nombre: 'Cartón seco corrugado', categoria: CAT_BOTIN.COMUN, pesoKg: 0.3, valorTrueque: 1, desc: 'Combustible rápido y aislante térmico.' },
  { id: 'item_012', nombre: 'Piedras de río redondeadas', categoria: CAT_BOTIN.COMUN, pesoKg: 1.5, valorTrueque: 1, desc: 'Para armar fogones y retener calor.' },
  { id: 'item_013', nombre: 'Arena gruesa de río', categoria: CAT_BOTIN.COMUN, pesoKg: 2.0, valorTrueque: 1, desc: 'Capa filtrante para purificación de agua.' },
  { id: 'item_014', nombre: 'Grava fina', categoria: CAT_BOTIN.COMUN, pesoKg: 2.0, valorTrueque: 1, desc: 'Primera capa en trampas de sedimentos.' },
  { id: 'item_015', nombre: 'Carbón vegetal apagado', categoria: CAT_BOTIN.COMUN, pesoKg: 0.5, valorTrueque: 2, desc: 'Carbón poroso para absorber olores e impurezas.' },
  { id: 'item_016', nombre: 'Cinta gris adhesiva gastada', categoria: CAT_BOTIN.COMUN, pesoKg: 0.2, valorTrueque: 2, desc: 'Unas pocas vueltas restantes de cinta multiusos.' },
  { id: 'item_017', nombre: 'Lata de refresco aplastada', categoria: CAT_BOTIN.COMUN, pesoKg: 0.05, valorTrueque: 1, desc: 'Aluminio maleable para reflectores o yesqueros.' },
  { id: 'item_018', nombre: 'Pedazo de lona plástica rota', categoria: CAT_BOTIN.COMUN, pesoKg: 0.6, valorTrueque: 2, desc: 'Impermeabilizante para techos improvisados.' },

  // --- POCO COMUNES (25% probabilidad) ---
  { id: 'item_030', nombre: 'Olla tiznada abollada', categoria: CAT_BOTIN.POCO_COMUN, pesoKg: 1.0, valorTrueque: 8, desc: 'Metal intacto. Permite hervir agua y cocinar guisos.' },
  { id: 'item_031', nombre: 'Sartén de fierro fundido', categoria: CAT_BOTIN.POCO_COMUN, pesoKg: 1.8, valorTrueque: 7, desc: 'Pesado pero indestructible para asar.' },
  { id: 'item_032', nombre: 'Cuchillo de cocina mellado', categoria: CAT_BOTIN.POCO_COMUN, pesoKg: 0.2, valorTrueque: 5, desc: 'Requiere afilado, pero corta ramas y alimentos.' },
  { id: 'item_033', nombre: 'Martillo oxidado (mango flojo)', categoria: CAT_BOTIN.POCO_COMUN, pesoKg: 0.9, valorTrueque: 6, desc: '30% eficiencia. Necesita ajuste con alambre y aceite.' },
  { id: 'item_034', nombre: 'Alicate trabado por óxido', categoria: CAT_BOTIN.POCO_COMUN, pesoKg: 0.4, valorTrueque: 6, desc: 'Se afloja sumergiéndolo en vinagre 24h.' },
  { id: 'item_035', nombre: 'Destornillador de pala gastado', categoria: CAT_BOTIN.POCO_COMUN, pesoKg: 0.2, valorTrueque: 4, desc: 'Herramienta básica para desarmar electrodomésticos.' },
  { id: 'item_036', nombre: 'Pala de punta oxidada', categoria: CAT_BOTIN.POCO_COMUN, pesoKg: 1.6, valorTrueque: 7, desc: 'Indispensable para cavar pozos y letrinas.' },
  { id: 'item_037', nombre: 'Lupa rayada de lectura', categoria: CAT_BOTIN.POCO_COMUN, pesoKg: 0.1, valorTrueque: 8, desc: 'Permite encender fuego solar directo entre 11am y 3pm.' },
  { id: 'item_038', nombre: 'Lima para metal vieja', categoria: CAT_BOTIN.POCO_COMUN, pesoKg: 0.3, valorTrueque: 6, desc: 'Para desbastar óxido y afilar herramientas.' },
  { id: 'item_039', nombre: 'Serrucho con dientes trabados', categoria: CAT_BOTIN.POCO_COMUN, pesoKg: 0.7, valorTrueque: 7, desc: 'Corta madera si se le aplica grasa de cocina.' },
  { id: 'item_040', nombre: 'Carrete de hilo grueso y aguja', categoria: CAT_BOTIN.POCO_COMUN, pesoKg: 0.05, valorTrueque: 9, desc: 'Oro textil. Permite remendar ropa y fabricar bolsas.' },
  { id: 'item_041', nombre: 'Botas de hule usadas', categoria: CAT_BOTIN.POCO_COMUN, pesoKg: 1.2, valorTrueque: 8, desc: 'Protección para pies en lodo y espinas.' },
  { id: 'item_042', nombre: 'Guantes de carnaza de obrero', categoria: CAT_BOTIN.POCO_COMUN, pesoKg: 0.3, valorTrueque: 6, desc: 'Protegen contra astillas y cortes al recolectar.' },
  { id: 'item_043', nombre: 'Piedra de afilar de grano medio', categoria: CAT_BOTIN.POCO_COMUN, pesoKg: 0.4, valorTrueque: 7, desc: 'Restaura el filo de cuchillos y machetes.' },
  { id: 'item_044', nombre: 'Barra de jabón neutro seco', categoria: CAT_BOTIN.POCO_COMUN, pesoKg: 0.2, valorTrueque: 6, desc: 'Higiene básica para evitar infecciones cutáneas.' },

  // --- RAROS (10% probabilidad) ---
  { id: 'item_060', nombre: 'Hacha de patio oxidada (30% ef.)', categoria: CAT_BOTIN.RARO, pesoKg: 1.5, valorTrueque: 15, desc: 'Herramienta mayor de corte. Se puede restaurar al 80% y 100%.' },
  { id: 'item_061', nombre: 'Barra de ferrocerio en blister', categoria: CAT_BOTIN.RARO, pesoKg: 0.08, valorTrueque: 20, desc: 'Genera chispas a 3000°C con lluvia o viento. ~200 usos.' },
  { id: 'item_062', nombre: 'Brújula metálica militar antigua', categoria: CAT_BOTIN.RARO, pesoKg: 0.15, valorTrueque: 18, desc: 'Reduce el riesgo de extravío en misiones lejanas.' },
  { id: 'item_063', nombre: 'Lámpara solar de estaca para jardín', categoria: CAT_BOTIN.RARO, pesoKg: 0.5, valorTrueque: 22, desc: 'Reliquia rara. Se carga de día y da 3h de luz nocturna.' },
  { id: 'item_080', nombre: 'Bicicleta vieja (llanta ponchada)', categoria: CAT_BOTIN.RARO, pesoKg: 12.0, valorTrueque: 35, desc: 'Base mecánica para armar el generador de bioenergía por pedal.' },
  { id: 'item_081', nombre: 'Motor rescatado de ventilador', categoria: CAT_BOTIN.RARO, pesoKg: 1.2, valorTrueque: 25, desc: 'Bobina de cobre invertible como dínamo generador.' },
  { id: 'item_082', nombre: 'Soldadora muerta (cobre interno)', categoria: CAT_BOTIN.RARO, pesoKg: 4.5, valorTrueque: 30, desc: 'Fuente rica en cable grueso de cobre puro.' },
  { id: 'item_085', nombre: 'Celda de litio 18650 viva', categoria: CAT_BOTIN.RARO, pesoKg: 0.05, valorTrueque: 28, desc: 'Batería recargable para iluminar LEDs y alimentar la radio.' },
  { id: 'item_086', nombre: 'Panel solar chico rescatado (10W)', categoria: CAT_BOTIN.RARO, pesoKg: 1.1, valorTrueque: 40, desc: 'Complemento solar para el sistema de bioenergía en Nivel 8.' },
  { id: 'item_087', nombre: 'Garrafón plástico grueso 20L', categoria: CAT_BOTIN.RARO, pesoKg: 0.8, valorTrueque: 16, desc: 'Gran capacidad de almacenamiento de agua hervida.' },
  { id: 'item_088', nombre: 'Manual de primeros auxilios rural', categoria: CAT_BOTIN.RARO, pesoKg: 0.4, valorTrueque: 20, desc: 'Tratamiento de fracturas, quemaduras y fiebres.' },

  // --- MUY RAROS Y TRUEQUE (5% probabilidad) ---
  { id: 'item_098', nombre: 'Frasco de sal fina / gruesa (0.5kg)', categoria: CAT_BOTIN.MUY_RARO, pesoKg: 0.5, valorTrueque: 50, desc: 'Oro blanco. Conserva carne por 20 días y sazona comidas.' },
  { id: 'item_099', nombre: 'Lata de atún en aceite (sin inflar)', categoria: CAT_BOTIN.MUY_RARO, pesoKg: 0.4, valorTrueque: 45, desc: 'Comida sellada de alto valor calórico y proteico.' },
  { id: 'item_100', nombre: 'Frasco de café soluble sellado', categoria: CAT_BOTIN.MUY_RARO, pesoKg: 0.25, valorTrueque: 45, desc: 'Oro moral. Levanta el ánimo y abre trueques con la Caravana.' },
  { id: 'item_101', nombre: 'Bolsita de azúcar morena (0.5kg)', categoria: CAT_BOTIN.MUY_RARO, pesoKg: 0.5, valorTrueque: 35, desc: 'Energía rápida y conservante dulce.' },
  { id: 'item_102', nombre: 'Cajetilla de cigarrillos secos', categoria: CAT_BOTIN.MUY_RARO, pesoKg: 0.05, valorTrueque: 40, desc: 'Moneda de información. Los viajeros revelan rutas a cambio.' },
  { id: 'item_103', nombre: 'Botella de alcohol etílico 96° (250ml)', categoria: CAT_BOTIN.MUY_RARO, pesoKg: 0.3, valorTrueque: 50, desc: 'Desinfectante quirúrgico indispensable.' },
  { id: 'item_104', nombre: 'Tira de pastillas potabilizadoras (10u)', categoria: CAT_BOTIN.MUY_RARO, pesoKg: 0.02, valorTrueque: 45, desc: 'Potabiliza 10 litros de agua sin necesidad de hervir.' },
  { id: 'item_105', nombre: 'Blister de paracetamol caducado', categoria: CAT_BOTIN.MUY_RARO, pesoKg: 0.02, valorTrueque: 30, desc: 'Alivia fiebres y dolores musculares.' },
  { id: 'item_106', nombre: 'Rollo de venda elástica estéril', categoria: CAT_BOTIN.MUY_RARO, pesoKg: 0.1, valorTrueque: 35, desc: 'Sujeta apósitos y entablilla torceduras.' },
  { id: 'item_107', nombre: 'Tres balas calibre .22 intactas', categoria: CAT_BOTIN.MUY_RARO, pesoKg: 0.03, valorTrueque: 60, desc: 'Defensa disuasoria del refugio ante saqueadores. No se malgastan.' },
  { id: 'item_108', nombre: 'Navaja suiza multiusos original', categoria: CAT_BOTIN.MUY_RARO, pesoKg: 0.12, valorTrueque: 55, desc: 'Tijeras, punzón, sierra pequeña y abrelatas en una sola pieza.' },
  { id: 'item_109', nombre: 'Tubo de silicón sellador industrial', categoria: CAT_BOTIN.MUY_RARO, pesoKg: 0.35, valorTrueque: 35, desc: 'Sella grietas en tuberías y techos contra la lluvia.' }
];
