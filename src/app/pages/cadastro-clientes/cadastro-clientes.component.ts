import { Component } from '@angular/core';
import { ClienteService } from '../../core/cliente.service';
import { Cliente } from "../../model/cliente.model";
import { Telefone } from "../../model/telefone.model";

@Component({
  selector: 'app-cadastro-clientes',
  templateUrl: './cadastro-clientes.component.html',
  styleUrls: ['./cadastro-clientes.component.css']
})
export class CadastroClientesComponent {
  cliente: Cliente = {
    id: 0,
    nome: '',
    cpfCnpj: '',
    tipo: '',
    rgIe: '',
    dataCadastro: new Date(),
    ativo: true,
    telefones: []
  };

  constructor(private clienteService: ClienteService) {}

  cadastrarCliente(): void {
    // Chamar o serviço para cadastrar o cliente
    this.clienteService.cadastrarCliente(this.cliente).subscribe(
      (response) => {
        // Cliente cadastrado com sucesso, fazer algo como redirecionar para outra página
        console.log('Cliente cadastrado com sucesso:', response);
      },
      (error) => {
        // Ocorreu um erro ao cadastrar o cliente, tratar o erro de acordo com sua necessidade
        console.error('Erro ao cadastrar o cliente:', error);
      }
    );
  }

  adicionarTelefone(): void {
    const novoTelefone: Telefone = {
      id: 0,
      ddd: '',
      numero: ''
    };
    this.cliente.telefones.push(novoTelefone);
  }

  removerTelefone(index: number): void {
    this.cliente.telefones.splice(index, 1);
  }
}
