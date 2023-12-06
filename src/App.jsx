import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  redirect,
} from "react-router-dom";

import AuthPage from "./Pages/Auth";
import Home from "./Pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/todo"
          element={<Home />}
        />
        <Route
          path="/"
          element={<AuthPage />}
        />
        <Route
          path="/auth"
          element={<AuthPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
