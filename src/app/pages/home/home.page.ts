import { Component, OnInit } from '@angular/core';
import { CallingService } from '../../services/calling.service';
import { CallingStatus } from '../../interfaces/calling-status';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user;
  tasks$;

  constructor(
    private callingService: CallingService,
    private auth: AuthService
  ) {}

  async ngOnInit() {
    this.user = await this.auth.user$.pipe(take(1)).toPromise();
    this.callingService.status.next(this.user.preferences.status);
    this.tasks$ = this.callingService.getCallings();
  }

  getStatusText(type) {
    return CallingStatus.asString(type) || '';
  }
}
