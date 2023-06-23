import { assign, createMachine } from 'xstate';
import { Action, ActionType, Condition, ConditionType, Source, SourceType } from '@app/types';
import {
  AvailableActionsResponse,
  AvailableConditionsResponse,
  AvailableSourcesResponse,
} from '@app/api/rulebookApi';
import {
  createValidator,
  CreateValidator,
  validateAgainstSchema,
} from '@app/components/ConfigurationForm/validator';

interface PipeMachineContext {
  sourceTypes: SourceType[];
  conditionTypes?: ConditionType[];
  actionTypes: ActionType[];
  selectedSourceSchema?: object;
  sourceConfigValidator?: CreateValidator;
  selectedCondition: {
    condition?: ConditionType;
    configuration?: object;
    configurationValidator?: CreateValidator;
  };
  selectedActionSchema?: object;
  actionConfigValidator?: CreateValidator;
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
        | { type: 'actionConfigChange'; actionConfig: object }
        | { type: 'isActionConfigInvalid' }
        | { type: 'isActionConfigValid' }
        | { type: 'isSourceConfigInvalid' }
        | { type: 'isSourceConfigValid' }
        | { type: 'isConditionConfigInvalid' }
        | { type: 'isConditionConfigValid' }
        | { type: 'submitForm' },
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
    initial: 'step one',
    states: {
      'step one': {
        type: 'parallel',
        states: {
          source: {
            initial: 'fetching',
            states: {
              fetching: {
                invoke: {
                  id: 'getSourceTypes',
                  src: 'fetchSourceTypes',
                  onDone: {
                    actions: 'setSourceTypes',
                    target: 'validate',
                  },
                },
              },
              validate: {
                always: [
                  {
                    cond: 'isSourceTypeValid',
                    target: 'valid',
                  },
                  {
                    target: 'invalid',
                  },
                ],
              },
              invalid: {
                tags: ['sourceTypeInvalid', 'stepOneInvalid'],
              },
              valid: {
                tags: 'sourceTypeValid',
              },
            },
            on: {
              sourceTypeChange: {
                actions: 'setSourceType',
                target: ['.validate', '#pipeMachine.wizard.idle'],
              },
            },
          },
          sourceConfig: {
            initial: 'idle',
            states: {
              idle: {
                always: [{ target: 'validate', cond: 'isSourceTypeValid' }],
              },
              validate: {
                invoke: {
                  id: 'validateSourceConfig',
                  src: (context) => (callback) => {
                    const isConfigValid =
                      context.selectedSourceSchema &&
                      context.sourceConfigValidator &&
                      validateAgainstSchema(
                        context.sourceConfigValidator,
                        context.selectedSourceSchema,
                        context.request.source.source_args
                      );
                    callback(isConfigValid ? 'isSourceConfigValid' : 'isSourceConfigInvalid');
                  },
                },
                on: {
                  isSourceConfigValid: 'valid',
                  isSourceConfigInvalid: 'invalid',
                },
              },
              valid: {},
              invalid: {
                tags: ['stepOneInvalid'],
              },
            },
            on: {
              sourceConfigChange: {
                actions: 'setSourceConfig',
                target: '.validate',
              },
            },
          },
          name: {
            initial: 'validate',
            states: {
              validate: {
                always: [
                  {
                    cond: 'isNameValid',
                    target: 'valid',
                  },
                  {
                    target: 'invalid',
                  },
                ],
              },
              invalid: {
                tags: ['nameInvalid', 'stepOneInvalid'],
              },
              valid: {
                tags: 'nameValid',
              },
            },
            on: {
              nameChange: {
                actions: 'setName',
                target: '.validate',
              },
            },
          },
        },
      },
      'step two': {
        type: 'parallel',
        states: {
          conditionType: {
            initial: 'idle',
            states: {
              idle: {
                tags: 'stepTwoInvalid',
                on: {
                  sourceTypeChange: {
                    target: 'fetchingConditions',
                  },
                },
              },
              fetchingConditions: {
                invoke: {
                  id: 'getConditionTypes',
                  src: 'fetchConditionTypes',
                  onDone: {
                    actions: 'setConditionTypes',
                    target: 'validate',
                  },
                },
              },
              validate: {
                always: [
                  {
                    cond: 'isConditionTypeValid',
                    target: 'valid',
                  },
                  {
                    target: 'invalid',
                  },
                ],
              },
              invalid: {
                tags: ['conditionTypeInvalid', 'stepTwoInvalid'],
              },
              valid: {},
            },
            on: {
              sourceTypeChange: {
                target: '.fetchingConditions',
              },
              conditionTypeChange: {
                actions: 'setSelectedCondition',
                target: '.validate',
              },
            },
          },
          conditionConfig: {
            initial: 'idle',
            states: {
              idle: {
                always: [{ target: 'validate', cond: 'isConditionTypeValid' }],
              },
              validate: {
                invoke: {
                  id: 'validateConditionConfig',
                  src: (context) => (callback) => {
                    const { condition, configuration, configurationValidator } =
                      context.selectedCondition;
                    const isConfigValid =
                      condition &&
                      configurationValidator &&
                      validateAgainstSchema(
                        configurationValidator,
                        condition.schema,
                        configuration ?? {}
                      );
                    callback(isConfigValid ? 'isConditionConfigValid' : 'isConditionConfigInvalid');
                  },
                },
                on: {
                  isConditionConfigValid: 'valid',
                  isConditionConfigInvalid: 'invalid',
                },
              },
              valid: {},
              invalid: {
                tags: ['stepTwoInvalid'],
              },
            },
            on: {
              conditionConfigChange: {
                actions: 'setSelectedConditionConfig',
                target: '.validate',
              },
            },
          },
        },
      },
      'step three': {
        type: 'parallel',
        states: {
          actionType: {
            initial: 'fetchingActions',
            states: {
              fetchingActions: {
                invoke: {
                  id: 'getActionTypes',
                  src: 'fetchActionTypes',
                  onDone: {
                    actions: 'setActionTypes',
                    target: 'validate',
                  },
                },
              },
              validate: {
                always: [
                  {
                    cond: 'isActionTypeValid',
                    target: 'valid',
                  },
                  {
                    target: 'invalid',
                  },
                ],
              },
              invalid: {
                tags: ['actionTypeInvalid', 'stepThreeInvalid'],
              },
              valid: {
                tags: 'actionTypeValid',
              },
            },
            on: {
              actionTypeChange: {
                actions: 'setActionType',
                target: ['.validate', '#pipeMachine.wizard.idle'],
              },
            },
          },
          actionConfig: {
            initial: 'idle',
            states: {
              idle: {
                always: [{ target: 'validate', cond: 'isActionTypeValid' }],
              },
              validate: {
                invoke: {
                  id: 'validateActionConfig',
                  src: (context) => (callback) => {
                    const isConfigValid =
                      context.selectedActionSchema &&
                      context.actionConfigValidator &&
                      validateAgainstSchema(
                        context.actionConfigValidator,
                        context.selectedActionSchema,
                        context.request.action.module_args
                      );
                    callback(isConfigValid ? 'isActionConfigValid' : 'isActionConfigInvalid');
                  },
                },
                on: {
                  isActionConfigValid: 'valid',
                  isActionConfigInvalid: 'invalid',
                },
              },
              valid: {},
              invalid: {
                tags: ['stepThreeInvalid'],
              },
            },
            on: {
              actionConfigChange: {
                actions: 'setActionConfig',
                target: '.validate',
              },
            },
          },
        },
      },
      wizard: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              submitForm: 'submitted',
            },
          },
          submitted: {
            tags: 'submitted',
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
        const schema =
          context.sourceTypes.find((source) => source.name === sourceType)?.schema ?? {};
        return {
          selectedSourceSchema: schema,
          sourceConfigValidator: createValidator(schema),
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
            ...(conditionType
              ? {
                  condition: conditionType,
                  configurationValidator: createValidator(conditionType.schema),
                }
              : {}),
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
          actionConfigValidator: createValidator(ACTION_SCHEMA_DEMO),
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
    guards: {
      isNameValid: ({ request }) => request.name.trim().length > 0,
      isSourceTypeValid: ({ request }) => request.source.source_type.trim().length > 0,
      isConditionTypeValid: ({ selectedCondition }) => selectedCondition.condition !== undefined,
      isActionTypeValid: ({ request }) => request.action.name.trim().length > 0,
    },
  }
);

type pipeMachineType = typeof pipeMachine;

export { pipeMachine, pipeMachineType };

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
  required: ['msg', 'token'],
};
