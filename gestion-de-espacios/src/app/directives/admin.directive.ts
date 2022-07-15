import { Directive, ElementRef } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Directive({
  selector: '[appAdmin]'
})

export class AdminDirective {

  constructor(element: ElementRef) {
    // Get the token from the localStorage and decode it to get the user data (token). Then, check if the user is an admin. If so, show the element.
    const payload = jwt_decode(localStorage.getItem('token')!) as any;
    if (!payload.is_admin) {
      element.nativeElement.style.display = 'none'
    }
  }
}