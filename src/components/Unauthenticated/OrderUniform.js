import React, {useState} from 'react';
import '../../scss/OrderUniform.scss';

function OrderUniform(){

    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [vin, setVin] = useState("");
    const [status, setStatus] = useState("Active")
    const [rental, setRental] = useState("No")
    const [error, setError] = useState()
    
    function submitOrder(e){
        e.preventDefault();
        let lowerCaseEmail = email.toLowerCase();
        if(lowerCaseEmail.includes("nkg")){
            console.log("yes nkg");
        } else {
            console.log("no nkg");
        }
    }

    return(
        <div className="orderContainer">
            <div className="orderInsideContainer">
                <h1>Order Uniform Here</h1>
                <form onSubmit={submitOrder}>
                    <label>First Name</label>
                    <input 
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder = "First Name"
                        required
                    />
                    <label>Last Name</label>
                    <input 
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder = "Last Name"
                        required
                    />
                    <label>Work Email</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder = "Work Email"
                        required
                    />
                    <button type="submit" style={{"margin-top": "10px"}}>Confirm</button>
                    {error}
                </form>
            </div>
        </div>
    )
}

export default OrderUniform;