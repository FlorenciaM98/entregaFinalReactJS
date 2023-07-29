import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";

function CategoryDisplay({ cartList, setCartList }) {

    const [itemList, setItemList] = useState([]);

    const [itemData, setItemData] = useState([]);
    const [quantities, setQuantities] = useState({});

    const { catId } = useParams();
    const itemsCollectionRef = collection(db, "items");

    useEffect(() => {
        const getItemsList = async () => {
            const catFilter = query(itemsCollectionRef, where("catId", "==", catId));
            const data = await getDocs(catFilter);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

            setItemList(filteredData);

            const initialQuantities = {};
            filteredData.forEach((item) => {
                initialQuantities[item.id] = 1;
            });
            setQuantities(initialQuantities);
    
            const processedData = filteredData.map((item) => ({
                ...item,
                quantity: quantities[item.id] || 1,
            }));


        };

        
        getItemsList();
    }, [catId]);

    
      const handleSubmit = (e, item) => {
        e.preventDefault();
        const newItem = { ...item, quantity: quantities[item.id], name: item.nombre, valor: item.valor };
        setCartList((prev) => [...prev, newItem]);
        console.log(newItem)
      };
    
      const handleMinus = (itemId) => {
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [itemId]: (prevQuantities[itemId] || 1) - 1,
        }));
      };
    
      const handlePlus = (itemId) => {
        setQuantities((prevQuantities) => {
          const prevQuantity = prevQuantities[itemId] || 0;
          const stock = itemData.find((item) => item.id === itemId).stock;
          const newQuantity = prevQuantity + 1;
      
          return {
            ...prevQuantities,
            [itemId]: newQuantity <= stock ? newQuantity : stock,
          };
        });
      };
    

    return (
        <div className="page_Container">
            {itemList.map((item) => (
                <div key={item.id}>
                    {item.nombre}
                    {item.desc}
                    {item.img}
                    {item.valor}
                    <span>Category: {item.categoria}</span>
                </div>
            ))}   
        </div>
    )
}

export default CategoryDisplay;