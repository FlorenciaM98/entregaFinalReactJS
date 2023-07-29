import { useState } from "react";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

function Checkout({ cartList, totalPrice }) {
    
    const [formData, setFormData] = useState({
        fname: "",
        fsurname: "",
        fcp: "",
        fmail: "",
        fmailRep: "",
    });

    const navigate = useNavigate();
    const ordersRef = collection(db, "ordenes");

    const [showPayButton, setShowPayButton] = useState(false);

    if (cartList.length === 0) {
        return (
            <div className="page_Container">
                <div className="cartEmpty">No items in the cart.</div>
            </div>
        );
    };

    cartList.forEach((item, i) => {
        totalPrice += parseInt(item.valor, 10);
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await addDoc(ordersRef, {
            name: formData.fname,
            surname: formData.fsurname,
            celphone: formData.fcp,
            email: formData.fmail,
            cart: cartList,
            totalPrice
        });

        navigate("/order");
    };
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [id]: value,
        }));
      };
    
    const handleEmailValidation = () => {
        const { fmail, fmailRep } = formData;
        setShowPayButton(fmail === fmailRep);
    };
    


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
            <div className="total-priceAtCheckout">
                    Total: ${totalPrice}
            </div>
            <div className="checkout-form">
                <form noValidate onSubmit={handleSubmit}>
                <label htmlFor="fname">Name</label>
                <input id="fname" placeholder="Name" type="text" value={formData.fname} onChange={handleChange} />
                <label htmlFor="fsurname">Surname</label>
                <input id="fsurname" placeholder="Surname" type="text" value={formData.fsurname} onChange={handleChange} />
                <label htmlFor="fcp">Celphone number</label>
                <input id="fcp" placeholder="Celphone number" type="number" value={formData.fcp} onChange={handleChange} />
                <label htmlFor="fmail">Email</label>
                <input id="fmail" placeholder="Email" type="text" value={formData.fmail} onChange={handleChange} />
                <label htmlFor="fmailRep">Re-write email</label>
                <input id="fmailRep" placeholder="Email" type="text" value={formData.fmailRep} onChange={handleChange} onBlur={handleEmailValidation}/>
                {showPayButton && <button type="submit">Pay</button>}
                </form>
            </div>        
        </div>
    )
}

export default Checkout;