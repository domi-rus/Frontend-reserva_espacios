import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  isLogged: boolean = false
  username: string | any
  logged: any
  user: User | any

  constructor(private usersServices: UsersService, private router: Router) { }

  async ngOnInit() {
    this.logged = await this.usersServices.myUser()
    this.username = this.logged.username
  }

  async OnSubmit() {
    try {
      const response = await this.usersServices.myUser()
      this.router.navigate(['idprofile', response])
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  ngDoCheck(): void {
    this.isLogged = (localStorage.getItem('token') !== null) ? true : false
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigateByUrl('/login')
  }
}
