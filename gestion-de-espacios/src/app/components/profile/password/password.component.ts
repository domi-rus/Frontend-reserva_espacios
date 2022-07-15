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

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      repeatPass: new FormControl('', [
        Validators.required
      ]),
    }, [this.samePass])
  }

  ngOnInit(): void {
  }

  samePass(form: AbstractControl) {
    const passValue = form.get('password')?.value;
    const samePassValue = form.get('repeatPass')?.value

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
    this.activateRoute.params.subscribe(params => {

      if (params['idprofile']) {

        const id = parseInt(params['idprofile']);
        this.userServices.resetPassword(this.editPassword.value, id).subscribe(response => {
          console.log(response);
          if (response[0].changedRows) {
            alert('Tu contraseña ha sido actualizada correctamente')
          } else {
            alert('La contraseña no ha podido ser actualizada')
          }
        })
      } else {
        const id = this.myProfile.id;
        this.userServices.resetPassword(this.editPassword.value, id).subscribe(response => {

          if (response[0].changedRows) {
            alert('Tu contraseña ha sido actualizada correctamente')
          } else {
            alert('La contraseña no ha podido ser actualizada')
          }
        })
      }
    })
  }
}
