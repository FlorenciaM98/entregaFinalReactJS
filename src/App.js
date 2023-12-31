import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

/* Pages */
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Store from "./Pages/Products/Store";
import CategoryDisplay from "./Pages/Products/CategoryDisplay";
import ProductDisplay from "./Pages/Products/ProductDisplay";
import Contact from "./Pages/Contact";

import Checkout from "./Pages/Products/Checkout";
import Order from "./Pages/Products/Order";

/* Components */
import Navbar from "./Componentes_Recurrentes/Navbar";
import Cart from "./Componentes_Recurrentes/Cart";

/* Media */
import "./Styles/style.scss";
import logo from "./imgs/avatarNavbar.jpg";

function App() {

  const [cartList, setCartList] = useState([]);
  let totalPrice = 0;
    
  return (
    <div className="body">
      <BrowserRouter>
        <Navbar titulo="Wonderland Store" logo={logo} />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="store" element={<Store cartList={cartList} setCartList={setCartList} />} /> 
            <Route path="cat/:catId" element={<CategoryDisplay cartList={cartList} setCartList={setCartList}/>} />
            <Route path="product/:id" element={<ProductDisplay cartList={cartList} setCartList={setCartList}/>} />
            <Route path="cart" element={<Cart cartList={cartList} totalPrice={totalPrice}/>} />
            <Route path="checkout" element={<Checkout cartList={cartList} totalPrice={totalPrice} />} />
            <Route path="order" element={ <Order />} />
          </Route>
          <Route path="*" element={<Error />} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>    
      </BrowserRouter>
    </div>
  );
}

export default App;
