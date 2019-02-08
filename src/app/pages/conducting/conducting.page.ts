import { Component, OnInit } from '@angular/core';
import { SacramentService } from '../../services/sacrament.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-conducting',
  templateUrl: './conducting.page.html',
  styleUrls: ['./conducting.page.scss'],
})
export class ConductingPage implements OnInit {
  conducting: Observable<any>;
  members;

  constructor(
    private sacramentService: SacramentService,
    private userService: UserService,
    private alert: AlertController
  ) { }

  ngOnInit() {
    this.conducting = this.sacramentService.getConducting();
    this.userService.getUsers().subscribe(members => {
      this.members = members;
    });
  }

  trackById(idx, month) {
    return month.id;
  }

  async presentOptions(month) {
    const inputs = this.members
      .filter(it => {
        return it.calling && it.calling.startsWith('bishopric');
      })
      .map(m => {
        return {type: 'radio', label: m.displayName, value: m, checked: month.member && m.uid === month.member.uid};
      });
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
          handler: (data) => {
            this.sacramentService.updateConducting(month.id,
              {
                member: {
                  displayName: data.displayName,
                  photoURL: data.photoURL || null,
                  uid: data.uid
                }
              }
            );
          }
        }
      ]
    });

    return await alert.present();
  }
}
