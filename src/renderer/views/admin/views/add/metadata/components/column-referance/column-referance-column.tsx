import { Flex, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import { chakraComponents } from 'chakra-react-select';
import {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { AutocompleteField } from 'renderer/components/fields';
import { findType } from 'renderer/defenitions/record-object/data-types';
import { ColumnRO } from 'renderer/defenitions/record-object/view.define';
import { ColumnSelectors } from 'renderer/store/selectors';
import { v4 } from 'uuid';

export type ColumnReferancColumnProperties = {
  onSelected: (value: string, name: string) => void;
  selectedViewId?: string;
  selectedColumnId?: string;
};

export const ColumnReferanceColumn: FC<ColumnReferancColumnProperties> = ({
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
        stats: selectedColumn.data_type,
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
            </Tag>
          )}
        </Flex>
      </chakraComponents.Option>
    ),
  };

  return (
    <AutocompleteField
      id={v4()}
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
