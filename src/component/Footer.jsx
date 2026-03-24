import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-black w-full bottom-0  text-white py-10 mt-20">
            <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                {/* About */}
                <div>
                    <h2 className="text-xl font-bold mb-4">About</h2>
                    <p className="text-gray-400">
                        ShopEase is your one-stop online marketplace. Discover products, grab deals, and enjoy a seamless shopping experience.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                    <ul className="space-y-2">
                        <li><a href="/" className="hover:text-green-400 transition">Home</a></li>
                        <li><a href="/about" className="hover:text-green-400 transition">About</a></li>
                        <li><a href="/cart" className="hover:text-green-400 transition">Cart</a></li>
                        <li><a href="/contact" className="hover:text-green-400 transition">Contact</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Contact</h2>
                    <p className="text-gray-400">Email: support@shopease.com</p>
                    <p className="text-gray-400">Phone: +1 234 567 890</p>
                    <p className="text-gray-400">Address: 123 Market St, City, Country</p>
                </div>

                {/* Social Media */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Follow Us</h2>
                    <div className="flex gap-4 text-green-400 text-2xl">
                        <a href="#" className="hover:text-green-600 transition"><FaFacebook /></a>
                        <a href="#" className="hover:text-green-600 transition"><FaInstagram /></a>
                        <a href="#" className="hover:text-green-600 transition"><FaTwitter /></a>
                        <a href="#" className="hover:text-green-600 transition"><FaLinkedin /></a>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="mt-10 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
            </div>
        </footer>
    );
}