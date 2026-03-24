// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// export default function Search() {
//     const [results, setResults] = useState([]);
//     const query = new URLSearchParams(useLocation().search).get("q");
//     const navigate = useNavigate()

//     useEffect(() => {
//         const fetchSearch = async () => {
//             const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
//             const data = await res.json();
//             setResults(data.products);
//         };

//         if (query) {
//             fetchSearch();
//         }
//         else {
//             // return <div>No product found</div>
//             console.log('hello')
//         }

//     }, [query]);

//     return (
//         <div className="w-full flex flex-col p-4 mt-27 bg-black/50">
//             <h2 className="text-xl font-bold mb-4">
//                 Results for "{query}"
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {results.map((item) => (
//                     <div key={item.id} className="border bg-white/70 hover:shadow-xl transition-shadow p-3 rounded">
//                         <img src={item.thumbnail} className="h-32 w-full object-fill" />
//                         <h3 className="p-2 text-green-500">{item.title}</h3>
//                         <button onClick={() => navigate(`/product/${item.id}`)} className="bg-green-400 px-10 py-1 font-semibold rounded">View</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Search() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const query = new URLSearchParams(useLocation().search).get("q");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSearch = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
                const data = await res.json();
                setResults(data.products || []);
            } catch (err) {
                console.error(err);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        if (query) fetchSearch();
    }, [query]);

    const handleView = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="w-full flex flex-col p-4 mt-28 bg-black/50 min-h-screen">
            <h2 className="text-xl font-bold mb-4 text-white">
                Results for "{query}"
            </h2>

            {loading ? (
                <p className="text-center text-white text-lg mt-4">Loading...</p>
            ) : results.length === 0 ? (
                <p className="text-center text-red-400 text-lg mt-4">No products found 😔</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {results.map((item) => (
                        <div
                            key={item.id}
                            className="border bg-white/80 hover:shadow-xl transition-shadow p-3 rounded flex flex-col"
                        >
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="h-32 w-full object-cover mb-2 rounded"
                            />
                            <h3 className="text-green-500 font-semibold mb-2">{item.title}</h3>
                            <button
                                onClick={() => handleView(item.id)}
                                className="bg-green-400 px-4 py-1 font-semibold rounded hover:bg-green-500 transition mt-auto"
                            >
                                View
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}