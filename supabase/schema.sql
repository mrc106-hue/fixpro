-- FixPro — Supabase Schema
-- Run this in Supabase SQL editor

-- ============================================
-- EXTENSIONS
-- ============================================
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm"; -- for text search

-- ============================================
-- TABLE: profesionales
-- ============================================
create table if not exists profesionales (
  id                       uuid primary key default uuid_generate_v4(),
  slug                     text unique not null,
  nombre                   text not null,
  email                    text unique not null,
  telefono                 text not null,
  whatsapp                 text,
  sector                   text not null,
  provincia                text not null,
  comunidad                text,
  descripcion              text,
  web                      text,
  instagram                text,
  anos_experiencia         integer,
  foto_perfil              text,    -- storage URL
  fotos                    text[],  -- array of storage URLs
  plan                     text not null default 'gratis' check (plan in ('gratis','estandar','premium','vip')),
  activo                   boolean not null default false,
  verificado               boolean not null default false,
  valoracion_media         numeric(3,2) default 0,
  total_valoraciones       integer default 0,
  vistas_totales           integer default 0,
  vistas_mes               integer default 0,
  leads_mes                integer default 0,
  stripe_customer_id       text,
  stripe_subscription_id   text,
  stripe_checkout_session  text,
  plan_activo_desde        timestamptz,
  plan_renovado            timestamptz,
  created_at               timestamptz default now(),
  updated_at               timestamptz default now()
);

-- Indexes
create index if not exists idx_pros_sector    on profesionales(sector);
create index if not exists idx_pros_provincia on profesionales(provincia);
create index if not exists idx_pros_plan      on profesionales(plan);
create index if not exists idx_pros_activo    on profesionales(activo);
create index if not exists idx_pros_slug      on profesionales(slug);
create index if not exists idx_pros_email     on profesionales(email);
create index if not exists idx_pros_search    on profesionales using gin(nombre gin_trgm_ops);

-- ============================================
-- TABLE: leads
-- ============================================
create table if not exists leads (
  id                  uuid primary key default uuid_generate_v4(),
  profesional_id      uuid references profesionales(id) on delete set null,
  sector              text not null,
  provincia           text not null,
  descripcion         text not null,
  nombre_cliente      text not null,
  email_cliente       text,
  telefono_cliente    text not null,
  urgente             boolean default false,
  estado              text not null default 'nuevo' check (estado in ('nuevo','contactado','presupuestado','cerrado','rechazado')),
  notas_pro           text,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

create index if not exists idx_leads_pro    on leads(profesional_id);
create index if not exists idx_leads_sector on leads(sector);
create index if not exists idx_leads_estado on leads(estado);
create index if not exists idx_leads_fecha  on leads(created_at desc);

-- ============================================
-- TABLE: valoraciones
-- ============================================
create table if not exists valoraciones (
  id              uuid primary key default uuid_generate_v4(),
  profesional_id  uuid not null references profesionales(id) on delete cascade,
  nombre_cliente  text not null,
  puntuacion      integer not null check (puntuacion between 1 and 5),
  comentario      text,
  verificada      boolean default false,
  created_at      timestamptz default now()
);

create index if not exists idx_val_pro on valoraciones(profesional_id);

-- Trigger: update valoracion_media after insert
create or replace function update_valoracion_media()
returns trigger as $$
begin
  update profesionales
  set
    valoracion_media     = (select round(avg(puntuacion)::numeric, 2) from valoraciones where profesional_id = new.profesional_id),
    total_valoraciones   = (select count(*) from valoraciones where profesional_id = new.profesional_id)
  where id = new.profesional_id;
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_update_valoracion on valoraciones;
create trigger trg_update_valoracion
after insert or update or delete on valoraciones
for each row execute function update_valoracion_media();

-- ============================================
-- TABLE: vistas
-- ============================================
create table if not exists vistas (
  id              uuid primary key default uuid_generate_v4(),
  profesional_id  uuid not null references profesionales(id) on delete cascade,
  ip_hash         text,  -- hashed for privacy
  referrer        text,
  created_at      timestamptz default now()
);

create index if not exists idx_vistas_pro   on vistas(profesional_id);
create index if not exists idx_vistas_fecha on vistas(created_at desc);

-- ============================================
-- TABLE: presupuestos (public requests)
-- ============================================
create table if not exists presupuestos (
  id              uuid primary key default uuid_generate_v4(),
  sector          text not null,
  provincia       text not null,
  descripcion     text not null,
  nombre_cliente  text not null,
  email_cliente   text,
  telefono        text not null,
  urgente         boolean default false,
  disponibilidad  text,
  estado          text default 'activo' check (estado in ('activo','cerrado','expirado')),
  created_at      timestamptz default now()
);

-- ============================================
-- TABLE: pagos (audit log)
-- ============================================
create table if not exists pagos (
  id                  uuid primary key default uuid_generate_v4(),
  profesional_id      uuid references profesionales(id),
  stripe_event_id     text unique,
  tipo                text,  -- checkout.completed, invoice.paid, subscription.deleted
  plan                text,
  importe             numeric(10,2),
  moneda              text default 'eur',
  estado              text default 'completado',
  created_at          timestamptz default now()
);

-- ============================================
-- RLS (Row Level Security)
-- ============================================
alter table profesionales enable row level security;
alter table leads         enable row level security;
alter table valoraciones  enable row level security;
alter table vistas        enable row level security;
alter table presupuestos  enable row level security;
alter table pagos         enable row level security;

-- Public can read active profesionales
create policy "Public read active pros"
  on profesionales for select
  using (activo = true);

-- Anyone can submit presupuesto
create policy "Public insert presupuestos"
  on presupuestos for insert
  with check (true);

-- Anyone can insert valoraciones
create policy "Public insert valoraciones"
  on valoraciones for insert
  with check (true);

-- Service role has full access (bypasses RLS)
-- Used by backend API routes with SUPABASE_SERVICE_ROLE_KEY

-- ============================================
-- FUNCTIONS: reset monthly counters
-- ============================================
create or replace function reset_monthly_counters()
returns void as $$
begin
  update profesionales
  set vistas_mes = 0, leads_mes = 0;
end;
$$ language plpgsql;

-- Schedule via pg_cron or call from webhook first day of month
-- select cron.schedule('reset-monthly', '0 0 1 * *', 'select reset_monthly_counters()');

-- ============================================
-- SEED: initial data check
-- ============================================
-- Verify setup
select 'FixPro schema installed successfully' as status;
select count(*) as profesionales_count from profesionales;
