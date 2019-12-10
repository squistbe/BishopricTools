import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CallingStatus } from '../../interfaces/calling-status';

@Component({
  selector: 'app-status-definitions',
  templateUrl: './status-definitions.component.html',
  styleUrls: ['./status-definitions.component.scss'],
})
export class StatusDefinitionsComponent implements OnInit {
  statuses = CallingStatus.exposedValues();

  constructor(
    private modal: ModalController
  ) { }

  ngOnInit() {}

  close() {
    this.modal.dismiss();
  }

  getStatusTitle(status) {
    return CallingStatus.asString(status);
  }

  getDefinition(status) {
    return CallingStatus.getDefinition(status);
  }

}
