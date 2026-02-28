"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../src/lib/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { Eye, EyeOff } from "lucide-react";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [erro, setErro] = useState("");

async function cadastrar() {
  setErro(""); // limpa erro anterior

  if (!nome || !email || !senha) {
    setErro("Preencha todos os campos");
    return;
  }

  if (senha.length < 6) {
    setErro("A senha deve ter no mínimo 6 caracteres");
    return;
  }

  try {
    setLoading(true);

    const cred = await createUserWithEmailAndPassword(auth, email, senha);

    await setDoc(doc(db, "users", cred.user.uid), {
      nome,
      email,
      criadoEm: Timestamp.now(),
    });

    window.location.href = "/app";
  } catch (error: unknown) {
    if (error instanceof Error) {
      setErro(error.message);
    } else {
      setErro("Erro desconhecido ao cadastrar");
    }
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-900 animate-fade-in">
  <div className="w-full max-w-md space-y-6 bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700">
    <h1 className="text-3xl font-bold text-center text-white">Cadastro</h1>

    <input
      className="w-full p-3 rounded bg-slate-700 text-white border border-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder="Nome"
      value={nome}
      onChange={(e) => setNome(e.target.value)}
    />

    <input
      className="w-full p-3 rounded bg-slate-700 text-white border border-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder="Email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
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
      onClick={cadastrar}
      disabled={loading}
      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white p-3 rounded-xl font-semibold disabled:opacity-50 transition cursor-pointer"
    >
      {loading ? "Cadastrando..." : "Cadastrar"}
    </button>

    <p className="text-center text-sm text-slate-300">
      Já tem conta?{" "}
      <a href="/login" className="text-indigo-400 underline">
        Entrar
      </a>
    </p>
  </div>

  {erro && <p className="text-red-400 text-sm text-center mt-4">{erro}</p>}
</main>
  );
}
