"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, MoreHorizontal } from 'lucide-react';

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState<any[]>([]);

  useEffect(() => {
    const fetchProyectos = async () => {
      const { data } = await supabase
        .from('proyectos')
        .select('*')
        .order('nombre', { ascending: true });
      if (data) setProyectos(data);
    };
    fetchProyectos();
  }, []);

  return (
    <div className="p-10 max-w-6xl mx-auto">
      {/* Header de la página */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="text-4xl">📂</span>
          <h1 className="text-4xl font-bold text-gray-900">Proyectos</h1>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all shadow-sm">
          <Plus size={18} /> Nuevo Proyecto
        </button>
      </div>

      {/* Tabla estilo Notion */}
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase">
              <th className="px-4 py-3 font-semibold">Nombre</th>
              <th className="px-4 py-3 font-semibold">Estado</th>
              <th className="px-4 py-3 font-semibold">Área</th>
              <th className="px-4 py-3 font-semibold">Fecha Objetivo</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {proyectos.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-gray-400 italic">
                  No hay proyectos registrados aún.
                </td>
              </tr>
            ) : (
              proyectos.map((pro) => (
                <tr key={pro.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900 flex items-center gap-2">
                    📄 {pro.nombre}
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">
                      {pro.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 font-mono text-xs">
                    {pro.area || '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {pro.fecha_objetivo || '—'}
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-gray-400 hover:text-gray-600" title="Opciones">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}