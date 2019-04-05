import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Hymn } from '../../interfaces/sacrament';
import { ModalController } from '@ionic/angular';
import { HymnService } from '../../services/hymn.service';

@Component({
  selector: 'app-select-hymn',
  templateUrl: './select-hymn.component.html',
  styleUrls: ['./select-hymn.component.scss']
})
export class SelectHymnComponent implements OnInit, AfterViewInit {
  hymns;
  searchText;

  constructor(
    public modal: ModalController,
    private hymnService: HymnService
  ) { }

  ngOnInit() {
    this.hymns = this.hymnService.search();
  }

  ngAfterViewInit() {
    this.hymnService.offset.next('');
  }

  onKeyup(e) {
    this.searchText = e.target.value.toLowerCase();
    this.hymnService.offset.next(this.searchText);
  }

  async selectHymn(hymn: Hymn) {
    return await this.modal.dismiss({name: hymn.name, number: hymn.number});
  }

}
