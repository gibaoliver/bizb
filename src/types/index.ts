export interface Store {
  id: string; // UUID
  created_at: string;
  name: string;
  slug: string; // URL-friendly (ex: /loja/minha-loja)
  description: string;
  logo_url?: string;
  banner_url?: string;
  category: string;
  phone_whatsapp: string;
  address: string;
  is_verified: boolean;
  social_links: {
    instagram?: string;
    facebook?: string;
    website?: string;
  };
}

export interface OperatingHours {
  id: string; // UUID
  store_id: string; // Relacionamento com Store
  day_of_week: number; // 0 (Domingo) a 6 (Sábado)
  open_time: string; // Formato "HH:MM" (ex: "08:00")
  close_time: string; // Formato "HH:MM" (ex: "18:00")
  is_closed: boolean; // Indica se no dia a loja não abre
}

export interface Product {
  id: string; // UUID
  store_id: string; // Relacionamento com Store
  name: string;
  description: string;
  image_url: string;
  price: number;
  promotional_price?: number;
  in_stock: boolean;
  created_at: string;
}

export interface Review {
  id: string; // UUID
  store_id: string; // Relacionamento com Store
  author_name: string;
  rating: number; // 1 a 5
  comment: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED'; // Moderação
  created_at: string;
}
