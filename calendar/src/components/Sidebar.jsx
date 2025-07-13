import React, { useState } from 'react';

export default function Sidebar({ events, setEvents }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (!date || !time || !title) {
      alert("All fields are required!");
      return;
    }

    const existing = events.find(ev => ev.date === date && ev.time === time);
    let conflict = false;

    if (existing) {
      const proceed = window.confirm("Time conflict! Add anyway?");
      if (!proceed) return;
      conflict = true;
    }

    const newEvent = {
      id: Date.now(),
      date,
      time,
      title,
      conflict
    };

    setEvents([...events, newEvent]);
    setDate(''); setTime(''); setTitle('');
  };

  return (
    <div className="sidebar">
      <h3>Add Event</h3>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <input type="time" value={time} onChange={e => setTime(e.target.value)} />
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={handleAdd}>Add Event</button>
    </div>
  );
}
