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
  SplitItem,
  Split,
} from '@patternfly/react-core';
import RulesetList from '@app/rulesets/RulesetList/RulesetList';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRulebookStatus, getRulesets, saveRulebookStatus } from '@app/api/rulebookApi';
import { Link } from 'react-router-dom';
import StatusSwitch from '@app/components/StatusSwitch/StatusSwitch';

const Rulesets: FunctionComponent = () => {
  const queryClient = useQueryClient();

  const { data: rulesetsData } = useQuery({
    queryKey: ['rulesets'],
    queryFn: getRulesets,
    refetchInterval: 4000,
  });

  const { data: rulebookStatusData, isFetching: isRulebookStatusFetching } = useQuery({
    queryKey: ['rulebookStatus'],
    queryFn: getRulebookStatus,
    refetchOnWindowFocus: false,
  });

  const statusMutation = useMutation({
    mutationFn: (enable: boolean) => {
      return saveRulebookStatus(enable);
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['ruleBookStatus'] });
    },
  });

  const handleSaveRulebookStatus = (enable: boolean) => {
    statusMutation.mutate(enable);
  };

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
        <Split>
          <SplitItem isFilled={true}>
            <TextContent>
              <Text component="h1">Reactions</Text>
            </TextContent>
          </SplitItem>
          <SplitItem>
            <StatusSwitch
              isChecked={rulebookStatusData?.enabled ?? false}
              onChange={handleSaveRulebookStatus}
              isFetching={isRulebookStatusFetching}
            />
          </SplitItem>
        </Split>
      </PageSection>
      <PageSection>
        <Card>
          <RulesetList rulesets={rulesetsData?.rulesets ?? []} toolbar={toolbar} />
        </Card>
      </PageSection>
    </>
  );
};

export default Rulesets;
