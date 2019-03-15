import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SacramentAttendancePage } from './sacrament-attendance.page';
import { AttendanceService } from '../../services/attendance.service';
import { AttendanceFormComponent } from './attendance-form/attendance-form.component';

const routes: Routes = [
  {
    path: '',
    component: SacramentAttendancePage
  },
  {
    path: ':year',
    component: SacramentAttendancePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SacramentAttendancePage, AttendanceFormComponent],
  entryComponents: [AttendanceFormComponent],
  providers: [AttendanceService]
})
export class SacramentAttendancePageModule {}
