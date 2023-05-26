import React, { useRef } from 'react';
import { AutoField } from 'uniforms-patternfly/dist/es6';
import { AutoForm, ValidatedQuickForm, context } from 'uniforms';
import { createValidator } from '@app/components/ConfigurationForm/validator';
import { CustomJsonSchemaBridge } from '@app/components/ConfigurationForm/CustomJsonSchemaBridge';

interface ConfigurationFormProps {
  configuration?: object;
  onChange: (model: any) => void;
  registerValidation: (validationFunction: () => boolean) => void;
  schema: object;
  readOnly?: boolean;
}

const ConfigurationForm = (props: ConfigurationFormProps): JSX.Element => {
  const { configuration = {}, onChange, registerValidation, schema, readOnly = false } = props;

  const schemaValidator = createValidator(schema);
  const bridge = new CustomJsonSchemaBridge(schema, schemaValidator, false, false);

  const newRef = useRef<any>();

  const validate = (): boolean => {
    newRef.current?.submit();
    const errors = schemaValidator(configuration);
    return errors === null;
  };

  registerValidation(validate);

  return (
    <DynamicForm
      validate={'onChangeAfterSubmit'}
      schema={bridge}
      model={configuration}
      onChangeModel={onChange}
      ref={(ref: any): void => (newRef.current = ref)}
      disabled={readOnly}
    >
      {Object.keys(bridge.schema.properties as { [key: string]: unknown }).map((key) => (
        <AutoField key={key} name={key} disabled={readOnly} />
      ))}
    </DynamicForm>
  );
};

export default ConfigurationForm;

function Auto(parent: any): any {
  class _ extends AutoForm.Auto(parent) {
    static Auto = Auto;
    onChange(key: string, value: unknown): any {
      if (value === '') return super.onChange(key, undefined);
      super.onChange(key, value);
    }
    render(): any {
      const ctx: any = this.getContext();

      return (
        <context.Provider value={ctx}>
          <section
            className="pf-c-form__section"
            style={{ marginTop: 0 }}
            {...this.getNativeFormProps()}
          />
        </context.Provider>
      );
    }
  }
  return _;
}
const DynamicForm = Auto(ValidatedQuickForm);
