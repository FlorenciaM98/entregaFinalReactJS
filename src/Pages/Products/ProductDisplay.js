import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

function ProductDisplay() {
    const [itemList, setItemList] = useState([]);
    const { id } = useParams();
    console.log(id);
    const itemsCollectionRef = collection(db, "items");

    useEffect(() => {
        const getItemsList = async () => {
        const data = await getDocs(itemsCollectionRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log(filteredData);
        setItemList(filteredData);
        };

        getItemsList();
    }, []);

    const selectedItem = itemList.find((item) => item.id === id);

    return (
        <div className="page_Container">
        {selectedItem ? (
            <div key={selectedItem.id}>
            <h2 style={{ color: selectedItem.stock > 0 ? "green" : "red" }}>
                {selectedItem.nombre}
            </h2>
            <p>{selectedItem.valor}</p>
            <p>{selectedItem.stock}</p>
            </div>
        ) : (
            <p>Item not found</p>
        )}
        </div>
    );
}

export default ProductDisplay;
