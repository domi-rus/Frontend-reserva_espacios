import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { Meeting } from 'src/app/interfaces/meeting'
import { Reserve } from 'src/app/interfaces/reserve'
import { ReservesService } from 'src/app/services/reserves.service'


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  reserves: Reserve[] = []
  reserveFiltered: Reserve[] = []
  meetings: Meeting[] = []
  meetingFiltered: Meeting[] = []

  constructor(
    private reservesService: ReservesService,
    private router: Router,) { }



  async ngOnInit(): Promise<void> {
    this.reserves = await this.reservesService.getAllReserves()
    this.reserveFiltered = [...this.reserves]
    this.meetings = await this.reservesService.getAllMeetings()
    this.meetingFiltered = [...this.meetings]


  }

  async onDateSelected($event: any) {
    this.reserveFiltered = await this.reservesService.getAllReserves()
    this.meetingFiltered = await this.reservesService.getAllMeetings()
    this.reserveFiltered = this.reserveFiltered.filter(x => x.date.substring(10, -1) == $event)
    console.log(this.meetingFiltered)
    this.meetingFiltered = this.meetingFiltered.filter(x => x.startHour.substring(10, -1) == $event)
  }

  async actReserves() {
    this.reserveFiltered = await this.reservesService.getAllReserves()
  }
  async actMeetings() {
    this.meetingFiltered = await this.reservesService.getAllMeetings()
  }

}