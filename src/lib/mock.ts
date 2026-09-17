import { Store, OperatingHours, Product, Review } from "@/types";

export const MOCK_STORE: Store = {
  id: "1",
  created_at: new Date().toISOString(),
  name: "TechStore Brasil",
  slug: "techstore-brasil",
  description: "A melhor loja de eletrônicos e gadgets tecnológicos. Trazemos os últimos lançamentos em smartphones, notebooks e acessórios com os melhores preços.",
  logo_url: "https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&q=80&w=200&h=200",
  banner_url: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=1200&h=400",
  category: "Eletrônicos",
  phone_whatsapp: "5511999999999",
  address: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
  is_verified: true,
  social_links: {
    instagram: "https://instagram.com/techstore",
    website: "https://techstore.com.br"
  }
};

export const MOCK_HOURS: OperatingHours[] = [
  { id: "h0", store_id: "1", day_of_week: 0, open_time: "00:00", close_time: "00:00", is_closed: true }, // Dom
  { id: "h1", store_id: "1", day_of_week: 1, open_time: "09:00", close_time: "18:00", is_closed: false }, // Seg
  { id: "h2", store_id: "1", day_of_week: 2, open_time: "09:00", close_time: "18:00", is_closed: false }, // Ter
  { id: "h3", store_id: "1", day_of_week: 3, open_time: "09:00", close_time: "18:00", is_closed: false }, // Qua
  { id: "h4", store_id: "1", day_of_week: 4, open_time: "09:00", close_time: "18:00", is_closed: false }, // Qui
  { id: "h5", store_id: "1", day_of_week: 5, open_time: "09:00", close_time: "18:00", is_closed: false }, // Sex
  { id: "h6", store_id: "1", day_of_week: 6, open_time: "10:00", close_time: "14:00", is_closed: false }, // Sab
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    store_id: "1",
    name: "Smartphone Pro Max 256GB",
    description: "Câmera tripla de 48MP, bateria para o dia todo e processador ultrarrápido.",
    image_url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600&h=400",
    price: 4999.90,
    promotional_price: 4599.90,
    in_stock: true,
    created_at: new Date().toISOString()
  },
  {
    id: "p2",
    store_id: "1",
    name: "Fone de Ouvido Noise Cancelling",
    description: "Cancelamento de ruído ativo, bateria de 30 horas, som de alta fidelidade.",
    image_url: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600&h=400",
    price: 899.00,
    in_stock: true,
    created_at: new Date().toISOString()
  },
  {
    id: "p3",
    store_id: "1",
    name: "Smartwatch Fitness T-Rex",
    description: "Monitoramento cardíaco, GPS integrado, resistente à água 5ATM.",
    image_url: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=600&h=400",
    price: 650.00,
    promotional_price: 599.00,
    in_stock: false,
    created_at: new Date().toISOString()
  },
  {
    id: "p4",
    store_id: "2",
    name: "Sofá Retrátil 3 Lugares Suede",
    description: "Muito confortável, ideal para salas de TV. Assento com molas ensacadas.",
    image_url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600&h=400",
    price: 1299.00,
    in_stock: true,
    created_at: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: "p5",
    store_id: "3",
    name: "Bicicleta Aro 29 Mountain Bike",
    description: "Quadro em alumínio, câmbio Shimano 21 marchas e freio a disco.",
    image_url: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600&h=400",
    price: 1850.00,
    promotional_price: 1599.00,
    in_stock: true,
    created_at: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: "p6",
    store_id: "2",
    name: "Mesa de Jantar 6 Cadeiras Madeira Maciça",
    description: "Design moderno com acabamento premium. Madeira de reflorestamento.",
    image_url: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&q=80&w=600&h=400",
    price: 2400.00,
    in_stock: true,
    created_at: new Date(Date.now() - 86400000).toISOString()
  }
];

export const MOCK_STORES_LIST = [
  MOCK_STORE,
  {
    id: "2",
    name: "Móveis e Cia",
    slug: "moveis-e-cia",
    address: "Rua das Flores, 123 - Centro",
    phone_whatsapp: "5511988888888",
  },
  {
    id: "3",
    name: "Bike Shop Extremo",
    slug: "bike-shop-extremo",
    address: "Av. Esportes, 45 - Vila Rica",
    phone_whatsapp: "5511977777777",
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    store_id: "1",
    author_name: "Carlos Silva",
    rating: 5,
    comment: "Excelente atendimento! O produto chegou no mesmo dia e em perfeito estado. Recomendo muito.",
    status: "APPROVED",
    created_at: new Date(Date.now() - 86400000).toISOString() // ontem
  },
  {
    id: "r2",
    store_id: "1",
    author_name: "Mariana Costa",
    rating: 4,
    comment: "Gostei da variedade de produtos, mas a loja física estava muito cheia. O preço estava ótimo.",
    status: "APPROVED",
    created_at: new Date(Date.now() - 2 * 86400000).toISOString()
  }
];
