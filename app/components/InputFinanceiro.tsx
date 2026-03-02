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
      <label className="text-sm font-semibold text-black mb-1">
        {label}
      </label>

      <input
        type={isNumber ? "number" : "text"}
        name={name}
        value={value === 0 ? "" : value}
        onChange={onChange}
        className="
          w-full
          border
          border-black
          rounded-lg
          px-3
          py-2
          bg-white
          text-black
          placeholder:text-gray-400
          focus:outline-none
          focus:ring-0
          focus:border-black
        "
      />
    </div>
  );
}