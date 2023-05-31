import { Telefone } from "./telefone.model";
export class Cliente {
  id?: number;
  nome?: string;
  tipo?: string;
  cpfCnpj?: string;
  rgIe?: string;
  dataCadastro?: Date;
  ativo?: boolean;
  telefones?: Telefone[];

}
