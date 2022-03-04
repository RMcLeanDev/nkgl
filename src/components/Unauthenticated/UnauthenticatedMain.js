import React from 'react';
import '../../scss/UnauthenticatedMain.scss';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "../../scss/Calendar.scss"
import DatePicker from 'react-datepicker';

function UnauthenticatedMain(props){

    let localizer = momentLocalizer(moment)

    console.log(props)

    console.log(new Date("March 3, 2022"))
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
        }
    ];

    return(
        <div>
            <div className="UnauthMain">
                <h1>Can have news or recent company score here.</h1>
                <h1>Top Drivers.</h1>
                <Calendar
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="week"
                    resizable
                />
                <h1>Can have news or recent company score here.</h1>
                <h1>Top Drivers.</h1>
            </div>
        </div>
    )
}

export default UnauthenticatedMain;