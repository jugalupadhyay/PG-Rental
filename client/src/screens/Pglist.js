import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePg, getAllPgs } from "../actions/pgActions";
import "@fortawesome/fontawesome-free/css/all.css";
import styled, { keyframes } from "styled-components";

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Styled components for animation
const AnimatedTable = styled.table`
  animation: ${fadeIn} 1s ease; 
`;

const AnimatedTd = styled.td`
  animation: ${fadeIn} 1s ease; 
`;

const AnimatedTr = styled.tr`
  animation: ${fadeIn} 1s ease;
`;

export default function Pglist() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const pgsstate = useSelector((state) => state.getAllPgsReducer);
  const { pgs, error, loading } = pgsstate;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPgs());
  }, []);
  return (
    <div style={{ overflowX: "auto" }}>
      <h2>Pg List</h2>
      <table className="table table-bordered">
        <thead className="thead">
          <tr>
            <th>Name</th>
            <th>Prices</th>
            <td>facility Prices</td>
            <th>Catagory</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pgs &&
            pgs.map((pg, index) => {
              return (
                <AnimatedTr key={index}>
                  <AnimatedTd>{pg.name}</AnimatedTd>
                  <AnimatedTd>
                    Single_Sharing: {pg.prices[0]["Single_Sharing"]}
                    <br />
                    double_Sharing: {pg.prices[0]["double_Sharing"]}
                    <br />
                    triple_Sharing: {pg.prices[0]["triple_Sharing"]}
                  </AnimatedTd>
                  <AnimatedTd>
                    AC: {pg.facilityPrices[0]["AC"]}
                    <br />
                  </AnimatedTd>
                  <AnimatedTd>{pg.catagory}</AnimatedTd>
                  {user && (
                    <AnimatedTd>
                      <i
                        className="fa fa-trash m-1"
                        style={{ color: "red" }}
                        onClick={() => {
                          dispatch(deletePg(pg._id));
                        }}
                      ></i>
                    </AnimatedTd>
                  )}
                  {!user && <AnimatedTd></AnimatedTd>}
                </AnimatedTr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
