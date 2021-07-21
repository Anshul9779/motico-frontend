import React from "react";
import Routes from "./Routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { SocketProvider } from "./context/SocketContext";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-toggle/style.css";
const peristor = persistStore(store);
const client = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={peristor}>
        <SocketProvider>
          <QueryClientProvider client={client}>
            <Routes />
          </QueryClientProvider>
        </SocketProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
