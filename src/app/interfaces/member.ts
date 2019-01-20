export interface Member {
    id?: string;
    familyName: string;
    givenNames: string; // typically a combination of first and middle name(s)
    mrn?: string;
    birthDate?: Date;
    gender?: Gender;
    phone?: string;
    email?: string;
    unitNumber?: number;
    willPray?: boolean;
    lastPrayed?: Date;
    lastSpoke?: Date;
    createdAt?: Date;
    updateAt?: Date;
    lastInterviewed?: Date;
}

export enum Gender {
    male= <any>'male',
    female= <any>'female'
}

export class MemberClass implements Member {
    familyName;
    givenNames;

    constructor() {}
}
