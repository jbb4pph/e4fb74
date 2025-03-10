import React from 'react';
import {ModalControls} from '../lib/hooks/useModal';
import {Ctx} from '../App';
import {Node} from '@xyflow/react';
import {Field} from './PrefillForm';
import {PrefillSubmenu} from './PrefillSubmenu';
import {globalForms} from '../lib/data/globalForms';
import {AvantosNodeData} from '../lib/types';

type Props = ModalControls;
type FieldMap = { [k: string]: Field[] };

/**
 * @method ConfigPrefillForm
 * Renders the "Config Prefill Form" modal window, which allows the user
 * to select a field with which to prefill another form field.
 **/
export const ConfigPrefillForm = (props: Props) => {

  const { graph } = React.useContext(Ctx);

  /**
   * @method getPrereqs
   * Recursively traverse the DAG to find prerequisite forms.
   **/
  const getPrereqs = (node: Node<AvantosNodeData>): string[] => {
    if (!graph || !node) return [];
    
    const prereqs = new Set([...node.data.prerequisites]);
    for (const p of prereqs) {
      const parent_prereqs = getPrereqs(graph.nodeMap[p]);
      parent_prereqs.forEach(p => prereqs.add(p));
    }

    return Array.from(prereqs);
  }

  const onClose = (e: React.MouseEvent) => {
    e.preventDefault();
    props.toggle();
    graph?.setSelectedField(undefined);
  }

  const [prereqs, setPrereqs] = React.useState<string[]>([]);
  const [prereqFields, setPrereqFields] = React.useState<FieldMap>({});

  React.useEffect(() => {
    if (!graph?.selectedNode || !graph?.selectedField) return;
    const prereqs = getPrereqs(graph.nodeMap[graph.selectedNode]);
    const map: FieldMap = {};
    for (const p of prereqs) {
      map[p] = graph.getSchema(p);
    }
    setPrereqFields(map);
    setPrereqs(prereqs);
  }, [graph?.selectedNode]);

  return (
    <div className="config-prefill-form modal">
      <div className="heading">
        <div>
          <h1>{"Map Field"}</h1>
          <p>{"Select data element to map."}</p>
          <p className="form-id">{graph?.selectedField?.key}</p>
        </div>
        <button className="close" onClick={onClose}></button>
      </div>
      <div className="options">
        {globalForms.map(gl => (
          <PrefillSubmenu
            key={gl.name}
            options={gl.options}
            name={gl.name}
          />
        ))}
        {prereqs.map((p: string) => {
          const options = prereqFields[p];
          if (!options) return null;
          return (
            <PrefillSubmenu
              key={p}
              options={options}
              name={graph?.nodeMap[p]?.data?.name}
            />
          );
        })}
      </div>
    </div>
  );
}

