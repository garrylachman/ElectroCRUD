import { TableInfoRow } from 'shared';
import { BaseRO } from './base.def';
import { Categories } from './categories.def';
import { TagRO } from './tags.def';

export type ColumnRO = TableInfoRow & {
  alias?: string;
  searchable: boolean;
  enabled: boolean;
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
  tags: number[] | TagRO[];
};

export type MetadataColumnDocsRO = {
  column: string;
  title?: string;
  description?: string;
  tags: number[] | TagRO[];
};

export type MetadataRO = {
  tableDocs: MetadataTableDocsRO;
  columnsDocs: MetadataColumnDocsRO[];
};

export type ViewRO = BaseRO & {
  accountId: string;
  table: string;
  columns: ColumnRO[];
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
  metadata?: MetadataRO;
};
