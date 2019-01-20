import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InterviewService } from '../../../services/interview.service';
import { Observable } from 'rxjs';
import { Interview, InterviewStatus, InterviewDuration } from '../../../interfaces/interview';
import { ModalController } from '@ionic/angular';
import { InterviewDetailsComponent } from '../interview-details/interview-details.component';
import * as moment from 'moment';
import { SelectMemberComponent } from '../../../components/select-member/select-member.component';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.scss']
})
export class InterviewListComponent implements OnInit {
  @ViewChild('interviewDate') interviewDate;
  activeId: string;
  list: Observable<any[]>;
  interviewStatuses: InterviewStatus[] = Interview.exposedValues();
  interviewDurations: InterviewDuration[] = Interview.exposedDurationValues();
  yearValues = new Date().getFullYear() + ',' + (new Date().getFullYear() + 1);

  constructor(
    private route: ActivatedRoute,
    private modal: ModalController,
    private interviewService: InterviewService
  ) { }

  ngOnInit() {
    this.activeId = this.route.snapshot.paramMap.get('interviewerId');
    this.list = this.interviewService.getInterviews(this.activeId);
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

  deleteInterview(interview) {
    this.interviewService.deleteInterview(interview);
  }

  getDateRange(interview) {
    const newDate = moment(interview.date).add(interview.duration, 'm').toDate();
    return newDate;
  }

  openDate() {
    this.interviewDate.open();
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
      interviewerId: this.activeId,
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
    modal.onDidDismiss().then(this.selectMember.bind(this));

    return await modal.present();
  }

  selectMember(e) {
    if (e.data) {
      this.updateInterview(e.data);
    }
  }

  sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

}
