import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Sacrament } from '../interfaces/sacrament';
import { BehaviorSubject } from 'rxjs';
import { shareReplay, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

interface SacramentSelection {
  month: string;
  year: string|number;
}

@Injectable({
  providedIn: 'root'
})
export class SacramentService {
  selectedSacrament = new BehaviorSubject<SacramentSelection>({month: '', year: ''});

  constructor(
    private db: DbService,
    private auth: AuthService
  ) { }

  getSacraments() {
    const { month, year } = this.selectedSacrament.getValue();
    return this.auth.user$.pipe(
      switchMap(user => {
        return this.db.collection$('sacrament', ref =>
          ref
            .where('unitNumber', '==', user.unitNumber)
            .where('dateTag', '==', `${year}-${month}`)
            .orderBy('date', 'asc'));
      })
    );
  }

  async updateSacrament(data, multiple = false) {
    if (multiple) {
      return this.db.createMultiple('sacrament', data);
    }
    return this.db.updateAt(`sacrament/${data.id || ''}`, data);
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

  deleteSacrament(id) {
    this.db.delete(`sacrament/${id}`);
  }
}
