import React, {useState} from 'react';
import {FiArrowDown, FiArrowUp} from 'react-icons/fi';

function ViewVans(props){

    const [sortOption, setSort] = useState({tab: "dspVehicleId", sort: "ascending"})

    let sorted;
    if(props.vans){
        if(sortOption.tab === "currentOdometer" || sortOption.tab==="pmDue"){
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

    return(
        <div>
            <div className="vanSortOptions">
                <button className={`${sortOption.tab==="dspVehicleId" ? "active" : ""}`} onClick={() => setSort({sort: sortOption.tab==="dspVehicleId" ? sortOption.sort === "ascending" ? "descending":"ascending":"ascending", tab: "dspVehicleId"})}>Name {sortOption.tab==="dspVehicleId" ? sortOption.sort === "ascending" ?<FiArrowDown className="arrow"/> : <FiArrowUp className="arrow"/> : null}</button>
                <button className={`${sortOption.tab==="currentOdometer" ? "active" : ""}`} onClick={() => setSort({sort: sortOption.tab==="currentOdometer" ?sortOption.sort === "ascending" ? "descending":"ascending":"ascending", tab: "currentOdometer"})}>Odometer {sortOption.tab==="currentOdometer" ? sortOption.sort === "ascending" ?<FiArrowDown className="arrow"/> : <FiArrowUp className="arrow"/> : null}</button>
                <button className={`${sortOption.tab==="pmDue" ? "active" : ""}`} onClick={() => setSort({sort: sortOption.tab==="pmDue" ? sortOption.sort === "ascending" ? "descending":"ascending":"ascending", tab: "pmDue"})}>PM {sortOption.tab==="pmDue" ? sortOption.sort === "ascending" ?<FiArrowDown className="arrow"/> : <FiArrowUp className="arrow"/> : null}</button>
            </div>
            {Object.keys(sorted).map(allVans=> {
                let van = sorted[allVans]
                if(van[1].dspVehicleId !== "Maintenance" && van[0] !== "lastUpdated"){
                    
                    return <div className="displayVans">
                        <p>{van[1].dspVehicleId}</p>
                        <p>{parseInt(van[1].currentOdometer)}</p>
                        <p>mile to pm</p>
                        </div>
                }
            })}
        </div>
    )
}

export default ViewVans;