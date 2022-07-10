import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Reserve } from 'src/app/interfaces/reserve';
import { ReservesService } from 'src/app/services/reserves.service';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements OnInit {

  formReserve: FormGroup
  reserve: Reserve[] = []
  reserveFiltered: Reserve[] = []

  constructor(private reservesService: ReservesService,
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
    // this.reserve = await this.reservesService.getReservesByStatus(true)
    // this.reserveFiltered = [...this.reserve]
  }

  async onSubmit() {


    // se submitea el formulario y se guarda en la base de datos y se redirige a la pagina de reservas realizadas. Reseteamos el formulario para que no se quede en el mismo estado que antes de hacer el submit 

    this.formReserve.value.spaceId = parseInt(this.formReserve.value.spaceId)
    this.formReserve.value.date = moment(this.formReserve.value.date).format('YYYY-MM-DD')

    this.reservesService.createReserve(this.formReserve.value).subscribe(async res => {

      if (res.id) {

        this.formReserve.reset()
        this.reserve = await this.reservesService.getAllReserves()
        this.router.navigate(['/calendar'])

      } else {
        alert('Error al crear la reserva')
      }
      console.log(this.reserve)
    })
  }

  // Al espacio seleccionado, se filtran las reservas

  // async onSpaceSelected($event: any) {
  //   this.reserveFiltered = await this.reservesService.getReservesByStatus($event)
  // }

}
