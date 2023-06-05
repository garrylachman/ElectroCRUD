/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  Badge,
  Flex,
  HStack,
  Icon,
  Tag,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import { isBoolean } from 'underscore';
import * as R from 'ramda';
import { FC, Fragment } from 'react';
import { MdCheck, MdClose } from 'react-icons/md';
import { StrictColumnRO } from 'renderer/defenitions/record-object';

const greenOrRed = R.cond([
  [R.equals(true), R.always('green')],
  [R.equals(false), R.always('red')],
]);

type ColumnTagsLineProperties = {
  columnState: StrictColumnRO;
};

export const ColumnTagsLine: FC<ColumnTagsLineProperties> = ({
  columnState,
}) => {
  const [isShowAll, { toggle }] = useBoolean(false);

  return (
    <HStack
      py={0}
      shouldWrapChildren
      wrap="wrap"
      spacing={0}
      isInline
      justify="flex-start"
      gap={2}
    >
      {[
        'data_type',
        'is_nullable',
        'searchable',
        'is_primary_key',
        'default_value',
        'foreign_key_column',
        'foreign_key_table',
        'is_unique',
        'max_length',
      ]
        .map((key) => (
          <Fragment key={`tags-${key}-${columnState.id}`}>
            <Badge variant="subtle" colorScheme="primary" size="sm">
              <Flex gap={2}>
                <Tag variant="subtle" fontSize={10} size="sm">
                  {key}
                </Tag>
                <Tag
                  variant="solid"
                  colorScheme={
                    isBoolean(R.prop(key, columnState))
                      ? greenOrRed(R.propOr(false, key, columnState))
                      : 'blackAlpha'
                  }
                  fontSize={10}
                  size="sm"
                >
                  {isBoolean(R.prop(key, columnState)) ? (
                    <>
                      {R.prop(key, columnState) && (
                        <Icon boxSize={3} as={MdCheck} />
                      )}
                      {!R.prop(key, columnState) && (
                        <Icon boxSize={3} as={MdClose} />
                      )}
                    </>
                  ) : (
                    <>{String(R.prop(key, columnState))}</>
                  )}
                </Tag>
              </Flex>
            </Badge>
          </Fragment>
        ))
        .slice(0, isShowAll ? undefined : 4)}
      <Badge
        opacity={0.7}
        cursor="pointer"
        variant="outline"
        colorScheme="primary"
        size="sm"
        _hover={{ opacity: 1 }}
        onClick={toggle}
        rounded={10}
      >
        <Flex gap={2} alignItems="center">
          <Text>Show</Text>
          <Tag variant="solid" colorScheme="primary" fontSize={10} size="sm">
            {isShowAll ? 'Less' : 'More'}
          </Tag>
        </Flex>
      </Badge>
    </HStack>
  );
};
