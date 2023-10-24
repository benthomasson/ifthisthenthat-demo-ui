import React, { FunctionComponent } from 'react';
import { PageSection, PageSectionVariants, Text, TextContent } from '@patternfly/react-core';
import { useQuery } from '@tanstack/react-query';
import { getEventLog } from '@app/api/rulebookApi';
import EventLogTable from '@app/components/EventLogTable/EventLogTable';

const EventLog: FunctionComponent = () => {
  const eventLog = useQuery({
    queryKey: ['event-log'],
    queryFn: getEventLog,
    refetchInterval: 4000,
  });

  const filteredEvents = eventLog.data?.events;

  return (
    <>
      <PageSection variant={PageSectionVariants.light} isWidthLimited>
        <TextContent>
          <Text component="h1">Event Log</Text>
        </TextContent>
      </PageSection>
      <PageSection isFilled={true}>
        <EventLogTable events={filteredEvents ?? []} />
      </PageSection>
    </>
  );
};

export default EventLog;
