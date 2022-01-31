import React, {useState} from 'react';
import AddEmployee from './AddEmployee';
import EmployeeInfo from './EmployeeInfo';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

function Employees(props){

    let newEmployeeForm;

    const [status, setStatus] = useState("all");
    const [name, setName] = useState("");
    const [addNewEmployee, setNewEmployee] = useState(false)

    if(addNewEmployee === false){
        newEmployeeForm = null;
    } else if(addNewEmployee === true){
        newEmployeeForm = <AddEmployee closeEmployeeFormComponent={() => setNewEmployee(false)}/>
    }

    let displayEmployees;

    if(props.allEmployees){
        displayEmployees = Object.keys(props.allEmployees).map((employee) => {
            let individual = props.allEmployees[employee];
            let lowercaseName = individual.name.toLowerCase();
            let normalReturn = <div key={employee} className="employeeList">
                <Link to={`/employee/${individual.employeeId}`}><h1>{individual.name}</h1></Link>
                <p className={individual.status}>{individual.status}</p></div>;
            if(lowercaseName.includes(name.toLowerCase())){
                if(status === "all"){
                    return normalReturn
                } else if(lowercaseName.includes(name.toLowerCase()) && individual.status === status){
                    return normalReturn
                }
            }
        })
    } else {
        displayEmployees = <h1>Loading...</h1>
    }

    return(
        <div>
            {newEmployeeForm}
            <button onClick={() => setNewEmployee(true)} className="goBack">Add New Employee</button>
            <div className="search">
                <div className="item">
                    <label>Find: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder = "Find Employee"
                    />
                    <select id="status" value={status} onChange={e => setStatus(e.target.value)}>
                        <option value="all">All</option>
                        <option value="Active">Active</option>
                        <option value="In Progress">In Progress</option>
                        <option value="In Training">In Training</option>
                        <option value="Offboarded">Offboarded</option>
                    </select>
                </div>
            </div>
            {displayEmployees}
        </div>
    )
}

const mapStateToProps = state => ({
    allEmployees: state.employeesState
  })

export default connect(mapStateToProps)(Employees);