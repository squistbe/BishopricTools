import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InterviewSchedulePage } from './interview-schedule.page';
import { UserService } from '../../services/user.service';
import { InterviewService } from '../../services/interview.service';
import { InterviewDetailsComponent } from './interview-details/interview-details.component';
import { ComponentsModule } from '../../components/components.module';
import { InterviewListComponent } from './interview-list/interview-list.component';

const routes: Routes = [
  {
    path: '',
    component: InterviewSchedulePage
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
  declarations: [InterviewSchedulePage, InterviewDetailsComponent, InterviewListComponent],
  entryComponents: [InterviewDetailsComponent],
  providers: [UserService, InterviewService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InterviewSchedulePageModule {}
