import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from '../../../services/announcements.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UnitService } from '../../../services/unit.service';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.scss'],
})
export class AddAnnouncementComponent implements OnInit {
  unit;
  form: FormGroup;
  user$;

  constructor(
    private announcementsService: AnnouncementsService,
    private unitService: UnitService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) { }

  async ngOnInit() {
    const unitParam = this.route.parent.snapshot.paramMap.get('unitNumber');
    this.unit = this.unitService.getUnit();
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      details: new FormControl(null, Validators.required),
      unitNumber: new FormControl(parseInt(unitParam, null)),
      uid: new FormControl(null),
      createdAt: new FormControl(null)
    });
    const uid = await this.auth.uid();
    if (!uid) {
      await this.auth.anonymousLogin({unitNumber: parseInt(unitParam, null)});
      window.location.reload();
    }
  }

  get loading() {
    return this.announcementsService.loading.getValue();
  }

  async submit() {
    const uid = await this.auth.uid();
    this.form.controls.uid.setValue(uid);
    this.form.controls.createdAt.setValue(Date.now());
    this.announcementsService.loading.next(true);
    await this.announcementsService.addAnnouncement(this.form.value);
    this.announcementsService.loading.next(false);
    return await this.router.navigate(['../list'], {relativeTo: this.route});
  }

}
