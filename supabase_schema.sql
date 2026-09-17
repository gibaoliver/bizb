-- Criar as tabelas principais do sistema de classificados/guia comercial

-- 1. Tabela de Lojas (Stores)
CREATE TABLE public.stores (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL,
  logo_url text,
  banner_url text,
  category text NOT NULL,
  phone_whatsapp text NOT NULL,
  address text NOT NULL,
  is_verified boolean DEFAULT false NOT NULL,
  social_links jsonb DEFAULT '{}'::jsonb NOT NULL
);

-- 2. Tabela de Horário de Funcionamento (Operating Hours)
CREATE TABLE public.operating_hours (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id uuid REFERENCES public.stores(id) ON DELETE CASCADE NOT NULL,
  day_of_week integer NOT NULL, -- 0 (Domingo) a 6 (Sábado)
  open_time time without time zone,
  close_time time without time zone,
  is_closed boolean DEFAULT false NOT NULL,
  UNIQUE(store_id, day_of_week)
);

-- 3. Tabela de Produtos (Products)
CREATE TABLE public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id uuid REFERENCES public.stores(id) ON DELETE CASCADE NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  price numeric(10,2) NOT NULL,
  promotional_price numeric(10,2),
  in_stock boolean DEFAULT true NOT NULL
);

-- 4. Tabela de Avaliações (Reviews)
CREATE TABLE public.reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id uuid REFERENCES public.stores(id) ON DELETE CASCADE NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  author_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  status text DEFAULT 'PENDING' NOT NULL CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED'))
);

-- -----------------------------------------------------------------------------------------
-- POLÍTICAS DE SEGURANÇA BÁSICAS (Row Level Security - RLS)
-- -----------------------------------------------------------------------------------------

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.operating_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Políticas de Leitura Pública (Qualquer um pode ler dados aprovados/ativos)
CREATE POLICY "Lojas são públicas" ON public.stores FOR SELECT USING (true);
CREATE POLICY "Horários são públicos" ON public.operating_hours FOR SELECT USING (true);
CREATE POLICY "Produtos são públicos" ON public.products FOR SELECT USING (true);
CREATE POLICY "Avaliações aprovadas são públicas" ON public.reviews FOR SELECT USING (status = 'APPROVED');
CREATE POLICY "Qualquer um pode inserir avaliação" ON public.reviews FOR INSERT WITH CHECK (true);

-- (Nota: Políticas de UPDATE/DELETE/INSERT para Lojas e Produtos deveriam checar se o usuário é o Admin logado. 
-- Por enquanto, para facilitar seus testes manuais se usar a chave anon com RLS fraco ou via painel do supabase, deixaremos RLS apenas para SELECT público).

-- -----------------------------------------------------------------------------------------
-- DADOS MOCKADOS INICIAIS (INSERTS PARA TESTES)
-- -----------------------------------------------------------------------------------------

-- Vamos forçar UUIDs estáticos para facilitar os relacionamentos abaixo
INSERT INTO public.stores (id, name, slug, description, logo_url, banner_url, category, phone_whatsapp, address, is_verified, social_links)
VALUES 
('11111111-1111-1111-1111-111111111111', 'TechStore Brasil', 'techstore-brasil', 'A melhor loja de eletrônicos.', 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&q=80&w=200&h=200', 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=1200&h=400', 'Eletrônicos', '5511999999999', 'Av. Paulista, 1000 - Bela Vista', true, '{"instagram": "https://instagram.com/techstore"}'),
('22222222-2222-2222-2222-222222222222', 'Móveis e Cia', 'moveis-e-cia', 'Tudo para sua casa.', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=200&h=200', null, 'Para a sua casa', '5511988888888', 'Rua das Flores, 123 - Centro', false, '{}'),
('33333333-3333-3333-3333-333333333333', 'Bike Shop Extremo', 'bike-shop-extremo', 'Bicicletas e acessórios.', 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=200&h=200', null, 'Esportes', '5511977777777', 'Av. Esportes, 45 - Vila Rica', true, '{}');

-- Inserindo alguns produtos relacionados (usando os UUIDs das lojas acima)
INSERT INTO public.products (store_id, name, description, image_url, price, promotional_price, in_stock)
VALUES
('11111111-1111-1111-1111-111111111111', 'Smartphone Pro Max', 'Câmera tripla e bateria excelente', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600&h=400', 4999.90, 4599.90, true),
('22222222-2222-2222-2222-222222222222', 'Sofá Retrátil 3 Lugares Suede', 'Muito confortável.', 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600&h=400', 1299.00, null, true),
('33333333-3333-3333-3333-333333333333', 'Bicicleta Aro 29 Mountain Bike', 'Quadro alumínio, freio a disco.', 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600&h=400', 1850.00, 1599.00, true),
('22222222-2222-2222-2222-222222222222', 'Mesa de Jantar 6 Cadeiras', 'Madeira maciça de reflorestamento.', 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&q=80&w=600&h=400', 2400.00, null, true);

-- Inserindo horários de funcionamento para a TechStore (ID 1)
INSERT INTO public.operating_hours (store_id, day_of_week, open_time, close_time, is_closed)
VALUES
('11111111-1111-1111-1111-111111111111', 0, null, null, true), -- Domingo fechado
('11111111-1111-1111-1111-111111111111', 1, '09:00:00', '18:00:00', false),
('11111111-1111-1111-1111-111111111111', 2, '09:00:00', '18:00:00', false),
('11111111-1111-1111-1111-111111111111', 3, '09:00:00', '18:00:00', false),
('11111111-1111-1111-1111-111111111111', 4, '09:00:00', '18:00:00', false),
('11111111-1111-1111-1111-111111111111', 5, '09:00:00', '18:00:00', false),
('11111111-1111-1111-1111-111111111111', 6, '10:00:00', '14:00:00', false);
