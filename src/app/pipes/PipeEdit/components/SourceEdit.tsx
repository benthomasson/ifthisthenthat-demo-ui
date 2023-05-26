import React, { FunctionComponent, useContext, useRef } from 'react';
import { Form, FormGroup, FormSelect, FormSelectOption, TextInput } from '@patternfly/react-core';
import ConfigurationForm from '@app/components/ConfigurationForm/ConfigurationForm';
import { PipeStateContext } from '@app/pipes/PipeEdit/PipeContextProvider';
import { useSelector } from '@xstate/react';

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

  const validateParameters = useRef<(() => boolean) | undefined>();
  const registerValidateParameters = (callback: () => boolean): void => {
    validateParameters.current = callback;
  };

  return (
    <Form style={{ maxWidth: 700 }}>
      <FormGroup
        label="Pipe Name"
        isRequired
        fieldId="pipe-name"
        helperText="Name used to identify the Pipe."
      >
        <TextInput
          isRequired
          type="text"
          id="pipe-name"
          name="pipe-name"
          autoComplete="off"
          value={pipeName}
          onChange={(name) => send('nameChange', { name })}
        />
      </FormGroup>
      <FormGroup
        label="Source Type"
        fieldId="source-type"
        isRequired
        helperText={'Type of source from the catalog'}
      >
        <FormSelect
          value={selectedSource.source_type}
          onChange={(sourceType) => send('sourceTypeChange', { sourceType })}
          id="source-type"
          name="source-type"
          aria-label="Source type"
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
            registerValidation={registerValidateParameters}
          />
        </>
      )}
    </Form>
  );
};

export default SourceEdit;
