import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { DbService } from './db.service';
import { switchMap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  constructor(
    private db: DbService
  ) { }

  getInterviews(id) {
    return this.db.collection$('interviews', ref =>
      ref
        .where('interviewerId', '==', id)
        .where('date', '>=', new Date(new Date().setHours(0, 0, 0, 0)))
        .orderBy('date', 'asc')
    );
  }

  updateStatus(id, data) {
    this.db.updateAt(`interviews/${id}`, data);
  }

  updateInterview(interview) {
    this.db.updateAt(`interviews/${interview.id || ''}`, interview);
  }

  deleteInterview(interview) {
    this.db.delete(`interviews/${interview.id}`);
  }
}
