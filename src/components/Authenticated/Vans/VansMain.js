import React, {useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "../../../scss/Calendar.scss"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import AdjustVanDates from './AdjustVanDates';
import {connect} from 'react-redux';


function VansMain(props){

    let localizer = momentLocalizer(moment)
    const [startDate, setStartDate] = useState(new Date());
    const [newDate, setNewDate] = useState(null);

    function changeDate(info){
        for (let i=0; i<myEventsList.length; i++){
            if(myEventsList[i].title === info.title){
                console.log(newDate)
                myEventsList[i].start = newDate;
                myEventsList[i].end = newDate;
            }
        }
    }

    const myEventsList = [
        {
            title: "Spaghetti",
            start: new Date("03/08/2022"),
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
            end: new Date(moment("03/03/2022").endOf("day"))
        },
        {
            title: "test 6",
            start: new Date("03/04/2022"),
            end: new Date(moment("03/07/2022").endOf("day"))
        }
    ];

    return(
        <div className="orderContainer">
            <h1>Vans</h1>
            <input type="date" onChange={e => console.log(e.target.value)}/>
                <Calendar
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="week"
                    resizable
                    onSelectEvent={event => console.log(event)}
                />
        </div>
    )
}

const mapStateToProps = state => ({
    vans: state.vanState
  })

export default connect(mapStateToProps)(VansMain);