import { CamposFinanceiros } from "../types/financeiro";

export default function InputFinanceiro({
  label,
  value,
  onChange,
  name,
}: {
  label: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: CamposFinanceiros | "mes";
}) {
  const isNumber = typeof value === "number";

  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-600 mb-1">
        {label}
      </label>
      <input
        type={isNumber ? "number" : "text"}
        name={name}
        value={value}
        onChange={onChange}
        className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 transition"
      />
    </div>
  );
}