import { apiClient } from '@app/api/apiClient';
import { ActionLog, ActionType, ConditionType, EventLog, Ruleset, SourceType } from '@app/types';
import { Response } from 'redaxios';

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

export interface InventoryResponse {
  inventory: string;
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
  apiClient<EventLogResponse>('ansible-event-log').then((response) => response.data);

const getActionLog = (): Promise<ActionLogResponse> =>
  apiClient<ActionLogResponse>('action-log').then((response) => response.data);

const getInventory = (): Promise<InventoryResponse> =>
  apiClient<InventoryResponse>('inventory').then((response) => response.data);

const saveInventory = (inventory: string): Promise<Response<InventoryResponse>> => {
  return apiClient.post<InventoryResponse>('inventory', { inventory });
};

const getRulebookStatus = (): Promise<{ enabled: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ enabled: MOCKED_RULEBOOK_STATUS });
    }, 100);
  });
};

const saveRulebookStatus = (enable: boolean): Promise<Response<void>> => {
  const endpoint = enable ? 'enable' : 'disable';
  MOCKED_RULEBOOK_STATUS = enable;
  return apiClient.post(endpoint);
};

let MOCKED_RULEBOOK_STATUS = false;

export {
  getAvailableSources,
  getAvailableConditions,
  getAvailableActions,
  createRuleset,
  getRulesets,
  getLog,
  getEventLog,
  getActionLog,
  getInventory,
  saveInventory,
  getRulebookStatus,
  saveRulebookStatus,
};
