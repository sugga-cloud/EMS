import React, { useState } from 'react';
import axios from 'axios';

function CreateEvent() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = { name, date, description };
    axios.post('/api/events', newEvent)
      .then(response => {
        console.log('Event created:', response.data);
      })
      .catch(error => console.error('Error creating event:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name: </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Date: </label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <label>Description: </label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <button type="submit">Create Event</button>
    </form>
  );
}

export default CreateEvent;
