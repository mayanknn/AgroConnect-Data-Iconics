import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ShowProfileContext } from "../../context/ShowProfileContext";
import logo from "../../assets/logo.png";
import "./Vendor.css";
function Vendor() {
  const navigate = useNavigate();
  const { showProfile, setShowProfile } = useContext(ShowProfileContext);

  const localuser = localStorage.getItem("userData");
  const userData = JSON.parse(localuser);
  console.log(userData);

  function handleLogout() {
    // Common for every profile
    localStorage.removeItem("userData");
    setShowProfile(false);
    navigate("/");
  }
  const navButtonStyle = {
    padding: "10px 20px",
    backgroundColor: "#ffffff",
    color: "#333",
    border: "2px solid #ffffff",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    letterSpacing: "1px",
  };

  return (
    <div>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          // padding: '10px 20px',
          boxShadow: "0 2px 5px green",
          marginBottom: "550px",
          padding: "2vh 3vw",
        }}
      >
        {/* Logo on the left */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "10vw", marginRight: "20px" }}
          />
        </div>

        {/* Navigation items on the right */}
        <div style={{ display: "flex", gap: "20px" }}>
          <button onClick={() => navigate("news")} style={navButtonStyle}>
            News
          </button>
          <button
            onClick={() => navigate("/vendor/upload")}
            style={navButtonStyle}
          >
            Upload
          </button>
          <button
            onClick={() => navigate("/vendor/inventory")}
            style={navButtonStyle}
          >
            My Inventory
          </button>
          <button onClick={() => navigate("orders")} style={navButtonStyle}>
            My Orders
          </button>
          <button onClick={() => setShowProfile(true)} style={navButtonStyle}>
            Profile
          </button>
        </div>
      </nav>
      
      {showProfile && (
        <div
          style={{
            position: "fixed",
            top: "15vh",
            right: "5vw",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            padding: "20px",
            width: "300px",
            maxHeight: "80vh",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            <img
              src={userData?.ProfileImage || "default-image-url.jpg"}
              alt="Profile"
              style={{
                width: "20vw",
                height: "20vw",
                backgroundColor:'yellow',
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #4CAF50",
              }}
            />
          </div>
          <button
            onClick={() => setShowProfile(false)}
            style={{
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              float: "right",
            }}
          >
            Close
          </button>
          <div
            style={{
              color: "#333",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <p
              style={{
                margin: "10px 0",
              }}
            >
              <strong>Name:</strong> {userData?.Username || "N/A"}
            </p>
            <p
              style={{
                margin: "10px 0",
              }}
            >
              <strong>Email:</strong> {userData?.Email || "N/A"}
            </p>
            <p
              style={{
                margin: "10px 0",
              }}
            >
              <strong>Contact:</strong> {userData?.Phone || "N/A"}
            </p>
            <p
              style={{
                margin: "10px 0",
              }}
            >
              <strong>Role:</strong> {userData?.role || "N/A"}
            </p>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                marginTop: "10px",
                display: "block",
                width: "100%",
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
}

export default Vendor;
