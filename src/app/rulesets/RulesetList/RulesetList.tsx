import React, { FunctionComponent } from 'react';
import { Button, EmptyState, EmptyStateBody, EmptyStateIcon, Title } from '@patternfly/react-core';
import { DataSourceIcon } from '@patternfly/react-icons';
import { Link } from 'react-router-dom';
import { Ruleset } from '@app/types';
import { TableComposable, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';

interface RulesetListProps {
  rulesets: Ruleset[];
  toolbar?: React.ReactNode;
}
const RulesetList: FunctionComponent<RulesetListProps> = (props) => {
  const { rulesets, toolbar } = props;

  const columnNames = {
    name: 'Name',
    source: 'Source',
    action: 'Action',
  };

  return (
    <>
      {rulesets.length === 0 && (
        <EmptyState>
          <EmptyStateIcon icon={DataSourceIcon} />
          <Title headingLevel="h1" size="lg">
            No Rule Sets Yet
          </Title>
          <EmptyStateBody>
            With a rule set you can retrieve events from a Source and trigger an Action
            <br /> when a certain Condition applies.
          </EmptyStateBody>
          <EmptyStateBody>
            <Link to={`${location.pathname}/create-ruleset`}>
              <Button variant="primary">Create rule set</Button>
            </Link>
          </EmptyStateBody>
        </EmptyState>
      )}
      {rulesets.length > 0 && (
        <>
          {toolbar}
          <TableComposable aria-label="Rule sets">
            <Thead>
              <Tr>
                <Th>{columnNames.name}</Th>
                <Th>{columnNames.source}</Th>
                <Th>{columnNames.action}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rulesets.map((row, index) => (
                <Tr key={`${row.name}-${index}`}>
                  <Td dataLabel={columnNames.name}>{row.name}</Td>
                  <Td dataLabel={columnNames.source}>{row.sources[0]?.source_type}</Td>
                  <Td dataLabel={columnNames.action}>{row.rules[0]?.action.name}</Td>
                </Tr>
              ))}
            </Tbody>
          </TableComposable>
        </>
      )}
    </>
  );
};

export default RulesetList;
