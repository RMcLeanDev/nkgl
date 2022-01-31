import React, {useState} from 'react';
import * as firebase from 'firebase';

function Media(props){

    console.log(props)

    let media;

    let storage = firebase.storage();

    if(props.info.type.includes("video")){
        media = <video width="100%" height="500px" controls >
        <source src={props.info.media} type="video/mp4"/>
        </video>
    } else if(props.info.type.includes("pdf")){
        media = <div>
                <iframe src={props.info.media} width="100%" height="600px"></iframe>
                <a className="mobileDownload" href = {props.info.media} target = "_blank">View Pdf</a>
            </div>
    } else{
        media = <div>
        <img src={props.info.media}/>
        </div>
    }

    return(
        <div className="mediaContainer">
            <div className="mediaInnerContainer">
                <button onClick={() => props.closeMedia()}>Close</button>
                <br/>
                {media}
                <button style={{"marginTop": "20px"}}>Delete</button>
            </div>
        </div>
    )
}

export default Media;