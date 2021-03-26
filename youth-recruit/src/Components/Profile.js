import React from 'react'
import { useAuth } from "../Components/context/AuthContext"
import { useHistory } from 'react-router-dom'



export default function Profile() {
    const { logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
    
        try {
            await logout()
            history.push("/login")
        } catch {
        }
    }

    return (
        <div>
            <button type="link" onClick={handleLogout}>
                Log Out
            </button>
        </div>
    )
}
