"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const router = useRouter();

  // Si el usuario ya está logueado, lo mandamos fuera del login
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) router.push('/');
    };
    checkUser();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cargando) return;
    
    setCargando(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert("Error: " + error.message);
        setCargando(false);
      } else if (data.session) {
        // IMPORTANTE: refresh para que el proxy.ts lea las nuevas cookies
        router.refresh(); 
        setTimeout(() => {
          router.push('/');
        }, 500);
      }
    } catch (err) {
      alert("Error inesperado en la conexión.");
      setCargando(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-bold text-blue-900 text-center mb-2">Canarias Medcal</h1>
        <p className="text-gray-500 text-center mb-8">Gestión de Notas Médicas</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" required
            placeholder="Email corporativo"
            className="w-full p-3 border rounded-xl outline-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" required
            placeholder="Contraseña"
            className="w-full p-3 border rounded-xl outline-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            type="submit"
            disabled={cargando}
            className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition disabled:bg-gray-300"
          >
            {cargando ? "Sincronizando acceso..." : "Entrar al Editor"}
          </button>
        </form>
      </div>
    </div>
  );
}