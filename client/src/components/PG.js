import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTshirt,
  faUtensils,
  faCar,
  faShower,
  faWifi,
  faSnowflake,
} from "@fortawesome/free-solid-svg-icons";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";
import "./PG.css";

export default function PG({ pg }) {
  const [facility, setfacility] = useState(pg.facility[0]);
  const [varient, setvarient] = useState(pg.varients[0]);
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const userToken = localStorage.getItem("jwt");
    setUser(JSON.parse(localStorage.getItem("user")));
    setIsLoggedIn(!!userToken);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= pg.images.length ? 0 : nextIndex;
    });
  };

  const prevImage = () => {
    setCurrentImageIndex((currentIndex) => {
      const prevIndex = currentIndex - 1;
      return prevIndex < 0 ? pg.images.length - 1 : prevIndex;
    });
  };

  const getPrice = () => {
    if (!pg || !pg.facility || !pg.facilityPrices || !pg.prices) {
      return 0;
    }

    const facilityIndex = pg.facility.indexOf(facility);

    if (pg.facilityPrices.length > 0 && facilityIndex !== -1) {
      const facilityPrice =
        parseFloat(pg.facilityPrices[facilityIndex]?.[facility]) || 0;

      const varientPrice = parseFloat(pg.prices[0]?.[varient]) || 0;

      return facilityPrice + varientPrice;
    } else {
      return 0;
    }
  };

  const makePayment = async () => {
    const stripe = await loadStripe(
      ""//write stripe api eg: pk_test...
    );

    const body = {
      products: [
        {
          name: pg.name,
          image: pg.image,
          price: getPrice(),
        },
      ],
    };

    const baseUrl = "http://localhost:8000/";
    const response = await fetch(`${baseUrl}create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer TO",
      },
      body: JSON.stringify(body),
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if ((await result).error) {
      console.log((await result).error);
    }
  };

  return (
    <div className="shadow-lg p-3 mb-5 bg-white rounded">
      <b style={{ fontSize: "20px" }}>{pg.name}</b>
      <div className="image-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "0",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
              }}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ fontSize: "20px", color: "#333" }}
                onClick={prevImage}
              />
            </div>
          </div>{" "}
          <img
            src={pg.images[currentImageIndex]}
            style={{ height: "200px", width: "200px" }}
            alt={pg.name}
            onClick={handleShow}
          />
          <div
            style={{
              position: "absolute",
              right: "0",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
              }}
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ fontSize: "20px", color: "#333" }}
                onClick={nextImage}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-container">
        <div className="w-100 m-1">
          <p>varients</p>
          <select
            className="form-control"
            value={varient}
            onChange={(e) => {
              setvarient(e.target.value);
            }}
          >
            {pg.varients.map((varient) => {
              return <option value={varient}>{varient}</option>;
            })}
          </select>
        </div>

        <div className="w-100 m-1">
          <p>Facility</p>
          <select
            className="form-control"
            value={facility}
            onChange={(e) => {
              setfacility(e.target.value);
            }}
          >
            {pg.facility.map((facility) => {
              return <option value={facility}>{facility}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="flex-container">
        <div className="m-1 w-100">
          <h1 className="mt-1">Price: {getPrice()} Rs/-</h1>
        </div>

        {pg.otherfacilities && pg.otherfacilities.length > 0 && (
          <div className="m-1 w-100">
            <p style={{ marginBottom: "5px" }}>Other Facilities</p>
            <div className="facility-icons-container">
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  alignItems: "center",
                  margin: 0,
                  padding: 0,
                }}
              >
                {Object.entries(pg.otherfacilities[0] || {}).map(
                  ([facility, available]) => {
                    if (available) {
                      let icon = null;
                      let facilityName = null;
                      switch (facility) {
                        case "laundry":
                          icon = faTshirt;
                          facilityName = "Laundry";
                          break;
                        case "food":
                          icon = faUtensils;
                          facilityName = "Food";
                          break;
                        case "parking":
                          icon = faCar;
                          facilityName = "Parking";
                          break;
                        case "hotWater":
                          icon = faShower;
                          facilityName = "Hot Water";
                          break;
                        case "wifi":
                          icon = faWifi;
                          facilityName = "WiFi";
                          break;
                        case "refrigerator":
                          icon = faSnowflake;
                          facilityName = "Refrigerator";
                          break;

                        default:
                          break;
                      }
                      return (
                        <li key={facility} style={{ marginRight: "10px" }}>
                          <FontAwesomeIcon
                            icon={icon}
                            className="facility-icon" 
                            title={facilityName}
                          />
                        </li>
                      );
                    }
                    return null;
                  }
                )}
              </ul>
            </div>
          </div>
        )}
      </div>

      {!user && (
        <div className="m-1 w-100">
          <Link to="/">
            <button className="btn">Sign In to Pay</button>
          </Link>
        </div>
      )}

      {user && (
        <div className="m-1 w-100 d-flex justify-content-center">
          <button className="btn" onClick={makePayment}>
            Pay
          </button>
        </div>
      )}

      <Modal show={show}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>{pg.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ display: "flex", flexDirection: "column" }}>
          <div
            className="image-container"
            style={{ position: "relative", textAlign: "center" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    style={{ fontSize: "20px", color: "#333" }}
                    onClick={prevImage}
                  />
                </div>
              </div>
            </div>
            <img
              src={pg.images[currentImageIndex]}
              className="img-fluid"
              style={{ height: "300px", margin: "0 auto" }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: "0",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    style={{ fontSize: "20px", color: "#333" }}
                    onClick={nextImage}
                  />
                </div>
              </div>
            </div>
          </div>
          <br />
          <p style={{ textAlign: "center" }}>Address : {pg.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn" onClick={handleClose}>
            CLOSE
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
