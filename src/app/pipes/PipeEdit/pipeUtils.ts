import { Ruleset } from '@app/types';
import { PipeMachineContext } from '@app/pipes/PipeEdit/pipeMachine';

export const prepareRulesetRequest = (
  requestData: PipeMachineContext['request'],
  selectedCondition: PipeMachineContext['selectedCondition']
): Ruleset => {
  const expression = selectedCondition.condition?.condition;
  const regex = /{([A-Za-z0-9_$]+)}/g;
  const matches = expression?.match(regex);
  let condition = expression ?? '';

  matches?.forEach((match) => {
    const name = match.slice(1, -1);
    condition = condition.replaceAll(match, selectedCondition?.configuration?.[name]);
  });

  return {
    name: requestData.name,
    source: requestData.source,
    rule: {
      name: requestData.name + '_rule',
      condition: { condition },
      action: requestData.action,
    },
  };
};
