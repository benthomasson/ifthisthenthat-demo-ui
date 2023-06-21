import React, { FunctionComponent } from 'react';
import { TableComposable, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { Skeleton } from '@patternfly/react-core';

interface SkeletonTableProps {
  columns: string[];
  rowsCount: number;
}
const SkeletonTable: FunctionComponent<SkeletonTableProps> = ({ rowsCount, columns }) => {
  const trows = Array.from({ length: rowsCount }).map((it, index) => (
    <Tr key={index}>
      {columns.map((_column, i) => (
        <Td key={i}>
          <Skeleton width={index % 2 === 1 ? '80%' : '60%'} />
        </Td>
      ))}
    </Tr>
  ));
  return (
    <TableComposable aria-label="Loading data">
      <Thead>
        <Tr>
          {columns.map((column, index) => (
            <Th key={index}>{column}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>{trows}</Tbody>
    </TableComposable>
  );
};

export default SkeletonTable;
