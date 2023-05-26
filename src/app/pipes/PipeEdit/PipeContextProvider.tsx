import React, { createContext, FunctionComponent } from 'react';
import { useInterpret } from '@xstate/react';
import { pipeMachine } from '@app/pipes/PipeEdit/pipeMachine';
import { InterpreterFrom } from 'xstate';
import { PipeEditProps } from '@app/pipes/PipeEdit/PipeEdit';

export const PipeStateContext = createContext({
  pipeService: {} as InterpreterFrom<typeof pipeMachine>,
});
type PipeStateProviderProps = Pick<
  PipeEditProps,
  'getActionTypes' | 'getSourceTypes' | 'getConditionTypes'
>;
export const PipeStateProvider: FunctionComponent<PipeStateProviderProps> = (props) => {
  const pipeService = useInterpret(pipeMachine, {
    services: {
      fetchSourceTypes: props.getSourceTypes,
      fetchConditionTypes: (context) => props.getConditionTypes(context.request.source.source_type),
      fetchActionTypes: props.getActionTypes,
    },
    devTools: true,
  });

  return (
    <PipeStateContext.Provider value={{ pipeService }}>{props.children}</PipeStateContext.Provider>
  );
};
