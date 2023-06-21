import React, { FunctionComponent } from 'react';
import { PipeStateProvider } from '@app/pipes/PipeEdit/PipeContextProvider';
import {
  AvailableActionsResponse,
  AvailableConditionsResponse,
  AvailableSourcesResponse,
} from '@app/api/rulebookApi';
import PipeWizard from '@app/pipes/PipeEdit/components/PipeWizard';

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
      <PipeWizard onCancel={onCancel} onCreate={onCreate} />
    </PipeStateProvider>
  );
};

export default PipeEdit;
