export interface Organization {
    name: string;
    sortIndex: number;
    unitNumber?: number;
    orgTag: OrgTag;
}

export enum OrgTag {
  bishopric = 'bishopric',
  elders = 'elders',
  rs = 'rs',
  ss = 'ss',
  ym = 'ym',
  yw = 'yw',
  primary = 'primary',
  other = 'other',
  ftm = 'ftm'
}

export const ORGS: Organization[] = [
    {
      name: 'Bishopric',
      sortIndex: 0,
      orgTag: OrgTag.bishopric
    },
    {
      name: 'Elders Quorum',
      sortIndex: 1,
      orgTag: OrgTag.elders
    },
    {
      name: 'Relief Society',
      sortIndex: 2,
      orgTag: OrgTag.rs
    },
    {
      name: 'Sunday School',
      sortIndex: 3,
      orgTag: OrgTag.ss
    },
    {
      sortIndex: 4,
      name: 'Young Men',
      orgTag: OrgTag.ym
    },
    {
      sortIndex: 5,
      name: 'Young Women',
      orgTag: OrgTag.yw
    },
    {
      sortIndex: 6,
      name: 'Primary',
      orgTag: OrgTag.primary
    },
    {
      sortIndex: 7,
      name: 'Other Callings',
      orgTag: OrgTag.other
    },
    {
      sortIndex: 8,
      name: 'Full-Time Missionaries',
      orgTag: OrgTag.ftm
    }
  ];
