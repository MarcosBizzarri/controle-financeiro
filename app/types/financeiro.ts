export type DadosFinanceiros = {
  mes: string;
  salario: number;
  outrasRendas: number;
  financiamento: number;
  prestCarro: number;
  luz: number;
  agua: number;
  seguroCarro: number;
  internet: number;
  dizimo: number;
  telefonia: number;
  combustivel: number;
  escola: number;
  cabelo: number;
  cartao: number;
  outrasDespesas: number;
  criadoEm: number;
  deletado?: boolean;
};

export type CamposFinanceiros = Exclude<
  keyof DadosFinanceiros,
  "mes" | "criadoEm" | "deletado"
>;