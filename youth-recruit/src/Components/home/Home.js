import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"

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
            {error}
            {currentUser && currentUser.email}
            <Link to="profile">Update Profile</Link>
            <button type="link" onClick={handleLogout}>
                Log Out
            </button>
        </div>
    )
}
