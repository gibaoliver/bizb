import { Store, ShoppingBag, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Bem-vindo ao painel de controle do seu Guia Comercial.</p>
        </div>
        <Link 
          href="/admin/lojas/nova" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors inline-flex items-center gap-2 w-fit"
        >
          <Store className="w-4 h-4" />
          Nova Empresa
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total de Empresas</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">12</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Produtos Ativos</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">145</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Avaliações Pendentes</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">3</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
