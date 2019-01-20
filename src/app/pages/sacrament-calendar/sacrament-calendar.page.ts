import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { SacramentService } from '../../services/sacrament.service';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SacramentSettings, Sacrament } from '../../interfaces/sacrament';
import { ModalController, PopoverController } from '@ionic/angular';
import { SelectMemberComponent } from '../../components/select-member/select-member.component';
import { SelectHymnComponent } from '../../components/select-hymn/select-hymn.component';
import { SacramentOptionsComponent } from './sacrament-options/sacrament-options.component';
import { Location } from '@angular/common';
import { SacramentMenuComponent } from './sacrament-menu/sacrament-menu.component';

@Component({
  selector: 'app-sacrament-calendar',
  templateUrl: './sacrament-calendar.page.html',
  styleUrls: ['./sacrament-calendar.page.scss'],
})
export class SacramentCalendarPage implements OnInit {
  sacraments: Observable<any[]>;
  months = SacramentSettings.SACRAMENT_MONTHS;
  year;
  month;

  constructor(
    private sacramentService: SacramentService,
    private route: ActivatedRoute,
    private modal: ModalController,
    private popover: PopoverController,
    private changeRef: ChangeDetectorRef,
    private location: Location,
    private router: Router
  ) {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = SacramentSettings.SACRAMENT_MONTHS[now.getMonth()].toLowerCase();
    if (route.snapshot.data.isEmpty) {
      router.navigate([year, month], {relativeTo: route});
    }
  }

  ngOnInit() {
    const now = new Date();
    const selectedYear = this.route.snapshot.paramMap.get('year') || now.getFullYear().toString();
    const selectedMonth = this.route.snapshot.paramMap.get('month') || SacramentSettings.SACRAMENT_MONTHS[now.getMonth()].toLowerCase();
    this.sacramentService.updateMonth(selectedMonth);
    this.sacramentService.updateYear(selectedYear);
    this.sacramentService.selectedYear.subscribe(year => this.year = year);
    this.sacramentService.selectedMonth.subscribe(month => {
      this.month = month;
      this.location.go(`sacrament-calendar/${this.year}/${this.month}`);
      this.getSacraments();
      this.changeRef.detectChanges();
    });
  }

  getSacraments() {
    this.sacraments = this.sacramentService.getSacraments(`${this.year}-${this.month}`);
  }

  async presentMembers(sacrament: Sacrament, key: string, i?) {
    const modal = await this.modal.create({
      component: SelectMemberComponent
    });
    modal.onDidDismiss().then(this.selectMember.bind(this, sacrament, key, i));

    return await modal.present();
  }

  selectMember(sacrament: Sacrament, key, i, e) {
    if (key === 'speakers') {
      sacrament.speakers[i] = e.data;
    } else {
      sacrament[key] = e.data;
    }
    this.sacramentService.updateSacrament(sacrament);
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
}
