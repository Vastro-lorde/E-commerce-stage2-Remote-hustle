import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../ordersDB";

export default function Checkout() {
    const { cart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [placing, setPlacing] = useState(false);

    // Guest form fields
    const [guestEmail, setGuestEmail] = useState("");
    const [guestPhone, setGuestPhone] = useState("");
    const [guestAddress, setGuestAddress] = useState("");

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // Validate guest fields when not logged in
        if (!user) {
            if (!guestEmail.trim() || !guestPhone.trim() || !guestAddress.trim()) {
                alert("Please fill in your email, phone number, and address.");
                return;
            }
        }

        setPlacing(true);
        try {
            const orderData = {
                items: cart.map(({ id, title, price, quantity, thumbnail }) => ({ id, title, price, quantity, thumbnail })),
                total: totalPrice,
                status: "pending",
            };

            if (user) {
                orderData.userId = user.uid;
                orderData.email = user.email;
            } else {
                orderData.guestEmail = guestEmail.trim().toLowerCase();
                orderData.guestPhone = guestPhone.trim();
                orderData.guestAddress = guestAddress.trim();
            }

            await addOrder(orderData);
            clearCart();
            alert(`Order placed successfully! Total: $${totalPrice.toFixed(2)}`);
            navigate("/");
        } catch (err) {
            alert("Failed to place order. Please try again.");
        } finally {
            setPlacing(false);
        }
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
                                <p className="text-gray-600">Qty: {item.quantity}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Checkout Summary + Guest Form */}
            <div className="w-full md:w-1/3 bg-white rounded-lg shadow p-6 flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-green-600">Summary</h2>
                <p className="text-gray-700">
                    Items: <span className="font-semibold">{totalQuantity}</span>
                </p>
                <p className="text-gray-700">
                    Total: <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </p>

                {/* Guest info form — only shown when not logged in */}
                {!user && (
                    <div className="flex flex-col gap-3 border-t pt-4">
                        <p className="text-sm text-gray-500">Checking out as guest</p>
                        <input
                            type="email"
                            required
                            placeholder="Email *"
                            value={guestEmail}
                            onChange={(e) => setGuestEmail(e.target.value)}
                            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                            type="tel"
                            required
                            placeholder="Phone number *"
                            value={guestPhone}
                            onChange={(e) => setGuestPhone(e.target.value)}
                            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <textarea
                            required
                            placeholder="Delivery address *"
                            value={guestAddress}
                            onChange={(e) => setGuestAddress(e.target.value)}
                            rows={3}
                            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                        />
                    </div>
                )}

                <button
                    onClick={handleCheckout}
                    disabled={placing}
                    className="bg-green-500 text-white px-4 py-3 rounded hover:bg-green-600 transition font-semibold disabled:opacity-50"
                >
                    {placing ? "Placing Order..." : "Place Order"}
                </button>
            </div>
        </div>
    );
}
