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
  id: number = 0; // Adicione esta linha

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [null, Validators.required], // Adicione esta linha
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

  // Adicione este método
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
    if (this.form.valid) {
      const cliente: Cliente = this.form.value;
      this.apiService.updateClient(cliente).subscribe(
        (updatedClient) => {
          console.log('Cliente atualizado com sucesso:', updatedClient);
        },
        (error) => {
          console.error('Erro ao atualizar o cliente:', error);
        }
      );
    } else {
      console.error('Formulário inválido');
    }
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

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
// import { ApiService } from '../../services/api.service';
// import { Cliente } from "../../model/cliente.model";
//
// @Component({
//   selector: 'app-editar-cliente',
//   templateUrl: './editar-cliente.component.html',
//   styleUrls: ['./editar-cliente.component.css']
// })
// export class EditarClienteComponent implements OnInit {
//   form: FormGroup = this.formBuilder.group({
//     nome: ['', Validators.required],
//     tipo: ['', Validators.required],
//     cpfCnpj: ['', Validators.required],
//     rgIe: [''],
//     dataCadastro: [new Date()],
//     ativo: [true],
//     telefones: this.formBuilder.array([])
//   });
//   cliente?: Cliente;
//
//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private formBuilder: FormBuilder,
//     private apiService: ApiService
//   ) { }
//
//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     this.apiService.findById(id).subscribe(
//       (cliente) => {
//         this.cliente = cliente;
//         console.log("ngOnInit->Cliente: ", this.cliente);
//         this.initForm();
//       },
//       (error) => {
//         console.error(`Erro ao carregar o cliente com ID ${id}:`, error);
//         // Implemente a lógica para lidar com erros, como exibir uma mensagem de erro
//       }
//     );
//   }
//
//   initForm(): void {
//     this.form = this.formBuilder.group({
//       nome: [this.cliente?.nome, Validators.required],
//       tipo: ['', Validators.required],
//       cpfCnpj: [this.cliente?.cpfCnpj, Validators.required],
//       rgIe: [this.cliente?.rgIe, Validators.required],
//       ativo: [this.cliente?.ativo],
//       telefones: this.formBuilder.array([])
//     });
//   }
//
//   voltar(){
//     this.router.navigate(['/consultar-clientes']);
//   }
//   onSubmit(): void {
//     const clienteAtualizado = {
//       ...this.cliente,
//       ...this.form.value
//     };
//
//     this.apiService.updateClient(clienteAtualizado).subscribe(
//       () => {
//         this.router.navigate(['/consultar-clientes']);
//       },
//       (error) => {
//         console.error(`Erro ao atualizar o cliente com ID ${this.cliente?.id}:`, error);
//         // Implemente a lógica para lidar com erros, como exibir uma mensagem de erro
//       }
//     );
//   }
//
//   get telefones(): FormArray {
//     return this.form.get('telefones') as FormArray;
//   }
//
//   addTelefone(): void {
//     this.telefones.push(this.formBuilder.group({
//       ddd: [''],
//       numero: ['']
//     }));
//   }
//
//   removeTelefone(index: number): void {
//     this.telefones.removeAt(index);
//   }
//
//   isCpf() {
//     const tipo = this.form.get('tipo');
//     return tipo && tipo.value === 'PF';
//   }
//
//   isCnpj() {
//     const tipo = this.form.get('tipo');
//     return tipo && tipo.value === 'PJ';
//   }
// }
