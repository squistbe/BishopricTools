import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SelectMemberComponent } from './select-member/select-member.component';
import { SelectHymnComponent } from './select-hymn/select-hymn.component';
import { SelectStatusComponent } from './select-status/select-status.component';

import { FilterHymnsPipe } from '../pipes/filter-hymns.pipe';
import { HighlightPipe } from '../pipes/highlight.pipe';

import { HymnService } from '../services/hymn.service';
import { BishopricPipe } from '../pipes/bishopric.pipe';
import { StatusDefinitionsComponent } from './status-definitions/status-definitions.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SelectMemberComponent,
    SelectHymnComponent,
    SelectStatusComponent,
    HighlightPipe,
    BishopricPipe,
    StatusDefinitionsComponent
  ],
  declarations: [
    SelectMemberComponent,
    SelectHymnComponent,
    SelectStatusComponent,
    FilterHymnsPipe,
    HighlightPipe,
    BishopricPipe,
    StatusDefinitionsComponent
  ],
  entryComponents: [
    SelectMemberComponent,
    SelectHymnComponent,
    SelectStatusComponent,
    StatusDefinitionsComponent
  ],
  providers: [HymnService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
