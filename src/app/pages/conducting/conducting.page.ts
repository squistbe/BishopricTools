import { Component, OnInit, OnDestroy } from '@angular/core';
import { SacramentService } from '../../services/sacrament.service';
import { AlertController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { AlertInput } from '@ionic/core';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conducting',
  templateUrl: './conducting.page.html',
  styleUrls: ['./conducting.page.scss'],
})
export class ConductingPage implements OnInit, OnDestroy {
  conducting;
  members;
  membersSub: Subscription;

  constructor(
    private sacramentService: SacramentService,
    private userService: UserService,
    private alert: AlertController,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.conducting = this.sacramentService.getConducting();
    this.membersSub = this.userService.getUsers().subscribe(members => this.members = members);
  }

  ngOnDestroy() {
    if (this.membersSub) {
      this.membersSub.unsubscribe();
    }
  }

  trackById(idx, month) {
    return month.id;
  }

  async presentOptions(val, month) {
    const inputs = this.members
      .filter((it: any) => {
        return it.calling && it.calling.startsWith('bishopric');
      })
      .map((m: any) => {
        return {type: 'radio', label: m.displayName, value: m, checked: val.member && m.uid === val.member.uid};
      }) as AlertInput[];
    const alert = await this.alert.create({
      header: 'Change Member',
      inputs: inputs,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'OK',
          handler: async (data) => {
            const user = await this.storage.get('user');
            const assignment = {};
            assignment[month] = {
              member: {
                displayName: data.displayName,
                photoURL: data.photoURL || null,
                uid: data.uid
              },
              sortIndex: val.sortIndex
            };
            this.sacramentService.updateConducting(user.unitNumber, assignment);
          }
        }
      ]
    });

    return await alert.present();
  }
}
