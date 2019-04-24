import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SupportService } from '../../services/support.service';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  supportForm: FormGroup;
  name: FormControl;
  email: FormControl;
  phone: FormControl;
  uid: FormControl;

  constructor(
    private supportService: SupportService,
    private auth: AuthService,
    private toast: ToastController
  ) {
    this.name = new FormControl();
    this.email = new FormControl();
    this.phone = new FormControl();
    this.uid = new FormControl();
  }

  ngOnInit() {
    this.supportForm = new FormGroup({
      name: this.name,
      email: this.email,
      phone: this.phone,
      uid: this.uid,
      content: new FormControl()
    });
    this.initForm();
  }

  private async initForm() {
    const user = await this.auth.user$.pipe(take(1)).toPromise();
    this.name.setValue(user.displayName);
    this.email.setValue(user.email || '');
    this.phone.setValue(user.phone || '');
    this.uid.setValue(user.uid);
  }

  async submit() {
    const data = {
      createdAt: Date.now(),
      ...this.supportForm.value
    };
    await this.supportService.addSupport(data);
    this.supportForm.reset();
    const toast = await this.toast.create({
      message: 'Message sent!',
      duration: 5000,
      color: 'success',
      position: 'top',
      showCloseButton: true
    });
    await toast.present();
  }

}
