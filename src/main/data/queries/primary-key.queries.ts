import { ServerType } from '../../../shared/defenitions';
import { ServerTypeEnum } from '../../../shared/enums';
import { tablesListQueries } from './tables-list.queries';

export const primaryKeyQueries: Record<ServerType, string> = {
  ...tablesListQueries,
  [ServerTypeEnum.SQLITE]: `
  SELECT
      p.cid AS 'col_id',
      p.name AS 'name',
      m.name AS 'table_name',
      p.type AS 'type',
      p.pk AS 'key',
      p.dflt_value AS 'default',
      p.[notnull] AS 'nullable',
      0 as 'length',
      '' as 'extra'
  FROM sqlite_master m
  LEFT OUTER JOIN pragma_table_info((m.name)) p
  ON m.name <> p.name
  WHERE table_name = ?
  ORDER BY table_name, col_id
  `,
  [ServerTypeEnum.MYSQL]: `
  SELECT
      COLUMN_NAME as 'name',
      COLUMN_DEFAULT as 'default',
      IF(STRCMP(IS_NULLABLE, 'true') = 0, true, false) as 'nullable',
      DATA_TYPE as 'type',
      IFNULL(CHARACTER_MAXIMUM_LENGTH, 0)+IFNULL(NUMERIC_PRECISION, 0) as 'length',
      COLUMN_KEY as 'key',
      EXTRA as 'extra'
  FROM information_schema.columns WHERE table_schema = ? and table_name = ?
  `,
  [ServerTypeEnum.POSTGRES]: `select
	a.*,
	b.key
from
	(
	select
		column_name as name,
		column_default as default,
		is_nullable as nullable,
		udt_name as type,
		greatest(character_maximum_length, 0) + greatest(numeric_precision, 0) as length,
		'' as extra
	from
		information_schema.columns
	where
		table_catalog = ?
		and table_schema = split_part(?, '.', 1)
		and table_name = split_part(?, '.', 2))a
left join (
		select pg_attribute.attname as name,
		'PRI' as key
	from
		pg_index,
		pg_class,
		pg_attribute,
		pg_namespace
	where
		pg_class.oid = ?::regclass
		and indrelid = pg_class.oid
		and pg_class.relnamespace = pg_namespace.oid
		and pg_attribute.attrelid = pg_class.oid
		and pg_attribute.attnum = any(pg_index.indkey)
		and indisprimary)b on
	a.name = b.name;`,
};
