import React, { useEffect, useState } from "react";
import { API_BASE } from "../config/api";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingOrderId, setDeletingOrderId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        console.error("No auth token found");
        setError("Please login to view orders");
        setOrders([]);
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE}/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Orders received:", data);
        setOrders(data);
      } else if (response.status === 401) {
        console.error("❌ Unauthorized");
        setError("Session expired. Please login again.");
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setOrders([]);
      } else {
        console.error("❌ Failed to fetch orders:", response.status);
        setError("Failed to load orders");
        setOrders([]);
      }
    } catch (err) {
      console.error("❌ Error fetching orders:", err);
      setError("Server error. Please try again.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm(`Are you sure you want to delete Order #${orderId}?`)) {
      return;
    }

    setDeletingOrderId(orderId);

    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        alert("Please login to delete orders");
        return;
      }

      const response = await fetch(`${API_BASE}/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Order deleted successfully");
        // Show success notification
        showNotification("✅ Order deleted successfully!", "#28a745");
        fetchOrders();
      } else if (response.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      } else if (response.status === 403) {
        alert("You don't have permission to delete this order.");
      } else if (response.status === 404) {
        alert("Order not found.");
      } else {
        alert(`Failed to delete order: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error("❌ Error deleting order:", err);
      alert("Error deleting order. Please try again.");
    } finally {
      setDeletingOrderId(null);
    }
  };

  const showNotification = (message, color) => {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: ${color};
      color: white;
      padding: 15px 25px;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      z-index: 10000;
      font-weight: 600;
      animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  const getStatusStyle = (status) => {
    const base = {
      padding: "8px 18px",
      borderRadius: "20px",
      fontSize: "0.9rem",
      fontWeight: "700",
      textTransform: "capitalize",
      display: "inline-block",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    };

    switch (status?.toLowerCase()) {
      case "completed":
        return { 
          ...base, 
          background: "linear-gradient(135deg, #0be881 0%, #0fb866 100%)",
          color: "white"
        };
      case "cancelled":
        return { 
          ...base, 
          background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
          color: "white"
        };
      default:
        return { 
          ...base, 
          background: "linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)",
          color: "#2d3436"
        };
    }
  };

  const filteredOrders = filterStatus === "All" 
    ? orders 
    : orders.filter(order => (order.status || "pending").toLowerCase() === filterStatus.toLowerCase());

  const styles = {
    container: {
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
      padding: "60px 20px",
    },
    header: {
      textAlign: "center",
      marginBottom: "50px",
    },
    title: {
      fontSize: "clamp(2rem, 6vw, 3rem)",
      fontWeight: "900",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "15px",
    },
    subtitle: {
      color: "#636e72",
      fontSize: "clamp(1rem, 3vw, 1.2rem)",
      marginBottom: "30px",
    },
    filterContainer: {
      display: "flex",
      gap: "15px",
      justifyContent: "center",
      flexWrap: "wrap",
      marginBottom: "40px",
    },
    filterButton: {
      background: "white",
      border: "2px solid #ecf0f1",
      padding: "12px 28px",
      borderRadius: "50px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      color: "#2d3436",
    },
    activeFilter: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "2px solid transparent",
      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
    },
    ordersGrid: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 400px), 1fr))",
      gap: "25px",
    },
    orderCard: {
      background: "white",
      borderRadius: "20px",
      padding: "30px",
      boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
      transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      cursor: "pointer",
    },
    orderHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "25px",
      paddingBottom: "20px",
      borderBottom: "2px solid #f8f9fa",
      flexWrap: "wrap",
      gap: "15px",
    },
    orderId: {
      fontSize: "1.5rem",
      fontWeight: "800",
      background: "linear-gradient(135deg, #2d3436 0%, #636e72 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    infoSection: {
      marginBottom: "25px",
    },
    infoRow: {
      display: "flex",
      alignItems: "flex-start",
      marginBottom: "12px",
      gap: "12px",
    },
    infoLabel: {
      fontWeight: "700",
      color: "#636e72",
      minWidth: "80px",
      fontSize: "0.95rem",
    },
    infoValue: {
      color: "#2d3436",
      flex: 1,
      fontSize: "0.95rem",
      wordBreak: "break-word",
    },
    itemsSection: {
      marginTop: "25px",
      paddingTop: "25px",
      borderTop: "2px solid #f8f9fa",
    },
    sectionTitle: {
      fontSize: "1.1rem",
      fontWeight: "800",
      color: "#2d3436",
      marginBottom: "15px",
    },
    itemsList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    itemRow: {
      display: "flex",
      justifyContent: "space-between",
      padding: "12px 0",
      borderBottom: "1px solid #f8f9fa",
      gap: "15px",
    },
    itemName: {
      color: "#2d3436",
      flex: 1,
      fontSize: "0.95rem",
    },
    itemPrice: {
      fontWeight: "800",
      background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      whiteSpace: "nowrap",
    },
    totalSection: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px",
      paddingTop: "20px",
      borderTop: "3px solid #667eea",
      alignItems: "center",
    },
    totalLabel: {
      fontSize: "1.3rem",
      fontWeight: "800",
      color: "#2d3436",
    },
    totalAmount: {
      fontSize: "1.8rem",
      fontWeight: "900",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    deleteButton: {
      marginTop: "20px",
      paddingTop: "20px",
      borderTop: "2px solid #f8f9fa",
      display: "flex",
      justifyContent: "flex-end",
    },
    deleteBtn: {
      background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
      color: "white",
      border: "none",
      padding: "12px 24px",
      borderRadius: "12px",
      fontSize: "1rem",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      boxShadow: "0 4px 12px rgba(255, 107, 107, 0.3)",
    },
    emptyState: {
      textAlign: "center",
      padding: "80px 40px",
      background: "white",
      borderRadius: "20px",
      boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
      maxWidth: "500px",
      margin: "0 auto",
    },
    emptyIcon: {
      fontSize: "5rem",
      marginBottom: "25px",
      opacity: 0.7,
    },
    emptyTitle: {
      fontSize: "clamp(1.5rem, 4vw, 2rem)",
      fontWeight: "800",
      color: "#2d3436",
      marginBottom: "15px",
    },
    emptyText: {
      color: "#636e72",
      fontSize: "1.1rem",
    },
    loader: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
      gap: "20px",
    },
    loaderIcon: {
      fontSize: "4rem",
      animation: "bounce 1s infinite",
    },
    retryButton: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      padding: "15px 35px",
      borderRadius: "50px",
      fontSize: "1.1rem",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 6px 20px rgba(102, 126, 234, 0.3)",
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loader}>
          <div style={styles.loaderIcon}>⏳</div>
          <h2 style={{ color: "#636e72", fontSize: "1.5rem" }}>
            Loading your orders...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>⚠️</div>
          <h2 style={styles.emptyTitle}>Oops!</h2>
          <p style={{ ...styles.emptyText, color: "#ff6b6b", marginBottom: "30px" }}>
            {error}
          </p>
          <button
            onClick={fetchOrders}
            style={styles.retryButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(102, 126, 234, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.3)";
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

      <div style={styles.header}>
        <h1 style={styles.title}>📋 Order Management</h1>
        <p style={styles.subtitle}>
          Track and manage all customer orders
        </p>
      </div>

      {/* Filter Buttons */}
      <div style={styles.filterContainer}>
        {["All", "Pending", "Completed", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            style={{
              ...styles.filterButton,
              ...(filterStatus === status ? styles.activeFilter : {})
            }}
            onMouseEnter={(e) => {
              if (filterStatus !== status) {
                e.currentTarget.style.background = "#f8f9fa";
                e.currentTarget.style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              if (filterStatus !== status) {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.transform = "translateY(0)";
              }
            }}
          >
            {status} {filterStatus === status && `(${filteredOrders.length})`}
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      {filteredOrders.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📦</div>
          <h2 style={styles.emptyTitle}>No Orders Found</h2>
          <p style={styles.emptyText}>
            {filterStatus === "All" 
              ? "No orders have been placed yet."
              : `No ${filterStatus.toLowerCase()} orders at the moment.`}
          </p>
        </div>
      ) : (
        <div style={styles.ordersGrid}>
          {filteredOrders.map((order) => {
            let itemsArray = [];
            if (typeof order.items === "string") {
              try {
                itemsArray = JSON.parse(order.items);
              } catch (e) {
                console.error("Failed to parse items for order", order.id);
              }
            } else if (Array.isArray(order.items)) {
              itemsArray = order.items;
            }

            const isDeleting = deletingOrderId === order.id;

            return (
              <div
                key={order.id}
                style={styles.orderCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 5px 20px rgba(0,0,0,0.08)";
                }}
              >
                {/* Order Header */}
                <div style={styles.orderHeader}>
                  <span style={styles.orderId}>Order #{order.id}</span>
                  <span style={getStatusStyle(order.status)}>
                    {order.status || "Pending"}
                  </span>
                </div>

                {/* Customer Info */}
                <div style={styles.infoSection}>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>👤 Customer:</span>
                    <span style={styles.infoValue}>{order.customer_name}</span>
                  </div>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>📞 Phone:</span>
                    <span style={styles.infoValue}>{order.customer_phone}</span>
                  </div>
                  {order.order_date && (
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>🕒 Date:</span>
                      <span style={styles.infoValue}>
                        {new Date(order.order_date).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Items */}
                <div style={styles.itemsSection}>
                  <h3 style={styles.sectionTitle}>Order Items</h3>
                  {itemsArray.length === 0 ? (
                    <p style={{ color: "#95a5a6", fontStyle: "italic" }}>
                      No items found
                    </p>
                  ) : (
                    <>
                      <ul style={styles.itemsList}>
                        {itemsArray.map((item, idx) => (
                          <li key={idx} style={styles.itemRow}>
                            <span style={styles.itemName}>
                              {item.name || "Unknown Item"}
                            </span>
                            <span style={styles.itemPrice}>
                              {item.price || "0"} EGP
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Total */}
                      <div style={styles.totalSection}>
                        <span style={styles.totalLabel}>Total:</span>
                        <span style={styles.totalAmount}>
                          {typeof order.total_price === 'number' 
                            ? order.total_price.toFixed(2) 
                            : order.total_price} EGP
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Delete Button */}
                <div style={styles.deleteButton}>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    disabled={isDeleting}
                    style={{
                      ...styles.deleteBtn,
                      opacity: isDeleting ? 0.6 : 1,
                      cursor: isDeleting ? "not-allowed" : "pointer",
                    }}
                    onMouseEnter={(e) => {
                      if (!isDeleting) {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow = "0 6px 18px rgba(255, 107, 107, 0.4)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isDeleting) {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 107, 107, 0.3)";
                      }
                    }}
                  >
                    <span>🗑️</span>
                    <span>{isDeleting ? "Deleting..." : "Delete"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;