import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectMemberComponent } from './select-member/select-member.component';
import { IonicModule } from '@ionic/angular';
import { SelectHymnComponent } from './select-hymn/select-hymn.component';
import { FilterHymnsPipe } from '../pipes/filter-hymns.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightPipe } from '../pipes/highlight.pipe';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [SelectMemberComponent, SelectHymnComponent, HighlightPipe],
  declarations: [SelectMemberComponent, SelectHymnComponent, FilterHymnsPipe, HighlightPipe],
  entryComponents: [SelectMemberComponent, SelectHymnComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
