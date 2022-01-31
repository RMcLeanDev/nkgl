import React, {useState} from 'react';
import moment from 'moment';
import Media from './Media';
import AddDocument from './AddDocument';

function Documents(props){

    const [addDocForm, setAddDocForm] = useState(false);
    const [mediaState, setMediaState] = useState(false)

    console.log(props)

    let documents;
    let displayForm;
    let media;

    if(addDocForm){
        displayForm = <AddDocument closeForm={() => setAddDocForm(false)} info={props.info}/>
    } else {
        displayForm = null;
    }

    if(mediaState.state){
        media = <Media closeMedia={() => setMediaState({state: false, info: null})} info={mediaState.info}/>
    } else {
        media = null;
    }

    if(props.info.docs){
        if(props.info.docs.docStatus){
            documents = Object.keys(props.info.docs).map((documents) => {
                let document = props.info.docs[documents];
                if(document !== true){
                    return <div className="descriptionsContainer" key={documents}>   
                    <div className="descriptions">
                        <div>
                            <h1 style={{"textDecoration": "underline"}}>Date:</h1>
                            <h1>{moment(document.date).format("MMM Do YYYY")}</h1>
                        </div>
                        <div>
                            <h1 style={{"textDecoration": "underline"}}>Description:</h1>
                            <h3>{document.description}</h3>
                        </div>
                        <div>
                            <h1 style={{"textDecoration": "underline"}}>File Format:</h1>
                            <p>{document.type}</p>
                        </div>
                    </div>
                    <h3 className="showMedia" onClick={() => setMediaState({state: true, info: document})}>Show Media</h3>
                </div>
                }
            })
        } else {
            documents = <h1>No Documents have been uploaded yet.</h1>
        }
    } else {
        documents = <h1>Loading . . .</h1>
    }

    return(
        <div>
            {media}
            {displayForm}
            <button className="addBtn" onClick={() => setAddDocForm(true)}>Add New Document</button>
            {documents}
        </div>
    )
}

export default Documents;