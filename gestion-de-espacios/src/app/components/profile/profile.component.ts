import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserve } from 'src/app/interfaces/reserve';
import { User } from 'src/app/interfaces/user';
import { ReservesService } from 'src/app/services/reserves.service';
import { UsersService } from 'src/app/services/users.service';

import jwt_decode from 'jwt-decode';
import { Meeting } from 'src/app/interfaces/meeting';

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
  meetings: Meeting[] = []
  meetingFiltered: Meeting[] = []

  constructor(private usersService: UsersService, private actRoute: ActivatedRoute, public router: Router, private reserveService: ReservesService) {
    // Creamos la ruta que sirve para obtener la imagen de perfil del usuario
    this.imgPath = 'https://localhost:7056/api/Authenticate/'
  }

  async ngOnInit(): Promise<void> {

    const payload = jwt_decode(localStorage.getItem('token')!) as any;
    this.user = await this.usersService.getById(payload.Id)
    this.reserves = await this.reserveService.getAllReserves()
    this.reserveFiltered = [...this.reserves]
    this.meetings = await this.reserveService.getAllMeetings()
    this.meetingFiltered = [...this.meetings]
    this.reserveFiltered = this.reserveFiltered.filter(x => x.userId === payload.Id)
    this.meetingFiltered = this.meetingFiltered.filter(x => x.userId === payload.Id)

  }
}