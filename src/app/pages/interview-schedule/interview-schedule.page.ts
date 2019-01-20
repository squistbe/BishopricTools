import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-interview-schedule',
  templateUrl: './interview-schedule.page.html',
  styleUrls: ['./interview-schedule.page.scss'],
})
export class InterviewSchedulePage implements OnInit {
  bishopric: Observable<any[]>;
  activeTab = 'bishopric_bishop';
  interviewTab: string;
  interviewerId: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.bishopric = this.userService.getUsers();
    this.interviewerId = this.route.snapshot.paramMap.get('interviewerId');
    this.interviewTab = localStorage.getItem('interviewTab');
    if (this.interviewTab && !this.interviewerId) {
      this.router.navigate([this.interviewTab], {relativeTo: this.route});
    }
  }

  segmentClicked(item) {
    this.activeTab = item.calling;
    localStorage.setItem('interviewTab', item.uid);
  }
}
