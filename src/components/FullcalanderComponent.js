import React,{useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
const FullcalanderComponent = ({events}) => {
    const [wikendVisible, setwikendVisible] = useState(true)
    function renderEventContent(eventInfo) {
        return (
            <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
            </>
        )
    }
    return (
        <div>
            <div className="mt-4">
                <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView='dayGridMonth'
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={wikendVisible}
                initialEvents={events} 
                eventContent={renderEventContent} 
            />
            </div>
        </div>
    )
}

export default FullcalanderComponent
