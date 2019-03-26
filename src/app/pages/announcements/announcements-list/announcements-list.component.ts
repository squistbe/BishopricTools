import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from '../../../services/announcements.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-announcements-list',
  templateUrl: './announcements-list.component.html',
  styleUrls: ['./announcements-list.component.scss'],
})
export class AnnouncementsListComponent implements OnInit {
  list$;
  user$;

  constructor(
    private announcementsService: AnnouncementsService,
    private route: ActivatedRoute,
    public platform: Platform,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.list$ = this.announcementsService.getAnnouncements(parseInt(this.route.parent.snapshot.paramMap.get('unitNumber'), null));
    this.user$ = this.auth.user$;
  }

  deleteAnnouncement(e, announcement) {
    this.announcementsService.deleteAnnouncement(announcement.id);
  }

}
