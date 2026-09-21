# Plan de trabajo — Grupo 1

Diagrama de Gantt del **Proyecto Integrado 2º GETI (IQS)**, curso 26/27.
Mecanismo plano de palancas de dos grupos de Assur.

🔗 **https://alexrickfelderroca.github.io/gantt-g1/**

## Cómo se actualiza

Los datos viven en `datos.json`. Para regenerar la web:

```bash
node build.js
```

Eso inyecta `datos.json` dentro de `plantilla.html` y escribe `index.html`.
Luego `git commit` + `git push` y GitHub Pages lo publica solo.

| Archivo | Qué es |
|---|---|
| `datos.json` | Las tareas, fases e hitos. **Lo único que hay que tocar.** |
| `plantilla.html` | El diseño de la página |
| `build.js` | Junta los dos y genera `index.html` |
| `index.html` | Generado. No editar a mano. |
