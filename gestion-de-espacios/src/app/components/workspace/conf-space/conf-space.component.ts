import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Meeting } from 'src/app/interfaces/meeting';
import { ReservesService } from 'src/app/services/reserves.service';

@Component({
  selector: 'app-conf-space',
  templateUrl: './conf-space.component.html',
  styleUrls: ['./conf-space.component.scss']
})
export class ConfSpaceComponent implements OnInit {


  formReserveConf: FormGroup

  meeting: Meeting[] = []


  constructor(private router: Router, private reserveService: ReservesService) {


    this.formReserveConf = new FormGroup({

      startHour: new FormControl('',
        [Validators.required
        ]),
      endHour: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [

      ]),
    })

  }

  ngOnInit(): void {
  }

  async onSubmit() {



    // this.formReserveConf.value.startHour = moment(this.formReserveConf.value.startHour).format('YYYY-MM-DD HH:mm:ss')
    // this.formReserveConf.value.endHour = moment(this.formReserveConf.value.endHour).format('YYYY-MM-DD HH:mm:ss')
    console.log(this.formReserveConf)
    this.reserveService.createMeeting(this.formReserveConf.value).subscribe(async res => {

      if (res.id) {
        this.formReserveConf.reset()
        this.meeting = await this.reserveService.getAllMeetings()
        this.router.navigate(['/calendar'])
        console.log(res)
      } else {
        alert('Error al crear la reserva')
      }
    })
  }

}