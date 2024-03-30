import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Addpg from "./Addpg";
import Pglist from "./Pglist";

export default function Adminscreen() {
  const userstate = useSelector((state) => state.loginUserReducer);
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    console.log("Adminscreen component rendered");
  }, []);

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2 style={{ fontSize: "35px" }}>Admin Panel</h2>
          {user && (
            <ul className="adminfunctions">
              <li>
                <Link to="/admin/pglist" style={{ color: "white" }}>
                  PG List
                </Link>
              </li>
              <li>
                <Link to="/admin/addpg" style={{ color: "white" }}>
                  Add PG
                </Link>
              </li>
            </ul>
          )}
          {!user && (
            <ul className="adminfunctions">
              <li>
                <Link to="/panel" style={{ color: "white" }}>
                  Admin Sign In{" "}
                </Link>
              </li>
            </ul>
          )}

          <Routes>
            <Route path="/*" element={<Navigate to="/admin/pglist" />} />
            <Route path="/pglist" element={<Pglist />} />
            <Route path="/addpg" element={<Addpg />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
