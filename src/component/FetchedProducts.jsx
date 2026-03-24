import { useEffect, useState } from "react";

import { Form } from "react-router-dom";
import ProductCard from "./ProductCard";
export default function FetchProducts() {
    const [isLoading, setIsLoading] = useState(false);
    const [dummyData, setDummyData] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [count, setCount] = useState(0)



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`https://dummyjson.com/products?limit=48&skip=${count === 0 ? 0 * 10 : count * 10}`);
                const data = await response.json();

                setDummyData(data.products);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);

                setErrorMsg(err.message || "Something went wrong");
            }
        };
        fetchProducts();
    }, [count]);

    if (errorMsg) {
        return <p className="text-red-500 text-center mt-5">Something went wrong, try again</p>;
    }
    {/* function for handling next skip of dummy data*/ }
    function handleNext() {
        setCount(count + 1)

    }
    {/* function for handling previous skip of dummy data*/ }
    function handlePrev() {
        setCount((prevCount) => {
            if (prevCount <= 0) return 0;
            return prevCount - 1;
        });
    }

    return (

        <ProductCard
            products={dummyData}
            isLoading={isLoading}
            handleNext={handleNext}
            handlePrev={handlePrev}
        />

    );
}