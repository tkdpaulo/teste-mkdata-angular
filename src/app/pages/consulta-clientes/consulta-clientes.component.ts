import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Cliente } from "../../model/cliente.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-consulta-clientes',
  templateUrl: './consulta-clientes.component.html',
  styleUrls: ['./consulta-clientes.component.css']
})
export class ConsultaClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  filtroNome = '';
  filtroAtivo = '';
  clienteSelecionado: any;
  clientesOriginal: any;
  exibirConfirmacaoExclusao: boolean = false;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.findAll().subscribe((clientes: any[]) => {
      this.clientes = clientes;
      this.clientesOriginal = clientes.slice(); // faz uma cópia da lista original
    });
    this.loadClientes();
  }

  loadClientes(): void {
    this.apiService.findAll().subscribe(
      (clientes) => {
        this.clientes = clientes;
      },
      (error) => {
        console.error('Erro ao carregar clientes:', error);
        // Implemente a lógica para lidar com erros, como exibir uma mensagem de erro
      }
    );
  }

  filtrar(): void {
    this.clientes = this.clientesOriginal.filter((cliente: any) => {
      const nome = cliente.nome ? cliente.nome.toLowerCase() : '';
      const filtroNome = this.filtroNome ? this.filtroNome.toLowerCase() : '';
      const filtroAtivo = this.filtroAtivo !== '' ? this.filtroAtivo === 'true' : null;
      return nome.includes(filtroNome) && (filtroAtivo === null || cliente.ativo === filtroAtivo);
    });
  }

  selecionar(cliente: any) {
    this.clienteSelecionado = cliente;
  }
  novoCliente() {
    // Implementação do método para criar um novo cliente
  }

  confirmarExclusao() {
    // Implementação do método para confirmar a exclusão do cliente selecionado
    this.exibirConfirmacaoExclusao = false;
  }

  cancelarExclusao() {
    this.clienteSelecionado = null;
    this.exibirConfirmacaoExclusao = false;
  }

  editarCliente(id: number | undefined): void {
    this.router.navigate(['/clientes', id, 'editar']);
  }
  excluir(cliente: Cliente): void {
    if (confirm(`Deseja excluir o cliente "${cliente.nome}"?`)) {
      this.apiService.deleteClient(cliente.id).subscribe(
        () => {
          this.clientes = this.clientes.filter((c) => c.id !== cliente.id);
        },
        (error) => {
          console.error(`Erro ao excluir o cliente "${cliente.nome}":`, error);
          // Implemente a lógica para lidar com erros, como exibir uma mensagem de erro
        }
      );
    }
  }

}
