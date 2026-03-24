import { useCart } from "../context/CartContext";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
export default function ProductCard({
    products,
    handleNext,
    handlePrev,
    isLoading,
}) {
    const { showMsg, addToCart } = useCart();

    return (
        <div className="w-full bg-black max-w-9xl mx-auto p-4">
            <h1 className="text-green-400 text-center text-2xl font-bold py-5">Products</h1>
            {isLoading ? (
                <p className="text-center text-gray-500 text-lg">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="border bg-white/90 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                        >
                            {showMsg && (
                                <div className="fixed z-60 top-20 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition">
                                    product added to cart
                                </div>
                            )}
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-4 flex flex-col flex-1">
                                <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                                <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                                <p className="mt-auto font-bold text-blue-600">${product.price}</p>
                                <button onClick={() => addToCart(product)} className="mt-3 bg-black text-green-400 px-3 py-2 rounded-lg hover:bg-black/70 transition">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <button onClick={handlePrev} className="rounded-full p-4 animate-bounce float-start text-green-300 bg-black rounded mt-4 px-4 border border-green-400 hover:text-white transition">
                <FaArrowLeft />
            </button>
            <button onClick={handleNext} className="animate-bounce float-end text-green-300 bg-black rounded-full p-4 mt-4 px-4 hover:text-white border border-green-400 transition">
                <FaArrowRight />
            </button>
        </div>
    );
}
