import { SupportOptionRange } from 'prettier';
import { Object } from 'ts-toolbelt';

import { BaseRO } from './base.define';

export enum PolicyType {
  NONE,
  FULL_MASKING,
  PARTIAL_MASKING,
  FAKE_DATA,
}

export type PolicyRulePayloadInput = {
  type: 'input';
  length: number;
  label: string;
  defaultValue?: string | number;
};
export type PolicyRulePayloadSelect = {
  type: 'select';
  options: string[];
  label: string;
  defaultValue?: string | number;
};
export type PolicyRulePayload = Record<
  string,
  PolicyRulePayloadInput | PolicyRulePayloadSelect | string | number
>;

export type PolicyRuleRO = BaseRO & {
  type: PolicyType;
  name: string;
  payload?: PolicyRulePayload[];
  tags: string[];
};

export type StrictPolicyRuleRO = Object.Required<
  PolicyRuleRO,
  'id' | 'creationDate'
>;

export const fakerOptions = [
  'name.firstName',
  'name.middleName',
  'name.lastName',
  'name.fullName',
  'name.jobArea',
  'name.jobDescriptor',
  'name.jobTitle',
  'name.jobType',
  'address.country',
  'address.countryCode',
  'address.city',
  'address.streetAddress',
  'address.zipCode',
  'address.buildingNumber',
  'address.cardinalDirection',
  'address.county',
  'address.latitude',
  'address.longitude',
  'address.secondaryAddress',
  'address.state',
  'address.street',
  'address.timeZone',
  'internet.email',
  'internet.userName',
  'internet.password',
  'date.birthdate',
  'datatype.uuid',
  'date.soon',
  'date.future',
  'date.past',
  'date.month',
  'date.weekday',
  'phone.number',
  'phone.imei',
  'lorem.paragraph',
  'lorem.lines',
  'lorem.sentence',
  'lorem.slug',
  'lorem.text',
  'name.sex',
  'address.nearbyGPSCoordinate',
  'internet.ipv4',
  'internet.ipv6',
  'internet.mac',
  'internet.port',
  'internet.url',
  'internet.userAgent',
  'internet.domainName',
  'internet.domainSuffix',
  'internet.emoji',
  'system.fileName',
  'system.commonFileExt',
  'system.commonFileName',
  'system.commonFileType',
  'system.cron',
  'system.directoryPath',
  'system.filePath',
  'system.mimeType',
  'system.semver',
  'datatype.number',
  'datatype.string',
  'datatype.json',
  'datatype.hexadecimal',
  'datatype.float',
  'datatype.datetime',
  'datatype.boolean',
  'datatype.array',
  'finance.account',
  'finance.accountName',
  'finance.pin',
  'finance.routingNumber',
  'finance.transactionDescription',
  'finance.transactionType',
  'finance.bic',
  'finance.iban',
  'finance.bitcoinAddress',
  'finance.ethereumAddress',
  'finance.litecoinAddress',
  'finance.creditCardCVV',
  'finance.creditCardIssuer',
  'finance.creditCardNumber',
  'finance.currencyCode',
  'finance.currencyName',
  'finance.currencySymbol',
  'image.abstract',
  'image.animals',
  'image.avatar',
  'image.business',
  'image.city',
  'image.image',
  'music.genre',
  'music.songName',
  'commerce.department',
  'commerce.price',
  'commerce.product',
  'commerce.productDescription',
  'commerce.productMaterial',
  'commerce.color',
];

export const PolicyRuleTemplates: PolicyRuleRO[] = [
  {
    type: PolicyType.FULL_MASKING,
    name: 'Full Masking',
    payload: [
      {
        char: {
          type: 'input',
          length: 1,
          label: 'Mask with',
          defaultValue: '#',
        },
      },
    ],
    tags: [],
  },
  {
    type: PolicyType.PARTIAL_MASKING,
    name: 'Mask # of Char',
    payload: [
      {
        char: {
          type: 'input',
          length: 1,
          label: 'Mask with',
          defaultValue: '#',
        },
      },
      {
        numToMask: {
          type: 'input',
          length: 3,
          label: '# of chars to mask',
          defaultValue: 1,
        },
      },
      {
        dir: {
          type: 'select',
          label: 'Direction',
          defaultValue: 'left',
          options: ['left', 'right'],
        },
      },
    ],
    tags: [],
  },
  {
    type: PolicyType.FAKE_DATA,
    name: 'Fake Data',
    payload: [
      {
        faker: {
          type: 'select',
          label: 'Fake value',
          defaultValue: 'firstName',
          options: fakerOptions,
        },
      },
    ],
    tags: [],
  },
];
