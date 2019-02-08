import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Sacrament } from '../interfaces/sacrament';
import { BehaviorSubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SacramentService {
  private daySource = new BehaviorSubject('');
  private monthSource = new BehaviorSubject('');
  private yearSource = new BehaviorSubject('');
  selectedDay = this.daySource.asObservable();
  selectedMonth = this.monthSource.asObservable();
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

  updateDay(day) {
    this.daySource.next(day);
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
