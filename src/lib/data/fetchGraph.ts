import {fetchData} from "./fetchData";

export type Graph = {
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
    };
  };
  forms?: {
    $schema: string;
    custom_javascript?: string;
    description: string;
    dynamic_field_config: Record<string, object>;
    field_schema: object;
    id: string;
    is_reusable: boolean;
    name: string;
    ui_schema?: object;
    vendor_schema?: Record<string, any>;
  };

  nodes?: {
    data: object;
    id: string;
    position: object;
    type: "form" | "branch" | "trigger" | "configuration";
  };
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
  };
  version_id: string;
  version_notes: string;
  version_number: string;
};


export const fetchGraph = async (
  blueprint: string,
  version: string,
  tenant: string
): Promise<Graph> => {

  const url = `/api/v1/${tenant}/actions/blueprints/${blueprint}:${version}/graph`;
  return await fetchData(url)
    .then(response => {
      return response.result;
    });
}

