import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

exports.createMemberIndex = functions.firestore
.document('members/{memberId}')
.onWrite((snap, context) => {
    const memberId = context.params.memberId;
    const after = snap.after.data();
    const before = snap.before.data();
    if (after.familyName !== before.familyName || after.givenNames !== before.givenNames) {
        const familyNameIndex = createIndex(after.familyName, after.unitNumber);
        const givenNamesIndex = createIndex(after.givenNames, after.unitNumber);
        const indexedMember = {...after, familyNameIndex, givenNamesIndex};
        const db = admin.firestore();
        return db.collection('members').doc(memberId).set(indexedMember, {merge: true});
    }
    return Promise.reject(`${memberId} no indexing needed.`)
});

function createIndex(name, unitNumber) {
    let trim = name;
    if (name.charAt(0) === ' ') trim = name.substr(1);

    const arr = trim.toLowerCase().split('');
    const searchableIndex = {}
    const unitIndex = {};
    let prevKey = '';

    for (const char of arr) {
        const key = prevKey + char;
        searchableIndex[key] = true
        prevKey = key
    }
    unitIndex[unitNumber] = searchableIndex;

    return unitIndex;
}

exports.updateMemberEvent = functions.firestore
.document('sacrament/{sacramentId}')
.onUpdate((snap, context) => {
    const after = snap.after.data();
    const before = snap.before.data();
    if (after.speakers) {
        after.speakers.forEach((speaker, i) => {
            if (!Object.is(speaker, before.speakers[i])) {
                updateMemberDates(speaker, 'lastSpoke', after.date).catch(error => console.log(error));
            }
        });
    }
    if (!Object.is(before.invocation, after.invocation)) {
        if (!after.invocation) {
            updateMemberDates(before.invocation, 'lastPrayed', null).catch(error => console.log(error));
        } else {
            updateMemberDates(after.invocation, 'lastPrayed', after.date).catch(error => console.log(error));
        }
    }
    if (!Object.is(before.benediction, after.benediction)) {
        if (!after.benediction) {
            updateMemberDates(before.benediction, 'lastPrayed', null).catch(error => console.log(error));
        } else {
            updateMemberDates(after.benediction, 'lastPrayed', after.date).catch(error => console.log(error));
        }
    }
});

function updateMemberDates(member, memberField, date) {
    const db = admin.firestore();
    const data = {};
    data[memberField] = admin.firestore.Timestamp.fromDate(new Date(`${date} MST`));
    return db.collection('members').doc(member.id).set(data, {merge: true}).catch(error => console.log(error));
}

exports.updateInterview = functions.firestore
.document('interviews/{interviewerId}')
.onUpdate((snap, context) => {
    const after = snap.after.data();
    const before = snap.before.data();
    if (after.date.valueOf !== before.date.valueOf()) {
        addTimeStamp(after, context.params.interviewerId).catch(error => console.log(error));
    }
    if(!Object.is(after, before)) {
        if (after.status === 'arrived' && after.member && after.member.id) {
            updateMemberInterview(after).catch(error => console.log(error));
        }
    }
});

exports.createInterview = functions.firestore
.document('interviews/{interviewerId}')
.onCreate((snap, context) => {
    const data = snap.data();
    addTimeStamp(data, context.params.interviewerId).catch(error => console.log(error));
    if (data.status === 'arrived' && data.member && data.member.id) {
        updateMemberInterview(data).catch(error => console.log(error));
    }
    
});

exports.writeAttendance = functions.firestore
.document('attendance/{attendanceId}')
.onCreate((snap, context) => {
    const id = context.params.attendanceId;
    const db = admin.firestore();
    const data = snap.data();
    return db.collection('members')
        .where('unitNumber', '==', data.unitNumber)
        .get()
        .then(querySnapshot => {
            return db.collection('attendance').doc(id).set({members: querySnapshot.size}, {merge: true}).catch(error => console.error(error));
        }).catch(error => console.error(error));
});

function updateMemberInterview(data) {
    const db = admin.firestore();
    return db.collection('members').doc(data.member.id).set({lastInterviewed: data.date}, {merge: true}).catch(error => console.error(error));
}

function addTimeStamp(data, id) {
    const db = admin.firestore();
    return db.collection('interviews').doc(id).set({dateTimestamp: new Date(data.date).valueOf()}, {merge: true}).catch(error => console.error(error));
}

exports.updateCallingSortIndex = functions.firestore
.document('callings/{callingId}')
.onDelete(snap => {
    const db = admin.firestore();
    return db.collection('callings')
        .where('orgId', '==', snap.data().orgId)
        .orderBy('sortIndex', 'asc')
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach((calling, i) => {
                calling.ref.set({sortIndex: i}, {merge: true}).catch(error => console.error(error));
            });
        })
        .catch(error => console.log(error));
});

exports.updateCallingInfo = functions.firestore
.document('callings/{callingId}')
.onUpdate((snap, context) => {
    const after = snap.after.data();
    const before = snap.before.data();
    const db = admin.firestore();
    const callingId = context.params.callingId;
    let data;
    if (before.member && !after.member) {
        data = {
            notes: '',
            status: {}
        };
    }
    // if (!before.member && after.member) {
    //     data = {
    //         notes: '',
    //         status: {
    //             name: 'waiting',
    //             updatedAt: new Date()
    //         }
    //     };
    // }
    return db.collection('callings').doc(callingId).set(data, {merge: true}).catch(error => console.error(error));
});
