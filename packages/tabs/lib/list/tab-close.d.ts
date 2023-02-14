import { FC } from 'react';

type TabCloseProperties = {
    onClose: () => void;
};
declare const TabClose: FC<TabCloseProperties>;

export { TabClose, TabCloseProperties };
