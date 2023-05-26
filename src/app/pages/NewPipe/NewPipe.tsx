import React, { FunctionComponent } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  PageBreadcrumb,
  PageSection,
  PageSectionTypes,
  PageSectionVariants,
  Text,
  TextContent,
} from '@patternfly/react-core';
import { Link, useHistory } from 'react-router-dom';
import PipeEdit from '@app/pipes/PipeEdit/PipeEdit';
import {
  getAvailableActions,
  getAvailableConditions,
  getAvailableSources,
} from '@app/api/rulebookApi';

const NewPipe: FunctionComponent = () => {
  const history = useHistory();
  const goToHome = () => history.push(`/`);

  return (
    <>
      <PageBreadcrumb>
        <Breadcrumb>
          <BreadcrumbItem
            render={({ className }): React.ReactNode => (
              <Link to={'/'} className={className}>
                Pipes
              </Link>
            )}
          />
          <BreadcrumbItem isActive>New Pipe</BreadcrumbItem>
        </Breadcrumb>
      </PageBreadcrumb>
      <PageSection variant={PageSectionVariants.light} isWidthLimited>
        <TextContent>
          <Text component="h1">New Pipe</Text>
        </TextContent>
      </PageSection>
      <PageSection type={PageSectionTypes.wizard} isWidthLimited>
        <PipeEdit
          getSourceTypes={getAvailableSources}
          getConditionTypes={getAvailableConditions}
          getActionTypes={getAvailableActions}
          onCancel={goToHome}
          onCreate={() => alert('TO DO')}
        />
      </PageSection>
    </>
  );
};

export default NewPipe;
