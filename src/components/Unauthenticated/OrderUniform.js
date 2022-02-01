import React, {useState} from 'react';
import '../../scss/OrderUniform.scss';

function OrderUniform(){

    function submitOrder(e){
        e.preventDefault();
    }

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [vin, setVin] = useState("");
    const [status, setStatus] = useState("Active")
    const [rental, setRental] = useState("No")
    const [error, setError] = useState()

    return(
        <div className="orderContainer">
            <div className="orderInsideContainer">
                <h1>Order Uniform Here</h1>
                <form onSubmit={submitOrder}>
                    <input 
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder = "Name"
                    />
                    <input 
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder = "Email"
                    />
                    <button type="submit" style={{"margin-top": "10px"}}>Confirm</button>
                    {error}
                </form>
            </div>
        </div>
    )
}

export default OrderUniform;