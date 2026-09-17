import { Search, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/public/Header";
import { MarketplaceGrid } from "@/components/public/MarketplaceGrid";
import { MOCK_PRODUCTS, MOCK_STORES_LIST } from "@/lib/mock";

export default function Home() {
  // Converte a lista de lojas num mapa para o Grid acessar fácil O(1)
  const storesMap = MOCK_STORES_LIST.reduce((acc, store) => {
    acc[store.id] = {
      name: store.name,
      phone: store.phone_whatsapp,
      location: store.address.split('-')[1]?.trim() || store.address, // pega a cidade/bairro se tiver
      slug: store.slug
    };
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero & Busca */}
        <section className="bg-indigo-700 py-10 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              O que você procura hoje?
            </h1>
            
            <div className="flex bg-white rounded-lg p-2 shadow-lg max-w-3xl mx-auto items-center">
              <div className="flex-1 flex items-center px-4 border-r border-gray-200">
                <Search className="w-5 h-5 text-gray-400 mr-2 shrink-0" />
                <input 
                  type="text"
                  placeholder="Estou procurando por..."
                  className="w-full py-3 outline-none text-gray-700 bg-transparent"
                />
              </div>
              <button className="hidden sm:flex items-center px-4 text-gray-500 hover:text-indigo-600 transition-colors">
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filtros
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 md:px-8 rounded-md transition-colors ml-2">
                Buscar
              </button>
            </div>
          </div>
        </section>

        {/* Feed de Produtos */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Anúncios Recentes</h2>
            <span className="text-sm text-gray-500">{MOCK_PRODUCTS.length} resultados</span>
          </div>

          <MarketplaceGrid products={MOCK_PRODUCTS} storesMap={storesMap} />
          
          <div className="mt-12 flex justify-center">
            <button className="bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-8 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
              Ver mais anúncios
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
