import { CallingStatus } from './calling-status';

export interface User {
    uid: string;
    email?: string;
    photoURL?: string;
    displayName?: string;
    roles?: Roles;
    unitNumber?: number;
    calling?: UserCalling;
    isAnonymous?: boolean;
    preferences?: UserPreferences;
}

export interface Roles {
    admin?: boolean;
    guest?: boolean;
}

export enum UserCalling {
    bishop          = <any>'bishopric_bishop',
    first           = <any>'bishopric_first',
    second          = <any>'bishopric_second',
    clerk           = <any>'bishopric_clerk',
    exec            = <any>'bishopric_exec',
    finance         = <any>'finance_clerk',
    assist_exec     = <any>'assistant_exec',
    assist_clerk    = <any>'assistant_clerk',
    music           = <any>'music',
    unassigned      = <any>'unassigned'
}

export interface UserPreferences {
    status?: CallingStatus;
}

export class UserCallingStatus {
    static callingStatusMap(calling: UserCalling) {
        switch (calling) {

        }
    }

    static asString(calling: UserCalling) {
        switch (calling) {
            case UserCalling.bishop:        return 'Bishop';
            case UserCalling.first:         return 'First Counselor';
            case UserCalling.second:        return 'Second Counselor';
            case UserCalling.clerk:         return 'Clerk';
            case UserCalling.exec:          return 'Executive Secretary';
            case UserCalling.finance:       return 'Financial Clerk';
            case UserCalling.assist_exec:   return 'Executive Secretary Assistant';
            case UserCalling.assist_clerk:  return 'Ward Clerk Assistant';
            case UserCalling.music:         return 'Music';
            default:                        return 'Unassigned';
        }
    }

    static exposedValues(): UserCalling[] {
        return [
            UserCalling.bishop,
            UserCalling.first,
            UserCalling.second,
            UserCalling.clerk,
            UserCalling.exec,
            UserCalling.finance,
            UserCalling.assist_exec,
            UserCalling.assist_clerk,
            UserCalling.music,
            UserCalling.unassigned
        ];
    }
}
