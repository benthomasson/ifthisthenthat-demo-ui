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
