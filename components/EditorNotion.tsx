"use client";
import YooptaEditor, { createYooptaEditor } from '@yoopta/editor';
import Paragraph from '@yoopta/paragraph';
import { HeadingOne, HeadingTwo, HeadingThree } from '@yoopta/headings';
import { BulletedList, NumberedList } from '@yoopta/lists';
import { useMemo } from 'react';

// Configuramos los plugins que queremos usar
const plugins = [Paragraph, HeadingOne, HeadingTwo, HeadingThree, BulletedList, NumberedList];

export default function EditorNotion() {
  const editor = useMemo(() => createYooptaEditor(), []);

  // Función para guardar (la conectaremos a Supabase luego)
  const guardarNota = () => {
    const contenido = editor.getEditorValue();
    console.log("Guardando en base de datos:", contenido);
  };

  return (
    <div className="max-w-[800px] mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 outline-none" contentEditable placeholder="Título de la nota">
        Nueva Nota Médica
      </h1>
      <YooptaEditor 
        editor={editor} 
        plugins={plugins} 
        placeholder="Escribe aquí o usa '/' para comandos..." 
      />
      <button 
        onClick={guardarNota}
        className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700"
      >
        Guardar Nota
      </button>
    </div>
  );
}