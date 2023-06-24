import React, { FunctionComponent, useContext, useRef, useState } from 'react';
import { FormGroup, FormGroupProps, Select, SelectOption } from '@patternfly/react-core';
import { SelectVariant } from '@patternfly/react-core';
import { PipeStateContext } from '@app/pipes/PipeEdit/PipeContextProvider';
import { useSelector } from '@xstate/react';
import { StateFrom } from 'xstate';
import { pipeMachineType } from '@app/pipes/PipeEdit/pipeMachine';
import { ExclamationCircleIcon } from '@patternfly/react-icons';

const ConditionTypeSelect: FunctionComponent = () => {
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

  const isSubmitted = useSelector(pipeServices.pipeService, submissionSelector);
  const isConditionTypeInvalid = useSelector(
    pipeServices.pipeService,
    conditionTypeInvalidSelector
  );
  const conditionTypeValidation: FormGroupProps['validated'] =
    isSubmitted && isConditionTypeInvalid ? 'error' : 'default';

  const [isOpen, setIsOpen] = useState(false);

  const toggleRef = useRef<HTMLDivElement>(null);
  const titleId = 'condition-type';

  const onToggle = (isOpen) => {
    setIsOpen(isOpen);
  };

  const onSelect = (event, selection) => {
    const conditionType = conditionTypes?.find((condition) => condition.name === selection);
    send('conditionTypeChange', { conditionType });
    setIsOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <FormGroup
      label="Condition Type"
      fieldId="condition-type"
      helperText={'Condition based on the selected source type'}
      isRequired={true}
      validated={conditionTypeValidation}
      helperTextInvalid={'Please select an Condition Type'}
      helperTextInvalidIcon={<ExclamationCircleIcon />}
    >
      <Select
        variant={SelectVariant.single}
        placeholderText={'Select one'}
        aria-label="Select a condition type"
        onToggle={onToggle}
        toggleRef={toggleRef}
        onSelect={onSelect}
        selections={selectedCondition.condition?.name ?? ''}
        isOpen={isOpen}
        isDisabled={conditionTypes === undefined}
        aria-labelledby={titleId}
        validated={conditionTypeValidation}
      >
        <SelectOption key={-1} value={'Select one'} isPlaceholder={true} />
        <>
          {conditionTypes?.map((option, index) => (
            <SelectOption key={index} value={option.name} description={option.condition} />
          ))}
        </>
      </Select>
    </FormGroup>
  );
};

export default ConditionTypeSelect;

const conditionTypeInvalidSelector = (state: StateFrom<pipeMachineType>) => {
  return state.hasTag('conditionTypeInvalid');
};
const submissionSelector = (state: StateFrom<pipeMachineType>) => {
  return state.hasTag('submitted');
};
