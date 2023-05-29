import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../model/cliente.model';
import { ClienteService } from '../../core/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
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

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obterCliente();
  }

  obterCliente(): void {
    const clienteId = this.route.snapshot.params['id'];

    this.clienteService.obterCliente(clienteId).subscribe(
      (cliente: Cliente) => {
        this.cliente = cliente;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  atualizarCliente(): void {
    this.clienteService.atualizarCliente(this.cliente).subscribe(
      (response) => {
        console.log('Cliente atualizado com sucesso:', response);
        this.router.navigate(['/consulta-clientes']); // Redireciona para a página de consulta de clientes após a atualização
      },
      (error) => {
        console.error('Erro ao atualizar o cliente:', error);
      }
    );
  }
}
