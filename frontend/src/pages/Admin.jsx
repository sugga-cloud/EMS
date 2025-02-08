import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

const Dashboard = () => {
    const [timeline, setTimeline] = useState([]);
    const [newTimeline, setNewTimeline] = useState({
        date: "",
        information: "", // New field for additional information
    });
    const [title, setTitle] = useState("");
    const [about, setAbout] = useState("");
    const [category, setCategory] = useState("");
    // State to hold form data
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [organization, setOrganization] = useState("");
    const [age, setAge] = useState("");
    const [status, setStatus] = useState("");
    const [password, setPassword] = useState("");
    const [appliedEvents, setAppliedEvents] = useState([]);
    const [HostedEvents, setHostedEvents] = useState([]);
    const [file, setFile] = useState([]);
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch('https://ems-backend-229j.onrender.com/api/profile', {
                    method: 'GET',
                    headers: {
                        Authorization: "Bearer " + localStorage.token
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }

                const data = await response.json();
                console.log(data);
                setName(data.name); // Update state with the fetched data
                setEmail(data.email); // Update state with the fetched data
                setOrganization(data.organization); // Update state with the fetched data
                setAge(data.age); // Update state with the fetched data
                setStatus(data.status); // Update state with the fetched data
                setPassword("**********"); // Update state with the fetched data
                console.log(data.HostedEvents);
                setHostedEvents(data.HostedEvents);
                setAppliedEvents(data.appliedEvents);
            } catch (err) {
                console.log(err)
            }
        };

        fetchUserDetails();

    }, []); // Empty dependency array means this effect runs once when the component mounts

    // Handle form submission
    const handleUpdate = async (e) => {
        e.preventDefault(); // Prevent page refresh

        const updatedData = {
            name,
            email,
            organization,
            age,
            status,
            password,
        };

        try {
            // Send PUT request to update the user details
            const response = await fetch("https://ems-backend-229j.onrender.com/api/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.token
                },
                body: JSON.stringify(updatedData),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Account updated successfully!");
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error updating account:", error);
            alert("An error occurred while updating your account.");
        }
    };
    // Function to handle adding a new timeline entry
    const addTimelineEntry = () => {
        if (newTimeline.date && newTimeline.information) {
            setTimeline([
                ...timeline,
                { ...newTimeline },
            ]);
            setNewTimeline({ date: "", information: "" }); // Clear inputs after adding
        }
    };

    const handleEvent = async () => {
        try {
            const formdata = new FormData();
            formdata.append('title', title);
            formdata.append('about', about);
            formdata.append('timelines[]', timeline);
            formdata.append('relation', category);
            formdata.append('file', file); // Append the file (assuming 'file' is a File object)

            const response = await fetch("https://ems-backend-229j.onrender.com/api/events/create-event", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token') // Authorization header only
                },
                body: formdata, // FormData will automatically set the correct Content-Type header
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Event created successfully:", result);

            // Optionally clear the form after successful submission
            setNewTimeline({
                date: "",
                information: "",
            });

        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="flex h-screen bg-gray-100">
                {/* Main Content */}
                <div className="flex-1 p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-700">Total Events Applied</h3>
                            <p className="text-3xl font-bold text-green-600">{appliedEvents.length}</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-700">Hosted Events</h3>
                            <p className="text-3xl font-bold text-indigo-600">{HostedEvents.length || 0}</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-700">Referral</h3>
                            <p className="text-3xl font-bold text-yellow-600">15</p>
                        </div>
                    </div>
                    <br />

                    <button
                        className="btn btn-outline btn-secondary"
                        onClick={() => document.getElementById("my_modal_1").showModal()}
                    >
                        Update Account Details!
                    </button>

                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <h3 className="font-black text-lg" style={{ fontWeight: "900" }}>
                                Hello, thanks for your interest!
                            </h3>
                            <form onSubmit={handleUpdate}>
                                <p className="py-4">
                                    <label className="input input-bordered flex items-center gap-2" style={{ fontWeight: "900" }}>
                                        Name
                                        <input
                                            type="text"
                                            className="grow"
                                            placeholder="John Doe"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </label>
                                    <br />
                                    <label className="input input-bordered flex items-center gap-2" style={{ fontWeight: "900" }}>
                                        Email
                                        <input
                                            type="email"
                                            className="grow"
                                            placeholder="JohnDoe@Artisian.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </label>
                                    <br />
                                    <label className="input input-bordered flex items-center gap-2" style={{ fontWeight: "900" }}>
                                        Organization
                                        <input
                                            type="text"
                                            className="grow"
                                            placeholder="John Artisan"
                                            value={organization}
                                            onChange={(e) => setOrganization(e.target.value)}
                                        />
                                    </label>
                                    <br />
                                    <label className="input input-bordered flex items-center gap-2" style={{ fontWeight: "900" }}>
                                        Age
                                        <input
                                            type="text"
                                            className="grow"
                                            placeholder="21"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                        />
                                        Yrs
                                    </label>
                                    <br />
                                    <label className="input input-bordered flex items-center gap-2" style={{ fontWeight: "900" }}>
                                        Status
                                        <input
                                            type="text"
                                            className="grow"
                                            placeholder="Working Profession / Student"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        />
                                    </label>
                                    <br />
                                    <label className="input input-bordered flex items-center gap-2" style={{ fontWeight: "900" }}>
                                        Change Password
                                        <input
                                            type="password"
                                            className="grow"
                                            placeholder="@guasd$786as/@"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </label>
                                    <br />
                                    <button type="submit" className="btn btn-outline btn-secondary">
                                        Update Account
                                    </button>
                                </p>
                            </form>

                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>

                    {/* Add Timeline Modal */}
                    &nbsp;&nbsp; <button
                        className="btn btn-outline btn-secondary"
                        onClick={() => document.getElementById("my_modal_3").showModal()}
                    >
                        Host An Event
                    </button>

                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                            <h3 className="font-black text-lg" style={{ fontWeight: "900" }}>
                                Hello, thanks for hosting an Event On Us!
                            </h3>
                            <p className="py-4">
                                {/* Title Field */}
                                <label className="input input-bordered flex items-center gap-2" style={{ fontWeight: "900" }}>
                                    Event Banner / Image
                                    <input
                                        type="file"
                                        className="grow"
                                        placeholder="Event Title"
                                        // value={title}

                                        onChange={(e) => setFile(e.target.files[0])}

                                    />
                                </label>  <label className="input input-bordered flex items-center gap-2" style={{ fontWeight: "900" }}>
                                    Event Title
                                    <input
                                        type="text"
                                        className="grow"
                                        placeholder="Event Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}

                                    />
                                </label>
                                <br />

                                {/* About The Event Field */}
                                <label className="input input-bordered flex items-center gap-2" style={{ fontWeight: "900" }}>
                                    About The Event
                                    <textarea
                                        className="grow"
                                        placeholder="Describe the event"
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                    />
                                </label>
                                <br />
                                {/* About The Event Field */}
                                <label className="input input-bordered flex items-center gap-2" style={{ fontWeight: "900" }}>
                                    Category
                                    <textarea
                                        className="grow"
                                        placeholder="Describe the event"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                </label>
                                <br />

                                {/* Event Date Field */}
                                <label className="input input-bordered flex items-center gap-2" style={{ fontWeight: "900" }}>
                                    Event Date
                                    <input
                                        type="date"
                                        className="grow"
                                        value={newTimeline.date}
                                        onChange={(e) => setNewTimeline({ ...newTimeline, date: e.target.value })}
                                    />
                                </label>
                                <br />

                                {/* Additional Information Field */}
                                <label className="input input-bordered flex items-center gap-2" style={{ fontWeight: "900" }}>
                                    Additional Information
                                    <textarea
                                        className="grow"
                                        placeholder="Any extra details"
                                        value={newTimeline.information}
                                        onChange={(e) => setNewTimeline({ ...newTimeline, information: e.target.value })}
                                    />
                                </label>
                                <br />

                                {/* Button to Add to Timeline */}
                                <button onClick={addTimelineEntry} className="btn btn-outline btn-secondary">
                                    Add to Timeline
                                </button>
                            </p>

                            {/* Display Timeline */}
                            <div className="mt-4">
                                {timeline.length > 0 && (
                                    <div>
                                        <h5 className="text-lg font-semibold">Your Timeline</h5>
                                        <ul className="list-disc pl-6 mt-2">
                                            {timeline.map((entry, index) => (
                                                <li key={index} className="mt-2">
                                                    <strong>{entry.date}</strong>: {entry.title} - {entry.description}
                                                    <p className="italic text-sm">{entry.information}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                    <button className="btn btn-outline btn-secondary" onClick={handleEvent}>Create Event</button>

                                </form>
                            </div>
                        </div>
                    </dialog>

                    {/* Table Section */}
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Recent Activity</h3>
                        <table className="min-w-full table-auto">
                            <thead className="text-gray-600">
                                <tr>
                                    <th className="px-4 py-2 text-left">Event</th>
                                    <th className="px-4 py-2 text-left">Status</th>
                                    <th className="px-4 py-2 text-left">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appliedEvents.length > 0 ? (
                                    appliedEvents.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2 text-gray-700">{item.title}</td>
                                            <td className="px-4 py-2 text-gray-700">{item.status}</td>
                                            <td className="px-4 py-2 text-gray-700">{item.registeredUser.length}</td>
                                            <td className="px-4 py-2 text-gray-700">
                                                <button className="btn btn-danger btn-outline">Update</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-4 py-2 text-gray-700 text-center">
                                            No Events Applied
                                        </td>
                                    </tr>
                                )}

                                {/* More rows */}

                            </tbody>
                        </table>
                    </div>

                    {/* Table Section */}
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Event Created</h3>
                        <table className="min-w-full table-auto">
                            <thead className="text-gray-600">
                                <tr>
                                    <th className="px-4 py-2 text-left">Event</th>
                                    <th className="px-4 py-2 text-left">Status</th>
                                    <th className="px-4 py-2 text-left">Number of user registered</th>
                                    <th className="px-4 py-2 text-left">Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {HostedEvents.length > 0 ? (
                                    HostedEvents.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2 text-gray-700">{item.title}</td>
                                            <td className="px-4 py-2 text-gray-700">{item.status}</td>
                                            <td className="px-4 py-2 text-gray-700">{item.registeredUser.length}</td>
                                            <td className="px-4 py-2 text-gray-700">
                                                <button className="btn btn-danger btn-outline">Update</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-4 py-2 text-gray-700 text-center">
                                            No Events Created Still
                                        </td>
                                    </tr>
                                )}

                                {/* More rows */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
