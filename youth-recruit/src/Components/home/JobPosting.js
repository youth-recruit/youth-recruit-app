import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { database } from "../../firebase"
import { useAuth } from "../context/AuthContext"
import "./jobPosting.css"

export default function JobPosting() {

    const titleRef = useRef();
    // const companyRef = useRef();
    const descriptionRef = useRef();
    const tagsRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const [companyName, setCompanyName] = useState('');
    const history = useHistory();
    const { currentUser } = useAuth()
    getCurrentUserData()

    function getCurrentUserData() {
        const docRef = database.collection("users").doc(currentUser.uid)
  
        docRef.get().then((doc) => {
          if (doc.exists) {
            // console.log("Document data:", doc.data());
            setCompanyName(doc.data().company.name)
            console.log(doc.data().company.name)
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
        }).catch((error) => {
          console.log("Error getting document:", error);
        });
  
        return false;
      }
    
    function handleSubmit(e) {
        e.preventDefault();
        
        getCurrentUserData()
        

        try {
            setError("");
            setLoading(true);
            console.log(currentUser)
            console.log(companyName)
            database.collection('jobs').add({
                title: titleRef.current.value,
                description: descriptionRef.current.value,
                tags: tagsRef.current.value.match(/\w+/g),
                company: companyName,
                user: currentUser.uid
            })
            // console.log(user);
            history.push("/")
        } catch {
            setError("Failed to create a post");
        }

        setLoading(false);
    }


    return (
        <div>
            <form>
                <input ref={titleRef} placeholder="Title"></input>
                <textarea ref={descriptionRef} placeholder="Description"></textarea>
                <input ref={tagsRef} placeholder="Tags. Seperate by commas (,)"></input>
                <button type="submit" onClick={handleSubmit}>Add Job</button>
            </form>
        </div>
    )
}
