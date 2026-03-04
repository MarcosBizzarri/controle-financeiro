export default function ResumoCard({
  titulo,
  valor,
  cor,
}: {
  titulo: string;
  valor: number;
  cor: "green" | "red" | "blue";
}) {
  const cores = {
    green: {
      border: "border-green-500",
      text: "text-green-600",
    },
    red: {
      border: "border-red-500",
      text: "text-red-600",
    },
    blue: {
      border: "border-blue-500",
      text: "text-blue-600",
    },
  };

  return (
    <div
      className={`bg-white p-6 rounded-2xl shadow-md border-l-4 ${cores[cor].border}`}
    >
      <p className="text-gray-500 text-sm">{titulo}</p>

      <h3 className={`text-2xl font-bold ${cores[cor].text}`}>
        {valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </h3>
    </div>
  );
}