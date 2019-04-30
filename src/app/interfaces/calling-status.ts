export enum CallingStatusType {
    done        = <any>'done', // sustained and set apart
    setApart    = <any>'setApart', // sustained, need to be set apart
    sustain     = <any>'sustain', // needs to be sustained
    accepted    = <any>'accepted', // calling accepted
    go          = <any>'go', // ready to extend the calling, schedule interview
    recommended = <any>'recommended', // name presented by or president
    pending     = <any>'pending', // being considered for calling
    waiting     = <any>'waiting', // a reservation or consideration
    release     = <any>'release', // need to be released
    pendRelease = <any>'pendRelease', // being considered for release
    goRelease   = <any>'goRelease', // call to release from calling
    vacant      = <any>'vacant' // empty calling
}

export interface CallingStatusMap {
    name: CallingStatusType;
    updatedAt: Date;
}

export class CallingStatus {
    static asString(type): string {
        switch (type) {
            case CallingStatusType.done:        return 'Done';
            case CallingStatusType.setApart:    return 'Set Apart';
            case CallingStatusType.sustain:     return 'Sustain';
            case CallingStatusType.accepted:    return 'Accepted';
            case CallingStatusType.go:          return 'Go/Schedule';
            case CallingStatusType.pending:     return 'Pending';
            case CallingStatusType.waiting:     return 'Waiting';
            case CallingStatusType.recommended: return 'Recommended';
            case CallingStatusType.release:     return 'Released';
            case CallingStatusType.goRelease:   return 'Go Release';
            case CallingStatusType.pendRelease: return 'Pending Release';
            case CallingStatusType.vacant:      return 'Vacant';
        }
    }

    static getDefinition(type): string {
        switch (type) {
            case CallingStatusType.done:
                return 'Individual has been sustained and set apart by a member of the Bishopric.';
            case CallingStatusType.setApart:
                return 'Individual has been sustained and needs to set apart by a member of the Bishopric.';
            case CallingStatusType.sustain:
                return 'Individual needs to be sustained by a member of the Bishopric in Auxilary, Quorum or Sacrament Meeting.';
            case CallingStatusType.accepted:
                return 'Individual has been interviewed by a member of the Bishopric and has accepted the calling.';
            case CallingStatusType.go:
                return `The Bisopric has approved the individual for the calling and is ready to extend the calling.
                    An interview is typically scheduled by the Executive Secretary.`;
            case CallingStatusType.pending:
                return 'The individual is being considered for a calling by the Bishopric.';
            case CallingStatusType.waiting:
                return 'A reservation or consideration for the calling.';
            case CallingStatusType.recommended:
                return 'The individual was recommended by a member of the Auxilary or Quorum Presidency.';
            case CallingStatusType.release:
                return `Individual has been released from calling by a member of the Bishopric in an Auxilary,
                    Quorum or Sacrament Meeting.`;
            case CallingStatusType.goRelease:
                return 'Individual moved or needs to be announced as "Released" in organization or Sacrament meeting';
            case CallingStatusType.pendRelease:
                return 'Individual is being considered for release.';
            case CallingStatusType.vacant:
                return 'Empty calling.';
        }
    }

    static exposedValues(): CallingStatusType[] {
        return [
            CallingStatusType.done,
            CallingStatusType.setApart,
            CallingStatusType.sustain,
            CallingStatusType.accepted,
            CallingStatusType.release,
            CallingStatusType.waiting,
            CallingStatusType.goRelease,
            CallingStatusType.go,
            CallingStatusType.recommended,
            CallingStatusType.pendRelease,
            CallingStatusType.pending,
            CallingStatusType.vacant
        ];
    }

    static isInstanceOf(type): boolean {
        return Object.values(CallingStatusType).includes(type);
    }
}
