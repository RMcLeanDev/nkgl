import React, {useState} from 'react';
import moment from 'moment';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database";


function AdjustVanDates(props){

    console.log(props)

    const [title, setTitle] = useState(props.information.title);
    const [start, setStart] = useState(moment(props.information.start).format("YYYY-MM-DD"));
    const [end, setEnd] = useState(moment(props.information.end).format("YYYY-MM-DD"));

    function submitChanges(e){
        e.preventDefault();
        let info = {"uniqueID": props.information.uniqueID, "title": title, "start": moment(start).format("L"), "end": moment(end).format("L")}
        firebase.database().ref(`vans/maintenance/${props.information.uniqueID}`).set(info).then(res => {
            props.close();
        }).catch(error => {
            console.log(error)
        })
    }

    return(
        <div className="viewSizesContainer">
            <div className="viewSizes">
                <form onSubmit={submitChanges}>
                    <h1 onClick={() => props.close(null)} className="close">X</h1>
                    <h1>Title</h1>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
                    <h1>Adjust Dates</h1>
                    <h1>Start Date:</h1>
                    <input type="date" value={start} onChange={e => setStart(e.target.value)}/>
                    <h1>End Date:</h1>
                    <input type="date" value={end} onChange={e => setEnd(e.target.value)}/>
                    <hr />
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    )
}

export default AdjustVanDates;