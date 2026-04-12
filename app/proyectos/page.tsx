"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Table as TableIcon, LayoutGrid } from 'lucide-react';

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProyectos = async () => {
      const { data, error } = await supabase
        .from('proyectos')
        .select('*')
        .order('nombre', { ascending: true });
      
      if (data) setProyectos(data);
      setLoading(false);
    };
    fetchProyectos();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'activo': return 'bg-green-100 text-green-700';
      case 'pausa': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>📂 Proyectos</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">Privado</span>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <span className="text-4xl">📂</span> Proyectos
        </h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium border border-gray-200 rounded hover:bg-gray-50">
            <TableIcon size={16} /> Tabla
          </button>
          <button className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
            <Plus size={16} /> Nuevo
          </button>
        </div>
      </div>

      {/* Tabla Estilo Notion */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500 font-normal">
              <th className="px-4 py-2 font-medium w-[30%]">Nombre</th>
              <th className="px-4 py-2 font-medium">Estado del proyecto</th>
              <th className="px-4 py-2 font-medium">Área</th>
              <th className="px-4 py-2 font-medium">Fecha Objetivo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={4} className="py-10 text-center text-gray-400">Cargando proyectos...</td></tr>
            ) : proyectos.map((p) => (
              <tr key={p.id} className="group hover:bg-gray-50 transition-colors cursor-pointer">
                <td className="px-4 py-3 font-medium flex items-center gap-2">
                  <span className="text-gray-400 group-hover:text-gray-600 transition-colors">📄</span>
                  {p.nombre}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${getStatusColor(p.estado_proyecto)} uppercase tracking-tight`}>
                    {p.estado_proyecto}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1 flex-wrap">
                    {p.area?.split(',').map((tag: string) => (
                      <span key={tag} className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[11px] font-medium">
                        {tag.trim()}
                      </span>
                    )) || '—'}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500 italic">
                  {p.fecha_objetivo || 'Sin fecha'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}