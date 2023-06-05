import { Box } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { TagType } from 'renderer/defenitions/record-object';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import { ColumnsReducer, TagsReducer } from 'renderer/store/reducers';

import { AutocompleteField } from './autocomplete-field';

export type TagsAutocompleteProperties = {
  id: string;
  type: TagType;
  defaultValue: string[];
  size?: string;
  target: {
    viewId?: string;
    columnId?: string;
  };
};

export const TagsAutocomplete: FC<TagsAutocompleteProperties> = ({
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
    const newValue = [...(tags || []), result.payload.id];
    setValue(id, newValue);
  };

  const handleChange = (values: string[]) => {
    setValue(id, values);
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
        // defaultValue={defaultValueOptions}
        onChange={handleChange}
        defaultOptions={defaultOptions}
        defaultValue={defaultValueTags}
      />
    </Box>
  );
};
