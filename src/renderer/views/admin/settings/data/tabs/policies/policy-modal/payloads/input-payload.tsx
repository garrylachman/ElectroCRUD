import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { lab } from 'chroma-js';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { PolicyRulePayloadInput } from 'renderer/defenitions/record-object';
import { O } from 'ts-toolbelt';

export type InputPayloadProperties = O.Merge<
  {
    name: string;
  },
  PolicyRulePayloadInput
>;

export const InputPayload: FC<InputPayloadProperties> = ({
  name,
  length,
  label,
  defaultValue,
}) => {
  const { register } = useFormContext();

  return (
    <FormControl pt={4}>
      <FormLabel>{label}</FormLabel>
      <Input
        {...register(`payload.${name}`)}
        variant="flushed"
        maxLength={length}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};
