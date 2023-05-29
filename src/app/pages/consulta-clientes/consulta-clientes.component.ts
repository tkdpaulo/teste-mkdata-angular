import { Component, OnInit } from '@angular/core';
import { ClienteService } from "../../core/cliente.service";
import { Cliente } from "../../model/cliente.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-clientes',
  templateUrl: './consulta-clientes.component.html',
  styleUrls: ['./consulta-clientes.component.css']
})
export class ConsultaClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  filtroNome: string = '';
  filtroAtivo: boolean | null = null;

  constructor(private clienteService: ClienteService,private router: Router) {}

  ngOnInit(): void {
    this.obterClientes();
  }

  obterClientes(): void {
    this.clienteService.obterClientes().subscribe(
      (clientes: Cliente[]) => {
        this.clientes = clientes;
        this.filtrarClientes(); // Atualize os clientes filtrados ao carregar os clientes
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  filtrarClientes() {
    // Lógica de filtragem
    this.clientesFiltrados = this.clientes.filter((cliente) => {
      // Verifica se o nome do cliente contém o filtro de nome (ignorando maiúsculas e minúsculas)
      const nomeMatch = cliente.nome.toLowerCase().includes(this.filtroNome.toLowerCase());

      // Verifica se o cliente está ativo, se o filtro de ativos for true,
      // ou se o filtro de ativos for false e o cliente não estiver ativo
      const ativoMatch = this.filtroAtivo === null || cliente.ativo === this.filtroAtivo;

      // Retorna true se tanto o nome quanto o status ativo do cliente corresponderem aos filtros aplicados
      return nomeMatch && ativoMatch;
    });
  }

  editarCliente(id: number): void {
    // Redirecionar para a página de edição do cliente com o ID fornecido
    this.router.navigate(['/editar-cliente', id]);
  }

  excluirCliente(id: number): void {
    // Chamar o método do serviço ClienteService para excluir o cliente
    this.clienteService.excluirCliente(id).subscribe(
      () => {
        // Atualizar a lista de clientes após a exclusão bem-sucedida
        this.obterClientes();
      },
      (error: any) => {
        console.error(error);
        // Lidar com o erro de exclusão do cliente
      }
    );
  }

  novoCliente(): void {
    // Redirecionar para a página de criação de cliente
    this.router.navigate(['/cadastro-clientes']);
  }
}
