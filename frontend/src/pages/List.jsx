import React from "react";
import NavBar from "../components/NavBar";
const List = () => {
    const products = [
        {
            id: 1,
            name: "Smartphone",
            price: "$499",
            image: "https://placeimg.com/400/400/tech",
        },
        {
            id: 2,
            name: "Laptop",
            price: "$899",
            image: "https://placeimg.com/400/400/tech",
        },
        {
            id: 3,
            name: "Headphones",
            price: "$149",
            image: "https://placeimg.com/400/400/tech",
        },
        {
            id: 4,
            name: "Smartwatch",
            price: "$199",
            image: "https://placeimg.com/400/400/tech",
        }, {
            id: 4,
            name: "Smartwatch",
            price: "$199",
            image: "https://placeimg.com/400/400/tech",
        }, {
            id: 4,
            name: "Smartwatch",
            price: "$199",
            image: "https://placeimg.com/400/400/tech",
        }, {
            id: 4,
            name: "Smartwatch",
            price: "$199",
            image: "https://placeimg.com/400/400/tech",
        },
    ];

    return (<>
        <NavBar />
        <div className="min-h-screen bg-gray-100 py-12">
            {/* Page Title */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
                    Shop the Latest Tech
                </h1>
                <p className="text-2xl text-gray-900" style={{ fontWeight: "900" }}>Find The Best Events For You Match</p>
            </div>

            {/* Filter Section */}
            <div className="flex justify-center mb-8">
                <div className="join">
                    <button className="join-item btn btn-outline btn-secondary btn-active" type="button" >All</button>
                    <button className="join-item btn btn-outline btn-secondary" type="button">Technical Events</button>
                    <button className="join-item btn btn-outline btn-secondary" type="button">Political Events</button>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
                {products.map((product) => (
                    <div key={product.id} className="card w-full bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                        <figure>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-64 object-cover rounded-t-lg"
                            />
                        </figure>
                        <div className="card-body">
                            <h3 className="card-title text-xl font-bold">{product.name}</h3>
                            <p className="text-lg text-gray-500">{product.price}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-secondary">Event Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <br />
            <div className="w-full flex justify-center item-center">
                <div className="join">
                    <input
                        className="join-item btn btn-secondary btn-outline btn-square"
                        type="radio"
                        name="options"
                        aria-label="1"
                        defaultChecked />
                    <input className="join-item btn btn-secondary btn-outline btn-square" type="radio" name="options" aria-label="2" />
                    <input className="join-item btn btn-secondary btn-outline btn-square" type="radio" name="options" aria-label="3" />
                    <input className="join-item btn btn-secondary btn-outline btn-square" type="radio" name="options" aria-label="4" />
                </div></div>
        </div>
    </>
    );
};

export default List;
