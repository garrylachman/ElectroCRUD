import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick

function EventCalendar(props: {
  calendarData: {
    title: string;
    borderColor: string;
    start: string;
    end: string;
    backgroundColor: string;
    className: string;
  }[];
  initialDate: string;
}) {
  const { calendarData, initialDate } = props;

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      headerToolbar={false}
      initialView="dayGridMonth"
      contentHeight="600px"
      events={calendarData}
      initialDate={initialDate}
      editable
      height="100%"
    />
  );
}

export default EventCalendar;
