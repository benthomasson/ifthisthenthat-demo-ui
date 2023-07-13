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
    'done.invoke.saveRuleset': {
      type: 'done.invoke.saveRuleset';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.getActionTypes': { type: 'error.platform.getActionTypes'; data: unknown };
    'error.platform.getConditionTypes': { type: 'error.platform.getConditionTypes'; data: unknown };
    'error.platform.getSourceTypes': { type: 'error.platform.getSourceTypes'; data: unknown };
    'error.platform.saveRuleset': { type: 'error.platform.saveRuleset'; data: unknown };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    createRuleset: 'done.invoke.saveRuleset';
    fetchActionTypes: 'done.invoke.getActionTypes';
    fetchConditionTypes: 'done.invoke.getConditionTypes';
    fetchSourceTypes: 'done.invoke.getSourceTypes';
  };
  missingImplementations: {
    actions: never;
    services: 'fetchSourceTypes' | 'fetchConditionTypes' | 'fetchActionTypes' | 'createRuleset';
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
    createRuleset: 'submitForm';
    fetchActionTypes: 'xstate.init';
    fetchConditionTypes: 'sourceTypeChange';
    fetchSourceTypes: 'xstate.init';
  };
  eventsCausingGuards: {
    isActionTypeValid: '';
    isConditionTypeValid: '';
    isFormValid: 'submitForm';
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
    | 'step two.conditionConfig'
    | 'step two.conditionConfig.idle'
    | 'step two.conditionConfig.invalid'
    | 'step two.conditionConfig.valid'
    | 'step two.conditionConfig.validate'
    | 'step two.conditionType'
    | 'step two.conditionType.fetchingConditions'
    | 'step two.conditionType.idle'
    | 'step two.conditionType.invalid'
    | 'step two.conditionType.valid'
    | 'step two.conditionType.validate'
    | 'wizard'
    | 'wizard.idle'
    | 'wizard.saved'
    | 'wizard.saving'
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
        'step two'?:
          | 'conditionConfig'
          | 'conditionType'
          | {
              conditionConfig?: 'idle' | 'invalid' | 'valid' | 'validate';
              conditionType?: 'fetchingConditions' | 'idle' | 'invalid' | 'valid' | 'validate';
            };
        wizard?: 'idle' | 'saved' | 'saving' | 'submitted';
      };
  tags:
    | 'actionTypeInvalid'
    | 'actionTypeValid'
    | 'conditionTypeInvalid'
    | 'nameInvalid'
    | 'nameValid'
    | 'saving'
    | 'sourceTypeInvalid'
    | 'sourceTypeValid'
    | 'stepOneInvalid'
    | 'stepThreeInvalid'
    | 'stepTwoInvalid'
    | 'submitted';
}
