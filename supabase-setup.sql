-- جدول المزامنة لتطبيق زمزم (شغّله مرة واحدة في Supabase → SQL Editor)
create table if not exists public.kv (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table public.kv enable row level security;

drop policy if exists "zamzam_anon_all" on public.kv;
create policy "zamzam_anon_all" on public.kv
  for all to anon
  using (true)
  with check (true);
