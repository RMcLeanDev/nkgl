import React, {useState} from 'react';
import '../../scss/OrderUniform.scss';
import ExtraUniformItems from './ExtraUniformItems';
import FemaleSizes from './FemaleSizes';
import MaleSizes from './MaleSizes';

function OrderUniform(){

    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [diffOptions, setOptions] = useState("male");
    const [error, setError] = useState()

    let displayOptions;
    
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
                    <br/>
                    <input 
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder = "First Name"
                        required
                    />
                    <br/>
                    <label>Last Name</label>
                    <br/>
                    <input 
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder = "Last Name"
                        required
                    />
                    <br/>
                    <label>Work Email</label>
                    <br/>
                    <input 
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder = "Work Email"
                        required
                    />
                    <div>
                        <select value={diffOptions} onChange={e => setOptions(e.target.value)}>
                            <option value="male">Male Sizes</option>
                            <option value="female">Female Sizes</option>
                            <option value="extras">Extras</option>
                        </select>
                    </div>
                    <div>
                        {displayOptions}
                    </div>
                    <button type="submit" style={{"margin-top": "10px"}}>Confirm</button>
                    {error}
                </form>
            </div>
        </div>
    )
}

export default OrderUniform;