import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultaClientesComponent } from './pages/consulta-clientes/consulta-clientes.component';
import { CadastroClientesComponent } from './pages/cadastro-clientes/cadastro-clientes.component';
import { EditarClienteComponent } from './pages/editar-cliente/editar-cliente.component';
import { FormsModule } from "@angular/forms";
import { FiltroClientesPipe } from './pipes/filtro-clientes.pipe';
import {NgxMaskDirective} from "ngx-mask";

@NgModule({
  declarations: [
    AppComponent,
    ConsultaClientesComponent,
    CadastroClientesComponent,
    EditarClienteComponent,
    FiltroClientesPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxMaskDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
