import { assign, createMachine } from 'xstate';
import { Action, ActionType, Condition, ConditionType, Source, SourceType } from '@app/types';
import {
  AvailableActionsResponse,
  AvailableConditionsResponse,
  AvailableSourcesResponse,
} from '@app/api/rulebookApi';

interface PipeMachineContext {
  sourceTypes: SourceType[];
  conditionTypes?: ConditionType[];
  actionTypes: ActionType[];
  selectedSourceSchema?: object;
  selectedCondition: {
    condition?: ConditionType;
    configuration?: object;
  };
  selectedActionSchema?: object;
  request: {
    name: string;
    source: Source;
    condition?: Condition;
    action: Action;
  };
}

const pipeMachine = createMachine(
  {
    id: 'pipeMachine',
    preserveActionOrder: true,
    predictableActionArguments: true,
    tsTypes: {} as import('./pipeMachine.typegen').Typegen0,
    schema: {
      context: {} as PipeMachineContext,
      events: {} as
        | { type: 'nameChange'; name: string }
        | { type: 'sourceTypeChange'; sourceType: string }
        | { type: 'sourceConfigChange'; sourceConfig: object }
        | { type: 'conditionTypeChange'; conditionType: ConditionType }
        | { type: 'conditionConfigChange'; conditionConfig: object }
        | { type: 'actionTypeChange'; actionType: string }
        | { type: 'actionConfigChange'; actionConfig: object },
      services: {} as {
        fetchSourceTypes: {
          data: AvailableSourcesResponse;
        };
        fetchConditionTypes: {
          data: AvailableConditionsResponse;
        };
        fetchActionTypes: {
          data: AvailableActionsResponse;
        };
      },
    },
    context: {
      sourceTypes: [],
      selectedCondition: {},
      actionTypes: [],
      request: {
        name: '',
        source: {
          source_type: '',
          source_args: {},
        },
        action: {
          name: '',
          module_args: {},
        },
      },
    },
    initial: 'Step one',
    states: {
      'Step one': {
        initial: 'fetching',
        states: {
          fetching: {
            invoke: {
              id: 'getSourceTypes',
              src: 'fetchSourceTypes',
              onDone: {
                actions: 'setSourceTypes',
                target: 'isInvalid',
              },
            },
          },
          isInvalid: {},
          isValid: {},
        },
        on: {
          nameChange: {
            actions: 'setName',
          },
          sourceTypeChange: {
            actions: 'setSourceType',
          },
          sourceConfigChange: {
            actions: 'setSourceConfig',
          },
        },
      },
      'Step two': {
        initial: 'isInvalid',
        states: {
          isInvalid: {},
          isValid: {},
          fetchingConditions: {
            invoke: {
              id: 'getConditionTypes',
              src: 'fetchConditionTypes',
              onDone: {
                actions: 'setConditionTypes',
                target: 'isInvalid',
              },
            },
          },
        },
        on: {
          sourceTypeChange: {
            target: 'Step two.fetchingConditions',
          },
          conditionTypeChange: {
            actions: 'setSelectedCondition',
          },
          conditionConfigChange: {
            actions: 'setSelectedConditionConfig',
          },
        },
      },
      'Step three': {
        initial: 'fetchingActions',
        states: {
          isInvalid: {},
          isValid: {},
          fetchingActions: {
            invoke: {
              id: 'getActionTypes',
              src: 'fetchActionTypes',
              onDone: {
                actions: 'setActionTypes',
                target: 'isInvalid',
              },
            },
          },
        },
        on: {
          actionTypeChange: {
            actions: 'setActionType',
          },
          actionConfigChange: {
            actions: 'setActionConfig',
          },
        },
      },
    },
    type: 'parallel',
  },
  {
    actions: {
      setName: assign((context, { name }) => {
        return {
          request: {
            ...context.request,
            name,
          },
        };
      }),
      setSourceType: assign((context, { sourceType }) => {
        const schema = context.sourceTypes.find((source) => source.name === sourceType)?.schema;
        return {
          selectedSourceSchema: schema,
          request: {
            ...context.request,
            source: {
              ...context.request.source,
              source_type: sourceType,
            },
          },
        };
      }),
      setSourceConfig: assign((context, { sourceConfig }) => {
        return {
          request: {
            ...context.request,
            source: {
              ...context.request.source,
              source_args: sourceConfig,
            },
          },
        };
      }),
      setSourceTypes: assign((_context, event) => {
        return {
          sourceTypes: event.data.sources,
        };
      }),
      setConditionTypes: assign((_context, event) => {
        return {
          conditionTypes: event.data.conditions,
        };
      }),
      setSelectedCondition: assign((context, { conditionType }) => {
        return {
          selectedCondition: {
            condition: conditionType,
          },
        };
      }),
      setSelectedConditionConfig: assign((context, { conditionConfig }) => {
        return {
          selectedCondition: {
            ...context.selectedCondition,
            configuration: conditionConfig,
          },
        };
      }),
      setActionTypes: assign((_context, event) => {
        return {
          actionTypes: event.data.actions,
        };
      }),
      setActionType: assign((context, { actionType }) => {
        // the slack schema coming from APIs has issues, hard-coding one to prevent the form from breaking
        // const schema = context.actionTypes.find((action) => action.name === actionType)?.schema;
        return {
          selectedActionSchema: ACTION_SCHEMA_DEMO,
          request: {
            ...context.request,
            action: {
              name: actionType,
              module_args: {},
            },
          },
        };
      }),
      setActionConfig: assign((context, { actionConfig }) => {
        return {
          request: {
            ...context.request,
            action: {
              ...context.request.action,
              module_args: actionConfig,
            },
          },
        };
      }),
    },
  }
);

export { pipeMachine };

const ACTION_SCHEMA_DEMO = {
  type: 'object',
  properties: {
    msg: {
      type: 'string',
      description: 'The message to send',
    },
    token: {
      type: 'string',
      description: 'Token to use with slack',
    },
  },
};
