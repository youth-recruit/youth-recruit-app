import React, { useRef, useState, useEffect } from 'react'
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
    Col
  } from "reactstrap";
import ReactDatetime from "react-datetime";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import { useHistory } from 'react-router-dom';
import { database } from "../../firebase"
import { useAuth } from "../context/AuthContext"
import { Link } from 'react-router-dom';

import DemoNavbar from "../Navbars/DemoNavbar.js";
import CardsFooter from "../Footers/CardsFooter.js";
import "./jobPosting.css"

export default function JobPosting() {

    const titleRef = useRef();
    // const companyRef = useRef();
    const descriptionRef = useRef();
    const tagsRef = useRef();
    const salaryRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [user, setUser] = useState('');
    const [date, setDate] = useState(new Date());
    const history = useHistory();
    const { currentUser } = useAuth()


    useEffect(() => {
        const fetchData = async () => {
            const userRef = database.collection("users").doc(currentUser.uid)
            const doc = await userRef.get();
            if (doc.exists) {
              setUser(doc.data())
            }
            setLoading(false)
        }
        fetchData()
    }, [])
    
    function handleSubmit(e) {
        e.preventDefault();
        console.log("sumbit")

        try {
            // setError("");
            // setLoading(true);
            console.log(titleRef.current.value)
            database.collection('jobs').add({
              title: titleRef.current.value,
              description: descriptionRef.current.value,
              tags: tagsRef.current.value.match(/\w+/g),
              company: user.company.name,
              user: currentUser.uid,
              applicants: []
            })
            .then(job => {
              console.log("Try")
                const userRef = database.collection("users").doc(currentUser.uid);
    
                userRef.set({
                    applications: {
                        archived: [...user.applications.archived],
                        active: [...user.applications.active, job.id]
                    }
                }, {merge: true})
                console.log("Adding")
                const jobRef = database.collection("jobs").doc(job.id)
                jobRef.set({
                  id: job.id
                }, {merge: true})
            }) 
            console.log(user);
            history.push("/")
        } catch {
            setError("Failed to create a post");
        }

        setLoading(false);
    }


    return (
        <div>
            <DemoNavbar currentUser={currentUser}/>
            <main>
            <div className="position-relative">
              {/* shape Hero */}
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
                </div>
                <Container className="py-lg-md d-flex">
                  <div className="col px-0">
                    <Row className ="justify-content-center">
                      <Col lg="9">
                      <Card className="bg-gradient-secondary shadow">
                    <CardBody className="p-lg-5">
                      <h4 className="mb-1">Want to post a job with us?</h4>
                      <p className="mt-0">
                        Please enter all the details below for the job
                      </p>
                      
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                            <i className="ni ni-briefcase-24" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Enter Job Title"
                            type="text"
                            innerRef={titleRef}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                            <i className="ni ni-watch-time" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Job Duration"
                            type="text"
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                            <i className="ni ni-money-coins" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Enter Job Salary"
                            type="text"
                            innerRef={tagsRef}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-4">
                        <Input
                          className="form-control-alternative"
                          cols="80"
                          name="name"
                          placeholder="Enter more about the Company..."
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                      <FormGroup className="mb-4">
                        <Input
                          className="form-control-alternative"
                          cols="80"
                          name="name"
                          placeholder="Enter the Job Description..."
                          rows="4"
                          type="textarea"
                          innerRef={descriptionRef}
                        />
                      </FormGroup>
                      <FormGroup className="mb-4">
                        <Input
                          className="form-control-alternative"
                          cols="80"
                          name="name"
                          placeholder="Enter the Job Requirements..."
                          rows="4"
                          type="textarea"
                          ref={descriptionRef}
                        />
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                            <i className="ni ni-send" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Enter Contact details"
                            type="text"
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                            <i className="ni ni-fat-add" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Enter the tags of the jobs seperate by commas (,) "
                            type="text"
                            ref={tagsRef}
                          />
                        </InputGroup>
                      </FormGroup>
                      <div>
                        <Button
                          block
                          className="btn-round"
                          color="default"
                          size="lg"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Post Job
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                        
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
                    <polygon
                      className="fill-white"
                      points="2560 0 2560 100 0 100"
                    />
                  </svg>
                </div>
              </section>
              {/* 1st Hero Variation */}
            </div>
          </main>
          <CardsFooter />          

            {/*<form>
                <input ref={titleRef} placeholder="Title"></input>
                <textarea ref={descriptionRef} placeholder="Description"></textarea>
                <input ref={tagsRef} placeholder="Tags. Seperate by commas (,)"></input>
                <button type="submit" onClick={handleSubmit}>Add Job</button>
            </form>*/}
        </div>
    )
}
