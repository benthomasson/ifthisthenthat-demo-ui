import React, { FunctionComponent } from 'react';
import { Wizard, WizardStep } from '@patternfly/react-core/next';

import { PipeStateProvider } from '@app/pipes/PipeEdit/PipeContextProvider';
import {
  AvailableActionsResponse,
  AvailableConditionsResponse,
  AvailableSourcesResponse,
} from '@app/api/rulebookApi';
import ConditionEdit from '@app/pipes/PipeEdit/components/ConditionEdit';
import ActionEdit from '@app/pipes/PipeEdit/components/ActionEdit';
import SourceEdit from '@app/pipes/PipeEdit/components/SourceEdit';

export interface PipeEditProps {
  getSourceTypes: () => Promise<AvailableSourcesResponse>;
  getConditionTypes: (sourceType: string) => Promise<AvailableConditionsResponse>;
  getActionTypes: () => Promise<AvailableActionsResponse>;
  onCancel: () => void;
  onCreate: () => void;
}
const PipeEdit: FunctionComponent<PipeEditProps> = (props) => {
  const { getSourceTypes, getConditionTypes, getActionTypes, onCancel, onCreate } = props;
  return (
    <PipeStateProvider
      getSourceTypes={getSourceTypes}
      getConditionTypes={getConditionTypes}
      getActionTypes={getActionTypes}
    >
      <Wizard height={'100%'} title="new pipe wizard" onClose={onCancel} onSave={onCreate}>
        <WizardStep name="Name and Source" id="first-step">
          <SourceEdit />
        </WizardStep>
        <WizardStep name="Condition (optional)" id="second-step">
          <ConditionEdit />
        </WizardStep>
        <WizardStep name="Action" id="third-step" footer={{ nextButtonText: 'Create' }}>
          <ActionEdit />
        </WizardStep>
      </Wizard>
    </PipeStateProvider>
  );
};

export default PipeEdit;
