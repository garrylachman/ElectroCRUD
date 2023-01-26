import { Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { Form, FormLayout, SubmitButton } from '@saas-ui/forms';
import CryptoJS from 'crypto-js';
import Joi from 'joi';
import { pick } from 'underscore';
import { FC } from 'react';
import {
  PasswordSettings,
  SettingsRO,
} from 'renderer/defenitions/record-object';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import { SettingsReducer } from 'renderer/store/reducers';
import { O } from 'ts-toolbelt';

import { PasswordSection } from './components/password-section';

type FormData = O.Omit<SettingsRO, 'id' | 'creationDate' | 'modificationDate'>;

const validationSchema = Joi.object<FormData>({
  password: Joi.object<PasswordSettings>({
    enabled: Joi.bool().required(),
    hash: Joi.string().required(),
    password: Joi.string()
      .max(5)
      .min(2)
      .pattern(new RegExp(/^[a-zA-Z0-9]+$/))
      .optional(),
  }),
});

export const SettingsGeneral: FC<any> = () => {
  const settingsState = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  const onSubmit = (data: FormData) => {
    if (data.password.password) {
      data.password.passwordLenght = data.password.password.length;
      data.password.password = CryptoJS.SHA256(
        data.password.password,
        data.password.hash
      ).toString();
    }
    dispatch(SettingsReducer.actions.update(data));
  };

  return (
    <>
      <Card variant="elevated">
        <CardHeader>General Settings</CardHeader>
        <Form<FormData>
          reValidateMode="onChange"
          mode="all"
          onSubmit={onSubmit}
          defaultValues={{
            password: pick(settingsState.password, ['enabled', 'hash']),
          }}
          resolver={joiResolver(validationSchema)}
        >
          <CardBody>
            <FormLayout>
              <PasswordSection />
            </FormLayout>
          </CardBody>
          <CardFooter>
            <SubmitButton disableIfInvalid />
          </CardFooter>
        </Form>
      </Card>
    </>
  );
};
