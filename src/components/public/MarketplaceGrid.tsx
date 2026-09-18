'use client';

import { Product } from "@/types";
import { generateWhatsAppLink } from "@/lib/utils";
import { Clock, MapPin, Store } from "lucide-react";

interface MarketplaceGridProps {
  products: Product[];
  storesMap: Record<string, { name: string, phone: string, location: string, slug: string }>;
}

function formatRelativeTime(dateString: string) {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Agora mesmo";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `Há ${diffInMinutes} min`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Há ${diffInHours} horas`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Ontem";
    if (diffInDays < 30) return `Há ${diffInDays} dias`;
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `Há ${diffInMonths} meses`;
    const diffInYears = Math.floor(diffInDays / 365);
    return `Há ${diffInYears} anos`;
  } catch {
    return "Recentemente";
  }
}

export function MarketplaceGrid({ products, storesMap }: MarketplaceGridProps) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
        <p className="text-gray-500 text-base font-medium">Nenhum anúncio encontrado no momento.</p>
        <p className="text-gray-400 text-sm mt-1">Seja o primeiro a publicar um anúncio nesta região!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {products.map((product, index) => {
        const storeInfo = storesMap[product.store_id];
        const isFeatured = index % 3 === 0;
        const tagType = index % 2 === 0 ? "À venda" : "Para comprar";
        
        // Gera mensagem pronta para WhatsApp
        const text = `Olá, vi o anúncio "${product.name}" no Classima e tenho interesse!`;
        const waLink = storeInfo ? generateWhatsAppLink(storeInfo.phone, text) : '#';

        return (
          <a 
            key={product.id}
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex flex-col bg-white rounded-xl border transition-all duration-300 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 ${
              isFeatured ? 'border-amber-300/80 ring-1 ring-amber-300/40' : 'border-gray-200'
            }`}
          >
            {/* Imagem com Badges e Fitas estilo Classima */}
            <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
              <img 
                src={product.image_url} 
                alt={product.name}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />

              {/* Fitas / Ribbons superiores esquerdas */}
              <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 items-start">
                {isFeatured && (
                  <div className="relative bg-[#ffb400] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-sm shadow-sm uppercase tracking-wider flex items-center">
                    Apresentou
                    {/* Pequeno detalhe de corte de fita */}
                    <div className="absolute -right-1 top-0 bottom-0 w-1 bg-[#ffb400]" />
                  </div>
                )}
                <div className="bg-[#f8485e] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-sm shadow-sm uppercase tracking-wider">
                  {tagType}
                </div>
              </div>

              {/* Fita diagonal de canto para itens selecionados */}
              {index === 1 && (
                <div className="absolute -right-12 top-6 bg-[#e60023] text-white text-[10px] font-extrabold py-0.5 px-12 rotate-45 shadow-md uppercase tracking-wider z-10 pointer-events-none">
                  Vendido
                </div>
              )}
            </div>
            
            {/* Informações do Anúncio */}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-[15px] font-bold text-gray-900 group-hover:text-[#f8485e] transition-colors line-clamp-1 mb-1.5">
                {product.name}
              </h3>

              {/* Tempo decorrido com relógio */}
              <div className="flex items-center text-xs text-gray-400 gap-1.5 mb-3">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>{formatRelativeTime(product.created_at)}</span>
              </div>
              
              {/* Preço em destaque vermelho coral */}
              <div className="mt-auto">
                <div className="flex items-baseline gap-2">
                  <p className="text-xl font-extrabold text-[#f8485e]">
                    R$ {(product.promotional_price || product.price).toFixed(2).replace('.', ',')}
                  </p>
                  {product.promotional_price && (
                    <span className="text-xs text-gray-400 line-through">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>
                
                {/* Rodapé do card: Loja e Endereço */}
                <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
                  <div className="flex items-center text-xs text-gray-600 font-medium gap-1.5 truncate">
                    <Store className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="truncate">{storeInfo?.name || 'Vendedor Verificado'}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-400 gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="truncate">{storeInfo?.location || 'Brasil'}</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
