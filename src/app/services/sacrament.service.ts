import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Sacrament } from '../interfaces/sacrament';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SacramentService {
  private monthSource = new BehaviorSubject('');
  selectedMonth = this.monthSource.asObservable();
  private yearSource = new BehaviorSubject('');
  selectedYear = this.yearSource.asObservable();

  constructor(
    private db: DbService
  ) { }

  getSacraments(dateTag) {
    return this.db.collection$('sacrament', ref =>
      ref
        .where('dateTag', '==', dateTag)
        .orderBy('date', 'asc')
    );
  }

  updateSacrament(sacrament) {
    this.db.updateAt(`sacrament/${sacrament.id || ''}`, sacrament);
  }

  updateMonth(month: string) {
    this.monthSource.next(month);
  }

  updateYear(year: string) {
    this.yearSource.next(year);
  }

  isConference(sacrament: Sacrament) {
    return sacrament.meetingOptions &&
    (sacrament.meetingOptions.isGeneralConference ||
      sacrament.meetingOptions.isStakeConference ||
      sacrament.meetingOptions.isTempleDedication);
  }
}
