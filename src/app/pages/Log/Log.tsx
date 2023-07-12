import React, { FunctionComponent } from 'react';
import { PageSection, PageSectionVariants, Text, TextContent } from '@patternfly/react-core';
import { useQuery } from '@tanstack/react-query';
import { getLog } from '@app/api/rulebookApi';
import RulebookLog from '@app/components/RulebookLog/RulebookLog';

const Log: FunctionComponent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['log'],
    queryFn: getLog,
    refetchInterval: 4000,
  });

  // removing unnecessary \n from each line
  const lines = data?.log_lines.map((line) => line.substring(0, line.length - 1)) ?? [];

  return (
    <>
      <PageSection variant={PageSectionVariants.light} isWidthLimited>
        <TextContent>
          <Text component="h1">Log</Text>
        </TextContent>
      </PageSection>
      <PageSection isFilled={true}>
        <RulebookLog lines={lines} isLoading={isLoading} />
      </PageSection>
    </>
  );
};

export default Log;
