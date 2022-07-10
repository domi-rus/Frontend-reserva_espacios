import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Reserve } from 'src/app/interfaces/reserve';
import { User } from 'src/app/interfaces/user';
import { ReservesService } from 'src/app/services/reserves.service';
import { UsersService } from 'src/app/services/users.service';

import jwt_decode from 'jwt-decode';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  imgPath: string
  user: User | any
  reserves: Reserve[] = []
  reserveFiltered: Reserve[] = []


  constructor(private usersService: UsersService, private actRoute: ActivatedRoute, public router: Router, private reserveService: ReservesService) {

    // Creamos la ruta que sirve para obtener la imagen de perfil del usuario

    this.imgPath = 'https://localhost:7023/api/Authenticate/'
  }

  async ngOnInit(): Promise<void> {
    const payload = jwt_decode(localStorage.getItem('token')!) as any;
    this.user = await this.usersService.getById(payload.Id)

    this.reserves = await this.reserveService.getAllReserves()
    this.reserveFiltered = [...this.reserves]
    console.log(this.reserveFiltered)
    this.reserveFiltered = this.reserveFiltered.filter(x => x.userId === payload.Id)



  }




  // Actualizar el usuario 


  // updateUser() {
  //   this.actRoute.params.subscribe(async params => {
  //     let userId = parseInt(params['idprofile'])
  //     if (params['idprofile']) {
  //       this.user = await this.usersService.getById(userId)
  //     } else {
  //       this.user = await this.usersService.myUser()
  //     }
  //   })
  // }


}


