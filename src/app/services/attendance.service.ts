import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { BehaviorSubject } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  year = new BehaviorSubject<string>('');

  constructor(
    private db: DbService
  ) { }

  getAttendance(unitNumber) {
    return this.year.pipe(
      switchMap(year => {
        const min = new Date(year || new Date().getFullYear().toString());
        let max = new Date();
        if ((min.getFullYear() + 1) !== new Date().getFullYear()) {
          max = new Date((min.getFullYear() + 2).toString());
        }
        return this.db.collection$('attendance', ref =>
          ref
            .where('unitNumber', '==', unitNumber)
            .where('date', '<', max)
            .where('date', '>', min)
            .orderBy('date', 'desc')
        );
      }),
      shareReplay(1)
    );
  }

  updateAttendance(data) {
    this.db.updateAt(`attendance/${data.id || ''}`, data);
  }

  deleteAttendance(id) {
    this.db.delete(`attendance/${id}`);
  }
}
