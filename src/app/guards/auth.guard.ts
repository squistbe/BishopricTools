import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const uid = await this.auth.uid();
        const isLoggedIn = !!uid;

        if (!isLoggedIn) {
            console.log('access denied');
            this.router.navigate(['/login']);
            return false;
        }
        return await isLoggedIn;
    }
}
