import React, { useState, useEffect } from 'react'
import { useAuth } from "../Components/context/AuthContext"
import { Link, useHistory } from 'react-router-dom'
import { Button, Card, CardBody, Container, Row, Col, Badge} from "reactstrap";
import DemoNavbar from "./Navbars/DemoNavbar.js";
import SimpleFooter from "./Footers/CardsFooter.js";
import { database } from "../firebase";

// import {
//   Badge,
//   Button,
//   Card,
//   CardBody,
//   Container,
//   Row,
//   Col
// } from "reactstrap";

// class Profile extends React.Component {
//     componentDidMount() {
//       document.documentElement.scrollTop = 0;
//       document.scrollingElement.scrollTop = 0;
//       this.refs.main.scrollTop = 0;
//     }
//     render() {
//       return (
//         <>
          
//         </>
//       );
//     }
//   }
  
//   export default Profile;

export default function Profile() {
  const { currentUser, logout } = useAuth()
  const [ user, setUser ] = useState({})
  const [ isSameUser, setIsSameUser ] = useState(false)
  const [ jobs, setJobs ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const history = useHistory()

  async function handleLogout() {

    try {
        logout()
        history.push("/login")
    } catch {
    }
  }

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const userRef = database.collection("users").doc(currentUser.uid)
  //     const doc = await userRef.get();
  //     if (doc.exists) {
  //       const data = doc.data()
  //       setUser(data)
  //       console.log(user)
  //       // data.applications.active.map(jobID => {fetchJobData(jobID)})
  //     setLoading(false)
  //     }
  //       // const data = await database.collection('users').get(currentUser.uid)
  //       // setUser(data.docs.map(doc => [doc.id, doc.data()]))
  //   }
    
  //   fetchUserData()
  //   
    
  // }, [])

  // useEffect(() => {
  //   const fetchJobData = async (id) => {
  //     console.log(jobs)
  //     const jobRef = database.collection("jobs").doc(id)
  //     const doc = await jobRef.get();
  //     if (doc.exists) {
  //       setJobs([...jobs, doc.data()])
  //     }
  //   }
  //   console.log(user)
  //   user.applications.active.map(jobID => {fetchJobData(jobID)}) 
  // }, [user])
  
  useEffect(() => {

    const fetchUserData = async () => {
      const userRef = database.collection("users").doc(currentUser.uid)
      const doc = await userRef.get();
      if (doc.exists) {
        setUser(doc.data())
        setLoading(false)
        return doc.data()
      }
    }

    const fetchJobData = async (id) => {
      setJobs(jobs => [])
      const jobRef = database.collection("jobs").doc(id)
      const doc = await jobRef.get();
      if (doc.exists) {
        setJobs(jobs => [...jobs, doc.data()])
      }
    }

    const fetchAllData = async () => {
      const user = await fetchUserData()
      if(user.recruiter_flag) {
        user.applications.active.map(jobID => {fetchJobData(jobID)})
      }
    }

    fetchAllData()

    if (window.location.pathname === `/profile/${currentUser.uid}`){
      setIsSameUser(true)
    }

  }, [])

  
  return (
    !loading && <div>
        
        <DemoNavbar currentUser={currentUser}/>
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
                          src="/assets/images/Youth-Recruit-Logo.png"
                        />
                    </div>
                  </Col>
                  <Col
                    className="order-lg-3 text-lg-right align-self-lg-center"
                    lg="4"
                  >
                    <div className="card-profile-actions py-4 mt-lg-0">
                      {isSameUser && <Link to={`/profile/${currentUser.uid}/edit`}> 
                        <Button className="float-right" color="default" type="link" size="m">
                          Edit Profile
                        </Button> 
                      </Link>}
                      {isSameUser && <Button className="float-left" size="m" color="default" type="link" onClick={handleLogout}>
                        Log Out
                      </Button> }
                    </div>
                  </Col>
                  <Col className="order-lg-1" lg="4">
                  </Col>
                </Row>
                <div className="text-center mt-5">
                  <h3>
                    {user.first_name} {user.last_name}
                  </h3>
                  <div className="h6 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {!user.recruiter_flag ? user.location.city : user.company.location}<span>,</span> {!user.recruiter_flag ? user.location.country : user.company.country}
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
                        <p>
                          {user.description}
                        </p>
                      <hr></hr>
                    {/*New Section */}
                    <div>
                        <h3>Personal Details</h3> 
                        {!user.recruiter_flag && <div> <b>Age:</b>     {user.age}</div>}
                        <div> <b>Email: </b>    {user.email}</div>
                        <div> <b> Mobile Phone:</b>    {user.phone}</div>
                      </div>
                      <hr></hr>
                    {/*New Section */}
                    {!user.recruiter_flag && <div>
                      <h3>Experience</h3>
                      {user.experiences.map(experience => (
                        <div key={experience}>
                          <h5 className="text-default">{experience.title}</h5>
                          <p>{experience.company}</p>
                          <p className="text-muted">From {experience.start_date} To {experience.end_date} </p>
                          <p> {experience.description} </p>
                        </div>
                      ))}
                      <hr></hr>
                        
                      {/*New Section */}
                        <h3>Education</h3>
                        {user.education.map(edu => (
                          <div key={edu}>
                            <h5 className="text-default">{edu.location}</h5>
                            <h6 className="text-default">{edu.title}</h6>
                            <p className="text-muted">From {edu.start_date} To {edu.end_date} </p>
                            <div>
                              <b>GPA: {edu.gpa} </b>
                                <br /> <b>Related Courses: </b> {edu.courses.map(course => (
                                  <div key={course}>{course}</div>
                                ))}
                              </div>
                          </div>
                        ))}
                        <hr></hr>
                        
                      {/*New Section */}
                        <h3>Awards</h3>
                        {user.awards.map(award => (
                          <div key={award}>
                            <h5 className="text-default">{award.title}</h5>
                            <p className="text-muted">From {award.received} To {award.expiry} </p>
                            <div>
                            {award.description}
                            </div>
                          </div>
                        ))}
                        <hr></hr>
                        
                      {/*New Section */}
                        <h3>Courses</h3>
                        {user.courses.map(course => (
                          <div key={course}>
                            <h5 className="text-default">{course.title}</h5>
                            <p className="text-muted">From {course.start_date} To {course.end_date} </p>
                            <div>
                            {course.description}
                            </div>
                        </div>
                      ))}
                      
                      <hr></hr>
                    {/*New Section */}
                    <h3>Languages</h3>
                        {user.languages.map(lang => (
                          <div key={lang}>

                            <div className="text-muted">{lang.language} - {lang.fluency}</div>
                          </div>
                        ))}
                      <hr></hr>
                      {/*New Section */}
                      <h3>Skills</h3>
                      <div style={{display: "flex"}}>
                          {user.skills.map(skill => (
                            <div key={skill}>
                              <Badge color="info" pill className="mr-1">{skill}</Badge>
                            </div>
                          ))}
                          </div>
                      <hr></hr>
                          </div> }
                          {/* {console.log(jobs)} */}
                          <div style={{display: "flex"}}>
                          {user.recruiter_flag && jobs.map(job => (
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
                                        {job.tags.map(tag => (
                                            <Badge key={tag} color="primary" pill className="mr-1">
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
)
}
