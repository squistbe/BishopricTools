import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { DbService } from './db.service';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';

import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user$: Observable<any>;

    constructor(
        private afAuth: AngularFireAuth,
        private db: DbService,
        private router: Router,
        private gplus: GooglePlus,
        private platform: Platform,
        private loadingController: LoadingController,
        private storage: Storage
    ) {
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => (user ? db.doc$(`users/${user.uid}`) : of(null)))
        );

        this.handleRedirect();
    }

    async user(): Promise<User> {
        return await this.storage.get('user');
    }

    uid() {
        return this.user$
            .pipe(
                take(1),
                map(u => u && u.uid)
            )
            .toPromise();
    }

    roles() {
        return this.user$
            .pipe(
                take(1),
                map(u => u && u.roles)
            )
            .toPromise();
    }

    async anonymousLogin() {
        const credential = await this.afAuth.auth.signInAnonymously();
        return await this.updateUserData(credential.user);
    }

    private updateUserData({ uid, email, displayName, photoURL, isAnonymous }) {
        // Sets user data to firestore on login

        const path = `users/${uid}`;

        const data = {
            uid,
            email,
            displayName,
            photoURL,
            isAnonymous
        };
        this.storage.set('user', data);
        return this.db.updateAt(path, data);
    }

    async signOut() {
        await this.afAuth.auth.signOut();
        return this.router.navigate(['/login']);
    }

    //// GOOGLE AUTH

    setRedirect(val) {
        this.storage.set('authRedirect', val);
    }

    async isRedirect() {
        return await this.storage.get('authRedirect');
    }

    async googleLogin() {
        try {
            let user;

            if (this.platform.is('cordova')) {
                user = await this.nativeGoogleLogin();
            } else {
                await this.setRedirect(true);
                const provider = new auth.GoogleAuthProvider();
                user = await this.afAuth.auth.signInWithRedirect(provider);
            }

            return await this.updateUserData(user);
        } catch (err) {
            console.log(err);
        }
    }

    // Handle login with redirect for web Google auth
    private async handleRedirect() {
        if ((await this.isRedirect()) !== true) {
            return null;
        }

        const result = await this.afAuth.auth.getRedirectResult();

        if (result.user) {
            await this.updateUserData(result.user);
        }

        await this.setRedirect(false);

        return result;
    }

    async nativeGoogleLogin(): Promise<any> {
        const gplusUser = await this.gplus.login({
            webClientId: '186755161522-kkbn8ferumo7rpbl14nh2iksvakn0nld.apps.googleusercontent.com',
            offline: true,
            scopes: 'profile email'
        });

        return await this.afAuth.auth.signInWithCredential(
            auth.GoogleAuthProvider.credential(gplusUser.idToken)
        );
    }
}
