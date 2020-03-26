import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SacramentService } from '../../services/sacrament.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SacramentSettings, Sacrament } from '../../interfaces/sacrament';
import { ModalController, PopoverController } from '@ionic/angular';
import { SelectMemberComponent } from '../../components/select-member/select-member.component';
import { SelectHymnComponent } from '../../components/select-hymn/select-hymn.component';
import { SacramentOptionsComponent } from './sacrament-options/sacrament-options.component';
import { Location } from '@angular/common';
import { SacramentMenuComponent } from './sacrament-menu/sacrament-menu.component';
import { ConductingMenuComponent } from './conducting-menu/conducting-menu.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { switchMap, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-sacrament-calendar',
  templateUrl: './sacrament-calendar.page.html',
  styleUrls: ['./sacrament-calendar.page.scss'],
})
export class SacramentCalendarPage implements OnInit {
  sacraments: Observable<any[]>;
  conducting$: Observable<any>;
  months = SacramentSettings.SACRAMENT_MONTHS;
  monthSub: Subscription;
  updated;
  user;
  list;

  constructor(
    private sacramentService: SacramentService,
    private route: ActivatedRoute,
    private modal: ModalController,
    private popover: PopoverController,
    private location: Location,
    private auth: AuthService
  ) { }

  ngOnInit() {
    const now = new Date();
    const year = this.route.snapshot.paramMap.get('year') || now.getFullYear().toString();
    const month = this.route.snapshot.paramMap.get('month') || SacramentSettings.SACRAMENT_MONTHS[now.getMonth()].toLowerCase();
    this.sacramentService.selectedSacrament.next({month, year});
    this.conducting$ = this.sacramentService.selectedSacrament.pipe(
      switchMap(selection => {
        this.location.go(`sacrament-calendar/${selection.year}/${selection.month}`);
        return this.sacramentService.getConducting(selection.month);
      }),
      shareReplay(1)
    );
    this.list = this.sacramentService.selectedSacrament.pipe(
      switchMap(selection => this.sacramentService.getSacraments()),
      shareReplay(1)
    );
    this.user = this.auth.user$;
  }

  get month() {
    return this.sacramentService.selectedSacrament.getValue().month;
  }

  get year() {
    return this.sacramentService.selectedSacrament.getValue().year;
  }

  trackById(idx, sacrament) {
    return sacrament.id;
  }

  getNextSunday() {
    const now = new Date();
    const resultDate = new Date(new Date().setHours(0, 0, 0, 0));

    resultDate.setDate(now.getDate() + (7 + 6 - now.getDay()) % 7);

    return resultDate;
  }

  async presentMembers(sacrament: Sacrament, key: string, i?) {
    const modal = await this.modal.create({
      component: SelectMemberComponent
    });
    modal.onDidDismiss().then(this.selectMember.bind(this, sacrament, key, i));

    return await modal.present();
  }

  async selectMember(sacrament: Sacrament | any, key, i, e) {
    if (!e.data) {
      return;
    }
    if (key === 'speakers') {
      sacrament.speakers[i] = e.data;
    } else {
      sacrament[key] = e.data;
    }
    await this.sacramentService.updateSacrament(sacrament);
  }

  isConference(sacrament: Sacrament) {
    return this.sacramentService.isConference(sacrament);
  }

  async presentHymn(sacrament: Sacrament, hymn: string) {
    const modal = await this.modal.create({
      component: SelectHymnComponent
    });
    modal.onDidDismiss().then(this.selectHymn.bind(this, sacrament, hymn));
    return await modal.present();
  }

  selectHymn(sacrament: Sacrament, hymn: string, e) {
    if (e.data) {
      sacrament[hymn] = e.data;
      this.sacramentService.updateSacrament(sacrament);
    }
  }

  async presentOptions(e) {
    const popover = await this.popover.create({
      component: SacramentOptionsComponent,
      event: e
    });
    return await popover.present();
  }

  async presentMenu(e, sacrament) {
    const popover = await this.popover.create({
      component: SacramentMenuComponent,
      componentProps: {sacrament},
      event: e
    });
    return await popover.present();
  }

  speakerReorder(e, sacrament) {
    const itemToMove = sacrament.speakers.splice(e.detail.from, 1)[0];
    sacrament.speakers.splice(e.detail.to, 0, itemToMove);
    e.currentTarget.complete();
    this.sacramentService.updateSacrament(sacrament);
  }

  deleteSpeaker(sacrament, i) {
    sacrament.speakers.splice(i, 1);
    this.sacramentService.updateSacrament(sacrament);
  }

  async presentBishopric(e, sacrament) {
    const popover = await this.popover.create({
      component: ConductingMenuComponent,
      componentProps: {sacrament},
      event: e
    });
    return await popover.present();
  }
}
