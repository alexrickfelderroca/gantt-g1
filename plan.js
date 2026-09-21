// Genera datos.json: sesiones reales del Grupo 1 + tareas trazadas a la documentación.
//
// Campo `fuente` de cada tarea:
//   guia   -> lo exige literalmente la Guía del Proyecto Integrado
//   plan   -> sale de la Planificación de actividades 1Q/2Q o de la Rotación de grupos
//   grupo  -> decisión del propio Grupo 1, no está en ningún documento oficial
const fs = require('fs');

/* ---------------- SESIONES REALES DEL GRUPO 1 ---------------- */
// De "Planificacion actividades 1Q/2Q" y "Rotacion Grupos". Solo días en los que
// el G1 tiene sesión, más las fechas de entrega que no caen en sesión.
const SESIONES = [
  ['18/09/2026','sesion'],  ['21/09/2026','sesion'],  ['22/09/2026','sesion'],
  ['30/09/2026','entrega'], ['01/10/2026','sesion'],  ['02/10/2026','sesion'],
  ['06/10/2026','control'], ['07/10/2026','sesion'],  ['08/10/2026','sesion'],
  ['29/10/2026','sesion'],  ['30/10/2026','sesion'],  ['02/11/2026','sesion'],
  ['06/11/2026','sesion'],  ['09/11/2026','sesion'],  ['10/11/2026','sesion'],
  ['16/11/2026','sesion'],  ['17/11/2026','sesion'],  ['18/11/2026','sesion'],
  ['27/11/2026','sesion'],  ['30/11/2026','sesion'],  ['01/12/2026','sesion'],
  ['10/12/2026','entrega'], ['14/12/2026','sesion'],  ['15/12/2026','sesion'],
  ['16/12/2026','sesion'],  ['18/12/2026','control'],
  ['08/02/2027','sesion'],  ['09/02/2027','sesion'],  ['10/02/2027','sesion'],
  ['11/02/2027','sesion'],  ['15/02/2027','sesion'],  ['16/02/2027','sesion'],
  ['17/02/2027','sesion'],  ['18/02/2027','sesion'],
  ['18/03/2027','control'], ['19/03/2027','control'],
  ['09/04/2027','sesion'],  ['14/04/2027','sesion'],  ['15/04/2027','sesion'],
  ['19/04/2027','sesion'],  ['20/04/2027','sesion'],  ['21/04/2027','sesion'],
  ['22/04/2027','sesion'],
  ['05/05/2027','entrega'], ['13/05/2027','control'],
];

const NOTA = {
  '30/09/2026':'Plazo: enviar el plan de trabajo al profesor',
  '06/10/2026':'Control 1 · Aula SEAT 10:30 · aquí asignan la velocidad angular',
  '10/12/2026':'Entrega de planos (fecha de la Guía, pendiente de confirmar)',
  '18/12/2026':'Control Final de Dibujo Industrial · Aula SEAT 12:00',
  '18/03/2027':'Control cinemático por tres métodos (fecha de la Planificación 2Q)',
  '19/03/2027':'Control cinemático (fecha de la Rotación: G1 a las 11:30) — por confirmar',
  '05/05/2027':'ENTREGA FINAL: informe, PAM, SolidWorks, vídeo, fotos y presentación',
  '13/05/2027':'Presentación y defensa ante tribunal — por confirmar (12 o 13 de mayo)',
};

/* ---------------- EQUIPO ---------------- */
const P = {
  alex:'Alex R.', raul:'Raul O.', jan:'Jan D.', victor:'Victor G.',
  marc:'Marc B.', ignasi:'Ignasi S.', jordi:'Jordi A.',
};
const TODOS = Object.values(P);

/* ---------------- TAREAS ----------------
   t(id, fase, nombre, descripcion, desde, hasta, [responsables], fuente, {critica, cita})   */
const T = [];
const t = (id, fase, nombre, desc, a, b, r, fuente, o = {}) =>
  T.push({ id, fase, nombre, descripcion: desc, inicio: a, fin: b,
           responsables: r, fuente, critica: !!o.critica, cita: o.cita || '', docs: o.docs || [] });

const F1 = '1 · Bibliografía, croquis y plan de trabajo';
t('1.1', F1, 'Bibliografía: ing. concurrente', 'Tema a) de la Guía. Buscar y fichar fuentes sobre ingeniería concurrente y simultánea.', '21/09/2026','02/10/2026',[P.alex,P.jan],'guia',{cita:'Guía 3.1.a'});
t('1.2', F1, 'Bibliografía: diagrama de Gantt', 'Tema b). Fundamenta el texto del apartado 1.4 del informe.', '21/09/2026','30/09/2026',[P.alex],'guia',{cita:'Guía 3.1.b'});
t('1.3', F1, 'Bibliografía: teoría de máquinas', 'Tema c). Grupo de Assur, grados de movilidad, pares cinemáticos, síntesis y análisis.', '21/09/2026','02/10/2026',[P.jan,P.raul],'guia',{cita:'Guía 3.1.c'});
t('1.4', F1, 'Bibliografía: materiales', 'Tema d). Aluminio 6063, AISI 304, PE y PTFE.', '22/09/2026','02/10/2026',[P.alex,P.victor],'guia',{cita:'Guía 3.1.d'});
t('1.5', F1, 'Bibliografía: dibujo industrial', 'Tema e). Acotación, tolerancias dimensionales y geométricas, normativa.', '22/09/2026','02/10/2026',[P.jan,P.marc],'guia',{cita:'Guía 3.1.e'});
t('1.6', F1, 'Consolidar la bibliografía', 'Mínimo 5 libros y 2 revistas científicas en norma UNE 50-104-94, cada una con su comentario.', '01/10/2026','06/10/2026',[P.alex,P.jan],'guia',{critica:true,cita:'Guía: "se listarán al menos 5 libros y 2 revistas"'});
t('1.7', F1, 'Croquis del mecanismo', 'Croquis acotado, totalmente definido salvo el ángulo de manivela.', '21/09/2026','22/09/2026',[P.raul,P.ignasi,P.victor],'guia',{critica:true,cita:'Guía 3.3.a',docs:[{nombre:'Croquis_V.1_21-09-26.SLDASM',url:'https://iqsedu-my.sharepoint.com'}]});
t('1.8', F1, 'Validar el croquis entre los 7', 'Los 7 revisan cotas, encaje en la malla de 25 mm y que el mecanismo dé una vuelta sin bloqueos.', '22/09/2026','22/09/2026',TODOS,'grupo',{critica:true});
t('1.9', F1, 'Esquema con símbolos ISO 3952', 'Apartado 2.1 del informe. Símbolos ISO 3952, sin cotas. Nombrar y clasificar elementos y uniones.', '21/09/2026','30/09/2026',[P.marc,P.jordi],'guia',{cita:'Guía 3.3.a'});
t('1.10',F1, 'Dimensionamiento del mecanismo', 'Fijar longitudes y posiciones de apoyo. Hay que llevarlo hecho al Control 1.', '22/09/2026','06/10/2026',[P.victor,P.ignasi,P.jordi],'plan',{critica:true,cita:'Planificación 1Q: "Revisión Dimensionamiento"'});
t('1.11',F1, 'Diagrama de Gantt', 'Cronograma de tareas con fechas de cumplimiento, más la justificación escrita del apartado 1.4.', '21/09/2026','30/09/2026',[P.alex],'guia',{critica:true,cita:'Guía 3.2 y Memoria técnica a'});
t('1.12',F1, 'Enviar el plan al profesor', 'Lo aprueba el profesor. Lo envía el líder.', '30/09/2026','30/09/2026',[P.alex],'plan',{critica:true,cita:'Planificación 1Q: "Enviar plan de trabajo antes del 30/09"'});
t('1.13',F1, 'CONTROL 1', 'Aula SEAT 10:30. Aquí el profesor asigna la velocidad angular de la manivela.', '06/10/2026','06/10/2026',TODOS,'plan',{critica:true,cita:'Planificación 1Q'});
t('1.14',F1, 'Correcciones del Control 1', 'Rehacer lo que el profesor señale en bibliografía, plan y dimensionamiento.', '07/10/2026','29/10/2026',TODOS,'plan',{cita:'Patrón control→correcciones del Gantt de ejemplo del profesor'});

const F2 = '2 · Comprensión del mecanismo y cinemática';
t('2.1', F2, 'Grados de libertad y movilidad', 'Apartado 2.1: aplicar la ecuación de movilidad y comprobar que GM = 1.', '07/10/2026','29/10/2026',[P.jan],'guia',{cita:'Memoria técnica b'});
t('2.2', F2, 'Posiciones extremas', 'Apartado 2.2: identificar las posiciones extremas y describir las trayectorias.', '07/10/2026','30/10/2026',[P.jan,P.jordi],'guia',{cita:'Memoria técnica c'});
t('2.3', F2, 'Velocidades y aceleraciones a mano', 'Resolución a mano para la posición de estudio, con la velocidad angular asignada.', '29/10/2026','10/11/2026',[P.jan,P.alex],'guia',{critica:true,cita:'Memoria técnica d'});
t('2.4', F2, 'Hoja de cálculo Excel', 'Una de las cuatro vías. Reproduce el cálculo manual para poder contrastarlo.', '02/11/2026','10/11/2026',[P.jan,P.alex],'plan',{cita:'Fila propia en el Gantt de ejemplo del profesor'});
t('2.5', F2, 'Modelo en PAM', 'Una vuelta completa de manivela a intervalos de 0,01 s.', '06/11/2026','17/11/2026',[P.marc,P.ignasi],'guia',{critica:true,cita:'Guía: "una vuelta completa... intervalos de 0.01 s"'});
t('2.6', F2, 'Comparar cálculo a mano con PAM', 'Contrastar los resultados de la posición calculada a mano con la de PAM.', '16/11/2026','18/11/2026',[P.jan,P.raul],'guia',{cita:'Guía 3.3.b'});

const F3 = '3 · Modelado 3D y simulación';
t('3.1', F3, 'Definir materiales y secciones', 'Aluminio 6063 en pletina 15×3 para las barras y AISI 304 Ø6 para los ejes.', '29/10/2026','02/11/2026',[P.victor,P.marc],'guia',{critica:true,cita:'Guía 4, condiciones'});
t('3.2', F3, 'Modelar la biela (3)', 'Pieza 3.1, con el material asignado.', '02/11/2026','10/11/2026',[P.raul],'guia',{critica:true});
t('3.3', F3, 'Modelar el pistón (4)', 'Pieza 4.1, con el material asignado.', '02/11/2026','10/11/2026',[P.marc],'guia',{critica:true});
t('3.4', F3, 'Modelar el collarín (5.1)', 'Pieza 5.1, con el material asignado.', '06/11/2026','16/11/2026',[P.ignasi],'guia',{critica:true});
t('3.5', F3, 'Modelar el balancín (5.2)', 'Pieza 5.2, con el material asignado.', '06/11/2026','16/11/2026',[P.jordi],'guia',{critica:true});
t('3.6', F3, 'Ensamblar el mecanismo completo', 'Montar las piezas 3, 4 y 5 sobre la bancada y la manivela que da el profesor.', '16/11/2026','18/11/2026',[P.victor],'guia',{critica:true});
t('3.7', F3, 'Verificar interferencias', 'Barrido de una vuelta completa. Ningún plano sale hasta que esto cierre.', '18/11/2026','27/11/2026',[P.victor,P.jordi],'guia',{critica:true,cita:'Guía: "no hay colisiones o interferencias entre piezas"'});
t('3.8', F3, 'Centro de gravedad e inercias', 'Centro de gravedad y momentos de inercia de cada elemento móvil.', '27/11/2026','30/11/2026',[P.ignasi,P.raul],'guia',{cita:'Guía 3.3.b'});
t('3.9', F3, 'Simulación en SolidWorks Motion', 'Velocidades, aceleraciones, fuerzas en las uniones y par motriz.', '27/11/2026','01/12/2026',[P.marc,P.victor,P.jordi],'guia',{cita:'Guía 3.3.b'});
t('3.10',F3, 'Comparativa de las cuatro vías', 'Apartado 2.7: tabla con las cuatro vías y justificación de las divergencias.', '01/12/2026','14/12/2026',[P.jan,P.raul,P.ignasi],'guia',{cita:'Plantilla del Word, apartado 2.7'});

const F4 = '4 · Diseño funcional y planos';
t('4.1', F4, 'Escalar el mecanismo ×10', 'Definir el mecanismo real partiendo de las medidas de la maqueta, multiplicadas por 10.', '18/11/2026','27/11/2026',[P.victor,P.jordi],'guia',{critica:true,cita:'Guía 3.3.c: "la escala se multiplica por 10"'});
t('4.2', F4, 'Ajustes y tolerancias', 'Los ajustes de las uniones se justifican con cálculos, no se eligen a ojo.', '27/11/2026','01/12/2026',[P.marc,P.ignasi],'guia',{critica:true,cita:'Guía 3.3.d: "se justificarán, con cálculos, los ajustes"'});
t('4.3', F4, 'Planos de las piezas', 'Acotados, con tolerancias dimensionales y geométricas normalizadas.', '30/11/2026','10/12/2026',[P.marc,P.raul,P.ignasi,P.jordi],'guia',{critica:true,cita:'Guía 3.3.d'});
t('4.4', F4, 'Plano de conjunto', 'Con las tablas de despiece actualizadas.', '01/12/2026','10/12/2026',[P.victor,P.marc],'guia',{critica:true,cita:'Guía 3.3.d'});
t('4.5', F4, 'Actualizar los cajetines', 'Grupo G1, nuestros nombres y la fecha de entrega correcta.', '01/12/2026','10/12/2026',[P.jordi],'guia',{cita:'Guía: "cajetín actualizado y coincidente con la realidad"'});
t('4.6', F4, 'ENTREGA DE PLANOS', 'Fecha de la Guía. No aparece en la Planificación: confirmar formato y sitio.', '10/12/2026','10/12/2026',TODOS,'guia',{critica:true,cita:'Guía: "Los planos se entregarán el 10 de Diciembre"'});
t('4.7', F4, 'Correcciones de los planos', 'Rehacer lo que el profesor señale antes del control final.', '14/12/2026','16/12/2026',[P.marc,P.victor,P.raul,P.ignasi,P.jordi],'plan');
t('4.8', F4, 'CONTROL FINAL DE DIBUJO', 'Aula SEAT 12:00. Piezas y ensamblajes.', '18/12/2026','18/12/2026',TODOS,'plan',{critica:true,cita:'Planificación 1Q'});

const F5 = '5 · Cinemática por tres métodos y maqueta';
t('5.1', F5, 'Retomar el entorno', 'Reinstalar y comprobar que SolidWorks y PAM abren los archivos de diciembre.', '08/02/2027','08/02/2027',[P.marc,P.jordi],'grupo');
t('5.2', F5, 'Cinemática a mano', 'Primer método: resolución analítica.', '08/02/2027','11/02/2027',[P.jan,P.alex],'plan',{critica:true,cita:'Planificación 2Q: "Control cinemático tres métodos"'});
t('5.3', F5, 'Cinemática completa en PAM', 'Segundo método.', '09/02/2027','15/02/2027',[P.ignasi,P.raul],'plan',{critica:true});
t('5.4', F5, 'Cinemática en SolidWorks', 'Tercer método.', '10/02/2027','17/02/2027',[P.victor,P.marc,P.jordi],'plan',{critica:true});
t('5.5', F5, 'Comparar los tres métodos', 'Cruzar los tres y justificar cualquier divergencia.', '16/02/2027','18/02/2027',[P.jan,P.raul,P.ignasi],'plan',{critica:true});
t('5.6', F5, 'Material y consulta al taller', 'No hay fecha oficial de taller en ningún documento: hay que preguntarla.', '15/02/2027','18/02/2027',[P.marc,P.victor],'grupo',{critica:true});
t('5.7', F5, 'Fabricar las piezas de la maqueta', 'Siete semanas sin tutoría: es el tramo más largo y sin holgura del curso.', '18/02/2027','18/03/2027',[P.marc,P.victor,P.raul,P.ignasi,P.jordi],'guia',{critica:true,cita:'Guía: "sintetizar, simular y construir"'});
t('5.8', F5, 'Preparar el control', 'Ensayo interno de la defensa de los tres métodos.', '18/03/2027','18/03/2027',TODOS,'grupo');
t('5.9', F5, 'CONTROL CINEMÁTICO', 'La Planificación dice 18/03 y la Rotación 19/03 a las 11:30. Reservados los dos.', '19/03/2027','19/03/2027',TODOS,'plan',{critica:true});

const F6 = '6 · Dinámica, fuerzas y montaje';
t('6.1', F6, 'Sólido libre y matriz de fuerzas', 'Apartado 2.4 del informe.', '09/04/2027','14/04/2027',[P.jan,P.alex],'guia',{cita:'Memoria técnica d'});
t('6.2', F6, 'Fuerzas y par motriz', 'Por las cuatro vías, y que coincidan.', '14/04/2027','20/04/2027',[P.jan,P.raul,P.ignasi,P.victor],'guia',{cita:'Memoria técnica d'});
t('6.3', F6, 'Montar la maqueta', 'Ensamblaje físico de las piezas fabricadas.', '09/04/2027','15/04/2027',[P.marc,P.victor,P.jordi],'guia',{critica:true});
t('6.4', F6, 'Ajustar la maqueta', 'Sin bloqueos ni holguras excesivas.', '15/04/2027','20/04/2027',[P.raul,P.ignasi,P.jordi],'guia',{critica:true});
t('6.5', F6, 'Fotos de la maqueta terminada', 'La Guía pide fotos entre los entregables de mayo.', '20/04/2027','22/04/2027',[P.marc,P.alex],'guia',{critica:true,cita:'Guía 3.3.e'});

const F7 = '7 · Informe, vídeo y entrega final';
t('7.1', F7, 'Redactar la memoria técnica', 'Apartados 2.1 a 2.7. Máximo 20 páginas en total.', '09/04/2027','21/04/2027',[P.raul,P.jan,P.ignasi],'guia',{cita:'Guía: Memoria técnica, 20 páginas máx.'});
t('7.2', F7, 'Resumen e introducción', 'Resumen de menos de 350 palabras que explique la estructura del documento.', '19/04/2027','22/04/2027',[P.alex,P.jan],'guia',{cita:'Guía: Informe'});
t('7.3', F7, 'Redactar las conclusiones', 'Conclusiones de verdad, no un resumen de lo hecho.', '20/04/2027','22/04/2027',[P.raul,P.ignasi],'guia');
t('7.4', F7, 'Grabar el vídeo explicativo', '20 minutos en los que los 7 describan su propio trabajo.', '20/04/2027','05/05/2027',TODOS,'guia',{critica:true,cita:'Guía 3.3.f'});
t('7.5', F7, 'Montar y exportar el vídeo', 'Edición y exportación del vídeo final.', '22/04/2027','05/05/2027',[P.marc,P.jordi],'guia',{critica:true});
t('7.6', F7, 'Maquetar el informe', 'Índices automáticos, figuras, tablas y ecuaciones numeradas.', '22/04/2027','05/05/2027',[P.raul,P.jan,P.ignasi],'guia');
t('7.7', F7, 'Preparar el paquete de entrega', 'Informe, PAM, SolidWorks, vídeo, fotos y presentación en PDF. Comprobar que abre en otro ordenador.', '22/04/2027','05/05/2027',[P.victor,P.marc],'guia',{critica:true,cita:'Guía: "La simulación del mecanismo ha de funcionar correctamente"'});
t('7.8', F7, 'ENTREGA FINAL', 'Fecha límite de la Guía. La Planificación 2Q sugiere abril: pendiente de confirmar.', '05/05/2027','05/05/2027',TODOS,'guia',{critica:true,cita:'Guía 3.3.e: "La fecha límite para la entrega será el 05/05/2027"'});

const F8 = '8 · Presentación y defensa';
t('8.1', F8, 'Preparar la presentación', '20 minutos entre los 7: poco más de 2 minutos y medio cada uno.', '20/04/2027','05/05/2027',TODOS,'guia',{cita:'Guía 3.3.f'});
t('8.2', F8, 'Ensayos cronometrados', 'Con la maqueta y el vídeo delante.', '05/05/2027','13/05/2027',TODOS,'grupo');
t('8.3', F8, 'Hojas de autoevaluación', 'Cada uno reparte 10 puntos por aspecto entre los integrantes. Vale 2 de los 10 puntos.', '13/05/2027','13/05/2027',[P.alex],'guia',{cita:'Guía 5: Evaluación'});
t('8.4', F8, 'PRESENTACIÓN Y DEFENSA', 'Nota individual. No asistir implica no aprobar el proyecto.', '13/05/2027','13/05/2027',TODOS,'guia',{critica:true,cita:'Guía 3.3.f'});

/* ---------------- SALIDA ---------------- */
const ini = n => n.replace('.','').split(' ').map(w => w[0]).join('').toUpperCase();
const salida = {
  equipo: Object.values(P).map(n => ({ nombre: n, iniciales: ini(n) })),
  sesiones: SESIONES.map(([fecha, tipo]) => ({ fecha, tipo, nota: NOTA[fecha] || '' })),
  fases: [...new Set(T.map(x => x.fase))],
  tareas: T,
};
fs.writeFileSync('datos.json', JSON.stringify(salida, null, 1));

const carga = {};
T.forEach(x => x.responsables.forEach(r => carga[r] = (carga[r] || 0) + 1));
const porFuente = {};
T.forEach(x => porFuente[x.fuente] = (porFuente[x.fuente] || 0) + 1);
console.log('tareas:', T.length, '| sesiones:', SESIONES.length, '| fases:', salida.fases.length);
console.log('criticas:', T.filter(x => x.critica).length);
console.log('por fuente:', JSON.stringify(porFuente));
console.log('carga:', JSON.stringify(carga));
