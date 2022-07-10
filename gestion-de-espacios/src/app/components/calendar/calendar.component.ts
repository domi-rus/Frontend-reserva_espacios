import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
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

  constructor(
    private reservesService: ReservesService,
    private router: Router,) { }



  async ngOnInit(): Promise<void> {
    this.reserves = await this.reservesService.getAllReserves()
    this.reserveFiltered = [...this.reserves]
    console.log(this.reserves)
  }

  async onDateSelected($event: any) {
    this.reserveFiltered = await this.reservesService.filteredReserve($event)
  }

  async actReserves() {
    this.reserveFiltered = await this.reservesService.getAllReserves()
  }
}