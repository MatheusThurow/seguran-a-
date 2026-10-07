-- Execute no SQL Editor do seu projeto Supabase.
begin;
create table public.participacoes (
 id uuid primary key,
 created_at timestamptz not null default now(),
 version text not null check (length(version)<=40),
 pre_answers integer[] not null check (cardinality(pre_answers)=3 and pre_answers <@ array[0,1,2]),
 pre_score integer not null check (pre_score between 0 and 3),
 post_answers integer[] not null check (cardinality(post_answers)=3 and post_answers <@ array[0,1,2]),
 post_score integer not null check (post_score between 0 and 3),
 outcome text not null check (outcome in ('purchase','quit')),
 analysis_ms integer not null check (analysis_ms>=0),
 events jsonb not null check (jsonb_typeof(events)='array' and octet_length(events::text)<=30000)
);
alter table public.participacoes enable row level security;
revoke all on public.participacoes from anon, authenticated;
grant insert on public.participacoes to anon;
create policy "Enviar participacao sem leitura publica" on public.participacoes for insert to anon with check (true);
commit;
-- Leitura, edição e exclusão não são permitidas aos visitantes.
-- Consulte/exporte os resultados pelo painel do projeto (Table Editor).
