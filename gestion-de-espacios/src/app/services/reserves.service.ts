import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReservesService {

  private baseUrl: string

  constructor(private httpClient: HttpClient) {

    this.baseUrl = 'https://localhost:7056/api/'
  }
  // Coge todas las reservas
  getAllReserves(): Promise<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem('token')!}`,
      })
    }
    return lastValueFrom(this.httpClient.get<any[]>(this.baseUrl + 'Reservation', httpOptions))
  }
  // Traer todas las salas de reuniones
  getAllMeetings(): Promise<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem('token')!}`,
      })
    }
    return lastValueFrom(this.httpClient.get<any[]>(this.baseUrl + 'Meeting', httpOptions))
  }
  // Coge reserva por id
  getReserveById(pId: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem('token')!}`,
      })
    }
    console.log(pId)
    return lastValueFrom(this.httpClient.get<any>(this.baseUrl + 'Reservation/' + pId, httpOptions))
  }
  // Crea reserva
  createReserve(pForm: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')!}`,
      })
    }
    const res = this.httpClient.post<any>(this.baseUrl + 'Reservation', pForm, httpOptions)
    return res
  }
  // Crea reserva sala de reuniones
  createMeeting(pForm: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')!}`,
      })
    }
    const res = this.httpClient.post<any>(this.baseUrl + 'Meeting', pForm, httpOptions)
    return res
  }
  // Actualiza reserva solo los autorizados
  updateReserve(pForm: any, pId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    const res = this.httpClient.put<any>(`${this.baseUrl}${pId}`, pForm, httpOptions)
    return res
  }
  // Borra reserva solo los autorizados
  deleteReserve(pId: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem('token')!}`,
      })
    }
    const res = lastValueFrom(this.httpClient.delete<any>(this.baseUrl + 'Reservation/' + pId, httpOptions))
    return res
  }
  // Borra sala de reuniones
  deleteMeeting(pId: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem('token')!}`,
      })
    }
    const res = lastValueFrom(this.httpClient.delete<any>(this.baseUrl + 'Meeting/' + pId, httpOptions))
    return res
  }
  // Coge reservas por status
  getReservesByStatus(pStatus: boolean): Promise<any[]> {
    return lastValueFrom(this.httpClient.get<any[]>(`${this.baseUrl}/status/${pStatus}`))
  }
  // Coge reservas por espacio
  getReservesBySpaceId(pId: number): Promise<any[]> {
    return lastValueFrom(this.httpClient.get<any[]>(`${this.baseUrl}/space/${pId}`))
  }
}