import { Component, OnInit } from '@angular/core';
import { SacramentSettings, Sacrament } from '../../../interfaces/sacrament';
import { AlertInput } from '@ionic/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { SacramentService } from '../../../services/sacrament.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sacrament-options',
  templateUrl: './sacrament-options.component.html',
  styleUrls: ['./sacrament-options.component.scss']
})
export class SacramentOptionsComponent implements OnInit {
  year: string;
  month: string;

  constructor(
    private alert: AlertController,
    private sacramentService: SacramentService,
    private popover: PopoverController
  ) { }

  ngOnInit() {
    this.sacramentService.selectedMonth.subscribe(month => this.month = month);
    this.sacramentService.selectedYear.subscribe(year => this.year = year);
  }

  async presentMonths() {
    this.popover.dismiss();
    const inputs = SacramentSettings.SACRAMENT_MONTHS.map(month => {
      return {
        type: 'radio',
        label: month,
        value: month.toLowerCase(),
        checked: this.month === month.toLowerCase()
      };
    }) as AlertInput[];
    const alert = await this.alert.create({
      header: 'Switch Months',
      inputs: inputs,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Done',
          handler: (data) => {
            this.sacramentService.selectedMonth.next(data);
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
      inputs: [
        {
          name: 'year',
          type: 'number',
          placeholder: 'Enter year'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'OK',
          handler: (data) => {
            const sacraments = this.getSundays(parseInt(data.year, 10));
            sacraments.forEach(sacrament => {
              setTimeout(() => this.sacramentService.updateSacrament(sacrament), 1000);
            });
          }
        }
      ]
    });
    return await alert.present();
  }

  // TODO: need to fix unitnumber
  getSundays(year: number) {
    const date = new Date(year, 0, 1);
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
        date: year + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d),
        dateTag: year + '-' + SacramentSettings.SACRAMENT_MONTHS[m - 1].toLowerCase(),
        unitNumber: 477400,
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
