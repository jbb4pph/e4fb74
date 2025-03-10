import React from 'react';
import {ModalControls} from '../lib/hooks/useModal';
import {Ctx} from '../App';
import {CircleStackIcon} from './icons/db';

type Props = ModalControls;
export type Field = {
  title?: string
  key: string
}

/**
 * @method PrefillForm
 * Renders the "Prefill Form" modal window.
 **/
export const PrefillForm = (props: Props) => {

  const { graph, configPrefillModal } = React.useContext(Ctx);

  const onClickField = (field: Field) => (e: React.MouseEvent) => {
    e.preventDefault();
    graph?.setSelectedField(field);
    configPrefillModal?.toggle(true);
  }

  const onRemoveMapping = (field: Field) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (!graph?.selectedNode) return;
    graph?.unsetInputMapping(field.key, graph.selectedNode);
  }

  const onClose = (_: React.MouseEvent) => {
    props.toggle();
    graph?.setSelectedNode(undefined);
    graph?.setSelectedField(undefined);
  }

  const [schema, setSchema] = React.useState<Field[]>([]);

  React.useEffect(() => {
    if (graph?.selectedNode) {
      setSchema(graph.getSchema(graph.selectedNode));
    }
  }, [graph?.selectedNode]);

  return (
    <div className="prefill-form modal">
      <div className="heading">
        <div>
          <h1>{"Prefill"}</h1>
          <p>{"Prefill fields for this form"}</p>
          <p className="form-id">{graph?.selectedNode}</p>
        </div>
        <div>
        </div>
        <button className="close" onClick={onClose}></button>
      </div>
      <ul>
        {schema.map((field: Field) => {
          if (!graph) return null;
          const mappings: {[f: string]: string} = (
            graph.inputMappings[graph.selectedNode??"_"]
          );
          const prefill = mappings[field.key];
          const selected = field.key === graph?.selectedField?.key;
          return (!!prefill) ? (
            <li
              key={field.key}
              onClick={onClickField(field)}
              className={"prefilled "+(selected?"selected":"")}
            >
              <div className="field-name">{field.key}</div>
              {prefill}
              <div className="remove" onClick={onRemoveMapping(field)}></div>
            </li>
          ) : (
            <li
              key={field.key}
              onClick={onClickField(field)}
              className={(selected?"selected":"")}
            >
              <CircleStackIcon />
              {field.key}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
