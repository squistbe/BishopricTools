import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgendaPage } from './agenda.page';
import { AgendaService } from '../../services/agenda.service';
import { AgendaFormComponent } from './agenda-form/agenda-form.component';
import { AgendaOptionsComponent } from './agenda-options/agenda-options.component';
import { InitialsPipe } from '../../pipes/initials.pipe';

const routes: Routes = [
  {
    path: '',
    component: AgendaPage
  },
  {
    path: ':id',
    component: AgendaPage
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
  declarations: [AgendaPage, AgendaFormComponent, AgendaOptionsComponent, InitialsPipe],
  entryComponents: [AgendaFormComponent, AgendaOptionsComponent],
  providers: [AgendaService]
})
export class AgendaPageModule {}
