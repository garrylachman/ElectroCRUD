// Thanks for https://github.com/day1co/fastdao

import knex, { Knex } from 'knex';
import * as knexMeta from '@jeash/knex-meta';

const extensions = [
  { name: 'metaFilter', extension: knexMeta.metaFilter },
  { name: 'metaPage', extension: knexMeta.metaPage },
  { name: 'metaSort', extension: knexMeta.metaSort },
  { name: 'meta', extension: knexMeta.meta },
  { name: 'metaUpdate', extension: knexMeta.metaUpdate },
  { name: 'metaInsert', extension: knexMeta.metaInsert },
];

// eslint-disable-next-line no-restricted-syntax
for (const extension of extensions) {
  knex.QueryBuilder.extend(extension.name, extension.extension);
}

const wrapIdentifier = (
  value: string,
  dialectImpl: (dialectValue: string) => string
) => dialectImpl(value);

export const connect = (config: Knex.Config, log: Knex.Logger): Knex => {
  const knexInstance = knex({ ...config, wrapIdentifier, log });
  process.on('exit', () => knexInstance.destroy());
  return knexInstance;
};
