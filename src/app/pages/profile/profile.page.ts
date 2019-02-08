import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: Observable<any>;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.user = this.auth.user$;
  }

}
