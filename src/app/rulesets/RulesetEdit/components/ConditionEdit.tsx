import React, { FunctionComponent, useContext, useEffect, useRef } from 'react';
import { Form } from '@patternfly/react-core';
import ConfigurationForm from '@app/components/ConfigurationForm/ConfigurationForm';
import { RulesetStateContext } from '@app/rulesets/RulesetEdit/RulesetContextProvider';
import { useSelector } from '@xstate/react';
import ConditionTypeSelect from '@app/rulesets/RulesetEdit/components/ConditionTypeSelect';
import { StateFrom } from 'xstate';
import { rulesetMachineType } from '@app/rulesets/RulesetEdit/rulesetMachine';
import ConditionPending from '@app/rulesets/RulesetEdit/components/ConditionPending';

const ConditionEdit: FunctionComponent = () => {
  const rulesetServices = useContext(RulesetStateContext);
  const { send } = rulesetServices.rulesetService;

  const selectedCondition = useSelector(
    rulesetServices.rulesetService,
    (state) => state.context.selectedCondition
  );

  const isSubmitted = useSelector(rulesetServices.rulesetService, submissionSelector);
  const isConditionIdle = useSelector(rulesetServices.rulesetService, idleConditionSelector);

  const validateConditionConfiguration = useRef<(() => boolean) | undefined>();
  const registerValidateConditionConfiguration = (callback: () => boolean): void => {
    validateConditionConfiguration.current = callback;
  };

  useEffect(() => {
    if (isSubmitted) {
      validateConditionConfiguration.current?.();
    }
  }, [isSubmitted]);

  return (
    <Form style={{ maxWidth: 700 }}>
      {isConditionIdle ? <ConditionPending /> : <ConditionTypeSelect />}

      {selectedCondition?.condition?.schema &&
        Object.keys(selectedCondition.condition.schema).length > 0 && (
          <ConfigurationForm
            onChange={(conditionConfig) => send('conditionConfigChange', { conditionConfig })}
            registerValidation={registerValidateConditionConfiguration}
            schema={selectedCondition.condition.schema}
            configuration={selectedCondition.configuration}
          />
        )}
    </Form>
  );
};

export default ConditionEdit;

const submissionSelector = (state: StateFrom<rulesetMachineType>) => {
  return state.hasTag('submitted');
};

const idleConditionSelector = (state: StateFrom<rulesetMachineType>) => {
  return state.matches('step two.conditionType.idle');
};
