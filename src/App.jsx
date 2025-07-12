import { useState,useEffect } from "react";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import './App.css';
import "./style.css";




export default function App() {
    const [userEmail, setUserEmail] = useState(localStorage.getItem("email") || "");

      useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

    return(
      <div className="App">
         {userEmail ? (<Dashboard userEmail={userEmail}/>) :
         (<Login onLogin={setUserEmail}/>)}
      </div>
    )

}