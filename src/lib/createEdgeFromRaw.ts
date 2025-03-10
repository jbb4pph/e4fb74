import { Edge } from '@xyflow/react';
import {RawEdge} from './types';

export const createEdgeFromRaw = (edge: RawEdge): Edge => {

  return {
    ...edge,
    id: `${edge.source}:${edge.target}`,
    style: { background: "blue", stroke: "#bbb", color: "green", width: '2px'},
    type: "default",
    data: {},
    hidden: false,
    selected: false,
    selectable: false
  }
}

