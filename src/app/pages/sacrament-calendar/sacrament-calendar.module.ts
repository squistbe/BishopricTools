import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SacramentCalendarPage } from './sacrament-calendar.page';
import { SacramentService } from '../../services/sacrament.service';
import { ComponentsModule } from '../../components/components.module';
import { SacramentOptionsComponent } from './sacrament-options/sacrament-options.component';
import { SacramentMenuComponent } from './sacrament-menu/sacrament-menu.component';

const routes: Routes = [
  {
    path: '',
    component: SacramentCalendarPage,
    data: {
      isEmpty: true
    }
  },
  {
    path: ':year/:month',
    component: SacramentCalendarPage
  },
  {
    path: 'create'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SacramentCalendarPage, SacramentOptionsComponent, SacramentMenuComponent],
  entryComponents: [SacramentOptionsComponent, SacramentMenuComponent],
  providers: [SacramentService]
})
export class SacramentCalendarPageModule {}
