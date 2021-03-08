import React, { useRef } from 'react';
import { useAuth } from "../Components/context/AuthContext";

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();

    function handleSubmit(e) {
        e.preventDefault();

        signup(emailRef.current.value, passwordRef.current.value);
    }

    return (
        <div>
            {/* TODO: Create a SignUp Page here */}
            <input type="email" ref={emailRef} required placeholder="Email"/>
            <input type="password" ref={passwordRef} required placeholder="Password" />
            <input type="password" ref={passwordConfirmRef} required placeholder="Confirm Password" />
            <button type="submit" onClick={handleSubmit}>Sign Up</button>
        </div>
    )
}
