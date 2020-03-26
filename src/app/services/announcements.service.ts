import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {
  loading = new BehaviorSubject<boolean>(false);

  constructor(
    private db: DbService
  ) { }

  getAnnouncements(unitNumber) {
    return this.db.collection$('announcements', ref =>
      ref
        .where('unitNumber', '==', unitNumber)
        .orderBy('createdAt', 'desc')
    );
  }

  addAnnouncement(data) {
    return this.db.updateAt(`announcements/${data.id || ''}`, data);
  }

  deleteAnnouncement(id) {
    return this.db.delete(`announcements/${id}`);
  }
}
