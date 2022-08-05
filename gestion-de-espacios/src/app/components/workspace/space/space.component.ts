import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Reserve } from 'src/app/interfaces/reserve';
import { ReservesService } from 'src/app/services/reserves.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements OnInit {
  idUser: string | any
  user: User | any
  name: string | any
  date: string | any
  formReserve: FormGroup
  reserve: Reserve[] = []
  reserveFiltered: Reserve[] = []

  constructor(private reservesService: ReservesService, private userService: UsersService,
    private router: Router,) {

    this.formReserve = new FormGroup({

      spaceId: new FormControl('', [
        Validators.required, Validators.requiredTrue
      ]),
      date: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [

      ]),
    })
  }

  async ngOnInit(): Promise<void> {

  }

  async onSubmit() {
    // se submitea el formulario y se guarda en la base de datos y se redirige a la pagina de reservas realizadas. Reseteamos el formulario para que no se quede en el mismo estado que antes de hacer el submit 
    this.formReserve.value.spaceId = parseInt(this.formReserve.value.spaceId)
    this.formReserve.value.date = this.date


    this.reservesService.createReserve(this.formReserve.value).subscribe(async res => {

      if (res.id) {
        this.formReserve.reset()
        this.reserveFiltered = await this.reservesService.getAllReserves()
        this.router.navigate(['/profile'])

      } else {
        alert('Error al crear la reserva')
      }

    })
  }

  async OnDate($event: any): Promise<any> {
    this.reserve = await this.reservesService.getAllReserves()

    this.date = $event.target.value

    this.reserveFiltered = [...this.reserve]
    this.reserveFiltered = this.reserve.filter(x => x.date.substring(10, -1) == this.date)


  }



}