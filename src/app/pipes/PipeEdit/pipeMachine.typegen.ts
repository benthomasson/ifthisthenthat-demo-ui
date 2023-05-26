// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
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
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | 'Step one'
    | 'Step one.fetching'
    | 'Step one.isInvalid'
    | 'Step one.isValid'
    | 'Step three'
    | 'Step three.fetchingActions'
    | 'Step three.isInvalid'
    | 'Step three.isValid'
    | 'Step two'
    | 'Step two.fetchingConditions'
    | 'Step two.isInvalid'
    | 'Step two.isValid'
    | {
        'Step one'?: 'fetching' | 'isInvalid' | 'isValid';
        'Step three'?: 'fetchingActions' | 'isInvalid' | 'isValid';
        'Step two'?: 'fetchingConditions' | 'isInvalid' | 'isValid';
      };
  tags: never;
}
