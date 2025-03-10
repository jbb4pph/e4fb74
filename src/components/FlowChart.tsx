import { ReactFlow, Background, Controls, Node, Edge } from '@xyflow/react';
import {AvantosNode} from './AvantosNode';

export const nodeTypes = {
  form: AvantosNode,
};

type Props = {
  edges?: Edge[]
  nodes: Node[]
};

/**
 * @method FlowChart
 * Renders the main flow chart.
 **/
export const FlowChart = (props: Props) => {

  if (!props?.nodes) return null;
  return (
    <div className="chart-wrap">
      <div style={{ height: '100vh'}}>
        <ReactFlow
          nodes={props.nodes}
          edges={props.edges}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div> 
    </div> 
  );
}

