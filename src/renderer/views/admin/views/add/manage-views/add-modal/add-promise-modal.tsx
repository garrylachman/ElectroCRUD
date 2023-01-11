import {
  Field,
  Form,
  FormLayout,
  InputField,
  SelectField,
} from '@saas-ui/forms';
import { yupResolver } from '@saas-ui/forms/yup';
import { FC, useEffect } from 'react';
import { ActionButtonType } from 'renderer/components/buttons/action-button';
import {
  PromiseModal,
  PromiseModalContentProperties,
} from 'renderer/components/modals/promise-modal';
import { useIPCTablesList } from 'renderer/ipc';
import { IPCChannelEnum } from 'shared';
import { v4 } from 'uuid';
import * as Yup from 'yup';

type AddModalContentProperties = PromiseModalContentProperties;

const schema = Yup.object().shape({
  name: Yup.string().required(),
  table: Yup.string().required(),
});

const AddModalContent: FC<AddModalContentProperties> = ({
  formCtxRef,
  formRef,
}) => {
  const { result, execute, isExecuted } = useIPCTablesList({
    channel: IPCChannelEnum.TABLES_LIST,
  });

  useEffect(() => {
    if (!isExecuted) {
      execute();
    }
  }, []);

  return (
    <Form
      ref={formCtxRef}
      resolver={yupResolver(schema)}
      mode="all"
    >
      <FormLayout>
        <InputField name="name" label="Name" variant="flushed" />
        <SelectField
          name="table"
          label="Table"
          options={result?.body.map((row) => ({ value: row }))}
          menuListProps={{
            maxH: '200px',
          }}
          variant="flushed"
        />
      </FormLayout>
    </Form>
  );
};

export const AddPromiseModal = () =>
  PromiseModal({
    keyu: v4(),
    instanceId: v4(),
    actionButtons: [ActionButtonType.CANCEL, ActionButtonType.SAVE],
    title: 'Add new view',
    children: (properties) => <AddModalContent {...properties} />,
  });