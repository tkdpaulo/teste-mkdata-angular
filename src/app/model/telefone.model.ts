export class Telefone {
  id: number;
  ddd: string;
  numero: string;

  constructor(id: number, ddd: string, numero: string) {
    this.id = id;
    this.ddd = ddd;
    this.numero = numero;
  }
}
