import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const { cart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
 const totalQuantity = cart.reduce((total, item) => {
        return total + item.quantity
    }, 0)
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleCheckout = () => {
        if (!user) {
            alert("You must be logged in to place an order!");
            navigate("/login");
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // Simulate checkout
        alert(`Order placed successfully! Total: $${totalPrice.toFixed(2)}`);
        clearCart();
        navigate("/");
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <h2 className="text-2xl font-bold text-gray-700">
                    Your cart is empty 🛒
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row justify-center items-start gap-8 p-6 bg-gray-100 mt-20">
            {/* Cart Items */}
            <div className="flex-1 bg-white rounded-lg shadow p-4 w-full md:w-2/3">
                <h2 className="text-2xl font-bold mb-4 text-green-600">Your Cart</h2>
                {cart.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between border-b py-3"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-20 h-20 object-cover rounded"
                            />
                            <div>
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-gray-600">${item.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Checkout Summary */}
            <div className="w-full md:w-1/3 bg-white rounded-lg shadow p-6 flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-green-600">Summary</h2>
                <p className="text-gray-700">
                    Items: <span className="font-semibold">{totalQuantity}</span>
                </p>
                <p className="text-gray-700">
                    Total: <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </p>
                <button
                    onClick={handleCheckout}
                    className="bg-green-500 text-white px-4 py-3 rounded hover:bg-green-600 transition font-semibold"
                >
                    Place Order
                </button>
            </div>
        </div>
    );
}
