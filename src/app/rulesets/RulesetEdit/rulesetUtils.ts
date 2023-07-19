import { Ruleset } from '@app/types';
import { RulesetMachineContext } from '@app/rulesets/RulesetEdit/rulesetMachine';

export const prepareRulesetRequest = (
  requestData: RulesetMachineContext['request'],
  selectedCondition: RulesetMachineContext['selectedCondition']
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
    sources: [requestData.source],
    rules: [
      {
        name: requestData.name + '_rule',
        condition: { condition },
        action: requestData.action,
      },
    ],
  };
};
