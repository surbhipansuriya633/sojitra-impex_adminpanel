import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Table, Image } from "react-bootstrap";
import HOC from "../../Component/HOC";

const API_URL = "https://sojitra-impex-backend.onrender.com/team";
function AboutTeam() {
    const [members, setMembers] = useState([]);
    const [editMember, setEditMember] = useState(null);
    const [form, setForm] = useState({
        id: "",
        name: "",
        role: "",
        description: "",
        showOnWebsite: true,
        image: null,
    });

    // Fetch all team members
    const fetchMembers = async () => {
        try {
            const { data } = await axios.get(API_URL);
            setMembers(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const openModal = (member = null) => {
        setEditMember(member);
        if (member) {
            setForm({
                id: member.id,
                name: member.name,
                role: member.role,
                description: member.description,
                showOnWebsite: member.showOnWebsite,
                image: null,
            });
        } else {
            setForm({ id: "", name: "", role: "", description: "", showOnWebsite: true, image: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (value !== null) formData.append(key, value);
        });

        try {
            if (editMember) {
                await axios.put(`${API_URL}/update/${editMember.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("Successfully Updated")
            } else {
                await axios.post(`${API_URL}/add`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }
            fetchMembers();
        } catch (err) {
            console.error(err);
            alert("Error saving member");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this member?")) return;
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchMembers();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Team Section Admin Panel</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 form-group">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        value={form.id}
                        onChange={(e) => setForm({ ...form, id: e.target.value })}
                        placeholder="Unique ID"
                        required
                        className="form-input"
                        disabled={!!editMember}
                    />
                </Form.Group>
                <Form.Group className="mb-3 form-group">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Member Name"
                        required
                        className="form-input"
                    />
                </Form.Group>
                <Form.Group className="mb-3 form-group">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        required
                        className="form-input"
                    >
                        <option value="">Select Role</option>
                        <option value="Design Team Lead">Design Team Lead</option>
                        <option value="Developer">Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Other">Other</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 form-group">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={form.description}
                        className="form-input"
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                </Form.Group>
                <Form.Group className="mb-3 form-group">
                    <Form.Check
                        type="checkbox"
                        label="Show on Website"
                        checked={form.showOnWebsite}
                        onChange={(e) => setForm({ ...form, showOnWebsite: e.target.checked })}
                    />
                </Form.Group>
                <Form.Group className="mb-3 form-group">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        className="form-file"
                        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                    />
                </Form.Group>
                <button type="submit" className="btn-submit">
                    {editMember ? "Update" : "Add"}
                </button>
            </Form>

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Description</th>
                        <th>Show</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((m) => (
                        <tr key={m._id}>
                            <td>
                                {m.image?.url && <Image src={m.image.url} width={60} rounded />}
                            </td>
                            <td>{m.name}</td>
                            <td>{m.role}</td>
                            <td>{m.description}</td>
                            <td>{m.showOnWebsite ? "✅" : "❌"}</td>
                            <td>
                                <Button size="sm" variant="secondary" onClick={() => openModal(m)}>Edit</Button>{" "}
                                <Button size="sm" variant="danger" onClick={() => handleDelete(m.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default HOC(AboutTeam);