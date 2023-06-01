import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Cliente } from "../../model/cliente.model";
import { ApiService } from "../../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cadastro-clientes',
  templateUrl: './cadastro-clientes.component.html',
  styleUrls: ['./cadastro-clientes.component.css']
})
export class CadastroClientesComponent implements OnInit {
  form: FormGroup;

  constructor(private apiService: ApiService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
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
  }

  get telefones(): FormArray {
    return this.form.get('telefones') as FormArray;
  }

  addTelefone(): void {
    this.telefones.push(this.fb.group({
      ddd: [''],
      numero: ['']
    }));
  }

  removeTelefone(index: number): void {
    this.telefones.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const cliente: Cliente = this.form.value;
      this.apiService.createClient(cliente).subscribe(
        (createdClient) => {
          console.log('Cliente criado com sucesso:', createdClient);
        },
        (error) => {
          console.error('Erro ao criar o cliente:', error);
        }
      );
      this.router.navigate(['/consultar-clientes']);
    } else {
      console.error('Formulário inválido');
    }

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
