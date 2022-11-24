import { FC, useEffect } from "react";
import { useAppSelector } from "renderer/store/hooks";
import { useToast } from '@chakra-ui/react';

export const NotificationsContainer: FC<any> = () => {
  const toastState = useAppSelector((state) => state.toast);
  const toast = useToast();

  useEffect(() => {
    if (toastState.id && toastState.title)  {
      toast({ ...toastState });
    }
  }, [toastState]);

  return <></>;
}
