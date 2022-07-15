import { Component, OnInit } from '@angular/core'
import { Meeting } from 'src/app/interfaces/meeting'
import { Reserve } from 'src/app/interfaces/reserve'
import { ReservesService } from 'src/app/services/reserves.service'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})



export class CalendarComponent implements OnInit {

  reserves: Reserve[] = []
  reserveFiltered: Reserve[] = []
  meetings: Meeting[] = []
  meetingFiltered: Meeting[] = []

  constructor(private reservesService: ReservesService) {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const today = hoy.toISOString();
    console.log(today.substring(10, -1))
  }


  async ngOnInit(): Promise<void> {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const today = hoy.toISOString();
    console.log(today.substring(10, -1))


    this.reserves = await this.reservesService.getAllReserves()
    this.reserveFiltered = [...this.reserves]
    this.reserveFiltered = this.reserves.filter(x => x.date.substring(10, -1) == today.substring(10, -1))


    this.meetings = await this.reservesService.getAllMeetings()
    this.meetingFiltered = [...this.meetings]
    this.meetingFiltered = this.meetings.filter(x => x.startHour.substring(10, -1) == today.substring(10, -1))


  }

  async onDateSelected($event: any) {
    this.reserveFiltered = await this.reservesService.getAllReserves()
    this.meetingFiltered = await this.reservesService.getAllMeetings()
    this.reserveFiltered = this.reserveFiltered.filter(x => x.date.substring(10, -1) == $event)
    this.meetingFiltered = this.meetingFiltered.filter(x => x.startHour.substring(10, -1) == $event)
  }


}