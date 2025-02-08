import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Hero } from "../components/Hero";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  // State to hold form data
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  
  useEffect(()=>{
    const getEvents = async ()=>{
      const response = await fetch("http://localhost:5000/api/events",{method:"GET"});
      const result = await response.json();
      setData(result.events)
    };
    getEvents();
  },[]);
  console.log(data);
  // Handle form submission
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
      const response = await fetch("http://localhost:5000/api/auth/register", {
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

  return (
    <>
      <div className="w-full">
        <NavBar />
        <Hero />
        {/* --Art Board -- */}
        <div className="artboard artboard-horizontal phone-4 flex justify-center items-center h-5 m-auto">
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn btn-outline btn-secondary"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Register On Emsy Now!
          </button>
         
        </div>

        <div className="flex justify-center item-center p-4">
          <div className="stats shadow w-full">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Total Likes</div>
              <div className="stat-value text-primary">25.6K</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Page Views</div>
              <div className="stat-value text-secondary">2.6M</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <div className="avatar online">
                  <div className="w-16 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
              </div>
              <div className="stat-value">86%</div>
              <div className="stat-title">Tasks done</div>
              <div className="stat-desc text-secondary">31 tasks remaining</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center item-center gap-4 overflow">
{
data.length>0?(data.map((item,index)=>
<div onClick={()=>navigate(`/event/${item._id}`)}>
  <Card title={item.title} description={item.description} status={item.status} url={item.imageUrl} />
  </div>
)):("No event Created yet")
}
        </div>

        <footer className="footer footer-center bg-secondary text-primary-content p-10">
          <aside>
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="inline-block fill-current"
            >
              <path
                d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"
              ></path>
            </svg>
            <p className="font-bold">
              ACME Industries Ltd.
              <br />
              Providing reliable tech since 1992
            </p>
            <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
          </aside>
          <nav>
            <div className="grid grid-flow-col gap-4">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path
                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                  ></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path
                    d="M23.49 12.287c-.045-.289-.238-.512-.491-.612-.228-.083-.475-.094-.727-.056-.22-.412-.43-.834-.634-1.267.597-.193 1.136-.571 1.633-1.073-.257-.466-.512-.935-.773-1.41-.259-.47-.53-.94-.81-1.413-.513-.885-1.06-1.754-1.653-2.563.097-.261.182-.532.254-.804-.216-.05-.424-.118-.639-.176-.299-.054-.606-.106-.916-.158-.197-.413-.377-.837-.55-1.262.191-.25.357-.508.525-.765 0-.43.031-.86-.14-1.253-.35-.821-.973-1.194-1.81-1.192-1.633.025-2.559 1.364-2.661 2.727-.107.426-.043.897-.083 1.321-.337.046-.682-.143-.948-.354-.687-.493-.984-.761-.535-1.285.195-.345.289-.713.351-1.084-.291.431-.472.888-.539 1.367-.514-.031-.931-.158-1.42-.278-.319.189-.639.379-.939.58-.179.233-.294.497-.397.762-.423-.303-.876-.53-1.314-.676-.493-.241-.919-.508-1.42-.62-.447-.204-.799-.618-1.1-1.058-.163-.051-.325-.107-.5-.134-.254-.066-.513-.072-.774-.123.328-.465.577-.96.741-1.464-.681-.597-.699-1.425-.253-2.035.368-.63.96-.963 1.638-.822.601.126.922.692 1.05 1.314-.331-.353-.618-.75-.92-1.138-.16-.246-.331-.505-.479-.773.578-.084 1.131-.512 1.61-.97-.16-.235-.331-.467-.492-.709-.479-.405-.707-.88-.77-1.41 0-1.285-.319-2.57-.961-3.726.647 1.014 1.196 2.075 2.095 3.235.237.264.46.537.699.799 2.052-.206 4.13-.531 6.145-.768z"
                  ></path>
                </svg>
              </a>
            </div>
          </nav>
        </footer>
      </div>
    </>
  );
};
