import React, { FunctionComponent, useContext, useRef } from 'react';
import { Form, FormGroup, FormSelect, FormSelectOption } from '@patternfly/react-core';
import ConfigurationForm from '@app/components/ConfigurationForm/ConfigurationForm';
import { PipeStateContext } from '@app/pipes/PipeEdit/PipeContextProvider';
import { useSelector } from '@xstate/react';

const ConditionEdit: FunctionComponent = () => {
  const pipeServices = useContext(PipeStateContext);
  const { send } = pipeServices.pipeService;

  const conditionTypes = useSelector(
    pipeServices.pipeService,
    (state) => state.context.conditionTypes
  );

  const selectedCondition = useSelector(
    pipeServices.pipeService,
    (state) => state.context.selectedCondition
  );

  const validateConditionConfiguration = useRef<(() => boolean) | undefined>();
  const registerValidateConditionConfiguration = (callback: () => boolean): void => {
    validateConditionConfiguration.current = callback;
  };
  const handleConditionChange = (name: string) => {
    const conditionType = conditionTypes?.find((condition) => condition.name === name);
    send('conditionTypeChange', { conditionType });
  };

  return (
    <Form style={{ maxWidth: 700 }}>
      <FormGroup
        label="Condition Type"
        fieldId="condition-type"
        helperText={'Condition based on the selected source type'}
      >
        <FormSelect
          value={selectedCondition.condition?.name ?? ''}
          onChange={handleConditionChange}
          id="condition-type"
          name="condition-type"
          aria-label="Condition Type"
          isDisabled={conditionTypes === undefined}
        >
          <FormSelectOption
            key={-1}
            value={''}
            label={conditionTypes ? 'Select one' : 'Select a Source Type first'}
            isPlaceholder={true}
          />
          {conditionTypes?.map((option, index) => (
            <FormSelectOption key={index} value={option.name} label={option.name} />
          ))}
        </FormSelect>
      </FormGroup>
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
