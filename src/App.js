import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

/* Pages */
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Store from "./Pages/Products/Store";
import CategoryDisplay from "./Pages/Products/CategoryDisplay";
import ProductDisplay from "./Pages/Products/ProductDisplay";
import Contact from "./Pages/Contact";
import Product from "./Pages/Products/Product";
import Checkout from "./Pages/Products/Checkout";

/* Components */
import Navbar from "./Componentes_Recurrentes/Navbar";
import Cart from "./Componentes_Recurrentes/Cart";

/* Media */
import "./Styles/style.scss";
import logo from "./imgs/avatarNavbar.jpg";

function App() {

  const [cartList, setCartList] = useState([]);
    
  return (
    <div className="body">
      <BrowserRouter>
        <Navbar titulo="Wonderland Store" logo={logo} />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="store" element={<Store cartList={cartList} setCartList={setCartList} />} /> 
            <Route path="cat/:catId" element={<CategoryDisplay />} />
            <Route path="product/:id" element={<ProductDisplay />} />
            <Route path="cart" element={<Cart cartList={cartList} />} />
            <Route path="checkout" element={<Checkout cartList={cartList} />} />
          </Route>
          <Route path="*" element={<Error />} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>    
      </BrowserRouter>
    </div>
  );
}

export default App;
