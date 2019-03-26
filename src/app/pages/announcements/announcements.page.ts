import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementsService } from '../../services/announcements.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.page.html',
  styleUrls: ['./announcements.page.scss'],
})
export class AnnouncementsPage implements OnInit {
  announceSub;
  unitNumber;

  constructor(
    private router: Router,
    private announcementsService: AnnouncementsService,
    private auth: AuthService
  ) { }

  async ngOnInit() {
    return await this.auth.anonymousLogin();
  }

  get loading() {
    return this.announcementsService.loading.getValue();
  }

  next() {
    this.announcementsService.loading.next(true);
    this.announceSub = this.announcementsService.getUnit(this.unitNumber)
      .subscribe(unit => {
        this.announcementsService.loading.next(false);
        this.router.navigate(['announcements', this.unitNumber, 'add']);
      }, error => {
        console.log(error);
      });
  }

}
