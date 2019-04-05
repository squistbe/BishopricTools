import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { PopoverController } from '@ionic/angular';
import { SacramentService } from '../../../services/sacrament.service';
import { Sacrament } from '../../../interfaces/sacrament';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-conducting-menu',
  templateUrl: './conducting-menu.component.html',
  styleUrls: ['./conducting-menu.component.scss'],
})
export class ConductingMenuComponent implements OnInit {
  items$;
  sacrament: Sacrament;

  constructor(
    private userService: UserService,
    private sacramentService: SacramentService,
    private popover: PopoverController
  ) { }

  ngOnInit() {
    this.items$ = this.userService.getUsers();
  }

  changeConducting(user: User) {
    const data: Sacrament = {
      ...this.sacrament,
      conducting: {
        displayName: user.displayName,
        uid: user.uid,
        photoURL: user.photoURL || null
      }
    };
    this.popover.dismiss();
    this.sacramentService.updateSacrament(data);
  }

}
