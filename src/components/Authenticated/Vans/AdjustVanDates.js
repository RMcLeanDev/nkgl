import React, {useState, useEffect} from 'react';
import moment from 'moment';
import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import {FaTrashAlt} from 'react-icons/fa';

function AdjustVanDates(props){

    useEffect(() => {
        if(props.information.description){
            setDescription(props.information.description)
        } else {
            setDescription("None Yet!")
        }
    }, [])

    const [title, setTitle] = useState(props.information.title);
    const [start, setStart] = useState(moment(props.information.start).format("YYYY-MM-DD"));
    const [end, setEnd] = useState(moment(props.information.end).format("YYYY-MM-DD"));
    const [error, setError] = useState(null);
    const [description, setDescription] = useState(props.information.description)

    function submitChanges(e){
        e.preventDefault();
        let info = {"uniqueID": props.information.uniqueID, "title": title, "start": moment(start).format("L"), "end": moment(end).format("L"), "description": description}
        if(start > end){
            setError("Make sure start date is less than end date!")
        } else {
            firebase.database().ref(`vans/maintenance/${props.information.uniqueID}`).set(info).then(res => {
                props.close();
            }).catch(error => {
                console.log(error)
            })
        }
    }

    function deleteItem(){
        firebase.database().ref(`vans/maintenance/${props.information.uniqueID}`).remove().then(res => {
            props.close();
        }).catch(error => {
            console.log(error)
        })
    }

    return(
        <div className="viewDatesContainer">
            <div className="viewDates">
                <h1 className="title">Adjust Dates</h1>
                {error}
                <form onSubmit={submitChanges}>
                    <h1 onClick={() => props.close()} className="close">X</h1>
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
                <FaTrashAlt className="delete" onClick={deleteItem}/>
            </div>
        </div>
    )
}

export default AdjustVanDates;