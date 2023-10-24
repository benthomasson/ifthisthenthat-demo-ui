import React, { FunctionComponent } from 'react';
import { TableComposable, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { CodeBlock, CodeBlockCode } from '@patternfly/react-core';
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
    event: 'Event',
    timestamp: 'Timestamp',
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
            <Th>{columnNames.timestamp}</Th>
            <Th>{columnNames.event}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {events.length === 0 && noEntries}
          {events.map((row) => (
            <Tr key={row.timestamp}>
              <Td dataLabel={columnNames.timestamp} modifier={'nowrap'} className={'monospaced'}>
                {formatDate(row.timestamp)}
              </Td>
              <Td dataLabel={columnNames.event}>
    <CodeBlock>
      <CodeBlockCode>{JSON.stringify(row.event, null, 2)}</CodeBlockCode>
    </CodeBlock>
</Td>
            </Tr>
          ))}
        </Tbody>
      </TableComposable>
    </>
  );
};

export default EventLogTable;
