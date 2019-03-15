import { Member } from './member';

export interface InterviewType {
    date: Date;
    details: string;
    interviewerId: string;
    member: Member;
    status: InterviewStatus;
    unitNumber: number;
    duration: InterviewDuration;
}

export enum InterviewStatus {
    arrived     = <any>'arrived',
    missed      = <any>'missed',
    pending     = <any>'pending',
    confirmed   = <any>'confirmed',
    blocked     = <any>'blocked',
    contacted   = <any>'contacted'
}

export enum InterviewDuration {
    min0    = <any>'0',
    min15   = <any>'15',
    min30   = <any>'30',
    min45   = <any>'45',
    min60   = <any>'60',
    min75   = <any>'75',
    min90   = <any>'90',
    min105  = <any>'105',
    min120  = <any>'120',
    allDay  = <any>'allDay'
}

export interface InterviewFilter {
    status: InterviewStatus;
    date: Date;
    member: Member;
}

export class Interview {
    static asString(type): string {
        switch (type) {
            case InterviewStatus.arrived:   return 'Arrived';
            case InterviewStatus.missed:    return 'Missed';
            case InterviewStatus.pending:   return 'Pending';
            case InterviewStatus.confirmed: return 'Confirmed';
            case InterviewStatus.blocked:   return 'Unavailable';
            case InterviewStatus.contacted: return 'Contacted';
        }
    }

    static exposedValues(): InterviewStatus[] {
        return [
            InterviewStatus.arrived,
            InterviewStatus.missed,
            InterviewStatus.pending,
            InterviewStatus.confirmed,
            InterviewStatus.blocked,
            InterviewStatus.contacted
        ];
    }

    static getColorStatus(status): string {
        switch (status) {
            case InterviewStatus.arrived:   return 'success';
            case InterviewStatus.missed:    return 'danger';
            case InterviewStatus.pending:   return 'warning';
            case InterviewStatus.confirmed: return '';
            case InterviewStatus.blocked:   return 'medium';
            case InterviewStatus.contacted: return 'secondary';
        }
    }

    static durationAsString(duration): string {
        switch (duration) {
            case InterviewDuration.min0:   return '0 minutes';
            case InterviewDuration.min15:   return '15 minutes';
            case InterviewDuration.min30:   return '30 minutes';
            case InterviewDuration.min45:   return '45 minutes';
            case InterviewDuration.min60:   return '1 hour';
            case InterviewDuration.min75:   return '1.25 hours';
            case InterviewDuration.min90:   return '1.5 hours';
            case InterviewDuration.min105:  return '1.75 hours';
            case InterviewDuration.min120:  return '2 hours';
            case InterviewDuration.allDay:  return 'All day';
        }
    }

    static exposedDurationValues(): InterviewDuration[] {
        return [
            InterviewDuration.min0,
            InterviewDuration.min15,
            InterviewDuration.min30,
            InterviewDuration.min45,
            InterviewDuration.min60,
            InterviewDuration.min75,
            InterviewDuration.min90,
            InterviewDuration.min105,
            InterviewDuration.min120,
            InterviewDuration.allDay
        ];
    }

    static filtered(val): string {
        switch (val) {
            case 'future': return 'Future';
            case 'last30Days': return 'Last 30 Days';
            case 'last7Days': return 'Last 7 Days';
        }
    }
}
