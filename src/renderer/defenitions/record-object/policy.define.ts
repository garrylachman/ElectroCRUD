import { Object } from 'ts-toolbelt';

import { BaseRO } from './base.define';

export enum PolicyType {
  FULL_MASKING,
  PARTIAL_MASKING,
  FAKE_DATA,
}

export type PolicyRulePayload = string | number | boolean;

export type PolicyRuleRO = BaseRO & {
  type: PolicyType;
  name: string;
  payload?: PolicyRulePayload | PolicyRulePayload[];
};

export type StrictPolicyRuleRO = Object.Required<
  PolicyRuleRO,
  'id' | 'creationDate'
>;

export const PolicyRuleTemplates: PolicyRuleRO[] = [
  { type: PolicyType.FULL_MASKING, name: 'Full Masking', payload: '#' },
  { type: PolicyType.PARTIAL_MASKING, name: 'Mask 1 Char', payload: ['#', 1] },
  {
    type: PolicyType.FAKE_DATA,
    name: 'Fake Data',
    payload: [
      'firstName',
      'lastName',
      'fullName',
      'age',
      'country',
      'countryCode',
      'city',
      'address',
      'zipcode',
      'email',
      'username',
      'password',
      'birthdate',
      'uuid',
      'date',
      'phoneNumber',
      'lorem',
      'sex',
      'gpsCoordinate',
      'avatarUrl',
      'ipv4',
      'ipv6',
      'macAddress',
      'port',
      'url',
      'userAgent',
      'fileName',
    ],
  },
];
