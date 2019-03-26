import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CallingService } from '../../../services/calling.service';
import { ModalController, Platform, PopoverController, AlertController } from '@ionic/angular';
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
  searchText;

  constructor(
    private route: ActivatedRoute,
    private callingService: CallingService,
    private modalCtrl: ModalController,
    public platform: Platform,
    private popover: PopoverController,
    private location: Location,
    private alert: AlertController
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
    popover.onDidDismiss().then(() => this.searchText = '');
    return await popover.present();
  }

  callingReorder(event, callings) {
    const stop = event.detail.from > event.detail.to ? event.detail.from : event.detail.to;
    const start = event.detail.from < event.detail.to ? event.detail.from : event.detail.to;
    const itemToMove = callings.splice(event.detail.from, 1)[0];
    callings.splice(event.detail.to, 0, itemToMove);
    if (event.currentTarget) {
      event.currentTarget.complete();
    }
    this.updateSortIndex(start, callings);
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

  async copyCalling(calling, callings, i, slidingItem) {
    const copy = {...calling};
    const pos = i + 1;
    delete copy.member;
    delete copy.id;
    copy.status = {};
    copy.sortIndex = pos;
    calling.$$adding = true;
    await this.callingService.updateCalling(copy, true);
    delete calling.$$adding;
    callings.splice(pos, 0, copy);
    this.updateSortIndex(pos + 1, callings);
    if (slidingItem) {
      slidingItem.close();
    }
  }

  updateSortIndex(start, callings) {
    for (let i = start; i < callings.length; i++) {
      callings[i].sortIndex = i;
      this.callingService.updateCalling(callings[i], true);
    }
  }

  async presentNotes(calling) {
    const title = `${calling ? 'Edit' : 'Add'} Notes`;
    const alert = await this.alert.create({
      header: title,
      inputs: [
        {
          type: 'text',
          name: 'notes',
          value: calling.notes
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Done',
          handler: (res) => {
            const data = {...calling, ...res};
            this.callingService.updateCalling(data, true);
          }
        }
      ]
    });
    return await alert.present();
  }
}
