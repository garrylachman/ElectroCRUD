/* eslint-disable unicorn/prevent-abbreviations */
import { TableInfoRow } from '@electrocrud/shared';
import { O } from 'ts-toolbelt';

import { BaseRO, StrictBaseRO } from './base.define';
import { TagRO } from './tags.define';

type ColumnData = {
  alias?: string;
  searchable: boolean;
  enabled: boolean;
  metadata: MetadataColumnRO;
};

export type ColumnRO = O.Assign<BaseRO, [ColumnData, TableInfoRow], 'deep'>;
export type StrictColumnRO = O.MergeAll<
  StrictBaseRO,
  [ColumnData, TableInfoRow],
  'deep'
>;

export type ColumnReferanceRO = BaseRO & {
  fromView: string;
  from: string;
  toView: string;
  to: string;
  description?: string;
};

export type StrictColumnReferanceRO = O.Required<
  ColumnReferanceRO,
  'id' | 'creationDate' | 'modificationDate'
>;

export type StrictColumnReferanceWithViewsRO = O.Overwrite<
  StrictColumnReferanceRO,
  { fromView: StrictViewRO; toView: StrictViewRO }
>;

export type StrictColumnReferanceWithViewsAndCoumnsRO = O.Overwrite<
  StrictColumnReferanceWithViewsRO,
  { from: StrictColumnRO; to: StrictColumnRO }
>;

export type MetadataColumnRO = {
  md?: string;
  tags: string[];
};

export type MetadataTableDocsContactRO = {
  name?: string;
  phone?: string;
  email?: string;
  details?: string;
};

export type MetadataTableDocsRO = {
  md?: string;
  tags: string[];
};

export type ViewRO = BaseRO & {
  accountId: string;
  table: string;
  columns: string[];
  name: string;
  terminology: {
    singular: string;
    plural: string;
  };
  permissions: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
  metadata: MetadataTableDocsRO;
};

export type StrictViewRO = O.Required<ViewRO, 'id' | 'creationDate'>;

export type ColumnWithMetadataAndTags = O.Overwrite<
  StrictColumnRO,
  { metadata: { tags: TagRO[] } }
>;

type ViewVOModfications = {
  columns: ColumnWithMetadataAndTags[];
  metadata: MetadataTableDocsRO & {
    tags: TagRO[];
  };
};

export type ViewVO = Omit<ViewRO, 'columns'> & ViewVOModfications;
export type StrictViewVO = Omit<StrictViewRO, 'columns'> & ViewVOModfications;
