import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Link } from "react-router-dom";

function Product({ cartList, setCartList } ) {
  const [itemList, setItemList] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [quantities, setQuantities] = useState({});
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
        setItemData(processedData);
    };

    getItemsList();
  }, []);

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
    <div className="page_Container-products">
      {itemData.map((item) => (
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
    </div>
  );
}

export default Product;
