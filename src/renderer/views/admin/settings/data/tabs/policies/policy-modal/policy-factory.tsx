import { pairs } from 'underscore';
import React, { FC, useMemo } from 'react';
import {
  PolicyRulePayload,
  PolicyRulePayloadInput,
  PolicyRulePayloadSelect,
  PolicyRuleTemplates,
  PolicyType,
} from 'renderer/defenitions/record-object';
import { O } from 'ts-toolbelt';

import { InputPayload, SelectPayload } from './payloads';

export type PolicyFactoryProperties = {
  type: PolicyType;
};

type PropertiesType = O.Merge<
  {
    name: string;
  },
  PolicyRulePayloadInput | PolicyRulePayloadSelect
>;

const toProperties = (item: PolicyRulePayload): PropertiesType => {
  const [pair] = pairs(item);
  const [name, properties] = pair;
  return {
    name,
    ...(properties as PolicyRulePayloadInput | PolicyRulePayloadSelect),
  };
};

export const PolicyFactory: FC<PolicyFactoryProperties> = ({ type }) => {
  const payload = PolicyRuleTemplates.find(
    (item) => item.type === Number(type)
  )?.payload;

  const payloadProperties = useMemo(
    () => payload?.map(toProperties),
    [payload]
  );

  return (
    <>
      {payloadProperties?.map((row, index) => (
        <React.Fragment key={row.name}>
          {row.type === 'input' && <InputPayload {...row} />}
          {row.type === 'select' && <SelectPayload {...row} />}
        </React.Fragment>
      ))}
    </>
  );
};
