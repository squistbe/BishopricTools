export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    roles?: Roles;
    unitNumber?: number;
    calling?: UserCalling;
}

export interface Roles {
    admin?: boolean;
    guest?: boolean;
}

export enum UserCalling {
    bishop  = <any>'bishopric_bishop',
    first   = <any>'bishopric_first',
    second  = <any>'bishopric_second',
    clerk   = <any>'bishopric_clerk',
    exec    = <any>'bishopric_exec'
}
