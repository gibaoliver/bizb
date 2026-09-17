import Link from "next/link";
import { Menu, Search, User } from "lucide-react";

export function Header() {
  const categories = [
    { name: "Veículos", icon: "🚗" },
    { name: "Imóveis", icon: "🏠" },
    { name: "Eletrônicos e Celulares", icon: "📱" },
    { name: "Para a sua casa", icon: "🛋️" },
    { name: "Moda e Beleza", icon: "👗" },
    { name: "Serviços", icon: "🛠️" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with Logo and Auth */}
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-2 rounded-lg font-bold text-xl leading-none">
              GC
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">Guia Comercial</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/login" className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
              <User className="w-4 h-4" />
              Entrar
            </Link>
          </div>
        </div>

        {/* Categories Bar */}
        <nav className="flex space-x-8 overflow-x-auto py-3 no-scrollbar border-t border-gray-100">
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              href="#" 
              className="flex flex-col items-center gap-1 min-w-max text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="text-xs font-medium">{cat.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
