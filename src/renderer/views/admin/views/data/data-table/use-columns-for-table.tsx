import { mapObject } from 'underscore';
import memoize from 'proxy-memoize';
import { useContext, useMemo } from 'react';
import { ViewScopedContext } from 'renderer/contexts';
import { ColumnWithMetadataAndTags } from 'renderer/defenitions/record-object';
import { findType } from 'renderer/defenitions/record-object/data-types';

import { DashboardContext } from '..';

export const useColumnsForTable = () => {
  const { viewState } = useContext(ViewScopedContext);
  const { status, data, control } = useContext(DashboardContext);

  const transformedData = useMemo(
    () => ({
      ...data,
      rows: data.rows.map((item) =>
        mapObject(item, (value) => {
          if (value instanceof Date) {
            return value.toISOString();
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return value;
        })
      ),
    }),
    [data]
  );
  const columns = memoize((value: ColumnWithMetadataAndTags[]) => value)(
    viewState?.columns || []
  );

  const dataGridColumns = useMemo(
    () =>
      columns.map((column) => ({
        name: column.name,
        header: column.alias || column.name,
        type: findType(column.data_type).name,
        visible: column.enabled,
        editable: !column.is_primary_key,
      })),
    [columns]
  );

  const primaryKeyColumn = useMemo(
    () => columns.find((column) => column.is_primary_key),
    [columns]
  );

  return {
    dataGridColumns,
    primaryKeyColumn,
    rawColumns: columns,
    status,
    data: transformedData,
    control,
  };
};
