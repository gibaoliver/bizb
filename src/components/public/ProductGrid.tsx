'use client';

import { Product } from "@/types";
import { generateWhatsAppLink } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import Image from "next/image";

interface ProductGridProps {
  products: Product[];
  storePhone: string;
}

export function ProductGrid({ products, storePhone }: ProductGridProps) {
  if (products.length === 0) {
    return <p className="text-gray-500 text-center py-8">Nenhum produto cadastrado.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const text = `Olá, vi o produto "${product.name}" no guia comercial e gostaria de mais informações.`;
        const waLink = generateWhatsAppLink(storePhone, text);

        return (
          <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
            <div className="relative h-48 w-full bg-gray-100">
              <img 
                src={product.image_url} 
                alt={product.name}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              {!product.in_stock && (
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded">
                  Esgotado
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
              
              <div className="mt-4 flex items-end justify-between">
                <div>
                  {product.promotional_price ? (
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 line-through">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        R$ {product.promotional_price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-gray-900">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>
                
                <a 
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center p-2 rounded-xl transition-colors ${
                    product.in_stock 
                      ? "bg-green-500 hover:bg-green-600 text-white" 
                      : "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none"
                  }`}
                  aria-label="Pedir no WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
