import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import HOC from "../../Component/HOC";

const API_URL = "https://sojitra-impex-backend.onrender.com/testimonials";
function Testimonial() {
    const [testimonials, setTestimonials] = useState([]);
    const [form, setForm] = useState({ name: "", role: "", text: "", rating: 1 });
    const [editingId, setEditingId] = useState(null);

    const fetchTestimonials = async () => {
        const res = await axios.get(API_URL);
        setTestimonials(res.data);
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await axios.put(`${API_URL}/${editingId}`, form);
            setEditingId(null);
        } else {
            await axios.post(API_URL, form);
        }
        setForm({ name: "", role: "", text: "", rating: 1 });
        fetchTestimonials();
    };

    const handleEdit = (t) => {
        setForm(t);
        setEditingId(t._id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        fetchTestimonials();
    };

    return (
        <div>
            <h2>Testimonials</h2>

            <form onSubmit={handleSubmit} className="row">
                <div className="form-group col-md-4">
                    <label htmlFor="origin">Name</label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        className="form-input" />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="origin">Role</label>
                    <input
                        type="text"
                        placeholder="Role"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        required
                        className="form-input" />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="origin">Rating</label>
                    <input
                        type="number"
                        min="1"
                        max="3"
                        placeholder="Rating"
                        value={form.rating}
                        onChange={(e) => setForm({ ...form, rating: e.target.value })}
                        required
                        className="form-input" />
                </div>
                <div className="form-group">
                    <label htmlFor="origin">Description</label>
                    <textarea
                        placeholder="Text"
                        value={form.text}
                        onChange={(e) => setForm({ ...form, text: e.target.value })}
                        required
                        className="form-input" />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-submit">{editingId ? "Update" : "Add"}</button>
                </div>
            </form>

            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Text</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {testimonials.map((t) => (
                        <tr key={t._id}>
                            <td>{t.name}</td>
                            <td>{t.role}</td>
                            <td>{t.text}</td>
                            <td>{t.rating}</td>
                            <td>
                                <button onClick={() => handleEdit(t)}>
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDelete(t._id)}>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HOC(Testimonial);