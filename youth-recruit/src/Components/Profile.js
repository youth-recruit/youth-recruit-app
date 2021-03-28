import React from 'react'
import { useAuth } from "../Components/context/AuthContext"
import { useHistory } from 'react-router-dom'
import { Button, Card, Container, Row, Col, Badge} from "reactstrap";
import DemoNavbar from "./Navbars/DemoNavbar.js";
import SimpleFooter from "./Footers/CardsFooter.js";

class Profile extends React.Component {
    componentDidMount() {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.main.scrollTop = 0;
    }
    render() {
      return (
        <>
          <DemoNavbar />
          <main className="profile-page" ref="main">
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
                  <polygon
                    className="fill-white"
                    points="2560 0 2560 100 0 100"
                  />
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
                              src="../assets/img/theme/team-4-800x800.jpg"
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
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                            size="sm"
                          >
                            Edit Profile
                          </Button>
                        </div>
                      </Col>
                      <Col className="order-lg-1" lg="4">
                      </Col>
                    </Row>
                    <div className="text-center mt-5">
                      <h3>
                        Nadeen Tarek{" "}  {/*Name from database*/}
                      </h3>
                      <div className="h6 font-weight-300">
                        <i className="ni location_pin mr-2" />
                        Dubai, UAE  {/*country from database*/}
                      </div>
                      <div className="h6 mt-4">
                        <i className="ni business_briefcase-24 mr-2" />
                            Research and Development intern - The Assembly {/*Current position from database*/}
                      </div>
                      <div>
                        <i className="ni education_hat mr-2" />
                           American University of Sharjah{/*Email from database*/}
                      </div>
                    </div>
                    <div className="mt-5 py-5 border-top text-left">
                      <Row className="justify-content-center">
                        <Col lg="9">
                          {/*New Section */}
                          <h3>Objective</h3>
                          <p>
                          I would like to gain an internship at a multinational leading company to deepen my knowledge and gain
                          hands-on experience in computer engineering field. In addition, being part of a fast-paced business will
                          allow me to use my skills and share my ideas to help in developing the companies’ projects.
                          </p>
                          <hr></hr>
                        {/*New Section */}
                          <h3>Personal Details</h3> 
                          <div> <b>Birthdate:</b>     24/01/2001</div>
                          <div> <b>Email: </b>    nadeentarek2001@hotmail.com</div>
                          <div> <b> Mobile Phone:</b>    +97112345</div>
                          <hr></hr>
                        {/*New Section */}
                          <h3>Experience</h3>
                          <h5 className="text-default">Chair - IEEE SIGHT AUS Chapter</h5>
                          <p className="text-muted">From Sep 2019 To March 2021 </p>
                          <p>
                          I Hosted a deep learning workshop to create a face mask detection CNN model
                          Hosted a hardware workshop using Google AIY vision kit to create attention checker
                          Hosted 2 workshop to create a real-time emotion detection model.
                          </p>
                          <hr></hr>
                        {/*New Section */}
                         <h3>Education</h3>
                          <h5 className="text-default">American University of Sharjah</h5>
                          <h6 className="text-default">Bachelor in Computer Engineering</h6>
                          <p className="text-muted">From Sep 2018 To March 2022 </p>
                          <div>
                          <b>GPA: 3.0 </b>
                            <br /> <b>Related Courses: </b> Computer Networks, Software Design
                          </div>
                          <hr></hr>
                        {/*New Section */}
                         <h3>Awards</h3>
                          <h5 className="text-default">2nd Place Hults Prize Competition</h5>
                          <p className="text-muted">From Sep 2018 To March 2022 </p>
                          <div>
                          Presented a venture idea to solve unemployment for 10,000 people
                          </div>
                          <hr></hr>
                        {/*New Section */}
                         <h3>Courses</h3>
                          <h5 className="text-default">Web development Course</h5>
                          <p className="text-muted">From Sep 2018 To present </p>
                          <div>
                          Web Development-Frontend and Backend-Diploma (Yat learning center)
                          </div>
                          <hr></hr>
                        {/*New Section */}
                        <h3>Languages</h3>
                          <div className="text-muted">English - Fluent</div>
                          <hr></hr>
                         {/*New Section */}
                         <h3>Skills</h3>
                            <div>
                            <Badge color="info" pill className="mr-1">Java</Badge>
                            <Badge color="info" pill className="mr-1">C/C++</Badge>
                            <Badge color="info" pill className="mr-1">Teamwork</Badge>
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
          <SimpleFooter />
        </>
      );
    }
  }
  
  export default Profile;
  
{/*------ add the logout in the navbar dropdown instead-------
    export default function Profile() {
    const { logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
    
        try {
            await logout()
            history.push("/login")
        } catch {
        }
    }

    return (
        <div>
            <button type="link" onClick={handleLogout}>
                Log Out
            </button>
        </div>
    )
}*/}
