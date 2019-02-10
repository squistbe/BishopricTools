import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InterviewService } from '../../../services/interview.service';
import { Observable } from 'rxjs';
import { Interview, InterviewStatus, InterviewDuration } from '../../../interfaces/interview';
import { ModalController, Platform, AlertController } from '@ionic/angular';
import { InterviewDetailsComponent } from '../interview-details/interview-details.component';
import moment from 'moment';
import { SelectMemberComponent } from '../../../components/select-member/select-member.component';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.scss']
})
export class InterviewListComponent implements OnInit {
  @ViewChild('aisConfig') search;
  activeId: string;
  list: Observable<any[]>;
  interviewStatuses: InterviewStatus[] = Interview.exposedValues();
  interviewDurations: InterviewDuration[] = Interview.exposedDurationValues();
  yearValues = new Date().getFullYear() + ',' + (new Date().getFullYear() + 1);

  constructor(
    private route: ActivatedRoute,
    private modal: ModalController,
    private alert: AlertController,
    private interviewService: InterviewService,
    public platform: Platform
  ) { }

  ngOnInit() {
    const t = new Date();
    const yesterday = t.setDate(t.getDate() - 1);
    this.activeId = this.route.snapshot.paramMap.get('interviewerId');
    this.list = this.interviewService.getInterviews(this.activeId);
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

  openDate() {
    // this.interviewDate.open();
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
    return d1 && d2 && moment(d1).isSame(moment(d2), 'day');
  }

  async presentFilter() {
    const alert = await this.alert.create({
      inputs: [
        {
          type: 'radio',
          label: 'Last 7 Days',
          value: 'last7Days',
          checked: this.interviewService.selectedFilter.getValue() === 'last7Days'
        },
        {
          type: 'radio',
          label: 'Last 30 Days',
          value: 'last30Days',
          checked: this.interviewService.selectedFilter.getValue() === 'last30Days'
        },
        {
          type: 'radio',
          label: 'Future',
          value: 'future',
          checked: this.interviewService.selectedFilter.getValue() === 'future'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: (data) => {
           this.interviewService.selectedFilter.next(data);
          }
        }
      ]
    });

    return await alert.present();
  }

}
