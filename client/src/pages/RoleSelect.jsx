import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const navigate = useNavigate();

  const selectRole = (role) => {
    localStorage.setItem("selectedRole", role);

    if (role === "Manager") {
      navigate("/manager-login");
    } else {
      navigate("/cashier-login");
    }
  };
  <div
    style={{
      textAlign: "center",
      marginBottom: "50px",
      
    }}
  >
    <h1
      style={{
        color: "white",
        fontSize: "70px",
        fontWeight: "bold",
        marginBottom: "10px",
        letterSpacing: "3px",
      
      }}
    >
      
    </h1>

    <p
      style={{
        color: "#a79ad2",
        fontSize: "20px",
      }}
    >
      
    </p>
  </div>;
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          padding: "40px",
          borderRadius: "20px",
          width: "420px",
          textAlign: "center",
          color: "white",
          boxShadow: "0 0 30px rgba(0,0,0,0.4)",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
          }}
        >
          🛍️ Zudio Lite{" "}
        </h1>

        <p
          style={{
            color: "#f0edf8",
            marginBottom: "30px",
            fontSize: "20px",
          }}
        >
         Clothing Store Billing 
        </p>
          <div
  style={{
    textAlign: "center",
    // marginBottom: "50px",
    
  }}
>


  <p
    style={{
      color: "#94a3b8",
      fontSize: "20px",
    }}
  >
   Select your role
  </p>
</div>
        <button
          onClick={() => selectRole("Manager")}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "15px",
            border: "none",
            borderRadius: "12px",
            background: "#3b82f6",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          👨‍💼 Manager
        </button>

        <button
          onClick={() => selectRole("Cashier")}
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "12px",
            background: "#22c55e",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          🧾 Cashier
        </button>
      </div>
    </div>
  );
}
