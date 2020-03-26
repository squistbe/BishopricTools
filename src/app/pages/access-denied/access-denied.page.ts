import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastController, IonSlides } from '@ionic/angular';
import { UnitService } from '../../services/unit.service';
import { Unit } from '../../interfaces/unit';
import { FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.page.html',
  styleUrls: ['./access-denied.page.scss'],
})
export class AccessDeniedPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  user$;
  unit: Unit;
  unitNumber;
  isOwner: Boolean = false;
  newWardForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private unitService: UnitService,
    private userService: UserService,
    private toast: ToastController
  ) { }

  async ngOnInit() {
    if (this.hasRoles) {
      this.router.navigate(['/']);
    }
    this.user$ = this.auth.user$;
    this.newWardForm = new FormGroup({
      name: new FormControl(null),
      unitNumber: new FormControl(null),
      calling: new FormControl(null)
    });
  }

  async hasRoles() {
    const uid = await this.auth.uid();
    return !!uid.roles;
  }

  async next() {
    this.unitService.selectedUnit.next(this.unitNumber);
    this.newWardForm.controls.unitNumber.setValue(this.unitNumber);
    this.unit = await this.unitService.getUnit().toPromise();
    if (!this.unit) {
      this.slides.slideNext();
    }
    // const user = await this.user$.toPromise();
    // const toast = await this.toast.create({
    //   message: `A message has been sent to the administrator for unit number ${this.unitNumber}. Please wait for access to be granted.`,
    //   showCloseButton: true,
    //   color: 'primary',
    //   position: 'top'
    // });
    // await this.userService.updateUser({...user, unitNumber: parseInt(this.unitNumber, null)});
    // await toast.present();
    // this.unitNumber = '';
  }

  async submitWard() {
    const user = await this.user$.toPromise();
    const userData = {
      ...user,
      roles: {
        admin: true
      },
      unitNumber: this.unitNumber
    };
    const data = {
      ...this.newWardForm.value,
      id: this.unitNumber,
      ownerId: user.id
    };
    debugger;
    await this.unitService.updateUnit(data);
    // const toast = await this.toast.create({
    //   message: `${this.newWardForm.}`
    // })
  }
}
