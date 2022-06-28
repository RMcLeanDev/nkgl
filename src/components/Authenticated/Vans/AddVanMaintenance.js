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
    let sorted;

    console.log(title);

    if(props.vans){
        sorted = Object.entries(props.vans).sort((a,b) => {
            let id1 = a[1].dspVehicleId
            let id2 = b[1].dspVehicleId
            if(id1 && id2){
                return id1.localeCompare(id2, undefined, {numeric: true, sensitivity: 'base'})
            }
        })
    }

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
                    {props.vans ? 
                    <select onChange={e => setTitle(e.target.value)}>
                        {Object.keys(sorted).map(allVans => {
                            let van = sorted[allVans];
                            return <option key={van} value={van[1].dspVehicleId}>{van[1].dspVehicleId}</option>
                        })}
                    </select>
                        :"loading"}
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