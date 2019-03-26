import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BehaviorSubject } from 'rxjs';
import { InterviewService } from '../../services/interview.service';
import { Platform, ModalController } from '@ionic/angular';
import { switchMap, shareReplay } from 'rxjs/operators';
import { Interview } from '../../interfaces/interview';
import moment from 'moment';
import { InterviewDetailsComponent } from './interview-details/interview-details.component';
import { SelectMemberComponent } from '../../components/select-member/select-member.component';

@Component({
  selector: 'app-interview-schedule',
  templateUrl: './interview-schedule.page.html',
  styleUrls: ['./interview-schedule.page.scss'],
})
export class InterviewSchedulePage implements OnInit {
  users;
  userSub = new BehaviorSubject('');
  list;
  dateRanges = Interview.exposedDateRanges();

  constructor(
    private userService: UserService,
    private interviewService: InterviewService,
    private modal: ModalController,
    public platform: Platform
  ) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
    this.interviewService.selectedFilter.next(localStorage.getItem('interviewFilter') || 'future');
    this.userSub.next(localStorage.getItem('selectedInterviewer') || '');
    this.list = this.userSub.pipe(
      switchMap(user => this.interviewService.getInterviews(user)),
      shareReplay(1)
    );
  }

  trackById(idx, interview) {
    return interview.id;
  }

  getStatusColor(status) {
    return Interview.getColorStatus(status);
  }

  getInterviewStatus(status) {
    return Interview.asString(status);
  }

  getDurationString(duration) {
    return Interview.durationAsString(duration);
  }

  updateInterview(interview) {
    interview.duration = interview.duration || '0';
    this.interviewService.updateInterview(interview);
  }

  deleteInterview(e, interview) {
    e.stopPropagation();
    this.interviewService.deleteInterview(interview);
  }

  getDateRange(interview) {
    const newDate = moment(interview.date).add(interview.duration, 'm').toDate();
    return newDate;
  }

  updateUser(user) {
    localStorage.setItem('selectedInterviewer', user);
    this.userSub.next(user);
  }

  sameDay(d1, d2) {
    return d1 && d2 && moment(d1).isSame(moment(d2), 'day');
  }

  async interviewDetails(interview) {
    const modal = await this.modal.create({
      component: InterviewDetailsComponent,
      componentProps: { interview }
    });

    return await modal.present();
  }

  async presentInterview() {
    const start = moment();
    const remainder = 15 - (start.minute() % 15);
    const interview = {
      status: 'pending',
      member: {
        givenNames: '',
        familyName: ''
      },
      interviewerId: this.userSub.getValue(),
      date: moment(start).add(remainder, 'minutes').toISOString(true)
    };
    const modal = await this.modal.create({
      component: InterviewDetailsComponent,
      componentProps: { interview }
    });

    return await modal.present();
  }

  async presentMembers(interview) {
    const modal = await this.modal.create({
      component: SelectMemberComponent,
      componentProps: { data: interview }
    });
    modal.onDidDismiss().then(this.selectMember);

    return await modal.present();
  }

  selectMember = e => {
    if (e.data) {
      this.updateInterview(e.data);
    }
  }

  updateDateRange(range) {
    this.interviewService.selectedFilter.next(range);
  }

  getDateRangeValue() {
    return this.interviewService.selectedFilter.getValue();
  }

  getInterviewFilterValue(value?) {
    return Interview.filtered(value || this.interviewService.selectedFilter.getValue());
  }

  getAdding() {
    return this.interviewService.adding.getValue();
  }

  // segmentClicked(item) {
  //   this.interviewService.activeId.next(item.uid);
  //   localStorage.setItem('interviewTab', item.uid);
  // }
}
