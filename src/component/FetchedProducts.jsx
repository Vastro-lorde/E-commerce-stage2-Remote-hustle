import { useEffect, useState } from "react";
import image from '../assets/internet.png'
import ProductCard from "./ProductCard";

const LIMIT = 48;

export default function FetchProducts() {
    const [isLoading, setIsLoading] = useState(false);
    const [dummyData, setDummyData] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`https://dummyjson.com/products?limit=${LIMIT}&skip=${count * LIMIT}`);
                const data = await response.json();

                setDummyData(data.products);
                setTotal(data.total);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                setErrorMsg(err.message || "Something went wrong");
            }
        };
        fetchProducts();
    }, [count]);

    if (errorMsg) {
        return <div>
            <div style={{ display: "block",  marginLeft: "auto",  marginRight: "auto", width: "200px", height: "200px", justifyContent:"center",  }}><img
                src={image} id="no-connection" 
                width="200px" height="200px" alt="No connection found." />

            </div>

            <p className="text-red-500 text-center mt-5">Something went wrong, try again</p>
        </div>;
    }

    function handleNext() {
        setCount((prev) => prev + 1);
    }

    function handlePrev() {
        setCount((prev) => Math.max(0, prev - 1));
    }

    const hasMore = (count + 1) * LIMIT < total;
    const hasPrev = count > 0;

    return (
        <ProductCard
            products={dummyData}
            isLoading={isLoading}
            handleNext={handleNext}
            handlePrev={handlePrev}
            hasMore={hasMore}
            hasPrev={hasPrev}
        />
    );
}
