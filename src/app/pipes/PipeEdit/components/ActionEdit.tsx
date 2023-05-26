import React, { FunctionComponent, useContext, useRef } from 'react';
import { Form, FormGroup, FormSelect, FormSelectOption } from '@patternfly/react-core';
import ConfigurationForm from '@app/components/ConfigurationForm/ConfigurationForm';
import { PipeStateContext } from '@app/pipes/PipeEdit/PipeContextProvider';
import { useSelector } from '@xstate/react';

const ActionEdit: FunctionComponent = () => {
  const pipeServices = useContext(PipeStateContext);
  const { send } = pipeServices.pipeService;

  const actionTypes = useSelector(pipeServices.pipeService, (state) => state.context.actionTypes);

  const selectedAction = useSelector(
    pipeServices.pipeService,
    (state) => state.context.request.action
  );
  const selectedActionSchema = useSelector(
    pipeServices.pipeService,
    (state) => state.context.selectedActionSchema
  );

  const validateActionConfiguration = useRef<(() => boolean) | undefined>();
  const registerValidateActionConfiguration = (callback: () => boolean): void => {
    validateActionConfiguration.current = callback;
  };

  return (
    <Form style={{ maxWidth: 700 }}>
      <FormGroup label="Action Type" fieldId="action-type" isRequired>
        <FormSelect
          value={selectedAction?.name ?? ''}
          onChange={(value) => send('actionTypeChange', { actionType: value })}
          id="action-type"
          name="action-type"
          aria-label="Action Type"
          isDisabled={actionTypes === undefined}
        >
          <FormSelectOption
            key={-1}
            value={''}
            label={actionTypes ? 'Select one' : 'Loading'}
            isPlaceholder={true}
          />
          {actionTypes?.map((option, index) => (
            <FormSelectOption key={index} value={option.name} label={option.name} />
          ))}
        </FormSelect>
      </FormGroup>
      {selectedAction.name &&
        selectedActionSchema &&
        Object.keys(selectedActionSchema).length > 0 && (
          <ConfigurationForm
            onChange={(actionConfig) => send('actionConfigChange', { actionConfig })}
            registerValidation={registerValidateActionConfiguration}
            schema={selectedActionSchema}
            configuration={selectedAction.module_args}
          />
        )}
    </Form>
  );
};

export default ActionEdit;
