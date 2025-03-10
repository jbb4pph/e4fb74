import React from 'react';

export type ModalControls = {
  display: boolean
  toggle: (setting?: boolean) => void
}

/**
 * @method useModal
 * A reusable hook for managing modal windows.
 **/
export const useModal = (): ModalControls => {

  const [display, setDisplay] = React.useState(false);

  const toggle = (setting?: boolean) => setDisplay(prev => setting ?? !prev);

  return {
    display,
    toggle,
  };
}

