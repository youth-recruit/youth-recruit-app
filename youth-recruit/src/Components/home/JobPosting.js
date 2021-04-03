import React, { useRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { database } from "../../firebase"
import { useAuth } from "../context/AuthContext"
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

        try {
            setError("");
            setLoading(true);
            database.collection('jobs').add({
                title: titleRef.current.value,
                description: descriptionRef.current.value,
                tags: tagsRef.current.value.match(/\w+/g),
                company: user.company.name,
                user: currentUser.uid
            })
            .then(job => {
                const userRef = database.collection("users").doc(currentUser.uid);
    
                userRef.set({
                    applications: {
                        archived: [...user.applications.archived],
                        active: [...user.applications.active, job.id]
                    }
                }, {merge: true})
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
