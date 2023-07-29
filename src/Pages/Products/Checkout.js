function Checkout({cartList}) {
    
    
    if (cartList.length === []) {
        return (
            <div className="page_Container">
                <div>No items in the cart.</div>
            </div>
        );
    }

    console.log("Estoy en checkout")

    cartList.forEach((item, i) => {
        console.log(item);
        console.log(i);
    })

    return (
        <div className="page_Container">
            {cartList.map((cItem) => (
               <div key={cItem.id}>
                    {cItem.nombre}
                    <span>Category: {cItem.categoria}</span>
                    {cItem.quantity}
                </div> 
            ))}
            <div></div>

            
        </div>
    )
}

export default Checkout;