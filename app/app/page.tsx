"use client";

import { useEffect, useState, useMemo } from "react";
import { serverTimestamp } from "firebase/firestore";
import { db } from "../../src/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import Navbar from "../components/Navbar";
import InputFinanceiro from "../components/InputFinanceiro";
import ModalEditar from "../components/ModalEditar";
import ResumoCard from "../components/ResumoCard";

import {
  DadosFinanceiros,
  CamposFinanceiros,
} from "../types/financeiro";

const camposDespesas: CamposFinanceiros[] = [
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

type RegistroComId = DadosFinanceiros & { id: string };

export default function Home() {
  const [dados, setDados] = useState<DadosFinanceiros>({
    mes: "",
    salario: 0,
    outrasRendas: 0,
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
  });

  const [historico, setHistorico] = useState<RegistroComId[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setDados((prev) => ({
      ...prev,
      [name]: name === "mes" ? value : Number(value),
    }));
  }

  const totalEntradas = useMemo(
    () => camposEntradas.reduce((acc, campo) => acc + dados[campo], 0),
    [dados]
  );

  const totalDespesas = useMemo(
    () => camposDespesas.reduce((acc, campo) => acc + dados[campo], 0),
    [dados]
  );

  const saldo = totalEntradas - totalDespesas;

  // =====================
  // SALVAR / EDITAR
  // =====================
  async function salvar() {
    if (!dados.mes) return alert("Digite o mês");

   const dadosParaSalvar = {
  ...dados,
  criadoEm: serverTimestamp(),
};

    if (editandoId) {
      await updateDoc(
        doc(db, "controleFinanceiro", editandoId),
        dadosParaSalvar
      );
    } else {
      await addDoc(collection(db, "controleFinanceiro"), dadosParaSalvar);
    }

    resetarFormulario();
    carregar();
  }

  function resetarFormulario() {
    setDados({
      mes: "",
      salario: 0,
      outrasRendas: 0,
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
    });

    setEditandoId(null);
    setModalAberto(false);
  }

  // =====================
  // CARREGAR TODOS
  // =====================
  async function carregar() {
    const snapshot = await getDocs(
      collection(db, "controleFinanceiro")
    );

    const lista: RegistroComId[] = snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...(docItem.data() as DadosFinanceiros),
    }));

    lista.sort((a, b) => b.criadoEm - a.criadoEm);

    setHistorico(lista);
  }

  useEffect(() => {
    carregar();
  }, []);

  // =====================
  // EXCLUIR
  // =====================
  async function excluir(id: string) {
    if (!confirm("Deseja excluir?")) return;

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

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 p-6 pt-24">

          <div className="max-w-6xl mx-auto space-y-6">


          <div className="grid md:grid-cols-3 gap-4">
            <ResumoCard titulo="Entradas" valor={totalEntradas} cor="green" />
            <ResumoCard titulo="Despesas" valor={totalDespesas} cor="red" />
            <ResumoCard titulo="Saldo" valor={saldo} cor={saldo >= 0 ? "blue" : "red"} />
          </div>

          <button
            onClick={() => setModalAberto(true)}
            className="w-full bg-blue-600 text-white py-3 rounded-xl"
          >
            Adicionar Mês
          </button>

          {/* HISTÓRICO */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="font-bold text-lg mb-4">Histórico</h2>

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
                    <p className="font-semibold">{item.mes}</p>
                    <p className="text-sm text-gray-500">
                      Saldo: R$ {saldoItem.toLocaleString("pt-BR")}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => editar(item)}
                      className="px-3 py-1 bg-yellow-400 text-white rounded"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => excluir(item.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
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