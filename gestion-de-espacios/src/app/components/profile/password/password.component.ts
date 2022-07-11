import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  editPassword: FormGroup;
  @Input() myProfile: User[] | any;

  constructor(private userServices: UsersService,
    private activateRoute: ActivatedRoute) {

    this.editPassword = new FormGroup({

      email: new FormControl('', [
        Validators.required
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required
      ]),
    }, [this.samePass])
  }

  ngOnInit(): void {
  }

  samePass(form: AbstractControl) {
    const passValue = form.get('password')?.value;
    const samePassValue = form.get('confirmPassword')?.value

    if (passValue === samePassValue) {
      return null
    } else {
      return { samePass: true }
    }
  }


  // Required validator for password field in the form group editPassword

  checkControl(controlName: string, errorName: string) {

    if (this.editPassword.get(controlName)?.hasError(errorName) && this.editPassword.get(controlName)?.touched) {
      return true
    } else {
      return false
    }
  }

  // touched reset pass word field in the form group editPassword when user click on it

  touchedReset(resetPass: string) {

    if (this.editPassword.get(resetPass)?.touched) {
      return true
    } else {
      return false
    }
  }

  // Edit password of the user logged in the system 

  editMyPass() {

    this.userServices.resetPassword(this.editPassword.value).subscribe(async res => {

      if (res.id) {


      } else {
        alert('Error al editar contraseña')
      }

    })
  }

}



