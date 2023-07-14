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
import RulesetList from '@app/rulesets/RulesetList/RulesetList';
import { useQuery } from '@tanstack/react-query';
import { getRulesets } from '@app/api/rulebookApi';
import { Link } from 'react-router-dom';

const Rulesets: FunctionComponent = () => {
  const { data } = useQuery({
    queryKey: ['rulesets'],
    queryFn: getRulesets,
    refetchInterval: 4000,
  });

  const toolbar = (
    <Toolbar id="reactions-toolbar">
      <ToolbarContent>
        <ToolbarItem>
          <Link to={`${location.pathname}/create-reaction`}>
            <Button variant="primary">Create reaction</Button>
          </Link>
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Reactions</Text>
        </TextContent>
      </PageSection>
      <PageSection>
        <Card>
          <RulesetList rulesets={data?.rulesets ?? []} toolbar={toolbar} />
        </Card>
      </PageSection>
    </>
  );
};

export default Rulesets;
