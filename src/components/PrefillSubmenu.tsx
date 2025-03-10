import React from 'react';
import {Field} from './PrefillForm';
import {ChevronDownIcon} from './icons/chevron';
import {Ctx} from '../App';

type Props = {
  options: Field[]
  name?: string
}

/**
 * @method PrefillSubmenu
 * Renders a submenu of available form fields.
 **/
export const PrefillSubmenu = (props: Props) => {

  const { graph } = React.useContext(Ctx);

  const [expand, setExpand] = React.useState(false);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setExpand(prev => !prev);
  }

  const onSelectField = (key: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (graph?.selectedNode) {
      graph.setInputMapping(props.name??"_", key, graph.selectedNode);
    }
  }

  return (
    <div className="submenu">
      <div
        className={"label "+(expand?"expand":"")}
        onClick={toggle}
      >
        <ChevronDownIcon />
        {props.name}
      </div>
      {expand && (
        <ul>
          {props.options.map(opt => (
            <li key={opt.key} onClick={onSelectField(opt.key)}>
              {opt.key}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

