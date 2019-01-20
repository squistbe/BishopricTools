import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccessDeniedPage } from './access-denied.page';

const routes: Routes = [
  {
    path: '',
    component: AccessDeniedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AccessDeniedPage]
})
export class AccessDeniedPageModule {}
