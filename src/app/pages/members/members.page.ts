import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertController, ToastController } from '@ionic/angular';
import { MemberService } from '../../services/member.service';
import { Router } from '@angular/router';
// import * as differenceBy from 'lodash/differenceBy';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit, AfterViewInit {
  @ViewChild('memberUpload') upload: ElementRef;
  members: Observable<any[]>;
  fileReaded;
  searchText;

  constructor(
      private memberService: MemberService,
      private router: Router,
      private alert: AlertController,
      private toast: ToastController
  ) { }

  ngOnInit() {
    this.members = this.memberService.search();
  }

  ngAfterViewInit() {
    this.memberService.offset.next('');
  }

  onKeyup(e) {
    this.searchText = e.target.value.toLowerCase();
    this.memberService.offset.next(this.searchText);
  }

  getSearchText() {
    if (this.searchText) {
      return this.memberService.offset.getValue();
    }
    return '';
  }

  async showMultipleUpload() {
    this.upload.nativeElement.click();
  }

  addMember() {
    this.router.navigate(['members', 'create']);
  }

  async presentFilters() {
    const filter = this.memberService.offset.getValue();
    const alert = await this.alert.create({
      header: 'Sort by',
      inputs: [
        {
          type: 'radio',
          label: 'Last Spoke',
          value: 'lastSpoke',
          checked: filter === 'lastSpoke'
        },
        {
          type: 'radio',
          label: 'Last Prayed',
          value: 'lastPrayed',
          checked: filter === 'lastPrayed'
        },
        {
          type: 'radio',
          label: 'Last Interviewed',
          value: 'lastInterviewed',
          checked: filter === 'lastInterviewed'
        },
        {
          type: 'radio',
          label: 'Will Pray',
          value: 'willPray',
          checked: filter === 'willPray'
        },
        {
          type: 'radio',
          label: 'Reset',
          value: ''
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: (data) => this.memberService.offset.next(data)
        }
      ]
    });
    return await alert.present();
  }

  showFilterAttr(attr, member) {
    return this.memberService.offset.getValue() === attr && member[attr];
  }

  memberDetails(id) {
    this.router.navigate(['members', id]);
  }

  textMember(e) {
    e.stopPropagation();
  }

  callMember(e) {
    e.stopPropagation();
  }

  deleteMember(member) {
    this.memberService.deleteMember(member.id).then(this.showMessage.bind(this, `${member.givenNames} ${member.familyName} removed`));
  }

  async showMessage(message) {
    const toast = await this.toast.create({
      message: message,
      duration: 7000,
      showCloseButton: true,
      position: 'top',
      color: 'success'
    });
    await toast.present();
  }

  async confirmDelete(e, member) {
    e.stopPropagation();
    const alert = await this.alert.create({
      header: 'Confirm!',
      message: `Are you sure you want to remove <strong>${member.givenNames} ${member.familyName}</strong>?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Remove',
          cssClass: 'danger',
          handler: () => {
            this.deleteMember(member);
          }
        }
      ]
    });

    await alert.present();
  }

  onUploadMembers(fileInput) {
    const reader: FileReader = new FileReader();

    this.fileReaded = fileInput.target.files[0];
    reader.readAsText(this.fileReaded);
    reader.onload = this.membersLoad.bind(this, reader);
    reader.onerror = this.uploadError.bind(this);
  }

  membersLoad(reader) {
    const csv = reader.result.replace(/['"]+/g, '');
    const allTextLines = csv.split(/\r|\n|\r/).filter(Boolean);
    const header = allTextLines.shift().split(',');
    const members = allTextLines.map(row => {
      const record = row.split(',');
      return {
        givenNames: record[1].trim(),
        familyName: record[0],
        mrn: record[2],
        birthDate: new Date(record[3]),
        email: record[4],
        phone: record[5],
        gender: record[6],
        unitNumber: 477400,
        updatedAt: new Date()
      };
      // this.memberService.updateMember(newRecord);
    });
    // const toDelete = differenceBy(members, this.dudes, 'mrn');
    // const toAdd = differenceBy(this.dudes, members, 'mrn');
  }

  uploadError(error) {
    console.log(error);
  }

}
