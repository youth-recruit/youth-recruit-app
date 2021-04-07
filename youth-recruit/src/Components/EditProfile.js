import React, { useState, useEffect } from "react";
import { useAuth } from "Components/context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Badge,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import SimpleFooter from "./Footers/CardsFooter.js";
import { database } from "../firebase";
import DemoNavbar from "./Navbars/DemoNavbar";

export default function EditProfile() {
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});
  const [isSameUser, setIsSameUser] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = database.collection("users").doc(currentUser.uid);
      const doc = await userRef.get();
      if (doc.exists) {
        setUser(doc.data());
      }
    };
    fetchUserData();
  }, []);

  function handleAddSecondInput() {
    this.setState({
      inputLinkClicked: true,
    });
  }
  function handleSumbit() {}

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
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
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
                      <Button
                        className="float-right"
                        color="default"
                        type="link"
                        size="m"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </Col>
                  <Col className="order-lg-1" lg="4"></Col>
                </Row>
                <div className="text-center mt-5">
                  <h3>
                    {user.first_name} {user.last_name}
                  </h3>
                  <div className="h6 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {/*!user.recruiter_flag ? user.location.city : user.company.location*/}
                    <span>,</span>{" "}
                    {/*!user.recruiter_flag ? user.location.country : user.company.country*/}
                  </div>
                  <div className="h6 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {!user.recruiter_flag && user.title}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {!user.recruiter_flag && user.university}
                  </div>
                </div>
                <div className="mt-5 py-5 border-top text-left">
                  <Row className="justify-content-center">
                    <Col lg="9">
                      {/*New Section */}
                      <h3>Description</h3>
                      <Form>
                        <Input
                          id="exampleFormControlTextarea1"
                          placeholder="Write your career objective ..."
                          rows="3"
                          type="textarea"
                        />
                      </Form>
                      <hr></hr>
                      {/*New Section */}
                      <h3>Personal Details</h3>
                      <Row>
                        <Col md="3">
                          <FormGroup>
                            <b>Email: </b>
                          </FormGroup>
                        </Col>
                        <Col md="9">
                          <FormGroup>
                            <Input
                              id="exampleFormControlInput1"
                              placeholder="name@example.com"
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="3">
                          <FormGroup>
                            <b>Mobile Phone: </b>
                          </FormGroup>
                        </Col>
                        <Col md="9">
                          <FormGroup>
                            <Input
                              id="exampleFormControlInput1"
                              placeholder="(include country code) +971 000000"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <hr></hr>
                      {/*New Section */}
                      {!user.recruiter_flag && (
                        <div>
                          <h3>Experience</h3>
                          <div>
                            <span>
                              {" "}
                              <b>Job title: </b>
                            </span>
                            <FormGroup>
                              <Input
                                id="job1_title"
                                placeholder="Enter job title"
                                type="text"
                              />
                            </FormGroup>
                            <span>
                              {"     "}
                              <b>Company Name </b>
                            </span>
                            <FormGroup>
                              <Input
                                id="company_name"
                                placeholder="Enter the company name"
                                type="text"
                              />
                            </FormGroup>
                            <Row>
                              <Col md="3">
                                <FormGroup>
                                  <b>Started </b>
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <FormGroup>
                                  <Input
                                    id="exampleFormControlInput1"
                                    placeholder="DD/MM/YYYY"
                                    type="text"
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <FormGroup>
                                  <b>Ended at </b>
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <FormGroup>
                                  <Input
                                    id="exampleFormControlInput1"
                                    placeholder="DD/MM/YYYY"
                                    type="text"
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="9"></Col>
                              <Col md="3">
                                <div className="custom-control custom-checkbox mb-3">
                                  <input
                                    className="custom-control-input"
                                    defaultChecked
                                    id="customCheck2"
                                    type="checkbox"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="customCheck2"
                                  >
                                    My current role
                                  </label>
                                </div>
                              </Col>
                            </Row>
                            <b> Description </b>
                            <Form>
                              <Input
                                id="exampleFormControlTextarea1"
                                placeholder="Write the job description and achievements ..."
                                rows="3"
                                type="textarea"
                              />
                            </Form>
                            <div className="card-profile-actions">
                              <Row>
                                <Col md="10"></Col>
                                <Col md="2">
                                  <Button
                                    outline
                                    type="button"
                                    color="primary"
                                    type="link"
                                    size="m"
                                  >
                                    Add
                                  </Button>
                                </Col>
                              </Row>
                            </div>
                          </div>
                          <hr></hr>

                          {/*New Section */}
                          <h3>Education</h3>
                          <div>
                            <span>
                              {" "}
                              <b>University/ School Name </b>
                            </span>
                            <FormGroup>
                              <Input
                                id="uni_name"
                                placeholder="Enter University/ School Name"
                                type="text"
                              />
                            </FormGroup>
                            <span>
                              {"     "}
                              <b>Major or Area of Study </b>
                            </span>
                            <FormGroup>
                              <Input
                                id="company_name"
                                placeholder="Enter your major or Area of Study"
                                type="text"
                              />
                            </FormGroup>
                            <Row>
                              <Col md="3">
                                <FormGroup>
                                  <b>Started </b>
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <FormGroup>
                                  <Input
                                    id="exampleFormControlInput1"
                                    placeholder="DD/MM/YYYY"
                                    type="text"
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <FormGroup>
                                  <b>Ended (or Expected) </b>
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <FormGroup>
                                  <Input
                                    id="exampleFormControlInput1"
                                    placeholder="DD/MM/YYYY"
                                    type="text"
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="3">
                                <FormGroup>
                                  <b>GPA: </b>
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <FormGroup>
                                  <Input
                                    id="exampleFormControlInput1"
                                    placeholder="GPA"
                                    type="text"
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <b> Description </b>
                            <Form>
                              <Input
                                id="exampleFormControlTextarea1"
                                placeholder="Write the your educational achievements and related courses ..."
                                rows="3"
                                type="textarea"
                              />
                            </Form>
                          </div>
                          <hr></hr>

                          {/*New Section */}
                          <h3>Awards</h3>
                          <div>
                            <span>
                              {" "}
                              <b>Title of the Award </b>
                            </span>
                            <FormGroup>
                              <Input
                                id="uni_name"
                                placeholder="Enter title of the Award"
                                type="text"
                              />
                            </FormGroup>
                            <Row>
                              <Col md="3">
                                <FormGroup>
                                  <b>Recived </b>
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <FormGroup>
                                  <Input
                                    id="exampleFormControlInput1"
                                    placeholder="DD/MM/YYYY"
                                    type="text"
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <FormGroup>
                                  <b>Expiration </b>
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <FormGroup>
                                  <Input
                                    id="exampleFormControlInput1"
                                    placeholder="DD/MM/YYYY"
                                    type="text"
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            <b> Description </b>
                            <Form>
                              <Input
                                id="exampleFormControlTextarea1"
                                placeholder="Write your awards and achievements regrading the award ..."
                                rows="3"
                                type="textarea"
                              />
                            </Form>
                          </div>
                          <hr></hr>

                          {/*New Section */}
                          <h3>Courses</h3>
                          <div>
                            <div>
                              <span>
                                {" "}
                                <b>Title of the Course </b>
                              </span>
                              <FormGroup>
                                <Input
                                  id="uni_name"
                                  placeholder="Enter title of the Course"
                                  type="text"
                                />
                              </FormGroup>
                              <Row>
                                <Col md="3">
                                  <FormGroup>
                                    <b>Recived </b>
                                  </FormGroup>
                                </Col>
                                <Col md="3">
                                  <FormGroup>
                                    <Input
                                      id="exampleFormControlInput1"
                                      placeholder="DD/MM/YYYY"
                                      type="text"
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md="3">
                                  <FormGroup>
                                    <b>Expiration </b>
                                  </FormGroup>
                                </Col>
                                <Col md="3">
                                  <FormGroup>
                                    <Input
                                      id="exampleFormControlInput1"
                                      placeholder="DD/MM/YYYY"
                                      type="text"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>

                              <b> Description </b>
                              <Form>
                                <Input
                                  id="exampleFormControlTextarea1"
                                  placeholder="Write the your educational achievements and related courses ..."
                                  rows="3"
                                  type="textarea"
                                />
                              </Form>
                            </div>
                          </div>

                          <hr></hr>
                          {/*New Section */}
                          <h3>Languages</h3>
                          <div>
                            <Row>
                              <Col md="3">
                                <FormGroup>
                                  <b>langauage </b>
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <FormGroup>
                                  <Input
                                    id="exampleFormControlInput1"
                                    placeholder="Language"
                                    type="text"
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <UncontrolledDropdown>
                                  <DropdownToggle
                                    caret
                                    color="secondary"
                                    outline
                                  >
                                    Level
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem
                                      href="#pablo"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      Beginner
                                    </DropdownItem>
                                    <DropdownItem
                                      href="#pablo"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      Intermeidate
                                    </DropdownItem>
                                    <DropdownItem
                                      href="#pablo"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      Fluent
                                    </DropdownItem>
                                    <DropdownItem
                                      href="#pablo"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      Native
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </Col>
                              <Col md="3">
                              <Button
                                    outline
                                    type="button"
                                    color="info"
                                    type="link"
                                    size="m"
                                  >
                                    Add
                                  </Button>
                            </Col>
                            </Row>
                          </div>
                          <hr></hr>
                          {/*New Section */}
                          <h3>Skills</h3>
                          <div>
                           <Row>
                              <Col md="9">
                                <FormGroup>
                                  <Input
                                    id="exampleFormControlInput1"
                                    placeholder="Add your skills"
                                    type="text"
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="3">
                              <Button
                                    outline
                                    type="button"
                                    color="info"
                                    type="link"
                                    size="m"
                                  >
                                    Add
                                  </Button>
                              </Col>
                           </Row>
                          </div>
                          <div style={{ display: "flex" }}>
                            <div>
                              <Badge color="info" pill className="mr-1">
                                c++
                              </Badge>
                              <Badge color="info" pill className="mr-1">
                                Java
                              </Badge>
                              <Badge color="info" pill className="mr-1">
                                Leadership
                              </Badge>
                            </div>
                          </div>
                          <hr></hr>
                        </div>
                      )}
                      {/* {console.log(jobs)} */}
                      <div style={{ display: "flex" }}>
                        {user.recruiter_flag &&
                          jobs.map((job) => (
                            // <div key={job}>
                            <Col lg="4">
                              <Card className="card-lift--hover shadow border-0">
                                <CardBody className="py-5">
                                  <h5 className="text-default text-uppercase">
                                    {job.title}
                                  </h5>
                                  <h6 className="text-default">
                                    {job.company}
                                  </h6>
                                  <p className="description mt-3">
                                    {job.description}
                                  </p>
                                  <div>
                                    {job.tags.map((tag) => (
                                      <Badge
                                        key={tag}
                                        color="primary"
                                        pill
                                        className="mr-1"
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                  <Button
                                    className="mt-4"
                                    color="primary"
                                    href={`/${job}`}
                                    // onClick={e => e.preventDefault()}
                                  >
                                    Learn more
                                  </Button>
                                </CardBody>
                              </Card>
                            </Col>
                            // </div>
                          ))}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </div>
  );
}
