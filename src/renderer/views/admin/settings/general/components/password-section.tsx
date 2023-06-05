import { Button, Flex, FormLabel } from '@chakra-ui/react';
import {
  Field,
  FormLayout,
  InputField,
  PasswordInputField,
  useFormContext,
} from '@saas-ui/forms';
import { useState } from 'react';

export const PasswordSection = () => {
  const { watch } = useFormContext();
  const [passordChange, setPassordChange] = useState<boolean>(false);
  const [passordChangeForce, setPassordChangeForce] = useState<boolean>(false);

  const isEnabled = watch('password.enabled');

  return (
    <>
      <FormLabel fontSize={18} fontWeight="bold">
        Password
      </FormLabel>
      <Flex mb={5}>
        <Field
          name="password.enabled"
          label="Enabled"
          type="switch"
          defaultChecked={isEnabled}
        />
      </Flex>
      <FormLayout spacing={10} columns={2}>
        <Flex>
          <InputField
            isDisabled={!isEnabled}
            name="password.hash"
            label="Secret Hash"
            // eslint-disable-next-line max-len
            help="Please use a random chars, this used to encrypt the passord. In case you change the hash the password must be changed too"
            onChange={() => {
              setPassordChange(true);
              setPassordChangeForce(true);
            }}
          />
        </Flex>
        <Flex flexDirection="column">
          <FormLabel>Password</FormLabel>
          {passordChange ? (
            <Flex alignItems="center" gap={5}>
              <PasswordInputField name="password.password" />
              <Button
                onClick={() => setPassordChange(false)}
                colorScheme="orange"
                minWidth=""
                alignSelf="auto"
                isDisabled={passordChangeForce}
              >
                Cancel Change Password
              </Button>
            </Flex>
          ) : (
            <Button
              onClick={() => setPassordChange(true)}
              colorScheme="primary"
              alignSelf="auto"
              isDisabled={!isEnabled}
            >
              Change Password
            </Button>
          )}
        </Flex>
      </FormLayout>
    </>
  );
};
