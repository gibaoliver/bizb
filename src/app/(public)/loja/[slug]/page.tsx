import { StoreStatus } from "@/components/public/StoreStatus";
import { ProductGrid } from "@/components/public/ProductGrid";
import { MapPin, Phone, AtSign, Globe, Store } from "lucide-react";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

export default async function StorePage({ params }: { params: { slug: string } }) {
  // Busca a loja pelo slug
  const { data: store, error: storeError } = await supabase
    .from('stores')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (storeError || !store) {
    notFound();
  }

  // Busca os horários e produtos
  const [hoursResponse, productsResponse] = await Promise.all([
    supabase.from('operating_hours').select('*').eq('store_id', store.id),
    supabase.from('products').select('*').eq('store_id', store.id)
  ]);

  const hours = hoursResponse.data || [];
  const products = productsResponse.data || [];

  return (
    <main className="min-h-screen bg-zinc-50 pb-20">
      {/* Banner */}
      <div className="w-full h-48 md:h-64 bg-gray-200 relative">
        {store.banner_url && (
          <img 
            src={store.banner_url} 
            alt={`Banner da ${store.name}`}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* Cabeçalho da Loja */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6 items-start md:items-end">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 border-white bg-white overflow-hidden shadow-md shrink-0 flex items-center justify-center">
            {store.logo_url ? (
              <img 
                src={store.logo_url} 
                alt={`Logo da ${store.name}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <Store className="w-12 h-12 text-gray-300" />
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 px-2 py-1 rounded-md">
                {store.category}
              </span>
              {store.is_verified && (
                <span className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-md flex items-center gap-1">
                  ✓ Verificado
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{store.name}</h1>
            <p className="text-gray-500 mt-2 max-w-2xl text-sm md:text-base">{store.description}</p>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            <StoreStatus hours={hours} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Coluna da Esquerda: Informações e Contato */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações</h2>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-600 text-sm">
                  <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                  <span>{store.address}</span>
                </li>
                <li className="flex items-center gap-3 text-gray-600 text-sm">
                  <Phone className="w-5 h-5 text-gray-400 shrink-0" />
                  <span>{store.phone_whatsapp.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4')}</span>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Redes Sociais</h3>
                <div className="flex gap-3">
                  {store.social_links?.instagram && (
                    <a href={store.social_links.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                      <AtSign className="w-5 h-5" />
                    </a>
                  )}
                  {store.social_links?.website && (
                    <a href={store.social_links.website} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Coluna da Direita: Catálogo de Produtos */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Produtos e Serviços</h2>
            <ProductGrid products={products} storePhone={store.phone_whatsapp} />
          </div>
        </div>
      </div>
    </main>
  );
}
