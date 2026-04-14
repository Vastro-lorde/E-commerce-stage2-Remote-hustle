import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const GUEST_CART_KEY = "shopease_guest_cart";

const saveGuestCart = (items) => {
    try { localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items)); } catch {}
};
const loadGuestCart = () => {
    try { return JSON.parse(localStorage.getItem(GUEST_CART_KEY)) || []; } catch { return []; }
};

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState(() => (user ? [] : loadGuestCart()));
    const [showMsg, setShowMsg] = useState(false);

    // Load cart from Firestore if user logged in
    useEffect(() => {
        if (!user) {
            setCart(loadGuestCart());
            return;
        }
        const fetchCart = async () => {
            const docRef = doc(db, "carts", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) setCart(docSnap.data().items || []);
        };
        fetchCart();
    }, [user]);

    // Persist to localStorage for guest users
    const persistCart = useCallback((newCart) => {
        setCart(newCart);
        if (user) {
            setDoc(doc(db, "carts", user.uid), { items: newCart });
        } else {
            saveGuestCart(newCart);
        }
    }, [user]);

    const addToCart = async (product) => {
        const existing = cart.find(item => item.id === product.id);

        let newCart;

        if (existing) {
            newCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            newCart = [...cart, { ...product, quantity: 1 }];
        }
        setShowMsg(true)
        setTimeout(() => {
            setShowMsg(false)
        }, 3000)
        persistCart(newCart);
    };

    const decreaseQuantity = async (productId) => {
        const newCart = cart.map((item) => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item).filter(item => item.quantity > 0)
        persistCart(newCart);
    }
    const clearCart = async () => {
        persistCart([]);
    };
    const removeFromCart = async (productId) => {
        const newCart = cart.filter((item) => item.id !== productId);
        persistCart(newCart);
    };
    return (
        <CartContext.Provider value={{ showMsg, cart, addToCart, clearCart, removeFromCart, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
