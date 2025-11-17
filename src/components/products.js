

import { useEffect, useState } from "react";

const Products = ({ addToCart }) => {
    const [loading, setloading] = useState(false);
    const [products, setproducts] = useState([]);
    const [count, setcount] = useState(0);
    const [disableButton, setdisableButton] = useState(false);

    useEffect(() => {
        async function fetchProducts() {
            try {
                setloading(true);
                const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count * 20}`);
                const result = await response.json();
    
                if (result && result.products && result.products.length) {
                    setproducts((prevData) => [...prevData, ...result.products]);
                    setloading(false);
                }
            } catch (e) {
                console.log(e);
                setloading(false);
            }
        }

        fetchProducts();
    }, [count]);

    useEffect(() => {
        if (products && products.length === 100) {
            setdisableButton(true);
        }
    }, [products]);

    if (loading && products.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-gray-700 text-3xl font-bold">
                    Loading Products...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">
            {/* Header */}
            <div className="text-center py-16">
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800">
                    Infinite Scroll Products
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                    Discover our collection of stunning products
                </p>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products && products.length
                        ? products.map((item) => (
                            <div
                                key={item.id}
                                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <div className="aspect-w-1 aspect-h-1 overflow-hidden">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-gray-800 truncate">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        ${item.price} • {item.category}
                                    </p>
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))
                        : null}
                </div>

                {/* Load More Section */}
                <div className="mt-20 text-center">
                    {loading && products.length > 0 && (
                        <div className="flex justify-center items-center gap-4">
                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-lg text-gray-600">Loading more products...</p>
                        </div>
                    )}

                    <div className="mt-10">
                        <button
                            disabled={disableButton}
                            onClick={() => setcount(count + 1)}
                            className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${disableButton
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30"
                                }`}
                        >
                            {disableButton ? "All Products Loaded" : "Load More Products"}
                        </button>

                        {disableButton && (
                            <p className="mt-6 text-xl font-semibold text-green-600">
                                You've reached the end of our product list!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;