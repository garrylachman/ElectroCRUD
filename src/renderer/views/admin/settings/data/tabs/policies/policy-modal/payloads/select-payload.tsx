import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { PolicyRulePayloadSelect } from 'renderer/defenitions/record-object';
import { O } from 'ts-toolbelt';

export type SelectPayloadProperties = O.Merge<
  {
    name: string;
  },
  PolicyRulePayloadSelect
>;

export const SelectPayload: FC<SelectPayloadProperties> = ({
  name,
  options,
  label,
  defaultValue,
}) => {
  const { register } = useFormContext();

  return (
    <FormControl pt={4}>
      <FormLabel>{label}</FormLabel>
      <Select
        {...register(`payload.${name}`)}
        variant="flushed"
        defaultValue={defaultValue}
      >
        {options.map((row) => (
          <option value={row} key={row}>
            {row}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
