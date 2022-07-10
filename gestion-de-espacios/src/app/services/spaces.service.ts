import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class SpacesService {
  baseUrl: string


  constructor() {

    this.baseUrl = 'https://localhost:7023/api/'


  }


  // Métodos para los puestos getAll /workspace onInit  los puestos según status 

}
