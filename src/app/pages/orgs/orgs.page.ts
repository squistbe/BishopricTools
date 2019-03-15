import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { AuthService } from '../../services/auth.service';
import { switchMap, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CallingService } from '../../services/calling.service';
import { CallingStatusType, CallingStatus } from '../../interfaces/calling-status';

@Component({
  selector: 'app-orgs',
  templateUrl: './orgs.page.html',
  styleUrls: ['./orgs.page.scss'],
})
export class OrgsPage implements OnInit {
  orgs: Observable<any[]>;
  callingStatuses: CallingStatusType[] = CallingStatus.exposedValues();

  constructor(
    private db: DbService,
    private auth: AuthService,
    private router: Router,
    private callingService: CallingService
  ) { }

  ngOnInit() {
    this.orgs = this.auth.user$.pipe(
      switchMap(user =>
        this.db.collection$(`orgs`, ref =>
          ref.where('unitNumber', '==', user.unitNumber).orderBy('sortIndex', 'asc')
        )
      ),
      shareReplay(1)
    );
  }

  statusChange(e) {
    if (e.detail.value) {
      this.router.navigate(['orgs', e.detail.value]);
      e.target.value = null;
    }
  }

  getStatus(type: CallingStatusType): string {
    return CallingStatus.asString(type);
  }

  trackById(idx, org) {
    return org.id;
  }

  goToOrg(org) {
    this.router.navigate(['orgs', org.id], {queryParams: {tag: org.orgTag}});
    this.callingService.changeOrgTitle(org.name);
  }

}
