import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

type AlertContextType = {
  showAlert: (message: string, severity: AlertProps['severity']) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertProps['severity']>('success');

  const showAlert = useCallback((message: string, severity: AlertProps['severity']) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const contextValue = useMemo(() => ({ showAlert }), [showAlert]);

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </MuiAlert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export { AlertProvider, useAlert };
