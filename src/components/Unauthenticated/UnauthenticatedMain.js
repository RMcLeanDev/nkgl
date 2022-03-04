import React, {useState} from 'react';
import '../../scss/UnauthenticatedMain.scss';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "../../scss/Calendar.scss"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function UnauthenticatedMain(props){

    let localizer = momentLocalizer(moment)
    const [startDate, setStartDate] = useState(new Date());
    const [newDate, setNewDate] = useState(null);

    const myEventsList = [
        {
            title: "Spaghetti",
            start: new Date("March 8, 2022"),
            end: new Date("March 8, 2022")
        },
        {
            title: "Bob",
            start: new Date("March 6, 2022"),
            end: new Date("March 6, 2022")
        },
        {
            title: "test 1",
            start: new Date("03/03/2022"),
            end: new Date("03/03/2022")
        },
        {
            title: "test 2",
            start: new Date("03/03/2022"),
            end: new Date("03/03/2022")
        },
        {
            title: "test 3",
            start: new Date("03/03/2022"),
            end: new Date("03/03/2022")
        },
        {
            title: "test 4",
            start: new Date("03/03/2022"),
            end: new Date("03/03/2022")
        },
        {
            title: "test 5",
            start: new Date("03/03/2022"),
            end: new Date("03/03/2022")
        },
        {
            title: "test 6",
            start: new Date("03/04/2022"),
            end: new Date("03/07/2022")
        }
    ];

    function changeDate(info){
        for (let i=0; i<myEventsList.length; i++){
            if(myEventsList[i].title === info.title){
                console.log(newDate)
                myEventsList[i].start = newDate;
                myEventsList[i].end = newDate;
            }
        }
    }

    return(
        <div>
            <div className="UnauthMain">
                <h1>Can have news or recent company score here.</h1>
                <h1>Top Drivers.</h1>
                <input type="date" onChange={e => setNewDate(moment(e.target.value).format("L"))}/>
                <Calendar
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="week"
                    resizable
                    onSelectEvent={event => changeDate(event)}
                />
                <h1>Can have news or recent company score here.</h1>
                <h1>Top Drivers.</h1>
            </div>
        </div>
    )
}

export default UnauthenticatedMain;