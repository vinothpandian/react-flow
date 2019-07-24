import React, { useContext } from 'react';
import ReactDraggable from 'react-draggable';
import cx from 'classnames';

import { GraphContext } from '../../GraphContext';
import { updateNodePos, setSelectedElements } from '../../state/actions';
import { isEdge } from '../../graph-utils';

const isInputTarget = (e) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.nodeName);

export default EdgeComponent => (props) => {
  const { state, dispatch } = useContext(GraphContext);
  const { data, onClick } = props;
  const selected = state.selectedElements
    .filter(e => isEdge(e))
    .find(e => e.data.source === data.source && e.data.target === data.target);
  const edgeClasses = cx('react-graph__edge', { selected });

  return (
    <g
      className={edgeClasses}
      onClick={(e) => {
        if (isInputTarget(e)) {
          return false;
        }

        dispatch(setSelectedElements({ data }));
        onClick({ data });
      }}
    >
      <EdgeComponent {...props} />
    </g>
  );
};
