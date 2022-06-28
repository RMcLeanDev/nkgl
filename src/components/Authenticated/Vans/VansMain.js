import React, {useState, useEffect} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "../../../scss/Calendar.scss"
import "react-datepicker/dist/react-datepicker.css";
import AdjustVanDates from './AdjustVanDates';
import {connect} from 'react-redux';
import "../../../scss/Vans.scss";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import {AiFillFileAdd} from 'react-icons/ai';
import AddVanMaintenance from './AddVanMaintenance';
import XcelerateAPI from './XcelerateAPI';

function VansMain(props){

    console.log(props.vans.allVans)

    let adjustDatesComponent;
    const myEventsList = [];
    let localizer = momentLocalizer(moment)
    const [adjustDateComponent, setAdjustDateComponent] = useState({"state": false, info :{}})
    const [addVanMaintenanceComponent, setAddVanMaintenanceComponent] = useState(false);

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
                myEventsList.push({"title": newTitle, "start": newStart, "end": newEnd, "uniqueID": request.uniqueID, "description": request.description, "longterm": request.longterm})
            }
        })
    }

    if(adjustDateComponent.state){
        adjustDatesComponent = <AdjustVanDates information={adjustDateComponent.info} close={() => setAdjustDateComponent({"state": false, info: {}})}/>
        disableBodyScroll(document)
    } else {
        adjustDatesComponent = null;
        enableBodyScroll(document)
    }

    function eventStyleGetter(event, start, end, isSelected){
        console.log(event)
        let style;
        if(event.longterm){
            style = {
                backgroundColor: "red",
                fontWeight: "bold"
            }
        } else {
            style ={
                color: "black",
                fontWeight: "bold"
            }
        }
        return{
            style: style,
        }
    }

    return(
        <div className="orderContainer">
            <XcelerateAPI vans={props.vans.allVans}/>
            {adjustDatesComponent}
            {addVanMaintenanceComponent ? (disableBodyScroll(document), <AddVanMaintenance close={() => setAddVanMaintenanceComponent(false)} vans={props.vans.allVans}/>) : (enableBodyScroll(document), null)}
            <AiFillFileAdd className="addItem" onClick={() => setAddVanMaintenanceComponent(true)}/>
            <p className="lastUpdated">Last Updated: {props.vans.allVans ? moment(props.vans.allVans.lastUpdate).format('MMMM Do, h:mm:ss a'):"loading"}</p>
            <h1>Vans</h1>
                <Calendar
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="week"
                    eventPropGetter={eventStyleGetter}
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