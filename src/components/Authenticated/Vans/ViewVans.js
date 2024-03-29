import React, {useState} from 'react';
import {FiArrowDown, FiArrowUp} from 'react-icons/fi';
import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import moment from 'moment'
import XcelerateAPI from './XcelerateAPI';

function ViewVans(props){

    const [sortOption, setSort] = useState({tab: "dspVehicleId", sort: "ascending"})
    const [lastPMForm, setlastPMForm] = useState({state: false, van: null});
    const [updatePm, setUpdatePm] = useState("");
    const [updateAllMiles, setUpdateAllMiles] = useState(false);

    let sorted;
    if(props.vans){
        if(sortOption.tab === "currentOdometer"){
            if(sortOption.sort === "ascending"){
                sorted = Object.entries(props.vans).sort((a,b) => {
                    let id1 = a[1][sortOption.tab]
                    let id2 = b[1][sortOption.tab]
                    if(id1<id2){
                        return -1
                    } else if (id1>id2){
                        return 1
                    } else {
                        return 0
                    }
                })
            } else {
                sorted = Object.entries(props.vans).sort((a,b) => {
                    let id1 = a[1][sortOption.tab]
                    let id2 = b[1][sortOption.tab]
                    if(id1<id2){
                        return 1
                    } else if (id1>id2){
                        return -1
                    } else {
                        return 0
                    }
                })
            }
        } else if(sortOption.tab==="lastPM"){
            if(sortOption.sort === "ascending"){
                sorted = Object.entries(props.vans).sort((a, b) => {
                    let id1 = a[1].lastPM + 5000 - a[1].currentOdometer
                    let id2 = b[1].lastPM + 5000 - b[1].currentOdometer
                    if(id1<id2){
                        return -1
                    } else if (id1>id2){
                        return 1
                    } else {
                        return 0
                    }
                    })    
            } else {
                sorted = Object.entries(props.vans).sort((a, b) => {
                    let id1 = a[1].lastPM + 5000 - a[1].currentOdometer
                    let id2 = b[1].lastPM + 5000 - b[1].currentOdometer
                    if(id1<id2){
                        return 1
                    } else if (id1>id2){
                        return -1
                    } else {
                        return 0
                    }
                })        
            }
        } else {
            if (sortOption.sort === "ascending"){
                sorted = Object.entries(props.vans).sort((a,b) => {
                    let id1 = a[1][sortOption.tab]
                    let id2 = b[1][sortOption.tab]
                    if(id1 && id2){
                        return id1.localeCompare(id2, undefined, {numeric: true, sensitivity: 'base'})
                    }
                })
            } else {
                sorted = Object.entries(props.vans).sort((a,b) => {
                    let id1 = a[1][sortOption.tab]
                    let id2 = b[1][sortOption.tab]
                    if(id1 && id2){
                        return id2.localeCompare(id1, undefined, {numeric: true, sensitivity: 'base'})
                    }
                })
            }
        }
    }

    function updateVanPm(e){
        e.preventDefault()
        firebase.database().ref(`vans/allVans/${lastPMForm.van.assetId}`).update({"lastPM": parseInt(updatePm)});
        setUpdatePm({state: false, van: null});
        setlastPMForm(false)
    }

    return(
        <div>
            {lastPMForm.state ? <div className="updateLastPM">
                <div className="container">
                    <h1>Update Van: {lastPMForm.van.dspVehicleId}</h1>
                    <form onSubmit={updateVanPm}>
                        <input placeholder='Mileage' value={updatePm} onChange={e => setUpdatePm(e.target.value)}/>
                        <hr/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>:null}
            <p className="lastUpdated" onClick={() => setUpdateAllMiles(!updateAllMiles)}>Last Updated: {props.vans ? moment(props.vans.lastUpdated).format('MMMM Do, h:mm:ss a'):"loading"}</p>
            {updateAllMiles ? <XcelerateAPI vans={props.vans}/> : null}
            <div className="vanSortOptions">
                <button className={`${sortOption.tab==="dspVehicleId" ? "active" : ""}`} onClick={() => setSort({sort: sortOption.tab==="dspVehicleId" ? sortOption.sort === "ascending" ? "descending":"ascending":"ascending", tab: "dspVehicleId"})}>Name {sortOption.tab==="dspVehicleId" ? sortOption.sort === "ascending" ?<FiArrowDown className="arrow"/> : <FiArrowUp className="arrow"/> : null}</button>
                
                <button className={`${sortOption.tab==="currentOdometer" ? "active" : ""}`} onClick={() => setSort({sort: sortOption.tab==="currentOdometer" ?sortOption.sort === "ascending" ? "descending":"ascending":"ascending", tab: "currentOdometer"})}>Odometer {sortOption.tab==="currentOdometer" ? sortOption.sort === "ascending" ?<FiArrowDown className="arrow"/> : <FiArrowUp className="arrow"/> : null}</button>
                
                <button className={`${sortOption.tab==="lastPM" ? "active" : ""}`} onClick={() => setSort({sort: sortOption.tab==="lastPM" ? sortOption.sort === "ascending" ? "descending":"ascending":"ascending", tab: "lastPM"})}>PM {sortOption.tab==="lastPM" ? sortOption.sort === "ascending" ?<FiArrowDown className="arrow"/> : <FiArrowUp className="arrow"/> : null}</button>
            </div>
            {Object.keys(sorted).map(allVans=> {
                let van = sorted[allVans]
                let pmDue = van[1].lastPM + 5000 - van[1].currentOdometer;
                if(van[1].dspVehicleId !== "Maintenance" && van[0] !== "lastUpdated"){
                    
                    return <div className="displayVans">
                        <p onClick={() => setlastPMForm({state: true, van:van[1]})}>{van[1].dspVehicleId}</p>
                        <p>{parseInt(van[1].currentOdometer)}</p>
                        <p>{pmDue ? pmDue.toFixed(0):<button onClick={() => setlastPMForm({state: true, van:van[1]})}>Update Now!</button>}</p>
                        </div>
                }
            })}
        </div>
    )
}

export default ViewVans;