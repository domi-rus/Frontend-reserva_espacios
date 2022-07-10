import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  avatar: any
  @Output() updateUser: EventEmitter<boolean>
  @Input() myUser: User | any
  updateUserForm: FormGroup

  constructor(private userService: UsersService, private router: Router) {
    this.updateUser = new EventEmitter<boolean>()

    this.updateUserForm = new FormGroup({
      name: new FormControl('', []),
      surname: new FormControl('', []),
      username: new FormControl('', []),
      email: new FormControl('', [Validators.email]),
    }, [])

  }

  async ngOnInit() {

    let userId = this.myUser.id
    const updateProfile = await this.userService.getById(userId)
    this.updateUserForm = new FormGroup({
      name: new FormControl('updateProfile?.name', []),
      surname: new FormControl('updateProfile?.surname', []),
      username: new FormControl('updateProfile?.username', []),
      email: new FormControl('updateProfile?.email', [Validators.email]),
    })
  }
  async editUser() {
    let formData = new FormData()
    formData.append('name', this.updateUserForm.value.name)
    formData.append('surname', this.updateUserForm.value.surname)
    formData.append('username', this.updateUserForm.value.username)
    formData.append('email', this.updateUserForm.value.email)
    formData.append('avatar', this.myUser.avatar, this.avatar[0])

    if (this.avatar === null) {

      const response = await this.userService.editUser(formData, this.updateUserForm.value.id)
      this.updateUser.emit(true)
      if (response[0].affectedRows) {
        alert('El usuario ha sido actualizado')
      } else {
        alert('El usuario no ha sido actualizado')
      }
    }
  }

  onChange($event: any) {
    this.avatar = $event.target.avatar;
  }

  async deleteUser(pId: number) {
    const alert = confirm('¿Estas seguro que quieres eliminar tu perfil?')
    if (alert) {
      const response = await this.userService.deleteUser(pId);
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
