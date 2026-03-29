-- ══════════════════════════════════════════════
-- HomeConcept · Supabase Schema
-- Colar no SQL Editor do Supabase e executar
-- ══════════════════════════════════════════════

create table colaboradores (
  id text primary key,
  nome text not null default '',
  funcao text default '',
  salario numeric default 0,
  "valorDia" numeric default 0,
  ss boolean default false,
  duodecimos numeric default 0,
  sabados_rate numeric default 0,
  archived boolean default false,
  "diaWorker" boolean default false
);

create table registos (
  id bigint primary key,
  tipo text not null,
  colaborador text,
  mes text,
  data text,
  modo text,
  dias numeric,
  horas numeric,
  "tipoFalta" text,
  obs text default '',
  "numSabados" numeric,
  "valorUnit" numeric,
  "totalValor" numeric,
  valor numeric,
  "valorDia" numeric,
  total numeric,
  "tipoExtra" text,
  "tipoLabel" text,
  "valorHora" numeric,
  descricao text
);

create table obras (
  id text primary key,
  nome text not null,
  codigo text default '',
  cliente text default '',
  inicio text,
  estado text default 'ativa',
  faturado numeric default 0
);

create table faturas (
  id text primary key,
  fornecedor text not null,
  data text,
  descricao text default '',
  valor numeric not null default 0,
  "obraId" text,
  origem text default 'Manual'
);

create table alocacoes (
  id bigint primary key,
  "colabId" text,
  "obraId" text,
  periodo text default '',
  dias integer default 0,
  data text
);

create table ferias (
  id bigint primary key,
  "colabId" text,
  inicio text,
  fim text,
  dias integer default 0,
  ano integer,
  obs text default ''
);

-- Tabela para dados genéricos (validacoes, etc.)
create table settings (
  key text primary key,
  value jsonb not null default '{}'
);

-- ── RLS: permitir tudo para anon (a app tem login próprio) ──
alter table colaboradores enable row level security;
alter table registos enable row level security;
alter table obras enable row level security;
alter table faturas enable row level security;
alter table alocacoes enable row level security;
alter table ferias enable row level security;
alter table settings enable row level security;

create policy "allow all" on colaboradores for all to anon using (true) with check (true);
create policy "allow all" on registos for all to anon using (true) with check (true);
create policy "allow all" on obras for all to anon using (true) with check (true);
create policy "allow all" on faturas for all to anon using (true) with check (true);
create policy "allow all" on alocacoes for all to anon using (true) with check (true);
create policy "allow all" on ferias for all to anon using (true) with check (true);
create policy "allow all" on settings for all to anon using (true) with check (true);

-- ── Ativar Realtime para todas as tabelas ──
alter publication supabase_realtime add table colaboradores;
alter publication supabase_realtime add table registos;
alter publication supabase_realtime add table obras;
alter publication supabase_realtime add table faturas;
alter publication supabase_realtime add table alocacoes;
alter publication supabase_realtime add table ferias;
alter publication supabase_realtime add table settings;
