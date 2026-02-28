export default function ResumoCard({
  titulo,
  valor,
  cor,
}: {
  titulo: string;
  valor: number;
  cor: string;
}) {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-md border-l-4 border-${cor}-500`}>
      <p className="text-gray-500 text-sm">{titulo}</p>
      <h3 className={`text-2xl font-bold text-${cor}-600`}>
        R$ {valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </h3>
    </div>
  );
}