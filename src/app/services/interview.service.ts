import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  selectedFilter = new BehaviorSubject<string>('future');

  constructor(
    private db: DbService
  ) { }

  getInterviews(id) {
    return this.selectedFilter.pipe(
      switchMap(filter => {
        return this.db.collection$('interviews', ref => {
          const now = Date.now();
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
      })
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
