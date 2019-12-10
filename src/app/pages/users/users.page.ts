import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserCallingStatus } from '../../interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users$;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.users$ = this.userService.getUsers();
  }

  toggleRole(role, user) {
    console.log(user);
    this.userService.updateUser(user);
  }

  getCallingText(calling) {
    return UserCallingStatus.asString(calling);
  }

}
