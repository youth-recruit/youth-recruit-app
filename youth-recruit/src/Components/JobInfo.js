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
  const [user, setUser] = useState({})
  const [isRecruiter, setRecruiter] = useState(true);
  const [job, setJob] = useState({})
  const [saveButtonDisable, setSaveButtonDisable] = useState(false);
  const [applyButtonDisable, setApplyButtonDisable] = useState(false);
  const [applicants, setApplicants] = useState([])
  const [showApplicants, setShowApplicants] = useState(false)

  useEffect(() => {
    const isUserRecruit = async () => {
      const docRef = database.collection("users").doc(currentUser.uid);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data()
            setUser(data)
            setRecruiter(data.recruiter_flag);

            if (!data.recruiter_flag) {
              data.applications.saved.map(application => {
                if (application === window.location.pathname.substr(1)) {
                  setSaveButtonDisable(true)
                }
              })
            
              data.applications.applied.map(application => {
                if (application === window.location.pathname.substr(1)) {
                  setApplyButtonDisable(true)
                }
              })
            }
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    };

    const getUserInfo = async (id) => {
      const userRef = database.collection("users").doc(id)
      const doc = await userRef.get();
      if (doc.exists) {
        console.log(doc.data())
        setApplicants(elements => [...elements, doc.data()])
        console.log(applicants)
        // return doc.data()
      }
      // return null;
    }

    const fetchJob = async () => {
      isUserRecruit()

      
      const id = window.location.pathname
      const docRef = database.collection("jobs").doc(id);
      const doc = await docRef.get();
      if (doc.exists) {
        const data = doc.data()
        setJob(data)

        if (data.user == currentUser.uid) {
          setApplicants([])
          data.applicants.map(id => {
            console.log(id)
            getUserInfo(id)
            // userInfo.then(() => {
            //   console.log("Then")
            //   console.log()
            // })
            // setApplicants(elements => [...elements, userInfo])
          })
          setShowApplicants(true)
        }
      }
    }

    // isUserRecruit();
    fetchJob()
  }, []);

  const handleSaveButton = (event) => {
    event.preventDefault()

    if (!saveButtonDisable) {
      setSaveButtonDisable(true)
      console.log("Here")
      user.applications.saved.push(window.location.pathname.substr(1))
      const userRef = database.collection("users").doc(currentUser.uid);
      userRef.set({
        applications: {
          saved: user.applications.saved,
          applied: user.applications.applied
        }
      }, {merge: true})
    }
  }

  const handleApplyButton = (event) => {
    event.preventDefault()
    if (!applyButtonDisable) {
      setApplyButtonDisable(true)
      console.log("Here")
      user.applications.applied.push(window.location.pathname.substr(1))
      const userRef = database.collection("users").doc(currentUser.uid);
      userRef.set({
        applications: {
          saved: user.applications.saved,
          applied: user.applications.applied
        }
      }, {merge: true}).then(() => {

        job.applicants.push(currentUser.uid)
        const jobRef = database.collection("jobs").doc(window.location.pathname.substr(1));
        jobRef.set({
          applicants: job.applicants
        }, {merge: true})
      
      })
    }
  }

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
                    {isRecruiter && <Link to={`#`}>
                        <Button
                          className="float-right btn-icon"
                          color="default"
                          type="link"
                          size="m"
                        >
                          <span className="btn-inner--icon">
                            <i className="ni ni-briefcase-24" />
                          </span>
                          <span className="btn-inner--text">Edit Job</span>
                        </Button>
                      </Link>}
                    {!isRecruiter && <Link to={`#`}>
                        <Button
                          className="float-right btn-icon"
                          color="default"
                          type="link"
                          size="m"
                          onClick={handleApplyButton}
                          disabled={applyButtonDisable}
                        >
                          <span className="btn-inner--icon">
                            <i className="ni ni-briefcase-24" />
                          </span>
                          <span className="btn-inner--text">Apply</span>
                        </Button>
                      </Link>}
                      {!isRecruiter && <Link to={`#`}>
                        <Button
                          className="float-left btn-icon"
                          size="m"
                          color="secondary"
                          type="link"
                          onClick={handleSaveButton}
                          disabled={saveButtonDisable}
                        >
                          <span className="btn-inner--icon">
                            <i className="ni ni-single-copy-04" />
                          </span>
                          <span className="btn-inner--text">Save</span>
                        </Button>
                      </Link>}
                    </div>
                  </Col>
                  <Col className="order-lg-2" lg="4">
                    {" "}
                    <div className="text-left lg-5 mt-5">
                      <h3> {job.title}</h3> <div> {job.company}</div>
                      {/* <div> Dubai, UAE</div> */}
                      {/* <div> microsoft@internship.com</div> */}
                      <Link to={`/profile/${job.user}`}>View Company</Link>
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
                        {job.description}
                      </p>
                      <hr></hr>
                      {/*New Section */}
                      <h5>Job Tags</h5>
                      <div className={{display: "flex"}}>
                      {job.tags && job.tags.map(tag => {
                        return (
                          <Badge key={tag} color="info" pill className="mr-1">{tag}</Badge>
                        )
                      })}
                      {showApplicants && (
                        <div>
                          <hr></hr>
                          <h5>Applicants</h5>
                          
                          <div style={{display: "flex"}}>
                          {user.recruiter_flag && applicants.map(app => (
                            // <div key={job}>
                              <Col lg="4">
                                <Card className="card-lift--hover shadow border-0">
                                    <CardBody className="py-5">
                                    <h5 className="text-default text-uppercase">
                                        {app.first_name} {app.last_name}
                                    </h5>
                                    <h6 className="text-default">
                                        {app.title}
                                    </h6>
                                    <p className="description mt-3">
                                        {app.description}
                                    </p>
                                    <div>
                                        {app.skills.map(tag => (
                                            <Badge key={tag} color="primary" pill className="mr-1">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <Button
                                        className="mt-4"
                                        color="primary"
                                        href={`/profile/${app.id}`}
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
                        </div>
                      )}


                      </div>

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
