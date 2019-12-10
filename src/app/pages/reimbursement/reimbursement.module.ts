import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { IonicModule } from '@ionic/angular';

import { ReimbursementPage } from './reimbursement.page';
import { ReimbursementService } from '../../services/reimbursement.service';
import { ReimbursementListComponent } from './reimbursement-list/reimbursement-list.component';

const routes: Routes = [
  {
    path: '',
    component: ReimbursementPage
  },
  {
    path: 'list',
    component: ReimbursementListComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AngularFireStorageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReimbursementPage, ReimbursementListComponent],
  providers: [ReimbursementService]
})
export class ReimbursementPageModule {}
