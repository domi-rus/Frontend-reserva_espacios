import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserve } from 'src/app/interfaces/reserve';
import { User } from 'src/app/interfaces/user';
import { ReservesService } from 'src/app/services/reserves.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {

  @Input() miReserve: Reserve | any

  reserved: Reserve[] | any
  reserveFiltered: Reserve[] = []

  constructor(private reservesService: ReservesService, private activatedRoute: ActivatedRoute, private router: Router) { }

  async ngOnInit(): Promise<void> {

    this.reserved = await this.reservesService.getAllReserves()
    this.reserveFiltered = [...this.reserved]



  }

  async onDelete(pId: number) {

    this.reserveFiltered = await this.reservesService.deleteReserve(pId);
    this.router.navigate(['/calendar']);
  }



  // Aqui me tengo que traer los metodos de mis reservas, editar etc....


}
