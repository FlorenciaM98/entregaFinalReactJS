import { Link } from "react-router-dom";

function Cart({ cartList, totalPrice }) {
    

    if (cartList.length === 0) {
        return (
            <div className="page_Container">
                <div className="cartEmpty">No items in the cart.</div>
            </div>
        );
    }

    cartList.forEach((item, i) => {
        if (i = 0) {
            totalPrice = item.valor;
        } else {
            totalPrice += item.valor;
        }
    });

    return (
        <div className="page_Container-checkout">
            <div className="checkout_itemContainer">
                {cartList.map((cItem) => (
                    <div key={cItem.id} className="checkout_item">
                        <div className="checkout_item-name">
                            {cItem.nombre}
                        </div>
                        <div className="checkout_item-row">
                            <div><span>Quantity: </span>{cItem.quantity}</div>
                            <div><span>Price f/e: </span>{cItem.valor}</div>
                        </div>
                    </div> 
                ))}
            </div>
            <div className="checkout_item-column">
                <div className="total-price">
                    Total: ${totalPrice}
                </div>
                <div className="linkToCheckout">
                    <Link to="../checkout">Checkout</Link>
                </div>
            </div>
        </div>
    )
}

export default Cart;