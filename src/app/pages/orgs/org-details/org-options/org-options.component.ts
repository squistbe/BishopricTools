import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { CallingService } from '../../../../services/calling.service';

@Component({
  selector: 'app-org-options',
  templateUrl: './org-options.component.html',
  styleUrls: ['./org-options.component.scss']
})
export class OrgOptionsComponent implements OnInit {
  orgId;

  constructor(
    private router: Router,
    private popover: PopoverController,
    private callingService: CallingService
  ) { }

  ngOnInit() {
  }

  addCalling () {
    this.popover.dismiss();
    this.router.navigate(['orgs', this.orgId, 'create'], {queryParamsHandling: 'preserve'});
  }

  toggleDelete() {
    this.popover.dismiss();
    this.callingService.toggleDeleteMode(true);
  }

}
