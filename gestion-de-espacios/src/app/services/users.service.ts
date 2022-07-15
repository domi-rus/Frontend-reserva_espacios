import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map, Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  user: User | any
  baseUrl: string

  constructor(private httpClient: HttpClient) {

    this.baseUrl = 'https://localhost:7056/api/Authenticate/'

  }
  // Loggin del usuario
  login(pForm: any): Observable<any> {

    const res = this.httpClient.post<any>(this.baseUrl + 'login', pForm)
    return res
  }
  // Register
  register(pForm: any): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(this.baseUrl + 'register', pForm))
  }
  // Mi usuario solo autorizados
  myUser() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem('token')!}`,
      })
    }
    return lastValueFrom(this.httpClient.get<any>(this.baseUrl, httpOptions))
  }
  // Traigo usuarios por Id
  getById(pId: string): Promise<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem('token')!}`,
      })
    }
    return lastValueFrom(this.httpClient.get<User>(this.baseUrl + pId, httpOptions))

  }
  // Resetear contraseña solo autorizados
  resetPassword(pForm: any, pId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    const res = this.httpClient.put<any>(this.baseUrl + 'resetPassword/' + pId, pForm, httpOptions)
    return res
  }

  // Editar usuario solo los autorizados
  editUser(pForm: FormData, pId: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')!}`,
      })
    }
    console.log(pId)
    return lastValueFrom(this.httpClient.put<any>(this.baseUrl + 'Edit/' + pId, pForm, httpOptions))
  }
  // Borrar usuario solo los autorizados
  deleteUser(pId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    const res = this.httpClient.delete<any>(this.baseUrl + 'profile/' + pId, httpOptions)
    return res
  }
}


