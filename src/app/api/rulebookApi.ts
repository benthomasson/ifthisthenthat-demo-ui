import { apiClient } from '@app/api/apiClient';
import {
  ActionLog,
  ActionType,
  ConditionType,
  EventLog,
  Rule,
  Source,
  SourceType,
} from '@app/types';
export interface SourceResponse {
  sources: Source[];
}

export interface RulesResponse {
  rules: Rule[];
}

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

const getSources = (): Promise<SourceResponse> =>
  apiClient<SourceResponse>('sources').then((response) => response.data);

const getRules = (): Promise<RulesResponse> =>
  apiClient<RulesResponse>('rules').then((response) => response.data);

const getAvailableSources = (): Promise<AvailableSourcesResponse> =>
  apiClient<AvailableSourcesResponse>('available-sources').then((response) => response.data);

const getAvailableConditions = (sourceTypeName: string): Promise<AvailableConditionsResponse> =>
  apiClient<AvailableConditionsResponse>(`available-conditions/${sourceTypeName}`).then(
    (response) => response.data
  );

const createSource = (source: Source): Promise<SourceResponse> =>
  apiClient<SourceResponse>({
    method: 'post',
    url: 'sources',
    data: source,
  }).then((response) => response.data);

const getAvailableActions = (): Promise<AvailableActionsResponse> =>
  apiClient<AvailableActionsResponse>('available-actions').then((response) => response.data);

const getLog = (): Promise<LogResponse> =>
  apiClient<LogResponse>('log').then((response) => response.data);

const getEventLog = (): Promise<EventLogResponse> =>
  apiClient<EventLogResponse>('ansible-event-log').then((response) => response.data);

const getActionLog = (): Promise<ActionLogResponse> =>
  apiClient<ActionLogResponse>('action-log').then((response) => response.data);

export {
  getSources,
  getRules,
  getAvailableSources,
  createSource,
  getAvailableConditions,
  getAvailableActions,
  getLog,
  getEventLog,
  getActionLog,
};
