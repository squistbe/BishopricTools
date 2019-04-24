import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertController, ToastController, Platform } from '@ionic/angular';
import { MemberService } from '../../services/member.service';
import { Router } from '@angular/router';
import { switchMap, shareReplay, take } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
// import differenceBy from 'lodash/differenceBy';

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
  user;

  constructor(
      private memberService: MemberService,
      private router: Router,
      private alert: AlertController,
      private toast: ToastController,
      public platform: Platform,
      public storage: Storage
  ) { }

  async ngOnInit() {
    this.user = await this.storage.get('user');
    this.members = this.memberService.cursor.pipe(
      switchMap(cursor => this.memberService.search(cursor, this.user.unitNumber)),
      shareReplay(1)
    );
  }

  ngAfterViewInit() {
    this.memberService.offset.next('');
  }

  trackById(idx, member) {
    return member.id;
  }

  onKeyup(e) {
    this.searchText = e.target.value.toLowerCase();
    this.memberService.cursor.next(0);
    this.memberService.offset.next(this.searchText);
  }

  getSearchText() {
    if (this.searchText) {
      return this.memberService.offset.getValue();
    }
    return '';
  }

  getOffset() {
    return this.memberService.offset.getValue();
  }

  async loadMoreMembers(e, startAfter) {
    await this.memberService.cursor.next(startAfter);
    await e.target.complete();
  }

  async showMultipleUpload() {
    this.upload.nativeElement.click();
  }

  async addMember() {
    this.router.navigate(['members', 'create']);
  }

  createIndex(name, unitNumber) {
    let trim = name;
    if (name.charAt(0) === ' ') {
      trim = name.substr(1);
    }

    const arr = trim.toLowerCase().split('');
    const searchableIndex = {};
    const unitIndex = {};
    let prevKey = '';

    for (const char of arr) {
        const key = prevKey + char;
        searchableIndex[key] = true;
        prevKey = key;
    }
    unitIndex[unitNumber] = searchableIndex;

    return unitIndex;
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

  }

  callMember(e) {

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
      const preferredNameIndex = header.indexOf('Preferred Name');
      return {
        givenNames: record[preferredNameIndex + 1].trim(),
        familyName: record[preferredNameIndex],
        mrn: record[header.indexOf('Record Number')],
        birthDate: new Date(record[header.indexOf('Birth Date')]),
        email: record[header.indexOf('Individual E-mail')],
        phone: record[header.indexOf('Individual Phone Number')],
        gender: record[header.indexOf('Sex')],
        unitNumber: this.user.unitNumber,
        updatedAt: new Date()
      };
    });

    // const toAdd = differenceBy(members, this.dudes, 'mrn');
    // const toDelete = differenceBy(this.dudes, members, 'mrn');

    // toAdd.forEach(member => {
    //   setTimeout(() => {
    //     this.memberService.updateMember(member);
    //   }, 500);
    // });
    // toDelete.forEach(member => {
    //   setTimeout(() => {
    //     this.memberService.deleteMember(member.id);
    //   }, 500);
    // });
  }

  uploadError(error) {
    console.log(error);
  }

}
