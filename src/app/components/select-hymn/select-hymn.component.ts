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
  @ViewChild('hymnSearch') hymnSearch;
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
    setTimeout(() => this.hymnSearch.setFocus(), 100);
  }

  onKeyup(e) {
    this.searchText = e.target.value;
    this.hymnService.offset.next(this.searchText);
  }

  async selectHymn(hymn: Hymn) {
    return await this.modal.dismiss({name: hymn.name, number: hymn.number});
  }

}
