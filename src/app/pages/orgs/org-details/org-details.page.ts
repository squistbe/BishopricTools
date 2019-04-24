import { Component, OnInit, OnDestroy } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CallingService } from '../../../services/calling.service';
import { ModalController, Platform, PopoverController, AlertController, ActionSheetController } from '@ionic/angular';
import { SelectMemberComponent } from '../../../components/select-member/select-member.component';
import { OrgOptionsComponent } from './org-options/org-options.component';
import { Calling } from '../../../interfaces/calling';
import { CallingStatus, CallingStatusType } from '../../../interfaces/calling-status';
import { Location } from '@angular/common';
import { MemberService } from '../../../services/member.service';
import { take } from 'rxjs/operators';

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
    private alert: AlertController,
    private actionSheetController: ActionSheetController,
    private memberService: MemberService,
    private callNumber: CallNumber,
    private sms: SMS
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

  async presentNotes(calling, slidingItem?) {
    if (slidingItem) {
      slidingItem.close();
    }
    const buttons: any = [
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
    ];
    if (calling.notes) {
      buttons.push({
        text: 'Delete',
        cssClass: 'danger',
        handler: () => {
          calling.notes = '';
          this.callingService.updateCalling({...calling}, true);
        }
      });
    }
    const alert = await this.alert.create({
      cssClass: 'alert-notes',
      header: `${calling ? 'Edit' : 'Add'} Notes`,
      inputs: [
        {
          type: 'text',
          name: 'notes',
          value: calling.notes
        }
      ],
      buttons: buttons
    });
    return await alert.present();
  }

  async presentActionSheet(e, calling) {
    if (calling.member) {
      const member = await this.memberService.getMember(calling.member.id).pipe(take(1)).toPromise();
      if (!member.phone) {
        const alert = await this.alert.create({
          message: `${member.givenNames} ${member.familyName} does not have a phone number.`,
          buttons: ['OK']
        });
        return await alert.present();
      } else {
        const actionSheet = await this.actionSheetController.create({
          header: `${member.phone}`,
          buttons: [{
            text: 'Call',
            icon: 'call',
            handler: () => {
              if (this.platform.is('cordova')) {
                this.callNumber.callNumber(member.phone, true);
              } else {
                window.open(`tel:${member.phone}`);
              }
            }
          }, {
            text: 'Text',
            icon: 'text',
            handler: () => {
              if (this.platform.is('cordova')) {
                this.sms.send(member.phone, '');
              } else {
                window.open(`sms:${member.phone}`);
              }
            }
          }, {
            text: 'Cancel',
            role: 'cancel'
          }]
        });
        await actionSheet.present();
      }
    }
  }
}
