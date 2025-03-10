import {AvantosGraph, Graph} from "../types";
import {fetchData} from "./fetchData";

/**
 * @method processAvantosGraph
 * Input Avantos graph data, output internally-compatible data.
 **/
export const processAvantosGraph = (data: AvantosGraph): Graph => {
  return {
    ...data,
    nodes: data.nodes?.map(n => ({
      ...n,
      className: "avantos-node",
      data: {
        ...n.data,
        label: n.data.name
      }
    }))
  };
}

export const fetchGraph = (
  blueprint: string,
  version: string,
  tenant: string
) => async (): Promise<Graph> => {

  const url = `/api/v1/${tenant}/actions/blueprints/${blueprint}:${version}/graph`;
  return await fetchData<AvantosGraph>(url)
    .then((graph: AvantosGraph) => {
      return processAvantosGraph(graph);
    });
}

