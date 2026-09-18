import { Search, MapPin, ChevronDown, Eye, ShoppingCart } from "lucide-react";
import { Header } from "@/components/public/Header";
import { CategorySidebar } from "@/components/public/CategorySidebar";
import { MarketplaceGrid } from "@/components/public/MarketplaceGrid";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export const revalidate = 0; // Para sempre buscar os dados mais recentes na home page

export default async function Home() {
  // Busca os produtos e as lojas do Supabase
  const { data: productsData } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: storesData } = await supabase
    .from('stores')
    .select('*');

  const products = productsData || [];
  const stores = storesData || [];

  // Converte a lista de lojas num mapa para o Grid acessar fácil O(1)
  const storesMap = stores.reduce((acc, store) => {
    acc[store.id] = {
      name: store.name,
      phone: store.phone_whatsapp,
      location: store.address.split('-')[1]?.trim() || store.address,
      slug: store.slug
    };
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex flex-col font-sans">


      <Header />

      <main className="flex-1">
        {/* Hero Section Estilo Classima */}
        <section className="relative bg-gradient-to-r from-[#ff4e63] via-[#f8485e] to-[#f03b50] text-white overflow-hidden py-12 md:py-20 shadow-[inset_0_4px_16px_rgba(0,0,0,0.1)]">
          {/* Grafismo sutil de silhueta urbana no fundo */}
          <div 
            className="absolute inset-0 opacity-10 bg-repeat-x bg-bottom pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 200' fill='%23ffffff'%3E%3Cpath d='M0,200 L0,140 L30,140 L30,110 L60,110 L60,150 L90,150 L90,80 L120,80 L120,200 L160,200 L160,120 L190,120 L190,60 L230,60 L230,200 L300,200 L300,100 L330,100 L330,140 L370,140 L370,200 L440,200 L440,90 L480,90 L480,200 L560,200 L560,130 L600,130 L600,70 L640,70 L640,200 L710,200 L710,110 L750,110 L750,200 L820,200 L820,85 L860,85 L860,145 L900,145 L900,200 L1000,200 Z'/%3E%3C/svg%3E")`,
              backgroundSize: '1000px 140px'
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Modelo com Smartphone (Esquerda) */}
              <div className="hidden lg:flex lg:col-span-3 justify-center items-end relative -mb-12">
                <div className="relative">
                  <div className="w-56 h-64 rounded-t-full bg-white/10 backdrop-blur-xs flex items-center justify-center overflow-hidden border-t-2 border-x-2 border-white/20">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" 
                      alt="Anunciante feliz"
                      className="object-cover w-full h-full object-top"
                    />
                  </div>

                </div>
              </div>

              {/* Centro: Chamada, Localidades e Barra de Busca */}
              <div className="lg:col-span-6 text-center">
                {/* Linha "Encontre qualquer coisa em Todas as localidades" */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                  <span className="text-sm md:text-base font-medium text-white/95">
                    Encontre qualquer coisa em
                  </span>
                  <button className="inline-flex items-center gap-1.5 bg-[#d93348] hover:bg-[#c4283c] text-white text-xs md:text-sm font-semibold px-3.5 py-1.5 rounded-full shadow-inner transition-colors">
                    <MapPin className="w-3.5 h-3.5 text-white" />
                    <span>Todas as localidades</span>
                    <ChevronDown className="w-3 h-3 opacity-80 ml-0.5" />
                  </button>
                </div>

                {/* Barra de Pesquisa Flutuante Arredondada */}
                <div className="bg-white rounded-full p-1.5 md:p-2 shadow-2xl flex items-center max-w-xl mx-auto border border-white/40">
                  <div className="flex-1 flex items-center px-4">
                    <input 
                      type="text"
                      placeholder="Compre, venda, alugue e troque com um só clique."
                      className="w-full py-2 outline-none text-gray-800 placeholder-gray-400 bg-transparent text-xs sm:text-sm font-normal"
                    />
                  </div>
                  <button 
                    type="button"
                    aria-label="Buscar anúncios"
                    className="bg-[#f8485e] hover:bg-[#e2364c] text-white w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center shadow-md transition-all duration-200 transform hover:scale-105 shrink-0"
                  >
                    <Search className="w-4 h-4 md:w-5 md:h-5 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Mosaico de Cards Inclinados (Direita) */}
              <div className="hidden lg:flex lg:col-span-3 justify-center items-center">
                <div className="grid grid-cols-2 gap-3 transform rotate-3 scale-95">
                  {/* Card 1: Smartphone */}
                  <div className="w-24 h-24 rounded-2xl bg-white p-1.5 shadow-xl border-2 border-[#ffb400] overflow-hidden transform hover:-translate-y-1 transition-transform">
                    <img 
                      src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=150&q=80" 
                      alt="Smartphone" 
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  {/* Card 2: Fone */}
                  <div className="w-24 h-24 rounded-2xl bg-white p-1.5 shadow-xl border-2 border-emerald-400 overflow-hidden transform -translate-y-2 hover:-translate-y-3 transition-transform">
                    <img 
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=150&q=80" 
                      alt="Headphones" 
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  {/* Card 3: Veículo */}
                  <div className="w-24 h-24 rounded-2xl bg-white p-1.5 shadow-xl border-2 border-cyan-400 overflow-hidden transform hover:-translate-y-1 transition-transform">
                    <img 
                      src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=150&q=80" 
                      alt="Carro" 
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  {/* Card 4: Moto */}
                  <div className="w-24 h-24 rounded-2xl bg-white p-1.5 shadow-xl border-2 border-[#f8485e] overflow-hidden transform -translate-y-2 hover:-translate-y-3 transition-transform">
                    <img 
                      src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=150&q=80" 
                      alt="Moto" 
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Layout Principal em 2 Colunas (Categorias à Esquerda, Anúncios à Direita) */}
        <section id="anuncios" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            
            {/* Coluna Esquerda: Menu Vertical de Categorias */}
            <div id="categorias" className="lg:col-span-1">
              <CategorySidebar />
            </div>

            {/* Coluna Direita: Lista de Anúncios no Estilo Classima */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200">
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                  Último anúncio publicado
                </h2>
                <span className="text-xs font-semibold text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-2xs">
                  {products.length} anúncios
                </span>
              </div>

              {/* Grade de Anúncios */}
              <MarketplaceGrid products={products} storesMap={storesMap} />
              
              {/* Botão Ver Mais */}
              <div className="mt-12 flex justify-center">
                <button className="bg-white border border-gray-300 text-gray-800 font-bold py-3 px-8 rounded-full hover:bg-gray-50 hover:border-gray-400 hover:text-[#f8485e] transition-all shadow-xs duration-200">
                  Ver mais anúncios
                </button>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}
