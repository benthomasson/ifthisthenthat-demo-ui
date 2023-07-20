import React, { FunctionComponent, useEffect, useState } from 'react';
import { Switch } from '@patternfly/react-core';

interface StatusSwitchProps {
  isChecked: boolean;
  isFetching: boolean;
  onChange: (checked: boolean) => void;
}
const StatusSwitch: FunctionComponent<StatusSwitchProps> = (props) => {
  const { isChecked, isFetching, onChange } = props;
  const [status, setStatus] = useState(isChecked);

  const handleChange = (checked: boolean) => {
    // doing an optimistic update here before the change takes effect
    setStatus(checked);
    onChange(checked);
  };

  useEffect(() => {
    setStatus(isChecked);
  }, [isChecked]);

  return (
    <Switch
      id="reactions-status"
      label="Reactions enabled"
      labelOff="Reactions disabled"
      isChecked={status}
      onChange={handleChange}
      isDisabled={isFetching}
      isReversed
    />
  );
};

export default StatusSwitch;
