import { Box } from '@chakra-ui/react';
import { FC, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { TagType } from 'renderer/defenitions/record-object';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import {
  ColumnsReducer,
  TagsReducer,
  ViewsReducer,
} from 'renderer/store/reducers';
import { components, MultiValueGenericProps } from 'react-select';
import { AnimatePresence, motion } from 'framer-motion';
import { AutocompleteField } from './autocomplete-field';

export type TagsAutocompleteProps = {
  id: string;
  type: TagType;
  defaultValue: string[];
  target: {
    viewId?: string;
    columnId?: string;
  };
};

export const TagsAutocomplete: FC<TagsAutocompleteProps> = ({
  id,
  type,
  target,
  defaultValue = [],
}) => {
  const { setValue } = useFormContext();
  const tagsState = useAppSelector((state) => state.tags);
  const dispatch = useAppDispatch();

  const tagsByType = useMemo(
    () =>
      TagsReducer.getSelectors()
        .selectAll(tagsState)
        .filter((value) => value.type === type),
    []
  );

  const defaultValueOptions = useMemo(
    () =>
      defaultValue.map((item) => ({
        label: tagsState.entities[item]?.label,
        value: item,
      })),
    [tagsState, defaultValue]
  );
  // useEffect(() => setValue(id, defaultValue), [defaultValue]);

  const handleCreate = (inputValue: string) => {
    dispatch(
      TagsReducer.actions.upsertOne(
        {
          label: inputValue,
          type,
        },
        target
      )
    );
  };

  const handleChange = (values: string[]) => {
    setValue(id, values);
    if (target.viewId) {
      dispatch(
        ViewsReducer.actions.updateTags({
          viewId: target.viewId,
          tags: values,
        })
      );
    }
    if (target.columnId) {
      dispatch(
        ColumnsReducer.actions.updateTags({
          columnId: target.columnId,
          tags: values,
        })
      );
    }
  };

  const loadOptions = async (inputValue: string) =>
    new Promise((resolve) => {
      resolve(
        tagsByType
          .filter((item) => item.label.includes(inputValue))
          .map((item) => ({ label: item.label, value: item.id }))
      );
    });

  const defaultOptions = useMemo(
    () => tagsByType.map((item) => ({ label: item.label, value: item.id })),
    [tagsByType]
  );

  return (
    <Box w="100%">
      <AutocompleteField
        id="tags"
        loadOptions={loadOptions}
        handleCreate={handleCreate}
        defaultValue={defaultValueOptions}
        onChange={handleChange}
        defaultOptions={defaultOptions}
      />
    </Box>
  );
};
