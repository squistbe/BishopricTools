import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { ModalController, AlertController, Platform } from '@ionic/angular';
import { AttendanceFormComponent } from './attendance-form/attendance-form.component';
import { AttendanceService } from '../../services/attendance.service';
import moment from 'moment';

@Component({
  selector: 'app-sacrament-attendance',
  templateUrl: './sacrament-attendance.page.html',
  styleUrls: ['./sacrament-attendance.page.scss'],
})
export class SacramentAttendancePage implements OnInit {
  @ViewChild('lineCanvas') lineCanvas;
  lineChart;
  showChart = localStorage.getItem('showAttendanceChart') === 'true';
  chartSub;
  month;
  year;
  list;
  years;

  constructor(
    private route: ActivatedRoute,
    private modal: ModalController,
    private attendanceService: AttendanceService,
    private alert: AlertController,
    public platform: Platform
  ) { }

  ngOnInit() {
    this.month = this.route.snapshot.paramMap.get('month');
    this.year = this.route.snapshot.paramMap.get('year') || new Date().getFullYear().toString();
    this.attendanceService.year.next(this.year);
    this.list = this.attendanceService.getAttendance();
    this.chartSub = this.attendanceService.getAttendance().subscribe(res => {
      const data = res.map((val: any) => val.total).reverse();
      const labels = res.map((val: any) => moment(val.date).format('MMM Do')).reverse();
      if (this.lineChart) {
        this.lineChart.data.labels = labels;
        this.lineChart.data.datasets[0].data = data;
        this.lineChart.update();
      } else {
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Attendance',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: data,
                spanGaps: false,
              }
            ]
          }
        });
      }
    });
  }

  async addAttendance(item?) {
    const modal = await this.modal.create({
      component: AttendanceFormComponent,
      componentProps: {item}
    });
    return await modal.present();
  }

  deleteAttendance(id) {
    return this.attendanceService.deleteAttendance(id);
  }

  trackById(idx, attendance) {
    return attendance.id;
  }

  toggleChart() {
    this.showChart = !this.showChart;
    localStorage.setItem('showAttendanceChart', this.showChart.toString());
  }

  async presentYears() {
    const inputs = [];
    const date = new Date();
    for (let i = 0; i < 5; i++) {
      const year = (date.getFullYear() - i).toString();
      inputs.push({
        type: 'radio',
        value: year,
        label: year,
        checked: this.attendanceService.year.getValue() === year
      });
    }
    const alert = await this.alert.create({
      header: 'Pick a year',
      inputs: inputs,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'OK',
          handler: data => {
            this.attendanceService.year.next(data);
          }
        }
      ]
    });
    return await alert.present();
  }

  getTitle() {
    return this.attendanceService.year.getValue();
  }

}
