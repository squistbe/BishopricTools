import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InterviewSchedulePage } from './interview-schedule.page';
import { UserService } from '../../services/user.service';
import { BishopricPipe } from '../../pipes/bishopric.pipe';
import { InterviewListComponent } from './interview-list/interview-list.component';
import { InterviewService } from '../../services/interview.service';
import { InterviewDetailsComponent } from './interview-details/interview-details.component';
import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: InterviewSchedulePage,
    children: [
      {
        path: ':interviewerId',
        component: InterviewListComponent
      },
      {
        path: ':interviewerId/:year',
        component: InterviewListComponent
      },
      {
        path: ':interviewerId/:year/:month',
        component: InterviewListComponent
      },
      {
        path: ':interviewerId/:year/:month/:day',
        component: InterviewListComponent
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
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InterviewSchedulePage, BishopricPipe, InterviewListComponent, InterviewDetailsComponent],
  entryComponents: [InterviewDetailsComponent],
  providers: [UserService, InterviewService]
})
export class InterviewSchedulePageModule {}
