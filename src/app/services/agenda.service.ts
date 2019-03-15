import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(
    private db: DbService
  ) { }

  getAgenda(uid?) {
    if (!uid) {
      return this.db.collection$('agenda', ref => ref.orderBy('uid').orderBy('sortIndex'));
    }
    return this.db.collection$('agenda', ref => ref.where('uid', '==', uid).orderBy('sortIndex'));
  }

  deleteAgenda(id) {
    return this.db.delete(`agenda/${id}`);
  }

  updateStatus(id, status) {
    return this.db.updateAt(`agenda/${id}`, {status});
  }

  updateAgenda(id, data) {
    return this.db.updateAt(`agenda/${id || ''}`, data);
  }
}
