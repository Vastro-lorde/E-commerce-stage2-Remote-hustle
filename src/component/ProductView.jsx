import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useCart } from "../context/CartContext";
export default function ProductView() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart()

    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <p className="text-center mt-20">Loading...</p>;
    if (!product) return <p className="text-center mt-20">Product not found</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 mt-28 flex flex-col md:flex-row gap-6 bg-white rounded shadow-md">
            <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full md:w-1/2 h-80 object-cover rounded"
            />
            <div className="flex-1 flex flex-col">
                <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-xl font-bold text-blue-600 mb-4">${product.price}</p>
                <button onClick={addToCart} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-32">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}