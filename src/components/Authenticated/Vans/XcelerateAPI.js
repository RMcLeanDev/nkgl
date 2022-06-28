import React, {useState} from 'react';
import * as XLSX from 'xlsx/xlsx.mjs';
import moment from 'moment';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database";
import { formats } from 'react-big-calendar/lib/localizers/moment';

function XcelerateAPI(){
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
        let newArry = [["lastUpdated", timeStamp]]
        if(file){
            for( let i=0; i<file.length; i++){
                if(file[i].length > 2){
                    console.log(file[i])
                    newArry.push([file[i][27], file[i][14]])
                }
            }
        }
        console.log(newArry)
    }

    return(
        <div>
            <form onSubmit={pushToDataBase}>
                <input type='file' onChange={e => excelToJSON(e.target.files)}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default XcelerateAPI;

