/* eslint-disable @typescript-eslint/no-unsafe-return */
// @ts-nocheck
import { Badge, Text, useToast } from '@chakra-ui/react';
import { Notification } from '@highoutput/hds-alerts';
import { FC, useEffect } from 'react';
import { TbAlertCircle } from 'react-icons/tb';
import ReactTimeAgo from 'react-time-ago';
import { useAppSelector } from 'renderer/store/hooks';

export const NotificationsContainer: FC<any> = () => {
  const toastState = useAppSelector((state) => state.toast);
  const toast = useToast({
    render: ({ description, status, id, ...rest }) => (
      <Notification
        type="primary"
        supportingDetail={<Text py={2}>{description}</Text>}
        key={id}
        {...rest}
        isOpen
        icon={TbAlertCircle}
        createdAt={
          <Badge variant="subtle" colorScheme="primary" fontSize={8}>
            <ReactTimeAgo date={Date.now()} />
          </Badge>
        }
      />
    ),
  });

  useEffect(() => {
    if (toastState.id && toastState.title) {
      toast({ ...toastState });
    }
  }, [toast, toastState]);

  return <></>;
};
