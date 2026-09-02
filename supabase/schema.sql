-- ZR Bloom: esquema inicial de clientes y pedidos.
-- Pega y ejecuta este archivo entero en Supabase -> SQL Editor -> New query -> Run.

create table if not exists customers (
    id uuid primary key default gen_random_uuid(),
    email text not null unique,
    name text,
    phone text,
    created_at timestamptz not null default now()
);

create table if not exists orders (
    id uuid primary key default gen_random_uuid(),
    customer_id uuid references customers(id),
    stripe_session_id text not null unique,
    stripe_payment_intent_id text,
    status text not null default 'paid',
    fulfillment_status text not null default 'pago_recibido',
    subtotal numeric(10, 2) not null,
    total numeric(10, 2) not null,
    currency text not null default 'eur',
    shipping_address jsonb,
    shipping_phone text,
    created_at timestamptz not null default now()
);

create table if not exists order_items (
    id uuid primary key default gen_random_uuid(),
    order_id uuid not null references orders(id) on delete cascade,
    product_id integer not null,
    product_name text not null,
    unit_price numeric(10, 2) not null,
    quantity integer not null,
    selections jsonb,
    selections_label text
);

-- Seguridad: activamos Row Level Security y no añadimos ninguna política.
-- Esto bloquea el acceso a estas tablas desde el navegador (clave "anon"),
-- y solo permite leer/escribir usando la clave "service_role" desde
-- nuestro propio servidor (lib/supabase.ts). El cliente nunca habla con
-- la base de datos directamente.
alter table customers enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
