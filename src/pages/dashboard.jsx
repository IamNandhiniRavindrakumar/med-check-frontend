import { useEffect, useState } from "react";

export default function Dashboard({userEmail}) {
   {const [meds, setMeds] = useState([]);
    const [name, setName] = useState("");
    const [dosage, setDosage] = useState("");
    
    // fetch all medication from the backend
    const fetchMed = () => {
        fetch("https://med-check-backend.onrender.com/api/medications/")
        .then((res)=>{
            if(!res.ok) {
                throw new Error("failed to fetch medications")
            }
            return res.json() 
        })
        .then((data)=>{
            setMeds(data)
        })
        .catch((err)=>{
            console.error("failed to fetch medications", err)
        })
    }

    // add medications
    const addMed = (e) => {
         e.preventDefault()
        fetch("https://med-check-backend.onrender.com/api/medications/add",{
            method : "POST",
            headers : {"content-type" : "application/json"},
            body : JSON.stringify({name,dosage})
        })
        .then((res)=>{
            if(!res.ok) {
                throw new Error("failed to add medication")
            }
            return res.json()
        })
        .then((data)=>{
            setMeds((prev)=>[...prev,data.medication]);
            setName("");
            setDosage("")
        })
         .catch((err) => {
      console.error("Failed to add medication", err);
    });
    }

    // mark as taken
    const markAsTaken = (id) => {
        fetch(`https://med-check-backend.onrender.com/api/medications/mark/${id}`,
            {
                method: "PATCH"
            }
        )
        .then((res)=>{
            if(!res.ok){
                throw new Error("failed to mark medications")
            }
        })
        .then((updatedData)=>{
            fetchMed() //refresh
        })
        
        .catch((err)=>{
            console.log("failed to mark medications",err)
        })
    }

    const handleLogout = () => {
    localStorage.removeItem("email");
    window.location.reload();
  };

    useEffect(()=>{
        fetchMed()
    }, [])

    return(
        <div className="dashboard-container">
             <div className="top-bar">
            <h1>hi!! {userEmail}</h1>
             <button className="logout-btn" onClick={handleLogout}>Logout</button>
             </div>
            <form className="med-form" onSubmit={addMed}>
                <input
                type="text"
                placeholder="medication name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
                <input 
                type="text"
                placeholder="dosage"
                value={dosage}
                onChange={(e)=>setDosage(e.target.value)}
                />
                <button type="submit">Add  Medication</button>
            </form>

            <ul className="med-list">
                {meds.map((med)=>(
                    <li key={med._id} className="med-item">
                        <strong>{med.name}</strong> - {med.dosage} &nbsp;
                        {
                            med.takenToday ? (<span>✅ Taken</span>) 
                            :
                            (<button onClick={()=>{markAsTaken(med._id)}}>Mark as Taken</button>)
                        }
                    </li>
                ))}
            </ul>
        </div>
    )
   }
   
}

