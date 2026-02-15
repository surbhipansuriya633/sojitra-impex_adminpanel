import React, { useEffect, useState } from "react";
import axios from "axios";
import HOC from "../../Component/HOC";
import { Table } from "react-bootstrap";

const API = "https://sojitra-impex-backend.onrender.com/aboutus";

function HomeAbout() {
    const [abouts, setAbouts] = useState([]);
    const [formId, setFormId] = useState(null); // track edit mode
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchAbouts();
    }, []);

    const fetchAbouts = async () => {
        const res = await axios.get(API);
        setAbouts(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (image) formData.append("image", image);
        if (images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                formData.append("images", images[i]);
            }
        }

        if (formId) {
            // UPDATE
            await axios.put(`${API}/${formId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        } else {
            // CREATE
            await axios.post(API, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        }

        fetchAbouts();
        resetForm();
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API}/${id}`);
        fetchAbouts();
    };

    const handleEdit = (about) => {
        setFormId(about._id);
        setImage(null);
        setImages([]);
        alert("Now choose new images to replace existing ones");
    };

    const resetForm = () => {
        setFormId(null);
        setImage(null);
        setImages([]);
    };

    return (
        <div>
            <h2>About Us CRUD</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Single Image : : : : : (HomePage about Sec) </label>
                    <input type="file" className="form-file" onChange={(e) => setImage(e.target.files[0])} />
                </div>

                <div className="form-group">
                    <label>Select 2 Images : : : : : (AboutPage About Sec) </label>
                    <input
                        type="file"
                        className="form-file"
                        multiple
                        onChange={(e) => setImages([...e.target.files])}
                    />
                </div>

                <button type="submit" className="btn-submit">{formId ? "Update" : "Create"}</button>
                {formId && <button onClick={resetForm}>Cancel</button>}
            </form>

            <hr />

            <div className="table-responsive border border-dark border-5">
                <Table className="table">
                    <tr>
                        <th className="border text-center">Home About Page</th>
                        <th className="border text-center">About Page</th>
                        <th className="border text-center">Actions</th>
                    </tr>
                    {abouts.map((a, i) => (
                        <tr key={i}>
                            <td className="border text-center">

                                {a.image?.url && <img src={a.image.url} alt="single" height="150" />}
                            </td>
                            <td className="border text-center">
                                {Array.isArray(a.images) &&
                                    a.images.map((img, i) => (
                                        <img key={i} src={img.url} alt={`multi-${i}`} height="150" style={{ margin: '10px' }} />
                                    ))}
                            </td>
                            <td className="border text-center">
                                <button onClick={() => handleEdit(a)}>Edit</button>
                                <button onClick={() => handleDelete(a._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </Table>

            </div>
        </div>
    );
}

export default HOC(HomeAbout)