import React, { createContext, FunctionComponent } from 'react';
import { useInterpret } from '@xstate/react';
import { rulesetMachine } from '@app/rulesets/RulesetEdit/rulesetMachine';
import { InterpreterFrom } from 'xstate';
import { RulesetEditProps } from '@app/rulesets/RulesetEdit/RulesetEdit';
import { prepareRulesetRequest } from '@app/rulesets/RulesetEdit/rulesetUtils';

export const RulesetStateContext = createContext({
  rulesetService: {} as InterpreterFrom<typeof rulesetMachine>,
});
type RulesetStateProviderProps = Pick<
  RulesetEditProps,
  'getActionTypes' | 'getSourceTypes' | 'getConditionTypes' | 'createRuleset'
>;
export const RulesetStateProvider: FunctionComponent<RulesetStateProviderProps> = (props) => {
  const rulesetService = useInterpret(rulesetMachine, {
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
    <RulesetStateContext.Provider value={{ rulesetService }}>
      {props.children}
    </RulesetStateContext.Provider>
  );
};
