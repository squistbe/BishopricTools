import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { DbService } from './db.service';
import { switchMap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private auth: AuthService,
    private db: DbService
  ) { }

  getUsers(isAnonymous?) {
    return this.auth.user$.pipe(
      switchMap(user =>
        this.db.collection$('users', ref =>
          ref
            .where('isAnonymous', '==', !!isAnonymous)
            .where('unitNumber', '==', user.unitNumber)
            .orderBy('displayName')
        )
      ),
      shareReplay(1)
    );
  }

  updateUser(data) {
    return this.db.updateAt(`users/${data.id || ''}`, data);
  }
}
