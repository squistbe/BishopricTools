import { Component, OnInit } from '@angular/core';
import { Hymn, SacramentSettings } from '../../interfaces/sacrament';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-hymn',
  templateUrl: './select-hymn.component.html',
  styleUrls: ['./select-hymn.component.scss']
})
export class SelectHymnComponent implements OnInit {
  hymns = SacramentSettings.HYMNS;
  form: FormGroup;
  searchText: FormControl;

  constructor(
    public modal: ModalController
  ) {
    this.searchText = new FormControl();
    this.form = new FormGroup({
      searchText: this.searchText
    });
  }

  ngOnInit() {
  }

  async selectHymn(hymn: Hymn) {
    return await this.modal.dismiss(hymn);
  }

}
