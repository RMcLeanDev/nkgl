import React, {useState} from 'react';
import * as XLSX from 'xlsx/xlsx.mjs';
import moment from 'moment';
import firebase from 'firebase/compat/app';
import "firebase/compat/database";

function XcelerateAPI(props){
    const [file,setFile] = useState(null)

    function excelToJSON(file){
        const [files] = file;
        const reader = new FileReader();

        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_row_object_array(ws, { header: 1 });
            setFile(data);
        };

        reader.readAsBinaryString(files)
    }

    function pushToDataBase(e){
        e.preventDefault()
        let timeStamp = moment.now()
        let newObj = props.vans;
        newObj["lastUpdated"] = timeStamp;
        if(file){
            console.log(file)
            for(let i=0; i<file.length; i++){
                Object.keys(props.vans).map(allVans => {
                    let van = props.vans[allVans];
                    if(file[i][14] && van){
                        if(file[i][27] === van.vin){
                            newObj[van.assetId]["currentOdometer"] = file[i][14]
                        }
                    }
                })
            }
        } else {
            return false;
        }
        firebase.database().ref("vans/allVans").update(newObj);
    }

    function updateLastPM(e){
        e.preventDefault();
        let newObj = props.vans;
        if(file){
            for(let i=0; i<file.length; i++){
                console.log(file[i][0])
                Object.keys(props.vans).map(allVans => {
                    let van = props.vans[allVans];
                    if(file[i][0] && van){
                        if(file[i][0] === van.vin){
                            newObj[van.assetId]["lastPM"] = file[i][1];
                        }
                    }
                })
            }
        } else {
            return false;
        }
        firebase.database().ref("vans/allVans").update(newObj);
    }
    return(
        <div>
            <form onSubmit={pushToDataBase}>
                <input type='file' onChange={e => excelToJSON(e.target.files)}/>
                <button type='submit'>Submit</button>
            </form>
            {/* <form onSubmit={updateLastPM}>
                <h1>update last pm</h1>
                <input type='file' onChange={e => excelToJSON(e.target.files)}/>
                <button type='submit'>Submit</button>
            </form> */}
        </div>
    )
}

export default XcelerateAPI;

