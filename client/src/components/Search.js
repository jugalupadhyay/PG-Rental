import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const Search = ({ data }) => {
  const initialFacility =
    data.length > 0 && data[0].facility ? data[0].facility[0] : null;
  const initialVarient =
    data.length > 0 && data[0].varients ? data[0].varients[0] : null;

  const [selectedFacility, setSelectedFacility] = useState(initialFacility);
  const [selectedVarient, setSelectedVarient] = useState(initialVarient);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getPrice = (item) => {
    if (!item || !item.facility || !item.facilityPrices || !item.prices) {
      return 0;
    }

    const facilityIndex = item.facility.indexOf(selectedFacility);

    if (item.facilityPrices.length > 0 && facilityIndex !== -1) {
      const facilityPrice =
        parseFloat(item.facilityPrices[facilityIndex]?.[selectedFacility]) || 0;
      const varientPrice = parseFloat(item.prices[0]?.[selectedVarient]) || 0;

      // Calculate the total price by adding variant and facility prices
      return facilityPrice + varientPrice;
    } else {
      return 0;
    }
  };

  return (
    <div className="row justify-content-center">
      {data.map((item) => (
        <div
          key={item._id}
          className="col-md-3 m-3 shadow-lg p-3 mb-5 bg-white rounded"
        >
          <div onClick={handleShow}>
            <h1>{item.name}</h1>
            <img
              src={item.image || "placeholder_image_url"}
              alt={item.name}
              className="img-fluid"
              style={{ height: "200px", width: "200px" }}
            />
          </div>

          <div className="flex-container">
            <div className="w-100 m-1">
              <p>Varients</p>
              <select
                className="form-control"
                onChange={(e) => setSelectedVarient(e.target.value)}
              >
                {item.varients &&
                  item.varients.map((varient) => (
                    <option key={varient} value={varient}>
                      {varient}
                    </option>
                  ))}
              </select>
            </div>

            <div className="w-100 m-1">
              <p>Facilities</p>
              <select
                className="form-control"
                onChange={(e) => setSelectedFacility(e.target.value)}
              >
                {item.facility &&
                  item.facility.map((facility) => (
                    <option key={facility} value={facility}>
                      {facility}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex-container">
            <div className="m-1 w-100">
              <h1 className="mt-1">Price: {getPrice(item)} Rs/-</h1>
            </div>

            <div className="m-1 w-100">
              <button className="btn">Pay</button>
            </div>
          </div>

          <Modal show={show}>
            <Modal.Header closeButton onClick={handleClose}>
              <Modal.Title>{item.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <img
                src={item.image}
                className="img-fluid"
                style={{ height: "300px !important" }}
              />
              <p>{item.description}</p>
            </Modal.Body>

            <Modal.Footer>
              <button className="btn" onClick={handleClose}>
                CLOSE
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      ))}
    </div>
  );
};

export default Search;
