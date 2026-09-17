'use client';

import { Product } from "@/types";
import { generateWhatsAppLink } from "@/lib/utils";
import { MapPin, Store } from "lucide-react";
import Link from "next/link";

interface MarketplaceGridProps {
  products: Product[];
  storesMap: Record<string, { name: string, phone: string, location: string, slug: string }>;
}

export function MarketplaceGrid({ products, storesMap }: MarketplaceGridProps) {
  if (products.length === 0) {
    return <p className="text-gray-500 text-center py-8">Nenhum anúncio encontrado.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => {
        const storeInfo = storesMap[product.store_id];
        
        // Gera mensagem pronta
        const text = `Olá, vi o anúncio "${product.name}" no Guia Comercial e tenho interesse.`;
        const waLink = storeInfo ? generateWhatsAppLink(storeInfo.phone, text) : '#';

        return (
          <a 
            key={product.id}
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            {/* Imagem */}
            <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
              <img 
                src={product.image_url} 
                alt={product.name}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Corpo */}
            <div className="p-3 flex flex-col flex-1">
              <h3 className="text-sm text-gray-700 line-clamp-2 mb-2 min-h-[40px]">
                {product.name}
              </h3>
              
              <div className="mt-auto">
                <p className="text-lg font-bold text-gray-900">
                  R$ {(product.promotional_price || product.price).toFixed(2).replace('.', ',')}
                </p>
                
                <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
                  <div className="flex items-center text-xs text-gray-500 gap-1 truncate">
                    <Store className="w-3 h-3 shrink-0" />
                    <span className="truncate">{storeInfo?.name || 'Loja Desconhecida'}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-400 gap-1 truncate">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{storeInfo?.location || 'Local não informado'}</span>
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
