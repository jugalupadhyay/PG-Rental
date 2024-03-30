import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { addPg } from "../actions/pgActions";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  @media screen and (max-width: 767px) {
    margin-bottom: 20px;
  }

  @media screen and (min-width: 768px) {
    margin-right: 50px;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AnimatedContainer = styled.div`
  animation: ${fadeIn} 1s ease;
`;

export default function Addpg() {
  const [name, setname] = useState("");
  const [sprice, setsprice] = useState("");
  const [dprice, setdprice] = useState("");
  const [tprice, settprice] = useState("");
  const [images, setImages] = useState([]); 
  const [description, setdiscription] = useState("");
  const [catagory, setcatagory] = useState("");
  const [acprice, setacprice] = useState("");
  const [nonacprice, setnonacprice] = useState("");
  const [laundry, setLaundry] = useState(false);
  const [food, setFood] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [refrigerator, setRefrigerator] = useState(false);
  const [parking, setParking] = useState(false);
  const [hotWater, setHotWater] = useState(false);
  const dispatch = useDispatch();
  const addpgstate = useSelector((state) => state.addPgReducer);
  const { success, error, loading } = addpgstate;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  function formHandler(e) {
    e.preventDefault();

    const pg = {
      name,
      description,
      prices: {
        Single_Sharing: sprice,
        double_Sharing: dprice,
        triple_Sharing: tprice,
      },
      facilityPrices: {
        AC: acprice,
        Non_AC: nonacprice,
      },
      catagory,
      description,
      images: [], 
      otherfacilities: {
        laundry,
        food,
        parking,
        wifi,
        refrigerator,
        hotWater,
      },
    };

    // Upload each image sequentially
    const uploadPromises = images.map((imageFile) => {
      const data = new FormData();
      data.append("file", imageFile);
      data.append("upload_preset", "pg-rental");
      data.append("cloud_name", "ashishvinod");

      return fetch("", { //write cloudinary api
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((response) => {
          const imageUrl = response.url;
          console.log("Image uploaded:", imageUrl);
          pg.images.push(imageUrl); // Push uploaded image URL to pg.images
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    });

    // Wait for all uploads to finish before dispatching action
    Promise.all(uploadPromises).then(() => {
      // Dispatch action with updated pg object
      dispatch(addPg(pg));
    });
  }

  return (
    <>
      {user && (
        <AnimatedContainer style={{ overflowX: "auto" }}>
          <div>
            <div>
              <h1>Add PG</h1>

              {loading && <loading />}

              <form onSubmit={formHandler}>
                <input
                  className="form-control"
                  type="text"
                  placeholder="PG Name"
                  value={name}
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                />
                <input
                  className="form-control"
                  type="text"
                  placeholder="PG Address"
                  value={description}
                  onChange={(e) => {
                    setdiscription(e.target.value);
                  }}
                />
                <input
                  className="form-control"
                  type="text"
                  placeholder="Single Sharing Price"
                  value={sprice}
                  onChange={(e) => {
                    setsprice(e.target.value);
                  }}
                />
                <input
                  className="form-control"
                  type="text"
                  placeholder="Double Sharing Price"
                  value={dprice}
                  onChange={(e) => {
                    setdprice(e.target.value);
                  }}
                />
                <input
                  className="form-control"
                  type="text"
                  placeholder="Triple Sharing Price"
                  value={tprice}
                  onChange={(e) => {
                    settprice(e.target.value);
                  }}
                />
                <input
                  className="form-control"
                  type="text"
                  placeholder="AC Room Additional Price"
                  value={acprice}
                  onChange={(e) => {
                    setacprice(e.target.value);
                  }}
                />
                <FormContainer>
                  <p style={{ marginRight: "50px", marginTop: "15px" }}>
                    Facilities :{" "}
                  </p>
                  <CheckboxContainer
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "50px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={laundry}
                      onChange={() => setLaundry(!laundry)}
                    />
                    <label style={{ marginLeft: "5px" }}>Laundry</label>
                  </CheckboxContainer>
                  <CheckboxContainer
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "50px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={food}
                      onChange={() => setFood(!food)}
                    />
                    <label style={{ marginLeft: "5px" }}>Food</label>
                  </CheckboxContainer>
                  <CheckboxContainer
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "50px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={parking}
                      onChange={() => setParking(!parking)}
                    />
                    <label style={{ marginLeft: "5px" }}>Parking</label>
                  </CheckboxContainer>
                  <CheckboxContainer
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "50px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={wifi}
                      onChange={() => setWifi(!wifi)}
                    />
                    <label style={{ marginLeft: "5px" }}>wifi</label>
                  </CheckboxContainer>
                  <CheckboxContainer
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "50px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={refrigerator}
                      onChange={() => setRefrigerator(!refrigerator)}
                    />
                    <label style={{ marginLeft: "5px" }}>Refrigerator</label>
                  </CheckboxContainer>
                  <CheckboxContainer
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <input
                      type="checkbox"
                      checked={hotWater}
                      onChange={() => setHotWater(!hotWater)}
                    />
                    <label style={{ marginLeft: "5px", marginRight: "50px" }}>
                      Hot_Water
                    </label>
                  </CheckboxContainer>
                </FormContainer>
                <select
                  className="form-control"
                  value={catagory}
                  onChange={(e) => {
                    setcatagory(e.target.value);
                  }}
                >
                  <option value="">Select Category</option>
                  <option value="girlspg">Girls PG</option>
                  <option value="boyspg">Boys PG</option>
                </select>
                <input
                  className="form-control"
                  type="file"
                  placeholder="Image"
                  accept="image/*"
                  onChange={(event) => {
                    // Convert FileList to array and update state
                    const filesArray = Array.from(event.target.files);
                    setImages([...images, ...filesArray]);
                  }}
                  multiple // Allow multiple file selection
                />
                <button className="btn" type="submit">
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </AnimatedContainer>
      )}
    </>
  );
}
