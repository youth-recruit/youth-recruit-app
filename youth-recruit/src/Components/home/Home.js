import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import NavigationBar from '../../Header/NavigationBar'
import { useAuth } from "../context/AuthContext"
import "./home.css"

export default function Home() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }
    return (
        <div>
            <NavigationBar />
            {error}
            {currentUser && JSON.stringify(currentUser)}
            <Link to="profile">Update Profile</Link>
            <button type="link" onClick={handleLogout}>
                Log Out
            </button>
        </div>
    )
}
