import { Component } from '@angular/core';
import { AlertInput } from '@ionic/core';
import { Storage } from '@ionic/storage';
import { AlertController, PopoverController } from '@ionic/angular';
import { SacramentSettings, Sacrament } from '../../../interfaces/sacrament';
import { SacramentService } from '../../../services/sacrament.service';
import { AuthService } from '../../../services/auth.service';
import { UnitService } from '../../../services/unit.service';
import moment from 'moment';
import { DbService } from '../../../services/db.service';

@Component({
  selector: 'app-sacrament-options',
  templateUrl: './sacrament-options.component.html',
  styleUrls: ['./sacrament-options.component.scss']
})
export class SacramentOptionsComponent {
  constructor(
    private alert: AlertController,
    private sacramentService: SacramentService,
    private popover: PopoverController,
    private storage: Storage,
    private auth: AuthService,
    private unitService: UnitService
  ) { }

  get month() {
    return this.sacramentService.selectedSacrament.getValue().month;
  }

  get year() {
    return this.sacramentService.selectedSacrament.getValue().year;
  }

  async presentFilter(key) {
    this.popover.dismiss();
    let selectedFilter;
    if (key === 'month') {
      selectedFilter = SacramentSettings.SACRAMENT_MONTHS;
    }
    if (key === 'year') {
      const user = await this.auth.user();
      this.unitService.selectedUnit.next(user.unitNumber);
      const unit = await this.unitService.getUnit().toPromise();
      if (unit.themes) {
        selectedFilter = Object.keys(unit.themes).sort((a: any, b: any) => b - a);
      }
    }
    const inputs = selectedFilter.map(v => {
      return {
        type: 'radio',
        label: v,
        value: v.toLowerCase(),
        checked: this[key] === v.toLowerCase()
      };
    }) as AlertInput[];
    const alert = await this.alert.create({
      header: `Swith ${key}`,
      inputs,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Done',
          handler: (data) => {
            const appliedFilter = this.sacramentService.selectedSacrament.getValue();
            appliedFilter[key] = data;
            this.sacramentService.selectedSacrament.next(appliedFilter);
          }
        }
      ]
    });
    return await alert.present();
  }

  async createCalendarYear() {
    this.popover.dismiss();
    const alert = await this.alert.create({
      header: 'Add Calendar',
      message: `This will add each Sunday for the year you specify.&nbsp;
      Please add the calendar year (required) and annual theme (not required).`,
      inputs: [
        {
          name: 'theme',
          type: 'text',
          placeholder: 'Annual theme'
        },
        {
          name: 'year',
          type: 'number',
          placeholder: '*Enter year'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'OK',
          handler: this.handleCreateCalendarYear.bind(this)
        }
      ]
    });
    return await alert.present();
  }

  async handleCreateCalendarYear(data) {
    const user = await this.storage.get('user');
    this.unitService.selectedUnit.next(user.unitNumber);
    const unit = await this.unitService.getUnit().toPromise();
    if (!unit.themes) {
      unit.themes = {};
    }
    unit.themes[data.year] = data.theme;
    this.unitService.updateUnit(unit).then(async res => {
      this.sacramentService.selectedSacrament.next({year: data.year, month: 'january'});
      const sacraments = await this.getSundays(parseInt(data.year, 10));
      this.sacramentService.updateSacrament(sacraments, true);
    }).catch(e => console.log(e));
  }

  async getSundays(year: number) {
    const date = new Date(year, 0, 1);
    const user = await this.storage.get('user');
    while (date.getDay() !== 0) {
      date.setDate(date.getDate() + 1);
    }
    const days = [];
    while (date.getFullYear() === year) {
      const m = date.getMonth() + 1;
      const d = date.getDate();
      const isGC = d <= 7 && (m === 4 || m === 10);
      const isTM = d <= 7 && date.getDay() === 0 && !isGC;
      const meeting: Sacrament = {
        date: moment(year + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)).toDate(),
        dateTag: year + '-' + SacramentSettings.SACRAMENT_MONTHS[m - 1].toLowerCase(),
        unitNumber: user.unitNumber,
        meetingOptions: {}
      };
      if (isGC) {
        meeting.meetingOptions.isGeneralConference = true;
      }
      if (isTM) {
        meeting.meetingOptions.isTestimonyMeeting = true;
      }
      days.push(meeting);
      date.setDate(date.getDate() + 7);
    }
    return days;
  }

  async addMeeting() {
    const alert = await this.alert.create({
      header: 'Add Meeting',
      inputs: [
        {
          name: 'date',
          type: 'date',
          placeholder: 'Date'
        }
      ],
      buttons: [
        {
          text: 'Done',
          handler: (data) => {
            console.log(data);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }
      ]
    });
    return await alert.present();
  }

}
