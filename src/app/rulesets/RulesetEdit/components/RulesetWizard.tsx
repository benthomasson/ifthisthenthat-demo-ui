import React, { FunctionComponent, useContext } from 'react';
import { StateFrom } from 'xstate';
import { useSelector } from '@xstate/react';
import { Wizard, WizardStep } from '@patternfly/react-core/next';
import { RulesetEditProps } from '@app/rulesets/RulesetEdit/RulesetEdit';
import { rulesetMachineType } from '@app/rulesets/RulesetEdit/rulesetMachine';
import { RulesetStateContext } from '@app/rulesets/RulesetEdit/RulesetContextProvider';
import SourceEdit from '@app/rulesets/RulesetEdit/components/SourceEdit';
import ConditionEdit from '@app/rulesets/RulesetEdit/components/ConditionEdit';
import WizardFinalStepFooter from '@app/rulesets/RulesetEdit/components/WizardFinalStepFooter';
import ActionEdit from '@app/rulesets/RulesetEdit/components/ActionEdit';

type RulesetWizardProps = Pick<RulesetEditProps, 'onCancel'>;
const RulesetWizard: FunctionComponent<RulesetWizardProps> = (props) => {
  const { onCancel } = props;
  const rulesetServices = useContext(RulesetStateContext);
  const { send } = rulesetServices.rulesetService;
  const isSubmitted = useSelector(rulesetServices.rulesetService, submissionSelector);
  const isStepOneInvalid = useSelector(rulesetServices.rulesetService, stepOneInvalid);
  const isStepTwoInvalid = useSelector(rulesetServices.rulesetService, stepTwoInvalid);
  const isStepThreeInvalid = useSelector(rulesetServices.rulesetService, stepThreeInvalid);
  const stepOneStatus = isSubmitted && isStepOneInvalid ? 'error' : 'default';
  const stepTwoStatus = isSubmitted && isStepTwoInvalid ? 'error' : 'default';
  const stepThreeStatus = isSubmitted && isStepThreeInvalid ? 'error' : 'default';
  const isSaving = useSelector(rulesetServices.rulesetService, isSavingSelector);

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

export default RulesetWizard;

const stepOneInvalid = (state: StateFrom<rulesetMachineType>) => {
  return state.hasTag('stepOneInvalid');
};

const stepTwoInvalid = (state: StateFrom<rulesetMachineType>) => {
  return state.hasTag('stepTwoInvalid');
};

const stepThreeInvalid = (state: StateFrom<rulesetMachineType>) => {
  return state.hasTag('stepThreeInvalid');
};

const submissionSelector = (state: StateFrom<rulesetMachineType>) => {
  return state.hasTag('submitted');
};

const isSavingSelector = (state: StateFrom<rulesetMachineType>) => {
  return state.hasTag('saving');
};
