import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../services/db.service';
import { ActivatedRoute } from '@angular/router';
import { of, Observable } from 'rxjs';
import { Member, MemberClass } from '../../../interfaces/member';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {
  member$: Observable<Member>;

  constructor(
    private db: DbService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.member$ = of(new MemberClass());
    } else {
      this.member$ = this.db.doc$(`members/${id}`);
    }
  }

}
