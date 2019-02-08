import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { AuthService } from './auth.service';
import { switchMap, shareReplay } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Calling } from '../interfaces/calling';

@Injectable({
  providedIn: 'root'
})
export class CallingService {
  private orgTitle = new BehaviorSubject('');
  private deleteMode = new BehaviorSubject(false);
  private reorder = new BehaviorSubject(false);

  constructor(
    private db: DbService,
    private auth: AuthService
  ) { }

  getCallings(orgId) {
    return this.auth.user$.pipe(
      switchMap(user =>
        this.db.collection$(`callings`, ref =>
          ref
          .where('unitNumber', '==', user.unitNumber)
          .where('orgId', '==', orgId)
          .orderBy('sortIndex', 'asc')
        )
      ),
      shareReplay(1)
    );
  }

  statusChange(calling: Calling) {
    this.db.updateAt(`callings/${calling.id}`, calling);
  }

  changeOrgTitle(title) {
    this.orgTitle.next(title);
  }

  getOrgTitle() {
    return this.orgTitle.getValue();
  }

  toggleDeleteMode(val: boolean) {
    this.deleteMode.next(val);
  }

  getDeleteMode() {
    return this.deleteMode.getValue();
  }

  setReorderMode(val: boolean) {
    this.reorder.next(val);
  }

  getReorderMode() {
    return this.reorder.getValue();
  }

  getOrgById(id) {
    return this.db.doc$(`orgs/${id}`);
  }

  deleteMemberFromCalling(calling) {
    this.db.updateAt(`callings/${calling.id}`, {member: null, status: {}});
  }

  removeCalling(id) {
    return this.db.delete(`callings/${id}`);
  }

  updateCalling(calling, merge?) {
    let data;
    if (calling.member) {
      data = {
        member: {
          givenNames: calling.member.givenNames,
          familyName: calling.member.familyName,
          id: calling.member.id
        }
      };
    }
    if (merge) {
      data = calling;
    }
    return this.db.updateAt(`callings/${calling.id || ''}`, data);
  }
}
