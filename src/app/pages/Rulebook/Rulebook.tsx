import React, { FunctionComponent } from 'react';
import { PageSection, PageSectionVariants, TextContent, Text, Card } from '@patternfly/react-core';
import PipeList from '@app/pipes/PipeList/PipeList';
import { useQuery } from '@tanstack/react-query';
import { getRulesets } from '@app/api/rulebookApi';

const Rulebook: FunctionComponent = () => {
  const { data } = useQuery({
    queryKey: ['rulesets'],
    queryFn: getRulesets,
    refetchInterval: 4000,
  });

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Pipes</Text>
        </TextContent>
      </PageSection>
      <PageSection>
        <Card>
          <PipeList pipes={data?.rulesets ?? []} />
        </Card>
      </PageSection>
    </>
  );
};

export default Rulebook;
