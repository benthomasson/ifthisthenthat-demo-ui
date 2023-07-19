import React, { FunctionComponent, useContext } from 'react';
import { useWizardContext, WizardFooterWrapper } from '@patternfly/react-core/next';
import { RulesetStateContext } from '@app/rulesets/RulesetEdit/RulesetContextProvider';
import { Button } from '@patternfly/react-core';
import { useSelector } from '@xstate/react';

const WizardFinalStepFooter: FunctionComponent = () => {
  const { goToNextStep, goToPrevStep, close } = useWizardContext();
  const rulesetServices = useContext(RulesetStateContext);
  const isSaving = useSelector(rulesetServices.rulesetService, (state) => state.hasTag('saving'));

  const onNext = () => {
    goToNextStep();
  };
  return (
    <WizardFooterWrapper>
      <Button variant="primary" onClick={onNext} isLoading={isSaving} isDisabled={isSaving}>
        Create
      </Button>
      <Button variant="secondary" onClick={goToPrevStep} isDisabled={isSaving}>
        Back
      </Button>
      <Button variant="link" onClick={close} isDisabled={isSaving}>
        Cancel
      </Button>
    </WizardFooterWrapper>
  );
};

export default WizardFinalStepFooter;
