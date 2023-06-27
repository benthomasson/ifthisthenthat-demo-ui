export interface Source {
  source_type: string;
  source_args: object;
}

export interface Rule {
  name: string;
  action: Action;
  condition: Condition;
}

export interface Action {
  name: string;
  module_args: object;
}

export interface Condition {
  condition: string;
}

export interface SourceType {
  name: string;
  schema: object;
}

export interface ConditionType {
  name: string;
  condition: string;
  schema: object;
}

export interface ActionType {
  name: string;
  schema: object;
}

export interface EventLog {
  type: string;
  event: {
    uuid: string;
    counter: number;
    stdout: string;
    start_line: number;
    end_line: number;
    runner_ident: string;
    event: 'string';
    ad_hoc_command_id: number;
    pid: number;
    created: string;
    event_data: Record<string, unknown>;
    job_id: string;
    ansible_rulebook_id: string;
  };
  run_at: string;
}

export interface ActionLog {
  type: string;
  action: string;
  action_uuid: string;
  activation_id: string;
  playbook_name: string;
  job_id: string;
  ruleset: string;
  ruleset_uuid: string;
  rule: string;
  rule_uuid: string;
  rc: number;
  status: string;
  run_at: string;
  matching_events: {
    m: {
      meta: {
        received_at: string;
        source: {
          name: string;
          type: string;
        };
        uuid: string;
      };
      [key: string]: unknown;
    };
  };
  rule_run_at: string;
}
