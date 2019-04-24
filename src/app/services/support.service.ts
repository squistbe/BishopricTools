import { Injectable } from '@angular/core';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor(
    private db: DbService
  ) { }

  addSupport(data) {
    return this.db.updateAt(`support`, data);
  }
}
