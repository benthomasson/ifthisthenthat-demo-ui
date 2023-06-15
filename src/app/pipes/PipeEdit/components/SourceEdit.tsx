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
import { PipeStateContext } from '@app/pipes/PipeEdit/PipeContextProvider';
import { useSelector } from '@xstate/react';
import { pipeMachineType } from '@app/pipes/PipeEdit/pipeMachine';
import { StateFrom } from 'xstate';
import { ExclamationCircleIcon } from '@patternfly/react-icons';

const submissionSelector = (state: StateFrom<pipeMachineType>) => {
  return state.hasTag('submitted');
};

const nameInvalidSelector = (state: StateFrom<pipeMachineType>) => {
  return state.hasTag('nameInvalid');
};

const sourceTypeInvalidSelector = (state: StateFrom<pipeMachineType>) => {
  return state.hasTag('sourceTypeInvalid');
};
const SourceEdit: FunctionComponent = () => {
  const pipeServices = useContext(PipeStateContext);
  const { send } = pipeServices.pipeService;
  const pipeName = useSelector(pipeServices.pipeService, (state) => state.context.request.name);
  const selectedSource = useSelector(
    pipeServices.pipeService,
    (state) => state.context.request.source
  );

  const sourceTypes = useSelector(pipeServices.pipeService, (state) => state.context.sourceTypes);
  const selectedSourceSchema = useSelector(
    pipeServices.pipeService,
    (state) => state.context.selectedSourceSchema
  );

  const isSubmitted = useSelector(pipeServices.pipeService, submissionSelector);
  const nameIsInvalid = useSelector(pipeServices.pipeService, nameInvalidSelector);
  const nameValidation: FormGroupProps['validated'] =
    isSubmitted && nameIsInvalid ? 'error' : 'default';
  const sourceTypeIsInvalid = useSelector(pipeServices.pipeService, sourceTypeInvalidSelector);
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
        label="Pipe Name"
        isRequired
        fieldId="pipe-name"
        helperText="Name used to identify the Pipe."
        validated={nameValidation}
        helperTextInvalid="Pipe Name is mandatory"
        helperTextInvalidIcon={<ExclamationCircleIcon />}
      >
        <TextInput
          isRequired
          type="text"
          id="pipe-name"
          name="pipe-name"
          autoComplete="off"
          value={pipeName}
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
