// "use client"
// import '../Dashboard/Dashboard.css'

// export default function Dashboard() {
//     // Sample data
//     const statsData = [
//         { label: "Total Revenue", value: "$48,575", change: "+12.5%", positive: true },
//         { label: "Orders", value: "1,247", change: "+8.2%", positive: true },
//         { label: "Customers", value: "3,891", change: "+5.3%", positive: true },
//         { label: "Conversion", value: "3.24%", change: "-2.1%", positive: false },
//     ]

//     const salesData = [65, 45, 78, 92, 55, 88, 72, 68]

//     const topProducts = [
//         { name: "Premium Headphones", price: "$299.99", emoji: "🎧" },
//         { name: "Wireless Earbuds", price: "$149.99", emoji: "🎵" },
//         { name: "Smart Watch", price: "$349.99", emoji: "⌚" },
//         { name: "Portable Speaker", price: "$199.99", emoji: "🔊" },
//     ]

//     const recentOrders = [
//         { id: "#ORD-001", customer: "John Smith", amount: "$1,249", status: "completed" },
//         { id: "#ORD-002", customer: "Sarah Johnson", amount: "$899", status: "pending" },
//         { id: "#ORD-003", customer: "Mike Davis", amount: "$2,150", status: "completed" },
//         { id: "#ORD-004", customer: "Emma Wilson", amount: "$549", status: "failed" },
//     ]

//     const regionData = [
//         { region: "North America", revenue: "$18,420" },
//         { region: "Europe", revenue: "$15,890" },
//         { region: "Asia Pacific", revenue: "$12,345" },
//         { region: "Latin America", revenue: "$6,420" },
//     ]

//     return (
//         <div className="dashboard-container">
//             <div className="dashboard-wrapper">
//                 {/* Header */}
//                 <div className="dashboard-header">
//                     <div>
//                         <h1 className="dashboard-title">Dashboard</h1>
//                         <p className="dashboard-subtitle">Welcome back! Here's your sales overview</p>
//                     </div>
//                     <div className="header-actions">
//                         <button className="action-button">📅 This Month</button>
//                         <button className="action-button primary">📊 Generate Report</button>
//                     </div>
//                 </div>

//                 {/* Stats Grid */}
//                 <div className="stats-grid">
//                     {statsData.map((stat, idx) => (
//                         <div key={idx} className="stat-card">
//                             <div className="stat-label">{stat.label}</div>
//                             <div className="stat-value">{stat.value}</div>
//                             <div className={`stat-change ${stat.positive ? "positive" : "negative"}`}>
//                                 <span>{stat.positive ? "📈" : "📉"}</span>
//                                 <span>{stat.change} from last month</span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Main Content Grid */}
//                 <div className="content-grid">
//                     {/* Sales Chart */}
//                     <div className="dashboard-card">
//                         <div className="card-header">
//                             <div>
//                                 <div className="card-title">Sales Performance</div>
//                                 <div className="card-subtitle">Weekly revenue trend</div>
//                             </div>
//                             <button className="action-button">More →</button>
//                         </div>
//                         <div className="sales-chart">
//                             {salesData.map((height, idx) => (
//                                 <div
//                                     key={idx}
//                                     className={`chart-bar ${idx % 3 === 0 ? "accent" : ""}`}
//                                     style={{ height: `${height}%` }}
//                                 />
//                             ))}
//                         </div>
//                         <div
//                             style={{
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 fontSize: "12px",
//                                 color: "#a0aec0",
//                                 marginTop: "15px",
//                             }}
//                         >
//                             <span>Mon</span>
//                             <span>Tue</span>
//                             <span>Wed</span>
//                             <span>Thu</span>
//                             <span>Fri</span>
//                             <span>Sat</span>
//                             <span>Sun</span>
//                             <span>Today</span>
//                         </div>
//                     </div>

//                     {/* Top Products */}
//                     <div className="dashboard-card">
//                         <div className="card-header">
//                             <div>
//                                 <div className="card-title">Top Products</div>
//                                 <div className="card-subtitle">Best sellers this month</div>
//                             </div>
//                         </div>
//                         <div className="product-grid">
//                             {topProducts.map((product, idx) => (
//                                 <div key={idx} className="product-item">
//                                     <div className="product-image">{product.emoji}</div>
//                                     <div className="product-details">
//                                         <div className="product-name">{product.name}</div>
//                                         <div className="product-price">{product.price}</div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Bottom Section */}
//                 <div className="content-grid">
//                     {/* Recent Orders */}
//                     <div className="dashboard-card">
//                         <div className="card-header">
//                             <div>
//                                 <div className="card-title">Recent Orders</div>
//                                 <div className="card-subtitle">Latest transactions</div>
//                             </div>
//                             <button className="action-button">View All →</button>
//                         </div>
//                         <div className="table-container">
//                             <table className="table">
//                                 <thead>
//                                     <tr>
//                                         <th>Order ID</th>
//                                         <th>Customer</th>
//                                         <th>Amount</th>
//                                         <th>Status</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {recentOrders.map((order, idx) => (
//                                         <tr key={idx}>
//                                             <td>{order.id}</td>
//                                             <td>{order.customer}</td>
//                                             <td style={{ fontWeight: "600" }}>{order.amount}</td>
//                                             <td>
//                                                 <span className={`status-badge ${order.status}`}>{order.status}</span>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>

//                     {/* Regional Breakdown */}
//                     <div className="dashboard-card">
//                         <div className="card-header">
//                             <div>
//                                 <div className="card-title">By Region</div>
//                                 <div className="card-subtitle">Revenue distribution</div>
//                             </div>
//                         </div>
//                         <div>
//                             {regionData.map((region, idx) => (
//                                 <div key={idx} className="sidebar-item">
//                                     <span className="sidebar-label">{region.region}</span>
//                                     <span className="sidebar-value">{region.revenue}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }


import React from 'react'

function Dashboard() {
    return (
        <div>Dashboard</div>
    )
}

export default Dashboard