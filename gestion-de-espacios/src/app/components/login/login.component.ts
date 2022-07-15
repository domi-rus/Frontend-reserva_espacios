import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  // Password validators are --> ^ - Comienzo del string, (?=[A-Z0-9]*[a-z]) miramos para asegurar al menos un carácter en minúsculas, (?=[a-zA-Z]*[0-9]) nos aseguramos al menos un número , (?=[a-z0-9]*[A-Z]) pedimos al menos una mayúscula, [a-zA-Z0-9]{8,} pedimos ocho o más caracteres, $ fin del string.

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(private usersServices: UsersService, private authServices: AuthService,
    private router: Router) { }

  async googleOnLogin() {
    try {
      this.authServices.loginGoogle()
    } catch (error) {
      console.log(error)
    }
  }

  ngOnInit(): void {

    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/login'])
    }
  }

  getLoginData(pForm: any) {
    this.usersServices.login(pForm.value).subscribe(res => {
      if (res.error) {
        alert(res.error)
      } else {
        localStorage.setItem('token', res.token)
        this.router.navigate(['/workspace'])
      }
    })
  }
}
