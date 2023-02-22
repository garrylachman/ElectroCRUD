import { Flex, Heading } from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { Form, FormLayout } from '@saas-ui/forms';
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
import { SaveButton } from '@electrocrud/buttons';
import { ConfirmPromiseSaveModal } from 'renderer/components/modals';

type FormData = O.Omit<SettingsRO, 'id' | 'creationDate' | 'modificationDate'>;

const validationSchema = Joi.object<FormData>({
  password: Joi.object<PasswordSettings>({
    enabled: Joi.bool().required(),
    hash: Joi.string().required(),
    password: Joi.string()
      .max(5)
      .min(2)
      // eslint-disable-next-line unicorn/better-regex
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
        `${data.password.password}${data.password.hash}`
      ).toString();
    }
    ConfirmPromiseSaveModal({ entityName: 'Settings' })
      .then((value) => {
        if (value && data) {
          dispatch(SettingsReducer.actions.update(data));
        }
        return true;
      })
      .catch(() => {});
  };

  return (
    <Flex justifyContent="space-between" flexDirection="column" height="100%">
      <Form<FormData>
        reValidateMode="onChange"
        mode="all"
        onSubmit={onSubmit}
        defaultValues={{
          password: pick(settingsState.password, ['enabled', 'hash']),
        }}
        resolver={joiResolver(validationSchema)}
        height="100%"
        display="flex"
        flexDirection="column"
      >
        <Flex flex={1} flexDirection="column">
          <Heading pb={3}>General Settings</Heading>
          <FormLayout>
            <PasswordSection />
          </FormLayout>
        </Flex>
        <Flex mt={3}>
          <SaveButton type="submit" />
        </Flex>
      </Form>
    </Flex>
  );
};
