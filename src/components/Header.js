import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartItemCount }) => {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">
                    <Link to="/">E-Commerce Store</Link>
                </h1>
                <Link to="/cart" className="relative flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    <span className="text-lg font-semibold">View Cart</span>
                    {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-10 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                            {cartItemCount}
                        </span>
                    )}
                </Link>
            </div>
        </header>
    );
};

export default Header;
