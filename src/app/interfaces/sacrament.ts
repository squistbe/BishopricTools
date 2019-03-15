import { Member } from './member';

export interface Hymn {
    name: string;
    number: string;
}

export interface MeetingOptions {
    isTestimonyMeeting?: boolean;
    isGeneralConference?: boolean;
    isStakeConference?: boolean;
    isTempleDedication?: boolean;
}

export interface Sacrament {
    date: string;
    dateTag: string;
    id?: string;
    topic?: string;
    invocation?: Member;
    benediction?: Member;
    openingHymn?: Hymn;
    sacramentalHymn?: Hymn;
    closingHymn?: Hymn;
    speakers?: Member[];
    unitNumber: number;
    meetingOptions: MeetingOptions;
    conducting?: Member;
    music?: string;
    organist?: Member;
    chorister?: Member;
}

export class SacramentSettings {
  public static SACRAMENT_MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
}
