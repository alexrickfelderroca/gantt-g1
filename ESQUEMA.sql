-- ============================================================
--  Gantt Grupo 1 — esquema de la base de datos
--  Pegar ENTERO en Supabase → SQL Editor → New query → Run
--  Se puede volver a ejecutar las veces que haga falta.
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

-- Ruta dentro del almacenamiento, para poder borrar el archivo.
-- Queda a null cuando el documento es solo un enlace externo.
alter table documentos add column if not exists storage_path text;

create index if not exists documentos_tarea_idx on documentos (tarea_id);

-- 3. Permisos de las tablas -----------------------------------
-- La web es pública y sin cuentas, así que el rol anónimo tiene que
-- poder leer y escribir. Es una decisión consciente: cualquiera con
-- el enlace puede marcar tareas y subir archivos.
alter table estado_tareas enable row level security;
alter table documentos    enable row level security;

drop policy if exists "lectura publica"   on estado_tareas;
drop policy if exists "escritura publica" on estado_tareas;
create policy "lectura publica"   on estado_tareas for select using (true);
create policy "escritura publica" on estado_tareas for all    using (true) with check (true);

drop policy if exists "lectura publica"   on documentos;
drop policy if exists "escritura publica" on documentos;
create policy "lectura publica"   on documentos for select using (true);
create policy "escritura publica" on documentos for all    using (true) with check (true);

-- 4. Almacenamiento de archivos -------------------------------
-- Cubo público donde van los SLDPRT, SLDASM, PDF, etc.
insert into storage.buckets (id, name, public)
values ('documentos', 'documentos', true)
on conflict (id) do update set public = true;

drop policy if exists "docs lectura"   on storage.objects;
drop policy if exists "docs escritura" on storage.objects;
create policy "docs lectura"   on storage.objects
  for select using (bucket_id = 'documentos');
create policy "docs escritura" on storage.objects
  for all using (bucket_id = 'documentos') with check (bucket_id = 'documentos');

-- 5. Comprobación ---------------------------------------------
select
  (select count(*) from information_schema.tables
     where table_schema='public' and table_name in ('estado_tareas','documentos'))  as tablas,
  (select count(*) from storage.buckets where id='documentos')                      as cubo,
  'si tablas=2 y cubo=1, está todo listo'                                           as resultado;
