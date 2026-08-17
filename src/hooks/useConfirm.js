import { useCallback, useRef, useState } from 'react';
import ConfirmDialog from '../components/ui/ConfirmDialog.jsx';

const useConfirm = () => {
  const resolverRef = useRef(null);
  const [state, setState] = useState({
    open: false,
    title: 'Konfirmasi',
    message: '',
    confirmLabel: 'Konfirmasi',
    cancelLabel: 'Batal',
    variant: 'primary',
  });

  const confirm = useCallback((message, options = {}) => {
    return new Promise((resolve) => {
      resolverRef.current = resolve;
      setState({
        open: true,
        title: options.title || 'Konfirmasi',
        message,
        confirmLabel: options.confirmLabel || 'Konfirmasi',
        cancelLabel: options.cancelLabel || 'Batal',
        variant: options.variant || 'primary',
      });
    });
  }, []);

  const close = useCallback((result) => {
    setState((s) => ({ ...s, open: false }));
    if (resolverRef.current) {
      resolverRef.current(result);
      resolverRef.current = null;
    }
  }, []);

  const dialog = (
    <ConfirmDialog
      open={state.open}
      title={state.title}
      message={state.message}
      confirmLabel={state.confirmLabel}
      cancelLabel={state.cancelLabel}
      variant={state.variant}
      onCancel={() => close(false)}
      onConfirm={() => close(true)}
    />
  );

  return [confirm, dialog];
};

export default useConfirm;