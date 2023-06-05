import * as Joi from 'joi';
import {
  ConnectionConfig,
  ServerType,
  ServerTypeEnum,
  SSHTunnelConfig,
} from '@electrocrud/shared';
import { Object } from 'ts-toolbelt';

import { BaseRO } from './base.define';

export type AccountRO = BaseRO & {
  name: string;
  client: ServerType;
  connection: ConnectionConfig;
  tunnel?: SSHTunnelConfig;
};

export type StrictAccountRO = Object.Required<AccountRO, 'id' | 'creationDate'>;

export const ValidateTunnel = Joi.object({
  host: Joi.alternatives([Joi.string().hostname(), Joi.string().ip()])
    .match('any')
    .required()
    .label('Hostname'),
  port: Joi.number().port().required().label('Port'),
  username: Joi.string().required().label('Username'),
  password: Joi.optional().label('Password'),
});

export const ValidateServerConnection = Joi.object({
  host: Joi.alternatives([Joi.string().hostname(), Joi.string().ip()])
    .match('any')
    .required()
    .label('Hostname'),
  port: Joi.number().port().required().label('Port'),
  user: Joi.string().required().label('Username'),
  password: Joi.optional().label('Password'),
  database: Joi.string().required().label('Database'),
});

export const ValidateSqliteConnection = Joi.object({
  filename: Joi.string().required(),
});

export const ValidateConnection = Joi.object({
  id: Joi.optional(),
  creationDate: Joi.optional(),
  modificationDate: Joi.optional(),
  client: Joi.string()
    .allow(
      ServerTypeEnum.MSSQL,
      ServerTypeEnum.MYSQL,
      ServerTypeEnum.ORACEL,
      ServerTypeEnum.POSTGRES,
      ServerTypeEnum.SQLITE
    )
    .required(),
  connection: Joi.when(Joi.ref('..client'), {
    is: ServerTypeEnum.SQLITE,
    // eslint-disable-next-line unicorn/no-thenable
    then: ValidateSqliteConnection.required(),
    otherwise: ValidateServerConnection.required(),
  }),
});

export const ValidateAccountsWizardStep1 = Joi.object({
  id: Joi.optional(),
  creationDate: Joi.optional(),
  modificationDate: Joi.optional(),
  name: Joi.string().alphanum().min(3).max(30).required(),
  client: Joi.string()
    .allow(
      ServerTypeEnum.MSSQL,
      ServerTypeEnum.MYSQL,
      ServerTypeEnum.ORACEL,
      ServerTypeEnum.POSTGRES,
      ServerTypeEnum.SQLITE
    )
    .required(),
  connection: Joi.optional(),
});

export const ValidateAccountsWizardStep2 = ValidateConnection.concat(
  ValidateAccountsWizardStep1
);

export const ValidateAccountsWizardFileStep2 =
  ValidateAccountsWizardStep1.concat(ValidateConnection);
