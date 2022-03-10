import React, { useState } from "react";
import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import moment from 'moment';
import v4 from 'uuid';

function AddVanMaintenance(props){

    const [title, setTitle] = useState("");
    const [start, setStart] = useState(undefined);
    const [end, setEnd] = useState(undefined);
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);

    function submitChanges(e){
        e.preventDefault();
        if(start && end){
            if(start > end){
                setError("Make sure start date is less than end date!")
            } else {
                let id = v4();
                let info = {"uniqueID": id, "title": title, "start": moment(start).format("L"), "end": moment(end).format("L"), "description": description}
                firebase.database().ref(`vans/maintenance/${id}`).set(info).then(res => {
                    props.close();
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
    return(
        <div className="viewDatesContainer">
            <div className="viewDates">
                <h1 onClick={() => props.close()} className="close">X</h1>
                <h1>Add New Van Maintenance</h1>
                {error}
                <form onSubmit={submitChanges}>
                    <h1>Title:</h1>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
                    <h1>Start Date:</h1>
                    <input type="date" value={start} onChange={e => setStart(e.target.value)}/>
                    <h1>End Date:</h1>
                    <input type="date" value={end} onChange={e => setEnd(e.target.value)}/>
                    <h1>Description:</h1>
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)}></input>
                    <hr />
                    <button type="submit" className="submit">Save</button>
                </form>
            </div>
        </div>
    )
}

export default AddVanMaintenance;