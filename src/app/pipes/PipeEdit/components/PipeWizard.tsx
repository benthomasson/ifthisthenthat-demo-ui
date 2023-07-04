import React, { FunctionComponent, useContext } from 'react';
import { StateFrom } from 'xstate';
import { useSelector } from '@xstate/react';
import { Wizard, WizardStep } from '@patternfly/react-core/next';
import { PipeEditProps } from '@app/pipes/PipeEdit/PipeEdit';
import { pipeMachineType } from '@app/pipes/PipeEdit/pipeMachine';
import { PipeStateContext } from '@app/pipes/PipeEdit/PipeContextProvider';
import SourceEdit from '@app/pipes/PipeEdit/components/SourceEdit';
import ConditionEdit from '@app/pipes/PipeEdit/components/ConditionEdit';
import WizardFinalStepFooter from '@app/pipes/PipeEdit/components/WizardFinalStepFooter';
import ActionEdit from '@app/pipes/PipeEdit/components/ActionEdit';

type PipeWizardProps = Pick<PipeEditProps, 'onCancel'>;
const PipeWizard: FunctionComponent<PipeWizardProps> = (props) => {
  const { onCancel } = props;
  const pipeServices = useContext(PipeStateContext);
  const { send } = pipeServices.pipeService;
  const isSubmitted = useSelector(pipeServices.pipeService, submissionSelector);
  const isStepOneInvalid = useSelector(pipeServices.pipeService, stepOneInvalid);
  const isStepTwoInvalid = useSelector(pipeServices.pipeService, stepTwoInvalid);
  const isStepThreeInvalid = useSelector(pipeServices.pipeService, stepThreeInvalid);
  const stepOneStatus = isSubmitted && isStepOneInvalid ? 'error' : 'default';
  const stepTwoStatus = isSubmitted && isStepTwoInvalid ? 'error' : 'default';
  const stepThreeStatus = isSubmitted && isStepThreeInvalid ? 'error' : 'default';
  const isSaving = useSelector(pipeServices.pipeService, isSavingSelector);

  const handleSubmit = () => {
    send('submitForm');
  };

  return (
    <Wizard height={'100%'} onClose={onCancel} onSave={handleSubmit}>
      <WizardStep
        name="Name and Source"
        id="first-step"
        status={stepOneStatus}
        isDisabled={isSaving}
      >
        <SourceEdit />
      </WizardStep>
      <WizardStep name="Condition" id="second-step" status={stepTwoStatus} isDisabled={isSaving}>
        <ConditionEdit />
      </WizardStep>
      <WizardStep
        name="Action"
        id="third-step"
        footer={<WizardFinalStepFooter />}
        status={stepThreeStatus}
      >
        <ActionEdit />
      </WizardStep>
    </Wizard>
  );
};

export default PipeWizard;

const stepOneInvalid = (state: StateFrom<pipeMachineType>) => {
  return state.hasTag('stepOneInvalid');
};

const stepTwoInvalid = (state: StateFrom<pipeMachineType>) => {
  return state.hasTag('stepTwoInvalid');
};

const stepThreeInvalid = (state: StateFrom<pipeMachineType>) => {
  return state.hasTag('stepThreeInvalid');
};

const submissionSelector = (state: StateFrom<pipeMachineType>) => {
  return state.hasTag('submitted');
};

const isSavingSelector = (state: StateFrom<pipeMachineType>) => {
  return state.hasTag('saving');
};
