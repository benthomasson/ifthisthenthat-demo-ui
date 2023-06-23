import React, { FunctionComponent, useContext, useEffect, useRef } from 'react';
import { Form } from '@patternfly/react-core';
import ConfigurationForm from '@app/components/ConfigurationForm/ConfigurationForm';
import { PipeStateContext } from '@app/pipes/PipeEdit/PipeContextProvider';
import { useSelector } from '@xstate/react';
import ConditionTypeSelect from '@app/pipes/PipeEdit/components/ConditionTypeSelect';
import { StateFrom } from 'xstate';
import { pipeMachineType } from '@app/pipes/PipeEdit/pipeMachine';
import ConditionPending from '@app/pipes/PipeEdit/components/ConditionPending';

const ConditionEdit: FunctionComponent = () => {
  const pipeServices = useContext(PipeStateContext);
  const { send } = pipeServices.pipeService;

  const selectedCondition = useSelector(
    pipeServices.pipeService,
    (state) => state.context.selectedCondition
  );

  const isSubmitted = useSelector(pipeServices.pipeService, submissionSelector);
  const isConditionIdle = useSelector(pipeServices.pipeService, idleConditionSelector);

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

const submissionSelector = (state: StateFrom<pipeMachineType>) => {
  return state.hasTag('submitted');
};

const idleConditionSelector = (state: StateFrom<pipeMachineType>) => {
  return state.matches('step two.conditionType.idle');
};
