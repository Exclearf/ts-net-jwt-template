import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Layout from "./components/Layout";
import Login from "./Pages/Login/Login";
import { Provider } from "react-redux";
import store, { persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./Pages/Loading/Loading";
import ProtectedRoute from "./components/utils/ProtectedRoute";

import "./App.scss";
import "./global.css";

import { ThemeProvider } from "./Providers/ThemeProvider";
import Signup from "./Pages/Signup/SignUp";
const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
