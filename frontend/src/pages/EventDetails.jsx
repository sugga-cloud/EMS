import React from "react";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
const EventDetails = () => {
    const [event, setData] = useState({});
    const {id} = useParams();
    const User = jwtDecode(localStorage.token).userId;
    console.log(User)
    const handleApply = async()=>{
        const response = await fetch("https://ems-backend-229j.onrender.com/api/events/apply/"+id,{method:"POST",headers:{
            Authorization:"Bearer "+localStorage.token
        }});
        const result = await response.json();
        console.log(result.message);
       
    };
     useEffect(()=>{
       const getEvents = async ()=>{
         const response = await fetch("https://ems-backend-229j.onrender.com/api/events/"+id,{method:"GET"});
         const result = await response.json();
         console.log(result);
         setData(result)
       };
       getEvents();
     },[]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-200 py-16">
            <NavBar />
            {/* Page Title */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-teal-500">
                    {event.title}
                </h1>
                <p className="text-xl font-medium text-gray-700">
                    {/* {event.date} | {event.location} */}
                </p>
            </div>

            {/* Event Details Section */}
            <div className="container mx-auto flex flex-col lg:flex-row gap-12 px-8">
                {/* Event Image */}
                <div className="w-full lg:w-1/2 rounded-lg overflow-hidden shadow-xl">
                    <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-96 object-cover rounded-lg"
                    />
                </div>

                {/* Event Info */}
                <div className="w-full lg:w-1/2 text-left bg-white rounded-lg shadow-xl p-8 space-y-6">
                    {/* Event Title */}
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500 mb-4">
                        Event's Update
                    </h2>

                    {/* Register Button */}
                    <div className="mt-8">
                    { !(event.registeredUser && event.registeredUser.find(user => user.id === User))? <button className="btn btn-primary w-full py-4 text-lg font-semibold transform transition duration-200 hover:scale-105" style={{color:"white!important"}} onClick={handleApply}>
                            Register Now
                        </button>:<button className="btn btn-success w-full py-4 text-lg font-semibold transform transition duration-200 hover:scale-105">
                            Already Registered!
                        </button>}
                    </div>
                    {/* Event Description */}
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Registered : {event.registeredUser?.length || 0}
                    </p>

                    {/* Event Details */}
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Event Details</h3>
                    <br />
                    <ul className="space-y-4 text-gray-700">
                        {/* <li className="flex justify-between items-center text-lg">
                        </li>
                            <span className="font-medium text-gray-800">Date:</span> */}
                            {/* <span>{event.t}</span> */}
                        {/* <li className="flex justify-between items-center text-lg">
                        </li>
                            <span className="font-medium text-gray-800">Location:</span> */}
                            {/* <span>{event.location}</span> */}
                        <li>Steps To Be A Part<br />
                                { event.registeredUser && event.registeredUser.find(user => user.id === User)?
                            <ul className="steps">
                                <li className="step step-secondary">Find On Emsy</li>
                                <li className="step step-secondary">Register on Emsy</li>
                                <li className="step step-secondary">Apply For The Event</li>
                                <li className="step step-secondary">Get Tickets and Regular Updates</li>
                                <li className="step step-secondary">Enjoy The Event</li>
                            </ul>:
                            <ul className="steps">
                                <li className="step step-secondary">Find On Emsy</li>
                                <li className="step">Register on Emsy</li>
                                <li className="step">Apply For The Event</li>
                                <li className="step">Get Tickets and Regular Updates</li>
                                <li className="step">Enjoy The Event</li>
                            </ul>}
                        </li>
                    </ul>

                </div>

            </div><br />
           
        </div>
    );
};

export default EventDetails;
