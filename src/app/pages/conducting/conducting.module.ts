import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConductingPage } from './conducting.page';
import { SacramentService } from '../../services/sacrament.service';
import { SortPipe } from '../../pipes/sort.pipe';

const routes: Routes = [
  {
    path: '',
    component: ConductingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [SacramentService],
  declarations: [ConductingPage, SortPipe]
})
export class ConductingPageModule {}
