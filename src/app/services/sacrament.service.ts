import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Sacrament } from '../interfaces/sacrament';
import { BehaviorSubject } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SacramentService {
  selectedMonth = new BehaviorSubject('');
  selectedYear = new BehaviorSubject('');

  constructor(
    private db: DbService
  ) { }

  getSacraments() {
    return this.selectedMonth.pipe(
      switchMap(month => {
        return this.db.collection$('sacrament', ref =>
          ref
            .where('dateTag', '==', `${this.selectedYear.getValue()}-${month}`)
            .orderBy('date', 'asc'));
      })
    );
  }

  updateSacrament(sacrament) {
    this.db.updateAt(`sacrament/${sacrament.id || ''}`, sacrament);
  }

  isConference(sacrament: Sacrament) {
    return sacrament.meetingOptions &&
    (sacrament.meetingOptions.isGeneralConference ||
      sacrament.meetingOptions.isStakeConference ||
      sacrament.meetingOptions.isTempleDedication);
  }

  getConducting(month?) {
    const path = month ? `conducting/${month}` : 'conducting';
    if (month) {
      return this.db.doc$(path);
    }
    return this.db.collection$(path, ref => ref.orderBy('sortIndex'));
  }

  updateConducting(id, data) {
    this.db.updateAt(`conducting/${id}`, data);
  }
}
