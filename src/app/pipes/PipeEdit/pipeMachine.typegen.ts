// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    '': { type: '' };
    'done.invoke.getActionTypes': {
      type: 'done.invoke.getActionTypes';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.getConditionTypes': {
      type: 'done.invoke.getConditionTypes';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.getSourceTypes': {
      type: 'done.invoke.getSourceTypes';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.getActionTypes': { type: 'error.platform.getActionTypes'; data: unknown };
    'error.platform.getConditionTypes': { type: 'error.platform.getConditionTypes'; data: unknown };
    'error.platform.getSourceTypes': { type: 'error.platform.getSourceTypes'; data: unknown };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    fetchActionTypes: 'done.invoke.getActionTypes';
    fetchConditionTypes: 'done.invoke.getConditionTypes';
    fetchSourceTypes: 'done.invoke.getSourceTypes';
  };
  missingImplementations: {
    actions: never;
    services: 'fetchSourceTypes' | 'fetchConditionTypes' | 'fetchActionTypes';
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    setActionConfig: 'actionConfigChange';
    setActionType: 'actionTypeChange';
    setActionTypes: 'done.invoke.getActionTypes';
    setConditionTypes: 'done.invoke.getConditionTypes';
    setName: 'nameChange';
    setSelectedCondition: 'conditionTypeChange';
    setSelectedConditionConfig: 'conditionConfigChange';
    setSourceConfig: 'sourceConfigChange';
    setSourceType: 'sourceTypeChange';
    setSourceTypes: 'done.invoke.getSourceTypes';
  };
  eventsCausingServices: {
    fetchActionTypes: 'xstate.init';
    fetchConditionTypes: 'sourceTypeChange';
    fetchSourceTypes: 'xstate.init';
  };
  eventsCausingGuards: {
    isActionTypeValid: '';
    isNameValid: '';
    isSourceTypeValid: '';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'step one'
    | 'step one.name'
    | 'step one.name.invalid'
    | 'step one.name.valid'
    | 'step one.name.validate'
    | 'step one.source'
    | 'step one.source.fetching'
    | 'step one.source.invalid'
    | 'step one.source.valid'
    | 'step one.source.validate'
    | 'step one.sourceConfig'
    | 'step one.sourceConfig.idle'
    | 'step one.sourceConfig.invalid'
    | 'step one.sourceConfig.valid'
    | 'step one.sourceConfig.validate'
    | 'step three'
    | 'step three.actionConfig'
    | 'step three.actionConfig.idle'
    | 'step three.actionConfig.invalid'
    | 'step three.actionConfig.valid'
    | 'step three.actionConfig.validate'
    | 'step three.actionType'
    | 'step three.actionType.fetchingActions'
    | 'step three.actionType.invalid'
    | 'step three.actionType.valid'
    | 'step three.actionType.validate'
    | 'step two'
    | 'step two.fetchingConditions'
    | 'step two.isInvalid'
    | 'step two.isValid'
    | 'wizard'
    | 'wizard.idle'
    | 'wizard.submitted'
    | {
        'step one'?:
          | 'name'
          | 'source'
          | 'sourceConfig'
          | {
              name?: 'invalid' | 'valid' | 'validate';
              source?: 'fetching' | 'invalid' | 'valid' | 'validate';
              sourceConfig?: 'idle' | 'invalid' | 'valid' | 'validate';
            };
        'step three'?:
          | 'actionConfig'
          | 'actionType'
          | {
              actionConfig?: 'idle' | 'invalid' | 'valid' | 'validate';
              actionType?: 'fetchingActions' | 'invalid' | 'valid' | 'validate';
            };
        'step two'?: 'fetchingConditions' | 'isInvalid' | 'isValid';
        wizard?: 'idle' | 'submitted';
      };
  tags:
    | 'actionTypeInvalid'
    | 'actionTypeValid'
    | 'nameInvalid'
    | 'nameValid'
    | 'sourceTypeInvalid'
    | 'sourceTypeValid'
    | 'stepOneInvalid'
    | 'stepThreeInvalid'
    | 'stepTwoInvalid'
    | 'submitted';
}
