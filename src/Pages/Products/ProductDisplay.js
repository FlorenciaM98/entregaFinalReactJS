import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Link } from "react-router-dom";

function ProductDisplay({ cartList, setCartList }) {
    const [itemList, setItemList] = useState([]);
    const [quantities, setQuantities] = useState({});
    const { id } = useParams();
    console.log(id);
    const itemsCollectionRef = collection(db, "items");

    useEffect(() => {
        const getItemsList = async () => {
        const data = await getDocs(itemsCollectionRef);
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
    }, []);

    const item = itemList.find((item) => item.id === id);

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
          const stock = itemList.find((item) => item.id === itemId).stock;
          const newQuantity = prevQuantity + 1;
      
          return {
            ...prevQuantities,
            [itemId]: newQuantity <= stock ? newQuantity : stock,
          };
        });
      };

    return (
        <div className="page_Container-itemsDisplay">
            <div className="page_Container-itemGrande-goback">
                <Link to="/store">Go back</Link>
            </div>
            <div className="page_Container-itemGrande">
            {item ? (
                    <div key={item.id} className="grande_item">
                        <div className="grande_item-name">
                            {item.nombre}
                        </div>
                        <div className="grande_item-row">
                            <img src={item.img} />
                            <div className="grande_item-desc">
                                {item.desc}
                            </div>
                        </div>
                        <div className="grande_item-price">
                            Price: {item.valor}
                        </div>
                        <form noValidate onSubmit={(e) => handleSubmit(e, item)} className="grande_item-form">
                            <button type="button" onClick={() => handleMinus(item.id)}>
                                -
                            </button>
                            <p>{quantities[item.id] || 1}</p>
                            <button type="button" onClick={() => handlePlus(item.id)}>
                                +
                            </button>
                            <button type="submit">Add to cart</button>
                        </form>
                    </div>
                ) : (
                    <div className="itemNotFound">
                        <p>Item not found</p>
                    </div>
            )}
            </div>
        </div>
    );
}

export default ProductDisplay;
