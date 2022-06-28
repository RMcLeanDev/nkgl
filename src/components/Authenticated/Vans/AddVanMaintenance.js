import React, { useState } from "react";
import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import moment from 'moment';
import v4 from 'uuid';
import {AiFillCheckCircle} from 'react-icons/ai'

function AddVanMaintenance(props){

    const [title, setTitle] = useState("");
    const [start, setStart] = useState(undefined);
    const [end, setEnd] = useState(undefined);
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const [longTerm, setLongTerm] = useState(false);

    console.log(longTerm)

    function submitChanges(e){
        e.preventDefault();
        if(start && end){
            if(start > end){
                setError("Make sure start date is less than end date!")
            } else {
                let id = v4();
                let info = {"uniqueID": id, "title": title, "start": moment(start).format("L"), "end": moment(end).format("L"), "description": description, "longterm": longTerm}
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
                    <h1>Van:</h1>
                    <select>
                        {props.vans ? "working on it":"loading"}
                    </select>
                    <h1>Start Date:</h1>
                    <input type="date" value={start} onChange={e => setStart(e.target.value)}/>
                    <h1>End Date:</h1>
                    <input type="date" value={end} onChange={e => setEnd(e.target.value)}/>
                    <h1>Description:</h1>
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)}></input>
                    <h1>Long Term:</h1>
                    <AiFillCheckCircle className={longTerm ? "clicked" : "notClicked"} onClick={() => longTerm ? setLongTerm(false) : setLongTerm(true)}/>
                    <hr />
                    <button type="submit" className="submit">Save</button>
                </form>
            </div>
        </div>
    )
}

export default AddVanMaintenance;