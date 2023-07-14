import React, { FunctionComponent, useContext, useEffect, useRef } from 'react';
import {
  Form,
  FormGroup,
  FormGroupProps,
  FormSelect,
  FormSelectOption,
} from '@patternfly/react-core';
import ConfigurationForm from '@app/components/ConfigurationForm/ConfigurationForm';
import { RulesetStateContext } from '@app/rulesets/RulesetEdit/RulesetContextProvider';
import { useSelector } from '@xstate/react';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import { StateFrom } from 'xstate';
import { rulesetMachineType } from '@app/rulesets/RulesetEdit/rulesetMachine';

const ActionEdit: FunctionComponent = () => {
  const rulesetServices = useContext(RulesetStateContext);
  const { send } = rulesetServices.rulesetService;

  const actionTypes = useSelector(
    rulesetServices.rulesetService,
    (state) => state.context.actionTypes
  );

  const selectedAction = useSelector(
    rulesetServices.rulesetService,
    (state) => state.context.request.action
  );
  const selectedActionSchema = useSelector(
    rulesetServices.rulesetService,
    (state) => state.context.selectedActionSchema
  );

  const isSubmitted = useSelector(rulesetServices.rulesetService, submissionSelector);
  const isSaving = useSelector(rulesetServices.rulesetService, isSavingSelector);

  const isActionTypeInvalid = useSelector(
    rulesetServices.rulesetService,
    actionTypeInvalidSelector
  );
  const actionTypeValidation: FormGroupProps['validated'] =
    isSubmitted && isActionTypeInvalid ? 'error' : 'default';

  useEffect(() => {
    if (isSubmitted) {
      validateActionConfiguration.current?.();
    }
  }, [isSubmitted]);

  const validateActionConfiguration = useRef<(() => boolean) | undefined>();
  const registerValidateActionConfiguration = (callback: () => boolean): void => {
    validateActionConfiguration.current = callback;
  };

  return (
    <Form style={{ maxWidth: 700 }}>
      <FormGroup
        label="Action Type"
        fieldId="action-type"
        isRequired
        validated={actionTypeValidation}
        helperTextInvalid="Please select an Action Type"
        helperTextInvalidIcon={<ExclamationCircleIcon />}
      >
        <FormSelect
          value={selectedAction?.name ?? ''}
          onChange={(value) => send('actionTypeChange', { actionType: value })}
          id="action-type"
          name="action-type"
          aria-label="Action Type"
          isDisabled={actionTypes === undefined || isSaving}
          validated={actionTypeValidation}
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
            readOnly={isSaving}
          />
        )}
    </Form>
  );
};

export default ActionEdit;

const submissionSelector = (state: StateFrom<rulesetMachineType>) => {
  return state.hasTag('submitted');
};

const actionTypeInvalidSelector = (state: StateFrom<rulesetMachineType>) => {
  return state.hasTag('actionTypeInvalid');
};

const isSavingSelector = (state: StateFrom<rulesetMachineType>) => {
  return state.hasTag('saving');
};
