'use client';

import { Save } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NovaLojaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [address, setAddress] = useState('');

  const generateSlug = (text: string) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const slug = generateSlug(name);

    const { data, error } = await supabase.from('stores').insert([
      {
        name,
        slug,
        category,
        description,
        phone_whatsapp: whatsapp,
        address,
        social_links: instagram ? { instagram } : {},
      }
    ]);

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      // Reset form
      setName('');
      setCategory('');
      setDescription('');
      setWhatsapp('');
      setInstagram('');
      setAddress('');
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/admin');
      }, 2000);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Cadastrar Nova Loja</h1>
        <p className="text-gray-500 mt-1">Preencha as informações da empresa para adicioná-la ao guia comercial.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-lg text-sm border border-emerald-200">
            Empresa cadastrada com sucesso! Redirecionando...
          </div>
        )}

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Informações Básicas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">Nome da Empresa *</label>
              <input 
                type="text" 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="Ex: TechStore Brasil" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium text-gray-700">Categoria *</label>
              <select 
                id="category" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border-gray-300 border p-2.5 bg-white focus:ring-2 focus:ring-indigo-500 outline-none" 
                required
              >
                <option value="">Selecione...</option>
                <option value="Restaurantes">Restaurantes</option>
                <option value="Eletrônicos">Eletrônicos</option>
                <option value="Serviços">Serviços</option>
                <option value="Moda">Moda</option>
                <option value="Imóveis">Imóveis</option>
                <option value="Veículos">Veículos</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-gray-700">Descrição Curta *</label>
            <textarea 
              id="description" 
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" 
              placeholder="Descreva os produtos e serviços da loja..." 
              required
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
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="Ex: 5511999999999" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="instagram" className="text-sm font-medium text-gray-700">Instagram URL</label>
              <input 
                type="url" 
                id="instagram" 
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="https://instagram.com/sua_loja" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium text-gray-700">Endereço Completo *</label>
            <input 
              type="text" 
              id="address" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" 
              placeholder="Rua, Número, Bairro, Cidade - UF" 
              required
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={loading}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {loading ? 'Salvando...' : 'Salvar Empresa'}
          </button>
        </div>
      </form>
    </div>
  );
}
