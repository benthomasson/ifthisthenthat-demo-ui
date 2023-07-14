import React, { FunctionComponent } from 'react';
import { RulesetStateProvider } from '@app/rulesets/RulesetEdit/RulesetContextProvider';
import {
  AvailableActionsResponse,
  AvailableConditionsResponse,
  AvailableSourcesResponse,
} from '@app/api/rulebookApi';
import RulesetWizard from '@app/rulesets/RulesetEdit/components/RulesetWizard';
import { Ruleset } from '@app/types';

export interface RulesetEditProps {
  getSourceTypes: () => Promise<AvailableSourcesResponse>;
  getConditionTypes: (sourceType: string) => Promise<AvailableConditionsResponse>;
  getActionTypes: () => Promise<AvailableActionsResponse>;
  createRuleset: (data: Ruleset, onSuccess: () => void, onError: (e: Error) => void) => void;
  onCancel: () => void;
}
const RulesetEdit: FunctionComponent<RulesetEditProps> = (props) => {
  const { getSourceTypes, getConditionTypes, getActionTypes, createRuleset, onCancel } = props;
  return (
    <RulesetStateProvider
      getSourceTypes={getSourceTypes}
      getConditionTypes={getConditionTypes}
      getActionTypes={getActionTypes}
      createRuleset={createRuleset}
    >
      <RulesetWizard onCancel={onCancel} />
    </RulesetStateProvider>
  );
};

export default RulesetEdit;
