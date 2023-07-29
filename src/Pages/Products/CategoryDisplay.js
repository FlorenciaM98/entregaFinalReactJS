import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Link } from "react-router-dom";

function CategoryDisplay({ cartList, setCartList }) {

    const [itemList, setItemList] = useState([]);
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
          const stock = itemList.find((item) => item.id === itemId).stock;
          const newQuantity = prevQuantity + 1;
      
          return {
            ...prevQuantities,
            [itemId]: newQuantity <= stock ? newQuantity : stock,
          };
        });
      };
    

    return (
        <div className="page_Container-products-category">
            <div className="page_Container-products-category_button">
                <Link to="/store">Go back</Link>
            </div>
            <div className="page_Container-products">
                {itemList.map((item) => (
                    <div key={item.id} className="chico_item">
                    <div className="chico_item-name">
                    {item.nombre}
                    </div>
                    <img className="chico_item-img" src={item.img}></img>
                    <div className="chico_item-link">
                    <Link to={`/product/${item.id}`}>Ver mas</Link>
                    </div>
                    <form noValidate onSubmit={(e) => handleSubmit(e, item)} className="chico_item-form">
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
                ))} 
                <div className="link-checkout">
                    <Link to="../checkout">Checkout</Link>
                </div> 
            </div>    
        </div>
    )
}

export default CategoryDisplay;