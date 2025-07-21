import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DateDetails({ events, setEvents }) {
  const { date } = useParams();
  const navigate = useNavigate();
  const filtered = events.filter(ev => ev.date === date);

  const handleEdit=(event)=>{

    const newTitle=prompt("enter title",event.title);
    if(!newTitle) return;
    const newTime=prompt("enter time",event.time);
    if(!newTime) return;
    
    const conflict=events.some(ev=>ev.id!==event.id&&ev.time===newTime);
    if(conflict){
      alert("Time conflict,proceed anyway!");
    }

    const updatedEvent=events.map((ev)=>(ev.id===event.id?{...ev,title:newTitle,time:newTime,conflict}:ev));

    setEvents(updatedEvent);

  };

  const handleDel=(id)=>{
    const val=window.confirm("are you sure you want to delete?");
    if(!val) return;
    const updatedEvent=events.filter(ev=>ev.id!==id);
    setEvents(updatedEvent);

    
  };

  
  return (
    <div className="event-details">
      <h3>Events on {date}</h3>
      {filtered.map(ev => (
        <div key={ev.id} className={`event ${ev.conflict ? 'conflict' : ''}`}>
          {ev.time} - {ev.title}
          <div className="event-actions">
            <button className="edit" onClick={()=>handleEdit(ev)}>EDIT</button>
            <button className="del" onClick={()=>handleDel(ev.id)}>DELETE</button>
          </div>
          </div>
      ))}
      <div className="back">
        <button onClick={() => navigate('/')}>Back</button>
      </div>
    </div>
  );
}
