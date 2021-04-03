import React, { useState, useEffect } from 'react'
import {useAuth} from "Components/context/AuthContext"
import { Button } from 'reactstrap'
import {database} from "../firebase"
import DemoNavbar from './Navbars/DemoNavbar'

export default function EditProfile() {

    const { currentUser } = useAuth()
    const [user, setUser] = useState({})

    useEffect(() => {
        const fetchUserData = async () => {
            const userRef = database.collection("users").doc(currentUser.uid)
            const doc = await userRef.get();
            if (doc.exists) {
              setUser(doc.data())
            }
        }
        fetchUserData()
    }, [])
    


    function handleSumbit() {

    }

    return (

        <div>
            {/* <DemoNavbar currentUser={currentUser}/> */}
            <form>

                <Button onClick={handleSumbit}>Save changes</Button>
            </form>
        </div>
    )
}
