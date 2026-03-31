import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { HiPlus, HiMinus } from 'react-icons/hi'

export default function Cart() {
    const {showMsg, decreaseQuantity, addToCart, cart, clearCart, removeFromCart } = useCart();

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center mt-28">
                <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
                <p className="text-gray-500">Add some products to see them here.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen  max-w-6xl mx-auto p-4 mt-28">
            <h2 className="text-2xl font-bold mb-6 text-center">Your Cart</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cart.map((product, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row border rounded shadow p-4 gap-4 items-center"
                    >
                        
            {showMsg && (
                <div className="fixed z-60 top-20 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition">
                    product added to cart
                </div>
            )}
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-32 h-32 object-cover rounded"
                        />
                        <div className="flex-1 flex flex-col">
                            <h3 className="text-lg font-semibold">{product.title}</h3>
                            <p className="text-gray-600 line-clamp-2">{product.description}</p>
                            <p className="text-blue-600 font-bold mt-2">${product.price * product.quantity}</p>
                        </div>
                         <div className="grid grid-col-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            <button className="text-green-400 lg-shadow" onClick={() => decreaseQuantity(product.id)}>
                                <HiMinus size={24} />
                            </button>
                            <span className="text-center text-green-400 rounded-full font-semibold">{product.quantity}</span>
                            <button className="text-green-400 lg-shadow" onClick={() => addToCart(product)}>
                                <HiPlus size={24} />
                            </button>
                            <button
                                onClick={() => removeFromCart(product.id)}
                                className=" bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
                <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
                <div className="flex gap-4">
                    <button
                        onClick={clearCart}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                    >
                        Clear Cart
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                        <Link to="/Checked">Checkout</Link>
                    </button>
                </div>
            </div>
           
        </div>
    );
}
