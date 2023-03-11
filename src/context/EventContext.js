import React, { useContext, useState } from "react";

const EventContext = React.createContext();
const EventUpdateContext = React.createContext();

export function UseEvent() {
  return useContext(EventContext);
}
export function UseEventUpdate() {
  return useContext(EventUpdateContext);
}
export function EventProvider({ children }) {
  const [event, setEvent] = useState({});
  function updateEvent(newEvent) {
    setEvent(newEvent);
  }
  return (
    <EventContext.Provider value={event}>
      <EventUpdateContext.Provider value={updateEvent}>
        {children}
      </EventUpdateContext.Provider>
    </EventContext.Provider>
  );
}
