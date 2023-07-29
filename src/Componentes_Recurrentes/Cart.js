function Cart({cartList}) {
    

    if (cartList.length === []) {
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
        </div>
    )
}

export default Cart;