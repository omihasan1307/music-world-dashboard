import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddProduct from "./components/AddProduct/AddProduct";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Order from "./components/Order/Order";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Users from "./components/Users/Users";
import ViewProduct from "./components/ViewProduct/ViewProduct";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        >
          <Route
            path="/product"
            element={
              <RequireAuth>
                <AddProduct />
              </RequireAuth>
            }
          />
          <Route
            path="/contact"
            element={
              <RequireAuth>
                <Contact />
              </RequireAuth>
            }
          />
          <Route
            path="/viewProduct"
            element={
              <RequireAuth>
                <ViewProduct />
              </RequireAuth>
            }
          />
          <Route
            path="/users"
            element={
              <RequireAuth>
                <Users />
              </RequireAuth>
            }
          />
          <Route
            path="/order"
            element={
              <RequireAuth>
                <Order />
              </RequireAuth>
            }
          />
        </Route>

        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
