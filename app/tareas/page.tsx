"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export default function TareasPage() {
  const [tareas, setTareas] = useState<any[]>([]);

  useEffect(() => {
    const fetchTareas = async () => {
      // Traemos las tareas y el nombre del proyecto al que pertenecen (JOIN)
      const { data } = await supabase
        .from('tareas')
        .select('*, proyectos(nombre)')
        .order('created_at', { ascending: false });
      if (data) setTareas(data);
    };
    fetchTareas();
  }, []);

  const getPrioridadStyle = (prio: string) => {
    if (prio?.includes('URG')) return 'bg-red-50 text-red-700 border-red-100';
    return 'bg-blue-50 text-blue-700 border-blue-100';
  };

  const getEstadoStyle = (estado: string) => {
    if (estado?.includes('Listo')) return 'bg-green-100 text-green-700';
    if (estado?.includes('curso')) return 'bg-orange-100 text-orange-700';
    return 'bg-purple-100 text-purple-700';
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
        <span className="text-blue-600">☑️</span> Tareas
      </h1>

      <div className="grid gap-4">
        {tareas.map((tarea) => (
          <div key={tarea.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow flex items-center justify-between">
            <div className="flex items-center gap-4">
              {tarea.estado === 'Listo' ? <CheckCircle2 className="text-green-500" /> : <Clock className="text-gray-300" />}
              <div>
                <h3 className="font-semibold text-gray-900">{tarea.nombre}</h3>
                <div className="flex gap-2 mt-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getPrioridadStyle(tarea.prioridad)}`}>
                    {tarea.prioridad}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${getEstadoStyle(tarea.estado)}`}>
                    {tarea.estado}
                  </span>
                  {tarea.proyectos && (
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium italic">
                      📁 {tarea.proyectos.nombre}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="text-right text-xs text-gray-400">
              <div className="flex items-center gap-1 justify-end">
                <Calendar size={12} />
                {tarea.fecha_iteracion ? new Date(tarea.fecha_iteracion).toLocaleDateString() : 'Sin fecha'}
              </div>
              <p className="mt-1 font-medium text-gray-500">{tarea.comite || 'Sin comité'}</p>
            </div>
          </div>
        ))}
        {tareas.length === 0 && (
          <div className="text-center py-20 text-gray-400 border-2 border-dashed rounded-xl">
            No hay tareas pendientes. ¡Buen trabajo!
          </div>
        )}
      </div>
    </div>
  );
}