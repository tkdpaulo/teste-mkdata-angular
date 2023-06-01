import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroClientesComponent } from './pages/cadastro-clientes/cadastro-clientes.component';
import { ConsultaClientesComponent } from './pages/consulta-clientes/consulta-clientes.component';
import { EditarClienteComponent } from './pages/editar-cliente/editar-cliente.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule} from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CadastroClientesComponent,
    ConsultaClientesComponent,
    EditarClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
