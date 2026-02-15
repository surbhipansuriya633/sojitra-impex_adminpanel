import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Container } from "react-bootstrap";
import axios from "axios";
import HOC from "../../Component/HOC";

function Order() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/order");
                console.log(data);

                setOrders(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <Spinner animation="border" className="mt-3" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container className="mt-5">
            <h3>Orders List</h3>
            {orders.length === 0 ? (
                <Alert variant="info">No orders found.</Alert>
            ) : (
                <Table striped bordered hover responsive className="mt-3">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Product Image</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Address</th>
                            <th>Number</th>
                            <th>Amount (₹)</th>
                            <th>Status</th>
                            <th>Payment ID</th>
                            <th>Order ID</th>
                            <th>Transition Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id}>

                                <td>{index + 1}</td>
                                <td>{order.user?.firstName + " " + order.user?.lastName || order.user?._id}</td>
                                <td><img src={order.product.image.url} alt="image not found" width={100} /></td>
                                <td>{order.product?.name || order.product?._id}</td>
                                <td>{order.quantity}</td>
                                <td>{order.user?.address}</td>
                                <td>{order.user?.lastName}</td>
                                <td>{order.amount}</td>
                                <td>{order.status}</td>
                                <td>{order.paymentId}</td>
                                <td>{order.orderId}</td>
                                <td>{new Date(order.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}
export default HOC(Order)