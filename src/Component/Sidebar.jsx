import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            <div className="">
                <div className={`sidebar d-md-none d-block ${sidebarOpen ? "open" : ""}`}>
                    <Link to='/' className='text-decoration-none'>
                        <div className="sidebar-item active">
                            <div className="sidebar-icon">🏠</div>
                            <span>Dashboard</span>
                        </div>
                    </Link>
                    <Link to={'/aboutus'} className='text-decoration-none'>
                        <div className="sidebar-item">
                            <div className="sidebar-icon">📋</div>
                            <span>About Us</span>
                        </div>
                    </Link>
                    <Link to={'/team'} className='text-decoration-none'>
                        <div className="sidebar-item">
                            <div className="sidebar-icon">📋</div>
                            <span>Team</span>
                        </div>
                    </Link>
                    <Link to={'/testimonials'} className='text-decoration-none'>
                        <div className="sidebar-item">
                            <div className="sidebar-icon">📋</div>
                            <span>Testimonials</span>
                        </div>
                    </Link>
                    <Link to={'/product'} className='text-decoration-none'>
                        <div className="sidebar-item">
                            <div className="sidebar-icon">📦</div>
                            <span>Products</span>
                        </div>
                    </Link>
                    <Link to={'/addProduct'} className='text-decoration-none'>
                        <div className="sidebar-item current">
                            <div className="sidebar-icon">➕</div>
                            <span>Add Product</span>
                        </div>
                    </Link>
                    <Link to={'/orders'} className='text-decoration-none'>
                        <div className="sidebar-item">
                            <div className="sidebar-icon">📋</div>
                            <span>Orders</span>
                        </div>
                    </Link>
                </div>

                {/* Overlay for mobile */}
                {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}

                {/* Main Content */}
                <div className="main-content">
                    <button
                        className="btn btn-outline-light d-md-none mb-3"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        ☰ Menu
                    </button>

                </div>
            </div>
            <div className="sidebar">
                <Link to='/' className='text-decoration-none'>
                    <div className="sidebar-item active">
                        <div className="sidebar-icon">🏠</div>
                        <span>Dashboard</span>
                    </div>
                </Link>
                <Link to={'/aboutus'} className='text-decoration-none'>
                    <div className="sidebar-item">
                        <div className="sidebar-icon">📋</div>
                        <span>About Us</span>
                    </div>
                </Link>
                <Link to={'/team'} className='text-decoration-none'>
                    <div className="sidebar-item">
                        <div className="sidebar-icon">📋</div>
                        <span>Team</span>
                    </div>
                </Link>
                <Link to={'/testimonials'} className='text-decoration-none'>
                    <div className="sidebar-item">
                        <div className="sidebar-icon">📋</div>
                        <span>Testimonials</span>
                    </div>
                </Link>
                <Link to={'/product'} className='text-decoration-none'>
                    <div className="sidebar-item">
                        <div className="sidebar-icon">📦</div>
                        <span>Products</span>
                    </div>
                </Link>
                <Link to={'/addProduct'} className='text-decoration-none'>
                    <div className="sidebar-item current">
                        <div className="sidebar-icon">➕</div>
                        <span>Add Product</span>
                    </div>
                </Link>
                <Link to={'/orders'} className='text-decoration-none'>
                    <div className="sidebar-item">
                        <div className="sidebar-icon">📋</div>
                        <span>Orders</span>
                    </div>
                </Link>
            </div>

        </>
    )
}

export default Sidebar