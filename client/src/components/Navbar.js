import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaSave, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState(user ? user.name : "");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = () => {
    const updatedUser = { ...user, name: newName };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditName(false);
  };

  const handleEditName = () => {
    if (user) {
      setEditName(true);
    } else {
      navigate("/signin");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu state
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg p-3 mb-5 bg-white rounded">
        <a className="navbar-brand" href="/">
          PG-RENTAL
        </a>
        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    {editName ? (
                      <div className="d-flex align-items-center">
                        <input
                          type="text"
                          value={newName}
                          onChange={handleNameChange}
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                            padding: "3px 2px",
                            marginRight: "-20px",
                            marginTop: "-2px",
                          }}
                        />
                        <button
                          onClick={handleSubmit}
                          style={{
                            border: "none",
                            background: "none",
                            padding: "0",
                            margin: "0",
                            cursor: "pointer",
                            marginLeft: "5px",
                            marginTop: "-8px",
                          }}
                        >
                          <FaSave />
                        </button>
                      </div>
                    ) : (
                      <>
                        {user.name ? (
                          <span>Welcome, {user.name}</span>
                        ) : (
                          <span>Welcome</span>
                        )}
                        <Link
                          to="#"
                          onClick={handleEditName}
                          style={{
                            border: "none",
                            background: "none",
                            padding: "0",
                            margin: "0",
                            cursor: "pointer",
                            marginLeft: "5px",
                          }}
                        >
                          <FaEdit />
                        </Link>
                      </>
                    )}
                  </span>
                </li>
                <div
                  className={`${
                    menuOpen ? "d-flex justify-content-center w-100" : ""
                  }`}
                >
                  {" "}
                  {/* Apply classes only when menu is open */}
                  <li className="nav-item">
                    <button
                      onClick={handleSignOut}
                      className="nav-link"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Log out&nbsp;
                      <FaSignOutAlt />
                    </button>
                  </li>
                </div>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Sign In
                </Link>
              </li>
            )}
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact Admin
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/issues">
                PG Feedback
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
