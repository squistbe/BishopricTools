import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MembersPage } from './members.page';
import { UploadMembersComponent } from '../../modals/upload-members/upload-members.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { FilterMemberPipe } from '../../pipes/filter-member.pipe';
import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: MembersPage
  },
  {
    path: 'create',
    component: MemberDetailsComponent
  },
  {
    path: ':id',
    component: MemberDetailsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MembersPage,
    UploadMembersComponent,
    MemberDetailsComponent,
    MemberFormComponent,
    FilterMemberPipe
  ],
  entryComponents: [
    UploadMembersComponent,
    MemberDetailsComponent,
    MemberFormComponent
  ]
})
export class MembersPageModule {}
