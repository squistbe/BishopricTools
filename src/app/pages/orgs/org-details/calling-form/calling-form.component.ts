import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallingService } from '../../../../services/calling.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CALLINGS } from '../../../../interfaces/calling';
import { CallingStatus, CallingStatusType } from '../../../../interfaces/calling-status';
import { ModalController } from '@ionic/angular';
import { SelectMemberComponent } from '../../../../components/select-member/select-member.component';

@Component({
  selector: 'calling-form',
  templateUrl: './calling-form.component.html',
  styleUrls: ['./calling-form.component.scss']
})
export class CallingFormComponent implements OnInit, OnDestroy {
  orgId: string;
  orgTag: string;
  callingId: string;
  callingForm: FormGroup;
  callingList;
  callings;
  callingStatuses: CallingStatusType[] = CallingStatus.exposedValues();
  callingName: FormControl;
  member: FormControl;
  status: FormControl;
  sortIndex: FormControl;
  other: FormControl;
  className: FormControl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private callingService: CallingService,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.callingId = this.route.snapshot.paramMap.get('callingId');
    this.orgId = this.route.snapshot.paramMap.get('id');
    this.orgTag = this.route.snapshot.queryParamMap.get('tag');
    this.callingList = CALLINGS.filter(calling => calling.orgTag === this.orgTag);
    this.callingName = new FormControl('', Validators.required);
    this.member = new FormControl('', Validators.required);
    this.status = new FormControl();
    this.sortIndex = new FormControl();
    this.other = new FormControl();
    this.className = new FormControl();
    this.callings = this.callingService.getCallings(this.orgId).subscribe(all => {
      this.sortIndex.setValue(all.length);
    });
    this.callingForm = new FormGroup({
      name: this.callingName,
      member: this.member,
      status: this.status,
      sortIndex: this.sortIndex,
      other: this.other,
      className: this.className
    });
  }

  ngOnDestroy() {
    this.callings.unsubscribe();
  }

  getStatus(type: CallingStatusType): string {
    return CallingStatus.asString(type);
  }

  async presentMembers() {
    const modal = await this.modal.create({
      component: SelectMemberComponent,
      componentProps: { data: {} }
    });
    modal.onDidDismiss().then(this.selectMember.bind(this));

    return await modal.present();
  }

  selectMember(e) {
    if (e.data) {
      this.member.setValue(e.data.member);
    }
  }

  submitMember() {
    const data = {
      orgTag: this.orgTag,
      orgId: this.orgId,
      unitNumber: 477400,
      ...this.callingForm.value,
      status: {
        name: this.status.value,
        updateAt: new Date()
      },
      name: this.callingName.value === 'other' ? this.other.value : this.callingName.value.name
    };
    delete data.other;

    if (this.callingName.value.hasClass) {
      data.className = this.callingName.value.className;
      data.hasClass = true;
    } else {
      delete data.className;
    }
    this.callingService.updateCalling(data, true).then(this.cancel.bind(this)).catch(err => console.log(err));
  }

  cancel() {
    this.router.navigate(['orgs', this.orgId], {queryParamsHandling: 'preserve'});
  }

}
