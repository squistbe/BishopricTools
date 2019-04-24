import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import moment from 'moment';
import { AttendanceService } from '../../../services/attendance.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.scss']
})
export class AttendanceFormComponent implements OnInit {
  attendanceForm: FormGroup;
  item;

  constructor(
    private modal: ModalController,
    private attendanceService: AttendanceService,
    private storage: Storage
  ) { }

  ngOnInit() {
    const data = {...this.item};
    this.attendanceForm = new FormGroup({
      date: new FormControl(data.date || this.getNextSunday().format(), Validators.required),
      total: new FormControl(data.total || null, Validators.required),
      unitNumber: new FormControl(data.unitNumber)
    });
  }

  async close() {
    return await this.modal.dismiss();
  }

  getNextSunday() {
    const today = moment().isoWeekday();
    if (today <= 0) {
      return moment().isoWeekday(0).startOf('day');
    }
    return moment().add(1, 'weeks').isoWeekday(0).startOf('day');
  }

  async submitAttendance() {
    const user = await this.storage.get('user');
    this.attendanceForm.controls.unitNumber.setValue(user.unitNumber);
    this.attendanceService.updateAttendance({...this.item, ...this.attendanceForm.value});
    this.close();
  }

}
