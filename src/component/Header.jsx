

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";
import { HiOutlineMenu, HiOutlineX, HiUserAdd, HiOutlineShoppingCart, HiLogin } from 'react-icons/hi'
import { MdShoppingCart, MdLogout } from "react-icons/md";
import { useCart } from "../context/CartContext";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const [account, setAccount] = useState(false);
    const { cart } = useCart();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        navigate(`/search?q=${search}`);
        setIsopen(false)
    };

    return (
        <header className="fixed top-0 w-full bg-black/80 z-50 shadow-lg">
            <div className="container mx-auto flex justify-between items-center gap-4 py-4 md:py-6">
                {/* Logo */}
                <h1 className="text-white font-bold text-2xl flex items-center gap-1 ">
                    Sh<HiOutlineShoppingCart className="text-green-400" size={28} />p<i>Ease</i>
                </h1>

                {/* Desktop Search */}
                <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="px-3 py-1 rounded-md w-72 border border-white/70 text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Search</button>
                </form>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center justify-between  gap-9 font-medium text-green-500">
                    <Link to="/" className="hover:text-white transition" onClick={() => setAccount(false)}>Home</Link>
                    <Link to="/about" className="hover:text-white transition" onClick={() => setAccount(false)}>About</Link>
                    <Link to="/cart" className="relative flex items-center hover:text-white transition" onClick={() => setAccount(false)}>
                        <MdShoppingCart size={24} className="mr-1" /> Cart
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                                {cart.length}
                            </span>
                        )}
                    </Link>
                    <div className="relative">
                        <button onClick={() => setAccount(!account)} className="hover:text-white transition">Account</button>
                        {account && (
                            <div className="absolute right-0 mt-2 w-36 bg-black/90 rounded shadow-lg flex flex-col gap-2 p-2">
                                {!user && <Link to="/login" className="flex items-center gap-2 px-2 py-1 hover:bg-green-500 rounded text-green-400 hover:text-white/80"><HiLogin size={20} />Login</Link>}
                                {user && <button onClick={logout} className="flex items-center gap-2 px-2 py-1 hover:bg-red-500 rounded text-green-400 hover:text-white/80"><MdLogout size={20} />Logout</button>}
                                {!user && <Link to="/signup" className="flex items-center gap-2 px-2 py-1 hover:bg-green-500 rounded text-green-400 hover:text-white/80"><HiUserAdd size={20} />SignUp</Link>}
                            </div>
                        )}
                    </div>
                </nav>

                {/* Mobile menu button */}
                <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <HiOutlineX className="text-red-500" size={28} /> : <HiOutlineMenu className="text-white" size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-black/90 p-4 flex flex-col gap-4">
                    {/* Mobile Search */}
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="px-3 py-1 rounded-md w-full border border-white/70 text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Search</button>
                    </form>

                    {/* Mobile Nav Links */}
                    <Link to="/" onClick={() => setIsOpen(false)} className="text-green-400 hover:text-white  transition">Home</Link>
                    <Link to="/about" onClick={() => setIsOpen(false)} className="text-green-400 hover:text-white transition">About</Link>
                    <Link to="/cart" onClick={() => setIsOpen(false)} className="relative flex items-center text-green-400 hover:text-white transition">
                        Cart
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                                {cart.length}
                            </span>
                        )}
                    </Link>
                    <div className="flex flex-col gap-2">
                        {!user && <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-2 py-1 justify-center text-green-400 hover:bg-green-500 rounded hover:text-white"><HiLogin size={20} />Login</Link>}
                        {user && <button onClick={logout} className="justify-center flex items-center gap-2 px-2 py-1 text-green-400 hover:bg-red-500 rounded hover:text-white"><MdLogout size={20} />Logout</button>}
                        {!user && <Link to="/signup" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 px-2 py-1 text-green-400 hover:bg-green-500 hover:text-white rounded"><HiUserAdd size={20} />SignUp</Link>}
                    </div>
                </div>
            )}
        </header>
    )
}
