import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { Member } from '../../interfaces/member';
import { database } from 'firebase';

@Component({
  selector: 'app-select-member',
  templateUrl: './select-member.component.html',
  styleUrls: ['./select-member.component.scss']
})
export class SelectMemberComponent implements OnInit, AfterViewInit {
  members: Observable<any[]>;
  data;
  searchText;

  constructor(
    private memberService: MemberService,
    public modal: ModalController
  ) { }

  ngOnInit() {
    if (this.data) {
      this.memberService.setAgeLimit(this.data.ageReq || null);
      this.memberService.setGenderReq(this.data.genderReq || null);
    }
    this.members = this.memberService.search();
  }

  ngAfterViewInit() {
    this.memberService.offset.next('');
  }

  onKeyup(e) {
    this.searchText = e.target.value;
    this.memberService.offset.next(this.searchText);
  }

  async selectMember(member: Member) {
    if (!this.data) {
      return await this.modal.dismiss({
        givenNames: member.givenNames,
        familyName: member.familyName,
        id: member.id
      });
    }
    this.data.member = {
      givenNames: member.givenNames,
      familyName: member.familyName,
      id: member.id
    };
    return await this.modal.dismiss(this.data);
  }

  getSearchText() {
    if (this.searchText) {
      return this.memberService.offset.getValue();
    }
    return '';
  }

}
