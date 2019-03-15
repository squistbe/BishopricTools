import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrgsPage } from './orgs.page';
import { OrderByPipe } from '../../pipes/order-by.pipe';
import { CallingService } from '../../services/calling.service';

const routes: Routes = [
  {
    path: '',
    component: OrgsPage
  },
  {
    path: ':id',
    loadChildren: './org-details/org-details.module#OrgDetailsPageModule'
  },
  {
    path: ':status',
    loadChildren: './org-details/org-details.module#OrgDetailsPageModule'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrgsPage, OrderByPipe],
  providers: [CallingService]
})
export class OrgsPageModule {}
