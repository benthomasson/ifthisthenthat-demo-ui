import React, { FunctionComponent, useContext, useRef, useState } from 'react';
import { FormGroup, FormGroupProps, Select, SelectOption } from '@patternfly/react-core';
import { SelectVariant } from '@patternfly/react-core';
import { RulesetStateContext } from '@app/rulesets/RulesetEdit/RulesetContextProvider';
import { useSelector } from '@xstate/react';
import { StateFrom } from 'xstate';
import { rulesetMachineType } from '@app/rulesets/RulesetEdit/rulesetMachine';
import { ExclamationCircleIcon } from '@patternfly/react-icons';

const ConditionTypeSelect: FunctionComponent = () => {
  const rulesetServices = useContext(RulesetStateContext);
  const { send } = rulesetServices.rulesetService;

  const conditionTypes = useSelector(
    rulesetServices.rulesetService,
    (state) => state.context.conditionTypes
  );

  const selectedCondition = useSelector(
    rulesetServices.rulesetService,
    (state) => state.context.selectedCondition
  );

  const isSubmitted = useSelector(rulesetServices.rulesetService, submissionSelector);
  const isConditionTypeInvalid = useSelector(
    rulesetServices.rulesetService,
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

const conditionTypeInvalidSelector = (state: StateFrom<rulesetMachineType>) => {
  return state.hasTag('conditionTypeInvalid');
};
const submissionSelector = (state: StateFrom<rulesetMachineType>) => {
  return state.hasTag('submitted');
};
