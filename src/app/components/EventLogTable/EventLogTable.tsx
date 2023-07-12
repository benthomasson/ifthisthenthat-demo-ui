import React, { FunctionComponent } from 'react';
import { TableComposable, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import {
  Bullseye,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';
import { formatDate } from '@app/utils/dateUtils';
import { EventLog } from '@app/types';

interface EventLogTableProps {
  events: EventLog[];
}
const EventLogTable: FunctionComponent<EventLogTableProps> = (props) => {
  const { events } = props;

  const columnNames = {
    event: 'Event Type',
    runAt: 'Run at',
    stdout: 'Output',
  };

  const noEntries = (
    <Tr>
      <Td colSpan={3}>
        <Bullseye>
          <EmptyState variant={EmptyStateVariant.small}>
            <EmptyStateIcon icon={SearchIcon} />
            <Title headingLevel="h2" size="lg">
              No events found
            </Title>
            <EmptyStateBody>
              Once you create a Rule set, event log messages will appear here.
            </EmptyStateBody>
          </EmptyState>
        </Bullseye>
      </Td>
    </Tr>
  );
  return (
    <>
      <TableComposable aria-label="event log" borders={true}>
        <Thead>
          <Tr>
            <Th>{columnNames.event}</Th>
            <Th>{columnNames.runAt}</Th>
            <Th>{columnNames.stdout}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {events.length === 0 && noEntries}
          {events.map((row) => (
            <Tr key={row.event.uuid}>
              <Td dataLabel={columnNames.event}>{row.event.event.replace(/_/g, ' ')}</Td>
              <Td dataLabel={columnNames.runAt} modifier={'nowrap'} className={'monospaced'}>
                {formatDate(row.run_at)}
              </Td>
              <Td dataLabel={columnNames.stdout} className={'monospaced'}>
                {row.event.stdout}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </TableComposable>
    </>
  );
};

export default EventLogTable;
