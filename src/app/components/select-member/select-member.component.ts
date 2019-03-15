import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { Member } from '../../interfaces/member';
import { switchMap, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-select-member',
  templateUrl: './select-member.component.html',
  styleUrls: ['./select-member.component.scss']
})
export class SelectMemberComponent implements OnInit, AfterViewInit {
  @ViewChild('memberSearch') memberSearch;
  members: Observable<any[]>;
  data;
  searchText;

  constructor(
    private memberService: MemberService,
    private modal: ModalController
  ) { }

  ngOnInit() {
    if (this.data) {
      this.memberService.setAgeLimit(this.data.ageReq || null);
      this.memberService.setGenderReq(this.data.genderReq || null);
    }
    this.members = this.memberService.cursor.pipe(
      switchMap(cursor => this.memberService.search(cursor)),
      shareReplay(1)
    );
  }

  ngAfterViewInit() {
    this.memberService.offset.next('');
    setTimeout(() => this.memberSearch.setFocus(), 100);
  }

  trackById(idx, member) {
    return member.id;
  }

  onKeyup(e) {
    this.searchText = e.target.value.toLowerCase();
    this.memberService.cursor.next(0);
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
    this.close();
  }

  getSearchText() {
    if (this.searchText) {
      return this.memberService.offset.getValue();
    }
    return '';
  }

  async close() {
    return await this.modal.dismiss(this.data);
  }

}
