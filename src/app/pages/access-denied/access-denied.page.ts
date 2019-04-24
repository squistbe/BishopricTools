import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.page.html',
  styleUrls: ['./access-denied.page.scss'],
})
export class AccessDeniedPage implements OnInit {
  user$;
  unitNumber;

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
    private toast: ToastController
  ) { }

  ngOnInit() {
    if (this.hasRoles) {
      this.router.navigate(['/']);
    }
    this.user$ = this.auth.user$;
  }

  async hasRoles() {
    const uid = await this.auth.uid();
    return !!uid.roles;
  }

  async next() {
    const user = await this.user$.toPromise();
    const toast = await this.toast.create({
      message: `A message has been sent to the administrator for unit number ${this.unitNumber}. Please wait for access to be granted.`,
      showCloseButton: true,
      color: 'primary',
      position: 'top'
    });
    await this.userService.updateUser({...user, unitNumber: parseInt(this.unitNumber, null)});
    await toast.present();
    this.unitNumber = '';
  }

}
