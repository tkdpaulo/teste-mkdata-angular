import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Cliente } from "../../model/cliente.model";
import { Telefone } from "../../model/telefone.model";
import { ApiService } from "../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  form: FormGroup;
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [null, Validators.required],
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      cpfCnpj: ['', Validators.required],
      rgIe: [''],
      dataCadastro: [new Date()],
      ativo: [true],
      telefones: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.loadClient();
    });
  }

  loadClient(): void {
    this.apiService.findById(this.id).subscribe(client => {
      this.form.patchValue(client);
      client.telefones?.forEach(telefone => {
        this.addTelefone(telefone);
      });
      console.log(client);
    });
  }

  get telefones(): FormArray {
    return this.form.get('telefones') as FormArray;
  }

  addTelefone(telefone?: Telefone): void {
    this.telefones.push(this.fb.group({
      ddd: [telefone?.ddd || ''],
      numero: [telefone?.numero || '']
    }));
  }

  removeTelefone(index: number): void {
    this.telefones.removeAt(index);
  }

  onSubmit(): void {
    console.log("onSubmit->this.form: ", this.form);
    console.log("onSubmit->this.form.valid: ", this.form.valid);
    console.log("onSubmit->this.form.value: ", this.form.value);
    const cliente: Cliente = this.form.value;
    this.apiService.updateClient(cliente).subscribe(
      (updatedClient) => {
        console.log('Cliente atualizado com sucesso:', updatedClient);
      },
      (error) => {
        console.error('Erro ao atualizar o cliente:', error);
      }
    );
  }
  voltar(){
    this.router.navigate(['/consultar-clientes']);
  }
  isCpf() {
    const tipo = this.form.get('tipo');
    return tipo && tipo.value === 'PF';
  }

  isCnpj() {
    const tipo = this.form.get('tipo');
    return tipo && tipo.value === 'PJ';
  }
}
