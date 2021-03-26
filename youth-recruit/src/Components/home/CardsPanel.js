import React, {useEffect, useState} from 'react'
import { database } from "../../firebase";

import {
    Badge,
    Button,
    Card,
    CardBody,
    Container,
    Row,
    Col
  } from "reactstrap";

export default function CardsPanel() {

    // const [snapshot, setSnapshot] = useState(null)

    // async function fetchJobs() {
    //     const jobRef = database.collection('jobs');
    //     const data = await jobRef.get();
    //     setSnapshot(data); 
    // }

    const [jobs, setJobs] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await database.collection('jobs').get()
            setJobs(data.docs.map(doc => [doc.id, doc.data()]))
        }
        fetchData()
    }, [])

    

    return (
        <section className="section section-lg pt-lg-0 mt--200">
            <Container>
                <Row className="justify-content-center">
                    <Col lg="12">
                        <Row className="row-grid">
                            {jobs.map(job => (
                                <Col lg="4" key={job[0]}>
                                <Card className="card-lift--hover shadow border-0">
                                    <CardBody className="py-5">
                                    <h5 className="text-primary text-uppercase">
                                        {job[1].title}
                                    </h5>
                                    <h6 className="text-primary">
                                        {job[1].company}
                                    </h6>
                                    <p className="description mt-3">
                                        {job[1].description}
                                    </p>
                                    <div>
                                        {job[1].tags.map(tag => (
                                            <Badge key={tag} color="primary" pill className="mr-1">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <Button
                                        className="mt-4"
                                        color="primary"
                                        href={`/${job[0]}`}
                                        // onClick={e => e.preventDefault()}
                                    >
                                        Learn more
                                    </Button>
                                    </CardBody>
                                </Card>
                                </Col>
                            ))}
                
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    )
}
