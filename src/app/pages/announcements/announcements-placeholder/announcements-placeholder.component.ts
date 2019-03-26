import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from '../../../services/announcements.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announcements-placeholder',
  templateUrl: './announcements-placeholder.component.html',
  styleUrls: ['./announcements-placeholder.component.scss'],
})
export class AnnouncementsPlaceholderComponent implements OnInit {

  constructor(
    private announcementService: AnnouncementsService,
    private auth: AuthService,
    private router: Router
    ) { }

  ngOnInit() {}

  get loading() {
    return this.announcementService.loading.getValue();
  }

  signOut() {
    this.auth.signOut();
  }

  async presentAnnouncement() {
    const user = await this.auth.user$.toPromise();
    this.router.navigate(['announcements', user.unitNumber, 'add']);
  }

}
