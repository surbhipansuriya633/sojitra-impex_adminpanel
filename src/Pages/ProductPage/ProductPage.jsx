
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import HOC from "../../Component/HOC";
// import '../../CSS/Product.css'

function ProductPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        id: "", name: "", description: "", BrandName: "", category: "Saree", price: "", originalPrice: "", discount: "", dealTime: "", rating: "", reviews: "", freeDelivery: false, size: "", fabric: "", blouse: "", pattern: "", border: "", netQuantity: "", sareeLength: "", blouseLength: "", origin: "", meesholink: "", flipkartlink: "",
    })

    const [files, setFiles] = useState({})
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:5000/products/${id}`)
                .then((res) => {
                    if (res.data) {
                        const { details, ...rest } = res.data
                        setFormData({
                            ...rest,
                            fabric: details?.fabric || "",
                            blouse: details?.blouse || "",
                            pattern: details?.pattern || "",
                            border: details?.border || "",
                            netQuantity: details?.netQuantity || "",
                            sareeLength: details?.sareeLength || "",
                            blouseLength: details?.blouseLength || "",
                            origin: details?.origin || "",
                        })
                        setIsEdit(true)
                    }
                })
                .catch((err) => console.error(err))
        }
    }, [id])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleFileChange = (e) => {
        const { name, files: fileList } = e.target
        if (!fileList) return
        setFiles({ ...files, [name]: fileList })
    }

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: checked,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData()

        Object.keys(formData).forEach((key) => {
            if (
                ["fabric", "blouse", "pattern", "border", "netQuantity", "sareeLength", "blouseLength", "origin"].includes(key)
            ) {
                data.append(`details.${key}`, formData[key])
            } else {
                data.append(key, formData[key])
            }
        })

        Object.keys(files).forEach((key) => {
            for (let i = 0; i < files[key].length; i++) {
                data.append(key, files[key][i])
            }
        })

        try {
            if (isEdit) {
                await axios.put(`http://localhost:5000/products/update/${id}`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                alert("✅ Product updated")
                navigate("/")
            } else {
                await axios.post("http://localhost:5000/products/add", data, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                alert("✅ Product added")
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleCancel = () => {
        setFormData({
            id: "", name: "", description: "", BrandName: "", price: "", originalPrice: "", discount: "", dealTime: "", rating: "", reviews: "", freeDelivery: false, size: "", fabric: "", blouse: "", pattern: "", border: "", netQuantity: "", sareeLength: "", blouseLength: "", origin: "", meesholink: "", flipkartlink: "",
        })
        setFiles({})
    }

    return (
        <div className="w-100">
            {/* Main Content */}
            <div className="main-content">
                <div className="content-header">
                    <h1>{isEdit ? "Edit Product" : "Add Product"}</h1>
                </div>

                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-group">
                        <label htmlFor="id">Product ID (No Space for ex  ::: si-kajukatri-georgette)</label>
                        <input type="text" id="id" name="id" placeholder="Add ID Unique"
                            readOnly={!!id} value={formData.id} onChange={handleInputChange} className="form-input" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input type="text" id="name" name="name" placeholder="Name"
                            value={formData.name} onChange={handleInputChange} className="form-input" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" placeholder="Description" value={formData.description}
                            onChange={handleInputChange} className="form-textarea" rows={4} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select id="category" name="category" value={formData.category}
                            onChange={handleInputChange} className="form-select">
                            <option value="">-- Select Category --</option>
                            <option value="Saree">Saree</option>
                            <option value="Kurti">kurti</option>
                            <option value="jwellery">Jwellery</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="BrandName">Brand Name</label>
                        <select id="BrandName" name="BrandName" value={formData.BrandName}
                            onChange={handleInputChange} className="form-select">
                            <option value="">-- Select Brand --</option>
                            <option value="VT Trading">VT Trading</option>
                            <option value="XYZ Fashion">XYZ Fashion</option>
                            <option value="Classic Sarees">Classic Sarees</option>
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input type="number" id="price" name="price" placeholder="Price" value={formData.price}
                                onChange={handleInputChange} className="form-input" step="0.01" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="originalPrice">Original Price</label>
                            <input type="number" id="originalPrice" name="originalPrice" placeholder="Original Price" value={formData.originalPrice}
                                onChange={handleInputChange} className="form-input" step="0.01" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="discount">Discount</label>
                            <input type="text" id="discount" name="discount" placeholder="Discount"
                                value={formData.discount} onChange={handleInputChange} className="form-input" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="dealTime">Deal Time</label>
                            <input type="text" id="dealTime" name="dealTime" placeholder="Deal Time"
                                value={formData.dealTime} onChange={handleInputChange} className="form-input" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="rating">Rating</label>
                            <input type="number" id="rating" name="rating" placeholder="Rating" value={formData.rating}
                                onChange={handleInputChange} className="form-input" min="0" max="5" step="0.1" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="reviews">Reviews</label>
                            <input type="number" id="reviews" name="reviews" placeholder="Reviews"
                                value={formData.reviews} onChange={handleInputChange} className="form-input" />
                        </div>
                    </div>

                    <div className="form-group checkbox-group">
                        <label className="checkbox-label">
                            <input type="checkbox" name="freeDelivery" checked={formData.freeDelivery}
                                onChange={handleCheckboxChange} className="form-checkbox" />
                            <span>Free Delivery</span>
                        </label>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="size">Size</label>
                            <input type="text" id="size" name="size" placeholder="Size" value={formData.size}
                                onChange={handleInputChange} className="form-input" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="fabric">Fabric</label>
                            <input type="text" id="fabric" name="fabric" placeholder="Fabric" value={formData.fabric}
                                onChange={handleInputChange} className="form-input" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="blouse">Blouse</label>
                            <input type="text" id="blouse" name="blouse" placeholder="Blouse" value={formData.blouse}
                                onChange={handleInputChange} className="form-input" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="pattern">Pattern</label>
                            <input type="text" id="pattern" name="pattern" placeholder="Pattern" value={formData.pattern}
                                onChange={handleInputChange} className="form-input" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="border">Border</label>
                            <input type="text" id="border" name="border" placeholder="Border" value={formData.border}
                                onChange={handleInputChange} className="form-input" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="netQuantity">Net Quantity</label>
                            <input type="text" id="netQuantity" name="netQuantity" placeholder="Net Quantity"
                                value={formData.netQuantity} onChange={handleInputChange} className="form-input" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="sareeLength">Saree Length</label>
                            <input type="text" id="sareeLength" name="sareeLength" placeholder="Saree Length"
                                value={formData.sareeLength} onChange={handleInputChange} className="form-input" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="blouseLength">Blouse Length</label>
                            <input type="text" id="blouseLength" name="blouseLength" placeholder="Blouse Length"
                                value={formData.blouseLength} onChange={handleInputChange} className="form-input" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="origin">Origin</label>
                        <input type="text" id="origin" name="origin" placeholder="Origin" value={formData.origin}
                            onChange={handleInputChange} className="form-input" />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="meesholink">Meesho Link</label>
                            <input type="url" id="meesholink" name="meesholink" placeholder="Meesho Link"
                                value={formData.meesholink} onChange={handleInputChange} className="form-input" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="flipkartlink">Flipkart Link</label>
                            <input type="url" id="flipkartlink" name="flipkartlink" placeholder="Flipkart Link"
                                value={formData.flipkartlink} onChange={handleInputChange} className="form-input" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Main Image</label>
                        <input type="file" id="image" name="image" onChange={handleFileChange}
                            className="form-file" accept="image/*" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="hoverImage">Hover Image</label>
                        <input type="file" id="hoverImage" name="hoverImage" onChange={handleFileChange}
                            className="form-file" accept="image/*" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="thumbnails">Thumbnails</label>
                        <input type="file" id="thumbnails" name="thumbnails" multiple onChange={handleFileChange}
                            className="form-file" accept="image/*" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="productreview">Product Reviews</label>
                        <input type="file" id="productreview" name="productreview" multiple
                            onChange={handleFileChange} className="form-file" accept="image/*" />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-submit">
                            {isEdit ? "Update Product" : "Add Product"}
                        </button>
                        <button type="button" onClick={handleCancel} className="btn-cancel">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default HOC(ProductPage)