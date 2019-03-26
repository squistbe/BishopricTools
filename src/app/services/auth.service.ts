import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of } from 'rxjs';
import { switchMap, take, map, shareReplay } from 'rxjs/operators';
import { DbService } from './db.service';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform, LoadingController } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user$: Observable<any>;
    loading;

    constructor(
        private afAuth: AngularFireAuth,
        private db: DbService,
        private router: Router,
        private gplus: GooglePlus,
        private platform: Platform,
        private storage: Storage,
        private loadingController: LoadingController
    ) {
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => (user ? db.doc$(`users/${user.uid}`) : of(null))),
            take(1),
            shareReplay(1)
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
        await this.storage.remove('user');
        await this.router.navigate(['/login']);
        window.location.reload();
    }

    //// GOOGLE AUTH

    setRedirect(val) {
        localStorage.setItem('authRedirect', val);
    }

    isRedirect() {
        return localStorage.getItem('authRedirect') === 'true';
    }

    async googleLogin() {
        try {
            let user;

            if (this.platform.is('cordova')) {
                user = await this.nativeGoogleLogin();
            } else {
                this.setRedirect(true);
                const provider = new auth.GoogleAuthProvider();
                user = await this.afAuth.auth.signInWithRedirect(provider);
            }

            return await this.updateUserData(user);
        } catch (err) {
            console.log(err);
        }
    }

    // Handle login with redirect for web Google auth
    private handleRedirect() {
        if (this.isRedirect() !== true) {
            return null;
        }

        this.showLoading();
        this.afAuth.auth.getRedirectResult()
            .then(result => {
                if (result.user && result.additionalUserInfo.isNewUser) {
                    this.updateUserData(result.user);
                }
                this.setRedirect(false);
                this.dismissLoading();
            })
            .catch(err => console.log(err));

    }

    async showLoading() {
        this.loading = await this.loadingController.create();
        return await this.loading.present();
    }

    async dismissLoading() {
        return await this.loading.dismiss();
    }

    async nativeGoogleLogin(): Promise<any> {
        const gplusUser = await this.gplus.login({
            webClientId: '176789930554-71bt9hab407s58dhos8gd3rc2at27qtq.apps.googleusercontent.com',
            offline: true,
            scopes: 'profile email'
        });

        return await this.afAuth.auth.signInWithCredential(
            auth.GoogleAuthProvider.credential(gplusUser.idToken)
        );
    }
}
