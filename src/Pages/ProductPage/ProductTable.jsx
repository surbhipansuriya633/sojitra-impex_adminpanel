import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import HOC from '../../Component/HOC';
import { useNavigate } from 'react-router-dom';

function ProductTable() {
    const [products, setProducts] = useState([]);

    const FetchData = async () => {
        try {
            const res = await axios.get("https://sojitra-impex-backend.onrender.com/products/");
            setProducts(res.data);
        } catch (err) {
            console.error("Failed to fetch products:", err);
        }

    }
    useEffect(() => {
        FetchData()
    }, []);

    const toggleCarousel = async (id) => {

        try {
            const res = await axios.put(`https://sojitra-impex-backend.onrender.com/products/${id}/toggle-carousel`);
            setProducts((prev) =>
                prev.map((p) =>
                    p._id === id ? { ...p, showInCarousel: res.data.showInCarousel } : p
                )
            );
        } catch (err) {
            if (err.response?.status === 400) {
                alert(err.response.data.message); // 🚨 Show limit warning
            } else {
                console.error("Failed to toggle carousel:", err);
            }
        }
    };

    const carouselCount = products.filter((p) => p.showInCarousel).length;

    const toggleTrending = async (id) => {
        try {
            const res = await axios.put(`https://sojitra-impex-backend.onrender.com/products/${id}/toggle-trending`);
            setProducts((prev) =>
                prev.map((p) =>
                    p._id === id ? { ...p, trending: res.data.trending } : p
                )
            );
        } catch (err) {
            console.error("Failed to toggle trending:", err);
        }
    };


    const navigate = useNavigate();

    return (
        <div className="mt-4 overflow-hidden">
            <h3 className="mb-3">Products Table</h3>
            <h3 className="mb-3">
                Manage Products{" "}
                <small className="text-muted">(Carousel: {carouselCount}/5)</small>
            </h3>
            <div className="table-responsive border border-dark border-5">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Original Price</th>
                            <th>
                                EDIT
                            </th>
                            <th>
                                DELETE
                            </th>
                            <th>Show in Carousel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td><img src={p.image?.url} alt="product" style={{ width: "60px", height: "60px", objectFit: "cover" }} /></td>
                                <td>{p.name}</td>
                                <td>{p.BrandName}</td>
                                <td>₹{p.price}</td>
                                <td>₹{p.originalPrice}</td>
                                <td><button onClick={() => navigate(`/addproduct/${p.id}`)}>edit</button></td>
                                <td><button>DELETE</button></td>
                                <td>
                                    <button
                                        className={`btn ${p.showInCarousel ? "btn-success" : "btn-secondary"
                                            } btn-sm`}
                                        onClick={() => toggleCarousel(p._id)}
                                        disabled={
                                            !p.showInCarousel && carouselCount >= 5 // 🔒 Block adding new if already 5
                                        }
                                    >
                                        {p.showInCarousel ? "Shown" : "Show in Carousel"}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className={`btn ${p.trending ? "btn-warning" : "btn-secondary"} btn-sm`}
                                        onClick={() => toggleTrending(p._id)}
                                    >
                                        {p.trending ? "Trending" : "Make Trending"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default HOC(ProductTable);