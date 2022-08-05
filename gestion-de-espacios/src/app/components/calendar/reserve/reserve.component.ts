import { Component, Input, OnInit } from '@angular/core';
import { Reserve } from 'src/app/interfaces/reserve';
import { ReservesService } from 'src/app/services/reserves.service';


@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {

  @Input() myReserve: Reserve | any

  reserved: Reserve[] | any
  reserveFiltered: Reserve[] = []

  constructor(private reservesService: ReservesService) { }

  async ngOnInit(): Promise<void> {

    this.reserved = await this.reservesService.getAllReserves()
    this.reserveFiltered = [...this.reserved]
  }


}