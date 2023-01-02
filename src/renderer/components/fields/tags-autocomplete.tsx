import { Box } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { components, MultiValueGenericProps } from 'react-select';
import { TagType } from 'renderer/defenitions/record-object';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import {
  ColumnsReducer,
  TagsReducer,
  ViewsReducer,
} from 'renderer/store/reducers';

import { AutocompleteField } from './autocomplete-field';

export type TagsAutocompleteProps = {
  id: string;
  type: TagType;
  defaultValue: string[];
  size?: string;
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
  size = 'lg',
}) => {
  const { setValue, watch } = useFormContext();
  const tags = watch(id, defaultValue) as string[];

  const tagsState = useAppSelector((state) => state.tags);
  const dispatch = useAppDispatch();

  const tagsByType = useMemo(
    () =>
      TagsReducer.getSelectors()
        .selectAll(tagsState)
        .filter((value) => value.type === type),
    [tagsState]
  );

  const defaultValueOptions = useMemo(
    () =>
      defaultValue.map((item) => ({
        label: tagsState.entities[item]?.label,
        value: item,
      })),
    [tagsState, defaultValue]
  );

  const handleCreate = (inputValue: string) => {
    const result = dispatch(
      TagsReducer.actions.upsertOne(
        {
          label: inputValue,
          type,
        },
        target
      )
    );
    setValue(id, [...(tags || []), result.payload.id]);
  };

  const handleChange = (values: string[]) => {
    setValue(id, values);
    if (target && target?.viewId) {
      dispatch(
        ViewsReducer.actions.updateTags({
          viewId: target.viewId,
          tags: values,
        })
      );
    }
    if (target && target?.columnId) {
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

  const defaultValueTags = useMemo(() => {
    if (!tags) {
      return [];
    }
    return tagsByType
      .filter((item) => tags.includes(item.id))
      .map((item) => ({ label: item.label, value: item.id }));
  }, [tags, tagsByType]);

  return (
    <Box w="100%">
      <AutocompleteField
        id={id}
        size={size}
        loadOptions={loadOptions}
        handleCreate={handleCreate}
        defaultValue={defaultValueOptions}
        onChange={handleChange}
        defaultOptions={defaultOptions}
        defaultValue={defaultValueTags}
      />
    </Box>
  );
};
