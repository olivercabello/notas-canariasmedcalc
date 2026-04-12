"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  StickyNote, 
  Settings, 
  LogOut,
  Search,
  PlusCircle
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Sidebar() {
  const pathname = usePathname();

  // No mostrar el sidebar en la página de login
  if (pathname === '/login') return null;

  const menuItems = [
    { name: 'Inicio', icon: <LayoutDashboard size={18} />, href: '/' },
    { name: 'Proyectos', icon: <FolderKanban size={18} />, href: '/proyectos' },
    { name: 'Tareas', icon: <CheckSquare size={18} />, href: '/tareas' },
    { name: 'Notas', icon: <StickyNote size={18} />, href: '/notas' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <aside className="w-64 h-screen bg-[#fbfbfa] border-r border-gray-200 flex flex-col fixed left-0 top-0 z-50">
      {/* Header Estilo Notion */}
      <div className="p-4 flex items-center justify-between group">
        <div className="flex items-center gap-2 font-semibold text-gray-700 truncate">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-[10px]">
            E
          </div>
          <span className="truncate">Espacio de Proyectos</span>
        </div>
      </div>

      {/* Herramientas rápidas */}
      <div className="px-2 space-y-0.5 mb-4">
        <button className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-200 rounded transition-colors">
          <Search size={16} /> Buscar
        </button>
        <button className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-200 rounded transition-colors">
          <PlusCircle size={16} /> Nueva página
        </button>
      </div>

      {/* Menú Principal */}
      <nav className="flex-1 px-2 space-y-0.5">
        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Privado</div>
        {menuItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.href}
            className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
              pathname === item.href 
                ? 'bg-gray-200 text-gray-900 font-medium' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className={pathname === item.href ? 'text-blue-600' : 'text-gray-400'}>
              {item.icon}
            </span>
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Footer / Usuario */}
      <div className="p-2 border-t border-gray-200 space-y-0.5">
        <button className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-200 rounded transition-colors">
          <Settings size={16} /> Configuración
        </button>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-red-500 hover:bg-red-50 rounded transition-colors"
        >
          <LogOut size={16} /> Salir
        </button>
      </div>
    </aside>
  );
}