'use client';

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  count: number;
  icon: string;
  iconBg: string;
}

interface CategorySidebarProps {
  categories?: CategoryItem[];
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: "propriedade", name: "Propriedade", count: 12, icon: "🏢", iconBg: "bg-amber-100" },
  { id: "hobbies", name: "Hobbies, Esportes e Crianças", count: 4, icon: "🧸", iconBg: "bg-rose-100" },
  { id: "eletrodomesticos", name: "Eletrodomésticos", count: 6, icon: "🛋️", iconBg: "bg-orange-100" },
  { id: "outros", name: "Outros", count: 3, icon: "📋", iconBg: "bg-emerald-100" },
  { id: "veiculos", name: "Carros e Veículos", count: 8, icon: "🚗", iconBg: "bg-cyan-100" },
  { id: "negocios", name: "Negócios e Indústria", count: 2, icon: "🏭", iconBg: "bg-blue-100" },
  { id: "educacao", name: "Educação", count: 1, icon: "🎓", iconBg: "bg-indigo-100" },
  { id: "eletronicos", name: "Eletrônicos e Celulares", count: 15, icon: "📱", iconBg: "bg-purple-100" },
  { id: "moda", name: "Moda e Beleza", count: 7, icon: "👗", iconBg: "bg-pink-100" },
  { id: "servicos", name: "Serviços", count: 5, icon: "🛠️", iconBg: "bg-yellow-100" },
];

export function CategorySidebar({ categories = DEFAULT_CATEGORIES }: CategorySidebarProps) {
  return (
    <aside className="w-full bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden sticky top-24">
      <div className="divide-y divide-gray-100">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/#anuncios`}
            className="group flex items-center justify-between px-4 py-3.5 hover:bg-rose-50/50 transition-all duration-150"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg ${cat.iconBg} shadow-xs group-hover:scale-105 transition-transform shrink-0`}>
                {cat.icon}
              </span>
              <span className="text-[14px] font-medium text-gray-700 group-hover:text-[#f8485e] transition-colors truncate">
                {cat.name} <span className="text-gray-400 font-normal">({cat.count})</span>
              </span>
            </div>

            <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-[#f8485e] group-hover:bg-[#f8485e]/10 group-hover:translate-x-0.5 transition-all shrink-0 ml-2">
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
