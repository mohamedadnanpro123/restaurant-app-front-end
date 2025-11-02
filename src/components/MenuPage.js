import React, { useEffect, useState } from "react";
import { API_BASE } from "../config/api";

const MenuPage = ({ user, addToCart }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch(`${API_BASE}/menu`)
      .then((res) => res.json())
      .then((data) => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = ["All", "Pizza", "Burger", "Pasta", "Dessert"];

  const filteredItems = selectedCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => 
        item.name.toLowerCase().includes(selectedCategory.toLowerCase())
      );

  const styles = {
    hero: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "80px 20px",
      textAlign: "center",
      color: "white",
      position: "relative",
      overflow: "hidden",
    },
    heroTitle: {
      fontSize: "clamp(2.5rem, 8vw, 4rem)",
      fontWeight: "900",
      marginBottom: "20px",
      textShadow: "0 4px 20px rgba(0,0,0,0.2)",
      letterSpacing: "-1px",
    },
    heroSubtitle: {
      fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
      fontWeight: "400",
      opacity: 0.95,
      maxWidth: "600px",
      margin: "0 auto 40px",
      lineHeight: "1.6",
    },
    heroButton: {
      background: "white",
      color: "#667eea",
      border: "none",
      padding: "18px 40px",
      borderRadius: "50px",
      fontSize: "1.1rem",
      fontWeight: "700",
      cursor: "pointer",
      boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
      transition: "all 0.3s ease",
    },
    container: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "60px 20px",
    },
    sectionTitle: {
      fontSize: "clamp(2rem, 5vw, 2.8rem)",
      fontWeight: "800",
      textAlign: "center",
      marginBottom: "20px",
      background: "linear-gradient(135deg, #2d3436 0%, #636e72 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    sectionSubtitle: {
      textAlign: "center",
      color: "#636e72",
      fontSize: "clamp(1rem, 3vw, 1.2rem)",
      marginBottom: "50px",
      maxWidth: "600px",
      margin: "0 auto 50px",
    },
    categoryFilter: {
      display: "flex",
      gap: "15px",
      justifyContent: "center",
      flexWrap: "wrap",
      marginBottom: "50px",
    },
    categoryButton: {
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
    activeCategoryButton: {
      background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
      color: "white",
      border: "2px solid transparent",
      boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
    },
    menuGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "30px",
    },
    menuCard: {
      background: "white",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      cursor: "pointer",
      position: "relative",
    },
    imageContainer: {
      position: "relative",
      width: "100%",
      height: "250px",
      overflow: "hidden",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    },
    menuImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.4s ease",
    },
    imageOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)",
      opacity: 0,
      transition: "opacity 0.3s ease",
    },
    cardContent: {
      padding: "25px",
    },
    itemName: {
      fontSize: "1.4rem",
      fontWeight: "700",
      color: "#2d3436",
      marginBottom: "12px",
    },
    itemPrice: {
      fontSize: "1.8rem",
      fontWeight: "800",
      background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "20px",
    },
    addButton: {
      width: "100%",
      background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
      color: "white",
      border: "none",
      padding: "15px",
      borderRadius: "12px",
      fontSize: "1.05rem",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
    },
    loader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "400px",
      fontSize: "2rem",
    },
  };

  if (loading) {
    return (
      <div style={styles.loader}>
        <div>🍕 Loading delicious food...</div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Delicious Food Delivered Quick marwanv best🍕
        </h1>
        <p style={styles.heroSubtitle}>
          Craving something tasty? Order from our curated menu of mouth-watering dishes, 
          prepared fresh and delivered hot to your doorstep!
        </p>
        <button
          style={styles.heroButton}
          onClick={() => document.getElementById('menu-section').scrollIntoView({ behavior: 'smooth' })}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
            e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
          }}
        >
          Explore Menu 👇
        </button>
      </section>

      {/* Menu Section */}
      <div style={styles.container} id="menu-section">
        <h2 style={styles.sectionTitle}>
          Our Popular Dishes
        </h2>
        <p style={styles.sectionSubtitle}>
          Handpicked favorites loved by thousands of food enthusiasts
        </p>

        {/* Category Filter */}
        <div style={styles.categoryFilter}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                ...styles.categoryButton,
                ...(selectedCategory === category ? styles.activeCategoryButton : {}),
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = "#f8f9fa";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div style={styles.menuGrid}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              style={styles.menuCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.15)";
                const img = e.currentTarget.querySelector('img');
                const overlay = e.currentTarget.querySelector('.image-overlay');
                if (img) img.style.transform = "scale(1.1)";
                if (overlay) overlay.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 5px 20px rgba(0,0,0,0.08)";
                const img = e.currentTarget.querySelector('img');
                const overlay = e.currentTarget.querySelector('.image-overlay');
                if (img) img.style.transform = "scale(1)";
                if (overlay) overlay.style.opacity = "0";
              }}
            >
              <div style={styles.imageContainer}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={styles.menuImage}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x250?text=Food+Image";
                  }}
                />
                <div className="image-overlay" style={styles.imageOverlay}></div>
              </div>
              
              <div style={styles.cardContent}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.itemPrice}>{item.price} EGP</p>
                
                <button
                  onClick={() => addToCart(item)}
                  style={styles.addButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 107, 107, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(255, 107, 107, 0.3)";
                  }}
                >
                  Add to Cart 🛒
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#636e72",
            fontSize: "1.2rem"
          }}>
            No items found in this category 😢
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;