import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  // Nuestro formulario de registro.
  formRegister: FormGroup

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {
    this.formRegister = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      repeatPassword: new FormControl('', [Validators.required,]),
      company: new FormControl('', [Validators.required]),
      avatar: new FormControl('', []),
    }, [this.samePass])
  }

  ngOnInit(): void {

  }

  async getDataForm() {
    try {
      const response = await this.usersService.register(this.formRegister.value)
      this.router.navigate(['/login'])
    } catch (err) {
      console.log(err)
    }
  }

  samePass(form: AbstractControl) {
    const passValue = form.get('password')?.value;
    const repeatpassValue = form.get('repeatPassword')?.value;

    if (passValue === repeatpassValue) {
      return null
    } else {
      return { passcompare: true }
    }
  }
}



