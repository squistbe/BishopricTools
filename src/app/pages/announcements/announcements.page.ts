import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementsService } from '../../services/announcements.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { take } from 'rxjs/operators';
import { UnitService } from '../../services/unit.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.page.html',
  styleUrls: ['./announcements.page.scss'],
})
export class AnnouncementsPage implements OnInit {
  announceSub: Subscription;
  unitNumber;

  constructor(
    private router: Router,
    private announcementsService: AnnouncementsService,
    private auth: AuthService,
    private userService: UserService,
    private unitService: UnitService
  ) { }

  async ngOnInit() {
    return await this.auth.anonymousLogin();
  }

  get loading() {
    return this.announcementsService.loading.getValue();
  }

  async next() {
    this.announcementsService.loading.next(true);
    const user = await this.auth.user$.pipe(take(1)).toPromise();
    if (!user.unitNumber) {
      const userData = {
        unitNumber: this.unitNumber,
        ...user
      };
      await this.userService.updateUser(userData);
    }
    this.announceSub = this.unitService.getUnit()
      .subscribe(unit => {
        this.announcementsService.loading.next(false);
        this.router.navigate(['announcements', this.unitNumber, 'add']);
      }, error => {
        console.log(error);
      });
  }

}
