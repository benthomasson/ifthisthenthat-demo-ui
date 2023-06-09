import React, { FunctionComponent } from 'react';
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
  Card,
  Button,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core';
import PipeList from '@app/pipes/PipeList/PipeList';
import { useQuery } from '@tanstack/react-query';
import { getRulesets } from '@app/api/rulebookApi';
import { Link } from 'react-router-dom';

const Rulebook: FunctionComponent = () => {
  const { data } = useQuery({
    queryKey: ['rulesets'],
    queryFn: getRulesets,
    refetchInterval: 4000,
  });

  const toolbar = (
    <Toolbar id="pipes-toolbar">
      <ToolbarContent>
        <ToolbarItem>
          <Link to={`${location.pathname}/new-pipe`}>
            <Button variant="primary">New Pipe</Button>
          </Link>
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Pipes</Text>
        </TextContent>
      </PageSection>
      <PageSection>
        <Card>
          <PipeList pipes={data?.rulesets ?? []} toolbar={toolbar} />
        </Card>
      </PageSection>
    </>
  );
};

export default Rulebook;
