# Plan de trabajo — Grupo 1

Diagrama de Gantt del **Proyecto Integrado 2º GETI (IQS)**, curso 26/27.
Mecanismo plano de palancas de dos grupos de Assur.

🔗 **https://alexrickfelderroca.github.io/gantt-g1/**

El eje horizontal son las **45 sesiones reales del Grupo 1**, no meses ni días corridos.
Cada columna es una sesión de prácticas, un control o una entrega.

---

## Conectar la base de datos (para que los tics los vea todo el grupo)

Sin esto la web funciona, pero lo que marca cada uno se queda en su navegador.

**1.** Entra en [supabase.com](https://supabase.com) → *Start your project* → crea cuenta
(gratis, sin tarjeta) → *New project*. Ponle de nombre `gantt-g1` y elige la región
`West EU (Ireland)`. Tarda un par de minutos en levantarse.

**2.** Dentro del proyecto, menú lateral → **SQL Editor** → *New query*. Pega entero el
contenido de [`ESQUEMA.sql`](ESQUEMA.sql) y pulsa **Run**. Debe responder
`listo: 2 tablas creadas`.

**3.** Menú lateral → **Project Settings** → **API**. Copia dos cosas:
   - **Project URL** — algo como `https://abcdefgh.supabase.co`
   - **Project API keys → `anon` `public`** — una cadena larga que empieza por `eyJ…`

**4.** Pégalas en `supabase.json`:

```json
{
  "url": "https://abcdefgh.supabase.co",
  "key": "eyJhbGciOi..."
}
```

**5.** `node build.js && git add -A && git commit -m "conectar base de datos" && git push`

La web pasa a mostrar en verde *"Al día — lo que marcas lo ve todo el grupo"*.

### Sobre la seguridad

La clave `anon public` **está pensada para ir en el código del navegador**: no es un
secreto. Lo que decide quién puede hacer qué son las políticas de acceso del
`ESQUEMA.sql`, y ahí hemos abierto lectura y escritura a cualquiera, porque la web es
pública y sin cuentas. **Cualquiera con el enlace puede marcar y desmarcar tareas.**
Para 7 compañeros es asumible; si algún día molesta, se cambian las políticas.

Nunca pongas aquí la clave `service_role`: esa sí es un secreto y salta la seguridad.

---

## Editar las tareas

Las tareas y las sesiones se editan en **`plan.js`**. Después:

```bash
node plan.js     # escribe datos.json
node build.js    # inyecta datos.json + supabase.json en plantilla.html -> index.html
git add -A && git commit -m "..." && git push
```

| Archivo | Qué es |
|---|---|
| `plan.js` | **Las tareas y las sesiones. Lo único que hay que tocar.** |
| `supabase.json` | Credenciales de la base de datos |
| `ESQUEMA.sql` | Las tablas, para pegar una vez en Supabase |
| `datos.json` | Generado por `plan.js`. No editar a mano. |
| `plantilla.html` | El diseño de la página |
| `build.js` | Junta plantilla + datos + config y genera `index.html` |
| `index.html` | Generado. No editar a mano. |
| `JUSTIFICACION-1.4.md` | Borrador del texto que va bajo el Gantt en el informe |

### De dónde sale cada tarea

Cada tarea lleva un campo `fuente`, visible al pulsar sus iniciales:

- **`guia`** — lo exige literalmente la Guía del Proyecto Integrado, con la cita
- **`plan`** — sale de la Planificación 1Q/2Q o de la Rotación de grupos
- **`grupo`** — decisión del propio Grupo 1, no la respalda ningún documento

Hay un filtro **"Solo lo que exige la Guía"** para ver únicamente lo irrebatible.

## Atar documentos

La página no puede alojar archivos. El archivo se sube a la carpeta de OneDrive del
grupo y aquí se guarda el enlace, desde el propio desplegable de la tarea. Con la base
de datos conectada, los enlaces los ve todo el grupo.

Para dejar un documento fijo en el código, en `plan.js`:

```js
{docs:[{nombre:'Croquis_V.1.SLDASM', url:'https://…enlace de OneDrive…'}]}
```
