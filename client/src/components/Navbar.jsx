import { useNavigate } from "react-router-dom";
export default function Navbar() {
const navigate = useNavigate();
const logout = () => {
localStorage.removeItem("token");
localStorage.removeItem("user");
localStorage.removeItem("selectedRole");


window.location.href = "/";


};

return (
<div
style={{
display: "flex",
justifyContent: "space-between",
alignItems: "center",
marginBottom: "20px",
}}
>
<button
onClick={() =>
window.history.back()
}
style={{
background: "#475569",
color: "white",
border: "none",
padding: "10px 15px",
borderRadius: "8px",
cursor: "pointer",
}}
>
← Back </button>


  <button
    onClick={logout}
    style={{
      background: "#ef4444",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    Logout
  </button>
</div>


);
}
