import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController, AlertController } from '@ionic/angular';
import { CallingService } from '../../../../services/calling.service';
import { CallingStatus } from '../../../../interfaces/calling-status';
import { AlertInput } from '@ionic/core';

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
    private alert: AlertController,
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

  reorderCallings() {
    this.popover.dismiss();
    this.callingService.setReorderMode(true);
  }

  async filter() {
    this.popover.dismiss();
    const inputs: any = CallingStatus.exposedValues().map(input => {
      return {
        type: 'checkbox',
        label: CallingStatus.asString(input),
        value: input
      };
    });
    const alert = await this.alert.create({
      header: 'Filter by',
      inputs: inputs,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'OK',
          handler: (data) => {
            console.log(data);
          }
        }
      ]
    });
    return await alert.present();
  }

}
