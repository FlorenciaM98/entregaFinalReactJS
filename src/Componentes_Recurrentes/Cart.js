import { Link } from "react-router-dom";

function Cart({ cartList }) {
    

    if (cartList.length === 0) {
        return (
            <div className="page_Container">
                <div>No items in the cart.</div>
            </div>
        );
    }


    return (
        <div className="page_Container">
            {cartList.map((cItem) => (
               <div key={cItem.id}>
                    {cItem.nombre}
                    <span>Category: {cItem.categoria}</span>
                    {cItem.quantity}
                </div> 
            ))}

        <Link to="../checkout">Checkout</Link>
        </div>
    )
}

export default Cart;