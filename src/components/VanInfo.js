import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import VanDamages from './VanDamages';
import Documents from './Documents';

function VanInfo(props){

    let display;
    let van;
    let docView;

    const [documents, setDocuments] = useState("info");
    const [information, setInformationState ] = useState("information");

    for(let i=0; i < props.allVans.length; i++){
        if(props.allVans[i].vanId === props.match.params.id){
            van = props.allVans[i]
        }
    }
    
    function goBack(){
        props.history.push(`/vanlist`);
    }

    function nextVan(){
        for(let i=0; i < props.allVans.length; i++){
            if(props.allVans[i].vanId === props.match.params.id){
                if(props.allVans[i + 1] === undefined || props.allVans[i + 1] === null){
                    props.history.push(`/van/${props.allVans[0].vanId}`)
                } else {
                    props.history.push(`/van/${props.allVans[i + 1].vanId}`)
                }
            }
        }
    }

    function prevVan(){
        for(let i=0; i < props.allVans.length; i++){
            if(props.allVans[i].vanId === props.match.params.id){
                if(props.allVans[i - 1] === undefined || props.allVans[i - 1] === null){
                    let num = props.allVans.length -1;
                    props.history.push(`/van/${props.allVans[num].vanId}`)
                } else {
                    props.history.push(`/van/${props.allVans[i - 1].vanId}`)
                }
            }
        }
    }

    if(van){
        display = <div className="nextBackContainer">
        <div className="nextBack">
            <button onClick={prevVan}> Previous </button>
            <h1>{van.name}</h1>
            <button onClick={nextVan}> Next </button>
        </div>
    </div>
        if(documents === "info"){
            docView = <div className="docContainer">
                <button className="addBtn">Edit</button>
                <h1>Van Name: {van.name}</h1>
                <h2>Vin: {van.vin}</h2>
                <h3>Status: <span className={van.status}>{van.status}</span></h3>
                <h3>Retrieved Van On: {van.retrieveDate}</h3>
            </div>
        } else if(documents === "documents"){
            docView = <div className="docContainer">
                <Documents info={van}/>
            </div>
        } else if(documents === "damages"){
            docView = <div className="docContainer">
                <VanDamages van={van}/>
            </div>
        }
    } else {
        display = <h1>Loading . . .</h1>
    }

    return(
        <div>
            <button className="goBack" onClick={goBack}>Go Back</button>
            {display}
            <div className={`docHeader`}>
                <button className={`${information==="information" ? "teal" : ""}`} onClick={() => {setDocuments("info"); setInformationState("information");}}>Information</button>
                <button className={`${information==="documents" ? "teal" : ""}`} onClick={() => {setDocuments("documents"); setInformationState("documents");}}>Documents</button>
                <button className={`${information==="damages" ? "teal" : ""}`} onClick={() => {setDocuments("damages"); setInformationState("damages");}}>Damages</button>
            </div>
            {docView}
        </div>
    )
}

const mapStateToProps = state => ({
    allVans: state.vanState
  })

export default connect(mapStateToProps)(VanInfo);