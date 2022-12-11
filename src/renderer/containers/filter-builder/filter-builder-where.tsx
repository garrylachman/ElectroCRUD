import {
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Input,
} from '@chakra-ui/react';
import _ from 'lodash';
import { FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { AutocompleteField } from 'renderer/components/fields';
import TagsField from 'renderer/components/fields/tags-field';
import { ViewScopedContext } from 'renderer/contexts/view-scoped-context';
import { QueryWhereOprEnum } from 'shared';

import {
  ReactSelectColumnOption,
} from './components/react-select-column-option';

type CondValue = string | number | undefined;

enum ValuesInputType {
  VALUE,
  TAGS,
}

export type FilterBuilderWheresGroupCondProperties = {
  column?: string;
  opr?: QueryWhereOprEnum;
  value?: CondValue | CondValue[];
};

export type FilterBuilderWhereProperties =
  FilterBuilderWheresGroupCondProperties;

export const FilterBuilderWhere: FC<
  PropsWithChildren<FilterBuilderWhereProperties>
> = ({ column, opr, value, children }) => {
  const { viewState } = useContext(ViewScopedContext);

  const [columnState, setColumnState] = useState(column);
  const [oprState, setOprState] = useState(opr);
  const [valueState, setValueState] = useState(value);
  const [valueType, setValueType] = useState(ValuesInputType.VALUE);

  useEffect(() => {
    if (
      oprState &&
      [QueryWhereOprEnum.IN, QueryWhereOprEnum.NOT_IN].includes(oprState)
    ) {
      setValueState([]);
      setValueType(ValuesInputType.TAGS);
    } else {
      setValueState('');
      setValueType(ValuesInputType.VALUE);
    }
  }, [oprState]);

  const loadColumns = async (inputValue = '') =>
    viewState?.columns
      .filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((item) => ({
        label: item.name,
        value: item.id,
        type: item.data_type,
      }));

  const columnsList = viewState?.columns.map((item) => ({
    label: item.name,
    value: item.id,
    type: item.data_type,
  }));

  const oprsList = [
    [QueryWhereOprEnum.EQ, 'Equals'],
    [QueryWhereOprEnum.GT, 'Greater then'],
    [QueryWhereOprEnum.GTE, 'Greater or Equals'],
    [QueryWhereOprEnum.IN, 'In'],
    [QueryWhereOprEnum.LIKE, 'Like'],
    [QueryWhereOprEnum.LT, 'Less than'],
    [QueryWhereOprEnum.LTE, 'Less or Equals'],
    [QueryWhereOprEnum.NOT_EQ, 'Not Equals'],
    [QueryWhereOprEnum.NOT_IN, 'Not in'],
  ].map((item) => ({ label: item[1], value: item[0] }));

  const loadOprs = async (inputValue = '') =>
    oprsList.filter((item) =>
      item.label.toLowerCase().includes(inputValue.toLowerCase())
    );

  return (
    <Grid
      templateColumns="repeat(9, 1fr)"
      gap={8}
      width="100%"
      alignItems="center"
    >
      <GridItem colSpan={3}>
        <AutocompleteField<string | undefined>
          id={_.uniqueId('column')}
          isMulti={false}
          loadOptions={loadColumns}
          defaultOptions={columnsList}
          size="sm"
          defaultValue={columnsList?.find((item) => item.value === columnState)}
          onChange={setColumnState}
          noFormContext
          components={ReactSelectColumnOption}
        />
      </GridItem>
      <GridItem colSpan={2}>
        <AutocompleteField<QueryWhereOprEnum>
          id={_.uniqueId('opr')}
          isMulti={false}
          loadOptions={loadOprs}
          defaultOptions={oprsList}
          size="sm"
          defaultValue={oprsList?.find((item) => item.value === oprState)}
          onChange={setOprState}
          noFormContext
        />
      </GridItem>
      <GridItem colSpan={3}>
        {valueType === ValuesInputType.TAGS ? (
          <TagsField onChange={setValueState} tags={valueState as []} />
        ) : (
          <Input
            size="sm"
            type="text"
            variant="flushed"
            h="36px"
            value={valueState}
            onChange={(e) => setValueState(e.target.value)}
          />
        )}
      </GridItem>
      <GridItem colSpan={1}>{children}</GridItem>
    </Grid>
  );
};
