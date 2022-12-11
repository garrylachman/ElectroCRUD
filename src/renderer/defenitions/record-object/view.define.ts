import { TableInfoRow } from 'shared';

import { BaseRO, RemoveField } from './base.def';
import { Categories } from './categories.def';
import { TagRO } from './tags.def';

export type ColumnRO = BaseRO &
  TableInfoRow & {
    alias?: string;
    searchable: boolean;
    enabled: boolean;
    metadata: MetadataColumnDocsRO;
  };

export type ColumnReferanceRO = BaseRO & {
  fromView: string;
  from: string;
  toView: string;
  to: string;
  description?: string;
};

export type MetadataColumnDocsRO = {
  title?: string;
  description?: string;
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