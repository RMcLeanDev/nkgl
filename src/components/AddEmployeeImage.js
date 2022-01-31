import React, {useState} from 'react';
import * as firebase from 'firebase';

function AddEmployeeImage(props){

    console.log(props)

    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)
    console.log(imageAsFile)
    console.log(imageAsUrl)

    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        setImageAsFile(imageFile => (image))
    }

    const handleFireBaseUpload = e => {
        e.preventDefault()
        let storage = firebase.storage().ref(`${props.employee.employeeId}/${imageAsFile.name}`)
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
                firebase.database().ref(`employees/${props.employee.employeeId}/profileImg`).set(fireBaseUrl)
                props.closeAddImage();
            })
        })
      }

    return(
        <div className="addEmployeeContainer">
            <div className="addEmployeeInsideContainer">
            <form onSubmit={handleFireBaseUpload}>
                <input 
                type="file"
                onChange={handleImageAsFile}
                />
                <button>Upload</button>
            </form>
            <button className="cancel" onClick={() => props.closeAddImage()}>Cancel</button>
            </div>
        </div>
    )
}

export default AddEmployeeImage;