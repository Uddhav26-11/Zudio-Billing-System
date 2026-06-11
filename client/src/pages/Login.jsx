import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const selectedRole = localStorage.getItem("selectedRole");

  const login = async () => {
    try {
      const res = await axios.post("https://zudio-billing-system-1.onrender.com/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (selectedRole === "Manager" && res.data.user.role === "Manager") {
        toast.success("Manager Login Successful");

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      } else if (
        selectedRole === "Cashier" &&
        res.data.user.role === "Cashier"
      ) {
        toast.success("Cashier Login Successful");

        setTimeout(() => {
          window.location.href = "/billing";
        }, 1000);
      } else {
        toast.error("Wrong Role Selected");

        localStorage.removeItem("token");

        localStorage.removeItem("user");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #020617, #0f172a, #1e293b)",
      }}
    >
      <div
        style={{
          width: "500px",
          background: "",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 0 25px rgba(0,0,0,0.3)",
        }}
      >
      <button
  onClick={() => {
    window.location.href = "/";
  }}
  style={{
    position: "absolute",
    top: "15px",
    left: "15px",
    background: "rgb(71, 85, 105)",
    color: "white",
    border: "none",
    padding: "12px 22px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    zIndex: 999,
  }}
>
  ← Back
</button>
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
            

          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "45px",
              marginBottom: "10px",
              fontWeight: "bold",
              // background:"#e40404"
            }}
          >
            ZUDIO LITE
          </h1>

          <p
            style={{
              color: "#94a3b8",
                
              fontSize: "16px",
            }}
          >
            Clothing Store Billing 
          </p>
        </div>

        <h3
          style={{
            textAlign: "center",
            color: "#45bcca",
            marginBottom: "20px",
          }}
        >
          {selectedRole} Login
        </h3>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "none",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "none",
          }}
        />

        <button
          onClick={login}
          style={{
            width: "100%",
            padding: "12px",
            background: "#3b82f6",
            border: "none",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
