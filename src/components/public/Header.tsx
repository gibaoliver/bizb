'use client';

import Link from "next/link";
import { ChevronDown, MessageSquare, Plus, User, Menu as MenuIcon, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#f8485e] sticky top-0 z-50 text-white shadow-[0_4px_20px_rgba(0,0,0,0.12),inset_0_3px_6px_rgba(0,0,0,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex flex-col group">
            <div className="flex items-center gap-1.5">
              <span className="text-3xl font-extrabold tracking-tight text-white font-serif italic drop-shadow-sm">
                Classima
              </span>
            </div>
            <span className="text-[11px] font-medium tracking-wide text-white/90 uppercase -mt-1">
              Classifieds Portal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 text-[15px] font-medium text-white">
            <Link 
              href="/" 
              className="flex items-center gap-1 text-white hover:text-white/80 transition-colors py-2 font-semibold"
            >
              Lar
              <ChevronDown className="w-3.5 h-3.5 opacity-80" />
            </Link>

            <Link 
              href="/#anuncios" 
              className="flex items-center gap-1 text-white/90 hover:text-white transition-colors py-2"
            >
              Todos Os Anúncios
              <ChevronDown className="w-3.5 h-3.5 opacity-80" />
            </Link>

            <Link 
              href="/#categorias" 
              className="flex items-center gap-1 text-white/90 hover:text-white transition-colors py-2"
            >
              Páginas
              <ChevronDown className="w-3.5 h-3.5 opacity-80" />
            </Link>

            <Link 
              href="/#lojas" 
              className="flex items-center gap-1 text-white/90 hover:text-white transition-colors py-2"
            >
              Lojas
              <ChevronDown className="w-3.5 h-3.5 opacity-80" />
            </Link>

            <Link 
              href="/#contato" 
              className="text-white/90 hover:text-white transition-colors py-2"
            >
              Contato
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Chat / Message */}
            <Link 
              href="#" 
              aria-label="Mensagens" 
              className="hidden sm:flex text-white hover:text-white/80 transition-colors p-1.5"
            >
              <MessageSquare className="w-5 h-5" />
            </Link>

            {/* Profile / Login */}
            <Link 
              href="/login" 
              aria-label="Conta de usuário" 
              className="text-white hover:text-white/80 transition-colors p-1.5"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* White Publish Button with Plus */}
            <Link 
              href="/admin/lojas/nova" 
              className="flex items-center gap-1.5 bg-white hover:bg-gray-50 text-[#f8485e] px-4 py-2.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <div className="bg-[#f8485e] text-white rounded-full p-0.5">
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>Publique seu anúncio</span>
            </Link>

            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-white/80"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/20 py-4 space-y-2 text-white bg-[#f8485e]">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-black/10 font-medium"
            >
              Lar
            </Link>
            <Link 
              href="/#anuncios" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-black/10 font-medium"
            >
              Todos Os Anúncios
            </Link>
            <Link 
              href="/#categorias" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-black/10 font-medium"
            >
              Páginas
            </Link>
            <Link 
              href="/#lojas" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-black/10 font-medium"
            >
              Lojas
            </Link>
            <Link 
              href="/#contato" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-black/10 font-medium"
            >
              Contato
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
