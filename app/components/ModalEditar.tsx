import { ReactNode } from "react";

type ModalEditarProps = {
  aberto: boolean;
  loading?: boolean; // 👈 ADICIONE ISSO
  onClose: () => void;
  onSalvar: () => void;
  children: ReactNode;
};

export default function ModalEditar({
  aberto,
  onClose,
  onSalvar,
  children,
}: ModalEditarProps) {
  if (!aberto) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-2xl shadow-xl relative">

        {/* Botão fechar no canto */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold mb-4">Editar Mês</h2>

        <div className="max-h-[60vh] overflow-y-auto pr-2">
          {children}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition cursor-pointer"
          >
            Cancelar
          </button>

          <button
            onClick={onSalvar}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}