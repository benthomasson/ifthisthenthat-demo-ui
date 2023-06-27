import React, { FunctionComponent } from 'react';
import { PageSection, PageSectionVariants, Text, TextContent } from '@patternfly/react-core';
import { useQuery } from '@tanstack/react-query';
import { getActionLog } from '@app/api/rulebookApi';
import ActionLogTable from '@app/components/ActionLogTable/ActionLogTable';

const ActionLog: FunctionComponent = () => {
  const actionLog = useQuery({
    queryKey: ['action-log'],
    queryFn: getActionLog,
    refetchInterval: 4000,
  });

  return (
    <>
      <PageSection variant={PageSectionVariants.light} isWidthLimited>
        <TextContent>
          <Text component="h1">Action Log</Text>
        </TextContent>
      </PageSection>
      <PageSection isFilled={true}>
        <ActionLogTable events={actionLog.data?.actions ?? []} />
      </PageSection>
    </>
  );
};

export default ActionLog;
