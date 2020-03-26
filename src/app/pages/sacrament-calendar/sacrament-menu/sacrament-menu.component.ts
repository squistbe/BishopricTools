import { Component, OnInit } from '@angular/core';
import { Sacrament } from '../../../interfaces/sacrament';
import { AlertController, PopoverController, ModalController } from '@ionic/angular';
import { SacramentService } from '../../../services/sacrament.service';
import { SelectMemberComponent } from '../../../components/select-member/select-member.component';
import moment from 'moment';

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
    if (!e.data) {
      return;
    }
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

  async presentTopic() {
    this.popover.dismiss();
    const topic = await this.alert.create({
      header: `${this.sacrament.topic ? 'Edit' : 'Add'} Topic`,
      inputs: [
        {
          name: 'topic',
          type: 'text',
          placeholder: 'Enter topic...',
          value: this.sacrament.topic
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Ok',
          handler: (data) => {
            this.sacramentService.updateSacrament({...this.sacrament, ...data});
          }
        }
      ]
    });
    return await topic.present();
  }

  async warnRemoval() {
    this.popover.dismiss();
    const removeAlert = await this.alert.create({
      header: 'Remove Meeting',
      message: `Are you sure you want to remove the <strong>${moment(this.sacrament.date).format('MMMM Do')}</strong> Sacrament Meeting?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Yes',
          handler: (data) => {
            this.sacramentService.deleteSacrament(this.sacrament.id);
          }
        }
      ]
    });
    removeAlert.present();
  }
}
