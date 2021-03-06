import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

export class EditProfileComponent implements OnInit {

  updateUserForm: FormGroup
  avatar: any
  @Output() updateUser: EventEmitter<boolean>
  @Input() myUser: User | any

  constructor(private userService: UsersService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.updateUser = new EventEmitter<boolean>()

    this.updateUserForm = new FormGroup({
      name: new FormControl('', []),
      surname: new FormControl('', []),
      userName: new FormControl('', []),
      email: new FormControl('', [Validators.email]),
    }, [])
  }

  async ngOnInit() {

  }
  async editUser() {

    let userId = this.myUser.id
    const response = await this.userService.editUser(this.updateUserForm.value, userId)
    this.updateUser.emit(true)
    window.location.reload();
    if (response[0].affectedRows) {
      alert('El usuario ha sido actualizado')
    } else {
      alert('El usuario no ha sido actualizado')
    }
  }

  onChange($event: any) {

    this.avatar = $event.target.avatar;
  }

  async deleteUser(pId: string) {

    let userId = this.myUser.id
    const alert = confirm('¿Estas seguro que quieres eliminar tu perfil?')

    if (alert) {

      const response = await this.userService.deleteUser(userId);
      localStorage.removeItem('token')
      this.router.navigate(['/home']);
      this.updateUser.emit(true);
    }
  }

  checkControl(controlName: string, errorName: string) {

    if (this.updateUserForm.get(controlName)?.hasError(errorName) && this.updateUserForm.get(controlName)?.touched) {
      return true
    } else {
      return false
    }
  }
}