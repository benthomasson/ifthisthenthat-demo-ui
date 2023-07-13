import React, { FunctionComponent } from 'react';
import { PipeStateProvider } from '@app/pipes/PipeEdit/PipeContextProvider';
import {
  AvailableActionsResponse,
  AvailableConditionsResponse,
  AvailableSourcesResponse,
} from '@app/api/rulebookApi';
import PipeWizard from '@app/pipes/PipeEdit/components/PipeWizard';
import { Ruleset } from '@app/types';

export interface PipeEditProps {
  getSourceTypes: () => Promise<AvailableSourcesResponse>;
  getConditionTypes: (sourceType: string) => Promise<AvailableConditionsResponse>;
  getActionTypes: () => Promise<AvailableActionsResponse>;
  createRuleset: (data: Ruleset, onSuccess: () => void, onError: (e: Error) => void) => void;
  onCancel: () => void;
}
const PipeEdit: FunctionComponent<PipeEditProps> = (props) => {
  const { getSourceTypes, getConditionTypes, getActionTypes, createRuleset, onCancel } = props;
  return (
    <PipeStateProvider
      getSourceTypes={getSourceTypes}
      getConditionTypes={getConditionTypes}
      getActionTypes={getActionTypes}
      createRuleset={createRuleset}
    >
      <PipeWizard onCancel={onCancel} />
    </PipeStateProvider>
  );
};

export default PipeEdit;
