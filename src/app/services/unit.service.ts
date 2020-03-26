import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Unit } from '../interfaces/unit';
import { switchMap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  selectedUnit = new BehaviorSubject<Number|String>('');

  constructor(
    private db: DbService
  ) { }

  getUnit() {
    return this.selectedUnit.pipe(
      switchMap(unit => {
        return this.db.doc$(`units/${unit}`);
      }),
      first()
    );
  }

  updateUnit(data) {
    return this.db.updateAt(`units/${data.id}`, data);
  }
}
