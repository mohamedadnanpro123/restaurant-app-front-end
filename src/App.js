import React, { useState, useEffect } from "react";
import MenuPage from "./components/MenuPage";
import OrdersPage from "./components/OrdersPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import CartPage from "./components/CartPage";
import { HiOutlineUser } from 'react-icons/hi';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';

function App() {
  const [activePage, setActivePage] = useState("menu");
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  // Load user and cart from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('authToken');
    
    if (savedUser && savedToken) {
      try {
        const userData = JSON.parse(savedUser);
        setUser({ ...userData, token: savedToken });
      } catch (error) {
        console.error("Error loading user:", error);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      }
    }

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Handle navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setActivePage("menu");
    setMobileMenuOpen(false);
  };

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
    // Show toast notification (optional)
    const notification = document.createElement('div');
    notification.textContent = `✅ ${item.name} added to cart!`;
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: #28a745;
      color: white;
      padding: 15px 25px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      animation: slideIn 0.3s ease;
      font-weight: 600;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const styles = {
    navbar: {
      background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'white',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      padding: "20px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.08)" : "0 2px 10px rgba(0,0,0,0.05)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      transition: "all 0.3s ease",
      flexWrap: "wrap",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      cursor: "pointer",
    },
    logoIcon: {
      fontSize: "2rem",
      background: "linear-gradient(135deg, #2d3436 0%, #1a1a1a 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    logoText: {
      background: "linear-gradient(135deg, #2d3436 0%, #636e72 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      fontSize: "clamp(1.3rem, 4vw, 1.6rem)",
      fontWeight: "800",
      margin: 0,
      letterSpacing: "-0.5px",
    },
    hamburger: {
      display: "none",
      backgroundColor: "transparent",
      border: "none",
      color: "#2d3436",
      fontSize: "1.8rem",
      cursor: "pointer",
      padding: "5px",
    },
    navLinks: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
      flexWrap: "wrap",
    },
    mobileNavLinks: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      width: "100%",
      marginTop: "20px",
      padding: "20px 0",
      borderTop: "1px solid #ecf0f1",
    },
    navButton: {
  backgroundColor: "transparent",
  color: "#2d3436",
  border: "none",
  padding: "10px",  // 👈 Reduced padding
  cursor: "pointer",
  transition: "all 0.3s ease",
  position: "relative",
},
    activeNavButton: {
      background: "linear-gradient(135deg, #5a6c7d 0%, #4a5568 100%)",
      color: "white",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
    },
   cartButton: {
  background: "transparent",
  color: "#2d3436",
  border: "none",
  padding: "10px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: "8px",
},
    cartBadge: {
      position: "absolute",
      top: "-8px",
      right: "-8px",
      background: "linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)",
      color: "#2d3436",
      borderRadius: "50%",
      width: "24px",
      height: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "0.75rem",
      fontWeight: "bold",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      border: "2px solid white",
    },
    loginButton: {
    background: "transparent",
    color: "#2d3436",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    },
    userSection: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      padding: "10px 24px",
      borderRadius: "50px",
      border: "2px solid rgba(255, 255, 255, 0.8)",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    },
    welcomeText: {
      color: "#2d3436",
      fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
      fontWeight: "500",
      margin: 0,
    },
    logoutButton: {
      background: "linear-gradient(135deg, #5a6c7d 0%, #4a5568 100%)",
      color: "white",
      border: "none",
      padding: "8px 20px",
      borderRadius: "20px",
      cursor: "pointer",
      fontSize: "clamp(0.85rem, 2.5vw, 0.9rem)",
      fontWeight: "500",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
    },
  };

  const mediaQueryStyle = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }

    @media (max-width: 768px) {
      .navbar {
        padding: 15px 20px !important;
      }
      
      .hamburger {
        display: block !important;
      }
      
      .nav-links-desktop {
        display: none !important;
      }
      
      .nav-button {
        width: 100%;
        justify-content: center;
      }
      
      .user-section {
        width: 100%;
        justify-content: center;
      }
    }
  `;

  const handleNavClick = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <style>{mediaQueryStyle}</style>
      
      <nav style={styles.navbar} className="navbar">
        <div style={styles.logo} onClick={() => handleNavClick("menu")}>
          <span style={styles.logoIcon}>🍴</span>
          <h1 style={styles.logoText}>FoodieHub</h1>
        </div>

        <button
          style={styles.hamburger}
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

        <div style={styles.navLinks} className="nav-links-desktop">
          <button
            onClick={() => handleNavClick("menu")}
            style={{
              ...styles.navButton,
              ...(activePage === "menu" ? styles.activeNavButton : {}),
            }}
            onMouseEnter={(e) => {
              if (activePage !== "menu") {
                e.currentTarget.style.backgroundColor = "#f8f9fa";
              }
            }}
            onMouseLeave={(e) => {
              if (activePage !== "menu") {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            
          </button>

          <button
            onClick={() => handleNavClick("cart")}
            style={{
              ...styles.cartButton,
              ...(activePage === "cart" ? { transform: "scale(1.05)" } : {}),
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = activePage === "cart" ? "scale(1.05)" : "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
            }}
          >
            <HiOutlineShoppingCart size={28} /> 
            {cart.length > 0 && (
              <span style={styles.cartBadge}>{cart.length}</span>
            )}
          </button>

          <button
            onClick={() => handleNavClick("orders")}
            style={{
              ...styles.navButton,
              ...(activePage === "orders" ? styles.activeNavButton : {}),
            }}
            onMouseEnter={(e) => {
              if (activePage !== "orders") {
                e.currentTarget.style.backgroundColor = "#f8f9fa";
              }
            }}
            onMouseLeave={(e) => {
              if (activePage !== "orders") {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <HiOutlineClipboardList size={28} />
          </button>

          {!user ? (
            <button
              onClick={() => handleNavClick("login")}
              style={styles.loginButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
              }}
            >
              <HiOutlineUser size={28} />
            </button>
          ) : (
            <div style={styles.userSection} className="user-section">
              <span style={styles.welcomeText}>
                👋 {user.name}
              </span>
              <button
                onClick={handleLogout}
                style={styles.logoutButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.15)";
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {mobileMenuOpen && (
          <div style={styles.mobileNavLinks}>
            <button
              onClick={() => handleNavClick("menu")}
              style={{
                ...styles.navButton,
                ...(activePage === "menu" ? styles.activeNavButton : {}),
              }}
            >
              <MdOutlineRestaurantMenu size={28} />
            </button>

            <button
              onClick={() => handleNavClick("cart")}
              style={{
                ...styles.cartButton,
                width: "100%",
                justifyContent: "center",
              }}
            >
              <HiOutlineShoppingCart size={28} /> 
              {cart.length > 0 && (
                <span style={styles.cartBadge}>{cart.length}</span>
              )} 
            </button>

            <button
              onClick={() => handleNavClick("orders")}
              style={{
                ...styles.navButton,
                ...(activePage === "orders" ? styles.activeNavButton : {}),
              }}
            >
              <HiOutlineClipboardList size={28} />
            </button>

            {!user ? (
              <button
                onClick={() => handleNavClick("login")}
                style={{...styles.loginButton, width: "100%"}}
              >
               <HiOutlineUser size={28} />
              </button>
            ) : (
              <div style={{...styles.userSection, width: "100%", justifyContent: "center"}}>
                <span style={styles.welcomeText}>👋 {user.name}</span>
                <button onClick={handleLogout} style={styles.logoutButton}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {activePage === "menu" && <MenuPage user={user} addToCart={addToCart} />}
      {activePage === "cart" && (
        <CartPage 
          user={user} 
          cart={cart} 
          removeFromCart={removeFromCart} 
          clearCart={clearCart} 
          setActivePage={setActivePage} 
        />
      )}
      {activePage === "orders" && <OrdersPage />}
      {activePage === "login" && !user && (
        <LoginPage setUser={setUser} setActivePage={setActivePage} />
      )}
      {activePage === "register" && !user && (
        <RegisterPage setUser={setUser} setActivePage={setActivePage} />
      )}
    </div>
  );
}

export default App;