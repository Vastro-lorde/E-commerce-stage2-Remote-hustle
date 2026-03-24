import React from "react";

export default function About() {
    return (
        <div className="min-h-screen bg-black/90 mt-20 flex flex-col items-center justify-center px-4 py-20">
            {/* Hero Section */}
            <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-8">
                {/* Image */}
                <img
                    src="https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Marketplace"
                    className="w-full md:w-1/2 h-80 object-cover rounded-lg shadow-lg"
                />

                {/* Text */}
                <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-600">
                        About Our Marketplace
                    </h1>
                    <p className="text-gray-400 mb-4">
                        Welcome to our e-commerce platform! We connect buyers and sellers
                        in a seamless online marketplace. From the latest gadgets to
                        fashion essentials, we provide a wide variety of products to
                        satisfy your shopping needs.
                    </p>
                    <p className="text-gray-400 mb-4">
                        Our mission is to make online shopping convenient, safe, and
                        enjoyable. With secure payment options, easy returns, and
                        customer support, we ensure you have the best experience every
                        time.
                    </p>
                    <p className="text-gray-500">
                        Join our growing community of shoppers and sellers and discover
                        the joy of a marketplace designed with you in mind!
                    </p>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-6xl w-full mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
                    <h2 className="text-xl font-bold mb-2 text-green-500">Wide Selection</h2>
                    <p className="text-gray-600">
                        Choose from hundreds of products across multiple categories.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
                    <h2 className="text-xl font-bold mb-2 text-green-500">Secure Payments</h2>
                    <p className="text-gray-600">
                        All transactions are safe and encrypted for your protection.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
                    <h2 className="text-xl font-bold mb-2 text-green-500">Fast Delivery</h2>
                    <p className="text-gray-600">
                        Get your orders delivered quickly with reliable shipping partners.
                    </p>
                </div>
            </div>
        </div>
    );
}