"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../src/lib/firebase";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        {/* LOGO / INÍCIO */}
        <button
          onClick={() => router.push("/app")}
          className="text-blue-700 font-bold text-lg sm:text-xl hover:text-pink-500 transition"
        >
          Controle Financeiro
        </button>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <button onClick={() => router.push("/app")} className="hover:text-pink-500 transition">
            Dashboard
          </button>
          <button onClick={() => router.push("/historico")} className="hover:text-pink-500 transition">
            Histórico
          </button>
          <button onClick={() => router.push("/perfil")} className="hover:text-pink-500 transition">
            Perfil
          </button>
        </nav>

        {/* BOTÃO LOGOUT DESKTOP */}
        <div className="hidden md:block">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 active:scale-95 
                       text-white text-sm font-semibold 
                       px-4 py-2 rounded-xl 
                       transition-all duration-200 cursor-pointer"
          >
            Sair
          </button>
        </div>

        {/* MENU MOBILE */}
        <div className="md:hidden relative z-50">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-center w-10 h-10 gap-1 focus:outline-none"
          >
            <span className={`block h-0.5 w-6 bg-gray-900 rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block h-0.5 w-6 bg-gray-900 rounded transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-gray-900 rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>

          <div
            className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            onClick={() => setMenuOpen(false)}
          ></div>

          <div
            className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"} flex flex-col justify-center items-start p-8 space-y-6`}
          >
            <button onClick={() => { router.push("/app"); setMenuOpen(false); }} className="text-gray-900 hover:text-pink-500 text-lg font-medium transition">Dashboard</button>
            <button onClick={() => { router.push("/historico"); setMenuOpen(false); }} className="text-gray-900 hover:text-pink-500 text-lg font-medium transition">Histórico</button>
            <button onClick={() => { router.push("/perfil"); setMenuOpen(false); }} className="text-gray-900 hover:text-pink-500 text-lg font-medium transition">Perfil</button>
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold w-full text-center py-3 rounded-xl transition transform hover:scale-105"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}