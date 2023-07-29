import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";

function CategoryDisplay() {

    const [itemList, setItemList] = useState([]);
    const { catId } = useParams();
    console.log(catId);
    const itemsCollectionRef = collection(db, "items");

    useEffect(() => {
        const getItemsList = async () => {
            const catFilter = query(itemsCollectionRef, where("catId", "==", catId));
            const data = await getDocs(catFilter);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            console.log(filteredData);
            setItemList(filteredData);
        };

        getItemsList();
    }, [catId]);

    return (
        <div className="page_Container">
            {itemList.map((item) => (
                <div key={item.id}>
                    {item.nombre}
                    <span>Category: {item.categoria}</span>
                </div>
            ))}   
        </div>
    )
}

export default CategoryDisplay;