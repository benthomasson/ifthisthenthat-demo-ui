import React, { FunctionComponent } from 'react';
import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from '@patternfly/react-core';
import { GreaterThanEqualIcon } from '@patternfly/react-icons';
import { useWizardContext } from '@patternfly/react-core/next';

const ConditionPending: FunctionComponent = () => {
  const { goToPrevStep } = useWizardContext();

  return (
    <EmptyState variant={EmptyStateVariant.large}>
      <EmptyStateIcon icon={GreaterThanEqualIcon} />
      <Title headingLevel="h4" size="lg">
        Select a Source first
      </Title>
      <EmptyStateBody>
        Condition configuration depends on the selected Source. <br />
        Please go back to the first step and pick one.
      </EmptyStateBody>
      <EmptyStateBody>
        <Button variant="secondary" onClick={goToPrevStep}>
          Back to first step
        </Button>
      </EmptyStateBody>
    </EmptyState>
  );
};

export default ConditionPending;
