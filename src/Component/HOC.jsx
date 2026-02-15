import React from 'react'
import Sidebar from './Sidebar';
import '../CSS/Product.css'

const HOC = (WrappedComponent) => {
    return function Layout(props) {
        return (
            <div className="dashboard-container">
                {/* Sidebar Fixed */}
                <Sidebar />

                {/* Main Content */}
                <div className="main-content" style={{ marginLeft: "280px", padding: "20px", flex: 1, overflow: "hidden" }}>
                    <WrappedComponent {...props} />
                </div>
            </div>
        );
    };
};

export default HOC