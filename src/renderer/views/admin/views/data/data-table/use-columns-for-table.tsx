import { TypeColumn } from '@inovua/reactdatagrid-community/types';
import _ from 'lodash';
import memoize from 'proxy-memoize';
import { useContext, useEffect, useMemo, useState } from 'react';
import { ViewScopedContext } from 'renderer/contexts';
import { ColumnWithMetadataAndTags } from 'renderer/defenitions/record-object';
import { findType } from 'renderer/defenitions/record-object/data-types';

import { DashboardContext } from '..';

export const useColumnsForTable = () => {
  const { viewState } = useContext(ViewScopedContext);
  const { status, data, control } = useContext(DashboardContext);
  const [columnState, setColumnState] = useState<TypeColumn[]>([]);

  const columns = memoize((value: ColumnWithMetadataAndTags[]) => value)(
    viewState?.columns || []
  );

  useEffect(() => {
    setColumnState(
      columns.map((column) => ({
        name: column.name,
        header: column.alias || column.name,
        type: findType(column.data_type).name,
        visible: column.enabled,
        editable: !column.is_primary_key,
      }))
    );
  }, [columns]);

  const primaryKeyColumn = useMemo(
    () => columns.find((column) => column.is_primary_key),
    [columns]
  );

  return {
    dataGridColumns: columnState,
    primaryKeyColumn,
    rawColumns: columns,
    status,
    data,
    control,
  };
};
