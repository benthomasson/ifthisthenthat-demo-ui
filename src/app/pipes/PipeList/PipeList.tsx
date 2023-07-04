import React, { FunctionComponent } from 'react';
import { Button, EmptyState, EmptyStateBody, EmptyStateIcon, Title } from '@patternfly/react-core';
import { DataSourceIcon } from '@patternfly/react-icons';
import { Link } from 'react-router-dom';
import { Ruleset } from '@app/types';
import { TableComposable, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';

interface PipeListProps {
  pipes: Ruleset[];
}
const PipeList: FunctionComponent<PipeListProps> = (props) => {
  const { pipes } = props;

  const columnNames = {
    name: 'Name',
    source: 'Source',
    action: 'Action',
  };

  return (
    <>
      {pipes.length === 0 && (
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
      )}
      {pipes.length > 0 && (
        <TableComposable aria-label="pipes">
          <Thead>
            <Tr>
              <Th>{columnNames.name}</Th>
              <Th>{columnNames.source}</Th>
              <Th>{columnNames.action}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pipes.map((row, index) => (
              <Tr key={`${row.name}-${index}`}>
                <Td dataLabel={columnNames.name}>{row.name}</Td>
                <Td dataLabel={columnNames.source}>{row.source.source_type}</Td>
                <Td dataLabel={columnNames.action}>{row.rule.action.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      )}
    </>
  );
};

export default PipeList;
