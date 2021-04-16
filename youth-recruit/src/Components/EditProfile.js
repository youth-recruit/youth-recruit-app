import React, { useState, useEffect, useRef } from "react";
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
  const [userDescription, setDescription] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userPhone, setPhone] = useState("");

  const [numExperience, setNumExperience] = useState(0);
  const [experiences, setExperiences] = useState([]);
  const [copyExperiences, setCopyExperiences] = useState([]);
  
  const [numEducation, setNumEducation] = useState(0);
  const [education, setEducation] = useState([]);
  const [copyEducation, setCopyEducation] = useState([]);

  const [numAwards, setNumAwards] = useState(0);
  const [awards, setAwards] = useState([]);
  const [copyAwards, setCopyAwards] = useState([]);

  const [numCourses, setNumCourses] = useState(0);
  const [courses, setCourses] = useState([]);
  const [copyCourses, setCopyCourses] = useState([]);

  const [numLanguages, setNumLanguages] = useState(0);
  const [languages, setLanguages] = useState([]);
  const [copyLanguages, setCopyLanguages] = useState([]);

  const [skills, setSkills] = useState([]);

  

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = database.collection("users").doc(currentUser.uid);
      const doc = await userRef.get();
      if (doc.exists) {
        const data = doc.data();
        setUser(data);

        setLanguages(data.languages)
        setCopyLanguages(data.languages)
        setNumLanguages(data.languages.length)

        setCourses(data.courses)
        setCopyCourses(data.courses)
        setNumCourses(data.courses.length)

        setExperiences(data.experiences)
        setCopyExperiences(data.experiences)
        setNumExperience(data.experiences.length)
        
        setAwards(data.awards)
        setCopyAwards(data.awards)
        setNumAwards(data.awards.length)

        setEducation(data.education)
        setCopyEducation(data.education)
        setNumEducation(data.education.length)
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  function handleAddSecondInput() {
    this.setState({
      inputLinkClicked: true,
    });
  }
  function handleSubmit() {
   
    const userRef = database.collection("users").doc(currentUser.uid);
    if (!user.recruiter_flag) {

      for (let i = 0; i < copyExperiences.length; i++) {
        let experience = copyExperiences[i]

        let keys = Object.keys(experience);
        for (let j = 0; j < keys.length; j++) {
          if (experience[keys[j]] === "") {
            experience[keys[j]] = experiences[i][keys[j]]
          }
        }
      }

      for (let i = 0; i < copyEducation.length; i++) {
        let element = copyEducation[i]

        let keys = Object.keys(element);
        for (let j = 0; j < keys.length; j++) {
          if (element[keys[j]] === "") {
            element[keys[j]] = education[i][keys[j]]
          }
        }
      }

      for (let i = 0; i < copyAwards.length; i++) {
        let element = copyAwards[i]

        let keys = Object.keys(element);
        for (let j = 0; j < keys.length; j++) {
          if (element[keys[j]] === "") {
            element[keys[j]] = awards[i][keys[j]]
          }
        }
      }

      for (let i = 0; i < copyCourses.length; i++) {
        let element = copyCourses[i]

        let keys = Object.keys(element);
        for (let j = 0; j < keys.length; j++) {
          if (element[keys[j]] === "") {
            element[keys[j]] = courses[i][keys[j]]
          }
        }
      }

      for (let i = 0; i < copyLanguages.length; i++) {
        let element = copyLanguages[i]

        let keys = Object.keys(element);
        for (let j = 0; j < keys.length; j++) {
          if (element[keys[j]] === "") {
            element[keys[j]] = languages[i][keys[j]]
          }
        }
      }
      
      
      userRef.set({
        experiences: copyExperiences,
        education: copyEducation,
        awards: copyAwards,
        courses: copyCourses,
        languages: copyLanguages,
        skills: skills 
      }, {merge: true})
    }

    userRef.set({
      description: userDescription || user.description,
      phone: userPhone || user.phone
  }, {merge: true})

    history.push(`/profile/${currentUser.uid}`);
  }

  return (
    !loading && <div>
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
                        onClick={handleSubmit}
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
                      <p>{user.description}</p>
                      <Form>
                        <Input
                          id="exampleFormControlTextarea1"
                          placeholder="Write your career objective ..."
                          rows="3"
                          type="textarea"
                          onChange={event => setDescription(event.target.value)}
                        />
                      </Form>
                      <hr></hr>
                      {/*New Section */}
                      <h3>Personal Details</h3>
                      {/* <Row>
                        <Col md="3">
                          <FormGroup>
                            <b>Email: </b>
                          </FormGroup>
                        </Col>
                        <Col md="9">
                          <FormGroup>
                            <Input
                              id="exampleFormControlInput1"
                              // placeholder="name@example.com"
                              value={user.email}
                              onChange={event => setEmail(event.target.value)}
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row> */}
                      <Row>
                        <Col md="3">
                          <FormGroup>
                            <b>Mobile Phone: </b>
                            <p>{user.phone}</p>
                          </FormGroup>
                        </Col>
                        <Col md="9">
                          <FormGroup>
                            <Input
                              id="exampleFormControlInput1"
                              placeholder="(include country code) +971 000000"
                              onChange={event => setPhone(event.target.value)}
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
                          {Array.apply(null, { length: numExperience }).map((e, i) => {
                            return (
                            <div key={i}>
                              <span>
                                {" "}
                                <b>Job title: </b>
                                <p>{experiences[i] && experiences[i].title}</p>
                              </span>
                            <FormGroup>
                              <Input
                                id="job1_title"
                                placeholder="Enter job title"
                                type="text"
                                onChange={event => setCopyExperiences(elements => {

                                  let newExperiences = []

                                  for (let j = 0; j < i; j++) {
                                    newExperiences[j] = elements[j];
                                  }

                                  let object = elements[i];
                                  let newObject = {...object, "title": event.target.value}

                                  newExperiences[i] = newObject;

                                  for (let j = i + 1; j < elements.length; j++) {
                                    newExperiences[j] = elements[j];
                                  }
                                  return newExperiences;
                                })}

                                  // [...experiences[i - 1], {...experiences[i], "title": event.target.value}, ...experiences[i+1]])}
                              />
                            </FormGroup>
                            <span>
                              {"     "}
                              <b>Company Name </b>
                              <p>{experiences[i] && experiences[i].company}</p>
                            </span>
                            <FormGroup>
                              <Input
                                id="company_name"
                                placeholder="Enter the company name"
                                type="text"
                                onChange={event => setCopyExperiences(elements => {

                                  let newExperiences = []

                                  for (let j = 0; j < i; j++) {
                                    newExperiences[j] = elements[j];
                                  }

                                  let object = elements[i];
                                  let newObject = {...object, "company": event.target.value}

                                  newExperiences[i] = newObject;

                                  for (let j = i + 1; j < elements.length; j++) {
                                    newExperiences[j] = elements[j];
                                  }
                                  return newExperiences;
                                })}
                              />
                            </FormGroup>
                            <Row>
                              <Col md="3">
                                <FormGroup>
                                  <b>Started </b>
                                  <p>{experiences[i] && experiences[i].start_date}</p>
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <FormGroup>
                                  <Input
                                    id="exampleFormControlInput1"
                                    placeholder="DD/MM/YYYY"
                                    type="text"
                                    onChange={event => setCopyExperiences(elements => {

                                      let newExperiences = []
    
                                      for (let j = 0; j < i; j++) {
                                        newExperiences[j] = elements[j];
                                      }
    
                                      let object = elements[i];
                                      let newObject = {...object, "start_date": event.target.value}
    
                                      newExperiences[i] = newObject;
    
                                      for (let j = i + 1; j < elements.length; j++) {
                                        newExperiences[j] = elements[j];
                                      }
                                      return newExperiences;
                                    })}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <FormGroup>
                                  <b>Ended at </b>
                                  <p>{experiences[i] && experiences[i].end_date}</p>
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <FormGroup>
                                  <Input
                                    id="exampleFormControlInput1"
                                    placeholder="DD/MM/YYYY"
                                    type="text"
                                    onChange={event => setCopyExperiences(elements => {

                                      let newExperiences = []
    
                                      for (let j = 0; j < i; j++) {
                                        newExperiences[j] = elements[j];
                                      }
    
                                      let object = elements[i];
                                      let newObject = {...object, "end_date": event.target.value}
    
                                      newExperiences[i] = newObject;
    
                                      for (let j = i + 1; j < elements.length; j++) {
                                        newExperiences[j] = elements[j];
                                      }
                                      return newExperiences;
                                    })}
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
                            <p>{experiences[i] && experiences[i].description}</p>
                            <Form>
                              <Input
                                id="exampleFormControlTextarea1"
                                placeholder="Write the job description and achievements ..."
                                rows="3"
                                type="textarea"
                                onChange={event => setCopyExperiences(elements => {

                                  let newExperiences = []

                                  for (let j = 0; j < i; j++) {
                                    newExperiences[j] = elements[j];
                                  }

                                  let object = elements[i];
                                  let newObject = {...object, "description": event.target.value}

                                  newExperiences[i] = newObject;

                                  for (let j = i + 1; j < elements.length; j++) {
                                    newExperiences[j] = elements[j];
                                  }
                                  return newExperiences;
                                })}
                              />
                            </Form>
                           </div>)
                           })}
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
                                    onClick={event => setNumExperience(num => {
                                      setCopyExperiences(element => [...element, {}])
                                      return num + 1
                                    })}
                                  >
                                    Add
                                  </Button>
                                </Col>
                              </Row>
                            </div>
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
                                    onClick={event => setNumExperience(num => {

                                      setCopyExperiences(elements => {

                                        let newArray = []
                                        for (let i = 0; i < elements.length - 1; i++) {
                                          newArray[i] = elements[i]
                                        }
                                        return newArray;
                                      })

                                      return num - 1;
                                    })}
                                  >
                                    Remove
                                  </Button>
                                </Col>
                              </Row>
                            </div>
                          <hr></hr>

                          {/*New Section */}
                          <h3>Education</h3>

                          {Array.apply(null, { length: numEducation }).map((e, i) => {
                            return (
                          <div key={i}>
                            <span>
                              {" "}
                              <b>University/ School Name </b>
                              <p>{education[i] && education[i].location}</p>
                            </span>
                            <FormGroup>
                              <Input
                                id="uni_name"
                                placeholder="Enter University/ School Name"
                                type="text"
                                onChange={event => setCopyEducation(elements => {

                                  let newExperiences = []

                                  for (let j = 0; j < i; j++) {
                                    newExperiences[j] = elements[j];
                                  }

                                  let object = elements[i];
                                  let newObject = {...object, "location": event.target.value}

                                  newExperiences[i] = newObject;

                                  for (let j = i + 1; j < elements.length; j++) {
                                    newExperiences[j] = elements[j];
                                  }
                                  return newExperiences;
                                })}
                              />
                            </FormGroup>
                            <span>
                              {"     "}
                              <b>Major or Area of Study </b>
                              <p>{education[i] && education[i].title}</p>
                            </span>
                            <FormGroup>
                              <Input
                                id="company_name"
                                placeholder="Enter your major or Area of Study"
                                type="text"
                                onChange={event => setCopyEducation(elements => {

                                  let newExperiences = []

                                  for (let j = 0; j < i; j++) {
                                    newExperiences[j] = elements[j];
                                  }

                                  let object = elements[i];
                                  let newObject = {...object, "title": event.target.value}

                                  newExperiences[i] = newObject;

                                  for (let j = i + 1; j < elements.length; j++) {
                                    newExperiences[j] = elements[j];
                                  }
                                  return newExperiences;
                                })}
                              />
                            </FormGroup>
                            <Row>
                              <Col md="3">
                                <FormGroup>
                                  <b>Started </b>
                                  <p>{education[i] && education[i].start_date}</p>
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <FormGroup>
                                  <Input
                                    id="exampleFormControlInput1"
                                    placeholder="DD/MM/YYYY"
                                    type="text"
                                    onChange={event => setCopyEducation(elements => {

                                      let newExperiences = []
    
                                      for (let j = 0; j < i; j++) {
                                        newExperiences[j] = elements[j];
                                      }
    
                                      let object = elements[i];
                                      let newObject = {...object, "start_date": event.target.value}
    
                                      newExperiences[i] = newObject;
    
                                      for (let j = i + 1; j < elements.length; j++) {
                                        newExperiences[j] = elements[j];
                                      }
                                      return newExperiences;
                                    })}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <FormGroup>
                                  <b>Ended (or Expected) </b>
                                  <p>{education[i] && education[i].end_date}</p>
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <FormGroup>
                                  <Input
                                    id="exampleFormControlInput1"
                                    placeholder="DD/MM/YYYY"
                                    type="text"
                                    onChange={event => setCopyEducation(elements => {

                                      let newExperiences = []
    
                                      for (let j = 0; j < i; j++) {
                                        newExperiences[j] = elements[j];
                                      }
    
                                      let object = elements[i];
                                      let newObject = {...object, "end_date": event.target.value}
    
                                      newExperiences[i] = newObject;
    
                                      for (let j = i + 1; j < elements.length; j++) {
                                        newExperiences[j] = elements[j];
                                      }
                                      return newExperiences;
                                    })}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="3">
                                <FormGroup>
                                  <b>GPA: </b>
                                  <p>{education[i] && education[i].gpa}</p>
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <FormGroup>
                                  <Input
                                    id="exampleFormControlInput1"
                                    placeholder="GPA"
                                    type="text"
                                    onChange={event => setCopyEducation(elements => {

                                      let newExperiences = []
    
                                      for (let j = 0; j < i; j++) {
                                        newExperiences[j] = elements[j];
                                      }
    
                                      let object = elements[i];
                                      let newObject = {...object, "gpa": event.target.value}
    
                                      newExperiences[i] = newObject;
    
                                      for (let j = i + 1; j < elements.length; j++) {
                                        newExperiences[j] = elements[j];
                                      }
                                      return newExperiences;
                                    })}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <b> Courses </b>
                            <p>{education[i] && education[i].courses}</p>
                            <Form>
                              <Input
                                id="exampleFormControlTextarea1"
                                placeholder="Courses (separated by commas)"
                                rows="3"
                                type="text"
                                onChange={event => setCopyEducation(elements => {

                                  let newExperiences = []

                                  for (let j = 0; j < i; j++) {
                                    newExperiences[j] = elements[j];
                                  }

                                  let object = elements[i];
                                  let newObject = {...object, "courses": event.target.value.match(/\w+/g)}

                                  newExperiences[i] = newObject;

                                  for (let j = i + 1; j < elements.length; j++) {
                                    newExperiences[j] = elements[j];
                                  }
                                  return newExperiences;
                                })}
                              />
                            </Form>
                          </div>)
                          })}
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
                                    onClick={event => setNumEducation(num => {
                                      setCopyEducation(element => [...element, {}])
                                      return num + 1
                                    })}
                                  >
                                    Add
                                  </Button>
                                </Col>
                              </Row>
                            </div>
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
                                    onClick={event => setNumEducation(num => {

                                      setCopyEducation(elements => {

                                        let newArray = []
                                        for (let i = 0; i < elements.length - 1; i++) {
                                          newArray[i] = elements[i]
                                        }
                                        return newArray;
                                      })

                                      return num - 1;
                                    })}
                                  >
                                    Remove
                                  </Button>
                                </Col>
                              </Row>
                            </div>
                          <hr></hr>

                          {/*New Section */}
                          <h3>Awards</h3>
                          {Array.apply(null, { length: numAwards }).map((e, i) => {
                            return (
                          <div key={i}>
                            <span>
                              {" "}
                              <b>Title of the Award </b>
                              <p>{awards[i] && awards[i].title}</p>
                            </span>
                            <FormGroup>
                              <Input
                                id="uni_name"
                                placeholder="Enter title of the Award"
                                type="text"
                                onChange={event => setCopyAwards(elements => {

                                  let newExperiences = []

                                  for (let j = 0; j < i; j++) {
                                    newExperiences[j] = elements[j];
                                  }

                                  let object = elements[i];
                                  let newObject = {...object, "title": event.target.value}

                                  newExperiences[i] = newObject;

                                  for (let j = i + 1; j < elements.length; j++) {
                                    newExperiences[j] = elements[j];
                                  }
                                  return newExperiences;
                                })}
                              />
                            </FormGroup>
                            <Row>
                              <Col md="3">
                                <FormGroup>
                                  <b>Received </b>
                                  <p>{awards[i] && awards[i].received}</p>
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <FormGroup>
                                  <Input
                                    id="exampleFormControlInput1"
                                    placeholder="DD/MM/YYYY"
                                    type="text"
                                    onChange={event => setCopyAwards(elements => {

                                      let newExperiences = []
    
                                      for (let j = 0; j < i; j++) {
                                        newExperiences[j] = elements[j];
                                      }
    
                                      let object = elements[i];
                                      let newObject = {...object, "received": event.target.value}
    
                                      newExperiences[i] = newObject;
    
                                      for (let j = i + 1; j < elements.length; j++) {
                                        newExperiences[j] = elements[j];
                                      }
                                      return newExperiences;
                                    })}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <FormGroup>
                                  <b>Expiration </b>
                                  <p>{awards[i] && awards[i].expiry}</p>
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <FormGroup>
                                  <Input
                                    id="exampleFormControlInput1"
                                    placeholder="DD/MM/YYYY"
                                    type="text"
                                    onChange={event => setCopyAwards(elements => {

                                      let newExperiences = []
    
                                      for (let j = 0; j < i; j++) {
                                        newExperiences[j] = elements[j];
                                      }
    
                                      let object = elements[i];
                                      let newObject = {...object, "expiry": event.target.value}
    
                                      newExperiences[i] = newObject;
    
                                      for (let j = i + 1; j < elements.length; j++) {
                                        newExperiences[j] = elements[j];
                                      }
                                      return newExperiences;
                                    })}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            <b> Description </b>
                            <p>{awards[i] && awards[i].description}</p>
                            <Form>
                              <Input
                                id="exampleFormControlTextarea1"
                                placeholder="Write your awards and achievements regrading the award ..."
                                rows="3"
                                type="textarea"
                                onChange={event => setCopyAwards(elements => {

                                  let newExperiences = []

                                  for (let j = 0; j < i; j++) {
                                    newExperiences[j] = elements[j];
                                  }

                                  let object = elements[i];
                                  let newObject = {...object, "description": event.target.value}

                                  newExperiences[i] = newObject;

                                  for (let j = i + 1; j < elements.length; j++) {
                                    newExperiences[j] = elements[j];
                                  }
                                  return newExperiences;
                                })}
                              />
                            </Form>
                          </div> )})}

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
                                    onClick={event => setNumAwards(num => {
                                      setCopyAwards(element => [...element, {}])
                                      return num + 1
                                    })}
                                  >
                                    Add
                                  </Button>
                                </Col>
                              </Row>
                            </div>
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
                                    onClick={event => setNumAwards(num => {

                                      setCopyAwards(elements => {

                                        let newArray = []
                                        for (let i = 0; i < elements.length - 1; i++) {
                                          newArray[i] = elements[i]
                                        }
                                        return newArray;
                                      })

                                      return num - 1;
                                    })}
                                  >
                                    Remove
                                  </Button>
                                </Col>
                              </Row>
                            </div>
                          <hr></hr>

                          {/*New Section */}
                          <h3>Courses</h3>
                          {Array.apply(null, { length: numCourses }).map((e, i) => {
                            return (
                          <div key={i}>
                            <div>
                              <span>
                                {" "}
                                <b>Title of the Course </b>
                                <p>{courses[i] && courses[i].title}</p>
                              </span>
                              <FormGroup>
                                <Input
                                  id="uni_name"
                                  placeholder="Enter title of the Course"
                                  type="text"
                                  onChange={event => setCopyCourses(elements => {

                                    let newExperiences = []
  
                                    for (let j = 0; j < i; j++) {
                                      newExperiences[j] = elements[j];
                                    }
  
                                    let object = elements[i];
                                    let newObject = {...object, "title": event.target.value}
  
                                    newExperiences[i] = newObject;
  
                                    for (let j = i + 1; j < elements.length; j++) {
                                      newExperiences[j] = elements[j];
                                    }
                                    return newExperiences;
                                  })}
                                />
                              </FormGroup>
                              <Row>
                                <Col md="3">
                                  <FormGroup>
                                    <b>Start Date </b>
                                    <p>{courses[i] && courses[i].start_date}</p>
                                  </FormGroup>
                                </Col>
                                <Col md="3">
                                  <FormGroup>
                                    <Input
                                      id="exampleFormControlInput1"
                                      placeholder="DD/MM/YYYY"
                                      type="text"
                                      onChange={event => setCopyCourses(elements => {

                                        let newExperiences = []
      
                                        for (let j = 0; j < i; j++) {
                                          newExperiences[j] = elements[j];
                                        }
      
                                        let object = elements[i];
                                        let newObject = {...object, "start_date": event.target.value}
      
                                        newExperiences[i] = newObject;
      
                                        for (let j = i + 1; j < elements.length; j++) {
                                          newExperiences[j] = elements[j];
                                        }
                                        return newExperiences;
                                      })}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md="3">
                                  <FormGroup>
                                    <b>End Date </b>
                                    <p>{courses[i] && courses[i].end_date}</p>
                                  </FormGroup>
                                </Col>
                                <Col md="3">
                                  <FormGroup>
                                    <Input
                                      id="exampleFormControlInput1"
                                      placeholder="DD/MM/YYYY"
                                      type="text"
                                      onChange={event => setCopyCourses(elements => {

                                        let newExperiences = []
      
                                        for (let j = 0; j < i; j++) {
                                          newExperiences[j] = elements[j];
                                        }
      
                                        let object = elements[i];
                                        let newObject = {...object, "end_date": event.target.value}
      
                                        newExperiences[i] = newObject;
      
                                        for (let j = i + 1; j < elements.length; j++) {
                                          newExperiences[j] = elements[j];
                                        }
                                        return newExperiences;
                                      })}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>

                              <b> Description </b>
                              <p>{courses[i] && courses[i].description}</p>
                              <Form>
                                <Input
                                  id="exampleFormControlTextarea1"
                                  placeholder="Write the your educational achievements and related courses ..."
                                  rows="3"
                                  type="textarea"
                                  onChange={event => setCopyCourses(elements => {

                                    let newExperiences = []
  
                                    for (let j = 0; j < i; j++) {
                                      newExperiences[j] = elements[j];
                                    }
  
                                    let object = elements[i];
                                    let newObject = {...object, "description": event.target.value}
  
                                    newExperiences[i] = newObject;
  
                                    for (let j = i + 1; j < elements.length; j++) {
                                      newExperiences[j] = elements[j];
                                    }
                                    return newExperiences;
                                  })}
                                />
                              </Form>
                            </div>
                          </div>)})}
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
                                    onClick={event => setNumCourses(num => {
                                      setCopyCourses(element => [...element, {}])
                                      return num + 1
                                    })}
                                  >
                                    Add
                                  </Button>
                                </Col>
                              </Row>
                            </div>
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
                                    onClick={event => setNumCourses(num => {

                                      setCopyCourses(elements => {

                                        let newArray = []
                                        for (let i = 0; i < elements.length - 1; i++) {
                                          newArray[i] = elements[i]
                                        }
                                        return newArray;
                                      })

                                      return num - 1;
                                    })}
                                  >
                                    Remove
                                  </Button>
                                </Col>
                              </Row>
                            </div>
                          <hr></hr>
                          {/*New Section */}
                          <h3>Languages</h3>
                          {Array.apply(null, { length: numLanguages }).map((e, i) => {
                            return ( 
                          <div key={i}>
                            <Row>
                              <Col md="3">
                                <FormGroup>
                                  <b>langauage </b>
                                  <p>{languages[i] && languages[i].language} - {languages[i] && languages[i].fluency}</p>
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <FormGroup>
                                  <Input
                                    id="exampleFormControlInput1"
                                    placeholder="Language"
                                    type="text"
                                    onChange={event => setCopyLanguages(elements => {

                                      let newExperiences = []
    
                                      for (let j = 0; j < i; j++) {
                                        newExperiences[j] = elements[j];
                                      }
    
                                      let object = elements[i];
                                      let newObject = {...object, "language": event.target.value}
    
                                      newExperiences[i] = newObject;
    
                                      for (let j = i + 1; j < elements.length; j++) {
                                        newExperiences[j] = elements[j];
                                      }
                                      return newExperiences;
                                    })}
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
                                      onClick={event => setCopyLanguages(elements => {

                                        let newExperiences = []
      
                                        for (let j = 0; j < i; j++) {
                                          newExperiences[j] = elements[j];
                                        }
      
                                        let object = elements[i];
                                        let newObject = {...object, "fluency": "Beginner"}
      
                                        newExperiences[i] = newObject;
      
                                        for (let j = i + 1; j < elements.length; j++) {
                                          newExperiences[j] = elements[j];
                                        }
                                        return newExperiences;
                                      })}
                                    >
                                      Beginner
                                    </DropdownItem>
                                    <DropdownItem
                                      href="#pablo"
                                      onClick={event => setCopyLanguages(elements => {

                                        let newExperiences = []
      
                                        for (let j = 0; j < i; j++) {
                                          newExperiences[j] = elements[j];
                                        }
      
                                        let object = elements[i];
                                        let newObject = {...object, "fluency": "Intermediate"}
      
                                        newExperiences[i] = newObject;
      
                                        for (let j = i + 1; j < elements.length; j++) {
                                          newExperiences[j] = elements[j];
                                        }
                                        return newExperiences;
                                      })}
                                    >
                                      Intermediate
                                    </DropdownItem>
                                    <DropdownItem
                                      href="#pablo"
                                      onClick={event => setCopyLanguages(elements => {

                                        let newExperiences = []
      
                                        for (let j = 0; j < i; j++) {
                                          newExperiences[j] = elements[j];
                                        }
      
                                        let object = elements[i];
                                        let newObject = {...object, "fluency": "Fluent"}
      
                                        newExperiences[i] = newObject;
      
                                        for (let j = i + 1; j < elements.length; j++) {
                                          newExperiences[j] = elements[j];
                                        }
                                        return newExperiences;
                                      })}
                                    >
                                      Fluent
                                    </DropdownItem>
                                    <DropdownItem
                                      href="#pablo"
                                      onClick={event => setCopyLanguages(elements => {

                                        let newExperiences = []
      
                                        for (let j = 0; j < i; j++) {
                                          newExperiences[j] = elements[j];
                                        }
      
                                        let object = elements[i];
                                        let newObject = {...object, "fluency": "Native"}
      
                                        newExperiences[i] = newObject;
      
                                        for (let j = i + 1; j < elements.length; j++) {
                                          newExperiences[j] = elements[j];
                                        }
                                        return newExperiences;
                                      })}
                                    >
                                      Native
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </Col>
                            </Row>
                          </div>
                          )})}
                          <div className="card-profile-actions">
                              <Row>
                                <Col md="10"></Col>
                                <Col md="2">
                                  <Button
                                    outline
                                    type="button"
                                    color="info"
                                    type="link"
                                    size="m"
                                    onClick={event => setNumLanguages(num => {
                                      setCopyLanguages(element => [...element, {}])
                                      return num + 1
                                    })}
                                  >
                                    Add
                                  </Button>
                                </Col>
                              </Row>
                            </div>
                            <div className="card-profile-actions">
                              <Row>
                                <Col md="10"></Col>
                                <Col md="2">
                                  <Button
                                    outline
                                    type="button"
                                    color="info"
                                    type="link"
                                    size="m"
                                    onClick={event => setNumLanguages(num => {

                                      setCopyLanguages(elements => {

                                        let newArray = []
                                        for (let i = 0; i < elements.length - 1; i++) {
                                          newArray[i] = elements[i]
                                        }
                                        return newArray;
                                      })

                                      return num - 1;
                                    })}
                                  >
                                    Remove
                                  </Button>
                                </Col>
                              </Row>
                            </div>
                          <hr></hr>
                          {/*New Section */}
                          <h3>Skills</h3>
                          {user.skills.map(skill => {
                            return (
                              <Badge key={skill} color="info" pill className="mr-1">
                                {skill}
                              </Badge>
                            )
                          })}
                          <div>
                           <Row>
                              <Col md="9">
                                <FormGroup>
                                  <Input
                                    id="exampleFormControlInput1"
                                    placeholder="Add your skills (separated by commas)"
                                    type="text"
                                    onChange={event => setSkills(event.target.value.match(/\w+/g))}
                                  />
                                </FormGroup>
                              </Col>
                              {/* <Col md="3">
                              <Button
                                    outline
                                    type="button"
                                    color="info"
                                    type="link"
                                    size="m"
                                  >
                                    Add
                                  </Button>
                              </Col> */}
                           </Row>
                          </div>
                          {/* <div style={{ display: "flex" }}>
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
                          </div> */}
                          <hr></hr>
                        </div>
                      )}
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
