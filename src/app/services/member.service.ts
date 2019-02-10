import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { DbService } from './db.service';
import { switchMap, shareReplay, map } from 'rxjs/operators';
import { combineLatest, BehaviorSubject } from 'rxjs';
import uniqBy from 'lodash/uniqBy';
import flattenDeep from 'lodash/flattenDeep';
import { Gender } from '../interfaces/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  offset = new BehaviorSubject<any>('');
  private ageLimit = new BehaviorSubject<number>(null);
  private genderReq = new BehaviorSubject<Gender>(null);

  constructor(
    private auth: AuthService,
    private db: DbService
  ) { }

  getMembers() {
    return this.auth.user$.pipe(
      switchMap(user =>
        this.db.collection$('members', ref =>
          ref
            .where('unitNumber', '==', user.unitNumber)
            .orderBy('familyName', 'asc')
        )
      ),
      shareReplay(1)
    );
  }

  updateMember(data) {
    return this.db.updateAt(`members/${data.id || ''}`, data);
  }

  deleteMember(id) {
    return this.db.delete(`members/${id}`);
  }

  setAgeLimit(age) {
    this.ageLimit.next(age);
  }

  getAgeLimit() {
    return this.ageLimit.getValue();
  }

  setGenderReq(gender) {
    this.genderReq.next(gender);
  }

  getGenderReq() {
    return this.genderReq.getValue();
  }

  search() {
    return this.offset.pipe(
      switchMap(offset => {
        if (offset === 'lastSpoke' || offset === 'lastPrayed' || offset === 'lastInterviewed' || offset === 'willPray') {
          if (offset === 'willPray') {
            return this.db.collection$('members', ref => ref.where('willPray', '==', true));
          } else if (offset === 'lastSpoke' || offset === 'lastPrayed') {
            return this.db.collection$('members', ref => ref.orderBy(offset, 'asc'));
          }
        } else if (offset === '') {
          return this.db.collection$('members', ref => ref.orderBy('familyName', 'asc').limit(25));
        } else {
          const givenNamesRef = this.db.collection$('members', ref => ref.orderBy(`givenNamesIndex.${offset}`));
          const familyNamesRef = this.db.collection$('members', ref => ref.orderBy(`familyNameIndex.${offset}`));
          return combineLatest(givenNamesRef, familyNamesRef)
          .pipe(
            map((results) => {
              return uniqBy(flattenDeep(results), 'mrn').filter((value: any) => {
                if (this.getAgeLimit() && this.checkAge(new Date(value.birthDate), this.getAgeLimit())) {
                  return value;
                }
                if (this.getGenderReq() && value.gender === this.getGenderReq()) {
                  return value;
                }
                return value;
              });
            })
          );
        }
      })
    );
  }

  checkAge(date, age): boolean {
    return this._calculateAge(new Date(date)) >= age;
  }

  private _calculateAge(birthday): number {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
