import { Telefone } from "./telefone.model";
export class Cliente {
  id: number;
  nome: string;
  tipo: string;
  cpfCnpj: string;
  rgIe: string;
  dataCadastro: Date;
  ativo: boolean;
  telefones: Telefone[];

  constructor(id: number, nome: string, tipo: string, cpfCnpj: string, rgIe: string, dataCadastro: Date, ativo: boolean, telefones: Telefone[]) {
    this.id = id;
    this.nome = nome;
    this.tipo = tipo;
    this.cpfCnpj = cpfCnpj;
    this.rgIe = rgIe;
    this.dataCadastro = dataCadastro;
    this.ativo = ativo;
    this.telefones = telefones;
  }
}
