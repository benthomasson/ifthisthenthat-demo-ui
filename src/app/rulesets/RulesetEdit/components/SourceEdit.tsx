import React, { FunctionComponent, useContext, useEffect, useRef } from 'react';
import {
  Form,
  FormGroup,
  FormGroupProps,
  FormSelect,
  FormSelectOption,
  TextInput,
} from '@patternfly/react-core';
import ConfigurationForm from '@app/components/ConfigurationForm/ConfigurationForm';
import { RulesetStateContext } from '@app/rulesets/RulesetEdit/RulesetContextProvider';
import { useSelector } from '@xstate/react';
import { rulesetMachineType } from '@app/rulesets/RulesetEdit/rulesetMachine';
import { StateFrom } from 'xstate';
import { ExclamationCircleIcon } from '@patternfly/react-icons';

const submissionSelector = (state: StateFrom<rulesetMachineType>) => {
  return state.hasTag('submitted');
};

const nameInvalidSelector = (state: StateFrom<rulesetMachineType>) => {
  return state.hasTag('nameInvalid');
};

const sourceTypeInvalidSelector = (state: StateFrom<rulesetMachineType>) => {
  return state.hasTag('sourceTypeInvalid');
};
const SourceEdit: FunctionComponent = () => {
  const rulesetServices = useContext(RulesetStateContext);
  const { send } = rulesetServices.rulesetService;
  const ruleName = useSelector(
    rulesetServices.rulesetService,
    (state) => state.context.request.name
  );
  const selectedSource = useSelector(
    rulesetServices.rulesetService,
    (state) => state.context.request.source
  );

  const sourceTypes = useSelector(
    rulesetServices.rulesetService,
    (state) => state.context.sourceTypes
  );
  const selectedSourceSchema = useSelector(
    rulesetServices.rulesetService,
    (state) => state.context.selectedSourceSchema
  );

  const isSubmitted = useSelector(rulesetServices.rulesetService, submissionSelector);
  const nameIsInvalid = useSelector(rulesetServices.rulesetService, nameInvalidSelector);
  const nameValidation: FormGroupProps['validated'] =
    isSubmitted && nameIsInvalid ? 'error' : 'default';
  const sourceTypeIsInvalid = useSelector(
    rulesetServices.rulesetService,
    sourceTypeInvalidSelector
  );
  const sourceTypeValidation: FormGroupProps['validated'] =
    isSubmitted && sourceTypeIsInvalid ? 'error' : 'default';

  useEffect(() => {
    if (isSubmitted) {
      validateSourceConfig.current?.();
    }
  }, [isSubmitted]);

  const validateSourceConfig = useRef<(() => boolean) | undefined>();
  const registerValidateSourceConfig = (callback: () => boolean): void => {
    validateSourceConfig.current = callback;
  };

  return (
    <Form style={{ maxWidth: 700 }}>
      <FormGroup
        label="Rule name"
        isRequired
        fieldId="rule-name"
        helperText="Name used to identify the rule."
        validated={nameValidation}
        helperTextInvalid="Rule name is mandatory"
        helperTextInvalidIcon={<ExclamationCircleIcon />}
      >
        <TextInput
          isRequired
          type="text"
          id="rule-name"
          name="rule-name"
          autoComplete="off"
          value={ruleName}
          onChange={(name) => send('nameChange', { name })}
          validated={nameValidation}
        />
      </FormGroup>
      <FormGroup
        label="Source Type"
        fieldId="source-type"
        isRequired
        helperText={'Type of source from the catalog'}
        validated={sourceTypeValidation}
        helperTextInvalid="Please select a Source Type"
        helperTextInvalidIcon={<ExclamationCircleIcon />}
      >
        <FormSelect
          value={selectedSource.source_type}
          onChange={(sourceType) => send('sourceTypeChange', { sourceType })}
          id="source-type"
          name="source-type"
          aria-label="Source type"
          validated={sourceTypeValidation}
        >
          <FormSelectOption
            key={-1}
            value={''}
            label={sourceTypes ? 'Select one' : 'Loading'}
            isPlaceholder={true}
          />
          {sourceTypes?.map((option, index) => (
            <FormSelectOption key={index} value={option.name} label={option.name} />
          ))}
        </FormSelect>
      </FormGroup>
      {selectedSource.source_type !== '' && selectedSourceSchema && (
        <>
          <ConfigurationForm
            schema={selectedSourceSchema}
            configuration={selectedSource.source_args}
            onChange={(sourceConfig) => send('sourceConfigChange', { sourceConfig })}
            registerValidation={registerValidateSourceConfig}
          />
        </>
      )}
    </Form>
  );
};

export default SourceEdit;
