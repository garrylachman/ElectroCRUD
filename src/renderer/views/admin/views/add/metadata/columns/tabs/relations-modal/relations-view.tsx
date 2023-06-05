// @ts-nocheck
import { Flex, Tag, TagLeftIcon } from '@chakra-ui/react';
import { chakraComponents } from 'chakra-react-select';
import { FC, ReactElement, useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { BiColumns, BiTable } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { AutocompleteField } from 'renderer/components/fields';
import { ViewRO, ViewVO } from 'renderer/defenitions/record-object';
import { useAppSelector } from 'renderer/store/hooks';
import { ViewSelectors } from 'renderer/store/selectors';
import { RootState } from 'renderer/store/store';

export type RelationsViewProperties = {
  excludeViewId?: string;
};

export const RelationsView: FC<RelationsViewProperties> = ({
  excludeViewId = '-',
}) => {
  const session = useAppSelector((state: RootState) => state.session);
  const { watch } = useFormContext();
  const selected = watch('toView');

  const allViews = useSelector<RootState, ViewRO[]>((state) =>
    ViewSelectors.getAllViewsSummary(state)
  );
  const viewSelector = useSelector<RootState>((state) =>
    ViewSelectors.getView(state)
  ) as ViewRO;

  const selectedView = useMemo<ViewVO | undefined>(() => {
    if (selected) {
      return viewSelector(selected) as ViewVO;
    }
  }, [selected]);

  const notExludedViews = useMemo(
    () =>
      allViews
        .filter((value) => value.accountId === session.account?.id)
        .filter((value) => value.id !== excludeViewId),
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

  const loadOptions = useCallback(
    (inputValue: string) =>
      notExludedViews
        .filter((item) => item.name.includes(inputValue))
        .map((item) => ({
          label: item.name,
          value: item.id,
          stats: item.columns,
          table: item.table,
        })),
    [notExludedViews]
  );

  const defaultOptions = useMemo(
    () =>
      notExludedViews.map((item) => ({
        label: item.name,
        value: item.id,
        stats: item.columns,
        table: item.table,
      })),
    [notExludedViews]
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
          {properties.data && (
            <Flex>
              <Tag variant="subtle" colorScheme="primary" mr={2} size="sm">
                <TagLeftIcon as={BiTable} />
                {properties.data.table}
              </Tag>
              <Tag variant="subtle" colorScheme="primary" size="sm">
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
      defaultOptions={defaultOptions}
      isMulti={false}
      components={customComponents}
      size="md"
    />
  );
};
