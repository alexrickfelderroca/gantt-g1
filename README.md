# Plan de trabajo — Grupo 1

Diagrama de Gantt del **Proyecto Integrado 2º GETI (IQS)**, curso 26/27.
Mecanismo plano de palancas de dos grupos de Assur.

🔗 **https://alexrickfelderroca.github.io/gantt-g1/**

## Cómo se actualiza

Las tareas y las sesiones se editan en **`plan.js`**. Después:

```bash
node plan.js     # escribe datos.json
node build.js    # inyecta datos.json en plantilla.html -> index.html
git add -A && git commit -m "..." && git push
```

| Archivo | Qué es |
|---|---|
| `plan.js` | **Las tareas y las sesiones. Lo único que hay que tocar.** |
| `datos.json` | Generado por `plan.js`. No editar a mano. |
| `plantilla.html` | El diseño de la página |
| `build.js` | Junta plantilla + datos y genera `index.html` |
| `index.html` | Generado. No editar a mano. |

## Atar documentos a una tarea

En `plan.js`, la tarea admite `docs`:

```js
{docs:[{nombre:'Croquis_V.1.SLDASM', url:'https://…enlace de OneDrive…'}]}
```

La página es estática y no puede alojar archivos: el archivo se sube a la carpeta
de OneDrive del grupo y aquí se guarda el enlace. Desde la propia web se pueden
atar enlaces, pero solo los ve quien los añade (se guardan en su navegador).
