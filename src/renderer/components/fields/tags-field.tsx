import {
  Box,
  Flex,
  FormLabel,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
} from '@chakra-ui/react';
import { clone } from 'underscore';
import { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';

export type TagsFieldProperties = {
  label?: string;
  id?: string;
  tags?: string[];
  onChange?: (value: string[]) => void;
};

export const TagsField: FC<TagsFieldProperties> = ({
  label,
  id,
  tags = [],
  onChange,
}) => {
  const [state, setState] = useState<{ name: string; id: number }[]>(
    tags.map((item, index) => ({ name: item, id: index }))
  );
  const reference = useRef<HTMLInputElement>();

  useEffect(() => {
    // @ts-ignore
    reference.current.value = '';
    if (onChange) {
      onChange(state.map((t) => t.name));
    }
  }, [state]);

  const keyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      setState((previous) => [
        ...previous,
        // @ts-ignore
        { name: clone(event.target.value), id: previous.length },
      ]);
    }
  };

  return (
    <Box>
      {label && (
        <FormLabel htmlFor={id} fontWeight="bold" fontSize="sm" mb="8px">
          {label}
        </FormLabel>
      )}
      <Flex
        height="36px"
        direction="row"
        wrap="nowrap"
        bg="transparent"
        borderBottom="1px solid"
        borderColor="gray.200"
        _focusWithin={{ borderColor: 'primary.200', borderBottomWidth: '2px' }}
        cursor="text"
        overflowX="scroll"
        width="100%"
        display="list-item"
        whiteSpace="nowrap"
        pt="6px"
        overflowY="hidden"
      >
        {state.map((item, index) => {
          return (
            <Tag
              fontSize="xs"
              colorScheme="primary"
              variant="solid"
              mr={1}
              key={item.id}
            >
              <TagLabel>{item.name}</TagLabel>
              <TagCloseButton
                justifySelf="flex-end"
                color="white"
                onClick={() =>
                  setState((previous) =>
                    previous.filter((row) => row.id !== item.id)
                  )
                }
              />
            </Tag>
          );
        })}
        <Input
          // @ts-ignore
          ref={reference}
          variant="unstyled"
          bg="transparent"
          border="none"
          p="0px"
          onKeyDown={keyPress}
          fontSize="sm"
          h="auto"
        />
      </Flex>
    </Box>
  );
};

export default TagsField;
