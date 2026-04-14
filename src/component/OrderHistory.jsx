import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function OrderHistory() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [guestEmail, setGuestEmail] = useState("");
    const [searched, setSearched] = useState(false);

    // Fetch orders for logged-in user automatically
    useEffect(() => {
        if (!user) return;
        setLoading(true);
        const fetchOrders = async () => {
            const q = query(
                collection(db, "orders"),
                where("userId", "==", user.uid),
                orderBy("createdAt", "desc")
            );
            const snap = await getDocs(q);
            setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
            setLoading(false);
        };
        fetchOrders();
    }, [user]);

    // Guest email lookup
    const handleGuestLookup = async (e) => {
        e.preventDefault();
        if (!guestEmail.trim()) return;
        setLoading(true);
        setSearched(true);
        const q = query(
            collection(db, "orders"),
            where("guestEmail", "==", guestEmail.trim().toLowerCase()),
            orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 mt-20 p-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-green-600 mb-6">Order History</h1>

                {/* Guest lookup form */}
                {!user && (
                    <form onSubmit={handleGuestLookup} className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            required
                            placeholder="Enter your email to find orders"
                            value={guestEmail}
                            onChange={(e) => setGuestEmail(e.target.value)}
                            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition font-semibold">
                            Look Up
                        </button>
                    </form>
                )}

                {loading && <p className="text-center text-gray-500">Loading orders...</p>}

                {!loading && orders.length === 0 && (user || searched) && (
                    <div className="text-center text-gray-600 mt-10">
                        <p className="text-lg">No orders found.</p>
                        <Link to="/" className="text-green-500 hover:underline mt-2 inline-block">Continue Shopping</Link>
                    </div>
                )}

                {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-lg shadow p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-500">
                                {order.createdAt?.toDate?.()
                                    ? order.createdAt.toDate().toLocaleDateString("en-US", {
                                          year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
                                      })
                                    : "N/A"}
                            </span>
                            <span className="text-sm font-semibold px-2 py-1 rounded bg-green-100 text-green-700 capitalize">
                                {order.status}
                            </span>
                        </div>
                        <div className="divide-y">
                            {order.items?.map((item) => (
                                <div key={item.id} className="flex items-center gap-3 py-2">
                                    <img src={item.thumbnail} alt={item.title} className="w-12 h-12 object-cover rounded" />
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">{item.title}</p>
                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-right font-bold text-green-600 mt-2">
                            Total: ${order.total?.toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
