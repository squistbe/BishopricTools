import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
      private auth: AuthService,
      private router: Router,
      public platform: Platform
  ) { }

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }

  async isLoggedIn () {
    const uid = await this.auth.uid();
    return !!uid;
  }

  async login() {
    await this.auth.googleLogin();
    return await this.router.navigateByUrl('/');
  }

}
