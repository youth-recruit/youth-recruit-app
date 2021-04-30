import React, { useEffect, useState } from 'react'
import { useAuth } from "../Components/context/AuthContext"
import { database } from "../firebase";
import DemoNavbar from './Navbars/DemoNavbar';
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

export default function MyApplications() {
    const { currentUser } = useAuth()
    const [user, setUser] = useState({})
    const [appliedJobs, setAppliedJobs] = useState([])
    const [savedJobs, setSavedJobs] = useState([])
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchUserData = async () => {
          const userRef = database.collection("users").doc(window.location.pathname.substr(9, 28))
          const doc = await userRef.get();
          if (doc.exists) {
            setUser(doc.data())
            
            return doc.data()
          }
        }
    
        const fetchJobData = async (id, list) => {
          list(jobs => [])
          const jobRef = database.collection("jobs").doc(id)
          const doc = await jobRef.get();
          if (doc.exists) {
            list(jobs => [...jobs, doc.data()])
            setLoading(false)
          }
        }
    
        const fetchAllData = async () => {
            const user = await fetchUserData()
            if(!user.recruiter_flag) {
                user.applications.applied.map(jobID => {fetchJobData(jobID, setAppliedJobs)})
                user.applications.saved.map(jobID => {fetchJobData(jobID, setSavedJobs)})
            }
            
        }
    
        fetchAllData()
    
        // if (window.location.pathname === `/profile/${currentUser.uid}`){
        //   setIsSameUser(true)
        // }
    
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
                <section>
                <p>My Applications</p>
                <p>Jobs Applied</p>
                {!user.recruiter_flag && appliedJobs.map(job => (
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
                            href={`/${job.id}`}
                            // onClick={e => e.preventDefault()}
                        >
                            Learn more
                        </Button>
                        </CardBody>
                    </Card>
                    </Col>
                // </div>
                ))}
                
                <p>Jobs Saved </p>
                {!user.recruiter_flag && savedJobs.map(job => (
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
                            href={`/${job.id}`}
                            // onClick={e => e.preventDefault()}
                        >
                            Learn more
                        </Button>
                        </CardBody>
                    </Card>
                    </Col>
                // </div>
                ))}
                </section>
        </main>
        </div>
    )
}
