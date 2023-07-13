import React, { FunctionComponent, useContext } from 'react';
import { useWizardContext, WizardFooterWrapper } from '@patternfly/react-core/next';
import { PipeStateContext } from '@app/pipes/PipeEdit/PipeContextProvider';
import { Button } from '@patternfly/react-core';
import { useSelector } from '@xstate/react';

const WizardFinalStepFooter: FunctionComponent = () => {
  const { goToNextStep, goToPrevStep, close } = useWizardContext();
  const pipeServices = useContext(PipeStateContext);
  const isSaving = useSelector(pipeServices.pipeService, (state) => state.hasTag('saving'));

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
