import { useState } from "react";
import { jwtDecode }from "jwt-decode";
import { Link } from "react-router-dom";

const isTokenExpired = (token) => {
    if (!token) return true; // Treat missing token as expired

    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds

    return decoded.exp < currentTime;
};
const NavBar = () => {

 // State to hold form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const userData = {
        email,
        password,
    };

    console.log("hello");

    try {
      // Send POST request to backend
      const response = await fetch("https://ems-backend-229j.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      console.log(result);
      localStorage.setItem("token",result.token);
      if (response.ok) {
        // Handle successful registration
        alert("Log In successful!");
        // Optionally, you can reset the form or redirect to login page
      } else {
        // Handle error response from the server
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  
    const [name, setName] = useState("");
  
    const handleRegister = async (e) => {
      e.preventDefault(); // Prevent default form submission behavior
      const userData = {
          name,
          email,
          password,
      };
  
      console.log("hello");
  
      try {
        // Send POST request to backend
        const response = await fetch("https://ems-backend-229j.onrender.com/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
  
        const result = await response.json();
        console.log(result);
        localStorage.setItem("token",result.token);
        if (response.ok) {
          // Handle successful registration
          alert("Registration successful!");
          // Optionally, you can reset the form or redirect to login page
        } else {
          // Handle error response from the server
          alert(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("An error occurred. Please try again later.");
      }
    };
  const toggleLogin =() => document.getElementById("my_modal_2").showModal();
  const handleLogout =()=>localStorage.removeItem('token');
  const toggleSignup = ()=>document.getElementById("my_modal_1").showModal();
  return <div className="navbar bg-base-100">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          {isTokenExpired(localStorage.token)?<><li onClick={toggleSignup}><a>Sign Up</a></li>
          <li onClick={toggleLogin}><a>Log In</a></li></>:""}
          {/* <li><a>View All Events</a></li> */}
          <Link to="/dashboard"><li><a>Host an Event</a></li></Link>
        </ul>
      </div>
    </div>
    
    <div className="navbar-center">
      <a className="btn btn-ghost text-xl">Welcome My Friend!</a>
    </div>
    {/* <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button> */}
    <div className="navbar-end">
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
            className="btn btn-outline btn-secondary"
            onClick={isTokenExpired(localStorage.token)?toggleLogin:handleLogout}
            
          >
            {isTokenExpired(localStorage.token)?"Login":"LogOut"}
          </button>
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
              <h3 className="font-black text-lg" style={{ fontWeight: "900" }}>
                Hello thanks for your interest!
              </h3>
              <form id="login">
                <p className="py-4">
                  <br />
                  <label
                    className="input input-bordered flex items-center gap-2"
                    style={{ fontWeight: "900" }}
                  >
                    Email
                    <input
                      type="text"
                      className="grow"
                      placeholder="JohnDoe@Artisian.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                  <br />
                  <label
                    className="input input-bordered flex items-center gap-2"
                    style={{ fontWeight: "900" }}
                  >
                    Password
                    <input
                      type="password"
                      className="grow"
                      placeholder="@guasd$786as/@"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label>
                  <br />
                  <button
                    className="btn btn-outline btn-secondary"
                    onClick={handleLogin}
                  >
                    Login To Your Account
                  </button>
                </p>
              </form>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-black text-lg" style={{ fontWeight: "900" }}>
                Hello thanks for your interest!
              </h3>
              <form id="register">
                <p className="py-4">
                  <label
                    className="input input-bordered flex items-center gap-2"
                    style={{ fontWeight: "900" }}
                  >
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
                  <label
                    className="input input-bordered flex items-center gap-2"
                    style={{ fontWeight: "900" }}
                  >
                    Email
                    <input
                      type="text"
                      className="grow"
                      placeholder="JohnDoe@Artisian.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                  <br />
                  <label
                    className="input input-bordered flex items-center gap-2"
                    style={{ fontWeight: "900" }}
                  >
                    Password
                    <input
                      type="password"
                      className="grow"
                      placeholder="@guasd$786as/@"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label>
                  <br />
                  <button
                    className="btn btn-outline btn-secondary"
                    onClick={handleRegister}
                  >
                    Create Account
                  </button>
                </p>
              </form>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1"> 
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button></div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </div>

    </div>
  </div>
}

export default NavBar;