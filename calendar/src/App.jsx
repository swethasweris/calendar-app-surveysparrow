import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalendarGrid from './components/CalendarGrid';
import Sidebar from './components/Sidebar';
import DateDetails from './components/DateDetails';
import './calendar.css';
import eventData from './data/events.json';

export default function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(eventData);
  }, []);

  return (
    <Router>
      <div className="main-layout">
        
        <Sidebar events={events} setEvents={setEvents} />
        <Routes>
          <Route path="/" element={<CalendarGrid events={events} />} />
          <Route path="/date-details/:date" element={<DateDetails events={events} setEvents={setEvents} />} />
        </Routes>
      </div>
    </Router>
  );
}
