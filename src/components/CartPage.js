import React, { useState, useEffect } from "react";
import { API_BASE } from "../config/api";

const CartPage = ({ user, cart, removeFromCart, clearCart, setActivePage }) => {
  const [customerPhone, setCustomerPhone] = useState(user?.phone || "");
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    if (user?.phone) {
      setCustomerPhone(user.phone);
    }
  }, [user]);

  const placeOrder = async () => {
    if (!user) {
      alert("Please login first");
      setActivePage("login");
      return;
    }
    if (!customerPhone) return alert("📱 Please enter your phone number");
    if (cart.length === 0) return alert("🛒 Your cart is empty");

    setOrderLoading(true);
    const total = cart.reduce((sum, i) => sum + parseFloat(i.price), 0);

    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        alert("Session expired. Please login again.");
        setActivePage("login");
        return;
      }

      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          customer_name: user.name,
          customer_phone: customerPhone,
          items: cart,
          total_price: total,
        }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        alert("🎉 Order placed successfully!");
        clearCart();
        setActivePage("orders");
      } else {
        console.error("Backend error:", data);
        alert("❌ " + (data.error || "Failed to place order"));
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("❌ Failed to place order");
    } finally {
      setOrderLoading(false);
    }
  };

  const styles = {
    container: {
      maxWidth: "900px",
      margin: "0 auto",
      padding: "60px 20px",
      minHeight: "100vh",
    },
    header: {
      textAlign: "center",
      marginBottom: "50px",
    },
    title: {
      fontSize: "clamp(2rem, 6vw, 3rem)",
      fontWeight: "700",
      background: "linear-gradient(135deg, #2d3436 0%, #636e72 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "15px",
    },
    subtitle: {
      color: "#636e72",
      fontSize: "clamp(1rem, 3vw, 1.2rem)",
    },
    emptyCart: {
      background: "white",
      borderRadius: "20px",
      padding: "80px 40px",
      textAlign: "center",
      boxShadow: "0 5px 25px rgba(0,0,0,0.08)",
    },
    emptyIcon: {
      fontSize: "5rem",
      marginBottom: "25px",
      opacity: 0.7,
    },
    emptyTitle: {
      fontSize: "clamp(1.5rem, 4vw, 2rem)",
      fontWeight: "600",
      color: "#2d3436",
      marginBottom: "15px",
    },
    emptyText: {
      color: "#636e72",
      fontSize: "clamp(1rem, 3vw, 1.1rem)",
      marginBottom: "35px",
    },
    browseButton: {
      background: "linear-gradient(135deg, #5a6c7d 0%, #4a5568 100%)",
      color: "white",
      border: "none",
      padding: "18px 45px",
      borderRadius: "50px",
      fontSize: "1.1rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.12)",
    },
    cartCard: {
      background: "white",
      borderRadius: "20px",
      padding: "40px",
      boxShadow: "0 5px 25px rgba(0,0,0,0.08)",
    },
    cartItem: {
      display: "flex",
      alignItems: "center",
      padding: "25px 0",
      borderBottom: "2px solid #f8f9fa",
      gap: "20px",
    },
    itemImage: {
      width: "100px",
      height: "100px",
      objectFit: "cover",
      borderRadius: "15px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    itemDetails: {
      flex: 1,
      minWidth: "150px",
    },
    itemName: {
      fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
      fontWeight: "600",
      color: "#2d3436",
      marginBottom: "8px",
    },
    itemPrice: {
      fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
      fontWeight: "700",
      color: "#2d3436",
    },
    removeButton: {
      background: "linear-gradient(135deg, #5a6c7d 0%, #4a5568 100%)",
      color: "white",
      border: "none",
      padding: "12px 24px",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "0.95rem",
      fontWeight: "500",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
      whiteSpace: "nowrap",
    },
    totalSection: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "30px 0",
      borderTop: "3px solid #5a6c7d",
      marginTop: "10px",
    },
    totalLabel: {
      fontSize: "clamp(1.4rem, 4vw, 1.8rem)",
      fontWeight: "700",
      color: "#2d3436",
    },
    totalAmount: {
      fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
      fontWeight: "800",
      color: "#2d3436",
    },
    formSection: {
      marginTop: "30px",
    },
    inputLabel: {
      display: "block",
      marginBottom: "12px",
      color: "#2d3436",
      fontSize: "1.1rem",
      fontWeight: "600",
    },
    input: {
      width: "100%",
      padding: "18px 20px",
      border: "2px solid #ecf0f1",
      borderRadius: "12px",
      fontSize: "1.05rem",
      boxSizing: "border-box",
      transition: "all 0.3s ease",
      fontFamily: "inherit",
    },
    buttonGroup: {
      display: "flex",
      gap: "15px",
      marginTop: "30px",
      flexWrap: "wrap",
    },
    placeOrderButton: {
      flex: 1,
      minWidth: "200px",
      background: "linear-gradient(135deg, #5a6c7d 0%, #4a5568 100%)",
      color: "white",
      border: "none",
      padding: "20px 40px",
      borderRadius: "12px",
      fontSize: "1.2rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.12)",
    },
    continueButton: {
      background: "white",
      color: "#5a6c7d",
      border: "2px solid #5a6c7d",
      padding: "18px 35px",
      borderRadius: "12px",
      fontSize: "1.05rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s ease",
      whiteSpace: "nowrap",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🛒 Your Cart</h1>
        <p style={styles.subtitle}>
          Review your items and complete your order
        </p>
      </div>

      {cart.length === 0 ? (
        <div style={styles.emptyCart}>
          <div style={styles.emptyIcon}>🛒</div>
          <h2 style={styles.emptyTitle}>Your cart is empty</h2>
          <p style={styles.emptyText}>
            Looks like you haven't added anything to your cart yet.
            <br />Browse our menu and discover amazing dishes! 🍕
          </p>
          <button
            onClick={() => setActivePage("menu")}
            style={styles.browseButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.12)";
            }}
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <div style={styles.cartCard}>
          {/* Cart Items */}
          {cart.map((item, idx) => (
            <div key={idx} style={styles.cartItem}>
              <img
                src={item.image}
                alt={item.name}
                style={styles.itemImage}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/100?text=Food";
                }}
              />
              <div style={styles.itemDetails}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.itemPrice}>{item.price} EGP</p>
              </div>
              <button
                onClick={() => removeFromCart(idx)}
                style={styles.removeButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 6px 18px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.12)";
                }}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total */}
          <div style={styles.totalSection}>
            <span style={styles.totalLabel}>Total:</span>
            <span style={styles.totalAmount}>
              {cart.reduce((s, i) => s + parseFloat(i.price), 0).toFixed(2)} EGP
            </span>
          </div>

          {/* Phone Input */}
          <div style={styles.formSection}>
            <label style={styles.inputLabel}>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              style={styles.input}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#5a6c7d";
                e.currentTarget.style.boxShadow = "0 0 0 4px rgba(90, 108, 125, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#ecf0f1";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Buttons */}
          <div style={styles.buttonGroup}>
            <button
              onClick={placeOrder}
              disabled={orderLoading}
              style={{
                ...styles.placeOrderButton,
                opacity: orderLoading ? 0.7 : 1,
                cursor: orderLoading ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => {
                if (!orderLoading) {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.15)";
                }
              }}
              onMouseLeave={(e) => {
                if (!orderLoading) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.12)";
                }
              }}
            >
              {orderLoading ? "Processing..." : "Place Order 🎉"}
            </button>
            
            <button
              onClick={() => setActivePage("menu")}
              style={styles.continueButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#5a6c7d";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.color = "#5a6c7d";
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;