import React, { useState, useEffect } from 'react'

import { useAuth } from "../context/AuthContext"
import { database } from "../../firebase";

import {
    Container,
    Row,
    Col,
    Button,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    FormGroup,
    Form,
  } from "reactstrap";
  
// core components
import DemoNavbar from "../Navbars/DemoNavbar.js";
import CardsFooter from "../Footers/CardsFooter.js";
  
// index page sections
import "./home.css"
import CardsPanel from './CardsPanel';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';


// class Home extends React.Component {
//     state = {};
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

// export default Home;



export default function Home() {
    const { currentUser } = useAuth()
    const [isRecruiter, setRecruiter] = useState(false)
    

    // async function isUserRecruit() {
    //   const docRef = database.collection("users").doc(currentUser.uid)
    //   docRef.get().then((doc) => {
    //     if (doc.exists) {
    //       // console.log("Document data:", doc.data());
    //       // console.log(doc.data().recruiter_flag);
    //       return doc.data().recruiter_flag
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
    //   }).catch((error) => {
    //     console.log("Error getting document:", error);
    //   });
    //   return false
    // }

    useEffect(() => {
      const isUserRecruit = async () => {
        const docRef = database.collection("users").doc(currentUser.uid)
        docRef.get().then((doc) => {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          // console.log(doc.data().recruiter_flag);
          setRecruiter(doc.data().recruiter_flag)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        }).catch((error) => {
          console.log("Error getting document:", error);
        });
      }
      isUserRecruit();
    }, [])

    return (
        <div>
            {/* <NavigationBar /> */}
            {/* {error} */}
            {/* {currentUser && JSON.stringify(currentUser)} */}
            {/* <Link to="profile">Update Profile</Link> */}
            
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
                    <Row>
                      <Col lg="6">
                        <h1 className="display-3 text-white">
                          Youth Recruit{" "}
                          <span>Best Solution in Job Hunting</span>
                        </h1>
                        <p className="lead text-white">
                          We will help you find part-time and full-time paid jobs at a variety of places.
                        </p>
                        
                      </Col>
                      <Col>
                        {isRecruiter && <Link to="/new-job"><Button>Post Job</Button></Link>}
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                          <FormGroup>
                            <InputGroup className="mb-4">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-zoom-split-in" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Search for jobs" type="text" />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                          <InputGroup>
                          <Button><Link to="#">Search</Link></Button>
                          </InputGroup>
                        </FormGroup>
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
            <SearchBar />
            <CardsPanel />
          </main>
          <CardsFooter />          
        </div>
    )
}
