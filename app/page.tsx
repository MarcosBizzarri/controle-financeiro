"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [showButton, setShowButton] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white scroll-smooth">
      {/* NAVBAR */}
      <header className="fixed top-0 w-full bg-slate-800/95 backdrop-blur border-b border-slate-700 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="font-bold text-xl tracking-wide text-indigo-400">
            Controle Financeiro
          </h1>

          <nav className="hidden md:flex gap-8 text-sm text-slate-300">
            <a href="#inicio" className="hover:text-indigo-400 transition">
              Início
            </a>
            <a href="#beneficios" className="hover:text-indigo-400 transition">
              Benefícios
            </a>
            <a href="#como" className="hover:text-indigo-400 transition">
              Como funciona
            </a>
            <a href="#numeros" className="hover:text-indigo-400 transition">
              Usuários
            </a>
          </nav>

          {/* Desktop navbar buttons */}
          <div className="hidden md:flex gap-4">
            <Link
              href="/login"
              className="px-5 py-2 rounded-lg text-sm font-semibold text-indigo-400 border border-indigo-500 hover:bg-indigo-500 hover:text-white transition"
            >
              Entrar
            </Link>
            <Link
              href="/cadastro"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-5 py-2 rounded-lg text-sm font-semibold text-white transition"
            >
              Começar
            </Link>
          </div>

          {/* Mobile */}
          <div className="md:hidden relative z-50">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col justify-center items-center w-10 h-10 gap-1 focus:outline-none"
            >
              <span
                className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              />
            </button>

            <div
              className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
              onClick={() => setMenuOpen(false)}
            ></div>

            <div
              className={`fixed top-0 right-0 h-full w-64 bg-slate-800 shadow-2xl z-50 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"} flex flex-col justify-center items-start p-8 space-y-6`}
            >
              <a
                href="#inicio"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-indigo-400 text-lg font-medium transition"
              >
                Início
              </a>
              <a
                href="#beneficios"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-indigo-400 text-lg font-medium transition"
              >
                Benefícios
              </a>
              <a
                href="#como"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-indigo-400 text-lg font-medium transition"
              >
                Como funciona
              </a>
              <a
                href="#numeros"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-indigo-400 text-lg font-medium transition"
              >
                Usuários
              </a>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="mt-4 w-full text-center py-3 rounded-lg font-semibold border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white transition"
              >
                Entrar
              </Link>
              <Link
                href="/cadastro"
                onClick={() => setMenuOpen(false)}
                className="mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold w-full text-center py-3 rounded-lg transition transform hover:scale-105"
              >
                Começar
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="inicio" className="pt-40 pb-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="bg-indigo-700/20 text-indigo-400 px-4 py-1 rounded-full text-sm font-semibold">
              Plataforma Financeira
            </span>

            <h2 className="text-5xl font-extrabold mt-6 leading-tight text-white">
              Controle suas finanças <br />
              de forma inteligente e moderna!
            </h2>

            <p className="text-slate-300 mt-6 text-lg">
              Registre entradas, despesas e acompanhe seu saldo mensal de forma
              prática e segura.
            </p>

            <div className="flex gap-6 mt-10 flex-wrap">
              <Link
                href="/cadastro"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-8 py-4 rounded-xl font-bold text-white transition hover:scale-105"
              >
                Começar Gratuitamente
              </Link>

              <Link
                href="/login"
                className="border border-indigo-400 hover:border-indigo-500 px-8 py-4 rounded-xl text-indigo-400 transition"
              >
                Já tenho conta
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-700/10 to-purple-600/10 p-8 rounded-3xl border border-slate-700 shadow-xl">
            <div className="bg-slate-800 rounded-2xl p-6 text-slate-200">
              <p className="mb-2">📅 Meses registrados</p>
              <p className="mb-2">💰 Saldo atualizado</p>
              <p>📈 Histórico completo de entradas e despesas</p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section id="beneficios" className="py-24 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          {[
            {
              title: "Controle total",
              desc: "Acompanhe todas as entradas e despesas.",
              color: "from-indigo-500 to-purple-500",
            },
            {
              title: "Seguro",
              desc: "Seus dados são salvos com segurança no Firebase.",
              color: "from-green-500 to-teal-500",
            },
            {
              title: "Histórico completo",
              desc: "Visualize todos os meses registrados e edite quando quiser.",
              color: "from-pink-500 to-orange-500",
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`bg-gradient-to-r ${item.color} border border-slate-700 p-8 rounded-2xl hover:scale-105 transition duration-300`}
            >
              <h3 className="text-xl font-bold mb-4 text-white">
                {item.title}
              </h3>
              <p className="text-white">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como" className="py-28 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Como funciona?</h2>
          <div className="grid md:grid-cols-3 gap-10 mt-12">
            {[
              "Crie sua conta gratuitamente",
              "Adicione seus meses de finanças",
              "Acompanhe e edite seu histórico",
            ].map((step, i) => (
              <div
                key={i}
                className="bg-gradient-to-r from-indigo-700/10 to-purple-700/10 p-8 rounded-2xl border border-slate-700 hover:scale-105 transition"
              >
                <span className="text-indigo-400 text-3xl font-bold">
                  {i + 1}
                </span>
                <p className="mt-4 text-white">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NÚMEROS */}
      <section id="numeros" className="py-24 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-12 text-center">
          <div>
            <p className="text-5xl font-extrabold text-pink-500">+1500</p>
            <p className="text-white mt-2">Usuários ativos</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold text-green-500">100%</p>
            <p className="text-white mt-2">Segurança garantida</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold text-blue-500">+12k</p>
            <p className="text-white mt-2">Meses registrados</p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-28 px-6 text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-3xl">
        <h2 className="text-4xl font-extrabold mb-6">
          Comece a controlar suas finanças hoje!
        </h2>
        <Link
          href="/cadastro"
          className="bg-white text-indigo-500 px-10 py-4 rounded-2xl font-bold hover:scale-105 transition"
        >
          Criar Conta Gratuitamente
        </Link>
      </section>

      {showButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 bg-indigo-500 hover:bg-indigo-600 p-4 rounded-full shadow-lg hover:scale-110 transition cursor-pointer text-white"
        >
          ↑
        </button>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-800 border-t border-slate-700 py-14 px-6 text-slate-300">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-sm">
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">
              Controle Financeiro
            </h4>
            <p>Organize entradas, despesas e acompanhe seu saldo mensal.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Navegação</h4>
            <ul className="space-y-3">
              <li>
                <a href="#inicio" className="hover:text-indigo-400 transition">
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#beneficios"
                  className="hover:text-green-400 transition"
                >
                  Benefícios
                </a>
              </li>
              <li>
                <a href="#como" className="hover:text-purple-400 transition">
                  Como funciona
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Conta</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/login"
                  className="hover:text-indigo-400 transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/cadastro"
                  className="hover:text-indigo-400 transition"
                >
                  Criar conta
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-slate-400 mt-12 text-xs border-t border-slate-700 pt-6">
          © {new Date().getFullYear()} Controle Financeiro. Todos os direitos
          reservados.
        </div>
      </footer>
    </div>
  );
}
