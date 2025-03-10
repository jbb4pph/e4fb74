import React from 'react';
import './App.css';
import {FlowChart} from './components/FlowChart';
import '@xyflow/react/dist/style.css';
import {ModalControls, useModal} from './lib/hooks/useModal';
import {PrefillForm} from './components/PrefillForm';
import {GraphControls, GraphDataSource, useGraph} from './lib/hooks/useGraph';
import {ConfigPrefillForm} from './components/ConfigPrefillForm';
import {fetchGraph} from './lib/data';

/**
 * Add more data sources here.
 **/
const DATA_SOURCES: GraphDataSource[] = [
  fetchGraph("bp_456", "bpv_123", "tenant_123")
]

type Context = {
  configPrefillModal?: ModalControls
  graph?: GraphControls
  prefillModal?: ModalControls
}
export const Ctx = React.createContext<Context>({});

function App() {

  const prefillModal = useModal();
  const configPrefillModal = useModal();
  const graph = useGraph({datasources: DATA_SOURCES});

  const context = {
    prefillModal,
    configPrefillModal,
    graph
  };

  return (
    <Ctx.Provider value={context}>
      <div className="App">
        {graph?.nodes.length && (
          <FlowChart nodes={graph.nodes} edges={graph.edges} />
        )}
        {prefillModal.display && graph?.selectedNode && (
          <PrefillForm {...prefillModal} />
        )}
        {configPrefillModal.display && graph?.selectedNode && graph.selectedField && (
          <ConfigPrefillForm {...configPrefillModal} />
        )}
        <aside className="contact">
          <h1>{"Jack B. Brown"}</h1>
          <p className="loc">{"Vancouver, WA, USA"}</p>
          <p>Email: <a href={"mailto:jack@jackbrown.io"}>{"jack@jackbrown.io"}</a></p>
          <p>Phone: <span>{"(978) 398-4229"}</span></p>
        </aside>
      </div>
    </Ctx.Provider>
  );
}

export default App;
