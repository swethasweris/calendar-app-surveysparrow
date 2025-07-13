import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DateDetails({ events, setEvents }) {
  const { date } = useParams();
  const navigate = useNavigate();

  const filtered = events.filter(ev => ev.date === date);

  const handleEdit = (event) => {
    const newTitle = prompt("Edit title", event.title);
    if (!newTitle) return;
    const newTime = prompt("Edit time", event.time);
    if (!newTime) return;

    const conflict = events.some(ev => ev.id !== event.id && ev.date === date && ev.time === newTime);

    const updated = events.map(ev =>
      ev.id === event.id ? { ...ev, title: newTitle, time: newTime, conflict } : ev
    );

    setEvents(updated);
  };

  const handleDelete = (id) => {
    const confirmDel = window.confirm("Delete this event?");
    if (!confirmDel) return;
    setEvents(events.filter(ev => ev.id !== id));
    
  };

  return (
    <div className="event-details">
      <h3>Events on {date}</h3>
      {filtered.map(ev => (
        <div key={ev.id} className={`event ${ev.conflict ? 'conflict' : ''}`}>
          {ev.time} - {ev.title}
          <div className="edit"><button onClick={() => handleEdit(ev)}>Edit</button></div>
          <div className="delete"><button onClick={() => handleDelete(ev.id)}>Delete</button></div>
        </div>
      ))}
      <div className="back">
      <button onClick={() => navigate('/')}>Back</button></div>
    </div>
  );
}
