import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CartPage = ({ cartItems, removeFromCart, updateQuantity }) => {
    const [editingItem, setEditingItem] = useState(null);
    const [newQuantity, setNewQuantity] = useState(1);

    const handleEdit = (item) => {
        setEditingItem(item.id);
        setNewQuantity(item.quantity);
    };

    const handleUpdate = (itemId) => {
        updateQuantity(itemId, newQuantity);
        setEditingItem(null); // Exit editing mode
    };

    const totalCost = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
                My Shopping Cart
            </h1>

            {/* Shopping Cart Items */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                {cartItems.length === 0 ? (
                    <div className="text-center">
                        <p className="text-xl text-gray-500 mb-6">Your cart is empty.</p>
                        <Link to="/" className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div>
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between py-6 border-b border-gray-200 last:border-b-0"
                            >
                                <div className="flex items-center gap-6">
                                    <img src={item.thumbnail} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                                        <p className="text-md text-gray-600">${item.price}</p>
                                    </div>
                                </div>


                                <div className="flex items-center gap-6">
                                    {editingItem === item.id ? (
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="number"
                                                value={newQuantity}
                                                onChange={(e) => setNewQuantity(e.target.value)}
                                                className="w-20 text-center border border-gray-300 rounded-lg py-2"
                                                min="1"
                                            />
                                            <button
                                                onClick={() => handleUpdate(item.id)}
                                                className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    ) : (
                                        <p className="text-lg font-medium text-gray-700">
                                            Quantity: {item.quantity}
                                        </p>
                                    )}

                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-600 hover:text-red-800 font-semibold transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="mt-8 text-right">
                            <h2 className="text-2xl font-bold text-gray-800">Total: ${totalCost.toFixed(2)}</h2>
                            <button className="mt-4 bg-green-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
