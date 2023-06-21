import React, { FunctionComponent } from 'react';
import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  PageSection,
  Title,
} from '@patternfly/react-core';
import { ExclamationTriangleIcon } from '@patternfly/react-icons';
import { useHistory } from 'react-router-dom';

const GenericError: FunctionComponent = () => {
  function GoHomeBtn() {
    const history = useHistory();
    function handleClick() {
      history.push('/');
    }
    return <Button onClick={handleClick}>Take me home</Button>;
  }
  return (
    <PageSection>
      <EmptyState variant="full">
        <EmptyStateIcon icon={ExclamationTriangleIcon} />
        <Title headingLevel="h1" size="lg">
          Something went wrong
        </Title>
        <EmptyStateBody>An error occurred. Please try again later.</EmptyStateBody>
        <GoHomeBtn />
      </EmptyState>
    </PageSection>
  );
};

export default GenericError;
