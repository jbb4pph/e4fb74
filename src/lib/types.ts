import {Node} from "@xyflow/react";

export type Modify<T, R> = Omit<T, keyof R> & R;

export type AvantosNodeData = {
  component_id: string
  name: string
  prerequisites: string[]
  input_mapping: { [field_key: string]: string }
}

export type AvantosNode = {
  data: AvantosNodeData
  id: string;
  position: { x: number, y: number };
  type: "form" | "branch" | "trigger" | "configuration";
}

export type FieldSchema = {
  properties: { [k: string]: {
    title: string
  }}
}

export type AvantosForm = {
  $schema: string;
  custom_javascript?: string;
  description: string;
  dynamic_field_config: Record<string, object>;
  field_schema: FieldSchema;
  id: string;
  is_reusable: boolean;
  name: string;
  ui_schema?: object;
  vendor_schema?: Record<string, any>;
}

export type RawEdge = {
  source: string
  target: string
}

/**
 * @type AvantosGraph
 * Graph data from the frontendchallengeserver.
 **/
export type AvantosGraph = {
  $schema: string;
  blueprint_id: string;
  blueprint_name: string;
  branches?: {
    $schema: string;
    condition: Record<string, any>;
    created_at: string;
    created_by: string;
    description: string;
    id: string;
    name: string;
    tenant_id: string;
    updated_at: string;
    edges?: {
      source: string;
      target: string;
    }[];
  }[];
  edges?: RawEdge[];
  forms?: AvantosForm[];
  nodes?: AvantosNode[];
  status: "draft" | "published" | "historical" | "archived";
  tenant_id: string;
  triggers?: {
    $schema: string;
    created_at: string;
    id: string;
    max_retries?: number;
    name: string;
    output_mapping: Record<string, string>;
    path_template: string;
    path_template_variables: string[] | null;
    payload_template: Record<string, any>;
    payload_template_variables: string[] | null;
    query_parameter_template: Record<string, string>;
    query_parameter_template_variables: string[] | null;
    request_method: "POST" | "PUT" | "GET" | "DELETE";
    timeout_seconds?: number;
    trigger_service_id: string;
    updated_at: string;
  }[];
  version_id: string;
  version_notes: string;
  version_number: string;
};

/**
 * @type Graph
 * Internally-compatible graph data.
 **/
export type Graph = Modify<
  AvantosGraph,
  {
    nodes?: Node<AvantosNodeData>[]
  }
>;

