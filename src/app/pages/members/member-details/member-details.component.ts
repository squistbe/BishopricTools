import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Observable } from 'rxjs';
import { Member, MemberClass } from '../../../interfaces/member';
import { MemberService } from '../../../services/member.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {
  member$: Observable<Member>;

  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.member$ = of(new MemberClass());
    } else {
      this.member$ = this.memberService.getMember(id);
    }
  }

}
