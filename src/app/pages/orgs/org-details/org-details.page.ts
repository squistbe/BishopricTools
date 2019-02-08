import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CallingService } from '../../../services/calling.service';
import { ModalController, Platform, PopoverController } from '@ionic/angular';
import { SelectMemberComponent } from '../../../components/select-member/select-member.component';
import { OrgOptionsComponent } from './org-options/org-options.component';
import { Calling } from '../../../interfaces/calling';

@Component({
  selector: 'app-org-details',
  templateUrl: './org-details.page.html',
  styleUrls: ['./org-details.page.scss'],
})
export class OrgDetailsPage implements OnInit {
  callings: Observable<any[]>;
  orgId: string;
  callingLength;
  toggleReorder = false;
  private selection: Calling[] = [];

  constructor(
    private route: ActivatedRoute,
    private callingService: CallingService,
    private modalCtrl: ModalController,
    public platform: Platform,
    private popover: PopoverController
  ) { }

  ngOnInit() {
    this.orgId = this.route.snapshot.paramMap.get('id');
    this.callings = this.callingService.getCallings(this.orgId);
  }

  trackById(idx, calling) {
    return calling.id;
  }

  getOrgById(): Observable<any> {
    return this.callingService.getOrgById(this.orgId);
  }

  deleteMemberFromCalling(calling, slidingItem?) {
    this.callingService.deleteMemberFromCalling(calling);
    if (slidingItem) {
      slidingItem.close();
    }
  }

  removeCallings() {
    this.getSelection().forEach(calling => {
      this.callingService.removeCalling(calling.id);
    });
  }

  async presentMembers(calling, item?) {
    const modal = await this.modalCtrl.create({
      component: SelectMemberComponent,
      componentProps: { data: calling }
    });
    modal.onDidDismiss().then(this.selectMember.bind(this));

    if (item) {
      item.close();
    }
    return await modal.present();
  }

  selectMember(calling) {
    if (calling.data) {
      this.callingService.updateCalling(calling.data);
    }
  }

  async presentOptions(event) {
    const popover = await this.popover.create({
      component: OrgOptionsComponent,
      event: event,
      componentProps: {
        orgId: this.orgId
      }
    });
    return await popover.present();
  }

  callingReorder(event, callings) {
    const stop = event.detail.from > event.detail.to ? event.detail.from : event.detail.to;
    const start = event.detail.from < event.detail.to ? event.detail.from : event.detail.to;
    const itemToMove = callings.splice(event.detail.from, 1)[0];
    callings.splice(event.detail.to, 0, itemToMove);
    event.currentTarget.complete();
    for (let i = start; i <= stop; i++) {
      callings[i].sortIndex = i;
      this.callingService.updateCalling(callings[i], true);
    }
  }

  setDeleteMode(val) {
    this.callingService.toggleDeleteMode(val);
  }

  getDeleteMode() {
    return this.callingService.getDeleteMode();
  }

  setReorder(val) {
    this.callingService.setReorderMode(val);
  }

  getReorder() {
    return this.callingService.getReorderMode();
  }

  setSelection(event, calling, i) {
    if (event.detail.checked) {
      this.selection.push(calling);
    } else {
      this.selection.splice(i, 1);
    }
  }

  getSelection() {
    return this.selection;
  }
}
