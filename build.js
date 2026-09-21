const fs=require('fs');
const datos=fs.readFileSync('datos.json','utf8');
const tpl=fs.readFileSync('plantilla.html','utf8');
const out=tpl.replace(/\/\*__DATOS__\*\/[\s\S]*?\/\*__FIN__\*\//,'/*__DATOS__*/'+datos+'/*__FIN__*/');
fs.writeFileSync('index.html',out);
console.log('index.html generado —',(out.length/1024).toFixed(0)+' KB');
