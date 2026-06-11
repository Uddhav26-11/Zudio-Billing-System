import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const productRes = await axios.get("http://localhost:5000/api/products");

      const billRes = await axios.get("http://localhost:5000/api/bills", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setProducts(productRes.data);

      setBills(billRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const revenue = bills.reduce((sum, bill) => sum + bill.totalAmount, 0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
      }}
    >
      <Navbar />
      {" "}
      <h1>Manager Dashboard </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          marginTop: "30px",
          
        }}
      >
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Total Products</h3>

          <h1>{products.length}</h1>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Total Bills</h3>

          <h1>{bills.length}</h1>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Revenue</h3>

          <h1>₹{revenue.toFixed(2)}</h1>
        </div>
      </div>
      <Link to="/billing">
        <button
          style={{
            marginTop: "30px",
            padding: "12px 25px",
            background: "#ee1313",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          OPEN POS
        </button>
      </Link>
    </div>
  );
}
