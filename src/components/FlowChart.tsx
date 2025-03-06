import React from 'react';
import {fetchGraph, Graph} from '../lib/data';

export const FlowChart = () => {

  const [graph, setGraph] = React.useState<Graph>();

  React.useEffect(() => {
    const data = fetchGraph("bp_456", "bpv_123", "bpv_123")
      .then(graph => {
        setGraph(graph);
      })
      .catch(e => console.error(e));
  }, []);

  return null;
}

