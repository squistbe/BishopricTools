import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrgDetailsPage } from './org-details.page';
import { ComponentsModule } from '../../../components/components.module';
import { OrgOptionsComponent } from './org-options/org-options.component';
import { CallingFormComponent } from './calling-form/calling-form.component';
import { CallingItemComponent } from './calling-item/calling-item.component';

const routes: Routes = [
  {
    path: '',
    component: OrgDetailsPage
  },
  {
    path: 'create',
    component: CallingFormComponent
  },
  {
    path: ':callingId',
    component: CallingFormComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrgDetailsPage, OrgOptionsComponent, CallingFormComponent, CallingItemComponent],
  entryComponents: [OrgOptionsComponent]
})
export class OrgDetailsPageModule {}
