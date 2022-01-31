import React, {useState, useEffect} from 'react';
import * as firebase from 'firebase';
import {v4} from 'uuid';

function AddVanMedia(props){

    console.log(props)
    
    const [description, setDescription] = useState('');
    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)
    const [disableThis, setDisableThis] = useState(false)

    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        setImageAsFile(imageFile => (image))
    }

    useEffect(() => {
        if(props.description.description === "Daily Video"){
            setDescription("Daily Video")
            setDisableThis("disabled")
        }
    },[])

    const handleFireBaseUpload = e => {
        e.preventDefault()
        let mediaId = v4();
        let storage = firebase.storage().ref(`${props.van.vanId}/${v4()}`)
        console.log('start of upload')
        if(imageAsFile === '') {
            console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
        }
        const uploadTask = storage.put(imageAsFile)
        uploadTask.on('state_changed', 
        (snapShot) => {
            console.log(snapShot)
        }, (err) => {
            console.log(err)
        }, () => {
            storage.getDownloadURL()
            .then(fireBaseUrl => {
                setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
                firebase.database().ref(`vanList/${props.van.vanId}/damages/${mediaId}`).set({media: fireBaseUrl, type: imageAsFile.type, date: Date.now(), description: description});
                if(props.van.damages.damagesStatus === false){
                    firebase.database().ref(`vanList/${props.van.vanId}/damages`).update({damagesStatus: true})
                } 
                props.closeAddDamage();
            })
        })
      }

    return(
        <div className="addDamageContainer">
            <div className="addDamageInsideContainer">
                <button className="cancel" onClick={() => props.closeAddDamage()}>Cancel</button>
                <h1>Add Media for <span style={{"textDecoration": "underline"}}>{props.van.name}</span></h1>
                <br />
                <label>Description: </label>
                <br/>
                <textarea 
                    rows="5"
                    cols="50"
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder = "Description"
                    disabled = {disableThis}
                />
                <form onSubmit={handleFireBaseUpload}>
                    <input 
                    type="file"
                    onChange={handleImageAsFile}
                    />
                    <button>Upload</button>
                </form>
            </div>
        </div>
    )
}

export default AddVanMedia;