// Corrige la ortografía española del dataset (los agentes generaron el texto sin tildes).
const fs = require('fs');

const M = {
  Gestion:'Gestión', gestion:'gestión', Reunion:'Reunión', reunion:'reunión',
  bitacora:'bitácora', Bitacora:'Bitácora', semaforo:'semáforo', unica:'única', unico:'único',
  sesion:'sesión', Sesion:'Sesión', simbolico:'simbólico', simbolica:'simbólica',
  Verificacion:'Verificación', verificacion:'verificación',
  geometrica:'geométrica', geometricas:'geométricas', geometrico:'geométrico', geometricos:'geométricos',
  Ingenieria:'Ingeniería', ingenieria:'ingeniería', Mecanica:'Mecánica', mecanica:'mecánica',
  analitico:'analítico', analitica:'analítica', analiticos:'analíticos', analiticas:'analíticas',
  cinematica:'cinemática', Cinematica:'Cinemática', cinematico:'cinemático', Cinematico:'Cinemático',
  dinamica:'dinámica', Dinamica:'Dinámica', dinamico:'dinámico',
  maquina:'máquina', maquinas:'máquinas', Maquinas:'Máquinas',
  numero:'número', numeros:'números', calculo:'cálculo', calculos:'cálculos',
  Calculo:'Cálculo', Calculos:'Cálculos', Redaccion:'Redacción', redaccion:'redacción',
  Documentacion:'Documentación', documentacion:'documentación',
  Presentacion:'Presentación', presentacion:'presentación',
  informacion:'información', Informacion:'Información', version:'versión', Version:'Versión',
  Fabricacion:'Fabricación', fabricacion:'fabricación', Construccion:'Construcción', construccion:'construcción',
  Simulacion:'Simulación', simulacion:'simulación',
  tecnica:'técnica', Tecnica:'Técnica', tecnico:'técnico', Tecnico:'Técnico', tecnicas:'técnicas', tecnicos:'técnicos',
  grafico:'gráfico', graficos:'gráficos', grafica:'gráfica', graficas:'gráficas',
  Organizacion:'Organización', Planificacion:'Planificación', planificacion:'planificación',
  Comprension:'Comprensión', comprension:'comprensión', revision:'revisión', Revision:'Revisión',
  Conclusion:'Conclusión', conclusion:'conclusión',
  Justificacion:'Justificación', justificacion:'justificación',
  Validacion:'Validación', validacion:'validación', Instalacion:'Instalación', instalacion:'instalación',
  Consolidacion:'Consolidación', consolidacion:'consolidación',
  Correccion:'Corrección', correccion:'corrección',
  envio:'envío', Envio:'Envío', Asignacion:'Asignación', asignacion:'asignación',
  Exportacion:'Exportación', exportacion:'exportación',
  Definicion:'Definición', definicion:'definición',
  posicion:'posición', Posicion:'Posición', Seleccion:'Selección', seleccion:'selección',
  Descripcion:'Descripción', descripcion:'descripción', ecuacion:'ecuación',
  articulacion:'articulación', Grabacion:'Grabación', grabacion:'grabación',
  Edicion:'Edición', edicion:'edición', Preparacion:'Preparación', preparacion:'preparación',
  tambien:'también', despues:'después', Despues:'Después',
  ultimo:'último', ultima:'última', ultimos:'últimos', ultimas:'últimas',
  segun:'según', ademas:'además', asi:'así',
  dia:'día', dias:'días', Dia:'Día', Dias:'Días', ano:'año', anos:'años', manana:'mañana',
  disenar:'diseñar', diseno:'diseño', Diseno:'Diseño', disenos:'diseños', tamano:'tamaño',
  companeros:'compañeros', companero:'compañero', espanol:'español', senalar:'señalar',
  metodo:'método', metodos:'métodos', Metodo:'Método', Metodos:'Métodos',
  practica:'práctica', practicas:'prácticas', teorica:'teórica', teorico:'teórico', Teorica:'Teórica',
  parametro:'parámetro', parametros:'parámetros',
  angulo:'ángulo', angulos:'ángulos',
  minimo:'mínimo', minima:'mínima', maximo:'máximo', maxima:'máxima',
  critico:'crítico', critica:'crítica', criticas:'críticas', Critico:'Crítico', Critica:'Crítica',
  logistica:'logística', Logistica:'Logística',
  automatico:'automático', automatica:'automática',
  indice:'índice', indices:'índices', Indice:'Índice',
  pagina:'página', paginas:'páginas', capitulo:'capítulo',
  articulo:'artículo', articulos:'artículos',
  bibliografia:'bibliografía', Bibliografia:'Bibliografía',
  bibliografico:'bibliográfico', bibliografica:'bibliográfica', Bibliografica:'Bibliográfica',
  video:'vídeo', Video:'Vídeo', videos:'vídeos',
  Memoria:'Memoria', Anexos:'Anexos',
};

const claves = Object.keys(M).sort((a, b) => b.length - a.length);
const re = new RegExp('\\b(' + claves.join('|') + ')\\b', 'g');
const fix = s => (typeof s === 'string' ? s.replace(re, m => M[m] || m) : s);
const walk = x =>
  Array.isArray(x) ? x.map(walk)
  : (x && typeof x === 'object') ? Object.fromEntries(Object.entries(x).map(([k, v]) => [k, walk(v)]))
  : fix(x);

for (const f of ['datos.json', 'JUSTIFICACION-1.4.md']) {
  if (!fs.existsSync(f)) continue;
  if (f.endsWith('.json')) {
    fs.writeFileSync(f, JSON.stringify(walk(JSON.parse(fs.readFileSync(f, 'utf8'))), null, 1));
  } else {
    fs.writeFileSync(f, fix(fs.readFileSync(f, 'utf8')));
  }
  console.log('corregido:', f);
}
