import React, {useState} from 'react';
import AddEmployeeImage from './AddEmployeeImage';
import {connect} from 'react-redux';
import Documents from './Documents';
import EditEmployee from './EditEmployee';

function EmployeeInfo(props){

    console.log(props)

    let employee;
    let display;
    let employeeImageUpload;
    let docView;
    let editEmployeeForm;
    
    
    const [seeSocial, setSeeSocial] = useState(false);
    const [uploadEmployeeImage, setUploadEmployeeImage] = useState(false);
    const [documents, setDocuments] = useState("info");
    const [information, setInformationState ] = useState("information");
    const [editForm, setEditForm] = useState({state: false, info: null});

    for(let i=0; i < props.allEmployees.length; i++){
        if(props.allEmployees[i].employeeId === props.match.params.id){
            employee = props.allEmployees[i]
        }
    }

    function goBack(){
        props.history.push(`/employees`);
    }

    function nextEmployee(){
        for(let i=0; i < props.allEmployees.length; i++){
            if(props.allEmployees[i].employeeId === props.match.params.id){
                if(props.allEmployees[i + 1] === undefined || props.allEmployees[i + 1] === null){
                    props.history.push(`/employee/${props.allEmployees[0].employeeId}`)
                } else {
                    props.history.push(`/employee/${props.allEmployees[i + 1].employeeId}`)
                }
            }
        }
    }

    function prevEmployee(){
        for(let i=0; i < props.allEmployees.length; i++){
            if(props.allEmployees[i].employeeId === props.match.params.id){
                if(props.allEmployees[i - 1] === undefined || props.allEmployees[i - 1] === null){
                    let num = props.allEmployees.length -1;
                    props.history.push(`/employee/${props.allEmployees[num].employeeId}`)
                } else {
                    props.history.push(`/employee/${props.allEmployees[i - 1].employeeId}`)
                }
            }
        }
    }

    if(employee){
        display = <div className="nextBackContainer">
            <div className="nextBack">
                <button onClick={prevEmployee}> Previous </button>
                <h1>{employee.name}</h1>
                <button onClick={nextEmployee}> Next </button>
            </div>
        </div>
        if(documents === "info"){
            docView = <div className="docContainer">
            <div className="employeeInfoTop">
                <button className="addBtn" onClick={() => setEditForm({state: true, info: employee})}>Edit</button>
                <h3 className={employee.status}>{employee.status}</h3>
            </div>
            <div className="nameAndImg">
                <div className="profileImg">
                    <img src={employee.profileImg} alt=""/>
                    <div className="update">
                        <p onClick={() => setUploadEmployeeImage(true)}>Update</p>
                    </div>
                </div>
                <h1>{employee.name}</h1>
            </div>
            <hr />
            <div>
                <div>
                    <h3 className="title">Phone Number</h3>
                    <a href={"tel: " + employee.phoneNumber}>{employee.phoneNumber}</a>
                </div>
                <div>
                    <h3 className="title">Personal Email</h3>
                    <a href={"mailto: " + employee.personalEmail}>{employee.personalEmail}</a>
                </div>
                <div>
                    <h3 className="title">Work Email</h3>
                    <a href={"mailto: " + employee.workEmail}>{employee.workEmail}</a>
                </div>
                <div>
                    <h3 className="title">Address</h3>
                    <p>{employee.address}, {employee.state} {employee.zipCode}</p>
                </div>
                <div>
                    <h3 className="title">Birthday</h3>
                    <p>{employee.dob}</p>
                </div>
                <div>
                    <h3 className="title">Social Security</h3>
                    <p>Not Displaying At this time</p>
                </div>
            </div>
        </div>
        } else if(documents === "documents"){
            docView = <div className="docContainer">
                <Documents info={employee}/>
            </div>
        }
    } else {
        display = <h1>Loading . . .</h1>
    }

    if(uploadEmployeeImage){
        employeeImageUpload = <AddEmployeeImage employee={employee} closeAddImage={() => setUploadEmployeeImage(false)}/>
    } else {
        employeeImageUpload = null;
    }

    if(editForm.state){
        editEmployeeForm = <EditEmployee closeEditForm={() => setEditForm({state: false, info: null})} info={editForm.info}/>
    } else {
        editEmployeeForm = null;
    }

    return (
        <div>
            {editEmployeeForm}
            {employeeImageUpload}
            <button className="goBack" onClick={goBack}>Go Back</button>
            {display}
            <div className={`docHeader`}>
                <button className={`${information==="information" ? "teal" : ""}`} onClick={() => {setDocuments("info"); setInformationState("information");}}>Information</button>
                <button className={`${information==="documents" ? "teal" : ""}`} onClick={() => {setDocuments("documents"); setInformationState("documents");}}>Documents</button>
            </div>
            {docView}
        </div>
    )
}

const mapStateToProps = state => ({
    allEmployees: state.employeesState
  })

export default connect(mapStateToProps)(EmployeeInfo);