import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContest } from "../context/AppContest";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData  } = useContext(AppContest);
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        style={styles.logo}
      />
      <div style={styles.box}>
        <h2 style={styles.title}>{state === "Sign Up" ? "Create account :" : "Login"}</h2>
        <p style={styles.subtitle}>{state === "Sign Up" ? "Create your account :" : "Login to your account!"}</p>
        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div style={styles.inputGroup}>
              <img src={assets.person_icon} alt="" style={styles.icon} />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                required
                style={styles.input}
              />
            </div>
          )}

          <div style={styles.inputGroup}>
            <img src={assets.mail_icon} alt="" style={styles.icon} />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email id"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <img src={assets.lock_icon} alt="" style={styles.icon} />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              style={styles.input}
            />
          </div>

          <p onClick={() => navigate('/reset-password')} style={styles.forgotPassword}>Forgot Password?</p>
          <button style={styles.button}>{state}</button>
        </form>
        
        {state === "Sign Up" ? (
          <p style={styles.switchText}>
            Already have an account?{" "}
            <span onClick={() => setState("Login")} style={styles.switchLink}>Login here!</span>
          </p>
        ) : (
          <p style={styles.switchText}>
            Don't have an account?{" "}
            <span onClick={() => setState("Sign Up")} style={styles.switchLink}>Sign up!</span>
          </p>
        )}
      </div>
    </div>
  );
};

// Inline Styles Object
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "1.5rem",
    background: "linear-gradient(to bottom right, #bfdbfe, #d8b4fe)",
    position: "relative",
  },
  logo: {
    position: "absolute",
    left: "20px",
    top: "20px",
    width: "120px",
    cursor: "pointer",
  },
  box: {
    backgroundColor: "#1e293b",
    padding: "2.5rem",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    color: "#a5b4fc",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "white",
    marginBottom: "0.75rem",
  },
  subtitle: {
    fontSize: "0.9rem",
    marginBottom: "1.5rem",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#333a5c",
    padding: "10px 15px",
    borderRadius: "30px",
    marginBottom: "1rem",
  },
  icon: {
    width: "20px",
  },
  input: {
    background: "transparent",
    outline: "none",
    border: "none",
    color: "white",
    fontSize: "1rem",
    width: "100%",
  },
  forgotPassword: {
    color: "#818cf8",
    cursor: "pointer",
    marginBottom: "1rem",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "30px",
    border: "none",
    background: "linear-gradient(to right, #6366f1, #312e81)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  switchText: {
    color: "#d1d5db",
    fontSize: "0.8rem",
    marginTop: "1rem",
  },
  switchLink: {
    color: "#60a5fa",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Login;
