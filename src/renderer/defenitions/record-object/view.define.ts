import { TableInfoRow } from 'shared';
import { O } from 'ts-toolbelt';

import { BaseRO } from './base.define';
import { Categories } from './categories.define';
import { TagRO } from './tags.define';

export type ColumnRO = O.Merge<BaseRO, TableInfoRow> & {
  alias?: string;
  searchable: boolean;
  enabled: boolean;
  metadata: MetadataColumnRO;
};

export type StrictColumnRO = O.Required<ColumnRO, 'id' | 'creationDate'>;

export type ColumnReferanceRO = BaseRO & {
  fromView: string;
  from: string;
  toView: string;
  to: string;
  description?: string;
};

export type StrictColumnReferanceRO = O.Required<
  ColumnReferanceRO,
  'id' | 'creationDate'
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
  title?: string;
  description?: string;
  category?: Categories;
  contact?: MetadataTableDocsContactRO;
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

type ViewVOModfications = {
  columns: ColumnRO[] &
    {
      metadata: MetadataColumnDocsRO & {
        tags: TagRO[];
      };
    }[];
  metadata: MetadataTableDocsRO & {
    tags: TagRO[];
  };
};

export type ViewVO = Omit<ViewRO, 'columns'> & ViewVOModfications;
