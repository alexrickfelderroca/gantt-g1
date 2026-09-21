-- ============================================================
--  Gantt Grupo 1 — esquema de la base de datos
--  Pegar ENTERO en Supabase → SQL Editor → New query → Run
-- ============================================================

-- 1. Estado de cada tarea (hecha / pendiente) -----------------
create table if not exists estado_tareas (
  tarea_id    text primary key,
  hecha       boolean     not null default false,
  marcado_en  timestamptz not null default now()
);

-- 2. Documentos atados a una tarea ----------------------------
create table if not exists documentos (
  id         bigint generated always as identity primary key,
  tarea_id   text        not null,
  nombre     text        not null,
  url        text        not null,
  creado_en  timestamptz not null default now()
);

create index if not exists documentos_tarea_idx on documentos (tarea_id);

-- 3. Permisos -------------------------------------------------
-- La web es pública y sin cuentas, así que el rol anónimo tiene
-- que poder leer y escribir. Es una decisión consciente: cualquiera
-- con el enlace puede marcar tareas.
alter table estado_tareas enable row level security;
alter table documentos    enable row level security;

drop policy if exists "lectura publica"  on estado_tareas;
drop policy if exists "escritura publica" on estado_tareas;
create policy "lectura publica"   on estado_tareas for select using (true);
create policy "escritura publica" on estado_tareas for all    using (true) with check (true);

drop policy if exists "lectura publica"  on documentos;
drop policy if exists "escritura publica" on documentos;
create policy "lectura publica"   on documentos for select using (true);
create policy "escritura publica" on documentos for all    using (true) with check (true);

-- 4. Comprobación ---------------------------------------------
select 'listo: ' || count(*)::text || ' tablas creadas' as resultado
from information_schema.tables
where table_schema = 'public' and table_name in ('estado_tareas','documentos');
