import React from "react";
import Routes from "./Routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { SocketProvider } from "./context/SocketContext";
const peristor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={peristor}>
        <SocketProvider>
          <Routes />
        </SocketProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
