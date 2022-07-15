import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserve } from 'src/app/interfaces/reserve';
import { User } from 'src/app/interfaces/user';
import { ReservesService } from 'src/app/services/reserves.service';

@Component({
  selector: 'app-flatview',
  templateUrl: './flatview.component.html',
  styleUrls: ['./flatview.component.scss']
})
export class FlatviewComponent implements OnInit {


  @Input() myReserve: Reserve | any
  constructor() { }

  async ngOnInit(): Promise<void> {


  }






}

