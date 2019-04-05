import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of } from 'rxjs';
import { switchMap, take, map, shareReplay, first } from 'rxjs/operators';
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
            first()
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

    private updateUserData({ uid, email, displayName, photoURL, isAnonymous }, roles?, unitNumber?, calling?) {
        // Sets user data to firestore on login

        const path = `users/${uid}`;

        const data = {
            uid,
            email,
            displayName,
            photoURL,
            isAnonymous,
            roles,
            unitNumber,
            calling
        };
        this.storage.set('user', data);
        return this.db.updateAt(path, data);
    }

    async signOut() {
        await this.afAuth.auth.signOut();
        if (this.platform.is('cordova')) {
            await this.gplus.logout();
        }
        await this.storage.remove('user');
        await this.router.navigate(['/login']);
        window.location.reload();
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

        // this.showLoading();
        const result = await this.afAuth.auth.getRedirectResult();
        if (result.additionalUserInfo.isNewUser) {
            this.updateUserData(result.user);
        } else {
            const user = await this.user$.toPromise();
            this.updateUserData(user, user.roles, user.unitNumber, user.calling);
        }
        await this.setRedirect(false);
        // this.dismissLoading();
        // this.afAuth.auth.getRedirectResult()
        //     .then(result => {
        //         if (result.user && result.additionalUserInfo.isNewUser) {
        //             this.updateUserData(result.user);
        //         }
        //         this.setRedirect(false);
        //         this.dismissLoading();
        //     })
        //     .catch(err => console.log(err));

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
        this.showLoading();
        const result = await this.afAuth.auth.signInAndRetrieveDataWithCredential(
            auth.GoogleAuthProvider.credential(gplusUser.idToken)
        );
        if (result.additionalUserInfo.isNewUser) {
            await this.updateUserData(result.user);
        } else {
            const user: any = await this.user$.toPromise();
            await this.updateUserData(user, user.roles, user.unitNumber, user.calling);
        }
        return await this.dismissLoading();
    }
}
