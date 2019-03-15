import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { BehaviorSubject } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  selectedFilter = new BehaviorSubject<string>('');
  activeId = new BehaviorSubject<string>('');

  constructor(
    private db: DbService
  ) { }

  getInterviews(id) {
    return this.selectedFilter.pipe(
      switchMap(filter => {
        return this.db.collection$('interviews', ref => {
          const now = new Date().setHours(0, 0, 0, 0);
          localStorage.setItem('interviewFilter', filter);
          if (filter === 'future' || !filter) {
            return ref
              .where('interviewerId', '==', id)
              .where('dateTimestamp', '>=', now)
              .orderBy('dateTimestamp', 'asc');
          } else if (filter === 'last7Days') {
            return ref
              .where('interviewerId', '==', id)
              .where('dateTimestamp', '<=', now)
              .where('dateTimestamp', '>=', new Date().setDate(new Date().getDate() - 7))
              .orderBy('dateTimestamp', 'asc');
          } else if (filter === 'last30Days') {
            return ref
              .where('interviewerId', '==', id)
              .where('dateTimestamp', '<=', now)
              .where('dateTimestamp', '>=', new Date().setDate(new Date().getDate() - 30))
              .orderBy('dateTimestamp', 'asc');
          }
        });
      }),
      shareReplay(1)
    );
  }

  updateStatus(id, data) {
    this.db.updateAt(`interviews/${id}`, data);
  }

  updateInterview(interview) {
    return this.db.updateAt(`interviews/${interview.id || ''}`, interview);
  }

  deleteInterview(interview) {
    this.db.delete(`interviews/${interview.id}`);
  }
}
