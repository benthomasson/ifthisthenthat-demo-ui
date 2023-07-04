import React, { createContext, FunctionComponent } from 'react';
import { useInterpret } from '@xstate/react';
import { pipeMachine } from '@app/pipes/PipeEdit/pipeMachine';
import { InterpreterFrom } from 'xstate';
import { PipeEditProps } from '@app/pipes/PipeEdit/PipeEdit';
import { prepareRulesetRequest } from '@app/pipes/PipeEdit/pipeUtils';

export const PipeStateContext = createContext({
  pipeService: {} as InterpreterFrom<typeof pipeMachine>,
});
type PipeStateProviderProps = Pick<
  PipeEditProps,
  'getActionTypes' | 'getSourceTypes' | 'getConditionTypes' | 'createRuleset'
>;
export const PipeStateProvider: FunctionComponent<PipeStateProviderProps> = (props) => {
  const pipeService = useInterpret(pipeMachine, {
    services: {
      fetchSourceTypes: props.getSourceTypes,
      fetchConditionTypes: (context) => props.getConditionTypes(context.request.source.source_type),
      fetchActionTypes: props.getActionTypes,
      createRuleset: (context) => {
        const { request, selectedCondition } = context;
        return (send) => {
          function onSuccess(): void {
            send('createSuccess');
          }
          function onError(error: Error): void {
            console.log(error);
          }
          const data = prepareRulesetRequest(request, selectedCondition);
          props.createRuleset(data, onSuccess, onError);
        };
      },
    },
    devTools: true,
  });

  return (
    <PipeStateContext.Provider value={{ pipeService }}>{props.children}</PipeStateContext.Provider>
  );
};
