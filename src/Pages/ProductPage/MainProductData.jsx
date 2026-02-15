import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
function MainProductData() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()
    const fetchProducts = async () => {
        const res = await axios.get("https://sojitra-impex-backend.onrender.com/products");
        setProducts(res.data);
    };

    const deleteProduct = async (id) => {
        await axios.delete(`https://sojitra-impex-backend.onrender.com/products/${id}`);
        fetchProducts();
    };
    const editProduct = async (id) => {
        navigate('/' + id)
    };

    useEffect(() => { fetchProducts(); }, []);

    return (
        <div>
            <h3>All Products</h3>
            {products.map(p => (
                <div key={p._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
                    <h4>{p.name}</h4>
                    <p>{p.description}</p>
                    <img src={p.image?.url} alt="" width="100" /><br />
                    <button onClick={() => deleteProduct(p._id)}>Delete</button>
                    <button onClick={() => editProduct(p._id)}>editProduct</button>
                </div>
            ))}
        </div>
    );
}

export default MainProductData