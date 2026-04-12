"use client";
import { useState, useMemo } from 'react';
import YooptaEditor, { createYooptaEditor } from '@yoopta/editor';
import Paragraph from '@yoopta/paragraph';
import { HeadingOne, HeadingTwo, HeadingThree } from '@yoopta/headings';
import { BulletedList, NumberedList, TodoList } from '@yoopta/lists';
import { supabase } from '../lib/supabase';

// 1. Definimos los plugins fuera del componente
const PLUGINS = [
  Paragraph,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  BulletedList,
  NumberedList,
  TodoList
];

export default function EditorNotion() {
  // 2. CORRECCIÓN: Pasamos los plugins directamente al crear el editor
  const editor = useMemo(() => createYooptaEditor({ plugins: PLUGINS }), []);
  
  const [titulo, setTitulo] = useState("");
  const [guardando, setGuardando] = useState(false);

  const guardarEnSupabase = async () => {
    if (!titulo) {
      alert("Por favor, añade un título a la nota");
      return;
    }

    setGuardando(true);
    const contenido = editor.getEditorValue();

    const { error } = await supabase
      .from('notas')
      .insert([
        { 
          titulo: titulo, 
          contenido: contenido 
        }
      ]);

    if (error) {
      console.error("Error:", error);
      alert("Hubo un problema al guardar");
    } else {
      alert("Nota guardada en Canarias Medcal");
    }
    setGuardando(false);
  };

  return (
    <div className="max-w-[850px] mx-auto py-20 px-8">
      {/* 3. CORRECCIÓN: Usamos un 'input' para el título para evitar el error de placeholder */}
      <input 
        type="text"
        placeholder="Título de la nota médica..."
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="text-5xl font-extrabold mb-10 w-full outline-none border-none bg-transparent placeholder:text-gray-200 text-gray-800"
      />
      
      <div className="min-h-[500px]">
        <YooptaEditor 
          editor={editor} 
          placeholder="Escribe aquí los detalles del paciente o pulsa '/' para comandos..."
          className="text-lg"
        />
      </div>

      <button 
        onClick={guardarEnSupabase}
        disabled={guardando}
        className="fixed bottom-10 right-10 bg-blue-600 text-white px-8 py-4 rounded-full shadow-2xl hover:bg-blue-700 transition-all font-medium disabled:bg-gray-300"
      >
        {guardando ? "Sincronizando..." : "Guardar nota"}
      </button>
    </div>
  );
}