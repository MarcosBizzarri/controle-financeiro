"use client";

import { useEffect, useState, useMemo } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../src/lib/firebase";

import Navbar from "../components/Navbar";
import InputFinanceiro from "../components/InputFinanceiro";
import ModalEditar from "../components/ModalEditar";
import ResumoCard from "../components/ResumoCard";

import {
  DadosFinanceiros,
  CamposFinanceiros,
} from "../types/financeiro";

const camposDespesas: CamposFinanceiros[] = [
  "alimentacao",
  "financiamento",
  "prestCarro",
  "luz",
  "agua",
  "seguroCarro",
  "internet",
  "dizimo",
  "telefonia",
  "combustivel",
  "escola",
  "cabelo",
  "cartao",
  "outrasDespesas",
];

const camposEntradas: CamposFinanceiros[] = [
  "salario",
  "outrasRendas",
];

const dadosIniciais: DadosFinanceiros = {
  mes: "",
  salario: 0,
  outrasRendas: 0,
  alimentacao: 0,
  financiamento: 0,
  prestCarro: 0,
  luz: 0,
  agua: 0,
  seguroCarro: 0,
  internet: 0,
  dizimo: 0,
  telefonia: 0,
  combustivel: 0,
  escola: 0,
  cabelo: 0,
  cartao: 0,
  outrasDespesas: 0,
  criadoEm: 0,
};

type RegistroComId = Omit<DadosFinanceiros, "criadoEm"> & {
  id: string;
  criadoEm: number;
};

export default function Home() {
  const [dados, setDados] = useState<DadosFinanceiros>(dadosIniciais);
  const [historico, setHistorico] = useState<RegistroComId[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // =====================
  // HANDLE INPUT
  // =====================
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setDados((prev) => ({
      ...prev,
      [name]: name === "mes" ? value : Number(value) || 0,
    }));
  }

  // =====================
  // TOTAIS
  // =====================
 const totalEntradas = useMemo(() => {
  return historico.reduce((acc, item) => {
    const somaEntradas =
      camposEntradas.reduce(
        (total, campo) => total + Number(item[campo] || 0),
        0
      );

    return acc + somaEntradas;
  }, 0);
}, [historico]);

const totalDespesas = useMemo(() => {
  return historico.reduce((acc, item) => {
    const somaDespesas =
      camposDespesas.reduce(
        (total, campo) => total + Number(item[campo] || 0),
        0
      );

    return acc + somaDespesas;
  }, 0);
}, [historico]);

const saldo = totalEntradas - totalDespesas;

  // =====================
  // CARREGAR
  // =====================
  async function carregar() {
    const q = query(
      collection(db, "controleFinanceiro"),
      orderBy("criadoEm", "desc")
    );

    const snapshot = await getDocs(q);

    const lista: RegistroComId[] = snapshot.docs.map((docItem) => {
      const data = docItem.data();

      return {
        id: docItem.id,
        ...(data as DadosFinanceiros),
        criadoEm:
          data.criadoEm instanceof Timestamp
            ? data.criadoEm.seconds
            : 0,
      };
    });

    setHistorico(lista);
  }

 useEffect(() => {
  const fetchData = async () => {
    await carregar();
  };

  fetchData();
}, []);

  // =====================
  // SALVAR
  // =====================
  async function salvar() {
    if (!dados.mes) return alert("Digite o mês");

    const mesDuplicado = historico.some(
      (item) => item.mes === dados.mes && item.id !== editandoId
    );

    if (mesDuplicado) {
      return alert("Esse mês já foi cadastrado!");
    }

    setLoading(true);

    const dadosParaSalvar = {
      ...dados,
      criadoEm: serverTimestamp(),
    };

    try {
      if (editandoId) {
        await updateDoc(
          doc(db, "controleFinanceiro", editandoId),
          dadosParaSalvar
        );
      } else {
        await addDoc(
          collection(db, "controleFinanceiro"),
          dadosParaSalvar
        );
      }

      resetarFormulario();
      await carregar();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar");
    }

    setLoading(false);
  }

  // =====================
  // EXCLUIR
  // =====================
  async function excluir(id: string) {
    if (!confirm("Deseja excluir este mês?")) return;

    await deleteDoc(doc(db, "controleFinanceiro", id));
    carregar();
  }

  // =====================
  // EDITAR
  // =====================
  function editar(registro: RegistroComId) {
    setDados(registro);
    setEditandoId(registro.id);
    setModalAberto(true);
  }

  function resetarFormulario() {
    setDados(dadosIniciais);
    setEditandoId(null);
    setModalAberto(false);
  }

  function formatarMoeda(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 p-6 pt-24">
        <div className="max-w-6xl mx-auto space-y-6">

          {/* RESUMO */}
          <div className="grid md:grid-cols-3 gap-4">
            <ResumoCard titulo="Entradas" valor={totalEntradas} cor="green" />
            <ResumoCard titulo="Despesas" valor={totalDespesas} cor="red" />
            <ResumoCard
              titulo="Saldo"
              valor={saldo}
              cor={saldo >= 0 ? "blue" : "red"}
            />
          </div>

          {/* BOTÃO */}
          <button
            onClick={() => setModalAberto(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-2xl font-semibold hover:scale-[1.02] transition cursor-pointer"
          >
            Adicionar Mês
          </button>

          {/* HISTÓRICO */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="font-bold text-black text-lg mb-4">Histórico</h2>

            {historico.length === 0 && (
              <p className="text-gray-500 text-center">
                Nenhum mês cadastrado ainda.
              </p>
            )}

            {historico.map((item) => {
              const entradas =
                item.salario + item.outrasRendas;

              const despesas = camposDespesas.reduce(
                (acc, campo) => acc + item[campo],
                0
              );

              const saldoItem = entradas - despesas;

              return (
                <div
                  key={item.id}
                  className="border-b py-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-400">{item.mes}</p>
                    <p
                      className={`text-sm font-semibold ${
                        saldoItem >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatarMoeda(saldoItem)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => editar(item)}
                      className="px-3 py-1 bg-yellow-400 text-white rounded cursor-pointer"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => excluir(item.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded cursor-pointer"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <ModalEditar
        aberto={modalAberto}
        onClose={resetarFormulario}
        onSalvar={salvar}
        loading={loading}
      >
        <div className="grid md:grid-cols-2 gap-4">
          <InputFinanceiro
            name="mes"
            label="Mês"
            value={dados.mes}
            onChange={handleChange}
          />

          {camposEntradas.map((campo) => (
            <InputFinanceiro
              key={campo}
              name={campo}
              label={campo}
              value={dados[campo]}
              onChange={handleChange}
            />
          ))}

          {camposDespesas.map((campo) => (
            <InputFinanceiro
              key={campo}
              name={campo}
              label={campo}
              value={dados[campo]}
              onChange={handleChange}
            />
          ))}
        </div>
      </ModalEditar>
    </>
  );
}