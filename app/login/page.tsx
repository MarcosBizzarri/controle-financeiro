"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/lib/firebase";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [erro, setErro] = useState("");

  async function entrar() {
    if (!email || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, senha);
      window.location.href = "/app";
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Erro desconhecido ao logar");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
   <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-900 animate-fade-in">
  <div className="w-full max-w-md space-y-6 bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700">
    <h1 className="text-3xl font-bold text-center text-white">Login</h1>

    <input
      className="w-full p-3 rounded bg-slate-700 text-white border border-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder="Email"
      autoComplete="email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="w-full p-3 pr-10 rounded bg-slate-700 text-white border border-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white cursor-pointer"
      >
        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
      </button>
    </div>

    <button
      onClick={entrar}
      disabled={loading}
      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white p-3 rounded-xl font-semibold disabled:opacity-50 transition cursor-pointer"
    >
      {loading ? "Entrando..." : "Entrar"}
    </button>

    <p className="text-center text-sm text-slate-300">
      Ainda não tem conta?{" "}
      <a href="/cadastro" className="text-indigo-400 underline">
        Cadastre-se
      </a>
    </p>

    {erro && <p className="text-red-400 text-sm text-center mt-4">{erro}</p>}
  </div>
</main>
  );
}