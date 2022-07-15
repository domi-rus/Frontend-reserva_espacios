import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserve } from 'src/app/interfaces/reserve';
import { ReservesService } from 'src/app/services/reserves.service';

@Component({
  selector: 'app-delete-reserve',
  templateUrl: './delete-reserve.component.html',
  styleUrls: ['./delete-reserve.component.scss']
})

export class DeleteReserveComponent implements OnInit {


  @Input() myReserve: Reserve | any
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
}
