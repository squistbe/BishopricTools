import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { DbService } from './db.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private auth: AuthService,
    private db: DbService
  ) { }

  getUsers() {
    return this.auth.user$.pipe(
      switchMap(user =>
        this.db.collection$('users', ref =>
          ref
              .where('unitNumber', '==', user.unitNumber)
              .limit(5)
        )
      )
    );
  }
}
