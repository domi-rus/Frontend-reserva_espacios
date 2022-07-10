import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meeting } from 'src/app/interfaces/meeting';
import { ReservesService } from 'src/app/services/reserves.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {

  @Input() miMeeting: Meeting | any



  meetings: Meeting[] | any
  meetingFiltered: Meeting[] = []

  constructor(private reservesService: ReservesService, private activatedRoute: ActivatedRoute, private router: Router) { }

  async ngOnInit(): Promise<void> {

    this.meetings = await this.reservesService.getAllMeetings()
    this.meetingFiltered = [...this.meetings]
  }

  async onDelete(pId: number) {

    this.meetingFiltered = await this.reservesService.deleteMeeting(pId);
    this.router.navigate(['/calendar']);
  }
}
