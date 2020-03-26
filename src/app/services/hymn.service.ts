import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HymnService {
  offset = new BehaviorSubject<any>('');

  constructor(
    private db: DbService
  ) { }

  getHymns() {
    return this.db.collection$('hymns', ref => ref.orderBy('number', 'asc'));
  }

  search() {
    return this.offset.pipe(
      switchMap(offset => {
        const offsetParsed = parseInt(offset, 10);
        const isHymnNumber = Number.isInteger(offsetParsed);
        const index = (isHymnNumber ? 'number' : 'name') + 'Index';
        if (offset === '') {
          return this.db.collection$('hymns', ref => ref.orderBy('number', 'asc').limit(25));
        }
        return this.db.collection$('hymns', ref => ref.orderBy(`${index}.${offset}`));
      })
    );
  }
}
