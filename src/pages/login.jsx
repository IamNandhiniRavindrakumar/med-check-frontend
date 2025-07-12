import { useState } from "react";

export default function Login({onLogin}){
    const [email, setEmail] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        if(!email.trim()) return alert("enter email!");
        localStorage.setItem("email",email)
        onLogin(email)
    }

    return(
        <div className="login-page">
            <h1>login</h1>
            <form onSubmit={handleLogin}>
                <input 
                type="text"
                placeholder="enter email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <button type="submit">continue</button>
            </form>
        </div>
    )
}

