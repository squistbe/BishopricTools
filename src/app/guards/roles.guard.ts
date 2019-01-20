import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RolesGuard implements CanActivate {
    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const roles = await this.auth.roles();
        const expectedRoles = next.data.expectedRoles;

        if (!Object.keys(expectedRoles).some(role => roles[role])) {
            console.log('access denied');
            return false;
        }

        return true;
    }
}
