import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useState, useEffect } from "react";

function Order() {
    const [id, setId] = useState([]);
    const ordersRef = collection(db, "ordenes");

    useEffect(() => {
        const getId = async () => {
        const data = await getDocs(ordersRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log(filteredData);
        setId(filteredData);
        };

        getId();
    }, []);

    const buyedItem = id.find((item) => item.id === id);

    return (
        <div className="page_Container">
            Gracias por la compra
            Tu ID de compra es {buyedItem}
            Puedes volver al inicio haciendo
            click <Link to="../../">aqui</Link>.
        </div>
    )
}

export default Order;