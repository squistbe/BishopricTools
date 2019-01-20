import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { AuthService } from '../../services/auth.service';
import { switchMap, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CallingService } from '../../services/calling.service';

@Component({
  selector: 'app-orgs',
  templateUrl: './orgs.page.html',
  styleUrls: ['./orgs.page.scss'],
})
export class OrgsPage implements OnInit {
  orgs: Observable<any[]>;

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

  trackById(idx, org) {
    return org.id;
  }

  goToOrg(org) {
    this.router.navigate(['orgs', org.id], {queryParams: {tag: org.orgTag}});
    this.callingService.changeOrgTitle(org.name);
  }

}
