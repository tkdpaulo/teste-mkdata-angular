import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from "../model/cliente.model";

@Pipe({
  name: 'filtroClientes'
})
export class FiltroClientesPipe implements PipeTransform {
  transform(clientes: Cliente[], filtroNome: string, filtroAtivo: boolean): Cliente[] {
    // Filtrar pelo nome se o filtroNome não estiver vazio
    let clientesFiltrados = clientes;
    if (filtroNome) {
      clientesFiltrados = clientesFiltrados.filter((cliente) => {
        // Verificar se o nome do cliente contém o filtroNome (ignorando maiúsculas e minúsculas)
        return cliente.nome.toLowerCase().includes(filtroNome.toLowerCase());
      });
    }

    // Filtrar por ativo se o filtroAtivo não for null
    if (filtroAtivo !== null) {
      clientesFiltrados = clientesFiltrados.filter((cliente) => {
        // Verificar se o cliente está ativo com base no filtroAtivo
        return cliente.ativo === filtroAtivo;
      });
    }

    return clientesFiltrados;
  }

}
