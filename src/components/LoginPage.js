import React, { useState } from "react";
import { API_BASE } from "../config/api";

const LoginPage = ({ setUser, setActivePage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        setUser({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          token: data.token
        });
        
        console.log("✅ Login successful");
        setActivePage("menu");
      } else {
        setError(data.error || data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 20px",
    },
    card: {
      maxWidth: "450px",
      width: "100%",
      background: "white",
      borderRadius: "24px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      padding: "50px 40px",
      position: "relative",
      overflow: "hidden",
    },
    decorativeCircle: {
      position: "absolute",
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      opacity: 0.1,
      top: "-100px",
      right: "-100px",
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
      position: "relative",
      zIndex: 1,
    },
    icon: {
      fontSize: "3.5rem",
      marginBottom: "15px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    title: {
      fontSize: "clamp(1.8rem, 5vw, 2.2rem)",
      fontWeight: "900",
      background: "linear-gradient(135deg, #2d3436 0%, #636e72 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "8px",
    },
    subtitle: {
      color: "#636e72",
      fontSize: "clamp(0.95rem, 3vw, 1.05rem)",
      fontWeight: "500",
    },
    errorBox: {
      background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
      color: "white",
      padding: "15px 20px",
      borderRadius: "12px",
      marginBottom: "25px",
      fontSize: "0.95rem",
      fontWeight: "600",
      boxShadow: "0 4px 12px rgba(255, 107, 107, 0.3)",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    inputGroup: {
      marginBottom: "25px",
      position: "relative",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      color: "#2d3436",
      fontSize: "0.95rem",
      fontWeight: "600",
      paddingLeft: "5px",
    },
    input: {
      width: "100%",
      padding: "16px 20px",
      fontSize: "1rem",
      border: "2px solid #ecf0f1",
      borderRadius: "12px",
      outline: "none",
      boxSizing: "border-box",
      transition: "all 0.3s ease",
      backgroundColor: "#f8f9fa",
      fontFamily: "inherit",
    },
    button: {
      width: "100%",
      padding: "18px 20px",
      fontSize: "1.1rem",
      fontWeight: "800",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
      position: "relative",
      overflow: "hidden",
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: "not-allowed",
    },
    footer: {
      textAlign: "center",
      marginTop: "30px",
      fontSize: "0.95rem",
      color: "#636e72",
    },
    link: {
      color: "#667eea",
      fontWeight: "700",
      cursor: "pointer",
      textDecoration: "none",
      transition: "all 0.2s ease",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      margin: "30px 0",
      color: "#b2bec3",
      fontSize: "0.85rem",
    },
    dividerLine: {
      flex: 1,
      height: "1px",
      background: "#ecf0f1",
    },
    dividerText: {
      padding: "0 15px",
      fontWeight: "600",
    },
    demoButton: {
      width: "100%",
      padding: "14px 20px",
      fontSize: "0.95rem",
      fontWeight: "700",
      background: "white",
      color: "#636e72",
      border: "2px solid #ecf0f1",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.decorativeCircle}></div>
        
        <div style={styles.header}>
          <div style={styles.icon}>🔐</div>
          <h2 style={styles.title}>Welcome Back!</h2>
          <p style={styles.subtitle}>Login to continue your food journey</p>
        </div>
        
        {error && (
          <div style={styles.errorBox}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.backgroundColor = "white";
                e.target.style.boxShadow = "0 0 0 4px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ecf0f1";
                e.target.style.backgroundColor = "#f8f9fa";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.backgroundColor = "white";
                e.target.style.boxShadow = "0 0 0 4px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ecf0f1";
                e.target.style.backgroundColor = "#f8f9fa";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {})
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(102, 126, 234, 0.5)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.4)";
              }
            }}
          >
            {loading ? "Logging in..." : "Login to FoodieHub"}
          </button>
        </form>

        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <span style={styles.dividerText}>OR</span>
          <div style={styles.dividerLine}></div>
        </div>

        <button
          onClick={() => {
            setEmail("demo@example.com");
            setPassword("demo123");
          }}
          style={styles.demoButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#667eea";
            e.currentTarget.style.color = "#667eea";
            e.currentTarget.style.background = "#f8f9fa";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#ecf0f1";
            e.currentTarget.style.color = "#636e72";
            e.currentTarget.style.background = "white";
          }}
        >
          Use Demo Credentials
        </button>

        <div style={styles.footer}>
          Don't have an account?{" "}
          <span
            style={styles.link}
            onClick={() => setActivePage("register")}
            onMouseEnter={(e) => {
              e.target.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              e.target.style.textDecoration = "none";
            }}
          >
            Sign up now
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;