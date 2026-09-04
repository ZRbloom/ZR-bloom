-- ZR Bloom: añade campos de dirección al CRM de clientes.
-- Pega y ejecuta este archivo entero en Supabase -> SQL Editor -> New query -> Run.
-- No recrea la tabla customers: solo añade columnas nuevas a la que ya existe.

alter table customers
    add column if not exists address text,
    add column if not exists postal_code text,
    add column if not exists city text,
    add column if not exists updated_at timestamptz not null default now();
