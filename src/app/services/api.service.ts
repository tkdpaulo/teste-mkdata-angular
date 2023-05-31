import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  findById(id: number | null): Observable<Cliente> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cliente>(url);
  }

  createClient(cliente: Cliente): Observable<Cliente> {
    console.log(cliente);
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  updateClient(cliente: Cliente): Observable<Cliente> {
    const url = `${this.apiUrl}/${cliente.id}`;
    return this.http.put<Cliente>(url, cliente);
  }

  deleteClient(id: number | undefined): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.apiUrl);
  }
  filtrarClientes(filtroNome: string, filtroAtivo: boolean): Observable<Cliente[]> {
    const params: any = {};
    if (filtroNome) {
      params.nome = filtroNome;
    }
    if (filtroAtivo !== null) {
      params.ativo = filtroAtivo;
    }
    return this.http.get<Cliente[]>(this.apiUrl, { params });
  }
}
