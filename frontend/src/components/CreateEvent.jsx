import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
   <div className="min-h-screen flex justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src="https://placeimg.com/400/225/tech" alt="Tech" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Tech Event</h2>
          <p>Join us for a tech event that will inspire and educate!</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Join Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventList;
