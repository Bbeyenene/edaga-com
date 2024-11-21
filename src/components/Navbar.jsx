import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaSignInAlt,
  FaShoppingCart,
  FaInfoCircle,
  FaEnvelope,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { RiApps2AddLine } from "react-icons/ri";
import { useAuth } from "..//contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { user, login, logout } = useAuth(); // Fixed useAuth context
  const { cartItems } = useContext(CartContext);

  useEffect(() => {
    // Calculate total quantity in cart
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.itemsToBuy, 0);
    setCartCount(totalQuantity);
  }, [cartItems]);

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout(); // Log out using the AuthContext
    navigate("/");
    setIsMobile(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink
          to="/"
          className="logo-link"
          onClick={() => {
            setIsMobile(false);
            setIsDropdownOpen(false);
          }}
        >
          Online Business
        </NavLink>
      </div>
      <div
        className="menu-icon"
        onClick={toggleMobileMenu}
        aria-label="Menu"
        aria-expanded={isMobile}
      >
        {isMobile ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={isMobile ? "navbar-links mobile" : "navbar-links"}>
        {/* Dashboard Dropdown */}
        {user && (user.role === "buyer" || user.role === "seller") && (
          <li className="dropdown">
            <div
              className="dropdown-toggle"
              onClick={toggleDropdown}
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") toggleDropdown();
              }}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              <FaTachometerAlt className="icon" /> Dashboard{" "}
              <FaChevronDown className="dropdown-icon" />
            </div>
            <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
              {user.role === "buyer" && (
                <li>
                  <NavLink
                    to="/buyer/dashboard"
                    className="dropdown-link"
                    onClick={() => {
                      setIsMobile(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Buyer Dashboard
                  </NavLink>
                </li>
              )}
              {user.role === "seller" && (
                <li>
                  <NavLink
                    to="/seller/dashboard"
                    className="dropdown-link"
                    onClick={() => {
                      setIsMobile(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Seller Dashboard
                  </NavLink>
                </li>
              )}
            </ul>
          </li>
        )}

        {/* Add Product */}
        <li>
          <NavLink
            to="/add"
            className="nav-link"
            onClick={() => setIsMobile(false)}
          >
            <RiApps2AddLine />
          </NavLink>
        </li>

        {/* Cart */}
        <li>
          <NavLink
            to="/cart"
            className="nav-link"
            style={{ display: "flex" }}
            onClick={() => setIsMobile(false)}
          >
            <FaShoppingCart
              className="icon"
              style={{
                border: "2px solid lightgray",
                borderRadius: "20px",
                padding: "2px",
                fontSize: "25px",
              }}
            />
            {cartCount > 0 && (
              <span
                style={{
                  color: "red",
                  marginTop: "-8px",
                  marginLeft: "-5px",
                  fontSize: "16px",
                  fontWeight: "bolder",
                }}
              >
                {cartCount}
              </span>
            )}
          </NavLink>
        </li>

        {/* About */}
        <li>
          <NavLink
            to="/about"
            className="nav-link"
            onClick={() => setIsMobile(false)}
          >
            <FaInfoCircle className="icon" /> About
          </NavLink>
        </li>

        {/* Contact */}
        <li>
          <NavLink
            to="/contacts"
            className="nav-link"
            onClick={() => setIsMobile(false)}
          >
            <FaEnvelope className="icon" /> Contact
          </NavLink>
        </li>

        {/* Login or Logout */}
        {!user ? (
          <li>
            <button
              className="login-button nav-link"
              onClick={() => {
                setIsMobile(false);
                login(); // Redirect to Okta login
              }}
            >
              <FaSignInAlt className="icon" /> Login
            </button>
          </li>
        ) : (
          <li>
            <button className="logout-button nav-link" onClick={handleLogout}>
              <FaSignOutAlt className="icon" /> Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
