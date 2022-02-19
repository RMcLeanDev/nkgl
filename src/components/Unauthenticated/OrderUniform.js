import React, {useState} from 'react';
import '../../scss/OrderUniform.scss';
import ViewUniformItems from './ViewUniformItems';
import {connect} from 'react-redux';

function OrderUniform(props){

    let order = {'total': 0, 'items': {}};
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [options, setOptions] = useState("extras");
    const [error, setError] = useState()

    console.log(order)

    function pushToOrder(e){
        order.total += 1;
        if(order.items[e.uniqueID]){
            order.items[e.uniqueID].quantity += 1;
        } else {
            order.items[e.uniqueID] = e;
            order.items[e.uniqueID].quantity = 1;
        }
        console.log(order);
    }
    
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
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        placeholder = "First Name"
                        required
                    />
                    <br/>
                    <label>Last Name</label>
                    <br/>
                    <input 
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
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
                    <hr/>
                    <div>
                        <select value={options} onChange={e => setOptions(e.target.value)}>
                            <option value="male">Male Sizes</option>
                            <option value="female">Female Sizes</option>
                            <option value="extra">Extra</option>
                        </select>
                    </div>
                    <div>
                        <ViewUniformItems addToOrder={pushToOrder} inventory={props.invent.inventory[options]}/>
                    </div>
                    <button type="submit" style={{"margin-top": "10px"}}>Confirm</button>
                    {error}
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    invent: state.inventoryState
  })

export default connect(mapStateToProps)(OrderUniform);