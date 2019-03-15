export enum CallingStatusType {
    done        = <any>'done', // sustained and set apart
    setApart    = <any>'setApart', // sustained, need to be set apart
    sustain     = <any>'sustain', // needs to be sustained
    accepted    = <any>'accepted', // calling accepted
    release     = <any>'release', // need to be released
    waiting     = <any>'waiting', // a reservation or consideration
    goRelease   = <any>'goRelease', // call to release from calling
    go          = <any>'go', // ready to extend the calling
    recommended = <any>'recommended', // name presented by or president
    pendRelease = <any>'pendRelease', // being considered for release
    pending     = <any>'pending', // being considered for calling
    vacant      = <any>'vacant' // empty calling
}

export interface CallingStatusMap {
    name: CallingStatusType;
    updateAt: Date;
}

export class CallingStatus {
    static asString(type): string {
        switch (type) {
            case CallingStatusType.done:        return 'Done';
            case CallingStatusType.setApart:    return 'Set Apart';
            case CallingStatusType.sustain:     return 'Sustain';
            case CallingStatusType.accepted:    return 'Accepted';
            case CallingStatusType.release:     return 'Release';
            case CallingStatusType.waiting:     return 'Waiting';
            case CallingStatusType.goRelease:   return 'Go Release';
            case CallingStatusType.go:          return 'Go';
            case CallingStatusType.recommended: return 'Recommended';
            case CallingStatusType.pendRelease: return 'Pending Release';
            case CallingStatusType.pending:     return 'Pending';
            case CallingStatusType.vacant:      return 'Vacant';
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
