import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState([]);
    const [showMsg, setShowMsg] = useState(false);

    // Load cart from Firestore if user logged in
    useEffect(() => {
        if (!user) return;
        const fetchCart = async () => {
            const docRef = doc(db, "carts", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) setCart(docSnap.data().items || []);
        };
        fetchCart();
    }, [user]);

    const addToCart = async (product) => {
        // const newCart = [...cart, product];

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
        setCart(newCart);
        if (user) {
            await setDoc(doc(db, "carts", user.uid), { items: newCart });
        }
    };

    const decreaseQuantity = async (productId) => {
        const newCart = cart.map((item) => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item).filter(item => item.quantity > 0)
        setCart(newCart)

        if (user) {
            await setDoc(doc(db, "carts", user.uid), { items: newCart })
        }
    }
    const clearCart = async () => {
        setCart([]);
        if (user) await setDoc(doc(db, "carts", user.uid), { items: [] });
    };
    const removeFromCart = async (productId) => {
        const newCart = cart.filter((item) => item.id !== productId);
        setCart(newCart);
        if (user) await setDoc(doc(db, "carts", user.uid), { items: newCart });
    };
    return (
        <CartContext.Provider value={{ showMsg, cart, addToCart, clearCart, removeFromCart, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
