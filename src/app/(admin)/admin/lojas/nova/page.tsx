'use client';

import { Save } from "lucide-react";

export default function NovaLojaPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Funcionalidade de cadastro será conectada ao Supabase/Backend!");
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Cadastrar Nova Loja</h1>
        <p className="text-gray-500 mt-1">Preencha as informações da empresa para adicioná-la ao guia comercial.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Informações Básicas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">Nome da Empresa *</label>
              <input 
                type="text" 
                id="name" 
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="Ex: TechStore Brasil" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium text-gray-700">Categoria *</label>
              <select id="category" className="w-full rounded-lg border-gray-300 border p-2.5 bg-white focus:ring-2 focus:ring-indigo-500 outline-none" required>
                <option value="">Selecione...</option>
                <option value="Restaurantes">Restaurantes</option>
                <option value="Eletrônicos">Eletrônicos</option>
                <option value="Serviços">Serviços</option>
                <option value="Moda">Moda</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-gray-700">Descrição Curta</label>
            <textarea 
              id="description" 
              rows={3}
              className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" 
              placeholder="Descreva os produtos e serviços da loja..." 
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Contato e Endereço</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="whatsapp" className="text-sm font-medium text-gray-700">WhatsApp *</label>
              <input 
                type="text" 
                id="whatsapp" 
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="(00) 00000-0000" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="instagram" className="text-sm font-medium text-gray-700">Instagram URL</label>
              <input 
                type="url" 
                id="instagram" 
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="https://instagram.com/sua_loja" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium text-gray-700">Endereço Completo</label>
            <input 
              type="text" 
              id="address" 
              className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" 
              placeholder="Rua, Número, Bairro, Cidade - UF" 
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Save className="w-5 h-5" />
            Salvar Empresa
          </button>
        </div>
      </form>
    </div>
  );
}
