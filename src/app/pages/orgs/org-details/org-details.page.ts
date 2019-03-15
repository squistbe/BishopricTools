import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CallingService } from '../../../services/calling.service';
import { ModalController, Platform, PopoverController } from '@ionic/angular';
import { SelectMemberComponent } from '../../../components/select-member/select-member.component';
import { OrgOptionsComponent } from './org-options/org-options.component';
import { Calling } from '../../../interfaces/calling';
import { CallingStatus, CallingStatusType } from '../../../interfaces/calling-status';
import { Location } from '@angular/common';

@Component({
  selector: 'app-org-details',
  templateUrl: './org-details.page.html',
  styleUrls: ['./org-details.page.scss'],
})
export class OrgDetailsPage implements OnInit, OnDestroy {
  callings: Observable<any[]>;
  orgId: string;
  callingLength;
  toggleReorder = false;
  private selection: Calling[] = [];
  status;
  callingStatuses: CallingStatusType[] = CallingStatus.exposedValues();

  constructor(
    private route: ActivatedRoute,
    private callingService: CallingService,
    private modalCtrl: ModalController,
    public platform: Platform,
    private popover: PopoverController,
    private location: Location
  ) { }

  ngOnInit() {
    this.orgId = this.route.snapshot.paramMap.get('id');
    if (CallingStatus.isInstanceOf(this.orgId)) {
      this.callingService.status.next(this.orgId);
      this.orgId = null;
    }
    this.callings = this.callingService.getCallings(this.orgId);
  }

  ngOnDestroy() {
    this.callingService.status.next(null);
  }

  trackById(idx, calling) {
    return calling.id;
  }

  statusChange(e) {
    this.callingService.status.next(e.detail.value);
    this.location.go(`/orgs/${e.detail.value}`);
  }

  getStatus(type: CallingStatusType): string {
    return CallingStatus.asString(type);
  }

  getCallingStatus() {
    return this.callingService.status.getValue();
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
