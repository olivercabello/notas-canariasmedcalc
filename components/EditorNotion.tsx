"use client";
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import YooptaEditor, { createYooptaEditor } from '@yoopta/editor';
import { 
  Save, 
  ChevronLeft,
  Loader2
} from 'lucide-react';

import Paragraph from '@yoopta/paragraph';
import { HeadingOne, HeadingTwo, HeadingThree } from '@yoopta/headings';
// CORRECCIÓN: El nombre correcto es BulletedList, no BulletList
import { BulletedList, NumberedList } from '@yoopta/lists';

// Definimos los plugins fuera para que sean estables
const PLUGINS = [
  Paragraph,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  BulletedList,
  NumberedList,
];

export default function EditorNotion() {
  // CORRECCIÓN: Los plugins ahora se pasan OBLIGATORIAMENTE aquí dentro
  const editor = useMemo(() => createYooptaEditor({ 
    plugins: PLUGINS 
  }), []);
  
  const [titulo, setTitulo] = useState('');
  const [proyectoId, setProyectoId] = useState<string | null>(null);
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const fetchProyectos = async () => {
      const { data } = await supabase.from('proyectos').select('id, nombre');
      if (data) setProyectos(data);
    };
    fetchProyectos();
  }, []);

  const guardarNota = async () => {
    if (guardando) return;

    const tituloLimpio = titulo.trim();
    if (!tituloLimpio) {
      alert("El título no puede estar vacío ni contener solo espacios.");
      return;
    }

    setTitulo(tituloLimpio);
    setGuardando(true);
    
    const contenido = editor.getEditorValue();
    
    const { error } = await supabase.from('notas').insert([
      { 
        titulo: tituloLimpio, 
        contenido, 
        proyecto_id: proyectoId 
      }
    ]);

    if (error) {
      alert("Error al guardar: " + error.message);
    } else {
      alert("¡Nota guardada!");
    }
    setGuardando(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-8">
      {/* Navegación superior */}
      <div className="flex items-center justify-between mb-10 text-gray-400">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-1 hover:text-gray-600 transition-colors text-sm"
        >
          <ChevronLeft size={16} />
          Atrás
        </button>
        
        <div className="flex items-center gap-4">
          <label htmlFor="proyecto-select" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Vincular a:
          </label>
          <select 
            id="proyecto-select"
            className="bg-gray-50 border border-gray-200 rounded px-2 py-1 text-xs text-gray-600 outline-none focus:ring-2 focus:ring-blue-500/10"
            onChange={(e) => setProyectoId(e.target.value || null)}
            value={proyectoId || ''}
          >
            <option value="">Nota independiente</option>
            {proyectos.map(p => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Título */}
      <input
        type="text"
        placeholder="Título de la página"
        className="w-full text-5xl font-bold outline-none mb-12 placeholder:text-gray-100 text-gray-900 border-none focus:ring-0"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      {/* El Editor */}
      <div className="min-h-[500px] mb-32">
        <YooptaEditor
          editor={editor}
          placeholder="Escribe algo o pulsa '/' para comandos..."
          // CORRECCIÓN: Ya no pasamos 'plugins' aquí, se pasan en createYooptaEditor
        />
      </div>

      {/* Botón Guardar */}
      <button 
        onClick={guardarNota}
        disabled={guardando}
        className="fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-xl hover:bg-blue-700 transition-all flex items-center gap-2 font-semibold disabled:bg-gray-300"
      >
        {guardando ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Save size={18} />
        )}
        {guardando ? 'Guardando...' : 'Guardar'}
      </button>
    </div>
  );
}