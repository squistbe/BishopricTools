import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Sacrament } from '../interfaces/sacrament';
import { BehaviorSubject } from 'rxjs';
import { shareReplay, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SacramentService {
  selectedMonth = new BehaviorSubject('');
  selectedYear = new BehaviorSubject('');

  constructor(
    private db: DbService,
    private auth: AuthService
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
    return this.auth.user$.pipe(
      switchMap(user => this.db.doc$(`conducting/${user.unitNumber}`))
    );
  }

  updateConducting(id, data) {
    this.db.updateAt(`conducting/${id}`, data);
  }
}
