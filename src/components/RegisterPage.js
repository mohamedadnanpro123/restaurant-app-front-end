import React, { useState } from "react";
import { API_BASE } from "../config/api";

const RegisterPage = ({ setUser, setActivePage }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
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
        
        console.log("✅ Registration successful");
        setActivePage("menu");
      } else {
        setError(data.error || data.message || "Registration failed");
      }
    } catch (err) {
      setError("Server error. Please try again.");
      console.error("Registration error:", err);
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
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      padding: "40px 20px",
    },
    card: {
      maxWidth: "450px",
      width: "100%",
      background: "white",
      borderRadius: "24px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
      padding: "50px 40px",
      position: "relative",
      overflow: "hidden",
    },
    decorativeCircle: {
      position: "absolute",
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #5a6c7d 0%, #4a5568 100%)",
      opacity: 0.08,
      top: "-100px",
      left: "-100px",
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
    },
    title: {
      fontSize: "clamp(1.8rem, 5vw, 2.2rem)",
      fontWeight: "700",
      background: "linear-gradient(135deg, #2d3436 0%, #636e72 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "8px",
    },
    subtitle: {
      color: "#636e72",
      fontSize: "clamp(0.95rem, 3vw, 1.05rem)",
      fontWeight: "400",
    },
    errorBox: {
      background: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
      color: "white",
      padding: "15px 20px",
      borderRadius: "12px",
      marginBottom: "25px",
      fontSize: "0.95rem",
      fontWeight: "500",
      boxShadow: "0 4px 12px rgba(231, 76, 60, 0.25)",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    inputGroup: {
      marginBottom: "20px",
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
      fontWeight: "600",
      background: "linear-gradient(135deg, #5a6c7d 0%, #4a5568 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.12)",
      marginTop: "10px",
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
      color: "#5a6c7d",
      fontWeight: "600",
      cursor: "pointer",
      textDecoration: "none",
      transition: "all 0.2s ease",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.decorativeCircle}></div>
        
        <div style={styles.header}>
          <div style={styles.icon}>✨</div>
          <h2 style={styles.title}>Join FoodieHub</h2>
          <p style={styles.subtitle}>Create your account and start ordering!</p>
        </div>
        
        {error && (
          <div style={styles.errorBox}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = "#5a6c7d";
                e.target.style.backgroundColor = "white";
                e.target.style.boxShadow = "0 0 0 4px rgba(90, 108, 125, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ecf0f1";
                e.target.style.backgroundColor = "#f8f9fa";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

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
                e.target.style.borderColor = "#5a6c7d";
                e.target.style.backgroundColor = "white";
                e.target.style.boxShadow = "0 0 0 4px rgba(90, 108, 125, 0.1)";
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
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = "#5a6c7d";
                e.target.style.backgroundColor = "white";
                e.target.style.boxShadow = "0 0 0 4px rgba(90, 108, 125, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ecf0f1";
                e.target.style.backgroundColor = "#f8f9fa";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = "#5a6c7d";
                e.target.style.backgroundColor = "white";
                e.target.style.boxShadow = "0 0 0 4px rgba(90, 108, 125, 0.1)";
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
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.15)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.12)";
              }
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div style={styles.footer}>
          Already have an account?{" "}
          <span
            style={styles.link}
            onClick={() => setActivePage("login")}
            onMouseEnter={(e) => {
              e.target.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              e.target.style.textDecoration = "none";
            }}
          >
            Login here
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;