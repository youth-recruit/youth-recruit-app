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
      <main className="about-us">
        <section className="section section-lg section-shaped pb-250">
          <div className="shape shape-style-1 shape-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="py-lg-md d-flex">
            <div className="col px-0">
              <Row>
                <Col lg="6">
                  <p className="lead text-white">Learn more about :</p>
                  <h1 className="display-3 text-white">
                    Youth Recruit <span>Best Solution in Job Hunting</span>
                  </h1>
                </Col>
              </Row>
            </div>
          </Container>
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
        {/*1st Section*/}
        <section className="section section-lg pt-lg-0 mt--200">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <Row className="row-grid">
                  <Col lg="12">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className=" bg-gradient-secondary shadow-lg border-0 py-5">
                        <div className="d-flex px-3">
                          <div>
                            <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                              <i className="ni ni-satisfied" />
                            </div>
                          </div>
                          <div className="pl-4">
                            <h2 className="title text-success ">Our Mission</h2>
                            <p>
                              The Arctic Ocean freezes every winter and much of
                              the sea-ice then thaws every summer, and that
                              process will continue whatever.
                            </p>
                          </div>
                        </div>
                        <div className="d-flex px-3">
                          {" "}
                          <p> </p>
                        </div>
                        <div className="d-flex px-3">
                          <div>
                            <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                              <i className="ni ni-bulb-61" />
                            </div>
                          </div>
                          <div className="pl-4">
                            <h2 className="title text-warning">Our Vision</h2>
                            <p>
                              The Arctic Ocean freezes every winter and much of
                              the sea-ice then thaws every summer, and that
                              process will continue whatever.
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        {/*<section className="section section-lg"></section>*/}
        {/*2nd Section*/}
        {/*<section className="section section-lg pt-lg-0 mt--200">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <Row className="row-grid">
                  <Col lg="12">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="bg-gradient-secondary shadow-lg border-0 py-5">
                        <div className="d-flex px-3">
                          <div>
                            <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                              <i className="ni ni-bulb-61" />
                            </div>
                          </div>
                          <div className="pl-4">
                            <h5 className="title text-warning">Our Vision</h5>
                            <p>
                              The Arctic Ocean freezes every winter and much of
                              the sea-ice then thaws every summer, and that
                              process will continue whatever.
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
  </section>*/}
        {/*3nd Section*/}
        <section className="section bg-secondary">
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-md-2" md="6">
                <img
                  alt="Youth Recruit illustration"
                  className="img-fluid floating"
                  src={require("../assets/img/Youth-Recruit-Logo.png")}
                />
              </Col>
              <Col md="6">
                <div className="pl-md-5">
                  <div className="icon icon-lg icon-shape icon-shape-warning shadow rounded-circle mb-5">
                    <i className="ni ni-atom" />
                  </div>
                  <h3>What does Youth Recruit do?</h3>
                  <p>
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s, when an unknown printer took a galley of
                    type and scrambled it to make a type It has survived not
                    only five centuries, but also the leap
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/*4th Section*/}
        <section className="section section-lg">
          <Container>
            <Row className="justify-content-center text-center mb-lg">
              <Col lg="8">
                <h2 className="display-3">The amazing Team</h2>
                <p className="lead text-muted">
                  According to the National Oceanic and Atmospheric
                  Administration, Ted, Scambos, NSIDClead scentist, puts the
                  potentially record maximum.
                </p>
              </Col>
            </Row>
            <Row style={{ marginBottom: 50 }}>
              <Col className="mb-5 mb-lg-0" lg="3" md="6">
                <div className="px-4">
                  <img
                    alt="..."
                    className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                    src={require("../assets/img/theme/team-1-800x800.jpg")}
                    style={{ width: "200px" }}
                  />
                  <div className="pt-4 text-center">
                    <h5 className="title">
                      <span className="d-block mb-1">Batool</span>
                      <small className="h6 text-muted">CEO</small>
                    </h5>
                    <div className="mt-3">
                      <Button
                        className="btn-icon-only rounded-circle"
                        color="warning"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-twitter" />
                      </Button>
                      <Button
                        className="btn-icon-only rounded-circle ml-1"
                        color="warning"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-facebook" />
                      </Button>
                      <Button
                        className="btn-icon-only rounded-circle ml-1"
                        color="warning"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-dribbble" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="mb-5 mb-lg-0" lg="3" md="6">
                <div className="px-4">
                  <img
                    alt="..."
                    className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                    src={require("../assets/img/theme/team-2-800x800.jpg")}
                    style={{ width: "200px" }}
                  />
                  <div className="pt-4 text-center">
                    <h5 className="title">
                      <span className="d-block mb-1">Janim Dose</span>
                      <small className="h6 text-muted">Backend Developer</small>
                    </h5>
                    <div className="mt-3">
                      <Button
                        className="btn-icon-only rounded-circle"
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-twitter" />
                      </Button>
                      <Button
                        className="btn-icon-only rounded-circle ml-1"
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-facebook" />
                      </Button>
                      <Button
                        className="btn-icon-only rounded-circle ml-1"
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-dribbble" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="mb-5 mb-lg-0" lg="3" md="6">
                <div className="px-4">
                  <img
                    alt="..."
                    className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                    src={require("../assets/img/theme/team-3-800x800.jpg")}
                    style={{ width: "200px" }}
                  />
                  <div className="pt-4 text-center">
                    <h5 className="title">
                      <span className="d-block mb-1">Nadeen Tarek</span>
                      <small className="h6 text-muted">UI/UX Designer</small>
                    </h5>
                    <div className="mt-3">
                      <Button
                        className="btn-icon-only rounded-circle"
                        color="info"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-twitter" />
                      </Button>
                      <Button
                        className="btn-icon-only rounded-circle ml-1"
                        color="info"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-facebook" />
                      </Button>
                      <Button
                        className="btn-icon-only rounded-circle ml-1"
                        color="info"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-dribbble" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="mb-5 mb-lg-0" lg="3" md="6">
                <div className="px-4">
                  <img
                    alt="..."
                    className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                    src={require("../assets/img/theme/team-4-800x800.jpg")}
                    style={{ width: "200px" }}
                  />
                  <div className="pt-4 text-center">
                    <h5 className="title">
                      <span className="d-block mb-1">Aman Ali</span>
                      <small className="h6 text-muted">Founder and CEO</small>
                    </h5>
                    <div className="mt-3">
                      <Button
                        className="btn-icon-only rounded-circle"
                        color="success"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-twitter" />
                      </Button>
                      <Button
                        className="btn-icon-only rounded-circle ml-1"
                        color="success"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-facebook" />
                      </Button>
                      <Button
                        className="btn-icon-only rounded-circle ml-1"
                        color="success"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-dribbble" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col className="mb-5 mb-lg-0" lg="3" md="6">
                {" "}
              </Col>
              <Col className="mb-5 mb-lg-0" lg="3" md="6">
                <div className="px-4">
                  <img
                    alt="..."
                    className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                    src={require("../assets/img/theme/team-1-800x800.jpg")}
                    style={{ width: "200px" }}
                  />
                  <div className="pt-4 text-center">
                    <h5 className="title">
                      <span className="d-block mb-1">Zenia</span>
                      <small className="h6 text-muted">Manager</small>
                    </h5>
                    <div className="mt-3">
                      <Button
                        className="btn-icon-only rounded-circle"
                        color="warning"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-twitter" />
                      </Button>
                      <Button
                        className="btn-icon-only rounded-circle ml-1"
                        color="warning"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-facebook" />
                      </Button>
                      <Button
                        className="btn-icon-only rounded-circle ml-1"
                        color="warning"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-dribbble" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="mb-5 mb-lg-5" lg="3" md="9">
                <div className="px-4">
                  <img
                    alt="..."
                    className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                    src={require("../assets/img/theme/team-2-800x800.jpg")}
                    style={{ width: "200px" }}
                  />
                  <div className="pt-4 text-center">
                    <h5 className="title">
                      <span className="d-block mb-1">Sarah Ayoub</span>
                      <small className="h6 text-muted">Manager</small>
                    </h5>
                    <div className="mt-3">
                      <Button
                        className="btn-icon-only rounded-circle"
                        color="success"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-twitter" />
                      </Button>
                      <Button
                        className="btn-icon-only rounded-circle ml-1"
                        color="success"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-facebook" />
                      </Button>
                      <Button
                        className="btn-icon-only rounded-circle ml-1"
                        color="success"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-dribbble" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {/*Contact Us Section*/}
        <section className="section section-lg bg-gradient-default">
            <Container className="pt-lg pb-250">
              <Row className="text-center justify-content-center">
                <Col lg="10">
                  <h2 className="display-3 text-white">Contact Us</h2>
                  <p className="lead text-white">
                    According to the National Oceanic and Atmospheric
                    Administration, Ted, Scambos, NSIDClead scentist, puts the
                    potentially record low maximum sea ice extent tihs year down
                  </p>
                </Col>
              </Row>
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section section-lg pt-lg-0 section-contact-us">
            <Container>
              <Row className="justify-content-center mt--300">
                <Col lg="8">
                  <Card className="bg-gradient-secondary shadow">
                    <CardBody className="p-lg-5">
                      <h4 className="mb-1">Office Address</h4>
                      <p className="mt-0">
                        {/*add the google maps link*/}
                        <a href=''>
                        ESB1024, American University of Sharjah, University City,Sharjah, UAE
                        </a>
                      </p>

                      <h4 className="mb-1">Contact Numbers</h4>
                      <p className="mt-0">
                        telephone: +971 589248995,  Fax: +971 59632892
                      </p>

                      <h4 className="mb-1">Email</h4>
                      <p className="mt-0">
                        {/*add the mailto link*/}
                        <a href=''>
                        youthrecruit1@gmail.com
                        </a>
                      </p>

                      <h4 className="mb-1">Working Hours</h4>
                      <p className="mt-0">
                        Sunday-Thursday    8:00 AM - 9:00 PM
                      </p>
                      <p className="mt-0">
                      Friday-Saturday    1:00 AM - 5:00 PM 
                      </p>

                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>

      </main>
      <CardsFooter />
    </div>
  );
}
