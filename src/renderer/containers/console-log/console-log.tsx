import { useState } from 'react';
import { ConsoleButton } from './console-button';
import { ConsoleLogWindow } from './console-log-window';

export const ConsoleLog = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <ConsoleButton onClick={() => setIsOpen((previous) => !previous)} />
      <ConsoleLogWindow isOpen={isOpen} />
    </>
  );
};
