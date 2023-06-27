import React, { FunctionComponent } from 'react';
import { ActionLog } from '@app/types';
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

interface ActionLogTableProps {
  events: ActionLog[];
}
const ActionLogTable: FunctionComponent<ActionLogTableProps> = (props) => {
  const { events } = props;

  const columnNames = {
    rule: 'Rule',
    status: 'Status',
    runAt: 'Run at',
    matchingEvent: 'Matching Event',
    sourceType: 'Source Type',
    receivedAt: 'Received at',
    data: 'Data',
  };

  const getEventData = (matchingEvent: ActionLog['matching_events']) => {
    const { meta, ...rest } = matchingEvent.m;
    return rest;
  };

  const noEntries = (
    <Tr>
      <Td colSpan={6}>
        <Bullseye>
          <EmptyState variant={EmptyStateVariant.small}>
            <EmptyStateIcon icon={SearchIcon} />
            <Title headingLevel="h2" size="lg">
              No events found
            </Title>
            <EmptyStateBody>
              Once a Rule set action will be triggered, log messages will appear here.
            </EmptyStateBody>
          </EmptyState>
        </Bullseye>
      </Td>
    </Tr>
  );

  return (
    <>
      <TableComposable aria-label="event log" borders={true}>
        <Thead hasNestedHeader>
          <Tr>
            <Th rowSpan={2} hasRightBorder>
              {columnNames.rule}
            </Th>
            <Th rowSpan={2} hasRightBorder>
              {columnNames.status}
            </Th>
            <Th rowSpan={2} hasRightBorder>
              {columnNames.runAt}
            </Th>
            <Th colSpan={3}>{columnNames.matchingEvent}</Th>
          </Tr>
          <Tr resetOffset>
            <Th isSubheader>{columnNames.sourceType}</Th>
            <Th isSubheader>{columnNames.receivedAt}</Th>
            <Th isSubheader>{columnNames.data}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {events.length === 0 && noEntries}
          {events.map((row) => (
            <Tr key={row.action_uuid}>
              <Td dataLabel={columnNames.rule}>{row.rule}</Td>
              <Td dataLabel={columnNames.status}>{row.status}</Td>
              <Td dataLabel={columnNames.runAt} className={'monospaced'} modifier={'nowrap'}>
                {formatDate(row.run_at)}
              </Td>
              <Td dataLabel={columnNames.sourceType}>{row.matching_events.m.meta.source.type}</Td>
              <Td dataLabel={columnNames.receivedAt} className={'monospaced'}>
                {formatDate(row.matching_events.m.meta.received_at)}
              </Td>
              <Td dataLabel={columnNames.matchingEvent} className={'monospaced'}>
                {JSON.stringify(getEventData(row.matching_events), null, 2)}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </TableComposable>
    </>
  );
};

export default ActionLogTable;
