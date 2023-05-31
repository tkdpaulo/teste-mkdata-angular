import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroClientesComponent } from "./pages/cadastro-clientes/cadastro-clientes.component";
import { ConsultaClientesComponent } from "./pages/consulta-clientes/consulta-clientes.component";
import { EditarClienteComponent } from "./pages/editar-cliente/editar-cliente.component";

const routes: Routes = [
  { path: '', redirectTo: 'consultar-clientes', pathMatch: 'full' },
  { path: 'cadastro-clientes', component: CadastroClientesComponent },
  { path: 'consultar-clientes', component: ConsultaClientesComponent },
  { path: 'clientes/:id/editar', component: EditarClienteComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
