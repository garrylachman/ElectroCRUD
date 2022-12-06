import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { ViewSelectors } from 'renderer/store/selectors';
import { chakraComponents } from 'chakra-react-select';
import {
  Badge,
  Flex,
  Icon,
  Tag,
  TagLabel,
  TagLeftIcon,
} from '@chakra-ui/react';
import { AutocompleteField } from 'renderer/components/fields';
import { NestedPartial } from 'shared';
import { ViewRO } from 'renderer/defenitions/record-object';
import { BiTable, BiColumns } from 'react-icons/bi';

export type ColumnReferanceViewProperties = {
  excludeViewId?: string;
  onSelected: (value: string, name: string) => void;
  selectedViewId?: string;
};

const ColumnReferanceView: FC<ColumnReferanceViewProperties> = ({
  excludeViewId = '-',
  selectedViewId,
  onSelected,
}) => {
  const formContext = useFormContext();
  const [selected, setSelected] = useState(selectedViewId);
  const allViews: NestedPartial<ViewRO>[] = useSelector((state) =>
    ViewSelectors.getAllViewsSummary(state)
  );
  const viewSelector = useSelector((state) => ViewSelectors.getView(state));

  useEffect(() => console.log(allViews), [allViews]);

  const selectedView = useMemo(
    () => (selected === undefined ? undefined : viewSelector(selected)),
    [selected]
  );

  useEffect(() => {
    if (selectedView) {
      onSelected(selectedView?.id, selectedView?.name);
      formContext.setValue('toView', selected);
    }
  }, [selectedView]);

  const views = useMemo(
    () => allViews.filter((value) => value.id !== excludeViewId),
    [allViews]
  );

  const defaultValueOptions = useMemo(
    () =>
      !selectedView || {
        label: selectedView?.name,
        value: selectedView?.id,
        stats: selectedView?.columns,
        table: selectedView?.table,
      },
    [selectedView, allViews]
  );

  const handleChange = (value: string) => {
    setSelected(value);
  };

  const loadOptions = useCallback(
    (inputValue: string) =>
      views
        .filter((item) => item.name.includes(inputValue))
        .map((item) => ({
          label: item.name,
          value: item.id,
          stats: item.columns,
          table: item.table,
        })),
    [views]
  );

  const defaultOptions = useMemo(
    () =>
      views.map((item) => ({
        label: item.name,
        value: item.id,
        stats: item.columns,
        table: item.table,
      })),
    [views]
  );

  const customComponents = {
    Option: ({
      children,
      ...properties
    }: {
      children: ReactElement;
      data: { stats: any; table: string };
    }) => (
      <chakraComponents.Option {...properties}>
        <Flex justifyContent="space-between" w="100%">
          {children}
          {properties.data && properties.data.stats && (
            <Flex>
              <Tag variant="subtle" colorScheme="brand" mr={2} size="sm">
                <TagLeftIcon as={BiTable} />
                {properties.data.table}
              </Tag>
              <Tag variant="subtle" colorScheme="brand" size="sm">
                <TagLeftIcon as={BiColumns} />
                {properties.data.stats}
              </Tag>
            </Flex>
          )}
        </Flex>
      </chakraComponents.Option>
    ),
  };

  return (
    <AutocompleteField
      id="toView"
      label="Destination Table"
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

export const ColumnReferanceViewComponent = memo(ColumnReferanceView);
