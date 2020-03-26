import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor(private afs: AngularFirestore) {}

  collection$(path, query?) {
    return this.afs
        .collection(path, query)
        .snapshotChanges()
        .pipe(
            map(actions => {
              return actions.map(a => {
                const data: Object = a.payload.doc.data();
                const id = a.payload.doc.id;
                Object.keys(data).forEach(item => {
                  if (data[item] && data[item].toDate) {
                    data[item] = moment(data[item].toDate()).format();
                  }
                });
                return { id, ...data };
              });
            })
        );
  }

  doc$(path): Observable<any> {
    return this.afs
        .doc(path)
        .snapshotChanges()
        .pipe(
            map(doc => {
              const data: Object = doc.payload.data();
              if (data) {
                Object.keys(data).forEach(item => {
                  if (data[item] && data[item].toDate) {
                    data[item] = moment(data[item].toDate()).format();
                  }
                });
                return { id: doc.payload.id, ...data };
              }
            })
        );
  }

  /**
   * @param  {string} path 'collection' or 'collection/docID'
   * @param  {object} data new data
   *
   * Creates or updates data on a collection or document.
   **/
  updateAt(path: string, data: Object): Promise<any> {
    const copy = {...data};
    Object.keys(copy).forEach(item => {
      if (moment(data[item], moment.ISO_8601, true).isValid() && !(data[item] instanceof Date)) {
        copy[item] = new Date(data[item].replace('Z', ''));
      }
      if (item.startsWith('$$')) {
        delete copy[item];
      }
    });
    const segments = path.split('/').filter(v => v);
    if (segments.length % 2) {
      // Odd is always a collection
      return this.afs.collection(path).add(copy);
    } else {
      // Even is always document
      return this.afs.doc(path).set(copy, { merge: true });
    }
  }

  /**
   * @param  {string} collection 'collection'
   * @param  {object} list new data
   *
   * Creates multiple documents at once on a collection.
   **/
  createMultiple(collection: string, list: Array<any>): Promise<any> {
    const batch = this.afs.firestore.batch();
    list.forEach(data => {
      batch.set(this.afs.firestore.collection(collection).doc(), data);
    });
    return batch.commit();
  }

  /**
   * @param  {string} collection 'collection'
   * @param  {object} docs list of ids to delete
   *
   * Deletes multiple documents at once on a collection.
   **/
  deleteMultiple(collection: string, docs: Array<string>) {
    const batch = this.afs.firestore.batch();
    docs.forEach(id => {
      batch.delete(this.afs.firestore.collection(collection).doc(id));
    });
    return batch.commit();
  }

  /**
   * @param  {string} path path to document
   *
   * Deletes document from Firestore
   **/
  delete(path) {
    return this.afs.doc(path).delete();
  }
}
