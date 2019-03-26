import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AnnouncementsPage } from './announcements.page';
import { AnnouncementsService } from '../../services/announcements.service';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { AnnouncementsListComponent } from './announcements-list/announcements-list.component';
import { AnnouncementsPlaceholderComponent } from './announcements-placeholder/announcements-placeholder.component';
import { AuthService } from '../../services/auth.service';

const routes: Routes = [
  {
    path: '',
    component: AnnouncementsPage
  },
  {
    path: ':unitNumber',
    component: AnnouncementsPlaceholderComponent,
    children: [
      {
        path: 'add',
        component: AddAnnouncementComponent
      },
      {
        path: 'list',
        component: AnnouncementsListComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AnnouncementsPage,
    AddAnnouncementComponent,
    AnnouncementsListComponent,
    AnnouncementsPlaceholderComponent
  ],
  providers: [AnnouncementsService, AuthService]
})
export class AnnouncementsPageModule {}
