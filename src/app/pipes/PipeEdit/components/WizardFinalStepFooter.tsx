import React, { FunctionComponent, useContext } from 'react';
import { useWizardContext, WizardFooterWrapper } from '@patternfly/react-core/next';
import { PipeStateContext } from '@app/pipes/PipeEdit/PipeContextProvider';
import { Button } from '@patternfly/react-core';

const WizardFinalStepFooter: FunctionComponent = () => {
  const { goToNextStep, goToPrevStep, close } = useWizardContext();
  const pipeServices = useContext(PipeStateContext);
  const { send } = pipeServices.pipeService;

  const onNext = () => {
    send('submitForm');
    goToNextStep();
  };
  return (
    <WizardFooterWrapper>
      <Button variant="primary" onClick={onNext}>
        Create
      </Button>
      <Button variant="secondary" onClick={goToPrevStep}>
        Back
      </Button>
      <Button variant="link" onClick={close}>
        Cancel
      </Button>
    </WizardFooterWrapper>
  );
};

export default WizardFinalStepFooter;
