import React, { useRef, useState, useEffect } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { database } from "../firebase";
import { useAuth } from "../Components/context/AuthContext";
import { Link } from "react-router-dom";

import DemoNavbar from "./Navbars/DemoNavbar.js";
import CardsFooter from "./Footers/CardsFooter.js";

export default function JobInfo() {
  const { currentUser } = useAuth();
  const [isRecruiter, setRecruiter] = useState(false);

  useEffect(() => {
    const isUserRecruit = async () => {
      const docRef = database.collection("users").doc(currentUser.uid);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            // console.log("Document data:", doc.data());
            // console.log(doc.data().recruiter_flag);
            setRecruiter(doc.data().recruiter_flag);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    };
    isUserRecruit();
  }, []);

  return (
    <div>
      <DemoNavbar currentUser={currentUser} />
      <main className="profile-page">
        <section className="section-profile-cover section-shaped my-0">
          {/* Circles background */}
          <div className="shape shape-style-1 shape-default alpha-4">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          {/* SVG separator */}

          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
        <section className="section">
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Row className="justify-content-center">
                  <Col className="order-lg-1" lg="3">
                    <div className="card-profile-image py-6 mt-lg-0">
                      <img
                        alt="..."
                        className="rounded-circle"
                        src="/assets/images/Youth-Recruit-Logo.png"
                      />
                    </div>
                  </Col>
                  <Col
                    className="order-lg-3 text-lg-right align-self-lg-center"
                    lg="4"
                  >
                    <div className="card-profile-actions py-4 mt-lg-0">
                      <Link to={`#`}>
                        <Button
                          className="float-right btn-icon"
                          color="default"
                          type="link"
                          size="m"
                        >
                          <span className="btn-inner--icon">
                            <i className="ni ni-briefcase-24" />
                          </span>
                          <span className="btn-inner--text">Apply</span>
                        </Button>
                      </Link>
                      <Link to={`#`}>
                        <Button
                          className="float-left btn-icon"
                          size="m"
                          color="secondary"
                          type="link"
                        >
                          <span className="btn-inner--icon">
                            <i className="ni ni-single-copy-04" />
                          </span>
                          <span className="btn-inner--text">Save</span>
                        </Button>
                      </Link>
                    </div>
                  </Col>
                  <Col className="order-lg-2" lg="4">
                    {" "}
                    <div className="text-left lg-5 mt-5">
                      <h3> Software Engineering</h3> <div> Microsoft Inc.</div>
                      <div> Dubai, UAE</div>
                      <div> microsoft@internship.com</div>
                    </div>{" "}
                  </Col>
                </Row>
                <div className="text-left lg-5 mt-5">
                  <h3> </h3>
                  <div className="h6 font-weight-300"></div>
                  <div className="h6 mt-4"></div>
                  <div></div>
                </div>
                <div className="mt-5 py-5 border-top text-left">
                  <Row className="justify-content-center">
                    <Col lg="9">
                      {/*New Section */}
                      <h5>Job Requirment</h5>
                      <p>
                        s simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard
                        dummy text ever since the 1500s, when an unknown printer
                        took a galley of type and scrambled it to make a type
                        specimen book. It has survived not only five centuries,
                        but also the leap into electronic typesetting, remaining
                        essentially unchanged. It was popularised in the 1960s
                        with the release of Letraset sheets containing Lorem
                        Ipsum passages, and more recently with desktop
                        publishing software like Aldus PageMaker including
                        versions of Lorem Ipsum.
                      </p>
                      <hr></hr>
                      {/*New Section */}
                      <h5>Job Tags</h5>
                      <Badge color="info" pill className="mr-1">Java</Badge>
                      <Badge color="info" pill className="mr-1">C++</Badge>
                      <Badge color="info" pill className="mr-1">Leadership</Badge>

                      <hr></hr>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
          </Container>
        </section>
      </main>
      <CardsFooter />
    </div>
  );
}
