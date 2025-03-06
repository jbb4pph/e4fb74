import React from 'react';
import {Branch, fetchGraph, Graph} from '../lib/data';
import { ReactFlow, Background, Controls } from '@xyflow/react';

export const FlowChart = () => {

  const [graph, setGraph] = React.useState<Graph>();

  React.useEffect(() => {
    const data = fetchGraph("bp_456", "bpv_123", "bpv_123")
      .then(graph => {
        setGraph({
          ...graph,
          nodes: graph.nodes?.map(n => ({
            ...n,
            data: {
              ...n.data,
              label: n.data.name
            },
            position: { ...n.position, x: n.position.x - 1000 }
          }))
        });
      })
      .catch(e => console.error(e));
  }, []);

  console.log(graph)
  if (!graph?.nodes) return null;
  return (
    <div className="chart-wrap">
      <aside>

      </aside>
      <div style={{ height: '100vh'}}>
        <ReactFlow nodes={graph.nodes}>
          <Background />
          <Controls />
        </ReactFlow>
      </div> 
    </div> 
  );
}

