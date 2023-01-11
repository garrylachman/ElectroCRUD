import {
  Box,
  Flex,
  FormLabel,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  useColorModeValue,
} from '@chakra-ui/react';
import _ from 'lodash';
import { FC, useEffect, useRef, useState } from 'react';

export type TagsFieldProperties = {
  label?: string;
  id?: string;
  tags?: string[];
  onChange?: (value: string[]) => void;
};

// Custom components
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
    _.set(reference.current, 'value', '');
    if (onChange) {
      onChange(state.map((t) => t.name));
    }
  }, [state]);

  const keyPress = (e: any) => {
    if (e.keyCode === 13) {
      setState((previous) => [
        ...previous,
        { name: _.clone(e.target.value), id: previous.length },
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
              key={index}
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
          ref={reference}
          variant="unstyled"
          bg="transparent"
          border="none"
          p="0px"
          onKeyDown={(e) => keyPress(e)}
          fontSize="sm"
          h="auto"
        />
      </Flex>
    </Box>
  );
};

export default TagsField;