import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reimbursement',
  templateUrl: './reimbursement.page.html',
  styleUrls: ['./reimbursement.page.scss'],
})
export class ReimbursementPage implements OnInit {
  reimbursementForm: FormGroup;

  constructor(
  ) { }

  ngOnInit() {
    this.reimbursementForm = new FormGroup({
      payee: new FormControl(),
      date: new FormControl(Date.now()),
      purpose: new FormControl(),
      paymentType: new FormControl(),
      salesTax: new FormControl(),
      subTotal: new FormControl(),
      receipts: new FormArray([])
    });
  }

}
