import { WithErrorComponent } from 'renderer/containers/error';

import { SettingsTabs } from './settings-tabs';

export const Settings = () => (
  <WithErrorComponent>
    <SettingsTabs />
  </WithErrorComponent>
);

export default Settings;
