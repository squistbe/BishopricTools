import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

exports.updateIndex = functions.firestore
.document('members/{memberId}')
.onCreate((snap, context) => {
    const memberId = context.params.memberId;
    const member = snap.data();
    const familyNameIndex = createIndex(member.familyName);
    const givenNamesIndex = createIndex(member.givenNames);
    const indexedMember = {...member, givenNamesIndex, familyNameIndex};
    const db = admin.firestore();
    return db.collection('members').doc(memberId).set(indexedMember, {merge: true});
});

function createIndex(name) {
    let trim = name;
    if (name.charAt(0) === ' ') trim = name.substr(1);

    const arr = trim.toLowerCase().split('');
    const searchableIndex = {}
    let prevKey = '';

    for (const char of arr) {
        const key = prevKey + char;
        searchableIndex[key] = true
        prevKey = key
    }

    return searchableIndex
}

exports.updateMemberEvent = functions.firestore
.document('sacrament/{sacramentId}')
.onUpdate((snap, context) => {
    const after = snap.after.data();
    const before = snap.before.data();
    if (after.speakers) {
        after.speakers.forEach((speaker, i) => {
            if (!Object.is(speaker, before.speakers[i])) {
                updateMemberDates(speaker, 'lastSpoke', after.date);
            }
        });
    }
    if (!Object.is(before.invocation, after.invocation)) {
        if (!after.invocation) {
            updateMemberDates(before.invocation, 'lastPrayed', null);
        } else {
            updateMemberDates(after.invocation, 'lastPrayed', after.date);
        }
    }
    if (!Object.is(before.benediction, after.benediction)) {
        if (!after.benediction) {
            updateMemberDates(before.benediction, 'lastPrayed', null);
        } else {
            updateMemberDates(after.benediction, 'lastPrayed', after.date);
        }
    }
});

function updateMemberDates(member, memberField, date) {
    const db = admin.firestore();
    const data = {};
    data[memberField] = admin.firestore.Timestamp.fromDate(new Date(`${date} MST`));
    db.collection('members').doc(member.id).set(data, {merge: true}).catch(error => console.log(error));
}

exports.updateInterview = functions.firestore
.document('interviews/{interviewerId}')
.onUpdate((snap, context) => {
    const after = snap.after.data();
    const before = snap.before.data();
    if(!Object.is(after, before)) {
        updateMemberInterview(after);
    }
});

exports.createInterview = functions.firestore
.document('interviews/{interviewerId}')
.onCreate((snap) => {
    updateMemberInterview(snap.data());
});

function updateMemberInterview(data) {
    const db = admin.firestore();
    if (data.member) {
        db.collection('members').doc(data.member.id).set({lastInterviewed: data.date}, {merge: true}).catch(error => console.log(error));
    }
}