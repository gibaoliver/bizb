import { Store, LayoutDashboard, Settings, LogOut } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Simples */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-lg font-bold text-gray-900">Portal Admin</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/admin/lojas/nova" className="flex items-center gap-3 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-md font-medium">
            <Store className="w-5 h-5" />
            Lojas
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center gap-3 px-3 py-2 w-full text-left text-gray-600 rounded-md hover:bg-red-50 hover:text-red-700 transition-colors">
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-auto">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 md:hidden">
          <span className="text-lg font-bold text-gray-900">Portal Admin</span>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
