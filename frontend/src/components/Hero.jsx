import Counter from "./Counter";

export const Hero = () => {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row lg:px-16 px-5 py-12">
          {/* Image */}
          <img
            src="https://placehold.jp/550x450.png"
            className="max-w-full mask mask-decagon h-auto rounded-xl shadow-xl transition-transform transform hover:scale-105"
            alt="Hero"
          />
          <div className="lg:ml-10 mt-10 lg:mt-0">
            {/* Counter */}
            <div className="mb-6">
              <Counter />
            </div>
            {/* Heading */}
            <h1 className="btn text-5xl font-extrabold text-gradient bg-clip-text bg-red-500 mb-4">
              Event Name
            </h1>
            {/* Description */}
            <p className="text-lg text-gray-600 mb-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <br />
            {/* View More Button */}
            <button className="btn btn-outline btn-secondary hover:bg-indigo-600 hover:text-white transition-all duration-300 ease-in-out">
              View Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
