import React from 'react';
import {Edge, Node} from '@xyflow/react';
import {createEdgeFromRaw} from '../createEdgeFromRaw';
import {Field} from '../../components/PrefillForm';
import {AvantosForm, AvantosNodeData, Graph} from '../types';

export type NodeMap = {
  [k: string]: Node<AvantosNodeData>
}

export type FormMap = {
  [k: string]: AvantosForm
}

export type InputMappingMap = {
  [node_id: string]: { [field_key: string]: string }
}

export type GraphDataSource = () => Promise<Graph>;

export type GraphControls = {
  edges?: Edge[]
  formMap: FormMap
  getSchema: (nodeId: string) => Field[]
  inputMappings: InputMappingMap
  nodeMap: NodeMap
  nodes: Node<AvantosNodeData>[]
  selectedField?: Field
  setInputMapping: (formKey: string, fieldKey: string, nodeId: string) => void
  setSelectedField: React.Dispatch<React.SetStateAction<Field | undefined>>
  selectedNode?: string
  setSelectedNode: React.Dispatch<React.SetStateAction<string | undefined>>
  unsetInputMapping: (field: string, nodeId: string) => void
}

type Props = {
  datasources: GraphDataSource[]
}

/**
 * @method useGraph
 * Manage data related to the directed acyclic graph (DAG).
 **/
export const useGraph = (props: Props): GraphControls => {

  const [edges, setEdges] = React.useState<Edge[]>([]);
  const [nodes, setNodes] = React.useState<Node<AvantosNodeData>[]>([]);
  const [nodeMap, setNodeMap] = React.useState<NodeMap>({});
  const [formMap, setFormMap] = React.useState<FormMap>({});
  const [selectedField, setSelectedField] = React.useState<Field>();
  const [selectedNode, setSelectedNode] = React.useState<string>();
  const [inputMappings, setInputMappings] = React.useState<InputMappingMap>({});

  const createEdges = (graph: Graph): Graph => {
    const edges = graph.edges?.map(e => createEdgeFromRaw(e));
    if (!edges) return graph;
    setEdges(prev => {
      const edgeSet = new Set(prev.map(e => e.id));
      const next = [];
      for (const e of edges) {
        if (!edgeSet.has(e.id)) next.push(e);
      }
      return [...prev, ...next];
    });
    return graph;
  }

  const createNodeMap = (graph: Graph): Graph => {
    const nodes: NodeMap = {};
    const forms: FormMap = {};
    const inputMappings: InputMappingMap = {};
    for (const node of graph.nodes??[]) {
      nodes[node.id] = node;
      inputMappings[node.id] = node.data.input_mapping ?? {}
    }
    for (const form of graph.forms??[]) {
      forms[form.id] = form;
    }
    setNodeMap(prev => {
      const next = {...prev, ...nodes}
      setNodes(Object.values(next));
      return next;
    });
    setInputMappings(prev => ({...prev, ...inputMappings}));
    setFormMap(prev => ({...prev, ...forms }));
    return graph;
  }

  /**
   * @method getSchema
   * For compiling a list of form fields for a given form/node.
   **/
  const getSchema = (nodeId: string): Field[] => {
    if (!selectedNode) return [];
    const node = nodeMap[nodeId??"_"];
    const form = formMap[node.data.component_id];
    return Object.entries(form.field_schema.properties).map(([k,v]) => ({
      title: v.title,
      key: k
    }));
  };

  /**
   * @method setInputMapping
   * For mapping form field prefills.
   **/
  const setInputMapping = (formKey: string, fieldKey: string, nodeId: string) => {
    setInputMappings(prev => ({
      ...prev,
      [nodeId]: {
        ...prev[nodeId],
        [selectedField?.key??"_"]: `${formKey}.${fieldKey}`
      }
    }));
  }

  const unsetInputMapping = (field: string, nodeId: string) => {
    setInputMappings(prev => {
      const next = {...prev[nodeId]};
      delete next[field];
      return {...prev, [nodeId]: next };
    });
  }

  React.useEffect(() => {
    Promise.all(
      props.datasources.map(fn => (
        fn()
          .then(createEdges)
          .then(createNodeMap)
          .catch(e => console.error(e))
      ))
    );
  }, []);

  return {
    edges,
    formMap,
    getSchema,
    inputMappings,
    nodeMap,
    nodes,
    selectedField,
    selectedNode,
    setInputMapping,
    setSelectedField,
    setSelectedNode,
    unsetInputMapping
  };
}

