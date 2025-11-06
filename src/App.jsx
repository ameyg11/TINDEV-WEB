// src/App.jsx

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

import Body from "./Components/Body";
import Login from "./Components/Login";
import Feed from "./Components/Feed";
import Profile from "./Components/Profile";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests";
import Terms from "./Components/Terms"; // adjust path if needed


function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          {/* Route for the login page (does NOT use the Body layout) */}
          <Route path="/login" element={<Login />} />

          {/* All other routes are nested inside the Body layout */}
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} /> {/* 'index' sets Feed as the default child route */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
          </Route>
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;