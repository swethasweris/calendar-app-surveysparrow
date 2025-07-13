import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function CalendarGrid({ events }) {
  const navigate = useNavigate();

  const today = dayjs();
  const [currentDate, setCurrentDate] = useState(today);

  const firstDay = currentDate.startOf('month').day(); // Sunday = 0
  const lastDate = currentDate.daysInMonth();

  const daysArray = [];
  for (let i = 0; i < firstDay; i++) daysArray.push(null);
  for (let i = 1; i <= lastDate; i++) daysArray.push(i);

  const formatDate = (day) => {
    return currentDate.date(day).format('YYYY-MM-DD');
  };

  const hasEvent = (day) => {
    const formattedDate = formatDate(day);
    return events.some(ev => ev.date === formattedDate);
  };

  const handleClick = (day) => {
    if (!day) return;
    const formattedDate = formatDate(day);
    if (hasEvent(day)) {
      navigate(`/date-details/${formattedDate}`);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const isToday = (day) => {
    return today.isSame(currentDate.date(day), 'day');
  };

  return (
    <div className="calendar-main">
      

      <div className="calendar-header">
        <button onClick={handlePrevMonth}>◀</button>
        <h2>{months[currentDate.month()]} {currentDate.year()}</h2>
        <button onClick={handleNextMonth}>▶</button>
      </div>

      <div className="calendar-grid">
        {days.map(d => <div key={d} className="day-name">{d}</div>)}
        {daysArray.map((day, idx) => (
          <div
            key={idx}
            className={`day-box ${day ? '' : 'empty'} ${isToday(day) ? 'today' : ''}`}
            onClick={() => handleClick(day)}
          >
            {day && <div className="day-number">{day}</div>}
            {day && hasEvent(day) && (
              <div className="event-preview">
                {events
                  .filter(ev => ev.date === formatDate(day))
                  .slice(0, 4)
                  .map((ev, i) => (
                    <div key={i}>{ev.time} - {ev.title}</div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
