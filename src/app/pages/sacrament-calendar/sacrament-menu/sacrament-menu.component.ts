import { Component, OnInit } from '@angular/core';
import { Sacrament } from '../../../interfaces/sacrament';
import { AlertController, PopoverController, ModalController } from '@ionic/angular';
import { SacramentService } from '../../../services/sacrament.service';
import { SelectMemberComponent } from '../../../components/select-member/select-member.component';

@Component({
  selector: 'app-sacrament-menu',
  templateUrl: './sacrament-menu.component.html',
  styleUrls: ['./sacrament-menu.component.scss']
})
export class SacramentMenuComponent implements OnInit {
  sacrament: Sacrament;

  constructor(
    private alert: AlertController,
    private popover: PopoverController,
    private modal: ModalController,
    private sacramentService: SacramentService
  ) { }

  ngOnInit() {
  }

  isConference() {
    return this.sacramentService.isConference(this.sacrament);
  }

  async presentMembers() {
    this.popover.dismiss();
    const modal = await this.modal.create({
      component: SelectMemberComponent
    });
    modal.onDidDismiss().then(this.selectMember.bind(this));
    return await modal.present();
  }

  selectMember(e) {
    if (!this.sacrament.speakers) {
      this.sacrament.speakers = [e.data];
    } else {
      this.sacrament.speakers.push(e.data);
    }
    this.sacramentService.updateSacrament(this.sacrament);
  }

  async presentMeetingOptions() {
    this.popover.dismiss();
    const alert = await this.alert.create({
      header: 'Meeting Type',
      inputs: [
        {
          type: 'radio',
          label: 'Testimony Meeting',
          value: 'isTestimonyMeeting',
          checked: this.sacrament.meetingOptions && this.sacrament.meetingOptions.isTestimonyMeeting
        },
        {
          type: 'radio',
          label: 'General Conference',
          value: 'isGeneralConference',
          checked: this.sacrament.meetingOptions && this.sacrament.meetingOptions.isGeneralConference
        },
        {
          type: 'radio',
          label: 'Stake Conference',
          value: 'isStakeConference',
          checked: this.sacrament.meetingOptions && this.sacrament.meetingOptions.isStakeConference
        },
        {
          type: 'radio',
          label: 'Temple Dedication',
          value: 'isTempleDedication',
          checked: this.sacrament.meetingOptions && this.sacrament.meetingOptions.isTempleDedication
        },
        {
          type: 'radio',
          label: 'None',
          value: 'none',
          checked: this.sacrament.meetingOptions &&
          !this.sacrament.meetingOptions.isGeneralConference &&
          !this.sacrament.meetingOptions.isStakeConference &&
          !this.sacrament.meetingOptions.isTempleDedication &&
          !this.sacrament.meetingOptions.isTestimonyMeeting
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Done',
          handler: (data) => {
            if (!this.sacrament.meetingOptions) {
              this.sacrament.meetingOptions = {};
            }
            if (data !== 'none') {
              this.sacrament.meetingOptions[data] = true;
            }
            Object.keys(this.sacrament.meetingOptions).forEach(element => {
              if (data !== element) {
                this.sacrament.meetingOptions[element] = false;
              }
            });
            this.sacramentService.updateSacrament(this.sacrament);
          }
        }
      ]
    });
    return await alert.present();
  }

}
