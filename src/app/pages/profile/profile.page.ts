import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { UserCallingStatus, UserCalling } from '../../interfaces/user';
import { ORGS } from '../../interfaces/organization';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userId;
  user: Observable<any>;
  userCallings = UserCallingStatus.exposedValues();
  assignments = ORGS;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.user = this.userService.getUserById(this.userId);
  }

  getCallingText(calling) {
    return UserCallingStatus.asString(calling);
  }

  callingChange(e) {
    this.userService.updateUser({id: this.userId, calling: e.target.value});
  }
}
