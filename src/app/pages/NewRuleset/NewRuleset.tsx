import React, { FunctionComponent } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  PageBreadcrumb,
  PageSection,
  PageSectionTypes,
  PageSectionVariants,
  Text,
  TextContent,
} from '@patternfly/react-core';
import { Link, useHistory } from 'react-router-dom';
import RulesetEdit, { RulesetEditProps } from '@app/rulesets/RulesetEdit/RulesetEdit';
import {
  getAvailableActions,
  getAvailableConditions,
  getAvailableSources,
  createRuleset,
} from '@app/api/rulebookApi';

const NewRuleset: FunctionComponent = () => {
  const history = useHistory();
  const goToHome = () => history.push(`/rules`);

  const handleCreateRuleset: RulesetEditProps['createRuleset'] = (
    requestData,
    onSuccess,
    onError
  ) => {
    const handleSuccess = (): void => {
      onSuccess();
      goToHome();
    };
    createRuleset(requestData, handleSuccess, onError);
  };

  return (
    <>
      <PageBreadcrumb>
        <Breadcrumb>
          <BreadcrumbItem
            render={({ className }): React.ReactNode => (
              <Link to={'/'} className={className}>
                Rules
              </Link>
            )}
          />
          <BreadcrumbItem isActive>Create rule</BreadcrumbItem>
        </Breadcrumb>
      </PageBreadcrumb>
      <PageSection variant={PageSectionVariants.light} isWidthLimited>
        <TextContent>
          <Text component="h1">Create rule</Text>
        </TextContent>
      </PageSection>
      <PageSection type={PageSectionTypes.wizard} isWidthLimited>
        <RulesetEdit
          getSourceTypes={getAvailableSources}
          getConditionTypes={getAvailableConditions}
          getActionTypes={getAvailableActions}
          createRuleset={handleCreateRuleset}
          onCancel={goToHome}
        />
      </PageSection>
    </>
  );
};

export default NewRuleset;
