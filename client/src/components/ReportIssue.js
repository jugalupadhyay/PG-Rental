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

export default function ReportIssue() {
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
            Complain/FeedBack for PG
          </h6>
          <hr className="t_border my-0 ml-0 text-left" />
        </Col>
      </Row>

      <Row className="sec_sp">

        <SlideInLeftCol lg="5" className="mb-5" xs="12">
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
          <p>{contactConfig.issue_description}</p>
          <img
            src="" //write GIF url
            alt="FeedBack PG GIF"
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
                  id="PG-Issue"
                  name="PG-Issue"
                  placeholder="PG-Issue"
                  type="text"
                  required
                />
              </Col>
            </Row>

            <textarea
              className="form-control rounded-0"
              id="Issue Description"
              name="Issue Description"
              placeholder="Issue Description"
              rows="3"
              required
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
