import { apiClient } from '@app/api/apiClient';
import { ActionLog, ActionType, ConditionType, EventLog, Ruleset, SourceType } from '@app/types';

export interface AvailableSourcesResponse {
  sources: SourceType[];
}

export interface AvailableConditionsResponse {
  conditions: ConditionType[];
}

export interface AvailableActionsResponse {
  actions: ActionType[];
}

export interface LogResponse {
  log_lines: string[];
}

export interface EventLogResponse {
  events: EventLog[];
}

export interface ActionLogResponse {
  actions: ActionLog[];
}

export interface RulesetsResponse {
  rulesets: Ruleset[];
}

const getAvailableSources = (): Promise<AvailableSourcesResponse> =>
  apiClient<AvailableSourcesResponse>('available-sources').then((response) => response.data);

const getAvailableConditions = (sourceTypeName: string): Promise<AvailableConditionsResponse> =>
  apiClient<AvailableConditionsResponse>(`available-conditions/${sourceTypeName}`).then(
    (response) => response.data
  );

const createRuleset = (
  requestData: Ruleset,
  onSuccess: () => void,
  onError: (e: Error) => void
): void => {
  apiClient({ method: 'post', url: 'ruleset', data: requestData })
    .then(() => onSuccess())
    .catch((e) => onError(e));
};

const getRulesets = (): Promise<RulesetsResponse> =>
  apiClient<RulesetsResponse>('rulesets').then((response) => response.data);

const getAvailableActions = (): Promise<AvailableActionsResponse> =>
  apiClient<AvailableActionsResponse>('available-actions').then((response) => response.data);

const getLog = (): Promise<LogResponse> =>
  apiClient<LogResponse>('log').then((response) => response.data);

const getEventLog = (): Promise<EventLogResponse> =>
  apiClient<EventLogResponse>('payloads').then((response) => response.data);

const getActionLog = (): Promise<ActionLogResponse> =>
  apiClient<ActionLogResponse>('action-log').then((response) => response.data);

export {
  getAvailableSources,
  getAvailableConditions,
  getAvailableActions,
  createRuleset,
  getRulesets,
  getLog,
  getEventLog,
  getActionLog,
};
