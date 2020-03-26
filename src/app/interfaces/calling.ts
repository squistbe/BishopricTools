import { Member, Gender } from './member';
import { CallingStatusMap } from './calling-status';
import { OrgTag } from './organization';

export interface Calling {
    id?: string;
    name: string;
    sortIndex: number;
    orgId: string;
    unitNumber: number;
    className?: string;
    hasClass?: boolean;
    status: CallingStatusMap;
    member?: Member | Member[];
    orgTag: OrgTag;
}

export const CALLINGS = [
    {
        name: 'Bishop',
        sortIndex: 0,
        orgTag: OrgTag.bishopric,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Bishopric First Counselor',
        sortIndex: 1,
        orgTag: OrgTag.bishopric,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Bishopric Second Counselor',
        sortIndex: 2,
        orgTag: OrgTag.bishopric,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Ward Executive Secretary',
        sortIndex: 3,
        orgTag: OrgTag.bishopric,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Ward Clerk',
        sortIndex: 4,
        orgTag: OrgTag.bishopric,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Ward Assistant Clerk--Finance',
        sortIndex: 5,
        orgTag: OrgTag.bishopric,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Ward Assistant Clerk--Membership',
        sortIndex: 6,
        orgTag: OrgTag.bishopric,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Ward Assistant Clerk',
        sortIndex: 7,
        orgTag: OrgTag.bishopric,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Elders Quorum President',
        sortIndex: 0,
        orgTag: OrgTag.elders,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Elders Quorum First Counselor',
        sortIndex: 1,
        orgTag: OrgTag.elders,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Elders Quorum Second Counselor',
        sortIndex: 2,
        orgTag: OrgTag.elders,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Elders Quorum Secretary',
        sortIndex: 3,
        orgTag: OrgTag.elders,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Elders Quorum Assistant Secretary',
        sortIndex: 4,
        orgTag: OrgTag.elders,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Elders Quorum Instructor',
        sortIndex: 6,
        orgTag: OrgTag.elders,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Ward Mission Leader',
        sortIndex: 7,
        orgTag: OrgTag.elders,
        ageReq: 18
    },
    {
        name: 'Ward Missionary',
        sortIndex: 8,
        orgTag: OrgTag.elders,
        ageReq: 18
    },
    {
        name: 'Relief Society President',
        sortIndex: 0,
        orgTag: OrgTag.rs
    },
    {
        name: 'Relief Society First Counselor',
        sortIndex: 1,
        orgTag: OrgTag.rs,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Relief Society Second Counselor',
        sortIndex: 2,
        orgTag: OrgTag.rs,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Relief Society Secretary',
        sortIndex: 3,
        orgTag: OrgTag.rs,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Relief Society Assistant Secretary',
        sortIndex: 4,
        orgTag: OrgTag.rs,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Relief Society Meeting Coordinator',
        sortIndex: 5,
        orgTag: OrgTag.rs,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Relief Society Compassionate Service Coordinator',
        sortIndex: 6,
        orgTag: OrgTag.rs,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Relief Society Compassionate Service Assistant Coordinator',
        sortIndex: 7,
        orgTag: OrgTag.rs,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Relief Society Music Leader',
        sortIndex: 8,
        orgTag: OrgTag.rs,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Relief Society Pianist',
        sortIndex: 9,
        orgTag: OrgTag.rs,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Relief Society Teacher',
        sortIndex: 10,
        orgTag: OrgTag.rs,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Relief Society Meeting Coordinator',
        sortIndex: 11,
        orgTag: OrgTag.rs,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Relief Society Meeting Committee Member',
        sortIndex: 12,
        orgTag: OrgTag.rs,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Sunday School President',
        sortIndex: 0,
        orgTag: OrgTag.ss,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Sunday School First Counselor',
        sortIndex: 1,
        orgTag: OrgTag.ss,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Sunday School Second Counselor',
        sortIndex: 2,
        orgTag: OrgTag.ss,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Sunday School Secretary',
        sortIndex: 3,
        orgTag: OrgTag.ss,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Teacher',
        sortIndex: 4,
        hasClass: true,
        className: 'Gospel Principles',
        orgTag: OrgTag.ss,
        ageReq: 18
    },
    {
        name: 'Teacher',
        sortIndex: 5,
        hasClass: true,
        className: 'Course 17',
        orgTag: OrgTag.ss,
        ageReq: 18
    },
    {
        name: 'Teacher',
        sortIndex: 6,
        hasClass: true,
        className: 'Course 16',
        orgTag: OrgTag.ss,
        ageReq: 18
    },
    {
        name: 'Teacher',
        sortIndex: 7,
        hasClass: true,
        className: 'Course 15',
        orgTag: OrgTag.ss,
        ageReq: 18
    },
    {
        name: 'Teacher',
        sortIndex: 8,
        hasClass: true,
        className: 'Course 14',
        orgTag: OrgTag.ss,
        ageReq: 18
    },
    {
        name: 'Teacher',
        sortIndex: 9,
        hasClass: true,
        className: 'Course 13',
        orgTag: OrgTag.ss,
        ageReq: 18
    },
    {
        name: 'Teacher',
        sortIndex: 10,
        hasClass: true,
        className: 'Course 12',
        orgTag: OrgTag.ss,
        ageReq: 18
    },
    {
        name: 'Teacher',
        sortIndex: 11,
        hasClass: true,
        className: 'Course 11',
        orgTag: OrgTag.ss,
        ageReq: 18
    },
    {
        name: 'Librarian',
        sortIndex: 12,
        orgTag: OrgTag.ss,
        ageReq: 18
    },
    {
        name: 'Assistant Librarian',
        sortIndex: 13,
        orgTag: OrgTag.ss,
        ageReq: 18
    },
    {
        name: 'Aaronic Priesthood President',
        sortIndex: 0,
        orgTag: OrgTag.ym,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Aaronic Priesthood First Counselor',
        sortIndex: 1,
        orgTag: OrgTag.ym,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Aaronic Priesthood Second Counselor',
        sortIndex: 2,
        orgTag: OrgTag.ym,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Priests Quorum President',
        sortIndex: 3,
        orgTag: OrgTag.ym,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Priests Quorum First Assistant',
        sortIndex: 4,
        orgTag: OrgTag.ym,
        genderReq: Gender.male
    },
    {
        name: 'Priests Quorum Second Assistant',
        sortIndex: 5,
        orgTag: OrgTag.ym,
        genderReq: Gender.male
    },
    {
        name: 'Priests Quorum Secretary',
        sortIndex: 6,
        orgTag: OrgTag.ym,
        genderReq: Gender.male
    },
    {
        name: 'Priests Quorum Adviser',
        sortIndex: 7,
        orgTag: OrgTag.ym,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Priests Quorum Assistant Adviser',
        sortIndex: 8,
        orgTag: OrgTag.ym,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Teachers Quorum President',
        sortIndex: 9,
        orgTag: OrgTag.ym,
        genderReq: Gender.male
    },
    {
        name: 'Teachers Quorum First Counselor',
        sortIndex: 10,
        orgTag: OrgTag.ym,
        genderReq: Gender.male
    },
    {
        name: 'Teachers Quorum Second Counselor',
        sortIndex: 11,
        orgTag: OrgTag.ym,
        genderReq: Gender.male
    },
    {
        name: 'Teachers Quorum Secretary',
        sortIndex: 12,
        orgTag: OrgTag.ym,
        genderReq: Gender.male
    },
    {
        name: 'Teachers Quorum Adviser',
        sortIndex: 13,
        orgTag: OrgTag.ym,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Teachers Quorum Assistant Adviser',
        sortIndex: 14,
        orgTag: OrgTag.ym,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Deacons Quorum President',
        sortIndex: 15,
        orgTag: OrgTag.ym,
        genderReq: Gender.male
    },
    {
        name: 'Deacons Quorum First Counselor',
        sortIndex: 16,
        orgTag: OrgTag.ym,
        genderReq: Gender.male
    },
    {
        name: 'Deacons Quorum Second Counselor',
        sortIndex: 17,
        orgTag: OrgTag.ym,
        genderReq: Gender.male
    },
    {
        name: 'Deacons Quorum Secretary',
        sortIndex: 18,
        orgTag: OrgTag.ym,
        genderReq: Gender.male
    },
    {
        name: 'Deacons Quorum Adviser',
        sortIndex: 19,
        orgTag: OrgTag.ym,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Deacons Quorum Assistant Adviser',
        sortIndex: 20,
        orgTag: OrgTag.ym,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Young Men Sports Coach',
        sortIndex: 21,
        orgTag: OrgTag.ym,
        ageReq: 18,
        genderReq: Gender.male
    },
    {
        name: 'Young Women President',
        sortIndex: 0,
        orgTag: OrgTag.yw,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Young Women First Counselor',
        sortIndex: 1,
        orgTag: OrgTag.yw,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Young Women Second Counselor',
        sortIndex: 2,
        orgTag: OrgTag.yw,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Young Women Secretary',
        sortIndex: 3,
        orgTag: OrgTag.yw,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Laurel Adviser',
        sortIndex: 4,
        orgTag: OrgTag.yw,
        genderReq: Gender.female
    },
    {
        name: 'Laurel Assistant Adviser',
        sortIndex: 5,
        orgTag: OrgTag.yw,
        genderReq: Gender.female
    },
    {
        name: 'Mia Maid Adviser',
        sortIndex: 6,
        orgTag: OrgTag.yw,
        genderReq: Gender.female
    },
    {
        name: 'Mia Maid Assistant Adviser',
        sortIndex: 7,
        orgTag: OrgTag.yw,
        genderReq: Gender.female
    },
    {
        name: 'Laurel President',
        sortIndex: 8,
        orgTag: OrgTag.yw,
        genderReq: Gender.female
    },
    {
        name: 'Laurel First Counselor',
        sortIndex: 9,
        orgTag: OrgTag.yw,
        genderReq: Gender.female
    },
    {
        name: 'Laurel Second Counselor',
        sortIndex: 10,
        orgTag: OrgTag.yw,
        genderReq: Gender.female
    },
    {
        name: 'Laurel Secretary',
        sortIndex: 11,
        orgTag: OrgTag.yw,
        genderReq: Gender.female
    },
    {
        name: 'Mia Maid President',
        sortIndex: 12,
        orgTag: OrgTag.yw,
        genderReq: Gender.female
    },
    {
        name: 'Mia Maid First Counselor',
        sortIndex: 13,
        orgTag: OrgTag.yw,
        genderReq: Gender.female
    },
    {
        name: 'Mia Maid Second Counselor',
        sortIndex: 14,
        orgTag: OrgTag.yw,
        genderReq: Gender.female
    },
    {
        name: 'Mia Maid Secretary',
        sortIndex: 15,
        orgTag: OrgTag.yw,
        genderReq: Gender.female
    },
    {
        name: 'Beehive President',
        sortIndex: 16,
        orgTag: OrgTag.yw,
        genderReq: Gender.female
    },
    {
        name: 'Beehive First Counselor',
        sortIndex: 17,
        orgTag: OrgTag.yw,
        genderReq: Gender.female
    },
    {
        name: 'Beehive Second Counselor',
        sortIndex: 18,
        orgTag: OrgTag.yw,
        genderReq: Gender.female
    },
    {
        name: 'Beehive Secretary',
        sortIndex: 19,
        orgTag: OrgTag.yw,
        genderReq: Gender.female
    },
    {
        name: 'Young Women Music Leader',
        sortIndex: 20,
        orgTag: OrgTag.yw,
        genderReq: Gender.female
    },
    {
        name: 'Young Women Pianist',
        sortIndex: 21,
        orgTag: OrgTag.yw,
        genderReq: Gender.female
    },
    {
        name: 'Young Women Activity Specialist',
        sortIndex: 22,
        orgTag: OrgTag.yw,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Young Women Camp Dircector',
        sortIndex: 23,
        orgTag: OrgTag.yw,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Young Women Assistant Camp Dircector',
        sortIndex: 24,
        orgTag: OrgTag.yw,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Young Women Youth Stake Committee',
        sortIndex: 25,
        orgTag: OrgTag.yw,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Young Women Sports Specialist',
        sortIndex: 26,
        orgTag: OrgTag.yw,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Young Women Assistant Sports Specialist',
        sortIndex: 27,
        orgTag: OrgTag.yw,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Primary President',
        sortIndex: 0,
        orgTag: OrgTag.primary,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Primary First Counselor',
        sortIndex: 1,
        orgTag: OrgTag.primary,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Primary Second Counselor',
        sortIndex: 2,
        orgTag: OrgTag.primary,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Primary Secretary',
        sortIndex: 3,
        orgTag: OrgTag.primary,
        ageReq: 18,
        genderReq: Gender.female
    },
    {
        name: 'Primary Pianist',
        sortIndex: 4,
        orgTag: OrgTag.primary,
        ageReq: 18
    },
    {
        name: 'Primary Music Leader',
        sortIndex: 5,
        orgTag: OrgTag.primary,
        ageReq: 18
    },
    {
        name: 'Primary Teacher',
        hasClass: true,
        sortIndex: 6,
        className: 'Valiant 11',
        orgTag: OrgTag.primary,
        ageReq: 18
    },
    {
        name: 'Primary Teacher',
        hasClass: true,
        sortIndex: 7,
        className: 'Valiant 10',
        orgTag: OrgTag.primary,
        ageReq: 18
    },
    {
        name: 'Primary Teacher',
        hasClass: true,
        sortIndex: 8,
        className: 'Valiant 9',
        orgTag: OrgTag.primary,
        ageReq: 18
    },
    {
        name: 'Primary Teacher',
        hasClass: true,
        sortIndex: 9,
        className: 'Valiant 8',
        orgTag: OrgTag.primary,
        ageReq: 18
    },
    {
        name: 'Primary Teacher',
        hasClass: true,
        sortIndex: 10,
        className: 'CTR 7',
        orgTag: OrgTag.primary,
        ageReq: 18
    },
    {
        name: 'Primary Teacher',
        hasClass: true,
        sortIndex: 11,
        className: 'CTR 6',
        orgTag: OrgTag.primary,
        ageReq: 18
    },
    {
        name: 'Primary Teacher',
        hasClass: true,
        sortIndex: 12,
        className: 'CTR 5',
        orgTag: OrgTag.primary,
        ageReq: 18
    },
    {
        name: 'Primary Teacher',
        hasClass: true,
        sortIndex: 13,
        className: 'CTR 4',
        orgTag: OrgTag.primary,
        ageReq: 18
    },
    {
        name: 'Primary Teacher',
        hasClass: true,
        sortIndex: 14,
        className: 'Sunbeam',
        orgTag: OrgTag.primary,
        ageReq: 18
    },
    {
        name: 'Nursery Leader',
        hasClass: true,
        sortIndex: 15,
        className: 'Nursery',
        orgTag: OrgTag.primary,
        ageReq: 18
    },
    {
        name: 'Primary Activity Days Coordinator',
        sortIndex: 16,
        orgTag: OrgTag.primary,
    },
    {
        name: 'Primary Activity Days Leader',
        hasClass: true,
        sortIndex: 17,
        className: '8/9',
        orgTag: OrgTag.primary,
        ageReq: 18
    },
    {
        name: 'Primary Activity Days Leader',
        hasClass: true,
        sortIndex: 18,
        className: '10/11',
        orgTag: OrgTag.primary,
    },
    {
        name: 'Website Administrator',
        sortIndex: 0,
        orgTag: OrgTag.other,
        ageReq: 18
    },
    {
        name: 'Librarian',
        sortIndex: 1,
        orgTag: OrgTag.other,
        ageReq: 18
    },
    {
        name: 'Newsletter Assistant',
        sortIndex: 2,
        orgTag: OrgTag.other,
        ageReq: 18
    },
    {
        name: 'Newsletter',
        sortIndex: 3,
        orgTag: OrgTag.other,
        ageReq: 18
    },
    {
        name: 'History Specialist',
        sortIndex: 4,
        orgTag: OrgTag.other,
        ageReq: 18
    },
    {
        name: 'Building Representative',
        sortIndex: 5,
        orgTag: OrgTag.other,
        ageReq: 18
    },
    {
        name: 'Sacrament Program Coordinator',
        sortIndex: 6,
        orgTag: OrgTag.other,
        ageReq: 18
    },
    {
        name: 'Music Director',
        sortIndex: 7,
        orgTag: OrgTag.other,
        ageReq: 18
    },
    {
        name: 'Choir Director',
        sortIndex: 8,
        orgTag: OrgTag.other,
        ageReq: 18
    },
    {
        name: 'Assistant organist or pianist',
        sortIndex: 9,
        orgTag: OrgTag.other,
        ageReq: 18
    },
    {
        name: 'Choir Accompanist',
        sortIndex: 10,
        orgTag: OrgTag.other,
        ageReq: 18
    },
    {
        name: 'Organist or Pianist',
        sortIndex: 11,
        orgTag: OrgTag.other,
        ageReq: 18
    },
    {
        name: 'Music Chairman',
        sortIndex: 12,
        orgTag: OrgTag.other,
        ageReq: 18
    },
    {
        name: 'Ward Temple and Family History Consultant',
        sortIndex: 13,
        orgTag: OrgTag.other,
        ageReq: 18
    },
    {
        name: 'Missionary',
        sortIndex: 0,
        orgTag: OrgTag.ftm,
        ageReq: 18
    }
];
