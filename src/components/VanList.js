import React, {useState} from 'react';
import AddVan from './AddVan';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import '../scss/Vans.scss';

function VanList(props){

    let display;
    let displayVans;
    let searchInput;

    const[addVanForm, setAddVanForm] = useState(false);
    const [name, setName] = useState("");
    const [status, setStatus] = useState("all");
    const [search, setSearch] = useState("name")
    const [vin, setVin] = useState("");

    if(addVanForm){
        display = <AddVan closeVanFormComponent={() => setAddVanForm(false)}/>
    } else {
        display = null;
    }

    if(props.allVans){
        displayVans = Object.keys(props.allVans).map((van) => {
            let individual = props.allVans[van];
            let lowercaseName = individual.name.toLowerCase();
            let lowercaseVin = individual.vin.toLowerCase();
            let normalReturn = <div key={van} className="employeeList">
                <Link to={`/van/${individual.vanId}`}><h1>{individual.name}</h1></Link>
                <p>{individual.vin}</p>
                <p className={individual.status}>{individual.status}</p></div>;
            if(search === "name"){
                if(lowercaseName.includes(name.toLowerCase())){
                    if(status === "all"){
                        return normalReturn
                    } else if(lowercaseName.includes(name.toLowerCase()) && individual.status === status){
                        return normalReturn
                    } else if(individual.rental === "Yes" && status === "Rental"){
                        return normalReturn
                    }
                }
            } else if(search === "vin"){
                if(lowercaseVin.includes(vin.toLowerCase())){
                    if(status === "all"){
                        return normalReturn
                    } else if(lowercaseName.includes(name.toLowerCase()) && individual.status === status){
                        return normalReturn
                    } else if(individual.rental === "Yes" && status === "Rental"){
                        return normalReturn
                    }
                }
            }
        })
    } else {
        displayVans = <h1>Loading...</h1>
    }

    if(search === "name"){
        searchInput = <input
        className="findEmployee"
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder = "Van"
    />
    } else {
        searchInput = <input
        className="findEmployee"
        type="text"
        value={vin}
        onChange={e => setVin(e.target.value)}
        placeholder = "Vin"
    />
    }

    return(
        <div>
            {display}
            <button onClick={() => setAddVanForm(true)} className="goBack">Add New Van</button>
            <div className="search">
                <div className="item">
                    <label>Search By: </label>
                    <select id="status" value={search} onChange={e => setSearch(e.target.value)}>
                        <option value="name">Name</option>
                        <option value="vin">Vin</option>
                    </select>
                </div>
                <div className="item">
                    <label>Status: </label>
                    <select id="status" value={status} onChange={e => setStatus(e.target.value)}>
                        <option value="all">All</option>
                        <option value="Active">Active</option>
                        <option value="Rental">Rental</option>
                        <option value="Body Shop">Body Shop</option>
                        <option value="Oil Change">Oil Change</option>
                        <option value="Offboarded">Offboarded</option>
                    </select>
                </div>
                <div className="item">
                    <label>Find: </label>
                    {searchInput}
                </div>
            </div>
            {displayVans}
        </div>
    )
}

const mapStateToProps = state => ({
    allVans: state.vanState
  })

export default connect(mapStateToProps)(VanList);