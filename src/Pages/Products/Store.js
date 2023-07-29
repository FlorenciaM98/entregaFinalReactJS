import { Link, Outlet } from "react-router-dom";

import Product from "./Product";

function Store({ cartList, setCartList }) {

    return (
        <div className="page_Container-components">
            <div className="store-header">
                <div className="store-title">Store</div>
                <div className="store-links">
                    <Link to="../cat/prevEra">Previous era</Link>
                    <Link to="../cat/actEra">Recent comeback</Link>
                </div>
            </div>
                <Product cartList={cartList} setCartList={setCartList}></Product>
            <div className="link-checkout">
                <Link to="../checkout">Checkout</Link>
            </div> 
        </div>
    )
}

export default Store;