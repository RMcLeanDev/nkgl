import React, {useState} from 'react';
import moment from 'moment';
import AddVanMedia from './AddVanMedia';
import Media from './Media';

function VanDamages(props){

    let damages;
    let damageForm;
    let media;

    let arry = []
    let btn;

    console.log(arry.sort((a, b) => a.date - b.date))

    const [information, setInformation] = useState("Daily Video");
    const [addDamageForm, setAddDamageForm] = useState(true);
    const [mediaState, setMediaState] = useState(false)

    if(mediaState.state){
        media = <Media closeMedia={() => setMediaState({state: false, info: null})} info={mediaState.info}/>
    } else {
        media = null;
    }

    if(props.van.damages){
        if(props.van.damages.damagesStatus){
            Object.keys(props.van.damages).map((damages) => {
                let damage = props.van.damages[damages]
                arry.push(damage)
            })
            arry.sort((a, b) => b.date - a.date)
            damages = Object.keys(arry).map((damages) => {
                let damage = arry[damages];
                if(damage !== true){
                    if(information === "Daily Video"){
                        if(damage.description === "Daily Video"){
                            btn = <button className="addBtn" onClick={() => setAddDamageForm({state: true, info: damage})}>Add New Video</button>
                            return <div key={damages}>
                                <div>
                                    <h1 style={{"textDecoration": "underline"}}>Date:</h1>
                                    <h1>{moment(damage.date).format("MMM Do YYYY")}</h1>
                                </div>
                                <video width="100%" height="500px" controls >
                                <source src={damage.media} type="video/mp4"/>
                                </video>
                        </div>
                        }
                    } else {
                        if(damage.description != "Daily Video"){
                            btn = <button className="addBtn" onClick={() => setAddDamageForm({state: true, info: damage})}>Add New Damage</button>
                            return <div className="descriptionsContainer" key={damages}>   
                            <div className="descriptions">
                                <div>
                                    <h1 style={{"textDecoration": "underline"}}>Date:</h1>
                                    <h1>{moment(damage.date).format("MMM Do YYYY")}</h1>
                                </div>
                                <div>
                                    <h1 style={{"textDecoration": "underline"}}>Description:</h1>
                                    <h3>{damage.description}</h3>
                                </div>
                                <div>
                                    <h1 style={{"textDecoration": "underline"}}>File Format:</h1>
                                    <p>{damage.type}</p>
                                </div>
                            </div>
                            <h3 className="showMedia" onClick={() => setMediaState({state: true, info: damage})}>Show Media</h3>
                        </div>
                        }
                    }
                }
            })
        } else {
            damages = <h1>No Damage have been reported yet.</h1>
        }
    } else {
        damages = <h1>Loading . . .</h1>
    }

    if(addDamageForm.state){
        damageForm = <AddVanMedia closeAddDamage={() => setAddDamageForm(false)} van={props.van} description={addDamageForm.info}/>
    } else {
        damageForm = null;
    }
    return(
        <div className="damageForm">
            {damageForm}
            {media}
            <div className="damageNav">
                <button className={`${information==="Daily Video" ? "teal" : ""}`} onClick={() => setInformation("Daily Video")}>Daily Video</button>
                <button className={`${information==="All Damages" ? "teal" : ""}`} onClick={() => setInformation("All Damages")}>All Damages</button>
            </div>
            {btn}
            {damages}
        </div>
    )
}

export default VanDamages;