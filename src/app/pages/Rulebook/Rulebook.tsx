import React, { FunctionComponent } from 'react';
import { PageSection, PageSectionVariants, TextContent, Text, Card } from '@patternfly/react-core';
import PipeList from '@app/pipes/PipeList/PipeList';

const Rulebook: FunctionComponent = () => {
  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Pipes</Text>
        </TextContent>
      </PageSection>
      <PageSection>
        <Card>
          <PipeList />
        </Card>
      </PageSection>
    </>
  );
};

export default Rulebook;
