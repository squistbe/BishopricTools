import { Component, ViewChild, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router, NavigationEnd } from '@angular/router';
// import { FcmService } from './services/fcm.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnDestroy {
  @ViewChild('mainMenu') mainMenu;
  profile;
  userSub: Subscription;
  appPages = [
    // {
    //   title: 'Home',
    //   url: '/home',
    //   icon: 'home',
    //   role: {
    //     admin: true,
    //     guest: true
    //   }
    // },
    {
      title: 'Callings',
      url: '/orgs',
      icon: 'happy',
      role: {
        admin: true
      }
    },
    {
      title: 'Members',
      url: '/members',
      icon: 'people',
      role: {
        admin: true
      }
    },
    {
      title: 'Agenda/Todo',
      url: '/agenda',
      icon: 'checkmark-circle-outline',
      role: {
        admin: true
      }
    },
    {
      title: 'Interview Schedule',
      url: '/interview-schedule',
      icon: 'calendar',
      role: {
        admin: true
      }
    },
    {
      title: 'Sacrament Calendar',
      url: '/sacrament-calendar',
      icon: 'grid',
      role: {
        guest: true,
        admin: true
      }
    },
    {
      title: 'Sacrament Attendance',
      url: '/sacrament-attendance',
      icon: 'stats',
      role: {
        admin: true
      }
    },
    {
      title: 'Conducting Assignments',
      url: '/conducting',
      icon: 'book',
      role: {
        admin: true
      }
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private router: Router
  ) {
    this.initializeApp();
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url === '/') {
          const lastRoute = localStorage.getItem('lastRoute');
          if (!lastRoute) {
            this.router.navigate(['members']);
          } else {
            this.router.navigateByUrl(localStorage.getItem('lastRoute'));
          }
        } else if (val.url === '/login' || val.url === '/access-denied' || val.url.includes('announcements')) {
          localStorage.setItem('lastRoute', '/members');
        } else {
          localStorage.setItem('lastRoute', val.url);
        }
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.userSub = this.auth.user$.pipe(take(1)).subscribe(user => this.profile = user);
      // this.notificationSetup();
    });
  }

  // private notificationSetup() {
  //   this.fcm.getToken();
  //   this.fcm.onNotifications().subscribe(
  //     (msg) => {
  //       if (this.platform.is('ios')) {
  //         console.log(msg.aps.alert);
  //       } else {
  //         console.log(msg.body);
  //       }
  //     });
  // }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  showRoute(page) {
    return this.profile.roles && Object.keys(page.role).some(role => this.profile.roles[role]);
  }

  signout() {
    this.auth.signOut();
  }
}
