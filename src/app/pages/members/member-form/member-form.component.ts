import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Member } from '../../../interfaces/member';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MemberService } from '../../../services/member.service';

@Component({
  selector: 'member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  memberForm: FormGroup;
  @Input() member: Member;

  constructor(
    private memberService: MemberService,
    private router: Router,
    private toast: ToastController
  ) { }

  ngOnInit() {
    this.member = {
      ...this.member
    };
    this.memberForm = new FormGroup({
      givenNames: new FormControl(this.member.givenNames, Validators.required),
      familyName: new FormControl(this.member.familyName, Validators.required),
      mrn: new FormControl(this.member.mrn, Validators.required),
      birthDate: new FormControl(this.member.birthDate, Validators.required),
      gender: new FormControl(this.member.gender, Validators.required),
      willPray: new FormControl(this.member.willPray),
      lastSpoke: new FormControl({value: this.member.lastSpoke, disabled: true}),
      lastPrayed: new FormControl({value: this.member.lastPrayed, disabled: true}),
      lastInterviewed:
      new FormControl({value: this.member.lastInterviewed, disabled: true}),
      phone: new FormControl(this.member.phone),
      email: new FormControl(this.member.email, Validators.email),
      unitNumber: new FormControl(this.member.unitNumber, Validators.required)
    });
  }

  submitMember() {
    const id = this.member.id || '';
    const data = {
      updateAt: new Date(),
      ...this.member,
      ...this.memberForm.value
    };
    data.birthDate = new Date(data.birthDate + 'T00:00:00');
    if (!data.id) {
      data.createdAt = new Date();
    }

    this.memberService.updateMember(data)
    .then(this.goToMembers.bind(this, `${data.givenNames} ${data.familyName} saved!`));
  }

  removeMember() {
    this.memberService.deleteMember(this.member.id)
    .then(this.goToMembers.bind(this, `${this.member.givenNames} ${this.member.familyName} removed!`));
  }

  goToMembers (message) {
    this.memberForm.reset();
    this.router.navigate(['members']);
    this.showMessage(message);
  }

  async showMessage(message) {
    const toast = await this.toast.create({
      message: message,
      duration: 5000,
      showCloseButton: true,
      position: 'top',
      color: 'success'
    });
    return await toast.present();
  }

  is18(date): boolean {
    return this._calculateAge(new Date(date)) >= 18;
  }

  private _calculateAge(birthday): number {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  cancel() {
    this.router.navigate(['members']);
  }
}
