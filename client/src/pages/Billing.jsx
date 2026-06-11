import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

export default function Billing() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [generatedBill, setGeneratedBill] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://zudio-billing-system-1.onrender.com/api/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);

    if (found) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          qty: 1,
        },
      ]);
    }

    toast.success(`${product.productName} Added`);
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id
            ? {
                ...item,
                qty: item.qty - 1,
              }
            : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  const generateBill = async () => {
    if (cart.length === 0) {
      toast.error("Please add at least one product");
      return;
    }
   const printBill = () => {
  const printContents =
    document.getElementById("bill-print")?.innerHTML;

  if (!printContents) {
    toast.error("No bill available to print");
    return;
  }

  const printWindow = window.open(
    "",
    "",
    "height=600,width=800"
  );

  printWindow.document.write(`
    <html>
      <head>
        <title>Zudio Lite Bill</title>
      </head>
      <body>
        ${printContents}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.print();
};

    try {
      const token = localStorage.getItem("token");

      const billProducts = cart.map((item) => ({
        productId: item._id,
        productName: item.productName,
        quantity: item.qty,
        price: item.price,
      }));

      const res = await axios.post(
         "https://zudio-billing-system-1.onrender.com/api/bills",
        {
          products: billProducts,
          paymentMethod: "Cash",
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      setGeneratedBill(res.data);

      toast.success("Bill Generated Successfully");

      setCart([]);

      fetchProducts();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Bill Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "20px",
      }}
    >
      {" "}
      <Navbar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>Products</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "15px",
              marginTop: "15px",
            }}
          >
            {products.map((product) => (
              <div
                key={product._id}
                style={{
                  background: "#334155",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                <h3>{product.productName}</h3>

                <p>Price : ₹{product.price}</p>

                <p>Stock :{product.stock}</p>

                <button
                  onClick={() => addToCart(product)}
                  style={{
                    width: "100%",
                    background: "#3b82f6",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "6px",
                  }}
                >
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>Cart</h2>

          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#334155",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            >
              <span>{item.productName}</span>

              <div>
                <button onClick={() => decreaseQty(item._id)}>-</button>

                <span
                  style={{
                    margin: "0 10px",
                  }}
                >
                  {item.qty}
                </span>

                <button onClick={() => increaseQty(item._id)}>+</button>
              </div>
            </div>
          ))}

          <hr />

          <h3>Subtotal ₹{subtotal.toFixed(2)}</h3>

          <h3>GST ₹{gst.toFixed(2)}</h3>

          <h2>Total ₹{total.toFixed(2)}</h2>

          <button
            onClick={generateBill}
            style={{
              width: "100%",
              background: "#22c55e",
              border: "none",
              padding: "12px",
              color: "white",
              borderRadius: "8px",
            }}
          >
            Generate Bill
          </button>

          {generatedBill && (
            <div
             id="bill-print"
              style={{
                marginTop: "20px",
                background: "#334155",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              
              <h2>Zudio Lite Bill</h2>

              <p>Bill No :{generatedBill.billNumber}</p>

              <hr />

              {generatedBill.products.map((item, index) => (
                <div key={index}>
                  {item.productName}
                  {" x "}
                  {item.quantity}
                </div>
              ))}

              <hr />

              <p>Subtotal ₹{generatedBill.subtotal}</p>

              <p>GST ₹{generatedBill.gst}</p>

              <h3>Total ₹{generatedBill.totalAmount}</h3>

              <button
              onClick={() => window.print()}
                style={{
                  width: "100%",
                  marginTop: "10px",
                  padding: "12px",
                  background: "#f59e0b",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                }}
              >
                Print Bill
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
