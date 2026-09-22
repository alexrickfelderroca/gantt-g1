const fs = require('fs');
const datos = fs.readFileSync('datos.json', 'utf8');
const cfg   = fs.existsSync('supabase.json') ? fs.readFileSync('supabase.json', 'utf8') : '{}';

// Sello de versión visible en el pie, para saber de un vistazo si el navegador
// está sirviendo una copia vieja.
const h = new Date();
const dd = n => String(n).padStart(2, '0');
const sello = dd(h.getDate()) + '/' + dd(h.getMonth() + 1) + '/' + h.getFullYear()
            + ' ' + dd(h.getHours()) + ':' + dd(h.getMinutes());

let out = fs.readFileSync('plantilla.html', 'utf8');
out = out.replace(/\/\*__DATOS__\*\/[\s\S]*?\/\*__FIN__\*\//,       '/*__DATOS__*/' + datos + '/*__FIN__*/');
out = out.replace(/\/\*__CFG__\*\/[\s\S]*?\/\*__FINCFG__\*\//,      '/*__CFG__*/' + cfg + '/*__FINCFG__*/');
out = out.replace(/\/\*__SELLO__\*\/[\s\S]*?\/\*__FINSELLO__\*\//,  '/*__SELLO__*/' + sello + '/*__FINSELLO__*/');
fs.writeFileSync('index.html', out);

const on = JSON.parse(cfg).url ? 'con base de datos' : 'SIN base de datos (modo local)';
console.log('index.html generado —', (out.length / 1024).toFixed(0) + ' KB —', on, '— sello', sello);
