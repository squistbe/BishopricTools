import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { InterviewStatus, Interview, InterviewDuration } from '../../../interfaces/interview';
import { InterviewService } from '../../../services/interview.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SelectMemberComponent } from '../../../components/select-member/select-member.component';

@Component({
  selector: 'app-interview-details',
  templateUrl: './interview-details.component.html',
  styleUrls: ['./interview-details.component.scss']
})
export class InterviewDetailsComponent implements OnInit {
  showInput: boolean;
  interview;
  interviewForm: FormGroup;
  interviewStatuses: InterviewStatus[] = Interview.exposedValues();
  interviewDurations: InterviewDuration[] = Interview.exposedDurationValues();
  givenNames: FormControl;
  familyName: FormControl;
  status: FormControl;
  yearValues = new Date().getFullYear() + ',' + (new Date().getFullYear() + 1);

  constructor(
    private interviewService: InterviewService,
    private route: ActivatedRoute,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.interview = {
      ...this.interview
    };
    this.givenNames = new FormControl(this.interview.member.givenNames);
    this.familyName = new FormControl(this.interview.member.familyName);
    this.status = new FormControl(this.interview.status);
    this.interviewForm = new FormGroup({
      member: new FormGroup({
        givenNames: this.givenNames,
        familyName: this.familyName,
        id: new FormControl(this.interview.member.id)
      }),
      interviewerId: new FormControl(this.interview.interviewerId || this.route.snapshot.paramMap.get('interviewerId')),
      date: new FormControl(this.interview.date),
      details: new FormControl(this.interview.details),
      status: this.status,
      duration: new FormControl(this.interview.duration || '0')
    });
  }

  getStatus(status) {
    return Interview.asString(status);
  }

  getDurationString(duration) {
    return Interview.durationAsString(duration);
  }

  async presentMembers(interview) {
    const modal = await this.modalCtrl.create({
      component: SelectMemberComponent,
      componentProps: { data: interview }
    });
    modal.onDidDismiss().then(this.selectMember.bind(this));

    return await modal.present();
  }

  selectMember(e) {
    if (e.data && e.data.member.id) {
      this.interview.member = {
        ...e.data.member
      };
      this.interviewForm.controls.member.setValue(e.data.member);
    }
  }

  async submitInterview() {
    const data = {
      unitNumber: 477400,
      ...this.interview,
      ...this.interviewForm.value
    };
    // data.date = new Date(data.date.replace('Z', ''));
    this.interviewService.updateInterview(data);
    this.modalCtrl.dismiss();
  }

  hasMember() {
    return this.givenNames.value && this.familyName.value;
  }

}
