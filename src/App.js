import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddProduct from "./components/AddProduct/AddProduct";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
import Order from "./components/Order/Order";
import Users from "./components/Users/Users";
import ViewProduct from "./components/ViewProduct/ViewProduct";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/product" element={<AddProduct />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/viewProduct" element={<ViewProduct />} />
          <Route path="/users" element={<Users />} />
          <Route path="/order" element={<Order />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
