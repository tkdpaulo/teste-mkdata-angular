import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroClientesComponent } from "./pages/cadastro-clientes/cadastro-clientes.component";
import {EditarClienteComponent} from "./pages/editar-cliente/editar-cliente.component";

const routes: Routes = [
  { path: 'cadastro-clientes', component: CadastroClientesComponent },
  { path: 'editar-clientes', component: EditarClienteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
