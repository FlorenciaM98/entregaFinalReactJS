import { Link, Outlet } from "react-router-dom";

import Product from "./Product";

function Store({ cartList, setCartList }) {

    return (
        <div className="page_Container">
            store titulo
            <div>
                <Link to="../cat/prevEra">Previous era</Link>
                <Link to="../cat/actEra">Recent comeback</Link>
            </div>

            <div>
                <Product cartList={cartList} setCartList={setCartList}></Product>
            </div>
            <Link to="../checkout">Checkout</Link>
        </div>
    )
}

export default Store;