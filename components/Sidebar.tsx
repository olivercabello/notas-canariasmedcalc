"use client";
import Link from 'next/link';
import { LayoutDashboard, FolderKanban, CheckSquare, StickyNote, Settings } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { name: 'Inicio', icon: <LayoutDashboard size={20} />, href: '/' },
    { name: 'Proyectos', icon: <FolderKanban size={20} />, href: '/proyectos' },
    { name: 'Tareas', icon: <CheckSquare size={20} />, href: '/tareas' },
    { name: 'Notas', icon: <StickyNote size={20} />, href: '/notas' },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-50 border-r border-gray-200 flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">E</div>
          Espacio de...
        </h2>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Favoritos</div>
        {menuItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors group"
          >
            <span className="text-gray-400 group-hover:text-blue-600">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-gray-900 w-full">
          <Settings size={20} />
          <span className="text-sm font-medium">Configuración</span>
        </button>
      </div>
    </aside>
  );
}