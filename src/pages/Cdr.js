import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'


const Cdr = () => {
    return (
        <div>
        
        <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        />

        </div>
    )
}

export default Cdr
