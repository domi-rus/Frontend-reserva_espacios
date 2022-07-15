import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (localStorage.getItem('token') !== null) {
      return true;
    } else {
      alert('Disculpa, necesitas estar conectado para realizar esta acción.')
      this.router.navigate(['/login'])
      return false;
    }
  }
}