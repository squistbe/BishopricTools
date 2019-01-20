import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SacramentAttendancePage } from './sacrament-attendance.page';

const routes: Routes = [
  {
    path: '',
    component: SacramentAttendancePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SacramentAttendancePage]
})
export class SacramentAttendancePageModule {}
