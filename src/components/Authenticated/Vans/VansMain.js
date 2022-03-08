import React, {useState, useEffect} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "../../../scss/Calendar.scss"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import AdjustVanDates from './AdjustVanDates';
import {connect} from 'react-redux';


function VansMain(props){

    let adjustDatesComponent;
    const myEventsList = [];
    let localizer = momentLocalizer(moment)
    const [adjustDateComponent, setAdjustDateComponent] = useState({"state": false, info :{}})
    
    if(props.vans.maintenance){
        Object.keys(props.vans.maintenance).map(requests => {
            let request = props.vans.maintenance[requests]
            if(request !== true){
                let newEnd;
                let newTitle = request.title;
                let newStart = new Date(request.start);
                if(request.start !== request.end){
                    newEnd = new Date(moment(request.end).endOf("day"))
                } else {
                    newEnd = new Date(request.end);
                }
                myEventsList.push({"title": newTitle, "start": newStart, "end": newEnd, "uniqueID": request.uniqueID})
            }
        })
    }

    if(adjustDateComponent.state){
        adjustDatesComponent = <AdjustVanDates information={adjustDateComponent.info} close={() => setAdjustDateComponent({"state": false, info: {}})}/>
    } else {
        adjustDatesComponent = null;
    }

    return(
        <div className="orderContainer">
            {adjustDatesComponent}
            <h1>Vans</h1>
                <Calendar
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="week"
                    resizable
                    onSelectEvent={event => setAdjustDateComponent({"state": true, info: event})}
                />
        </div>
    )
}

const mapStateToProps = state => ({
    vans: state.vanState
  })

export default connect(mapStateToProps)(VansMain);