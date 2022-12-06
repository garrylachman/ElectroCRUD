import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { ColumnSelectors, ViewSelectors } from 'renderer/store/selectors';
import { chakraComponents } from 'chakra-react-select';
import { Badge, Flex, Tag, TagLabel, TagLeftIcon, TagRightIcon } from '@chakra-ui/react';
import { AutocompleteField } from 'renderer/components/fields';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { findType } from 'renderer/defenitions/record-object/data-types';
import { FcKey } from 'react-icons/fc';

export type ColumnReferancColumnProperties = {
  onSelected: (value: string, name: string) => void;
  selectedViewId?: string;
  selectedColumnId?: string;
};

const ColumnReferanceColumn: FC<ColumnReferancColumnProperties> = ({
  onSelected,
  selectedViewId,
  selectedColumnId,
}) => {
  const formContext = useFormContext();
  const [selected, setSelected] = useState(selectedColumnId);

  const columnsByViewSelector = useSelector((state) =>
    ColumnSelectors.createColumnForViewSelector(state)
  );
  const columnSelector = useSelector((state) =>
    ColumnSelectors.createColumnSelector(state)
  );

  const columns = useMemo<ColumnRO[]>(
    () => columnsByViewSelector(selectedViewId),
    [selectedViewId]
  );

  const selectedColumn = useMemo(
    () => !selected || columnSelector(selected),
    [selected]
  );

  useEffect(() => {
    if (selectedColumn) {
      onSelected(selectedColumn.id, selectedColumn.name);
      formContext.setValue('to', selectedColumn.id);
    }
  }, [selectedColumn]);

  const defaultValueOptions = useMemo(
    () =>
      !selectedColumn || {
        label: selectedColumn.name,
        value: selectedColumn.id,
        stats: selectedColumn.type,
        key: selectedColumn.key,
      },
    [selectedColumn]
  );

  const handleChange = (value: string) => setSelected(value);

  const loadOptions = useCallback(
    (inputValue: string) =>
      columns
        .filter((item) => item.name.includes(inputValue))
        .map((item) => ({
          label: item.name,
          value: item.id,
          stats: item.type,
          key: item.key,
        })),
    [columns]
  );

  const defaultOptions = useMemo(() => {
    return columns.map((item) => ({
      label: item.name,
      value: item.id,
      stats: item.type,
      key: item.key,
    }));
  }, [columns]);

  const TagByType = (props) => {
    const dataType = findType(props.type);
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
            <Tag variant="subtle" colorScheme="brand" mr={2} size="sm">
              <TagByType type={properties.data.stats} />
              <TagLabel>{properties.data.stats}</TagLabel>
              {properties.data.key === 'PRI' && (
                <TagRightIcon fontSize={13} as={FcKey} />
              )}
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
      onChange={handleChange}
      defaultOptions={defaultOptions}
      isMulti={false}
      components={customComponents}
      size="md"
    />
  );
};

export const ColumnReferanceColumnComponent = memo(ColumnReferanceColumn);
