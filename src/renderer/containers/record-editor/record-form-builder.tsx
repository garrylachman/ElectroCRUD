import { Form, FormLayout } from '@saas-ui/forms';
import { FC } from 'react';
import { ColumnWithMetadataAndTags } from 'renderer/defenitions/record-object';
import { InputFormFactory } from './form-inputs';

export type RecordFormBuilderProperties = {
  columns: ColumnWithMetadataAndTags[];
  formRef: any;
};
export const RecordFormBuilder: FC<RecordFormBuilderProperties> = ({
  columns,
  formRef,
}) => {
  return (
    // @ts-ignore
    <Form ref={formRef}>
      <FormLayout>
        {columns?.map((column: ColumnWithMetadataAndTags) => {
          const Component = InputFormFactory(column);
          return <Component key={column.name} column={column} />;
        })}
      </FormLayout>
    </Form>
  );
};
