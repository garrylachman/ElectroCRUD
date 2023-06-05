/* eslint-disable @typescript-eslint/no-unsafe-return */
// @ts-nocheck
import { Flex, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import { chakraComponents } from 'chakra-react-select';
import { FC, ReactElement, useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { AutocompleteField } from 'renderer/components/fields';
import { ColumnRO } from 'renderer/defenitions/record-object';
import { findType } from 'renderer/defenitions/record-object/data-types/data-type-finder';
import { ColumnSelectors } from 'renderer/store/selectors';
import { RootState } from 'renderer/store/store';

// eslint-disable-next-line @typescript-eslint/ban-types
export type RelationsColumnProperties = {};

export const RelationsColumn: FC<RelationsColumnProperties> = () => {
  const { watch } = useFormContext();
  const selected = watch('to');
  const selectedViewId = watch('toView');

  const columnsByViewSelector = useSelector<RootState>((state: RootState) =>
    ColumnSelectors.createColumnForViewSelector(state)
  );

  const columnSelector = useSelector<RootState>((state) =>
    ColumnSelectors.createColumnSelector(state)
  ) as ColumnRO;

  const columns = useMemo<ColumnRO[]>(
    // @ts-ignore
    () => (selectedViewId ? columnsByViewSelector(selectedViewId) : []),
    [selectedViewId]
  );

  const selectedColumn = useMemo(
    // @ts-ignore
    () => (selected ? columnSelector(selected) : undefined),
    [selected]
  );

  const defaultValueOptions = useMemo(
    () =>
      !selectedColumn || {
        label: selectedColumn.name,
        value: selectedColumn.id,
        stats: selectedColumn.data_type,
      },
    [selectedColumn]
  );

  const loadOptions = useCallback(
    (inputValue: string) =>
      columns
        .filter((item) => item.name.includes(inputValue))
        .map((item) => ({
          label: item.name,
          value: item.id,
          stats: item.data_type,
        })),
    [columns]
  );

  const defaultOptions = useMemo(() => {
    return columns.map((item) => ({
      label: item.name,
      value: item.id,
      stats: item.data_type,
    }));
  }, [columns]);

  const TagByType = (properties) => {
    const dataType = findType(properties.type);
    if (dataType) {
      return <TagLeftIcon fontSize={15} as={dataType.icon} />;
    }
    return <></>;
  };

  const customComponents = {
    Option: ({
      children,
      ...properties
    }: {
      children: ReactElement;
      data: { stats: any };
    }) => (
      <chakraComponents.Option {...properties}>
        <Flex justifyContent="space-between" w="100%">
          {children}
          {properties.data && properties.data.stats && (
            <Tag variant="subtle" colorScheme="primary" mr={2} size="sm">
              <TagByType type={properties.data.stats} />
              <TagLabel>{properties.data.stats}</TagLabel>
            </Tag>
          )}
        </Flex>
      </chakraComponents.Option>
    ),
  };

  return (
    <AutocompleteField
      id="to"
      label="Destination Column"
      loadOptions={loadOptions}
      defaultValue={defaultValueOptions}
      defaultOptions={defaultOptions}
      isMulti={false}
      components={customComponents}
      size="md"
    />
  );
};
