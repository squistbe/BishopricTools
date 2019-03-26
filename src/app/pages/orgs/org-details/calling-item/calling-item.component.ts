import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { CallingStatusType, CallingStatus } from '../../../../interfaces/calling-status';
import { CallingService } from '../../../../services/calling.service';

@Component({
  selector: 'calling-item',
  templateUrl: './calling-item.component.html',
  styleUrls: ['./calling-item.component.scss']
})
export class CallingItemComponent implements OnInit {
  @Input() calling;
  @Input() search;
  callingStatuses: CallingStatusType[] = CallingStatus.exposedValues();

  constructor(
    private callingService: CallingService
  ) { }

  ngOnInit() {
  }

  getStatus(type: CallingStatusType): string {
    return CallingStatus.asString(type);
  }

  statusChange(calling) {
    calling.status.updatedAt = new Date();
    this.callingService.statusChange(calling);
  }

  getSearchText() {
    return this.search;
  }

}
