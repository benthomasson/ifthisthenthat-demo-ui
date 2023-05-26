import React, { FunctionComponent } from 'react';
import { Button, EmptyState, EmptyStateBody, EmptyStateIcon, Title } from '@patternfly/react-core';
import { DataSourceIcon } from '@patternfly/react-icons';
import { Link } from 'react-router-dom';

// @TODO: retrieve pipes

const PipeList: FunctionComponent = () => {
  return (
    <EmptyState>
      <EmptyStateIcon icon={DataSourceIcon} />
      <Title headingLevel="h1" size="lg">
        No Pipes Yet
      </Title>
      <EmptyStateBody>
        With a Pipe you can retrieve events from a Source and trigger an Action
        <br /> when a certain Condition applies.
      </EmptyStateBody>
      <EmptyStateBody>
        <Link to={`${location.pathname}/new-pipe`}>
          <Button variant="primary">New Pipe</Button>
        </Link>
      </EmptyStateBody>
    </EmptyState>
  );
};

export default PipeList;
