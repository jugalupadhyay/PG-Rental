import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import { contactConfig } from "./content_option";
import { BsArrowLeft } from "react-icons/bs";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const SlideInLeft = keyframes`
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
`;

const SlideInRight = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
`;

const FadeInImage = styled.img`
  animation: ${fadeIn} 1s ease;
`;

const SlideInLeftCol = styled(Col)`
  animation: ${SlideInLeft} 1s ease;
`;

const SlideInRightCol = styled(Col)`
  animation: ${SlideInRight} 1s ease;
`;

const StyledContainer = styled(Container)`
  background-color: #d6dbdf;
  overflow-x: hidden;
`;

export default function ContactAdmin() {
  const [images, setImages] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [image, setImage] = useState("");

  const handleImageChange = (event) => {
    setImages([...images, ...event.target.files]);
  };

  const postDetails = () => {
    const uploadPromises = images.map((imageFile) => {
      const data = new FormData();
      data.append("file", imageFile);
      data.append("upload_preset", "pg-rental");
      data.append("cloud_name", "ashishvinod");

      return fetch("", {
        //write cloudinary api
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((response) => {
          const imageUrl = response.secure_url;
          console.log("Image uploaded:", imageUrl);
          return imageUrl;
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          return null;
        });
    });

    Promise.all(uploadPromises).then((uploadedImageUrls) => {
      console.log("All images uploaded:", uploadedImageUrls);
      setUploadedImageUrls(uploadedImageUrls.filter((url) => url !== null));
    });
  };

  return (
    <StyledContainer>
      <Row className="mb-2 mt-2">
        <SlideInLeftCol
          lg="1"
          xs="auto"
          onClick={() => window.history.back()}
          style={{ cursor: "pointer" }}
        >
          <BsArrowLeft size={30} />
        </SlideInLeftCol>
        <Col lg="8">
          <h6 className="display-4 mb-4" style={{ fontSize: "2.5rem" }}>
            Contact Us
          </h6>
          <hr className="t_border my-0 ml-0 text-left" />
        </Col>
      </Row>
      <Row className="sec_sp">
        <SlideInLeftCol lg="5" className="mb-5" xs="12">
          <h3 className="color_sec py-4">Get in touch</h3>
          <address>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
              {contactConfig.YOUR_EMAIL}
            </a>
            <br />
            <br />
            {contactConfig.hasOwnProperty("YOUR_PHONE") ? (
              <p>
                <strong>Phone:</strong> {contactConfig.YOUR_PHONE}
              </p>
            ) : (
              ""
            )}
          </address>
          <p>{contactConfig.description}</p>
          <img
            src="" //write GIF url
            alt="Contact Us GIF"
            style={{ width: "80%", maxHeight: "150px" }}
          />
        </SlideInLeftCol>
        <SlideInRightCol lg="7" className="d-flex align-items-center" xs="12">
          <form
            className="contact__form w-100"
            action="" //write formspree api
            method="POST"
          >
            <Row>
              <Col lg="6" className="form-group">
                <input
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  type="text"
                  required
                />
              </Col>
              <Col lg="6" className="form-group">
                <input
                  className="form-control"
                  id="PG-Single-Price"
                  name="PG-Single-Price"
                  placeholder="Single Sharing Price"
                  type="text"
                  required
                />
              </Col>
              <Col lg="6" className="form-group">
                <input
                  className="form-control rounded-0"
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  required
                />
              </Col>
              <Col lg="6" className="form-group">
                <input
                  className="form-control"
                  id="PG-Double-Price"
                  name="PG-Double-Price"
                  placeholder="Double Sharing Price"
                  type="text"
                  required
                />
              </Col>

              <Col lg="6" className="form-group">
                <input
                  className="form-control"
                  id="PG-Name"
                  name="PG-Name"
                  placeholder="PG Name"
                  type="text"
                  required
                />
              </Col>
              <Col lg="6" className="form-group">
                <input
                  className="form-control"
                  id="pg_triple_price"
                  name="pg_triple_price"
                  placeholder="Triple Sharing Price"
                  type="text"
                  required
                />
              </Col>

              <Col lg="6" className="form-group">
                <input
                  className="form-control"
                  type="file"
                  id="PG-Image"
                  name="PG-Images"
                  placeholder="PG-Image"
                  multiple
                  accept="image/*"
                  required
                  onChange={handleImageChange}
                />
                <button type="button" onClick={postDetails}>
                  Upload
                </button>
              </Col>
              <Col lg="6" className="form-group">
                <input
                  className="form-control"
                  id="PG-AC-Price"
                  name="PG-AC-Price"
                  placeholder="AC Room Additional Price"
                  type="text"
                  required
                />
              </Col>

              <Col lg="6" className="form-group">
                <select
                  className="form-control"
                  id="PG-Category"
                  name="PG-Category"
                  placeholder="Category"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="girlspg">Girls PG</option>
                  <option value="boyspg">Boys PG</option>
                </select>
              </Col>
            </Row>
            <textarea
              className="form-control rounded-0"
              id="address"
              name="address"
              placeholder="Address"
              rows="3"
              required
            ></textarea>
            <textarea
              className="form-control rounded-0"
              id="message"
              name="message"
              placeholder="Message"
              rows="3"
              required
            ></textarea>

            <textarea
              className="form-control"
              id="pg-link"
              name="pg-link"
              placeholder="Uploaded Image URLs"
              rows="3"
              readOnly
              value={uploadedImageUrls.join("\n")}
            ></textarea>

            <br />

            <Row>
              <Col lg="12" className="form-group">
                <button className="btn ac_btn" type="submit">
                  Send
                </button>
              </Col>
            </Row>
          </form>
        </SlideInRightCol>
      </Row>
    </StyledContainer>
  );
}
