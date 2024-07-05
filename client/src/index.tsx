import { createRoot } from 'react-dom/client';

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";
import App from "./App";
import { AlertProvider } from 'components/alert/Alert';

const container: HTMLElement | null = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const root = createRoot(container);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
       <AlertProvider>
          <App />
       </AlertProvider>
    </PersistGate>
  </Provider>
);
