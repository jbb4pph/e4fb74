import React from 'react';
import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import {Ctx} from '../App';
import {TableCellsIcon} from './icons/table';

type N = Node<
  { label: string },
  'form'
>;

/**
 * @method AvantosNode
 * Renders a clickable node on the DAG. Clicking a node opens the
 * "Prefill Form" modal window.
 **/
export const AvantosNode = (props: NodeProps<N>) => {

  const { prefillModal, graph } = React.useContext(Ctx);

  const onClickNode = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    graph?.setSelectedNode(props.id);
    prefillModal?.toggle(true);
  }

  return (
    <div className="avantos-form-node nodrag" onClick={onClickNode}>
      <Handle type="target" position={Position.Left} />
      <div className="icon"><TableCellsIcon /></div>
      <div className="text">
        <div className="type-label">{"Form"}</div>
        <div className="form-label">{props.data.label}</div>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

